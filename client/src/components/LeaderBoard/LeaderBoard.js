import { useCallback, useEffect, useState } from 'react';

import './LeaderBoard.css';
import LeaderBoardTable from './LeaderBoardTable';

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaderBoardHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://catcher.amansingh.dev/api/leaderboard'
      );

      if (!response.ok) {
        console.log(response);
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      const loadedPlayers = [];

      for (const index in data) {
        loadedPlayers.push({
          rank: parseInt(index) + 1,
          name: data[index].name,
          score: data[index].score,
        });
      }

      setPlayers(loadedPlayers);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, []);

  // Fetch Players on component load
  useEffect(() => {
    fetchLeaderBoardHandler();
  }, [fetchLeaderBoardHandler]);

  let content = '';
  if (loading) content = <p>Loading...</p>;
  else if (players.length === 0)
    content = <p style={{ fontSize: '15pt' }}>No data found</p>;
  else content = <LeaderBoardTable data={players} />;

  return <div className="leaderboard">{content}</div>;
};

export default LeaderBoard;
