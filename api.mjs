// Fetch a trivia question with retry mechanism
export async function getTriviaQuestion(retries = 3) {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        
        // Check if there is a valid question
        if (data.results && data.results.length > 0) {
            return data.results[0];  // Return the first question object
        } else {
            throw new Error('No trivia questions available');
        }
    } catch (error) {
        console.error('Error fetching trivia question:', error);

        // Retry fetching if we still have retries left
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            return getTriviaQuestion(retries - 1);  // Recursively retry
        } else {
            throw new Error('Failed to load trivia questions after multiple attempts');
        }
    }
}
