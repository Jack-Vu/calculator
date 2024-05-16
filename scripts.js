// array containing all the buttons on the page
const button = document.querySelectorAll("button");
// grabbed the display element
const display = document.getElementById("display");
// hold and will later update display for the first number
let num1 = "";
// hold and will later update display for the second number
let num2 = "";
// this boolean lets us know when we switch from the first number to the second number
// starts off false since we are on the first number and is later changed to true when an operator is clicked
let secondNum = false;
// this boolean handles wether or not
//we are continuing from the number we are currently working on
let cont = true;
// this variable holds the operator element to help add
// remove the clicked class which changes the operators buttons
let operator;
// this variable holds onto the actual sign of the operator to apply the operator in
// when the equal sign is hit
let hold = "";
// this boolean check if we hit the equal sign again after we did a calculation to repeat it
// continues until broken by an operation sign or clicking a number
let double = true;

const clearButton = document.getElementById("clear");

// for each loop that applies an event listener on each button and calls on the function to change the display
button.forEach((button) => {
  button.addEventListener("click", handleDisplay);
});

// main function to handle display
function handleDisplay(event) {
  // a variable to hold the current target
  const targetElement = event.target;
  // handles if the target has a class of operator
  if (targetElement.classList.contains("operator")) {
    // initially will not have have opeartor, but afterwards if a different operator is clicked it will hold priority
    if (operator != undefined) {
      operator.classList.remove("clicked");
    }
    // when an operator is clicked it is assuming that we aren't continuing the previous calculations
    double = false;
    // add styling to current clicked operator
    targetElement.classList.add("clicked");
    // when operator is clicked it is assumed to be focusing now on the second number
    secondNum = true;
    // holding operator element to add and remove styling
    operator = targetElement;
    // holding the text equivalent to the operator
    hold = operator.textContent;
    // ensures second number is cleared
    num2 = "";
  }
  // handles elements with a special class
  if (targetElement.classList.contains("special")) {
    // if AC is clicked clears numbers, holding operator and styling
    if (targetElement.textContent == "AC") {
      num1 = "";
      num2 = "";
      hold = "";
      operator.classList.remove("clicked");
    }
    // when C is clicked clears the current number and displays 0 and sets the C to AC if they want to continue to reset everything
    if (targetElement.textContent == "C") {
      if (secondNum == false) {
        num1 = "";
        display.textContent = 0;
      } else {
        num2 = "";
        display.textContent = 0;
        secondNum = true;
      }
      targetElement.textContent = "AC";
    }
    // when +/- is clicked handles this operation by taking zero and subtracting the current number
    if (targetElement.textContent == "+/-") {
      if (secondNum == false) {
        num1 = 0 - num1;
        display.textContent = num1;
      } else {
        num2 = 0 - num2;
        display.textContent = num2;
      }
    }
    // when % is clicked handles this operation by dividing by 100
    if (targetElement.textContent == "%") {
      if (secondNum == false) {
        num1 = parseFloat(Number(num1).toPrecision(14)) / 100;
        display.textContent = num1;
      } else {
        num2 = parseFloat(Number(num2).toPrecision(14)) / 100;
        display.textContent = num2;
      }
    }
  }
  // occurs when the . is clicked
  if (targetElement.classList.contains("dot")) {
    //checks to see if a . is current in the display or not if there isn't add one to the end
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
      if (secondNum == false) {
        if (num1 == "") {
          num1 += "0";
        }
        num1 = num1 + ".";
      } else {
        num2 = num2 + ".";
      }
    }
    // only affects the second number on a calulator if a decimal number is currently in there and operation is clicked if . is pressed again it continues as the second number
    if (display.textContent.includes(".") && secondNum == true) {
      display.textContent = "0.";
      num2 = display.textContent;
    }
  }
  // this handles the first number 
  if (targetElement.classList.contains("number") && secondNum == false) {
    // when first number is pressed styling chnaged for AC to C 
    clearButton.textContent = "C";
    // since we are no longer continuing we set it to false and num1 to empty 
    if (cont) {
      cont = false;
      if (hold != "") {
        num1 = "";
      }
      hold = "";
    }
    // changes num1 to add the number clicked
    num1 += event.target.textContent;
    display.textContent = num1;
  }
  // handles the second number
  if (targetElement.classList.contains("number") && secondNum == true) {
    clearButton.textContent = "C";
    num2 += event.target.textContent;
    display.textContent = num2;
  }
  // this occurs when the = sign is clicked
  if (targetElement.classList.contains("equality")) {
    // this is used to show the final results after fixing floating point issue
    let results = 0;
    // when = is clicked styling of operators are removed
    operator.classList.remove("clicked");
    // double continues to be true until continue is false or an operator is clicked
    double = true;
    // the following if statements deal with the direct arithmetics
    if (hold == "+") {
      results = Number(num1) + Number(num2);
      display.textContent = parseFloat(results.toPrecision(14));
      num1 = display.textContent;
    }
    if (hold == "-") {
      results = Number(num1) - Number(num2);
      display.textContent = parseFloat(results.toPrecision(14));
      num1 = display.textContent;
    }
    if (hold == "x") {
      results = Number(num1) * Number(num2);
      display.textContent = parseFloat(results.toPrecision(14));
      num1 = display.textContent;
    }
    if (hold == "/") {
      results = Number(num1) / Number(num2);
      display.textContent = parseFloat(results.toPrecision(14));
      num1 = display.textContent;
    }
    // reset to assume we are going back to the first number unless operator is clicked then returns to true
    secondNum = false;
    // continue holding the previous num1 as the current number from the results and only when a number is clicked that is not an operator will a whole new calculation start
    cont = true;
  }
}
