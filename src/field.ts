import { Cell } from "./cell";

export class Field {

    // Properties

    private _rows: number;

    private _cols: number;

    private _field: Cell[][];

    private _aliveIndicator: string;

    private _emptyIndicator: string;


    // Getter / Setter

    public get aliveIndicator(): string {
        return this._aliveIndicator;
    }

    public set aliveIndicator(value: string) {
        this._aliveIndicator = value;
    }

    public get emptyIndicator(): string {
        return this._emptyIndicator;
    }

    public set emptyIndicator(value: string) {
        this._emptyIndicator = value;
    }

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


    constructor(rows: number, cols: number, aliveIndicator: string, emptyIndicator: string) {
        this._rows = rows;
        this._cols = cols;
        this._aliveIndicator = aliveIndicator;
        this._emptyIndicator = emptyIndicator;
        this._field = this.initEmpty();
    }

    /**
     * Create a Field where all Cells are dead
     * @returns tow dimensional array of Cells
     */
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

    /**
     * This function randomly spawn Cells who are alive
     */
    initRandom() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                // get a random number between 1 - 100
                const random: number = Math.floor(Math.random() * 100) + 1;

                if (random >= 85) {
                    this.field[i][j].alive = true;
                }
            }
        }
    }

    /**
     * Turn provided Cells alive
     * @param seedArray Array of coordinates which cells should be alive
     */
    initSeed(seedArray: string[]) {
        seedArray.forEach(seed => {
            const cords = seed.split(',').map(Number);
            this.field[cords[0]][cords[1]].alive = true;
        });
    }

    /**
     * Generate a String for the actual field
     * @returns string of the field with right indicators
     */
    generateOutput(): string {
        var output: string = '';

        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j].alive) {
                    output += this.aliveIndicator;
                } else {
                    output += this.emptyIndicator;
                }
            }
            output += '\n';
        }

        return output;
    }

    /**
     * This Function return the number of neighbors for a specific cell
     * @param cell Cell to count the neighbors for
     * @returns number of neighbors for provided cell
     */
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

    /**
     * Check if the cell at this position is currently alive
     * @param xPos X-Position of the cell which should be checked
     * @param yPos Y-Position of the cell which should be checked
     * @returns true if the cell is currently alive
     */
    private checkCellAt(xPos: number, yPos: number): boolean {
        if (!this.field[xPos] || !this.field[xPos][yPos]) {
            return false;
        }

        return this.field[xPos][yPos].alive;
    }

    /**
     * Compares two fields
     * @param compareField field to check with
     * @returns true if identic, false otherwise
     */
    compare(compareField: Field): boolean {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j].alive != compareField.field[i][j].alive) {
                    return false;
                }
            }
            
        }

        return true;
    }
}