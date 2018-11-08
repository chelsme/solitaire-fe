import React, { Fragment } from 'react'
import TableDeck from '../Components/TableDeck'

export default class TableDecks extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Decks</h1>
                <div className='tableDecks'>
                    {this.props.decks.map((deck, index) => {
                        return <TableDeck key={index} id={index} deck={deck} tableCardClick={this.props.tableCardClick} />
                    })}
                </div>
            </ Fragment>
        )
    }
}