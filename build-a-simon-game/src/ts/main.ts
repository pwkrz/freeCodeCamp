const BEEPS = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];
enum Turn {
    User,
    Comp
};
interface UserMove {
    (e: MouseEvent | TouchEvent, i: number): void;
};
class Field {
    private beep: HTMLAudioElement;
    private timeOut: number;

    constructor(public field: HTMLElement, index: number, listener: UserMove){
        this.beep = new Audio(BEEPS[index]);
        
        this.field.addEventListener("click", (e: MouseEvent | TouchEvent) => listener(e, index), true);
    }
    public on(eventName: string, listener: EventListener, bool: boolean = true) : Field {
        this.field.addEventListener(eventName, listener, bool);

        return this;
    }
    public toggleClass(className: string, condition: boolean, timeout?: number) : Field {
        if(condition) this.field.classList.add(className);
        if(!condition) this.field.classList.remove(className);
        if(timeout){
            setTimeout( () => this.field.classList.toggle(className), timeout );  
        } 
        return this;
    }
    public blink() : Field {
        this.beep.play()
        this.toggleClass("blink", true, 475);
        return this;
    }
}
class FieldMap {
    private fields: Field[];

    constructor(fieldDivs: NodeList, listener: UserMove){
        this.fields = [];

        Array.prototype.forEach.call( fieldDivs, (div: HTMLElement, i: number) => {
            let newField: Field = new Field(div, i, listener);

            this.fields.push(newField);
        })
    }
    public getField(index: number): Field {
        return this.fields[index];
    }
    public getLength(): number {
        return this.fields.length;
    }
    public toggleClass(className: string, condition: boolean) : FieldMap {

        this.fields.forEach( (field: Field) => field.toggleClass(className, condition) );
        
        return this;
    }
    public blink() : FieldMap {

        this.fields.forEach( (field: Field) => field.blink() );

        return this;
    }
}
class SimonGame {
    private sequence: number[];
    private fields: FieldMap;
    private clickCounter: number;

    constructor(fieldDivs: NodeList, private startBtn: HTMLButtonElement, private strictBtn: HTMLButtonElement){
        this.fields = new FieldMap(fieldDivs, this.userMove);
        this.init();
    }
    public gameEnd(){
        this.fields.toggleClass("clickable", false);
        console.log("end")
    }
    public fail = () => {
        this.fields.toggleClass("clickable", false).blink();

        setTimeout( () => this.compMove(false), 1000 );
    }
    public userMove: UserMove = (e: MouseEvent | TouchEvent, i: number) => {

        this.fields.getField(i).toggleClass("clickable", false);

        let correctClick: boolean = this.sequence[this.clickCounter] === i;

        if (!correctClick) {

            this.fail();

        } else {

            this.fields.getField(i).blink();

            if (this.clickCounter === 5) {
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
    public compMove = (nextBeep: boolean) => {
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
        }
        this.clickCounter = 0;
        setTimeout( () => this.fields.toggleClass("clickable", true), (len + 1) * 750 );
    }
    private init = (): void => {
        this.sequence = [];
        this.compMove(true)
    }
}

(function(){
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", <EventListener>arguments.callee, false );

            let simon1 = new SimonGame(document.querySelectorAll(".field"), document.querySelector("#startBtn"), document.querySelector("#strictBtn"))
        }, false );
        // Legacy Internet Explorer model
    } else if ( (<any>document).attachEvent ) {
        (<any>document).attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                (<any>document).detachEvent( "onreadystatechange", arguments.callee );

                let simon1 = new SimonGame(document.querySelectorAll(".field"), document.querySelector("#startBtn"), document.querySelector("#strictBtn"))
            }
        });
    } else {
        document.write("Unable to detect document ready state. Please try using a different browser")
    }
})();