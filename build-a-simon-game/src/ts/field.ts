import {BEEPS, UserMove} from "./resources"

export default class Field {
    private beep: HTMLAudioElement;
    private timeOut: number;

    constructor(public field: HTMLElement, index: number, listener: UserMove){
        this.beep = new Audio(BEEPS[index]);
        
        this.field.addEventListener("click", (e: MouseEvent | TouchEvent) => listener(e, index), true);
    }
    public on (eventName: string, listener: EventListener, bool: boolean = true) : Field {
        this.field.addEventListener(eventName, listener, bool);

        return this;
    }
    public toggleClass (className: string, condition: boolean, timeout?: number) : Field {
        if(condition) this.field.classList.add(className);
        if(!condition) this.field.classList.remove(className);
        if(timeout){
            setTimeout( () => this.field.classList.toggle(className), timeout );  
        } 
        return this;
    }
    public blink () : Field {
        this.beep.play()
        this.toggleClass("blink", true, 475);
        return this;
    }
}