// Display the question and answer options
export function showQuestion(questionData) {
    // Set the question text
    document.getElementById('question').innerText = questionData.question;

    // Combine correct and incorrect answers, then shuffle them
    const options = [questionData.correct_answer, ...questionData.incorrect_answers];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Shuffle the options
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Assign shuffled options to buttons
    document.getElementById('option-1').innerText = options[0];
    document.getElementById('option-2').innerText = options[1];
    document.getElementById('option-3').innerText = options[2];
    document.getElementById('option-4').innerText = options[3];
}

// Display feedback based on user answer
export function showFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = isCorrect ? 'Correct!' : 'Wrong! The correct answer was: ' + correctAnswer;
    feedback.className = isCorrect ? 'correct' : 'incorrect';
}
