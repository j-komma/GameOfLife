import { Field } from "./field";
import logUpdate from "log-update";

const aliveCell: string = 'X';
const emptyCell: string = '-';

const fieldRows: Number = 10;
const fieldCols: Number = 10;

const fieldGenerator: Field = new Field(fieldRows, fieldCols);

var field = fieldGenerator.initRandom(emptyCell, aliveCell);

const printField: string = field.map(row => row.join('')).join('\n');

// logUpdate(printField);

console.log(printField);