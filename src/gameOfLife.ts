import { Cell } from "./cell";
import { Field } from "./field";
import logUpdate from 'log-update';

export class GameOfLife {

    private field: Field;

    constructor(field: Field) {
        this.field = field;
    }

    async play() {
        var tempField = new Field(this.field.rows, this.field.cols);

        this.field.field.forEach(row => {
            row.forEach(cell => {
                tempField.field[cell.xPos][cell.yPos].alive = this.validateCell(cell);
            })
        })

        const isSame = this.field == tempField;

        this.field = tempField;

        logUpdate(this.field.print());
    }

    validateCell(cell: Cell): boolean {
        const neighbors: number = this.field.getNeighborsOfCell(cell);

        // console.log("Cell: " + cell.xPos + " / " + cell.yPos + " : " + neighbors);

        if (cell.alive && neighbors == 2 || neighbors == 3) {
            return true;
        }

        if (!cell.alive && neighbors == 3) {
            return true;
        }

        return false;
    }
}