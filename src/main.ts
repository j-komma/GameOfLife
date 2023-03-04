import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";

const aliveCell: string = 'X';
const emptyCell: string = '-';

const fieldRows: number = 10;
const fieldCols: number = 50;

const fieldGenerator: Field = new Field(fieldRows, fieldCols);

fieldGenerator.initRandom();

const game: GameOfLife = new GameOfLife(fieldGenerator);

game.play();

// const printField: string = fieldGenerator.print(aliveCell, emptyCell);

// console.log(printField);