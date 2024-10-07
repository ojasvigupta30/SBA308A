import { getTriviaQuestion } from './api.mjs';
import { showQuestion, showFeedback } from './ui.mjs';

let correctAnswer = ``;  // Store the correct answer
let score = 0;  // Store player`s score
let questionCount = 0;  // Track the number of questions asked
let maxQuestions = 5;  // Set max number of questions
let retryCount = 0;  // Track retries
let maxRetries = 3;  // Limit the number of retries

// Load and display the next question with retry and error handling
async function loadQuestion() {
    if (questionCount >= maxQuestions) {
        endGame();  // End game if max questions reached
        return;
    }

    try {
        let questionData = await getTriviaQuestion();  // Fetch question
        correctAnswer = questionData.correct_answer;  // Store the correct answer
        showQuestion(questionData);  // Display question
        retryCount = 0;  // Reset retry count on success

        questionCount++;  // Increment the question count
        enableOptionButtons();  // Enable the buttons for interaction
        document.getElementById(`feedback`).innerHTML = ``;  // Clear previous feedback
    } catch (error) {
        document.getElementById(`question`).innerText = `Loading question... Please wait...`;  // Show error
        retryCount++;  // Increment retry count
        if (retryCount <= maxRetries) {
            await delay(3000);  // Wait for 3 seconds before retrying
            loadQuestion();  // Retry loading the question
        } else {
            document.getElementById(`question`).innerText = `Failed to load questions. Please refresh the game.`;  // Final failure message
            disableOptionButtons();  // Disable the buttons
        }
    }
}

// Utility function to add delay (wait)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle the answer click
function checkAnswer(selectedAnswer) {
    disableOptionButtons();  // Disable buttons after selection

    if (selectedAnswer === correctAnswer) {
        score++;  // Increment score if the answer is correct
        showFeedback(true, correctAnswer);  // Show correct feedback
    } else {
        showFeedback(false, correctAnswer);  // Show incorrect feedback
    }

    // Show the "Next Question" button
    document.getElementById(`score`).innerText = score;
    document.getElementById(`next-question`).classList.remove(`hidden`);
}

// Enable the option buttons
function enableOptionButtons() {
    let optionButtons = document.querySelectorAll(`.option`);
    optionButtons.forEach(button => {
        button.disabled = false;  // Enable button
    });
}

// Disable the option buttons
function disableOptionButtons() {
    let optionButtons = document.querySelectorAll(`.option`);
    optionButtons.forEach(button => {
        button.disabled = true;  // Disable button
    });
}

// Handle option button click
function handleOptionClick(eve) {
    checkAnswer(eve.target.innerHTML);  // Check the selected answer
}

// Reset for the next question
function resetGame() {
    let nextQuestion = document.getElementById(`next-question`);
    nextQuestion.classList.add(`hidden`);  // Hide "Next Question" button
    let feedback = document.getElementById(`feedback`);
    feedback.classList.add(`hidden`);
    feedback.classList.remove(`correct`);
    feedback.classList.remove(`incorrect`);
    loadQuestion();  // Load a new question
}

// End the game and display final score
function endGame() {
    document.getElementById(`question`).innerText = `Game Over! Your final score is ${score}/${maxQuestions}.`;
    document.getElementById(`options-container`).innerHTML = ``;  // Clear options
    document.getElementById(`next-question`).classList.add(`hidden`);  // Hide "Next Question" button
}

// Attach event listeners for the buttons
function setupButtonListeners() {
    let optionButtons = document.querySelectorAll(`.option`);
    optionButtons.forEach(button => {
        button.addEventListener(`click`, handleOptionClick);
    });
}

// Add event listener for "Next Question" button
let nextQuestionButton = document.getElementById(`next-question`);
nextQuestionButton.addEventListener(`click`, resetGame);

// Load the first question when the page loads
document.addEventListener(`DOMContentLoaded`, () => {
    setupButtonListeners();  // Add button event listeners once
    loadQuestion();  // Load the first question
});
