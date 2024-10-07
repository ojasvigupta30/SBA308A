import { getTriviaQuestion } from './api.mjs';
import { showQuestion, showFeedback } from './ui.mjs';

let correctAnswer = '';  // Store correct answer
let score = 0;  // Store player's score

// Load and display the first question
async function loadQuestion() {
    try {
        const questionData = await getTriviaQuestion();
        correctAnswer = questionData.correct_answer;
        showQuestion(questionData);

        // Reset buttons and feedback for the new question
        enableOptionButtons();
        document.getElementById('feedback').innerText = '';
    } catch (error) {
        document.getElementById('question').innerText = 'Error loading question. Please try again.';
        document.getElementById('options-container').innerHTML = '';
    }
}

// Handle user's answer selection
function checkAnswer(selectedAnswer) {
    disableOptionButtons();  // Disable buttons after selection

    if (selectedAnswer === correctAnswer) {
        score++;  // Increase score for correct answer
        showFeedback(true, correctAnswer);  // Show "Correct!" feedback
    } else {
        showFeedback(false, correctAnswer);  // Show the correct answer
    }

    // Update score and show "Next Question" button
    document.getElementById('score').innerText = score;
    document.getElementById('next-question').classList.remove('hidden');
}

// Enable answer buttons for user interaction
function enableOptionButtons() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = false;
        button.addEventListener('click', handleOptionClick);
    });
}

// Disable buttons to prevent further clicks after an answer is selected
function disableOptionButtons() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;
        button.removeEventListener('click', handleOptionClick);
    });
}

// Handle option button click
function handleOptionClick(event) {
    checkAnswer(event.target.innerText);  // Check if the answer is correct
}

// Reset for the next question
function resetGame() {
    document.getElementById('next-question').classList.add('hidden');  // Hide "Next Question" button
    loadQuestion();  // Load a new question
}

// Add event listener for the "Next Question" button
document.getElementById('next-question').addEventListener('click', resetGame);

// Load the first question when the page loads
document.addEventListener('DOMContentLoaded', loadQuestion);
