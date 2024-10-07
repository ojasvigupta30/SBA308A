// Display the question and options
export function showQuestion(questionData) {
    // Set the question text
    document.getElementById(`question`).innerHTML = questionData.question;

    // Combine correct and incorrect answers, then shuffle them
    let options = [questionData.correct_answer, ...questionData.incorrect_answers];
    shuffleArray(options);  // Shuffle options so that correct answers are different options

    // Assign shuffled options to buttons
    document.getElementById(`option-1`).innerHTML = options[0];
    document.getElementById(`option-2`).innerHTML = options[1];
    document.getElementById(`option-3`).innerHTML = options[2];
    document.getElementById(`option-4`).innerHTML = options[3];
}

// Shuffle the options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display feedback
export function showFeedback(isCorrect, correctAnswer) {
    let feedback = document.getElementById(`feedback`);
    feedback.innerText = isCorrect ? `Correct!` : `Wrong! The correct answer was: ${correctAnswer}`;
    feedback.className = isCorrect ? `correct` : `incorrect`;

}
