import { Cell } from "./cell";

export class Field {

    private _rows: Number;

    private _cols: Number;

    private _field: Cell[][];

    public get rows(): Number {
        return this._rows;
    }
    public set rows(value: Number) {
        this._rows = value;
    }

    public get cols(): Number {
        return this._cols;
    }
    public set cols(value: Number) {
        this._cols = value;
    }

    public get field(): Cell[][] {
        return this._field;
    }
    public set field(value: Cell[][]) {
        this._field = value;
    }

    constructor(rows: Number, cols: Number) {
        this._rows = rows;
        this._cols = cols;
        this._field = this.initEmpty();
    }


    private initEmpty(): Cell[][] {
        var field: Cell[][] = [];

        for (let row = 0; row < this.rows; row++) {
            let row: Cell[] = [];
            for (let col = 0; col < this.cols; col++) {
               row.push(new Cell(false));
            }
            field.push(row);
        }

        return field
    }

    initRandom() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                const random: Number = Math.floor(Math.random() * 100) + 1;

                if (random >= 70) {
                    this.field[i][j].relive();
                }
            }
            
        }

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
}