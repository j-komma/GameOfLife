#!/usr/bin/env node

import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";
import yargs, { Argv } from 'yargs';
import * as fs from 'fs';
import { Cell } from "./cell";
import { Seed } from "./seed";

// get CLA arguments
const argv = yargs
    .option('input', {
        describe: 'Seed for start of the game',
        type: 'string',
        alias: 'i'
    })
    .option('width', {
        describe: 'width of the field by default the width of the console',
        type: 'number',
        alias: 'w',
        default: process.stdout.columns,
        
    })
    .option('height', {
        describe: 'height of the field by default the height of the console',
        type: 'number',
        alias: 'h',
        default: process.stdout.rows - 3
    })
    .parseSync();


// sone default settings
const aliveCell: string = 'X';
const emptyCell: string = ' ';

// create a new field
const fieldGenerator: Field = new Field(argv.height, argv.width, aliveCell, emptyCell);

if (argv.input) {
    const seed = new Seed(argv.input);
    const seedCells: Cell[] = seed.cells;
    fieldGenerator.initSeed(seedCells);
} else {
    fieldGenerator.initRandom();
}

// create a new game
const game: GameOfLife = new GameOfLife(fieldGenerator);

// play the game
setInterval(() => game.play(), 80);