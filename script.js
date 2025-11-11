// Title customization
let fontToggle = true;
let sizeToggle = true;
let colorToggle = true;

document.getElementById("btnFont").addEventListener("click", function() {
  const title = document.getElementById("mainTitle");
  if (fontToggle) {
    title.style.fontFamily = "Courier New, monospace";
  } else {
    title.style.fontFamily = "Times New Roman, serif";
  }
  fontToggle = !fontToggle;
});

document.getElementById("btnFontSize").addEventListener("click", function() {
  const title = document.getElementById("mainTitle");
  if (sizeToggle) {
    title.style.fontSize = "36px";
  } else {
    title.style.fontSize = "24px";
  }
  sizeToggle = !sizeToggle;
});

document.getElementById("btnColor").addEventListener("click", function() {
  if (colorToggle) {
    document.body.style.backgroundColor = "#d0f0fd";
  } else {
    document.body.style.backgroundColor = "#f1a2a2";
  }
  colorToggle = !colorToggle;
});

// Math game variables
let num1, num2;
let scoreCorrect = 0;
let scoreTotal = 0;

// Generate math question
function generateQuestion() {
  const difficulty = document.getElementById("difficulty").value;
  let maxNumber;
  if (difficulty === "easy") {
    maxNumber = 20;
  } else if (difficulty === "medium") {
    maxNumber = 50;
  } else {
    maxNumber = 100;
  }

  num1 = Math.floor(Math.random() * maxNumber) + 1;
  num2 = Math.floor(Math.random() * maxNumber) + 1;

  const operation = document.getElementById("operation").value;
  let symbol = "+";
  if (operation === "subtract") {
    symbol = "-";
  } else if (operation === "multiply") {
    symbol = "×";
  } else if (operation === "divide") {
    symbol = "÷";
  }

  document.getElementById("question").innerText = `What is ${num1} ${symbol} ${num2}?`;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "Result:";
  document.getElementById("correctAnswerDisplay").innerText = "";
}

// Check user's answer
function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const operation = document.getElementById("operation").value;
  let correctAnswer;

  if (operation === "add") {
    correctAnswer = num1 + num2;
  } else if (operation === "subtract") {
    correctAnswer = num1 - num2;
  } else if (operation === "multiply") {
    correctAnswer = num1 * num2;
  } else if (operation === "divide") {
    correctAnswer = +(num1 / num2).toFixed(2);
  }

  scoreTotal++;

  if (isNaN(userAnswer)) {
    document.getElementById("result").innerText = "Please enter a valid number!";
    scoreTotal--;
    document.getElementById("correctAnswerDisplay").innerText = "";
  } else if (userAnswer === correctAnswer) {
    document.getElementById("result").innerText = "Correct!";
    scoreCorrect++;
    document.getElementById("correctAnswerDisplay").innerText = `Answer: ${correctAnswer}`;
  } else {
    document.getElementById("result").innerText = "Wrong!";
    document.getElementById("correctAnswerDisplay").innerText = `Correct Answer: ${correctAnswer}`;
  }

  document.getElementById("score").innerText = `Score: ${scoreCorrect} / ${scoreTotal}`;
  generateQuestion();
}

// Event listeners
document.getElementById("btnSubmit").addEventListener("click", checkAnswer);
document.getElementById("operation").addEventListener("change", generateQuestion);
document.getElementById("difficulty").addEventListener("change", generateQuestion);

// Initialize first question
window.onload = generateQuestion;