import { Cell } from "./cell";
import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";

// make some base settings

const aliveCell: string = 'X';
const emptyCell: string = ' ';

const fieldRows: number = 10;
const fieldCols: number = 50;

// create a new field
const fieldGenerator: Field = new Field(fieldRows, fieldCols, aliveCell, emptyCell);

// init the field with the random initiator
fieldGenerator.initRandom();

// const seed: Cell[] = [
//     new Cell(1, 2, true),
//     new Cell(2, 1, true),
//     new Cell(2, 3, true),
//     new Cell(3, 2, true),
//     new Cell(3, 3, true),
// ]

// fieldGenerator.initSeed(seed);

// create a new game
const game: GameOfLife = new GameOfLife(fieldGenerator);

// play the game
setInterval(() => game.play(), 80);