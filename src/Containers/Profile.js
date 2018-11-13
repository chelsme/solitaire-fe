import React from 'react'

export default class Profile extends React.Component {
    state = {
        userStats: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/games")
            .then(resp => resp.json())
            .then(stats => {
                const tempStats = stats.filter(stat => stat.user.id === 1) //change this 1 to localStorage userId
                const userStats = tempStats.sort(function(a, b) {return parseInt(a.game_time) - parseInt(b.game_time)}) 
                this.setState({ userStats })
            })
    }

    render() {
        const { userStats } = this.state
        return (
            <div>
                <h2>Stats</h2>
                <p>Games Won: { [...userStats].filter(s => s.game_score === 'win').length }</p>
                <p>Games Lost: { [...userStats].filter(s => s.game_score === 'loss').length }</p>
                <p>Fastest Time: { userStats.length > 0 
                    ? 
                    userStats.find(s => s.)
                    : 
                    null 
                    }
                    </p>
            </div>
        )
    }
}