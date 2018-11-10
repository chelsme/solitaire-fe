import React from "react";

export default class TableDeck extends React.Component {
    render() {
        const { deck, tableCardClick, id } = this.props;
        return (
            <div className="card">
                {deck.value[0] ? (
                    <img
                        onClick={() => {
                            tableCardClick(deck, id);
                        }}
                        src={deck.value[0].image}
                        alt="oh!no"
                    />
                ) : (
                        <img src={require(`../images/skull_${id + 1}.png`)} alt='no!' />
                    )}
            </div>
        );
    }
}
