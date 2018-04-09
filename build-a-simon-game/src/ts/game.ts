import {UserMove, FIXFORMAT} from "./resources"
import FieldMap from "./fieldmap"

export default class SimonGame {
    private sequence: number[];
    private fields: FieldMap;
    private clickCounter: number;

    constructor(fieldDivs: NodeList, private counter: HTMLElement, private startBtn: HTMLButtonElement, private strictCheck: HTMLInputElement){
        this.fields = new FieldMap(fieldDivs, this.userMove);

        this.startBtn.addEventListener("click", this.init, false)
        this.strictCheck.addEventListener("click", this.handleLabel, false)
    }
    private gameEnd (): void {
        this.fields.toggleClass("clickable", false);

        setTimeout( this.init, 1000 );
    }
    private fail (): void {
        this.fields.toggleClass("clickable", false).blink();

        setTimeout( () => this.strictCheck.checked
                            ? this.init()
                            : this.compMove(false), 1000 );
    }
    private userMove = (e: MouseEvent | TouchEvent, i: number): void => {

        this.fields.getField(i).toggleClass("clickable", false);

        let correctClick: boolean = this.sequence[this.clickCounter] === i;

        if (!correctClick) {

            this.fail();

        } else {

            this.fields.getField(i).blink();

            if (this.clickCounter === 19) {
                this.gameEnd();
            } else if (this.clickCounter + 1 === this.sequence.length) {
                this.fields.toggleClass("clickable", false);
                setTimeout( () => this.compMove(true), 1500 );
            } else {
                setTimeout( () => this.fields.getField(i).toggleClass("clickable", true), 500 );
                this.clickCounter++;
            }
        }
    }
    private compMove = (nextBeep: boolean): void => {
        let len: number = this.sequence.length;

        if(len){
            this.sequence.forEach( (fieldIdx: number, i: number) => {
                setTimeout( () => {
                    this.fields.getField(fieldIdx).blink()
                }, i*750 )
                
            });
        }
        if(nextBeep){
            let rand: number = Math.floor( Math.random() * this.fields.getLength() );
    
            setTimeout( () => this.fields.getField(rand).blink(), (len*750 || 1000) )
    
            this.sequence.push(rand);

            this.counter.innerText = FIXFORMAT(this.sequence.length);
        }
        this.clickCounter = 0;
        setTimeout( () => this.fields.toggleClass("clickable", true), (len + 1) * 750 );
    }
    private init = (): void => {
        this.sequence = [];

        this.counter.classList.add("active");
        this.counter.classList.remove("inactive");
        
        this.compMove(true)
    }
    private handleLabel = (e: MouseEvent | TouchEvent) => {
        if (this.strictCheck.checked) {
            (<HTMLElement>e.target).parentElement.classList.add("active");
            (<HTMLElement>e.target).parentElement.classList.remove("inactive");
        } else {
            (<HTMLElement>e.target).parentElement.classList.remove("active");
            (<HTMLElement>e.target).parentElement.classList.add("inactive");
        }
    }
}