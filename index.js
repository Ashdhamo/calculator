var buttons = document.querySelectorAll("button");
var display = document.querySelector(".display-text");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        display.innerHTML = this.innerHTML;
    });
});
