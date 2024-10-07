import { getTriviaQuestion } from './api.js';
import { showQuestion, showFeedback } from './ui.js';

// Variables to store the correct answer and score
let correctAnswer = '';
let score = 0;

// Fetch and display a trivia question
async function loadQuestion() {
    const questionData = await getTriviaQuestion();  // Fetch the question
    correctAnswer = questionData.correct_answer;  // Store the correct answer
    showQuestion(questionData);  // Display the question and options
}

// Handle answer click
function checkAnswer(userAnswer) {
    if (userAnswer === correctAnswer) {
        score++;  // Increment score if the answer is correct
        showFeedback(true, correctAnswer);  // Show "Correct!" feedback
    } else {
        showFeedback(false, correctAnswer);  // Show the correct answer in feedback
    }

    // Update the score and show the "Next Question" button
    document.getElementById('score').innerText = score;
    document.getElementById('next-question').classList.remove('hidden');
}

// Reset for the next question
function resetGame() {
    document.getElementById('feedback').innerText = '';  // Clear feedback
    document.getElementById('next-question').classList.add('hidden');  // Hide "Next Question" button
    loadQuestion();  // Load a new question
}

// Add event listeners for the option buttons
const optionButtons = document.querySelectorAll('.option');
for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function(event) {
        checkAnswer(event.target.innerText);  // Check if the selected answer is correct
    });
}

// Add event listener for "Next Question" button
document.getElementById('next-question').addEventListener('click', resetGame);

// Load the first question when the page is ready
document.addEventListener('DOMContentLoaded', loadQuestion);
