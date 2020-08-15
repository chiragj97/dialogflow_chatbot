import React from 'react';
import food_assistant from '../../assets/images/food_assistant.jpg';

const Cards = (props) => {
  return (
    <div
      className="card rounded"
      style={{ width: 430, border: 'none', marginBottom: 15 }}
    >
      <img
        src={food_assistant}
        style={{ height: 150, width: 200, marginLeft: 100 }}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h4 className="card-title">Foodie</h4>
        <p className="card-text">
          Hi, there! I am Foodie, your food ordering assistant. How can I help
          you ?
        </p>
      </div>
    </div>
  );
};

export default Cards;
