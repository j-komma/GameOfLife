export class Cell {

    // Properties

    private _isAlive: boolean;

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

    public get isAlive(): boolean {
        return this._isAlive;
    }
    
    public set isAlive(value: boolean) {
        this._isAlive = value;
    }


    constructor(xPos: number, yPos: number, isAlive: boolean) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._isAlive = isAlive;
    }

    
}