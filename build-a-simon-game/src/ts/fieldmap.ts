import {UserMove} from "./resources"
import Field from "./field"

export default class FieldMap {
    private fields: Field[];

    constructor(fieldDivs: NodeList, listener: UserMove){
        this.fields = [];

        Array.prototype.forEach.call( fieldDivs, (div: HTMLElement, i: number) => {
            let newField: Field = new Field(div, i, listener);

            this.fields.push(newField);
        })
    }
    public getField (index: number): Field {
        return this.fields[index];
    }
    public getLength (): number {
        return this.fields.length;
    }
    public toggleClass (className: string, condition: boolean) : FieldMap {

        this.fields.forEach( (field: Field) => field.toggleClass(className, condition) );
        
        return this;
    }
    public blink () : FieldMap {

        this.fields.forEach( (field: Field) => field.blink() );

        return this;
    }
}