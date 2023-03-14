# Conway's Game of Life in TypeScript

by [Jonathan Komma](https://github.com/daKomma)

# What is Conway's Game of Life

Conway's Game of Life is a "Zero-Player Game" meaning that its evolution is determined by its initial state, requiring no further input. [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)


# Requirements

- Node JS installed on your computer

# Install

to install the game follow these steps:

```bash
git clone https://github.com/daKomma/GameOfLife.git
```

```bash
cd GameOfLife
```

```bash
npm i
```

```bash
npm i -g ts-node
```

# Install global

to play the game as a global argument execute following steps in addition to those from "Install".

```bash
npm run create
```

# Play

In the project folder run:

```bash
ts-node ./src/main.ts
```

If the game is installed globally simply run:

```bash
gameoflife
```

# Arguments

|  Argument   | Alias |   Type  | Default            | Description  
| :----------: | :---: | :-----: | :----------------: | -----
| `infinite`   | `i`    | `boolean` |true                | Play the game in Infinite Mode. Means the field used for the logic is bigger than the Console. For the neighbors of the cells at the border is a random used to check if they are alive.   
| `seed`       | `s`    | `string`  | -                  | Use a input file as start value of the field. For further information see below.
| `width`      | `w`    | `number`  | width of terminal  | Set width of the field
| `height`     | `h`    | `number`  | height of terminal | Set height of the field
| `randomness` | `r`    | `number`  | 85                 | Value used to randomly spawn cells


# Seed

to use a seed for the game load in a file like this structure:

```json
[
    {"xPos": 1, "yPos": 2, "isAlive": true},
    {"xPos": 2, "yPos": 1, "isAlive": true},
    {"xPos": 2, "yPos": 3, "isAlive": true},
    {"xPos": 3, "yPos": 2, "isAlive": true},
    {"xPos": 3, "yPos": 3, "isAlive": true},
    {"xPos": 4, "yPos": 4, "isAlive": true},
    {"xPos": 3, "yPos": 10, "isAlive": true},
    {"xPos": 3, "yPos": 11, "isAlive": true},
    {"xPos": 3, "yPos": 12, "isAlive": true}
]
```

# Examples

```bash
gameoflife   
gameoflife --help   
gameoflife --infinite
gameoflife --seed ./seeds/seed.json
gameoflife -h 10 -w 100 -r 50
```

