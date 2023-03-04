export class Field {

    private rows: Number;
    private cols: Number;

    constructor(rows: Number, cols: Number) {
        this.rows = rows;
        this.cols = cols;
    }


    private initEmpty(emptyCell: string): string[][] {
        var field: string[][] = [];

        for (let row = 0; row < this.rows; row++) {
            let row: string[] = [];
            for (let col = 0; col < this.cols; col++) {
               row.push(emptyCell);
            }
            field.push(row);
        }

        return field;
    }

    initRandom(emptyCell: string, aliveCell: string): string[][] {
        var field = this.initEmpty(emptyCell);

        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                const random: Number = Math.floor(Math.random() * 100) + 1;

                if (random >= 70) {
                    field[i][j] = aliveCell;
                }
            }
            
        }

        return field;
    }
}