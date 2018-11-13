import React from "react";

export default class PlayerDeck extends React.Component {
  render() {
    const { deck } = this.props;
    return (
      <div id="playerDeck" className="card">
        {deck[0] ? (
          <img src={require(`../deck/${deck[0].code}.png`)} alt="oh!no" />
        ) : null}
      </div>
    );
  }
}
