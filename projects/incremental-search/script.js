(function() {
    //================================================================

    var input = $("input");

    var resultsElem = $("#results");

    // input event

    input.on("input focus", function(event) {
        var val = input.val();

        $.ajax({
            url: "http://spicedworld.herokuapp.com/",
            method: "GET",
            data: {
                q: val
            },
            success: function(matches) {
                //========convert matches to html elements and put them on the page=========
                var resultsHtml = "";

                if (matches.length === 0) {
                    resultsHtml =
                        '<div class="result">' +
                        "<em>No results</em>" +
                        "</div>";
                } else {
                    for (var j = 0; j < matches.length; j++) {
                        resultsHtml +=
                            '<div class="result">' + matches[j] + "</div>";
                    }
                }
                resultsElem.html(resultsHtml);
                //====timing=====
                if (input.val() !== val) {
                    console.log(input.val());
                    console.log("too quick");
                    return;
                }
                //===end of timing====
                //============end of code to return matches to html and display on page=======
            },
            error: function(err) {
                console.log("error");
                return;
            }
        });

        if (val == "") {
            resultsElem.empty();
            return;
        }
    });

    //========================DO NOT CHANGE ===========================
    // mouseover event

    resultsElem.on("mouseout", function(event) {
        $(event.target).removeClass("highlight");
    });

    resultsElem.on("mouseover", function(event) {
        $(event.target).addClass("highlight");
    });

    // mousedown event

    resultsElem.on("mousedown", function(event) {
        var chosen = $(event.target).text();
        input.val(chosen).html();
        resultsElem.addClass("hidden");
    });

    //arrow key events

    var highlight = $(".highlight");

    input.on("keydown", function(e) {
        var listItem = $(".result"); //this is an array
        // down arrow

        if (e.keyCode == 40) {
            console.log("down arrow");

            if ($(".highlight").length == 0) {
                listItem.first().addClass("highlight");
                return;
            } else {
                $(".highlight")
                    .next()
                    .addClass("highlight");
                $(".highlight")
                    .prev()
                    .removeClass("highlight");
            }
        }

        // up arrow
        if (e.keyCode == 38) {
            console.log("up arrow");
            if ($(".highlight").length == 0) {
                // stop at first item
                return;
            } else {
                $(".highlight")
                    .prev()
                    .addClass("highlight");
                $(".highlight")
                    .next()
                    .removeClass("highlight");
                return;
            }
        }

        // enter key
        if (e.keyCode === 13) {
            var enterSel = $(".highlight").text();

            $("input")
                .val(enterSel)
                .html();
            resultsElem.addClass("hidden");
        }
    });

    //focus and blur
    input.on("blur", function() {
        resultsElem.addClass("hidden");
    });

    input.on("focus", function() {
        resultsElem.removeClass("hidden");
    });

    //====================================================================
})(); //end of IIFE, do not delete
