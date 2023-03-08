#!/usr/bin/env node

import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";
import yargs from 'yargs';
import { Cell } from "./cell";
import { Seed } from "./seed";

// get CLA arguments
const argv = yargs
    .option('input', {
        describe: 'Seed for start of the game',
        type: 'string',
        alias: 'i',
        conflicts: ['width', 'height', 'randomlimit']
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
    .option('randomlimit', {
        describe: 'used to regulate the spawn rate in random mode',
        type: 'number',
        alias: 'r',
        default: 85,
        conflicts: 'input'
    })
    .check((argv) => {
        if (argv.height > process.stdout.rows -3) {
            throw new Error('Passed height is too big for the terminal');
        }

        if (argv.width > process.stdout.columns) {
            throw new Error('Passed width is too big for the terminal');
        }

        if (argv.height <= 0 || argv.width <= 0) {
            throw new Error('Height and Width must be greater than 0');
        }

        if (argv.randomlimit < 1 || argv.randomlimit > 100) {
            throw new Error('randomlimit must be in the range 1 - 100');
        }
    
        return true;
    })
    .parseSync();


// sone default settings
const aliveCell: string = 'X';
const emptyCell: string = ' ';

// create a new field
const fieldGenerator: Field = new Field(argv.height, argv.width, aliveCell, emptyCell);

if (argv.input) {
    // read seed-file and init the field
    const seed = new Seed(argv.input);
    const seedCells: Cell[] = seed.cells;
    fieldGenerator.initSeed(seedCells);
} else {
    fieldGenerator.initRandom(argv.randomlimit);
}

// create a new game
const game: GameOfLife = new GameOfLife(fieldGenerator);

// play the game
setInterval(() => game.play(), 80);