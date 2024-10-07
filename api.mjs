// Fetch trivia question from the Open Trivia API with retry mechanism
export async function getTriviaQuestion(retries = 3) {
    try {
        let response = await fetch(`https://opentdb.com/api.php?amount=20&type=multiple`);
        let data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return data.results[0];  // Return the first question
        } else {
            throw new Error(`No trivia questions available`);
        }
    } catch (error) {
        console.error(`Error fetching trivia question:`, error);
        
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            return getTriviaQuestion(retries - 1);  // Retry fetching
        } else {
            throw new Error(`Failed to load trivia questions after multiple attempts`);
        }
    }
}
