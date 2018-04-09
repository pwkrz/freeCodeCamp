import SimonGame from "./game"
console.log(SimonGame);
// let simon1 = new SimonGame(document.querySelectorAll(".field"), document.querySelector("#startBtn"), document.querySelector("#strictBtn"));
(function(){
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            // document.removeEventListener( "DOMContentLoaded", <EventListener>arguments.callee, false );

            let simon1 = new SimonGame(document.querySelectorAll(".field"),
                                       document.querySelector("#counter"),
                                       document.querySelector("#startBtn"),
                                       document.querySelector("#strictCheck"))
        }, false );
        // Legacy Internet Explorer model
    } else if ( (<any>document).attachEvent ) {
        (<any>document).attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                // (<any>document).detachEvent( "onreadystatechange", arguments.callee );

                let simon1 = new SimonGame(document.querySelectorAll(".field"),
                                           document.querySelector("#counter"),
                                           document.querySelector("#startBtn"),
                                           document.querySelector("#strictCheck"))
            }
        });
    } else {
        document.write("Unable to detect document ready state. Please try using a different browser")
    }
})();