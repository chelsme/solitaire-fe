import React from "react";
import Card from "./Card";

export default class DrawDeck extends React.Component {
  render() {
    const { deck, tableCardClick, id } = this.props;
    console.log("updated==>", deck[0]);
    return (
      <div
        className="card"
        onClick={() => {
          tableCardClick(deck, id);
        }}
      >
        {deck[0] ? <img src={deck[0].image} alt="oh!no" /> : null}
      </div>
    );
  }
}
