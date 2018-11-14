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
      const eStats = [...stats].filter(s => s.game_mode === "easy").slice(0, 3);
      const mStats = [...stats]
        .filter(s => s.game_mode === "medium")
        .slice(0, 3);
      const hStats = [...stats].filter(s => s.game_mode === "hard").slice(0, 3);
      return (
        <div>
          <h3>Leaderboard Stats</h3>
          <ol className="statsList">
            <lh>Fastest Time: Easy</lh>
            {eStats.map(s => {
              return (
                <li id="statsListItem">
                  {s.user.username} - {s.game_time} sec.
                </li>
              );
            })}
          </ol>
          <ol className="statsList">
            <lh>Fastest Time: Medium</lh>
            {mStats.map(s => {
              return (
                <li className="statsList">
                  {s.user.username} - {s.game_time} sec.
                </li>
              );
            })}
          </ol>
          <ol className="statsList">
            <lh>Fastest Time: Hard</lh>
            {hStats.map(s => {
              return (
                <li className="statsList">
                  {s.user.username} - {s.game_time} sec.
                </li>
              );
            })}
          </ol>
          <ol className="statsList">
            <lh>Most Wins: Easy</lh>
            {this.displayEasyWins()}
          </ol>
          <ol className="statsList">
            <lh>Most Wins: Medium</lh>
            {this.displayMediumWins()}
          </ol>
          <ol className="statsList">
            <lh>Most Wins: Hard</lh>
            {this.displayHardWins()}
          </ol>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
