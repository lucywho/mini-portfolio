(function() {
    //=====================================

    var currentPlayer = "player1";

    $(".column").on("click", function(e) {
        $(".game-container").removeClass("game-again");
        $(".slot").removeClass("game-again");

        var col = $(e.currentTarget);

        var slotsInCol = col.children();

        //add piece to board

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                //add class of current player to slot
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        //check row
        var slotsInRow = $(".row" + i);

        if (i === -1) {
            return;
        }

        //check diagonal
        var colIndex = $(e.currentTarget).index();
        var rowIndex = i;

        var slotsInDiag = function() {
            //get location indices
            var leftToRightValue = colIndex + rowIndex;
            var rightToLeftValue = colIndex - rowIndex;

            //adds location values to class
            var leftToRightClass = ".lr" + leftToRightValue;
            var rightToLeftClass = ".rl" + rightToLeftValue;

            //find all slots with matching classes
            var leftToRightSlots = $(leftToRightClass);
            var rightToLeftSlots = $(rightToLeftClass);

            //return both values out of function
            return {
                leftToRightSlots: leftToRightSlots,
                rightToLeftSlots: rightToLeftSlots,
            };
        };

        var diagonals = slotsInDiag(colIndex, rowIndex);

        //check for victory column/row
        if (checkForVictory(slotsInCol)) {
            victoryDance();
        } else if (checkForVictory(slotsInRow)) {
            victoryDance();
        } else if (checkForVictory(diagonals.leftToRightSlots)) {
            victoryDance();
        } else if (checkForVictory(diagonals.rightToLeftSlots)) {
            victoryDance();
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        var counter = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter === 4) {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            $("#player2").addClass("yourTurn");
            $("#player1").removeClass("yourTurn");
        } else {
            currentPlayer = "player1";
            $("#player2").removeClass("yourTurn");
            $("#player1").addClass("yourTurn");
        }
    }

    function victoryDance() {
        var winner;
        var score1 = localStorage.getItem("score1");

        var score2 = localStorage.getItem("score2");
        var win;

        if (currentPlayer === "player1") {
            winner = "Player 1";
            win = 1;
            score1++;
            $(".score1").html(score1);
            localStorage.setItem("score1", score1);
        } else {
            winner = "Player 2";
            win = 2;
            score2++;
            $(".score2").html(score2);
            localStorage.setItem("score2", score2);
        }
        $("#victory").html(winner + " wins the game!");
        $("#victory").addClass("victory" + win);
    }

    //reset button
    var again = $(".again");
    var clear = $(".clear");

    again.on("click", function() {
        $(".game-container").addClass("game-again");
        $(".slot").removeClass("player1");
        $(".slot").removeClass("player2");
        $("#victory").html(" ");
        $("#victory").removeClass();
    });

    //reset game
    clear.on("click", function() {
        $(".slot").addClass("game-again");
        $(".slot").removeClass("player1");
        $(".slot").removeClass("player2");
        $("#victory").html(" ");
        $(".score1").html(0);
        $(".score2").html(0);
        localStorage.setItem("score2", 0);
        localStorage.setItem("score1", 0);
    });

    //=====================================
})();
