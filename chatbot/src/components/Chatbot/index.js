import React, { Component } from 'react';
import axios from 'axios';
import Message from '../Message';
import Cards from '../Cards';
import QuickReplies from '../QuickReplies';
import RestaurantCard from '../RestaurantCard';
import ViewCart from '../ViewCart';
import decode from 'jwt-decode';

export class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this._handleQuickReplies = this._handleQuickReplies.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.state = {
      messages: [],
      userID: '',
      dataLoaded: false,
    };
  }

  async df_text_query(text) {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState({
      messages: [...this.state.messages, says],
    });
    const res = await axios.post('http://localhost:5000/api/df_text_query', {
      text,
      userID: decode(localStorage.getItem('token'))._id,
    });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'bot',
        msg: msg,
      };
      this.setState({
        messages: [...this.state.messages, says],
        dataLoaded: true,
      });
    }
  }

  async df_event_query(event) {
    const res = await axios.post('http://localhost:5000/api/df_event_query', {
      event,
      userID: decode(localStorage.getItem('token'))._id,
    });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'me',
        msg: msg,
      };

      this.setState({
        messages: [...this.state.messages, says],
        dataLoaded: true,
      });
    }
  }

  _handleQuickReplies(text) {
    console.log('Addtocart', text);
    this.df_text_query(text);
  }

  componentDidMount() {
    this.df_event_query('Welcome');
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: 'smooth' });
  }

  // renderCard() {
  //   return <Cards />;
  // }

  renderOneMessage(messages, i) {
    console.log(messages.msg);
    if (messages.msg && messages.msg.text && messages.msg.text.text) {
      return (
        <Message
          key={i}
          speaks={messages.speaks}
          text={messages.msg.text.text}
          dataLoaded={this.state.dataLoaded}
        />
      );
    } else if (
      messages.msg &&
      messages.msg.payload &&
      messages.msg.payload.fields &&
      messages.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            messages.msg.payload.fields.text
              ? messages.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplies}
          speaks={messages.speaks}
          payload={messages.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    } else if (
      messages.msg &&
      messages.msg.card &&
      messages.msg.card.title.length < 20
    ) {
      return <RestaurantCard restaurant={messages.msg.card} key={i} />;
    } else {
      return <ViewCart viewcart={messages.msg.card} key={i} />;
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((messages, i) => {
        return this.renderOneMessage(messages, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return this.state.dataLoaded ? (
      <div style={{ padding: '4px 0px 4px 20px' }}>
        <div
          style={{
            height: 625,
            width: 500,
            textAlign: 'center',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              color: '#fff',
              background: 'darkblue',
              height: 65,
              width: 500,
              padding: '12px ',
              borderRadius: '10px 10px 0px 0px',
              fontSize: 27,
            }}
          >
            Chatbot
          </div>
          <div
            id="chatbot"
            style={{
              height: '84%',
              width: 500,
              overflow: 'auto',
              overflowX: 'hidden',
              padding: '10px 30px',
              border: '1px solid lightblue',
              backgroundColor: 'antiquewhite',
            }}
          >
            <Cards />
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: 'left', clear: 'both' }}
            ></div>
          </div>
          <div>
            <input
              style={{
                background: 'darkblue',
                height: 60,
                borderRadius: '0px 0px 10px 10px',
                width: '100%',
                border: 'none',
                padding: 20,
                color: 'white',
              }}
              type="text"
              onKeyPress={this._handleInputKeyPress}
              placeholder="Type your message..."
            />
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
export default Chatbot;
