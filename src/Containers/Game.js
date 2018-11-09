import React from "react";
import TableDecks from "./TableDecks";
import DrawDeck from "../Components/DrawDeck";
import PlayerDeck from "../Components/PlayerDeck";

export default class Game extends React.Component {
  state = {
    deck: [],
    tableDecks: [],
    drawDeck: [],
    playerDeck: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/Cards")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          deck: data
        });
      })
      .then(() => {
        this.initDecksState();
      });
  }

  initDecksState = () => {
    const shuffleDecks = [...this.state.deck].sort(function() {
      return 0.5 - Math.random();
    });
    this.setState({
      tableDecks: [
        { value: shuffleDecks.splice(0, 6) },
        { value: shuffleDecks.splice(0, 6) },
        { value: shuffleDecks.splice(0, 6) },
        { value: shuffleDecks.splice(0, 6) },
        { value: shuffleDecks.splice(0, 6) },
        { value: shuffleDecks.splice(0, 6) }
      ],
      drawDeck: shuffleDecks.splice(0, 15),
      playerDeck: shuffleDecks.splice(0, 1)
    });
  };

  tableCardClick = (selectedTableDeck, id) => {
    let playerDeck = [...this.state.playerDeck];
    console.log("selectedValue=>", selectedTableDeck.value[0].value);
    console.log("playerDeckValue=>", playerDeck[0].value);
    if (
      selectedTableDeck.value[0].value == playerDeck[0].value - 1 ||
      selectedTableDeck.value[0].value - 1 == playerDeck[0].value
    ) {
      playerDeck.unshift(selectedTableDeck.value[0]);
      let tableDecks = [...this.state.tableDecks];
      tableDecks[id].value = selectedTableDeck.value.slice(1);

      this.setState({ tableDecks, playerDeck }, () => {
        //   console.log(tableDecks[id], !!tableDecks[id].value);
      });
    }
  };

  drawCardClick = (selectedDrawCard, id) => {
    // console.log("Fired drawCardClick", selectedDrawCard);
    let playerDeck = [...this.state.playerDeck];
    playerDeck.unshift(selectedDrawCard);
    const drawDeck = [...this.state.drawDeck].slice(1);

    this.setState({ playerDeck, drawDeck }, () => {
      //   console.log("setStatePlayerDeck", playerDeck);
    });
  };

  render() {
    return (
      <div>
        <h1>Game</h1>
        <TableDecks
          decks={this.state.tableDecks}
          tableCardClick={this.tableCardClick}
        />
        <div className="tableDecks">
          <DrawDeck
            deck={this.state.drawDeck}
            drawCardClick={this.drawCardClick}
          />
          <PlayerDeck deck={this.state.playerDeck} />
        </div>
      </div>
    );
  }
}
