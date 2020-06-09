(function() {
    var nextUrl = "";

    $("input[name=user-input").on("click", function() {
        $("input[name=user-input]").val("");
    });

    $("#submit-btn").on("click", function() {
        var userInput = $("input[name=user-input]").val();
        var dropdownSelectVal = $("select").val();
        var baseUrl = "https://elegant-croissant.glitch.me/spotify";

        $.ajax({
            url: baseUrl,
            method: "GET",
            data: {
                query: userInput,
                type: dropdownSelectVal,
            },
            success: function(response) {
                response = response.albums || response.artists;

                getResultsHtml(response.items);
                var myHtml = getResultsHtml(response.items);

                var introResults = "Results for " + userInput.toUpperCase();

                $("#results-header").html(introResults);

                $("#results-container").html(myHtml);

                setNextUrl(response);
            }, //end of success block
        }); //end of ajax block
    }); //end of submit btn block

    $("#more").on("click", function() {
        var userInput = $("input[name=user-input]").val();
        var dropdownSelectVal = $("select").val();

        $.ajax({
            url: nextUrl,
            method: "GET",
            data: {
                query: userInput,
                type: dropdownSelectVal,
            },
            success: function(response) {
                response = response.albums || response.artists;

                getResultsHtml(response.items);
                var myHtml = getResultsHtml(response.items);

                $("#results-container").append(myHtml);

                setNextUrl(response);
            }, //end of more success block
        }); //end of more ajax block
    }); //end of more button block

    function getResultsHtml(items) {
        var myHtml = " ";
        var imgUrl = "";
        for (var i = 0; i < items.length; i++) {
            if (items[i].images[0]) {
                imgUrl =
                    "<a href =" +
                    items[i].external_urls.spotify +
                    "> <img src =" +
                    items[i].images[0].url +
                    "> </a>";
            } else {
                imgUrl = "<img src='default.jpg' />";
            }

            myHtml +=
                "<div> <a href =" +
                items[i].external_urls.spotify +
                "> " +
                items[i].name +
                imgUrl +
                "</a> </div>";
        }

        if (myHtml === " ") {
            myHtml = "<div><em>No Results Found</em></div>";
        }

        return myHtml;
    }

    function setNextUrl(response) {
        nextUrl =
            response.next &&
            response.next.replace(
                "api.spotify.com/v1/search",
                "elegant-croissant.glitch.me/spotify"
            );

        if (nextUrl !== null) {
            $("#more").css({
                visibility: "visible",
            });
        } else {
            $("#more").css({
                visibility: "hidden",
            });
        }
    }
})();
