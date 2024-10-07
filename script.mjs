import { getTriviaQuestion } from './api.mjs';
import { showQuestion, showFeedback } from './ui.mjs';

// Variables to store the correct answer and score
let correctAnswer = '';
let score = 0;

// Fetch and display a trivia question
async function loadQuestion() {
    try {
        const questionData = await getTriviaQuestion();  // Fetch the question
        correctAnswer = questionData.correct_answer;  // Store the correct answer
        showQuestion(questionData);  // Display the question and options

        // Re-enable buttons for the new question
        enableOptionButtons();
    } catch (error) {
        document.getElementById('question').innerText = 'Error loading question. Please try again.';
        document.getElementById('options-container').innerHTML = '';  // Clear the options
    }
}

// Handle answer click
function checkAnswer(userAnswer) {
    disableOptionButtons();  // Disable buttons once an answer is selected

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

// Enable buttons for selecting answers
function enableOptionButtons() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = false;  // Enable button
    });
}

// Disable buttons after an answer is selected
function disableOptionButtons() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;  // Disable button
    });
}

// Reset for the next question
function resetGame() {
    document.getElementById('feedback').innerText = '';  // Clear feedback
    document.getElementById('next-question').classList.add('hidden');  // Hide "Next Question" button
    loadQuestion();  // Load a new question
}

// Handle option button click
function handleOptionClick(event) {
    checkAnswer(event.target.innerText);  // Check if the selected answer is correct
}

// Add event listeners for option buttons
const optionButtons = document.querySelectorAll('.option');
optionButtons.forEach(button => {
    button.addEventListener('click', handleOptionClick);  // Attach event listeners once
});

// Add event listener for "Next Question" button
document.getElementById('next-question').addEventListener('click', resetGame);

// Load the first question when the page is ready
document.addEventListener('DOMContentLoaded', loadQuestion);
