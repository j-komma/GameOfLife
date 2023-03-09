import { Cell } from "./cell";
import fse from 'fs-extra';

export class Seed {

    // Properties

    private _cells: Cell[];

    private _maxX: number;

    private _maxY: number;
    

    // Getter / Setter

    public get cells(): Cell[] {
        return this._cells;
    }

    public set cells(value: Cell[]) {
        this._cells = value;
    }

    public get maxY(): number {
        return this._maxY;
    }

    public set maxY(value: number) {
        this._maxY = value;
    }

    public get maxX(): number {
        return this._maxX;
    }

    public set maxX(value: number) {
        this._maxX = value;
    }


    constructor(path: string, maxX: number, maxY: number) {
        this._cells = [];
        this._maxX = maxX;
        this._maxY = maxY;
        this.check(path);
    }

    /**
     * Check and Validate the seed file
     * - add correct cells to the seed
     * @param path path to the seed file
     * @returns true if everything is valid
     */
    private check(path: string): boolean {
        if (!fse.existsSync(path)) {
            this.logError('File does not exist', 1);
        }

        // read file into array
        const lines = fse.readJsonSync(path, 'utf-8');
        
        lines.forEach((row: Cell) => {
            // helper function for incomplete cell
            const notFound = (attr: string) => {
                this.logError(`"${attr}" expected but not found at ${JSON.stringify(row)}`, 1); 
            }

            // helper function for wrong type
            const wrongType = (attr: string, expected: string, found: string) => {
                this.logError(`Type "${found}" but "${expected}" is expected at "${attr}" in ${JSON.stringify(row)}`, 1); 
            }

            // helper function for invalid values
            const wrongValue = (attr: string, max: number, found: number) => {
                this.logError(`Value ${found} found but 0 - ${max} is expected at ${attr} in ${JSON.stringify(row)}`, 1);
            }
            
            // check if all properties are given
            if (!row.xPos) notFound('xPos');
            if (!row.yPos) notFound('yPos');
            if (!row.isAlive) notFound('isAlive'); 

            // validate the properties
            if (typeof row.xPos !== 'number') wrongType('xPos', 'number', typeof row.xPos);
            if (typeof row.yPos !== 'number') wrongType('yPos', 'number', typeof row.yPos);
            if (typeof row.isAlive !== 'boolean') wrongType('isAlive', 'boolean', typeof row.xPos);

            // validate values
            if (row.xPos < 0) wrongValue('xPos', this.maxX, row.xPos);
            if (row.yPos < 0) wrongValue('yPos', this.maxY, row.yPos);
            if (row.xPos > this.maxX) wrongValue('xPos', this.maxX, row.xPos);
            if (row.yPos > this.maxY) wrongValue('yPos', this.maxY, row.yPos);

            // add valid cells to seed
            this.cells.push(new Cell(row.xPos, row.yPos, row.isAlive));
        });

        return true;
    }

    /**
     * Function to log the errors to the console
     * @param error message of the error
     * @param exitCode exitcode of the program
     */
    private logError(error: string, exitCode: number) {
        console.error('Error: ' + error);
        process.exit(exitCode);
    }
}