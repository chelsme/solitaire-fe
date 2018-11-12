import React from "react";
import TableDecks from "./TableDecks";
import DrawDeck from "../Components/DrawDeck";
import PlayerDeck from "../Components/PlayerDeck";
import Clock from "../Components/Clock"

export default class Game extends React.Component {
    state = {
        deck: [],
        tableDecks: [],
        drawDeck: [],
        playerDeck: [],
        timer: 0
    };

    componentDidMount() {
        fetch("http://localhost:3000/Cards")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    deck: data,
                    start: new Date().getTime()
                });
            })
            .then(() => {
                this.initDecksState();
            })

        setInterval(() => {
            this.setState({ timer: this.state.timer + 1 })
        }, 1000)
    }

    initDecksState = () => {
        const shuffleDecks = [...this.state.deck].sort(function () {
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
        if (
            selectedTableDeck.value[0].value == playerDeck[0].value - 1 ||
            selectedTableDeck.value[0].value - 1 == playerDeck[0].value
        ) {
            playerDeck.unshift(selectedTableDeck.value[0]);
            let tableDecks = [...this.state.tableDecks];
            tableDecks[id].value = selectedTableDeck.value.slice(1);

            this.setState({ tableDecks, playerDeck }, () => {
            });
        } else if (
            (selectedTableDeck.value[0].value == 13 && playerDeck[0].value == 1) ||
            (selectedTableDeck.value[0].value == 1 && playerDeck[0].value == 13)
        ) {
            playerDeck.unshift(selectedTableDeck.value[0]);
            let tableDecks = [...this.state.tableDecks];
            tableDecks[id].value = selectedTableDeck.value.slice(1);

            this.setState({ tableDecks, playerDeck }, () => {
            });
        }
    };

    drawCardClick = (selectedDrawCard, id) => {
        let playerDeck = [...this.state.playerDeck];
        playerDeck.unshift(selectedDrawCard);
        const drawDeck = [...this.state.drawDeck].slice(1);

        this.setState({ playerDeck, drawDeck }, () => {
        });
    };

    timer = () => {
        const time = this.state.timer
        let seconds = time % 60
        if (seconds < 10)
            seconds = "0" + seconds
        const minutes = Math.floor(time / 60)
        return 'Timer: ' + minutes + ":" + seconds
    }

    render() {
        return (
            <div>
                <div id='gameTimer'>{this.timer()}</div>
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
