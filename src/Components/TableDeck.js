import React from "react";

export default class TableDeck extends React.Component {
  render() {
    const { deck, tableCardClick, id } = this.props;
    console.log(deck.value[0]);
    const under = new Array(deck.value.length).fill(0);
    // let img = require(deck.value[0].image);
    return (
      <div className="card">
        {deck.value[0] ? (
          <div className="deck">
            {under.map((fill, index) => {
              return (
                <img
                  key={index}
                  className={"card" + index}
                  src={require(`../images/card_back.png`)}
                  alt="stop it"
                />
              );
            })}
            <img
              className="topCard"
              onClick={() => {
                tableCardClick(deck, id);
              }}
              src={require(`../deck/${deck.value[0].code}.png`)}
              alt="oh!no"
            />
          </div>
        ) : (
          <img src={require(`../images/skull_${id + 1}.png`)} alt="no!" />
        )}
      </div>
    );
  }
}
