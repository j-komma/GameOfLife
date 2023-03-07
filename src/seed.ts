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

    private check(path: string): boolean {
        if (!fse.existsSync(path)) {
            this.logError('File does not exist', 1);
        }

        const lines = fse.readJsonSync(path, 'utf-8');
        
        lines.forEach((row: Cell) => {
            const notFound = (attr: string) => {
                this.logError(`"${attr}" expected but not found at ${JSON.stringify(row)}`, 1); 
            }

            const wrongType = (attr: string, expected: string, found: string) => {
                this.logError(`Type "${found}" but "${expected}" is expected at "${attr}" in ${JSON.stringify(row)}`, 1); 
            }
            
            if (!row.xPos) notFound('xPos')
            if (!row.yPos) this.logError(`yPos is missing`, 1); 
            if (!row.isAlive) this.logError(`isAlive is missing`, 1); 

            if (typeof row.xPos !== 'number') wrongType('xPos', 'number', typeof row.xPos);
            if (typeof row.yPos !== 'number') wrongType('yPos', 'number', typeof row.yPos);
            if (typeof row.isAlive !== 'boolean') wrongType('isAlive', 'boolean', typeof row.xPos);

            this.cells.push(new Cell(row.xPos, row.yPos, row.isAlive));
        });

        return true;
    }

    private logError(error: string, exitCode: number) {
        console.error('Error: ' + error);
        process.exit(exitCode);
    }
}