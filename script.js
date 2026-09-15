const currentDisplay =
    document.getElementById("currentDisplay");

const previousDisplay =
    document.getElementById("previousDisplay");

const themeBtn =
    document.getElementById("themeBtn");


let currentValue = "0";

let previousValue = "";

let operator = null;

let waitingForOperand = false;


// =========================================
// UPDATE DISPLAY
// =========================================

function updateDisplay() {

    currentDisplay.textContent =
        currentValue;


    if (previousValue && operator) {

        previousDisplay.textContent =
            `${previousValue} ${operator}`;

    } else {

        previousDisplay.textContent = "";

    }

}


// =========================================
// NUMBER INPUT
// =========================================

function inputNumber(number) {

    if (currentValue === "Error") {

        clearCalculator();

    }


    if (waitingForOperand) {

        currentValue = number;

        waitingForOperand = false;

    }

    else {

        if (currentValue === "0") {

            currentValue = number;

        }

        else {

            currentValue += number;

        }

    }


    updateDisplay();

}


// =========================================
// DECIMAL
// =========================================

function inputDecimal() {

    if (currentValue === "Error") {

        clearCalculator();

    }


    if (waitingForOperand) {

        currentValue = "0.";

        waitingForOperand = false;

        updateDisplay();

        return;

    }


    if (!currentValue.includes(".")) {

        currentValue += ".";

    }


    updateDisplay();

}


// =========================================
// CHOOSE OPERATOR
// =========================================

function chooseOperator(nextOperator) {

    if (currentValue === "Error") {

        return;

    }


    if (
        operator &&
        waitingForOperand
    ) {

        operator = nextOperator;

        updateDisplay();

        return;

    }


    if (previousValue !== "") {

        calculate();

    }


    previousValue = currentValue;

    operator = nextOperator;

    waitingForOperand = true;

    updateDisplay();

}


// =========================================
// CALCULATE
// =========================================

function calculate() {

    if (
        !operator ||
        previousValue === ""
    ) {

        return;

    }


    const first =
        parseFloat(previousValue);

    const second =
        parseFloat(currentValue);


    let result;


    switch (operator) {


        case "+":

            result =
                first + second;

            break;


        case "−":

            result =
                first - second;

            break;


        case "×":

            result =
                first * second;

            break;


        case "÷":

            if (second === 0) {

                currentValue = "Error";

                previousValue = "";

                operator = null;

                updateDisplay();

                return;

            }


            result =
                first / second;

            break;

    }


    result =
        Number(
            result.toFixed(10)
        );


    currentValue =
        String(result);


    previousValue = "";

    operator = null;

    waitingForOperand = true;


    updateDisplay();

}


// =========================================
// CLEAR
// =========================================

function clearCalculator() {

    currentValue = "0";

    previousValue = "";

    operator = null;

    waitingForOperand = false;


    updateDisplay();

}


// =========================================
// BACKSPACE
// =========================================

function backspace() {

    if (
        waitingForOperand ||
        currentValue === "Error"
    ) {

        return;

    }


    if (
        currentValue.length === 1
    ) {

        currentValue = "0";

    }

    else {

        currentValue =
            currentValue.slice(
                0,
                -1
            );

    }


    updateDisplay();

}


// =========================================
// PERCENTAGE
// =========================================

function percentage() {

    if (currentValue === "Error") {

        return;

    }


    const value =
        parseFloat(currentValue);


    if (!isNaN(value)) {

        currentValue =
            String(value / 100);

        updateDisplay();

    }

}


// =========================================
// NUMBER BUTTONS
// =========================================

document
    .querySelectorAll(".number")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.textContent.trim()
                    === "."
                ) {

                    inputDecimal();

                }

                else {

                    inputNumber(
                        button.textContent.trim()
                    );

                }

            }
        );

    });


// =========================================
// OPERATOR BUTTONS
// =========================================

document
    .querySelectorAll(".operator")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                chooseOperator(
                    button.dataset.operation
                );

            }
        );

    });


// =========================================
// ACTION BUTTONS
// =========================================

document
    .querySelector(
        '[data-action="calculate"]'
    )
    .addEventListener(
        "click",
        calculate
    );


document
    .querySelector(
        '[data-action="clear"]'
    )
    .addEventListener(
        "click",
        clearCalculator
    );


document
    .querySelector(
        '[data-action="backspace"]'
    )
    .addEventListener(
        "click",
        backspace
    );


document
    .querySelector(
        '[data-action="percentage"]'
    )
    .addEventListener(
        "click",
        percentage
    );


// =========================================
// KEYBOARD SUPPORT
// =========================================

document.addEventListener(
    "keydown",
    event => {

        const key = event.key;


        // Numbers

        if (/^[0-9]$/.test(key)) {

            inputNumber(key);

            return;

        }


        // Decimal

        if (key === ".") {

            inputDecimal();

            return;

        }


        // Addition

        if (key === "+") {

            chooseOperator("+");

            return;

        }


        // Subtraction

        if (key === "-") {

            chooseOperator("−");

            return;

        }


        // Multiplication

        if (key === "*") {

            chooseOperator("×");

            return;

        }


        // Division

        if (key === "/") {

            event.preventDefault();

            chooseOperator("÷");

            return;

        }


        // Calculate

        if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

            return;

        }


        // Backspace

        if (key === "Backspace") {

            backspace();

            return;

        }


        // Clear

        if (key === "Escape") {

            clearCalculator();

            return;

        }


        // Percentage

        if (key === "%") {

            percentage();

        }

    }
);


// =========================================
// THEME TOGGLE
// =========================================

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeBtn.textContent = "☀";

        }

        else {

            themeBtn.textContent = "☾";

        }

    }
);