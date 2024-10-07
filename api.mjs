// Fetches a trivia question from Open Trivia API with error handling
export async function getTriviaQuestion() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        
        // Check if there is at least one question in the response
        if (data.results && data.results.length > 0) {
            return data.results[0];  // Return the first question object
        } else {
            throw new Error('No trivia questions available');  // If no questions, throw an error
        }
    } catch (error) {
        console.error('Error fetching trivia question:', error);
        throw error;  // Rethrow the error so it can be handled elsewhere
    }
}
