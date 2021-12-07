import { pos, setter } from "../components/board/constants";
import { Figure } from "../components/board/useFigure";

export const knightMove = (
  figures: Figure[],
  id: string,
  setCanMove: setter<pos[]>
) => {
  let x: number | undefined;
  let y: number | undefined;
  for (const piece of figures) {
    if (id === piece.id) {
      x = piece.x;
      y = piece.y;
    }
  }
  const movePositions = [
    { x: x! + 2, y: y! - 1 },
    { x: x! + 2, y: y! + 1 },
    { x: x! - 2, y: y! - 1 },
    { x: x! - 2, y: y! + 1 },
    { x: x! + 1, y: y! - 2 },
    { x: x! + 1, y: y! + 2 },
    { x: x! - 1, y: y! - 2 },
    { x: x! - 1, y: y! + 2 },
  ];
  const inBoard = (x: number, y: number) => {
    return x > -1 && x < 8 && y > -1 && y < 8;
  };
  const checkCanMove = (knightPosX: number, knightPosY: number) => {
    if (
      inBoard(knightPosX, knightPosY) &&
      figures.filter(
        (piece) => knightPosX === piece.x && knightPosY === piece.y
      ).length === 0
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: knightPosX, y: knightPosY });
        return temp;
      });
    }
  };
  for (const pos of movePositions) {
    checkCanMove(pos.x, pos.y);
  }
};

export const knightAttack = (
  figures: Figure[],
  id: string,
  setCanAttack: setter<pos[]>
) => {
  let x: number | undefined;
  let y: number | undefined;
  const isWhite = id.includes("white");
  for (const piece of figures) {
    if (id === piece.id) {
      x = piece.x;
      y = piece.y;
    }
  }

  figures
    .filter(
      (piece) =>
        piece.id.includes(isWhite ? "black" : "white") &&
        ((x! + 2 === piece.x && y! - 1 === piece.y) ||
          (x! + 2 === piece.x && y! + 1 === piece.y) ||
          (x! - 2 === piece.x && y! - 1 === piece.y) ||
          (x! - 2 === piece.x && y! + 1 === piece.y) ||
          (x! + 1 === piece.x && y! - 2 === piece.y) ||
          (x! + 1 === piece.x && y! + 2 === piece.y) ||
          (x! - 1 === piece.x && y! - 2 === piece.y) ||
          (x! - 1 === piece.x && y! + 2 === piece.y))
    )
    .map((piece) => {
      setCanAttack((prev) => {
        const temp = [...prev];
        temp.push({ x: piece.x, y: piece.y });
        return temp;
      });
      return piece;
    });
};
