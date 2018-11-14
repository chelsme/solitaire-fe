import React from "react";

export default class GlobalStats extends React.Component {
  state = {
    stats: [],
    render: false
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/games")
      .then(resp => resp.json())
      .then(sdata => {
        const stats = sdata.sort(function(a, b) {
          return parseInt(a.game_time) - parseInt(b.game_time);
        });
        this.setState({ stats });
      });
    setTimeout(
      function() {
        this.setState({ render: true });
      }.bind(this),
      1000
    );
  }

  displayEasyWins = () => {
    const eWins = this.state.stats.filter(
      s => s.game_mode === "easy" && s.game_score === "win"
    );
    const easyWinObj = eWins.reduce(function(allWins, win) {
      if (win.user.username in allWins) {
        allWins[win.user.username]++;
      } else {
        allWins[win.user.username] = 1;
      }
      return allWins;
    }, {});
    const winsArray = Object.keys(easyWinObj).map((key, i) => {
      return { name: key, wins: Object.values(easyWinObj)[i] };
    });
    const sortArray = winsArray.sort((a, b) => {
      return b.wins - a.wins;
    });
    return sortArray.map((obj, i) => {
      return i < 3 ? (
        <li>
          {obj.name} - {obj.wins} win(s).
        </li>
      ) : null;
    });
  };

  displayMediumWins = () => {
    const mWins = this.state.stats.filter(
      s => s.game_mode === "medium" && s.game_score === "win"
    );
    const mediumWinsObj = mWins.reduce(function(allWins, win) {
      if (win.user.username in allWins) {
        allWins[win.user.username]++;
      } else {
        allWins[win.user.username] = 1;
      }
      return allWins;
    }, {});
    const winsArray = Object.keys(mediumWinsObj).map((key, i) => {
      return { name: key, wins: Object.values(mediumWinsObj)[i] };
    });
    const sortArray = winsArray.sort((a, b) => {
      return b.wins - a.wins;
    });
    return sortArray.map((obj, i) => {
      return i < 3 ? (
        <li>
          {obj.name} - {obj.wins} win(s).
        </li>
      ) : null;
    });
  };

  displayHardWins = () => {
    const hWins = this.state.stats.filter(
      s => s.game_mode === "hard" && s.game_score === "win"
    );
    const hWinsObj = hWins.reduce(function(allWins, win) {
      if (win.user.username in allWins) {
        allWins[win.user.username]++;
      } else {
        allWins[win.user.username] = 1;
      }
      return allWins;
    }, {});
    const winsArray = Object.keys(hWinsObj).map((key, i) => {
      return { name: key, wins: Object.values(hWinsObj)[i] };
    });
    const sortArray = winsArray.sort((a, b) => {
      return b.wins - a.wins;
    });
    return sortArray.map((obj, i) => {
      return i < 3 ? (
        <li>
          {obj.name} - {obj.wins} win(s).
        </li>
      ) : null;
    });
  };

  render() {
    const { stats } = this.state;
    if (this.state.render) {
      const eStats = [...stats]
        .filter(s => s.game_mode === "easy" && s.game_score === "win")
        .slice(0, 3);
      const mStats = [...stats]
        .filter(s => s.game_mode === "medium" && s.game_score === "win")
        .slice(0, 3);
      const hStats = [...stats]
        .filter(s => s.game_mode === "hard" && s.game_score === "win")
        .slice(0, 3);
      return (
        <div>
          <h3>Leaderboard Stats</h3>
          <div className="statRow">
            <ol className="statsList">
              <lh>
                <h4>Fastest Time: Easy</h4>
              </lh>
              {eStats.map(s => {
                return (
                  <li id="statsListItem">
                    {s.user.username} - {s.game_time} sec.
                  </li>
                );
              })}
            </ol>
            <ol className="statsList">
              <lh>
                <h4>Fastest Time: Medium</h4>
              </lh>
              {mStats.map(s => {
                return (
                  <li className="statsList">
                    {s.user.username} - {s.game_time} sec.
                  </li>
                );
              })}
            </ol>
            <ol className="statsList">
              <lh>
                <h4>Fastest Time: Hard</h4>
              </lh>
              {hStats.map(s => {
                return (
                  <li className="statsList">
                    {s.user.username} - {s.game_time} sec.
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="statRow">
            <ol className="statsList">
              <lh>
                <h4>Most Wins: Easy</h4>
              </lh>
              {this.displayEasyWins()}
            </ol>
            <ol className="statsList">
              <lh>
                <h4>Most Wins: Medium</h4>
              </lh>
              {this.displayMediumWins()}
            </ol>
            <ol className="statsList">
              <lh>
                <h4>Most Wins: Hard</h4>
              </lh>
              {this.displayHardWins()}
            </ol>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
