import React from "react";

export default class DrawDeck extends React.Component {
  render() {
    const { deck, drawCardClick, id } = this.props;
    // console.log("updatedDrawDeck==>", deck);
    return (
      <div id='drawDeck' className="card">
        {deck[0] ? (
          <img
            onClick={() => {
              drawCardClick(deck[0], id);
            }}
            src={require("../images/card_back.png")}
            alt="oh!no"
          />
        ) : (
            <img src={require(`../images/empty_card.png`)} />
          )}
      </div>
    );
  }
}
