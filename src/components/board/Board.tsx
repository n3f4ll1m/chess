import React from "react";

import { letters, numbers } from "./constants";
import "./Board.scss";
import useBoard from "./useBoard";
import Tile from "../tile/Tile";

const Board: React.FC = () => {
  const {
    undoLastStep,
    activateFigure,
    figures,
    activeFigure,
    isActive,
    canMove,
    canAttack,
    canSpecialMove,
  } = useBoard();
  const board = [];
  for (let i = 0; i < 64; i++) {
    let image;
    let figureId;
    let tileCanMove = false;
    let tileCanAttack = false;
    let tileCanSpecialMove = false;
    const x = i % 8;
    const y = Math.floor(i / 8);
    for (const piece of figures) {
      if (piece.x === x && piece.y === y) {
        image = piece.image?.img;
        figureId = piece.id;
      }
    }
    for (const pos of canMove) {
      if (pos.x === x && pos.y === y) {
        tileCanMove = true;
      }
    }
    for (const pos of canAttack) {
      if (pos.x === x && pos.y === y) {
        tileCanAttack = true;
      }
    }
    for (const pos of canSpecialMove) {
      if (pos.x === x && pos.y === y) {
        tileCanSpecialMove = true;
      }
    }
    board.push(
      <Tile
        key={i}
        x={x}
        y={y}
        image={image}
        figureId={figureId}
        activeFigure={activeFigure}
        isActive={isActive}
        tileCanMove={tileCanMove}
        tileCanAttack={tileCanAttack}
        tileCanSpecialMove={tileCanSpecialMove}
      />
    );
  }
  console.log("canSpecial", canSpecialMove);
  return (
    <>
      <div className="numbers">
        {numbers.map((number, index) => (
          <div key={index}>{number}</div>
        ))}
      </div>
      <div className="board" onClick={activateFigure}>
        {board}
      </div>
      <div className="letters">
        {letters.map((letter, index) => (
          <div key={index}>{letter}</div>
        ))}
      </div>
      <button type="button" className="undoButton" onClick={undoLastStep}>
        undo
      </button>
    </>
  );
};
export default Board;
