# Trivia Quiz Game

**Trivia Quiz Game** is a fun, dynamic, and interactive single-page web application that allows players to answer multiple-choice trivia questions. The game features bold, nerdy aesthetics with vibrant neon colors and cyberpunk-inspired animations, creating a visually appealing user experience. Users can answer trivia questions, see their score, and progress through the game while enjoying cool effects like glowing buttons and glitchy animations.

## Features
- **Multiple-choice trivia questions**: Players answer questions with four possible options.
- **Real-time score tracking**: Scores are displayed after each question.
- **Nerdy cyberpunk theme**: A fun, retro aesthetic with neon glow effects and glitchy animations.
- **Retry mechanism**: The game retries fetching questions if there is an issue, ensuring smooth gameplay.
- **Responsive design**: Works well on desktop and mobile devices.

## How to Play
1. The game starts with a trivia question loaded from the **Open Trivia API**.
2. Four options are provided, and the player must select the correct answer.
3. After selecting an answer, feedback is shown if the answer is correct or incorrect.
4. The player's score is updated, and they can proceed to the next question by clicking the **Next Question** button.
5. The game continues until the player reaches the maximum number of questions (5 by default), at which point the final score is displayed.

## Technologies Used
- **HTML**: For the structure of the webpage.
- **CSS**: For styling, including animations, neon effects, and responsive design.
- **JavaScript (ES6 modules)**: Core game logic, fetching questions, and handling user interaction.
- **Open Trivia Database (API)**: Provides the trivia questions used in the game. The API returns randomized multiple-choice questions, which are dynamically displayed to the player.

## API: Open Trivia Database

This game uses the **Open Trivia Database API** to fetch multiple-choice trivia questions in real-time. The Open Trivia API is a free, open-source API that provides trivia questions across various categories and difficulties.

### How the API is Used:
- **Endpoint**: The game sends a GET request to the API’s endpoint [Open Trivia API](https://opentdb.com/api.php?amount=20&type=multiple) to fetch trivia questions.
- **Parameters**:
  - **amount**: This specifies the number of trivia questions to be retrieved. In this game, the default is set to 20 questions, but only one is used per round.
  - **type**: The type is set to `multiple`, which indicates that the API will return questions with multiple-choice answers (1 correct and 3 incorrect answers).

  ### Example API Response:
```json
{
  "response_code": 0,
  "results": [
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What is the capital of France?",
      "correct_answer": "Paris",
      "incorrect_answers": ["Berlin", "Madrid", "Rome"]
    }
  ]
}
```

## Setup and Installation

### Prerequisites:
- Any modern web browser (Google Chrome, Firefox, Edge, etc.)

### Steps to Run:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ojasvigupta30/SBA308A.git

2. **Open `index.html` in your web browser**: You can simply double-click the index.html file or serve it via a local server like Live Server if you're using VSCode.


## Project Structure

- **HTML**: The structure of the game, including the heading, options, and buttons.
- **CSS**: Defines the cyberpunk theme, including bright neon colors, hover effects, and glowing animations.
- **JavaScript (ES6 modules)**:
    - **api.mjs**: Handles fetching trivia questions from the Open Trivia API with retry logic.
    - **ui.mjs**: Manages displaying the question, shuffling answers, and showing feedback to the player.
    - **script.mjs**: Contains the main game logic, including event handling, score updates, and game progression.


