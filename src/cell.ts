export class Cell {

    private _alive: boolean;

    public get alive(): boolean {
        return this._alive;
    }
    public set alive(value: boolean) {
        this._alive = value;
    }

    constructor(alive: boolean) {
        this._alive = alive;
    }

    kill() {
        this.alive = false;
    }

    relive() {
        this.alive = true;
    }

}