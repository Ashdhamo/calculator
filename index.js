let displayArray = [];

$(document).ready(function() {
    var display = $(".display-text");

    $("button").on("click", function() {
        let value = $(this).text();

        if (value === "DEL") {
            displayArray.pop();
        } else {
             displayArray.push(value);
        }

        // Update the display with joined values
        display.text(displayArray.join(""));
    });
});
