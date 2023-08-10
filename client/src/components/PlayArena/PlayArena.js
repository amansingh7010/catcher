import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './PlayArena.css';
import { updateGameState } from '../../features/game-state';
import { updateScore } from '../../features/score';
import { END_GAME } from '../../constants/game-states';
import Boat from '../UI/Boat/Boat';
import CatchItem from '../UI/CatchItem/CatchItem';

export const PlayArena = () => {
  const [seconds, setSeconds] = useState(60);
  const [boatX, setBoatX] = useState(0);
  const [catchItems, setCatchItems] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const dispatch = useDispatch();

  const itemFallSpeed = 7;
  const itemGenerationInterval = 2000;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
        dispatch(updateScore(currentScore));
        dispatch(updateGameState(END_GAME));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, currentScore, dispatch]);

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

  // Catch Item Generation
  useEffect(() => {
    const gameInterval = setInterval(() => {
      const randomX = Math.random() * (window.innerWidth - 70);
      setCatchItems((prevItems) => [...prevItems, { x: randomX, y: 0 }]);
    }, itemGenerationInterval);

    return () => clearInterval(gameInterval);
  }, []);

  // Catch Item Fall
  useEffect(() => {
    const itemFallInterval = setInterval(() => {
      setCatchItems((prevItems) => {
        const newItems = prevItems.map((item) => ({
          ...item,
          y: item.y + itemFallSpeed,
        }));
        return newItems.filter((item) => item.y < window.innerHeight - 70);
      });
    }, 50);

    return () => clearInterval(itemFallInterval);
  }, []);

  const boatStyle = {
    position: 'absolute',
    left: boatX,
    bottom: 0,
  };

  const catchItemStyle = {
    position: 'absolute',
  };

  useEffect(() => {
    // Set to efficiently store multiple collisions
    const collidingItemIds = new Set();

    const itemFallInterval = setInterval(() => {
      setCatchItems((prevItems) => {
        const newItems = prevItems.map((item) => ({
          ...item,
          y: item.y + itemFallSpeed,
        }));

        // Collision detection
        newItems.forEach((item, index) => {
          if (
            item.y >= window.innerHeight - 135 &&
            item.x >= boatX &&
            item.x <= boatX + 60
          ) {
            collidingItemIds.add(index);
          }
        });

        const updatedScore = collidingItemIds.size;

        setCurrentScore(currentScore + updatedScore);

        return newItems.filter(
          (_, index) =>
            !collidingItemIds.has(index) &&
            newItems[index].y < window.innerHeight
        );
      });
    }, 300);

    return () => clearInterval(itemFallInterval);
  }, [boatX, currentScore, dispatch]);

  return (
    <div className="arena-container">
      <div className="hud">
        <h3 className="score">Score: {currentScore}</h3>
        <h3 className="timer">Time Left: {seconds}s</h3>
      </div>
      <Boat style={boatStyle} />
      {catchItems.map((item, index) => (
        <CatchItem
          key={index}
          style={{ ...catchItemStyle, left: item.x, top: item.y }}
        />
      ))}
    </div>
  );
};

export default PlayArena;
