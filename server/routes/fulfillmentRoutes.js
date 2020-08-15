const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Payload } = require('dialogflow-fulfillment');
const axios = require('axios');

module.exports = (app) => {
  app.post('/', async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    async function nearbyRestaurants(agent) {
      agent.add('Sure, here is the list of restaurants near you');
      res = await axios.get('http://localhost:5000/restaurant/');
      const restaurants = res.data;

      restaurants.map((restaurant) => {
        agent.add(
          new Card({
            title: restaurant.restaurantName,
            text: restaurant._id,
          })
        );
      });
    }

    async function addToCart(agent) {
      const random = Math.floor(Math.random() * 1000000 + 54);
      const details = { dish: agent.parameters.dish };
      const restaurant_name = agent.parameters.restaurant_name;

      res = await axios.post('http://localhost:5000/items/addtocart', details);
      const item = res.data.filter(
        (a) => a.restaurantID.restaurantName === restaurant_name
      );

      if (item.length !== 0) {
        const cartDetails = {
          userID: agent.session.substr(agent.session.length - 24),
          itemID: item[0]._id,
        };
        let responses = [
          `You've added ${details.dish} from ${restaurant_name}. Do you wish to add more item ?`,
          `${details.dish} has been added to your cart. Should I add any more items ?`,
          `${details.dish} is added. Is there anything else to add ?`,
        ];
        let pick = Math.floor(Math.random() * responses.length);
        let response = responses[pick];
        agent.add(
          new Card({
            title: response,
            text: `c${random}`,
          })
        );
        const payload = {
          quick_replies: [
            {
              text: 'Yes',
              payload: 'Yes',
            },
            {
              text: 'No',
              payload: 'No',
            },
          ],
        };

        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );

        axios
          .put('http://localhost:5000/userRegistration/addtocart', cartDetails)
          .then((response) => console.log(response));
      } else {
        agent.add(
          `${restaurant_name} is not offering ${details.dish} at the moment. Please select a dish from the Menu`
        );
      }
    }

    async function confirmAddress(agent) {
      const userID = {
        userID: agent.session.substr(agent.session.length - 24),
      };

      res = await axios.get(
        `http://localhost:5000/userRegistration/${userID.userID}`
      );
      const userDetails = res.data;
      console.log('userDetails', userDetails);
      if (userDetails.accountConfirmation === true) {
        agent.add(
          `${userDetails.address}, ${userDetails.locality}, ${userDetails.city}, ${userDetails.zipcode}`
        );
        agent.add(
          `Should I confirm your order with the given address ${userDetails.firstName} ?`
        );
        const payload = {
          quick_replies: [
            {
              text: 'Yes',
              payload: 'Yes',
            },
            {
              text: 'No',
              payload: 'No',
            },
          ],
        };

        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
      } else {
        agent.add('Oops ! Your Account Verification is still pending.');
        agent.add(
          'Please Confirm it by clicking Verify Now button in Home section to place your order'
        );
      }
    }

    async function confirmOrder(agent) {
      const userID = {
        userID: agent.session.substr(agent.session.length - 24),
      };
      let res = await axios.post(
        'http://localhost:5000/userRegistration/viewcart',
        userID
      );
      if (res.data.cart.length !== 0) {
        axios
          .post('http://localhost:5000/userRegistration/confirm_order', userID)
          .then((response) => console.log(response));
        agent.add('Thank You 🙂, Your Order has been confirmed !');
      } else {
        agent.add(
          "Uh Oh! 🤔. Seems like you haven't added anything in your cart. Please add your item to place the order"
        );
      }
    }

    async function updateAddress(agent) {
      const userDetails = {
        userID: agent.session.substr(agent.session.length - 24),
        address: agent.parameters.address,
        locality: agent.parameters.locality,
        city: agent.parameters.city,
        zipcode: agent.parameters.zipcode,
      };
      axios
        .post(
          'http://localhost:5000/userRegistration/updateaddress',
          userDetails
        )
        .then((response) => console.log(response));
      axios
        .post(
          'http://localhost:5000/userRegistration/confirm_order',
          userDetails
        )
        .then((response) => console.log(response));

      agent.add(
        'Thank you 🙂, Your address has been updated, we will deliver your food in no time !'
      );
    }

    async function viewCart(agent) {
      const random = Math.floor(Math.random() * 1000000 + 54);
      const response =
        "Sure, here's your cart details. Should I add any more items ?";
      agent.add(
        new Card({
          title: response,
          text: `c${random}`,
        })
      );
      const payload = {
        quick_replies: [
          {
            text: 'Yes',
            payload: 'Yes',
          },
          {
            text: 'No',
            payload: 'No',
          },
        ],
      };

      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    }

    async function removeItem(agent) {
      const random = Math.floor(Math.random() * 1000000 + 54);
      const dish = agent.parameters.dish;

      const userID = {
        userID: agent.session.substr(agent.session.length - 24),
      };
      let res = await axios.post(
        'http://localhost:5000/userRegistration/viewcart',
        userID
      );

      console.log('USER CART', res.data.cart);
      const userCart = res.data.cart.filter((item) => item.itemName === dish);

      if (userCart.length !== 0) {
        let userDetails = {
          userID: agent.session.substr(agent.session.length - 24),
          itemID: userCart[0]._id,
        };
        console.log(userDetails);
        axios
          .post(
            'http://localhost:5000/userRegistration/removeitem',
            userDetails
          )
          .then((response) => console.log(response));
      }
      const response = `${dish} has been removed from your cart. Do you want to add anything else ?`;
      agent.add(
        new Card({
          title: response,
          text: `c${random}`,
        })
      );
      const payload = {
        quick_replies: [
          {
            text: 'Yes',
            payload: 'Yes',
          },
          {
            text: 'No',
            payload: 'No',
          },
        ],
      };

      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    }

    function askConfirmation(agent) {
      agent.add('Okay. Should I confirm your order ?');
      const payload = {
        quick_replies: [
          {
            text: 'Yes',
            payload: 'Yes',
          },
          {
            text: 'No',
            payload: 'No',
          },
        ],
      };

      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    }

    async function searchFood(agent) {
      const dish = {
        dish: agent.parameters.dish,
      };
      const res = await axios.post(
        'http://localhost:5000/items/addtocart',
        dish
      );
      const restaurants = res.data;
      if (restaurants.length !== 0) {
        const numberOfRestaurants = restaurants.length;
        agent.add(
          `Here's the list of ${numberOfRestaurants} restaurant(s) offering ${dish.dish}`
        );
        restaurants.map((restaurant) => {
          agent.add(
            new Card({
              title: restaurant.restaurantID.restaurantName,
              text: restaurant.restaurantID._id,
            })
          );
        });
      } else {
        agent.add(
          `I'm Sorry 😔! Currently no restaurant is offering ${dish.dish}.`
        );
      }
    }

    let intentMap = new Map();
    intentMap.set('nearby_restaurants', nearbyRestaurants);
    intentMap.set('add_to_cart', addToCart);
    intentMap.set('add_to_cart - no - yes', confirmAddress);
    intentMap.set('add_to_cart - no - yes - yes', confirmOrder);
    intentMap.set('add_to_cart - no - yes - no', updateAddress);
    intentMap.set('view_cart', viewCart);
    intentMap.set('remove_item_from_cart', removeItem);
    intentMap.set('add_to_cart - no', askConfirmation);
    intentMap.set('search_food', searchFood);

    agent.handleRequest(intentMap);
  });
};
