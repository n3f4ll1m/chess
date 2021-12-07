import { pos, setter } from "../components/board/constants";
import { Figure } from "../components/board/useFigure";

export const kingSpecialMove = (
  figures: Figure[],
  id: string,
  setCanSpecialMove: setter<pos[]>
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

  if (x === 4 && y === (isWhite ? 7 : 0)) {
    console.log(`${isWhite ? "white" : "black"} king in start position`);
    const rightRook = figures.find(
      (piece) => piece.id === `${isWhite ? "white" : "black"}Rook2`
    );
    if (rightRook && rightRook.x === 7 && rightRook.y === (isWhite ? 7 : 0)) {
      console.log("right rook in start position");
      if (
        figures.filter(
          ((piece) => piece.x === 5 && piece.y === (isWhite ? 7 : 0)) ||
            ((piece) => piece.x === 6 && piece.y === (isWhite ? 7 : 0))
        ).length === 0
      ) {
        console.log("right side nothing on the way");
        setCanSpecialMove((prev) => {
          const temp = [...prev];
          temp.push({ x: 6, y: isWhite ? 7 : 0 });
          return temp;
        });
      }
    }
    const leftRook = figures.find(
      (piece) => piece.id === `${isWhite ? "white" : "black"}Rook1`
    );
    if (leftRook && leftRook.x === 0 && leftRook.y === (isWhite ? 7 : 0)) {
      console.log("left rook in start position");
      if (
        figures.filter(
          ((piece) => piece.x === 1 && piece.y === (isWhite ? 7 : 0)) ||
            ((piece) => piece.x === 2 && piece.y === (isWhite ? 7 : 0)) ||
            ((piece) => piece.x === 3 && piece.y === (isWhite ? 7 : 0))
        ).length === 0
      ) {
        console.log("left side nothing on the way");
        setCanSpecialMove((prev) => {
          const temp = [...prev];
          temp.push({ x: 1, y: isWhite ? 7 : 0 });
          return temp;
        });
      }
    }
  }
};

export const kingMove = (
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
    { x: x! + 1, y: y! - 1 },
    { x: x! + 1, y: y! + 1 },
    { x: x! - 1, y: y! - 1 },
    { x: x! - 1, y: y! + 1 },
    { x: x!, y: y! - 1 },
    { x: x!, y: y! + 1 },
    { x: x! - 1, y: y! },
    { x: x! + 1, y: y! },
  ];
  const inBoard = (x: number, y: number) => {
    return x > -1 && x < 8 && y > -1 && y < 8;
  };
  const checkCanMove = (kingPosX: number, kingPosY: number) => {
    if (
      inBoard(kingPosX, kingPosY) &&
      figures.filter((piece) => kingPosX === piece.x && kingPosY === piece.y)
        .length === 0
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: kingPosX, y: kingPosY });
        return temp;
      });
    }
  };
  for (const pos of movePositions) {
    checkCanMove(pos.x, pos.y);
  }
};

export const kingAttack = (
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
        ((x! + 1 === piece.x && y! - 1 === piece.y) ||
          (x! + 1 === piece.x && y! + 1 === piece.y) ||
          (x! - 1 === piece.x && y! - 1 === piece.y) ||
          (x! - 1 === piece.x && y! + 1 === piece.y) ||
          (x! + 1 === piece.x && y! === piece.y) ||
          (x! === piece.x && y! + 1 === piece.y) ||
          (x! === piece.x && y! - 1 === piece.y) ||
          (x! - 1 === piece.x && y! === piece.y))
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
