import React from "react";

export default class DrawDeck extends React.Component {
  render() {
    const { deck, drawCardClick, id } = this.props;
    return (
      <div id='drawDeck' className="card">
        {deck[0] ? (
          <div className='deck'>
            <img
              onClick={() => {
                drawCardClick(deck[0], id);
              }}
              src={require("../images/card_back.png")}
              alt="oh!no"
            />
            <p id='drawCardCount'>{deck.length}</p>
          </div>
        ) : (
            <img src={require(`../images/empty_card.png`)} alt='no!' />
          )}
      </div>
    );
  }
}
