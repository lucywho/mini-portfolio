var containerX;
var containerWidth;
var bar = $("#bar");
var topImage = $("#top-image");
var container = $("#container");

bar.on("mousedown", function(e) {
    containerX = container.offset().left;
    containerWidth = container.outerWidth();
    var barX = bar.position().left;
    var pointerX = e.clientX - containerX;
    offset = pointerX - barX;
    container.on("mousemove", drag);
    e.preventDefault();
});

$(document).on("mouseup", function() {
    container.off("mousemove");
});

function drag(e) {
    if (e.clientX > containerX + containerWidth) {
        return;
    }

    if (e.clientX < containerX) {
        return;
    }

    var px = e.clientX - containerX - offset + "px";
    if (px >= "0px" && px <= "590px") {
        bar.css({
            left: px,
        });
        topImage.css({
            width: px,
        });
    }
}
