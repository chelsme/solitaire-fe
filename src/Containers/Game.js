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
        this.updateDecks();
      });
  }

  updateDecks = () => {
    const shuffleDecks = [...this.state.deck].sort(function() {
      return 0.5 - Math.random();
    });
    this.setState(
      {
        tableDecks: [
          shuffleDecks.splice(0, 6),
          shuffleDecks.splice(0, 6),
          shuffleDecks.splice(0, 6),
          shuffleDecks.splice(0, 6),
          shuffleDecks.splice(0, 6),
          shuffleDecks.splice(0, 6)
        ],
        drawDeck: shuffleDecks.splice(0, 15),
        playerDeck: shuffleDecks.splice(0, 1)
      },
      () => {
        console.log("==init state=>", this.state.playerDeck);
      }
    );
  };

  tableCardClick = (selectedTableDeck, id) => {
    let playerDeck = [...this.state.playerDeck];
    playerDeck.unshift(selectedTableDeck[0]);
    let tableDecks = [...this.state.tableDecks];
    tableDecks[id] = selectedTableDeck.slice(1);

    this.setState({ tableDecks, playerDeck }, () => {
      console.log(this.state);
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
        <DrawDeck deck={this.state.drawDeck} />
        <PlayerDeck deck={this.state.playerDeck} />
      </div>
    );
  }
}
