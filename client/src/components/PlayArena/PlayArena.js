import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './PlayArena.css';
import { updateGameState } from '../../features/game-state';
import { END_GAME } from '../../constants/game-states';

export const PlayArena = () => {
  const [seconds, setSeconds] = useState(10);
  const currentScore = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
        dispatch(updateGameState(END_GAME));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, dispatch]);

  return (
    <div className="arena-container">
      <div className="hud">
        <h3 className="score">Score: {currentScore}</h3>
        <h3 className="timer">Time Left: {seconds}s</h3>
      </div>
      <h1>Play game here</h1>
    </div>
  );
};

export default PlayArena;
