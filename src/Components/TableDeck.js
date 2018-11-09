import React from "react";

export default class TableDeck extends React.Component {
  render() {
    const { deck, tableCardClick, id } = this.props;
    console.log(deck);
    return (
      <div
        className="card"
        onClick={() => {
          tableCardClick(deck, id);
        }}
      >
        {deck ? <img src={deck[0].image} alt="oh!no" /> : null}
      </div>
    );
  }
}
