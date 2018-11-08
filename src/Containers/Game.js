import React from 'react'

export default class Game extends React.Component {
    state = {
        deck: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/Cards')
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    deck: data
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Game La La La</h1>
                {this.state.deck.map((card) => {
                    return <img src={card.image} />
                })}
            </div>
        )
    }
}