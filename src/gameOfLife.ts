import { Cell } from "./cell";
import { Field } from "./field";

export class GameOfLife {

    private field: Field;

    constructor(field: Field) {
        this.field = field;
    }

    async play() {
       
        do {
            var tempField = new Field(this.field.rows, this.field.cols);

            this.field.field.forEach(row => {
                row.forEach(cell => {
                    tempField.field[cell.xPos][cell.yPos].alive = this.validateCell(cell);
                })
            })

            const isSame = this.field == tempField;
    
            this.field = tempField;

            // console.clear();
            console.clear();
            console.log(this.field.print('X', ' '));

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isSame) {
                break;
            }
        } while(true);
        
       
    }

    validateCell(cell: Cell): boolean {
        const neighbors: number = this.field.getNeighborsOfCell(cell);

        if (cell.alive && neighbors == 2 || neighbors == 3) {
            return true;
        }

        if (!cell.alive && neighbors == 2) {
            return true;
        }

        return false;
    }
}