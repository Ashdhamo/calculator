let displayArray = [];
let currentInput = ""; 

$(document).ready(function() {
    var display = $(".display-text");

    $("button").on("click", function() {
        let value = $(this).text();

        if ($.isNumeric(value) || value === ".") {
           //adds the number to the current value if number or decimal
            if (value === "." && currentInput.includes(".")) {
                return; // Prevent multiple decimals
            }
            currentInput += value;
            display.text(currentInput);
        } else if (value === "DEL") {
            // If delete button is pressed, remove the last digit
            currentInput = currentInput.slice(0, -1);
            display.text(currentInput);
        } else if (["+", "-", "x", "/"].includes(value)) {
            // If an operator is pressed, store the current number in displayArray
            if (currentInput !== "") {
                displayArray.push(parseFloat(currentInput)); // Convert to number
            }
            displayArray.push(value); // Store the operator
            currentInput = ""; // Reset for next number
            display.text(displayArray.join(" "));
        } else if (value === "=") {
            // If equals is pressed, process the calculation
            if (currentInput !== "") {
                displayArray.push(parseFloat(currentInput));
            }

            if (displayArray.length >= 3) {
                let num1 = displayArray[0]; // First number
                let operator = displayArray[1]; // Operator
                let num2 = displayArray[2]; // Second number

                // Convert 'x' to '*'
                if (operator === "x") {
                    operator = "*";
                }
                // Perform the calculation
                let result = eval(`${num1} ${operator} ${num2}`);

                // Display the result
                display.text(result);

                // Reset displayArray with the result for further calculations
                displayArray = [result];
                currentInput = "";
            }
        }
    });
});
