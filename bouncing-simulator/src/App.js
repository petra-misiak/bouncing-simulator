import "./App.css";
import defaultBoard from "./ExamInput.js";
import { useEffect, useState } from "react";

let interval;
const directions = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

let currentDirection = directions[0];
function App() {
  const [board, setBoard] = useState("");

  useEffect(() => {
    setBoard(defaultBoard);
  }, []);

  const start = () => {
    setBoard((previousBoard) => {
      const newBoard = [...previousBoard];

      const currentRow = newBoard.findIndex((row) => row.includes("1"));
      const currentCol = newBoard
        .find((row) => row.includes("1"))
        .findIndex((col) => col === "1");
      let ii = directions.findIndex(
        (dir) =>
          currentDirection[0] === dir[0] && currentDirection[1] === dir[1]
      );

      while (
        newBoard[currentRow + currentDirection[0]][
          currentCol + currentDirection[1]
        ] === "X"
      ) {
        currentDirection = directions[ii];

        ii++;
        if (ii === 4) {
          ii = 0;
        }
      }

      newBoard[currentRow][currentCol] = "0";

      if (
        newBoard[currentRow + currentDirection[0]][
          currentCol + currentDirection[1]
        ] === "Y"
      ) {
        newBoard[currentRow + currentDirection[0]][
          currentCol + currentDirection[1]
        ] = "0";

        const filteredDirections = directions.filter(
          (dir) =>
            dir[0] * -1 !== currentDirection[0] ||
            dir[1] * -1 !== currentDirection[1]
        );

        let random = parseInt(Math.random() * 3);
        currentDirection = filteredDirections[random];

        console.log(currentDirection);

        while (
          newBoard[currentRow + currentDirection[0]][
            currentCol + currentDirection[1]
          ] === "X"
        ) {
          random = parseInt(Math.random() * 3);
          currentDirection = filteredDirections[random];
        }

        newBoard[currentRow + currentDirection[0]][
          currentCol + currentDirection[1]
        ] = "1";
      } else {
        newBoard[currentRow + currentDirection[0]][
          currentCol + currentDirection[1]
        ] = "1";
      }

      return newBoard;
    });
  };

  return (
    <>
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            setBoard([
              ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
              ["X", "1", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
              ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
              ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ]);
            clearInterval(interval);
            interval = null;
          }}
        >
          Reset
        </button>
        <button
          className="button"
          onClick={() => {
            if (interval) {
              return;
            }

            interval = setInterval(() => {
              start();
            }, 300);
          }}
        >
          Start
        </button>
      </div>

      {board && (
        <div
          className="board"
          style={{
            width: `${board[0].length * 23}px`,
            height: `${board.length * 23}px`,
          }}
        >
          {board.map((rows, i) =>
            rows.map((cols, j) => (
              <div
                key={j}
                className="square"
                style={{
                  backgroundColor:
                    board[i][j] === "X"
                      ? "black"
                      : board[i][j] === "1"
                      ? "red"
                      : board[i][j] === "Y"
                      ? "blue"
                      : "",
                }}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default App;
