import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './PlayArena.css';
import { updateGameState } from '../../features/game-state';
import { updateScore } from '../../features/score';
import { END_GAME } from '../../constants/game-states';
import Boat from '../UI/Boat/Boat';
import CatchItem from '../UI/CatchItem/CatchItem';

import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import e1 from '../../assets/e1.png';
import e2 from '../../assets/e2.png';

const friends = [p1, p2, p3, p4];
const enemies = [e1, e2];

export const PlayArena = () => {
  const [seconds, setSeconds] = useState(10);
  const [boatX, setBoatX] = useState(0);
  const [catchItems, setCatchItems] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [animationMessages, setAnimationMessages] = useState([]);
  const dispatch = useDispatch();

  const itemFallSpeed = 7;
  const itemGenerationInterval = 2000;

  // Hide pointer on game start
  useEffect(() => {
    document.body.classList.add('hide-pointer');

    return () => {
      document.body.classList.remove('hide-pointer');
    };
  }, []);

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
      const catchItemType = Math.random() < 0.5 ? 'p' : 'e'; // p = friend, e = enemy

      // Set a random item image
      let catchItemSrc = '';
      if (catchItemType === 'p') {
        catchItemSrc = friends[Math.floor(Math.random() * friends.length)];
      } else {
        catchItemSrc = enemies[Math.floor(Math.random() * enemies.length)];
      }

      setCatchItems((prevItems) => [
        ...prevItems,
        { x: randomX, y: 0, type: catchItemType, imgSrc: catchItemSrc },
      ]);
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

  // Collision detection and remove CatchItems
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
            item.y >= window.innerHeight - 150 &&
            item.x >= boatX - 100 &&
            item.x <= boatX + 100
          ) {
            collidingItemIds.add(index);
          }
        });

        let updatedScore = 0;

        // If the player catches more than one item at once
        collidingItemIds.forEach((index) => {
          const item = newItems[index];
          if (newItems[index].type === 'p') {
            updatedScore += 50; // +50 for p (friend)
            setAnimationMessages((prevMessages) => [
              ...prevMessages,
              { value: '+50', color: 'green', x: item.x, y: item.y },
            ]);
          } else {
            updatedScore -= 100; // -100 for e (enemy)
            setAnimationMessages((prevMessages) => [
              ...prevMessages,
              { value: '-100', color: '#e60000', x: item.x, y: item.y },
            ]);
          }
        });

        setCurrentScore((prevScore) => prevScore + updatedScore);

        return newItems.filter(
          (item, index) =>
            !collidingItemIds.has(index) &&
            newItems[index].y < window.innerHeight
        );
      });
    }, 300);

    return () => clearInterval(itemFallInterval);
  }, [boatX, currentScore, dispatch]);

  // Remove animation message after 1 second
  useEffect(() => {
    if (animationMessages.length > 0) {
      const messageTimeout = setTimeout(() => {
        setAnimationMessages([]);
      }, 1000); // Adjust the duration as needed
      return () => clearTimeout(messageTimeout);
    }
  }, [animationMessages]);

  const boatStyle = {
    position: 'absolute',
    left: boatX,
    bottom: 0,
  };

  const catchItemStyle = {
    position: 'absolute',
  };

  return (
    <div className="arena-container">
      <div className="hud">
        <h3 className="score">Score: {currentScore}</h3>
        <h3 className={seconds < 10 ? 'timer blinker' : 'timer'}>
          Time Left: {seconds}s
        </h3>
      </div>
      <Boat style={boatStyle} />

      {/* Render Falling Items */}
      {catchItems.map((item, index) => (
        <CatchItem
          key={index}
          imgSrc={item.imgSrc}
          style={{ ...catchItemStyle, left: item.x, top: item.y }}
        />
      ))}

      {/* Render messages when an item is caught */}
      {animationMessages.map((message, index) => (
        <div
          key={index}
          className="animation-message"
          style={{ color: message.color, top: message.y, left: message.x }}
        >
          {message.value}
        </div>
      ))}
    </div>
  );
};

export default PlayArena;
