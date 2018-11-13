import React from "react";

export default class TableDeck extends React.Component {
    render() {
        const { deck, tableCardClick, id } = this.props;
        return (
            <div className="card">
                {deck.value[0] ? (
                    <div className='deck'>
                        {deck.value.map((card, index) => {
                            return <img className={"card" + index} src={require(`../images/card_back.png`)} alt='stop it' />
                        })}
                        <img className='topCard'
                            onClick={() => {
                                tableCardClick(deck, id);
                            }}
                            src={deck.value[0].image}
                            alt="oh!no"
                        />
                    </div>

                ) : (
                        <img src={require(`../images/skull_${id + 1}.png`)} alt='no!' />
                    )}
            </div>
        );
    }
}
