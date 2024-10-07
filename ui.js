// Displays the trivia question and shuffled options
export function showQuestion(questionData) {
    // Display the question
    document.getElementById('question').innerText = questionData.question;

    // Combine correct and incorrect answers, then shuffle them
    const options = [...questionData.incorrect_answers, questionData.correct_answer].sort(function() {
        return Math.random() - 0.5;
    });

    // Display the shuffled options in the buttons
    document.getElementById('option-1').innerText = options[0];
    document.getElementById('option-2').innerText = options[1];
    document.getElementById('option-3').innerText = options[2];
    document.getElementById('option-4').innerText = options[3];
}

// Displays feedback based on whether the answer is correct
export function showFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.innerText = 'Correct!';
        feedback.className = 'correct';
    } else {
        feedback.innerText = 'Wrong! The correct answer was: ' + correctAnswer;
        feedback.className = 'incorrect';
    }
}
