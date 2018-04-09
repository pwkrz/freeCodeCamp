import SimonGame from "./game"

let audioTest = new Audio();

(function(){
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", <EventListener>arguments.callee, false );
            if (!audioTest.play) {
              document.write("This game needs html5 audio API to work. Please try using the latest version\
            of Google Chrome or Mozilla Firefox.");  
            } else {
                let simon1 = new SimonGame(document.querySelectorAll(".field"),
                                            document.querySelector("#counter"),
                                            document.querySelector("#startBtn"),
                                            document.querySelector("#strictCheck"));
            }
        }, false );
        // Legacy Internet Explorer model
    } else if ( (<any>document).attachEvent ) {
        (<any>document).attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                (<any>document).detachEvent( "onreadystatechange", arguments.callee );
                if (!audioTest.play) {
                    document.write("This game needs html5 audio API to work. Please try using the latest version\
                  of Google Chrome or Mozilla Firefox.");  
                } else {
                    let simon1 = new SimonGame(document.querySelectorAll(".field"),
                                                document.querySelector("#counter"),
                                                document.querySelector("#startBtn"),
                                                document.querySelector("#strictCheck"));
                }
            }
        });
    } else {
        document.write("Unable to detect document ready state. Please try using a different browser")
    }
})();