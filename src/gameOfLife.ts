import { Cell } from "./cell";
import { Field } from "./field";
import logUpdate from 'log-update';

export class GameOfLife {

    // Properties

    private field: Field;


    constructor(field: Field) {
        this.field = field;
    }

    /**
     * This function plays the game
     */
    async play() {
        // Copy actual field in a tmp object
        var tempField = new Field(this.field.rows, this.field.cols, this.field.aliveIndicator, this.field.emptyIndicator);

        // Check for each Cell if it will life or be dead in the next iteration
        this.field.field.forEach(row => {
            row.forEach(cell => {
                // Change the Cells in the tmp field
                tempField.field[cell.xPos][cell.yPos].isAlive = this.validateCell(cell);
            });
        });

        const isSame = this.field.compare(tempField);
      
        // set the tmp field as the new right field
        this.field = tempField;

        // update the output in the console
        logUpdate(this.field.generateOutput());

        if (isSame) {
            process.exit();
        }
    }

    /**
     * check if the provided cell will be alive in the next iteration
     * @param cell cell which will be checked
     * @returns true or false to indicate if provided cell is alive after this iteration
     */
    validateCell(cell: Cell): boolean {
        // get count of neighbor cells
        const neighbors: number = this.field.getNeighborsOfCell(cell);

        // check if the cell will be alive => Conways rules
        if (cell.isAlive && neighbors == 2 || neighbors == 3) {
            return true;
        }

        if (!cell.isAlive && neighbors == 3) {
            return true;
        }

        return false;
    }
}