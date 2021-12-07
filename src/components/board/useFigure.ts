import { useState } from "react";
import { images } from "../../res/img/images";

export interface Figure {
  image: { img: string };
  x: number;
  y: number;
  id: string;
}

const useFigure = () => {
  const intitialFigure: Figure[] = [
    {
      image: { img: images.whiteBishop },
      x: 2,
      y: 7,
      id: "whiteBishop1",
    },
    {
      image: { img: images.whiteBishop },
      x: 5,
      y: 7,
      id: "whiteBishop2",
    },
    {
      image: { img: images.whiteRook },
      x: 0,
      y: 7,
      id: "whiteRook1",
    },
    {
      image: { img: images.whiteRook },
      x: 7,
      y: 7,
      id: "whiteRook2",
    },
    {
      image: { img: images.whiteKnight },
      x: 1,
      y: 7,
      id: "whiteKnight1",
    },
    {
      image: { img: images.whiteKnight },
      x: 6,
      y: 7,
      id: "whiteKnight2",
    },
    {
      image: { img: images.whiteKing },
      x: 4,
      y: 7,
      id: "whiteKing1",
    },
    {
      image: { img: images.whiteQueen },
      x: 3,
      y: 7,
      id: "whiteQueen1",
    },
    {
      image: { img: images.blackBishop },
      x: 2,
      y: 0,
      id: "blackBishop1",
    },
    {
      image: { img: images.blackBishop },
      x: 5,
      y: 0,
      id: "blackBishop2",
    },
    {
      image: { img: images.blackRook },
      x: 0,
      y: 0,
      id: "blackRook1",
    },
    {
      image: { img: images.blackRook },
      x: 7,
      y: 0,
      id: "blackRook2",
    },
    {
      image: { img: images.blackKnight },
      x: 1,
      y: 0,
      id: "blackKnight1",
    },
    {
      image: { img: images.blackKnight },
      x: 6,
      y: 0,
      id: "blackKnight2",
    },
    {
      image: { img: images.blackKing },
      x: 4,
      y: 0,
      id: "blackKing1",
    },
    {
      image: { img: images.blackQueen },
      x: 3,
      y: 0,
      id: "blackQueen1",
    },
  ];
  for (let i = 0; i < 8; i++) {
    intitialFigure.push({
      image: { img: images.blackPawn },
      x: i,
      y: 1,
      id: `blackPawn${i}`,
    });
  }
  for (let i = 0; i < 8; i++) {
    intitialFigure.push({
      image: { img: images.whitePawn },
      x: i,
      y: 6,
      id: `whitePawn${i}`,
    });
  }
  const [figures, setFigures] = useState(intitialFigure);
  return { figures, setFigures };
};
export default useFigure;
