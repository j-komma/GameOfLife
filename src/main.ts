#!/usr/bin/env node

import { Cell } from "./cell";
import { Field } from "./field";
import { GameOfLife } from "./gameOfLife";
import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as fs from 'fs';

// make some base settings

const argv = yargs(hideBin(process.argv))
    .option('seed', {
        describe: 'Seed for start of the game',
        type: 'string'
    })
    .help()
    .argv;

const aliveCell: string = 'X';
const emptyCell: string = ' ';

const fieldRows: number = 10;
const fieldCols: number = 50;

// create a new field
const fieldGenerator: Field = new Field(fieldRows, fieldCols, aliveCell, emptyCell);

// init the field with the random initiator
// fieldGenerator.initRandom();

const seedLocation = './input/seed';

const seed = fs.readFileSync(seedLocation, 'utf-8').split('\n');

fieldGenerator.initSeed(seed);

// create a new game
const game: GameOfLife = new GameOfLife(fieldGenerator);

// play the game
setInterval(() => game.play(), 80);