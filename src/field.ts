import { Cell } from "./cell";

export class Field {

    private _rows: number;

    private _cols: number;

    private _field: Cell[][];

    public get rows(): number {
        return this._rows;
    }
    public set rows(value: number) {
        this._rows = value;
    }

    public get cols(): number {
        return this._cols;
    }
    public set cols(value: number) {
        this._cols = value;
    }

    public get field(): Cell[][] {
        return this._field;
    }
    public set field(value: Cell[][]) {
        this._field = value;
    }

    constructor(rows: number, cols: number) {
        this._rows = rows;
        this._cols = cols;
        this._field = this.initEmpty();
    }


    private initEmpty(): Cell[][] {
        var field: Cell[][] = [];

        for (let rowCount = 0; rowCount < this.rows; rowCount++) {
            let row: Cell[] = [];
            for (let colCount = 0; colCount < this.cols; colCount++) {
               row.push(new Cell(rowCount, colCount, false));
            }
            field.push(row);
        }

        return field
    }

    initRandom() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                const random: number = Math.floor(Math.random() * 100) + 1;

                if (random >= 70) {
                    this.field[i][j].relive();
                }
            }
        }
    }

    initSeed(seedArray: Cell[]) {
        seedArray.forEach(cell => {
            this.field[cell.xPos][cell.yPos].alive = true;
        })
    }

    print(aliveIndicator: string, emptyIndicator: string): string {
        var output: string = '';

        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j].alive) {
                    output += aliveIndicator;
                } else {
                    output += emptyIndicator;
                }
            }
            output += '\n';
        }

        return output;
    }

    getNeighborsOfCell(cell: Cell): number {
        var neighbors: number = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                if (this.checkCellAt(cell.xPos + i, cell.yPos + j)) {
                    neighbors++;
                }
            }
        }

        return neighbors;
    }

    private checkCellAt(xPos: number, yPos: number): boolean {
        if (!this.field[xPos] || !this.field[xPos][yPos]) {
            return false;
        }

        return this.field[xPos][yPos].alive;
    }
}