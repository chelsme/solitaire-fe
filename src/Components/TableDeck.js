import React from "react";

export default class TableDeck extends React.Component {
  render() {
    //   backCardImg = (name) => {
    //       let newName = n
    //   }
    const { deck, tableCardClick, id } = this.props;
    // console.log("updated==>", deck.value);
    return (
      <div className="card">
        {deck.value[0] ? (
          <img
            onClick={() => {
              tableCardClick(deck, id);
            }}
            src={deck.value[0].image}
            alt="oh!no"
          />
        ) : (
          <img src={require(`../images/skull_${id + 1}.png`)} />
        )}
      </div>
    );
  }
}
