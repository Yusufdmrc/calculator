const screen = document.querySelector(".cal-input");
const btn = document.querySelector(".calculator-btn");

let screenValue = "0";
let firstValue = null;
let operator = null;
let forSecondValue = false;

function updateScreen() {
  screen.value = screenValue;
}

updateScreen();
btn.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;

  if (!element.matches("button")) return;

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      operation(value);
      break;
    case ".":
      inputPoint();
      break;

    case "clear":
      clear();
      break;

    default:
      calInput(element.value);
  }
  updateScreen();
});

function calInput(num) {
  if (forSecondValue) {
    screenValue = num;
    forSecondValue = false;
  } else {
    screenValue = screenValue === "0" ? num : screenValue + num;
  }
}

function inputPoint() {
  if (!screenValue.includes(".")) {
    screenValue += ".";
  }
}

function operation(nextOperator) {
  const value = parseFloat(screenValue);

  if (operator && forSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    screenValue = `${parseFloat(result.toFixed(8))}`;
    firstValue = result;
  }

  forSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}

function clear() {
  screenValue = 0;
}
