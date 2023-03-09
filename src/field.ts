import { Cell } from "./cell";

export class Field {

    // Properties

    private _rows: number;

    private _cols: number;

    private _field: Cell[][];

    private _aliveIndicator: string;

    private _emptyIndicator: string;

    private _infinite: boolean;

    private _randomness: number;

    private _multiplier: number;


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

    public get infinite(): boolean {
        return this._infinite;
    }

    public set infinite(value: boolean) {
        this._infinite = value;
    }

    public get randomness(): number {
        return this._randomness;
    }

    public set randomness(value: number) {
        this._randomness = value;
    }

    public get multiplier(): number {
        return this._multiplier;
    }

    public set multiplier(value: number) {
        if (value % 2 === 0) {
            throw new Error('Value must be odd');
        }
        this._multiplier = value;
    }

    constructor(rows: number, cols: number, aliveIndicator: string, emptyIndicator: string, randomness: number, infinite?: boolean) {
        this._rows = rows;
        this._cols = cols;
        this._aliveIndicator = aliveIndicator;
        this._emptyIndicator = emptyIndicator;
        this._infinite = infinite || false;
        this._field = [];
        this._randomness = randomness;
        this._multiplier = 5
    }

    /**
     * Create a Field where all Cells are dead
     */
    initEmpty(){
        const oldRandomness = this.randomness;

        this.randomness = -1;

        this.initRandom();

        this.randomness = oldRandomness;
    }

    /**
     * This function randomly spawn Cells who are alive
     */
    initRandom() {
        var field: Cell[][] = [];

        for (let rowCount = 0; rowCount < this.rows; rowCount++) {
            let row: Cell[] = [];
            for (let colCount = 0; colCount < this.cols; colCount++) {
                const cell = new Cell(rowCount, colCount, false)

                // for init empty field
                if (this.randomness === -1) {
                    row.push(cell);
                    continue;
                }

                // set alive
                cell.isAlive = this.randomAlive();

                row.push(cell);
            }
            field.push(row);
        }

        this.field = field;
    }

    /**
     * Turn provided Cells alive
     * @param seedArray Array of cells which should be alive
     */
    initSeed(cells: Cell[]) {
        this.initEmpty();
        
        // turn cells alive
        cells.forEach(cell => {
            this.field[cell.xPos][cell.yPos].isAlive = cell.isAlive;
        });
    }

    /**
     * Init a pseudo infinite field
     */
    initInfinite() {
        this.infinite = true;
        this.cols *= this.multiplier;
        this.rows *= this.multiplier;
        this.initRandom();
    }

    /**
     * Generate a String for the actual field
     * @returns string of the field with right indicators
     */
    generateOutput(): string {
        var output: string = '';

        // calculate for infinite mode
        const rows = this.infinite ? this.rows / this.multiplier : this.rows;
        const cols = this.infinite ? this.cols / this.multiplier : this.cols;

        var i = this.infinite ? rows * (this.multiplier -1  / 2) : 0;
        var j = this.infinite ? cols * (this.multiplier -1  / 2) : 0;
        
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (this.field[i][j].isAlive) {
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

        // validate the cells at the border of the field
        if (!this.field[xPos] || !this.field[xPos][yPos]) {
            // if play with border return false
            if (!this.infinite) return false;

            // if infinite
            return this.randomAlive();
        }

        return this.field[xPos][yPos].isAlive;
    }

    /**
     * Compares two fields
     * @param compareField field to check with
     * @returns true if identic, false otherwise
     */
    compare(compareField: Field): boolean {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j].isAlive != compareField.field[i][j].isAlive) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Function to check if a cell should be alive
     * @returns true if random is greater or equals randomness
     */
    private randomAlive(): boolean {
         // get a random number between 1 - 100
         const random: number = Math.floor(Math.random() * 100) + 1;

         return random >= this.randomness;
    }
}