// Get DOM elements
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('startBtn');
const playerNameDisplayStart = document.getElementById('playerNameDisplay');
const playerInfo = document.getElementById('playerInfo');
const quizContent = document.getElementById('quizContent');
const submitButton = document.getElementById('submitBtn'); 

// Event listener for start button
startBtn.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  if (playerName !== '') {
    playerNameDisplayStart.innerText = playerName;
    playerInfo.style.display = 'none';
    quizContent.style.display = 'block';
    startQuiz();
  } else {
    alert('Please enter your name to start the game.');
  }
});

const quizData = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    choices: ["<head>", "<h1>", "<h6>", "<heading>"],
    correct: "<h1>"
  },
  {
    question: "Which character is used to indicate an end tag?",
    choices: ["/", "<", ">", "^"],
    correct: "/"
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    choices: ["<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='new'>", "<a href='url' target='blank'>"],
    correct: "<a href='url' target='_blank'>"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    choices: ["title", "alt", "src", "longdesc"],
    correct: "alt"
  },
  {
    question: "Which doctype is correct for HTML5?",
    choices: ["<!DOCTYPE html5>", "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML5.0//EN' 'http://www.w3.org/TR/html5/strict.dtd'>", "<!DOCTYPE html>", "<!DOCTYPE HTML>"],
    correct: "<!DOCTYPE html>"
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    choices: ["<a href='http://www.example.com'>example</a>", "<a url='http://www.example.com'>example.com</a>", "<a name='http://www.example.com'>example</a>", "<a>http://www.example.com</a>"],
    correct: "<a href='http://www.example.com'>example</a>"
  },
  {
    question: "What is the correct HTML for inserting an image?",
    choices: ["<img src='image.gif' alt='MyImage'>", "<image src='image.gif' alt='MyImage'>", "<img alt='MyImage'>image.gif</img>", "<img alt='MyImage'>image.gif</img>"],
    correct: "<img src='image.gif' alt='MyImage'>"
  },
  {
    question: "Which HTML element is used to define important text?",
    choices: ["<strong>", "<i>", "<b>", "<em>"],
    correct: "<strong>"
  },
  {
    question: "What is the correct HTML for making a text input field?",
    choices: ["<input type='text'>", "<textfield>", "<input type='textfield'>", "<textinput type='text'>"],
    correct: "<input type='text'>"
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    choices: ["<ul>", "<ol>", "<li>", "<list>"],
    correct: "<ul>"
  },
  {
    question: "What does the 'href' attribute specify in an anchor tag?",
    choices: ["The URL of the linked document", "The name of the link", "The text of the link", "The title of the link"],
    correct: "The URL of the linked document"
  },
  {
    question: "In HTML, which attribute is used to provide an advisory text about the element?",
    choices: ["title", "alt", "advisory", "advice"],
    correct: "title"
  },
  {
    question: "Which tag is used to create a hyperlink?",
    choices: ["<link>", "<a>", "<ref>", "<anchor>"],
    correct: "<a>"
  },
  {
    question: "In HTML, which attribute is used to specify an alternate text for an image?",
    choices: ["alt", "src", "title", "href"],
    correct: "alt"
  },
  {
    question: "What is the correct HTML for creating a checkbox?",
    choices: ["<input type='check'>", "<checkbox>", "<input type='checkbox'>", "<check>"],
    correct: "<input type='checkbox'>"
  },
  {
    question: "Which of the following tags is used to create a table in HTML?",
    choices: ["<table>", "<tr>", "<th>", "<td>"],
    correct: "<table>"
  },
  {
    question: "Which tag is used to display a horizontal line in HTML?",
    choices: ["<line>", "<br>", "<hr>", "<hl>"],
    correct: "<hr>"
  },
  {
    question: "What is the correct HTML for inserting an image?",
    choices: ["<img src='image.gif' alt='MyImage'>", "<image src='image.gif' alt='MyImage'>", "<img alt='MyImage'>image.gif</img>", "<img alt='MyImage'>image.gif</img>"],
    correct: "<img src='image.gif' alt='MyImage'>"
  },
  // Add more questions...
];

// Get DOM elements for quiz
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const scoreElement = document.getElementById('scoreValue');
const rewardElement = document.getElementById('reward');
const playerNameDisplay = document.getElementById('playerNameDisplay');

// Variables for quiz state
let currentQuestion;
let score;

// Function to start the quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  shuffleArray(quizData);
  loadQuestion();
}

// Function to load a question
function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.innerText = currentQuizData.question;
  choicesElement.innerHTML = '';

  currentQuizData.choices.forEach(choice => {
    const choiceElement = document.createElement('button');
    choiceElement.innerText = choice;
    choiceElement.addEventListener('click', () => checkAnswer(choice, choiceElement));
    choicesElement.appendChild(choiceElement);
  });
}

// Function to check the selected answer
function checkAnswer(answer, choiceElement) {
  const currentQuizData = quizData[currentQuestion];
  if (answer === currentQuizData.correct) {
    score++;
    rewardElement.innerText = '';
    choiceElement.style.backgroundColor = 'green'; // Change background color to green for correct answer
  } else {
    rewardElement.innerText = 'Sorry! Answer is not correct.'; // Display message
    choiceElement.style.backgroundColor = 'red'; // Change background color to red for incorrect answer
  }
  disableAllOptions();
}

// Event listener for submit button
submitButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < 10) {
    loadQuestion();
  } else {
    endQuiz();
  }
  updateScore();
});

// Function to disable all options after selecting one
function disableAllOptions() {
  const choiceButtons = choicesElement.getElementsByTagName('button');
  for (let button of choiceButtons) {
    button.disabled = true; // Disable all options after selecting one
  }
}

// Function to end the quiz
function endQuiz() {
  questionElement.innerText = 'Quiz completed!';
  choicesElement.innerHTML = '';
  submitButton.style.display = 'none';
  if (score >= 7) {
    rewardElement.innerText = 'Congratulations! You win a prize!';
  } else {
    rewardElement.innerText = 'You didn\'t score high enough for a prize.';
  }
}

// Function to update the score
function updateScore() {
  scoreElement.innerText = score;
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the quiz when the page loads
startQuiz();