/* ------------------------------------------------
   CONFIG: QUIZ QUESTIONS
   (Note: The "First Date" question was moved to the Password Login)
   ------------------------------------------------ */
const questions = [
    {
        question: "Do you want me to leave?",
        answer: "No",
        hint: "I hope the answer is no",
        comment: "Okay fine..let's not discuss this rn."
    },
    {
        question: "What is my favorite movie?",
        answer: "yjhd",
        hint: "Easy one",
        comment: "Of course my bunny knows."
    },
    {
        question: "What is my current favorite song?",
        answer: "darkhaast",
        hint: "Let's see if you actually watch my stories.",
        comment: "Impressive!"
    },
    {
        question: "What color was I wearing when you first saw me?",
        answer: "pink",
        hint: "Hint: I was such a pookie back then.",
        comment: "Well you were in a white shirt, we would look cute together."
    },
    {
        question: "Where is our after-fight spot?",
        answer: "burgerking", 
        hint: "Although we fight everywhere, but we decided this once.",
        comment: "You better say sorry at least ten times with AFFIRMATIONS after every fight."
    }
];

/* ------------------------------------------------
   DOM ELEMENTS
   ------------------------------------------------ */
// Login Elements
const loginSection = document.getElementById('login-section');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');

// Main Sections
const proposalSection = document.getElementById('proposal-section');
const giftHubSection = document.getElementById('gift-hub-section');

// Gift Sections
const quizSection = document.getElementById('quiz-section');
const musicSection = document.getElementById('music-section');
const letterSection = document.getElementById('letter-section'); 

// Success & Completion
const successSection = document.getElementById('success-section');
const quizCompleteSection = document.getElementById('quiz-complete-section');

// Interactive Elements
const questionText = document.getElementById('question-text');
const hintText = document.getElementById('hint-text');
const answerInput = document.getElementById('answer-input');
const errorMsg = document.getElementById('error-message');
const successComment = document.getElementById('success-comment');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Global State
let currentQuestionIndex = 0;

/* ------------------------------------------------
   0. LOGIN LOGIC (PASSWORD PROTECTION)
   ------------------------------------------------ */

// Hiding proposal section initially using JS to be safe
proposalSection.classList.add('hidden'); 

function checkPassword() {
    // The "First Date" Answer
    const correctDate = "12.09.2024"; 
    
    // Normalize input (remove spaces)
    const userInput = passwordInput.value.trim();

    if (userInput === correctDate) {
        // Hide Login, Show Proposal
        loginSection.classList.add('hidden');
        proposalSection.classList.remove('hidden');
    } else {
        // Show Error
        loginError.classList.remove('hidden');
        // Shake animation effect (optional)
        passwordInput.style.border = "2px solid red";
        setTimeout(() => {
            passwordInput.style.border = "1px solid #ccc";
        }, 1000);
    }
}

/* ------------------------------------------------
   1. PROPOSAL LOGIC
   ------------------------------------------------ */

function handleNo() {
    document.body.classList.add('sad-mode');
    document.querySelector('.main-container').classList.add('sad-mode');
    
    const title = document.getElementById('proposal-text');
    const sub = document.getElementById('proposal-subtext');
    
    title.innerText = "But... I love you... 😢";
    sub.innerText = "Please don't break my heart. Try again?";
}

function handleYes() {
    document.body.classList.remove('sad-mode');
    document.querySelector('.main-container').classList.remove('sad-mode');
    
    proposalSection.classList.add('hidden');
    giftHubSection.classList.remove('hidden');
}

/* ------------------------------------------------
   2. NAVIGATION LOGIC (GIFT HUB)
   ------------------------------------------------ */

function openSection(sectionName) {
    giftHubSection.classList.add('hidden');
    
    if (sectionName === 'quiz') {
        // Check if quiz was finished previously. If so, restart it.
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0;
        }
        
        quizSection.classList.remove('hidden');
        loadQuestion(); 
    } else if (sectionName === 'music') {
        musicSection.classList.remove('hidden');
    } else if (sectionName === 'letter') {
        letterSection.classList.remove('hidden');
    }
}

function backToHub() {
    quizSection.classList.add('hidden');
    musicSection.classList.add('hidden');
    letterSection.classList.add('hidden');
    quizCompleteSection.classList.add('hidden');
    successSection.classList.add('hidden');
    
    giftHubSection.classList.remove('hidden');
}

/* ------------------------------------------------
   3. QUIZ LOGIC
   ------------------------------------------------ */

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    
    questionText.innerText = q.question;
    hintText.innerText = q.hint;
    answerInput.value = "";
    errorMsg.classList.add('hidden');
    
    // Update Progress Bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function checkAnswer() {
    // Standardize input: lowercase and remove ALL spaces
    const userAnswer = answerInput.value.trim().toLowerCase().replace(/\s/g, '');
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase().replace(/\s/g, '');

    if (userAnswer === correctAnswer) {
        quizSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        successComment.innerText = questions[currentQuestionIndex].comment;
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function loadNextQuestion() {
    successSection.classList.add('hidden');
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        quizSection.classList.remove('hidden');
        loadQuestion();
    } else {
        quizCompleteSection.classList.remove('hidden');
    }
}