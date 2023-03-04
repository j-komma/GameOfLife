export class Cell {

    // Properties

    private _alive: boolean;

    private _xPos: number;

    private _yPos: number;


    // Getter / Setter

    public get yPos(): number {
        return this._yPos;
    }

    public set yPos(value: number) {
        this._yPos = value;
    }

    public get xPos(): number {
        return this._xPos;
    }

    public set xPos(value: number) {
        this._xPos = value;
    }

    public get alive(): boolean {
        return this._alive;
    }
    
    public set alive(value: boolean) {
        this._alive = value;
    }


    constructor(xPos: number, yPos: number, alive: boolean) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._alive = alive;
    }
}