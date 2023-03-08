import { Cell } from "./cell";
import fse from 'fs-extra';

export class Seed {

    // Properties

    private _cells: Cell[];

    // Getter / Setter

    public get cells(): Cell[] {
        return this._cells;
    }
    public set cells(value: Cell[]) {
        this._cells = value;
    }

    constructor(path: string) {
        this._cells = [];
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
            // helper function for error logging
            const notFound = (attr: string) => {
                this.logError(`"${attr}" expected but not found at ${JSON.stringify(row)}`, 1); 
            }

            // helper function for error logging
            const wrongType = (attr: string, expected: string, found: string) => {
                this.logError(`Type "${found}" but "${expected}" is expected at "${attr}" in ${JSON.stringify(row)}`, 1); 
            }
            
            // check if all properties are given
            if (!row.xPos) notFound('xPos');
            if (!row.yPos) notFound('yPos');
            if (!row.isAlive) notFound('isAlive'); 

            // validate the properties
            if (typeof row.xPos !== 'number') wrongType('xPos', 'number', typeof row.xPos);
            if (typeof row.yPos !== 'number') wrongType('yPos', 'number', typeof row.yPos);
            if (typeof row.isAlive !== 'boolean') wrongType('isAlive', 'boolean', typeof row.xPos);

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