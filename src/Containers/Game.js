import React from 'react'
import TableDecks from './TableDecks'
import DrawDeck from '../Components/DrawDeck'
import PlayerDeck from '../Components/PlayerDeck'

export default class Game extends React.Component {
    state = {
        deck: [],
        tableDecks: [],
        drawDeck: [],
        playerDeck: [],
    }

    componentDidMount() {
        fetch('http://localhost:3000/Cards')
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    deck: data
                })
            })
            .then(() => {
                this.updateDecks()
            })
    }

    updateDecks = () => {
        const shuffleDecks = [...this.state.deck].sort(function () {
            return 0.5 - Math.random()
        })
        this.setState({
            tableDecks: [
                { '1': shuffleDecks.splice(0, 6) },
                { '2': shuffleDecks.splice(0, 6) },
                { '3': shuffleDecks.splice(0, 6) },
                { '4': shuffleDecks.splice(0, 6) },
                { '5': shuffleDecks.splice(0, 6) },
                { '6': shuffleDecks.splice(0, 6) }
            ],
            drawDeck: shuffleDecks.splice(0, 15),
            playerDeck: shuffleDecks.splice(0, 1),
        })
    }

    tableCardClick = (card, idnum) => {
        const id = idnum.toString()
        this.setState({
            tableDecks: [...this.state.tableDecks, { [id]: card.slice(1) }]
        }, () => { console.log(this.state) })
    }

    render() {
        return (
            <div>
                <h1>Game</h1>
                <TableDecks decks={this.state.tableDecks} tableCardClick={this.tableCardClick} />
                <DrawDeck deck={this.state.drawDeck} />
                <PlayerDeck deck={this.state.playerDeck} />
            </div >
        )
    }
}