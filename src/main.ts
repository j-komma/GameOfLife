#!/usr/bin/env node

import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";
import yargs from 'yargs';
import { Cell } from "./cell";
import { Seed } from "./seed";

// get CLA arguments
const argv = yargs
    .option('seed', {
        description: 'Seed for start of the game',
        type: 'string',
        alias: 's',
        conflicts: ['width', 'height', 'randomness', 'infinite']
    })
    .option('width', {
        description: 'width of the field by default the width of the console',
        type: 'number',
        alias: 'w',
    })
    .option('height', {
        description: 'height of the field by default the height of the console',
        type: 'number',
        alias: 'h',
    })
    .option('randomness', {
        description: 'used to regulate the spawn rate in random mode. 85 by default',
        type: 'number',
        alias: 'r',
        conflicts: ['seed']
    })
    .option('infinite', {
        description: 'play in infinite mode',
        type: 'boolean',
        alias: 'i',
        conflicts: ['seed', 'width', 'height']
    })
    .check((argv) => {
        if (argv.height &&  argv.height > process.stdout.rows -3) {
            throw new Error('Passed height is too big for the terminal');
        }

        if (argv.width && argv.width> process.stdout.columns) {
            throw new Error('Passed width is too big for the terminal');
        }

        if (argv.height && argv.height <= 0 || argv.width && argv.width <= 0) {
            throw new Error('Height and Width must be greater than 0');
        }

        if (argv.randomness && (argv.randomness < 1 || argv.randomness > 100)) {
            throw new Error('randomness must be in the range 1 - 100');
        }
    
        return true;
    })
    .parseSync();


// sone default settings
const aliveCell: string = 'X';
const emptyCell: string = ' ';

const height = argv.height || process.stdout.rows - 3;
const width = argv.width || process.stdout.columns;
const randomness = argv.randomness || 85;

// create a new field
const fieldGenerator: Field = new Field(height, width, aliveCell, emptyCell, randomness);

if (argv.infinite) {
    fieldGenerator.initInfinite();
} else if (argv.seed) {
    // read seed-file and init the field
    const seed = new Seed(argv.seed);
    const seedCells: Cell[] = seed.cells;
    fieldGenerator.initSeed(seedCells);
} else {
    fieldGenerator.initRandom();
}

// create a new game
const game: GameOfLife = new GameOfLife(fieldGenerator);

// play the game
setInterval(() => game.play(), 100);