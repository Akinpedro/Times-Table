let minTable = 2;
let maxTable = 6;
let currentQuestion = {};
let score = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let difficulty = '';

function setDifficulty(level) {
    // Hide the introductory text
    document.getElementById('intro-text').style.display = 'none';

    switch(level) {
        case 'easy':
            minTable = 2;
            maxTable = 4;
            break;
        case 'intermediate':
            minTable = 2;
            maxTable = 7;
            break;
        case 'advanced':
            minTable = 2;
            maxTable = 12;
            break;
    }
    difficulty = level;
    document.getElementById('settings').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    startGame();
}

function startGame() {
    score = 0;
    totalQuestions = 0;
    correctAnswers = 0;
    showNextQuestion();
}

function nextQuestion() {
    totalQuestions++;
    showNextQuestion();
}

function quitGame() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    let accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    document.getElementById('accuracy').textContent = accuracy.toFixed(2);
}

function restartGame() {
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
}

function showNextQuestion() {
    currentQuestion = generateRandomQuestion();
    document.getElementById('question').textContent = `What is ${currentQuestion.num1} * ${currentQuestion.num2}?`;
    generateOptions();
    document.getElementById('feedback').textContent = '';
    document.getElementById('nextQuestion').style.display = 'none';
}

function generateRandomQuestion() {
    const num1 = Math.floor(Math.random() * (maxTable - minTable + 1)) + minTable;
    const num2 = Math.floor(Math.random() * (maxTable - minTable + 1)) + minTable;
    return { num1, num2, correctAnswer: num1 * num2 };
}

function generateOptions() {
    const correctOption = currentQuestion.correctAnswer;
    const options = [correctOption];
    while (options.length < 5) {
        const randomOption = Math.floor(Math.random() * 144) + 1; // random options between 1 and 144
        if (!options.includes(randomOption)) options.push(randomOption);
    }

    options.sort(() => Math.random() - 0.5); // Randomize the order

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedAnswer) {
    const feedbackElement = document.getElementById('feedback');
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        correctAnswers++;
        feedbackElement.textContent = `⭐ Wow, you're on fire!`;
        feedbackElement.style.color = 'green';
        document.getElementById('score').textContent = score;
        document.getElementById('nextQuestion').style.display = 'inline-block';
    } else {
        feedbackElement.textContent = `Oh no! But you can do it!`;
        feedbackElement.style.color = 'red';
    }
}
