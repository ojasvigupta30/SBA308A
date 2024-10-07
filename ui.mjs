// Display the question and options
export function showQuestion(questionData) {
    // Set the question text
    document.getElementById('question').innerText = questionData.question;

    // Combine correct and incorrect answers, then shuffle them
    const options = [questionData.correct_answer, ...questionData.incorrect_answers];
    shuffleArray(options);  // Shuffle options

    // Assign shuffled options to buttons
    document.getElementById('option-1').innerText = options[0];
    document.getElementById('option-2').innerText = options[1];
    document.getElementById('option-3').innerText = options[2];
    document.getElementById('option-4').innerText = options[3];
}

// Helper function to shuffle the options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display feedback based on user's answer
export function showFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.innerText = 'Correct!';
        feedback.className = 'correct';
    } else {
        feedback.innerText = `Wrong! The correct answer was: ${correctAnswer}`;
        feedback.className = 'incorrect';
    }
}
