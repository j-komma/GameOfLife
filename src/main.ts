import { Cell } from "./cell";
import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";

const aliveCell: string = 'X';
const emptyCell: string = ' ';

const fieldRows: number = 10;
const fieldCols: number = 50;

const fieldGenerator: Field = new Field(fieldRows, fieldCols);

fieldGenerator.initRandom();

const seed: Cell[] = [
    new Cell(1, 1, true),
    new Cell(2, 2, true),
    new Cell(3, 3, true),
    new Cell(4, 4, true),
]

// fieldGenerator.initSeed(seed);

const game: GameOfLife = new GameOfLife(fieldGenerator);

setInterval(() => game.play(), 80);