import React from 'react'

export default class GlobalStats extends React.Component {
    state = {
        stats: []
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/api/v1/games")
        .then(resp => resp.json())
        .then(sdata => {
            const stats = sdata.sort(function(a, b) {return parseInt(a.game_time) - parseInt(b.game_time)}) 
            this.setState({ stats })
        })
    }
    
    displayMedium = () => {
        const stats = [...this.state.stats].filter(s => s.game_mode === 'medium').slice(0, 5)
        
    }
    
    render() {
        const { stats } = this.state
        return (
            <div>
                <h2>Leaderboard Stats</h2>
                <h3>Easy Mode</h3>
                    <p>Games Won: { [...stats].filter(s => s.game_score === 'win').length }</p>
                    <p>Games Lost: { [...stats].filter(s => s.game_score === 'loss').length }</p>
                    <p>Fastest Time: { stats.length > 0 
                        ? 
                        (stats.find(s => s.game_score === 'win').game_time + ' seconds')
                        : 
                        null 
                        }
                    </p>
                {/* <h3>Medium Mode</h3>
                    {this.displayMedium()}
                <h3>Hard Mode</h3> */}

            </div>
        )
    }
}