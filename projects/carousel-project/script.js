(function() {
    var kitties = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots .dot");
    var total = kitties.length;
    var last = total - 1;
    var i = 0;
    var timer;
    var isTransitioning = false;
    var currentKitty = i;

    timer = setTimeout(moveKitties, 3000);

    for (var x = 0; x < dots.length; x++) {
        //can't add event listener directly to an array
        dots[x].addEventListener("click", clickHandler(x));
        console.log("x", x);
        console.log("dots: ", dots[x]);
    }

    function clickHandler(dotIndex) {
        if (isTransitioning) {
            //if there's a transition happening, do nothing
            return;
        } else {
            return function() {
                for (var d = 0; d < dots.length; d++) {
                    dots[d].classList.remove("fill-in");
                }
                dots[dotIndex].classList.add("fill-in");
                clearTimeout(timer);
                moveKitties(dotIndex);
            };
        }
    }

    function moveKitties(index) {
        isTransitioning = true;
        if (typeof index == "number") {
            if (i === index) {
                return;
            } else {
                kitties[i].classList.remove("onscreen");
                dots[i].classList.remove("fill-in");
                kitties[i].classList.add("offscreen-left");

                i = index;

                dots[i].classList.add("fill-in");
                kitties[i].classList.add("onscreen");
            }
        } else if (i < last) {
            kitties[i].classList.remove("onscreen");
            dots[i].classList.remove("fill-in");
            kitties[i].classList.add("offscreen-left");

            i++;

            dots[i].classList.add("fill-in");
            kitties[i].classList.add("onscreen");
        } else if (i === last) {
            kitties[i].classList.remove("onscreen");
            dots[i].classList.remove("fill-in");
            kitties[i].classList.add("offscreen-left");

            i = 0;

            dots[i].classList.add("fill-in");
            kitties[i].classList.add("onscreen");
        }

        timer = setTimeout(moveKitties, 6000);
    }

    document.addEventListener("transitionend", function(event) {
        //event listener will be fired when the offscreen-left transition has fully ended
        if (event.target.classList.contains("offscreen-left")) {
            event.target.classList.remove("offscreen-left");
            isTransitioning = false;
            console.log("check event; ", kitties[i]);
        }
    });
})(); //end of IFEE do not delete!
