import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './PlayArena.css';
import { updateGameState } from '../../features/game-state';
import { END_GAME } from '../../constants/game-states';
import Boat from '../UI/Boat/Boat';

export const PlayArena = () => {
  const [seconds, setSeconds] = useState(1000);
  const [boatX, setBoatX] = useState(0);
  const currentScore = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  // Timer
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

  // Boat
  useEffect(() => {
    const boatMoveHandler = (e) => {
      setBoatX(e.clientX - 20);
    };

    window.addEventListener('mousemove', boatMoveHandler);

    return () => {
      window.removeEventListener('mousemove', boatMoveHandler);
    };
  }, []);

  const boatStyle = {
    position: 'absolute',
    left: boatX,
    bottom: 0,
  };

  return (
    <div className="arena-container">
      <div className="hud">
        <h3 className="score">Score: {currentScore}</h3>
        <h3 className="timer">Time Left: {seconds}s</h3>
      </div>

      <Boat style={boatStyle} />
    </div>
  );
};

export default PlayArena;
