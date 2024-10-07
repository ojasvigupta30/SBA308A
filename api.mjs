// Fetch a trivia question from Open Trivia API with error handling
export async function getTriviaQuestion() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        
        // Check if the response has at least one question
        if (data.results && data.results.length > 0) {
            return data.results[0];  // Return the first question
        } else {
            throw new Error('No trivia questions available');
        }
    } catch (error) {
        console.error('Error fetching trivia question:', error);
        throw error;
    }
}
