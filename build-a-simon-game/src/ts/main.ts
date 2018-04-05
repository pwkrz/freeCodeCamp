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
class Field {
    private beep: HTMLAudioElement;

    constructor(public field: HTMLElement, public index: number){
        this.beep = new Audio(BEEPS[index]);
    }
    public on(eventName: string, listener: EventListener, bool: boolean = true) : Field {
        this.field.addEventListener(eventName, listener, bool);

        return this;
    }
    public toggleClass(className: string, condition: boolean, timeout?: number) : Field {
        if(condition) this.field.classList.add(className);
        if(!condition) this.field.classList.remove(className);
        if(timeout) setTimeout( () => this.field.classList.toggle(className), 500 );

        return this;
    }
    public blink() : Field {
        this.beep.play()
        // this.field.classList.add("blink");
        // setTimeout( () => this.field.classList.remove("blink"), 500 )
        this.toggleClass("blink", true, 500);

        return this;
    }
}
class SimonGame {
    private sequence: number[];
    private fields: Field[];

    constructor(private fieldDivs: NodeList, private startBtn: HTMLButtonElement, private strictBtn: HTMLButtonElement){
        this.sequence = [];
        this.fields = [];
        this.init();
    }
    public userMove(e: MouseEvent | TouchEvent, i: number){
        this.fields[i].blink();

        
    }
    public compMove(){
        let len: number = this.sequence.length;

        if(len){
            this.sequence.forEach( (fieldIdx: number, i: number) => {
                setTimeout( () => {
                    this.fields[fieldIdx].blink()
                }, i*500 )
                
            });
        }
        let rand: number = Math.floor( Math.random() * this.fields.length );

        setTimeout( () => this.fields[rand].blink(), (len+1)*500 )

        this.sequence.push(rand);

        this.fields.forEach( (field: Field) => field.toggleClass("clickable", true) )
    }
    private init(): void {
        this.fieldDivs.forEach( (div: HTMLElement, i: number) => {
            let newField: Field = new Field(div, i);

            newField.on("click", (e: MouseEvent | TouchEvent) => this.userMove(e, i) );

            this.fields.push(newField);
        })

        this.compMove()
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