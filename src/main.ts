import { Field } from "./field";

const aliveCell: string = 'X';
const emptyCell: string = '-';

const fieldRows: Number = 10;
const fieldCols: Number = 10;

const fieldGenerator: Field = new Field(fieldRows, fieldCols);

fieldGenerator.initRandom();

const printField: string = fieldGenerator.print(aliveCell, emptyCell);

console.log(printField);