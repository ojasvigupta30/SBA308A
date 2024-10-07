import { getTriviaQuestion } from './api.mjs';
import { showQuestion, showFeedback } from './ui.mjs';

let correctAnswer = '';  // Store the correct answer
let score = 0;  // Store the player's score
let questionCount = 0;  // Track the number of questions asked
const maxQuestions = 10;  // Set a limit for the number of questions

// Load and display the first question
async function loadQuestion() {
    if (questionCount >= maxQuestions) {
        endGame();  // End the game if max questions reached
        return;
    }

    try {
        const questionData = await getTriviaQuestion();  // Fetch a new question
        correctAnswer = questionData.correct_answer;  // Store the correct answer
        showQuestion(questionData);  // Display the question and options

        questionCount++;  // Increment the number of questions asked
        enableOptionButtons();
        document.getElementById('feedback').innerText = '';  // Clear previous feedback
    } catch (error) {
        document.getElementById('question').innerText = 'Unable to load question. Please try again.';
        document.getElementById('options-container').innerHTML = '';  // Clear the options
    }
}

// Handle user's answer selection
function checkAnswer(selectedAnswer) {
    disableOptionButtons();  // Disable buttons after an answer is selected

    if (selectedAnswer === correctAnswer) {
        score++;  // Increment score for correct answer
        showFeedback(true, correctAnswer);  // Show "Correct!" feedback
    } else {
        showFeedback(false, correctAnswer);  // Show the correct answer
    }

    // Update the score and show "Next Question" button
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

// Disable buttons after an answer is selected
function disableOptionButtons() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;
        button.removeEventListener('click', handleOptionClick);
    });
}

// Handle option button click
function handleOptionClick(event) {
    checkAnswer(event.target.innerText);  // Check if the selected answer is correct
}

// Reset for the next question
function resetGame() {
    document.getElementById('next-question').classList.add('hidden');  // Hide "Next Question" button
    loadQuestion();  // Load a new question
}

// End the game and display the final score
function endGame() {
    document.getElementById('question').innerText = `Game Over! Your final score is ${score}/${maxQuestions}.`;
    document.getElementById('options-container').innerHTML = '';  // Clear the options
    document.getElementById('next-question').classList.add('hidden');  // Hide "Next Question" button
}

// Add event listener for the "Next Question" button
document.getElementById('next-question').addEventListener('click', resetGame);

// Load the first question when the page loads
document.addEventListener('DOMContentLoaded', loadQuestion);
