(function() {
    //start of the IIFE

    var headlines = document.getElementById("headlines");

    var links = headlines.getElementsByTagName("a");

    var left = headlines.offsetLeft;

    var anim;

    anim = requestAnimationFrame(moveHeadlines);

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseover", function(e) {
            var over = e.target;
            over.style.color = " #db5461";
            over.style.textDecoration = "none";
            cancelAnimationFrame(anim);
        });

        links[i].addEventListener("mouseout", function(e) {
            var out = e.target;
            out.style.color = "#6b5e62";
            out.style.textDecoration = "none";
            moveHeadlines();
        });
    }

    function moveHeadlines() {
        left--;

        if (left < -links[0].offsetWidth) {
            left += links[0].offsetWidth;

            links[0].parentNode.appendChild(links[0]);
        }

        headlines.style.left = left + "px";
        anim = requestAnimationFrame(moveHeadlines);
    }
})(); //end of the IIFE
