import React from 'react'

export default class GlobalStats extends React.Component {
    state = {
        stats: [],
        render: false
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/api/v1/games")
        .then(resp => resp.json())
        .then(sdata => {
            const stats = sdata.sort(function(a, b) {return parseInt(a.game_time) - parseInt(b.game_time)}) 
            this.setState({ stats })
        })
        setTimeout(function() { 
            this.setState({render: true}) 
        }.bind(this), 1000)
    }
    
    displayMedium = () => {
        const stats = [...this.state.stats].filter(s => s.game_mode === 'medium').slice(0, 5)
        stats.map((s, i)=> {
            return <p>`${i+1}. ${s.user.id}- ${s.game_time} seconds`</p>
        })
    }
    
    render() {
        const { stats } = this.state
        let renderContainer = false 
        if(this.state.render) {
            const eStats = [...this.state.stats].filter(s => s.game_mode === 'easy').slice(0, 5)
            const mStats = [...this.state.stats].filter(s => s.game_mode === 'medium').slice(0, 5)
            const hStats = [...this.state.stats].filter(s => s.game_mode === 'hard').slice(0, 5)
            return (
                <div>
                    <h2>Leaderboard Stats</h2>
                    <h3>Easy Mode</h3>
                        <div>
                            <ul id='statsList'>
                                {eStats.map((s, i)=> {
                                    return <li>{i+1}. user{s.user.id} - {s.game_time} seconds</li>
                                })}
                            </ul>
                        </div>
                    <h3>Medium Mode</h3>
                        <div>
                            <ul id='statsList'>
                                {mStats.map((s, i)=> {
                                    return <li>{i+1}. user{s.user.id} - {s.game_time} seconds</li>
                                })}
                            </ul>
                        </div>
                    <h3>Hard Mode</h3>
                        <div>
                            <ul id='statsList'>
                                {hStats.map((s, i)=> {
                                    return <li>{i+1}. user{s.user.id} - {s.game_time} seconds</li>
                                })}
                            </ul>
                        </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

{/* <p>Games Won: { [...stats].filter(s => s.game_score === 'win').length }</p>
                        <p>Games Lost: { [...stats].filter(s => s.game_score === 'loss').length }</p>
                        <p>Fastest Time: { stats.length > 0 
                            ? 
                            (stats.find(s => s.game_score === 'win').game_time + ' seconds')
                            : 
                            null 
                            }
                        </p> */}