let arr1: Array<any> = [1, "sło", "wo", 2, "tok", 234, "urwa"];

// arr1.forEach( el => {
//   let res: string = (<string>el).substr(1);
//   console.log(res, typeof res)
// })

interface Kwadrat {
    kolor?: string,
    szerokosc?: number,
    [x: string]: any
}

function robKwadrat(sqr: Kwadrat): {kolor: string, pole: number}{
    let nowyKwadrat = { kolor: "różowy", pole: 2 };

    if(sqr.kolor){
        nowyKwadrat.kolor = sqr.kolor
    }
    if(sqr.szerokosc){
        nowyKwadrat.pole = Math.sqrt(sqr.szerokosc);
    }

    return nowyKwadrat;
}

let nowyKwa = robKwadrat({kolor: "szary", opacity: 1} as Kwadrat);

console.log("here******")