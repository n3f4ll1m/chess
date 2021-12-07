import { pos, setter } from "../components/board/constants";
import { Figure } from "../components/board/useFigure";
export const pawnAttack = (
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
        ((x! - 1 === piece.x && y! - 1 === piece.y) ||
          (x! + 1 === piece.x && y! - 1 === piece.y))
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
export const pawnMove = (
  figures: Figure[],
  id: string,
  setCanMove: setter<pos[]>
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
  if (isWhite) {
    if (
      figures.filter((piece) => x! === piece.x && y! - 1 === piece.y).length ===
      0
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: x!, y: y! - 1 });
        return temp;
      });
    }
    if (
      figures.filter((piece) => x! === piece.x && y! - 2 === piece.y).length ===
        0 &&
      y === 6
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: x!, y: y! - 2 });
        return temp;
      });
    }
  } else {
    if (
      figures.filter((piece) => x! === piece.x && y! + 1 === piece.y).length ===
      0
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: x!, y: y! + 1 });
        return temp;
      });
    }
    if (
      figures.filter((piece) => x! === piece.x && y! + 2 === piece.y).length ===
        0 &&
      y === 1
    ) {
      setCanMove((prev) => {
        const temp = [...prev];
        temp.push({ x: x!, y: y! + 2 });
        return temp;
      });
    }
  }
};
