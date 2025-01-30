let displayArray = [];
let currentInput = "";
let lastResult = null;
let awaitingOperator = false;

function clear_all() {
    displayArray = [];
    currentInput = "";
    lastResult = null;
    awaitingOperator = false;
    $(".display-text").text("");
}

$(document).ready(function () {
    var display = $(".display-text");

    $("button").on("click", function () {
        let value = $(this).text();

        if ($.isNumeric(value) || value === ".") {
            // If a number is pressed after getting a result, reset unless continuing an operation
            if (lastResult !== null && !awaitingOperator) {
                clear_all();
            }

            if (value === "." && currentInput.includes(".")) {
                return; // Prevent multiple decimals
            }

            currentInput += value;
            display.text(currentInput);
            awaitingOperator = false;
        } else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.text(currentInput);
        } else if (value === "Clear") {
            clear_all();
        } else if (["+", "-", "x", "/"].includes(value)) {
            // If an operator is pressed, continue calculations
            if (currentInput !== "") {
                displayArray.push(parseFloat(currentInput));
            } else if (lastResult !== null && displayArray.length === 0) {
                displayArray.push(lastResult); // Use last result if no number is entered
            }

            // Ensure only one operator is present at a time
            if (displayArray.length > 0 && ["+", "-", "x", "/"].includes(displayArray[displayArray.length - 1])) {
                displayArray.pop(); // Remove the previous operator if another one is pressed
            }

            displayArray.push(value);
            currentInput = "";
            display.text(displayArray.join(" "));
            awaitingOperator = true; // Prevent resetting on next number
            lastResult = null;
        } else if (value === "=") {
            if (currentInput !== "") {
                displayArray.push(parseFloat(currentInput));
            }

            if (displayArray.length >= 3) {
                let num1 = displayArray[0];
                let operator = displayArray[1];
                let num2 = displayArray[2];

                if (operator === "x") {
                    operator = "*";
                }

                let result = eval(`${num1} ${operator} ${num2}`);
                result = parseFloat(result.toFixed(6));

                if (Math.abs(result) >= 10_000_000) {
                    result = result.toExponential(1).replace("e", " E ");
                }

                if (result === Infinity || isNaN(result)) {
                    display.text("Error: Invalid Operation");
                    clear_all();
                } else {
                    display.text(result);
                    displayArray = [result]; // Store result for further operations
                    currentInput = "";
                    lastResult = result; // Store last result
                    awaitingOperator = true;
                }
            }
        }
    });

    // If a number is pressed immediately after `=`, reset the calculator
    $(document).on("click", "button", function () {
        let value = $(this).text();
        if ($.isNumeric(value) || value === ".") {
            if (lastResult !== null && !awaitingOperator) {
                clear_all();
            }
        }
    });
});
