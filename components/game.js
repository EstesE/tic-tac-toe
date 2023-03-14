'use client';

import Board from "./board";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0 && move < 9) {
      description = `Go to move #${move}`;
    } else if (move === 9) {
      description = `End of game!`;
    } else {
      description = `Go to game start`;
    }

    return (
      <li key={move}>
        {/* <button onClick={() => jumpTo(move)}>{description}</button> */}
        <Button variant="outline-primary" style={{ width: '125px' }} size="sm" className="mb-1" onClick={() => jumpTo(move)}>{description}</Button>
      </li>
    );
  });

  return (
    <Container className="game">
      <Row>
        <Col style={{ alignContent: 'center' }} xs={8} className="game-board center-block text-center">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </Col>
        <Col style={{ paddingTop: '1rem' }} xs={4} className="game-info">
        <ol>
          {moves}
        </ol>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
