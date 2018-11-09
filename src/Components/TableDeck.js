import React from "react";

export default class TableDeck extends React.Component {
  render() {
    const { deck, tableCardClick, id } = this.props;
    console.log("updated==>", deck.value);
    return (
      <div
        className="card"
        onClick={() => {
          tableCardClick(deck, id);
        }}
      >
        {deck.value[0] ? <img src={deck.value[0].image} alt="oh!no" /> : null}
      </div>
    );
  }
}
