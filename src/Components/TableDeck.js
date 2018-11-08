import React from 'react'

export default class TableDeck extends React.Component {
    render() {
        // const card = this.props.deck[n++.toString()]
        const deckstring = Number(this.props.id) + 1
        // const decknum = deckstring.tostring()
        const cardDeck = this.props.deck[deckstring.toString()]
        return (
            <div className='card' onClick={() => { this.props.tableCardClick(cardDeck, deckstring) }}>
                {cardDeck ? <img src={cardDeck[0].image} /> : null}
            </div>
        )
    }
}