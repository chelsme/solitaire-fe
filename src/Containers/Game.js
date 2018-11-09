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
    playerDeck.unshift(selectedTableDeck[0]);
    let tableDecks = [...this.state.tableDecks];
    tableDecks[id].value = selectedTableDeck.value.slice(1);

    this.setState({ tableDecks, playerDeck }, () => {
      console.log(tableDecks[id], !!tableDecks[id].value);
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
        <DrawDeck
          deck={this.state.drawDeck}
          tableCardClick={this.tableCardClick}
        />
        <PlayerDeck deck={this.state.playerDeck} />
      </div>
    );
  }
}
