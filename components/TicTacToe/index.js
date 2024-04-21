import React, { useState } from 'react';

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xPositions, setXPositions] = useState([]);
  const [oPositions, setOPositions] = useState([]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return; // Don't allow changing occupied squares or play after win
    }

    const squaresCopy = squares.slice();
    const currentPlayer = xIsNext ? 'X' : 'O';
    const currentPlayerPositions = xIsNext ? xPositions : oPositions;
    const updatePlayerPositions = xIsNext ? setXPositions : setOPositions;

    if (currentPlayerPositions.length < 3) {
      currentPlayerPositions.push(i);
    } else {
      const oldestMoveIndex = currentPlayerPositions.shift();
      squaresCopy[oldestMoveIndex] = null;
      currentPlayerPositions.push(i);
    }
    squaresCopy[i] = currentPlayer;
    updatePlayerPositions(currentPlayerPositions.slice());

    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    const currentPlayerPositions = xIsNext ? xPositions : oPositions;
    const isOldest = currentPlayerPositions.length === 3 && currentPlayerPositions[0] === i;
    const opacity = isOldest && squares[i] ? 'opacity-30' : 'opacity-100';

    return (
      <button
        className={`w-24 h-24 bg-gray-800 font-bold text-xl text-white flex items-center justify-center border-2 border-gray-600 hover:bg-gray-700 ${opacity}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setXPositions([]);
    setOPositions([]);
  };

  const winner = calculateWinner(squares);
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-white text-2xl mb-4">{status}</div>
      <div>
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-6 rounded shadow-lg hover:bg-green-400"
        onClick={restartGame}
      >
        Restart Game
      </button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
