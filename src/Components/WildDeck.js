import React from "react";

export default class WildDeck extends React.Component {
    render() {
        const { deck, wildCardClick, id } = this.props;
        return (
            <div id='wildDeck' className="card">
                {deck[0] ? (
                    <img
                        onClick={() => {
                            wildCardClick(deck[0]);
                            console.log(deck[0])
                        }}
                        src={require("../images/wild.png")}
                        alt="oh!no"
                    />
                ) : null}
            </div>
        );
    }
}
