import React from "react";
import TableDecks from "./TableDecks";
import DrawDeck from "../Components/DrawDeck";
import PlayerDeck from "../Components/PlayerDeck";
import WildDeck from "../Components/WildDeck";

export default class Game extends React.Component {
  state = {
    wildDeck: [
      {
        suit: "WILD",
        value: "wild",
        code: "W",
        image: require("../images/wild.png")
      },
      {
        suit: "WILD",
        value: "wild",
        code: "W",
        image: require("../images/wild.png")
      }
    ],
    deck: [],
    tableDecks: [],
    drawDeck: [],
    playerDeck: [],
    timer: 0,
    mode: "",
    gameEnded: false
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/cards")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          deck: data,
          start: new Date().getTime()
        });
      })
      .then(() => {
        this.initDecksState();
      });
  }

  initDecksState = () => {
    const shuffleDecks = [...this.state.deck].sort(function () {
      return 0.5 - Math.random();
    });
    const mode = this.state.mode;
    switch (mode) {
      case "medium":
        this.setState({
          tableDecks: [
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) },
            { value: shuffleDecks.splice(0, 4) }
          ],
          drawDeck: shuffleDecks.splice(0, 23),
          playerDeck: shuffleDecks.splice(0, 1)
        });
        break;
      case "hard":
        this.setState({
          tableDecks: [
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) },
            { value: shuffleDecks.splice(0, 5) }
          ],
          drawDeck: shuffleDecks.splice(0, 16),
          playerDeck: shuffleDecks.splice(0, 1)
        });
        break;
      case "easy":
        this.setState({
          tableDecks: [
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) },
            { value: shuffleDecks.splice(0, 3) }
          ],
          drawDeck: shuffleDecks.splice(0, 30),
          playerDeck: shuffleDecks.splice(0, 1)
        });
        break;
      default:
        break;
    }
  };

  tableCardClick = (selectedTableDeck, id) => {
    let playerDeck = [...this.state.playerDeck];
    const select = selectedTableDeck.value;
    if (select[0].value == "wild" || playerDeck[0].value == "wild") {
      playerDeck.unshift(select[0]);
      let tableDecks = [...this.state.tableDecks];
      tableDecks[id].value = select.slice(1);
    }
  };

  tableCardClick = (selectedTableDeck, id) => {
    let playerDeck = [...this.state.playerDeck];
    const select = selectedTableDeck.value;
    if (select[0].value === "wild" || playerDeck[0].value === "wild") {
      playerDeck.unshift(select[0]);
      let tableDecks = [...this.state.tableDecks];
      tableDecks[id].value = select.slice(1);

      this.setState({ tableDecks, playerDeck }, () => { });
    } else if (
      parseInt(select[0].value) === parseInt(playerDeck[0].value - 1) ||
      parseInt(select[0].value - 1) === parseInt(playerDeck[0].value)
    ) {
      playerDeck.unshift(select[0]);
      let tableDecks = [...this.state.tableDecks];
      tableDecks[id].value = select.slice(1);

      this.setState({ tableDecks, playerDeck }, () => { });
    } else if (
      (select[0].value == 13 && playerDeck[0].value == 1) ||
      (select[0].value == 1 && playerDeck[0].value == 13)
    ) {
      playerDeck.unshift(select[0]);
      let tableDecks = [...this.state.tableDecks];
      tableDecks[id].value = select.slice(1);

      this.setState({ tableDecks, playerDeck }, () => { });
    }
  };

  drawCardClick = (selectedDrawCard, id) => {
    let playerDeck = [...this.state.playerDeck];
    playerDeck.unshift(selectedDrawCard);
    const drawDeck = [...this.state.drawDeck].slice(1);

    this.setState({ playerDeck, drawDeck }, () => { });
  };

  wildCardClick = selectedWildCard => {
    let playerDeck = [...this.state.playerDeck];
    playerDeck.unshift(selectedWildCard);
    const wildDeck = [...this.state.wildDeck].slice(1);
    this.setState({ playerDeck, wildDeck }, () => { });
  };

  timer = () => {
    const time = this.state.timer;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    const minutes = Math.floor(time / 60);
    return "Timer: " + minutes + ":" + seconds;
  };

  handleMode = mode => {
    this.setState({ mode, gameEnded: false });
    this.componentDidMount();
    this.timerInterval = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  };

  gameFinished = () => {
    this.getGameTime();
    this.postGameStats("win");
    return (
      <div>
        <h1 id="gameWin">Winner!</h1>
        <img
          id="fireworks"
          src={require("../images/fireworks.gif")}
          alt="fireworks"
        />
      </div>
    );
  };

  gameLost = () => {
    this.getGameTime();
    this.postGameStats("loss");
    return (
      <div>
        <h1 id="gameLose">Oh no!</h1>
      </div>
    );
  };

  getGameTime = () => {
    const gameTime = this.state.timer;
    setTimeout(() => {
      clearInterval(this.timerInterval);
      console.log(gameTime);
    }, 500);
    return gameTime;
  };

  postGameStats = result => {
    // const time = this.state.timer
    let time = this.getGameTime();
    fetch("http://localhost:3000/api/v1/postgame", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: 1, //need to add actual userId with trung from localStorage
        game_score: result, //this is good
        game_time: time //need to use timer state or other game time state for this to post
      })
    });
  };

  render() {
    const gameDone =
      this.state.timer > 5
        ? !this.state.tableDecks.find(deck => {
          return deck.value.length > 0;
        })
        : false;
    if (this.state.mode === "") {
      return (
        <div className="mode">
          <h3>Choose Game Difficulty</h3>
          <button onClick={() => this.handleMode("easy")}>Easy</button>
          <button onClick={() => this.handleMode("medium")}>Medium</button>
          <button onClick={() => this.handleMode("hard")}>Hard</button>
        </div>
      );
    } else if (gameDone) {
      return this.gameFinished();
    } else if (this.state.gameEnded) {
      return this.gameLost();
    } else {
      return (
        <div>
          <div id="gameTimer">{this.timer()}</div>
          <TableDecks
            decks={this.state.tableDecks}
            tableCardClick={this.tableCardClick}
          />
          <div className="lowerDecks">
            <DrawDeck
              deck={this.state.drawDeck}
              drawCardClick={this.drawCardClick}
            />
            <PlayerDeck deck={this.state.playerDeck} />
            <WildDeck
              deck={this.state.wildDeck}
              wildCardClick={this.wildCardClick}
            />
          </div>
          <button
            id="endGame"
            onClick={() => this.setState({ gameEnded: true })}
          >
            Womp womp
          </button>
        </div>
      );
    }
  }
}
