// Global Variables
let questionTime = 0; // seconds
let currentQuestion = 1;
let questionCorrect = 0;
let quizStarted = false;
let timer = 0;
let countdownPerQuestion = false; // set to true if the countdown should happen for each question
let totalTime = 0; // seconds
let totalQuestions = questions.length;
let timerEnabled = false;

var quizAdPattern;
// Array to store the question numbers where the ad should be shown
let adQuestionNumbers;

// Array to store test information
let quizInfo = [];

// Function to set quiz time
function setQuizTime() {
  const quizTimeInput = document.getElementById("quiz-time");
  const newQuizTime = parseInt(quizTimeInput.value);

  if (timerEnabled == true) {
    questionTime = newQuizTime;
    totalTime = newQuizTime;

    startTimer();
  }
}

// Function to start the quiz
function startQuiz() {
  quizStarted = true;
  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  document.getElementById("optionContainer").classList.add("d-none");
  totalQuestions = questions.length;

  // Hide the MessageBoard
  document.getElementById("MessageBoard").classList.add("d-none");

  console.log(totalQuestions + "   ????????????totalQuestions????"); // Output: 3

  var numAd;

  if (totalQuestions < 15) {
    numAds = 2;
  } else {
    numAds = totalQuestions / 3;
  }

  var intvalue = Math.round(numAds);

  quizAdPattern = generateQuizAdPattern(totalQuestions, intvalue);
  adQuestionNumbers = quizAdPattern;
  console.log(adQuestionNumbers + "   ?????xx???????adQuestionNumbers????"); // Output: 3

  // Array to store the question numbers where the ad should be shown
  adQuestionNumbers = quizAdPattern; // Example: Show ad after questions 3, 7, and 11

  setQuizTime();
   updateQuestionNumber();

  updateProgressBar(currentQuestion);
    showQuestion();

}




const quizTimeInput = document.querySelector('#quiz-time');

// Add an event listener to the timer checkbox to update the timerEnabled variable
const timerCheckbox = document.getElementById("timer-checkbox");
const timeGroup = document.getElementById("timer-timeGroup");
const perQtimeCheckbox = document.getElementById("countdown-per-question");

timerCheckbox.addEventListener("change", function () {
  timerEnabled = timerCheckbox.checked;

  if (timerCheckbox.checked) {
    timeGroup.style.display = 'block';
  } else {
    timeGroup.style.display = 'none';
    perQtimeCheckbox.checked = 0;
  }
});

const countdownCheckbox = document.getElementById("countdown-per-question");
countdownCheckbox.addEventListener("change", function () {
  countdownPerQuestion = countdownCheckbox.checked;
  timerCheckbox.checked = true;
  timerEnabled = true;

  if (timerCheckbox.checked) {
    timeGroup.style.display = 'block';
  } else {
    timeGroup.style.display = 'none';
  }
});



// Function to generate a random pattern with ads placed between questions
// Function to generate a random pattern with ads placed between questions
function generateQuizAdPattern(numQuestions, numAds) {
  const adInterval = Math.floor(numQuestions / (numAds + 1));
  const pattern = [];

  let currentPosition = adInterval;
  while (pattern.length < numAds) {
    pattern.push(currentPosition);
    currentPosition += adInterval;
  }

  return pattern;
}



  const adDuration = 10; // Duration of each ad in seconds
  let adCount = 0; // Counter for the number of ads shown

// Function to display ads
function showAdsFunc() {

  let countdown = adDuration;

  function displayAd() {
    adCount++;
    // Insert code here to display the ad (e.g., show a modal, render an ad component, etc.)

    // Show the hidden div
    document.getElementById("ad-container").style.display = 'block';
    document.getElementById("ad-text").innerHTML = "This will be an ad <br> Ad ends in " + countdown + " seconds";

    // Start the countdown timer for the ad duration
    const countdownInterval = setInterval(() => {
      console.log("Ad " + adCount + " is being shown.");
   //   console.log("Ad ends in " + countdown + " seconds.");
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        document.getElementById("ad-container").style.display = 'none';
        showQuestion(); // Call the showQuestion function after the ad ends
      } else {
        document.getElementById("ad-text").innerHTML = "This will be an ad <br> Ad ends in " + countdown + " seconds";
      }
    }, 1000);
  }

  displayAd();
}




function showQuestion() {
//  console.log(adQuestionNumbers + "  adQuestionNumbers??????????currentQuestion????   " + currentQuestion);

  // Check if the current question number is in the adQuestionNumbers array
  if (adQuestionNumbers.includes(currentQuestion)) {
    const index = adQuestionNumbers.indexOf(currentQuestion);
    if (index !== -1) {
      adQuestionNumbers.splice(index, 1);
    }
    // Call the showAdsFunc() to start displaying ads

    showAdsFunc();
    return;
  }

  // Continue showing the question if it's the first one
  const questionObj = questions[currentQuestion];
  // Rest of the function code...

  document.getElementById("question").innerHTML = questionObj.question;
  const options = questionObj.options;
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < options.length; i++) {
    answerButtons[i].innerHTML = options[i];
    answerButtons[i].addEventListener("click", checkAnswer);
  }
  document.getElementById("explanation").innerHTML = "";
  if (countdownPerQuestion && timerEnabled) {
    totalTime = questionTime;
    startTimer();
  }
}




  // Get the progress bar element
var progressBar = document.getElementById('progress-bar');

// Update the progress bar
function updateProgressBar(currentQuestion) {
  let QuestionNewNum = currentQuestion + 1;
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
  //      console.log(QuestionNewNum+"  updateProgressBar??????????currentQuestion????"); // Output: 3
    //    console.log(totalQuestions+"  totalQuestions??????????totalQuestions????"); // Output: 3

}   
// Function to check the user's answer
function checkAnswer() {
  const selectedOption = this;
  const optionContainers = document.querySelectorAll("#optionContainers button.answer-option");
  const selectedAnswer = selectedOption.innerHTML;
  const questionObj = questions[currentQuestion];
  const options = optionContainers[currentQuestion]?.children;
let correct_bool;
   //console.log(options+"  options??????????totalQuestions????"); // Output: 3
        console.log("questionObj:", questionObj);

  // Disable all options and apply appropriate classes
  if (options) {
    for (let i = 0; i < options.length; i++) {
      options[i].classList.add('disabled');
      if (options[i].innerHTML === questionObj.answer) {
        options[i].classList.add('correct');
      } else {
        options[i].classList.add('incorrect');
      }
    }
  }

  // Check if the selected answer is correct
  if (selectedAnswer === questionObj.answer) {
    selectedOption.classList.add('correct');
    questionCorrect++;
    correct_bool = "Correct";
  } else {
    selectedOption.classList.add('incorrect');
    correct_bool = "incorrect";

    // Highlight the missed answer
    const answerOptions = document.getElementsByClassName("answer-option");
    for (let i = 0; i < answerOptions.length; i++) {
      if (answerOptions[i].innerHTML === questionObj.answer) {
        answerOptions[i].classList.add('missed');
      }
    }
    //  console.log("Highlighted missed answer:", questionObj.answer);
      //console.log("questionObj.questionNumber:", questionObj.questionNumber);

  }

 
// Update the quizInfo array if necessary
if (quizInfo) {
  if (!quizInfo.questionsCompleted) {
    quizInfo.questionsCompleted = []; // Initialize the array if it's undefined
  }

  quizInfo.questionsCompleted.push({
    questionNumber: questionObj.questionNumber,
    correctness: correct_bool
  });

  // Update other properties
  quizInfo.quizCode = quizCode;
  quizInfo.quizName = quizName;
  quizInfo.numberOfQuestions = numberOfQuestions;

  localStorage.setItem('quizInfo', JSON.stringify(quizInfo));
  
  logStorageContents("1");
}


  
  // Call the saveQuizInfo function to save the data
  saveQuizInfo( quizInfo);
  
  // Show the explanation
  showExplanation(questionObj.explanation);
    logStorageContents("2");

}



// Function to show the explanation for the current question
function showExplanation(explanation) {
  document.getElementById("explanation").innerHTML = explanation;
  disableAnswerButtons();
  document.getElementById("next-btn").classList.remove("d-none");
}

// Function to disable answer buttons after user answers
function disableAnswerButtons() {
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].removeEventListener("click", checkAnswer);
    answerButtons[i].classList.add("disabled");
  }
}

// Function to enable answer buttons for next question
function enableAnswerButtons() {
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", checkAnswer);
    answerButtons[i].classList.remove("disabled", "correct", "incorrect", "missed" );
  }
   
}


// Function to show the next question
function nextQuestion() {

  currentQuestion++;
console.log(totalQuestions+"   ????????????totalQuestions????"); // Output: 3
console.log(currentQuestion+"   ????????????currentQuestion????"); // Output: 3
  
  if (currentQuestion < totalQuestions) {
     enableAnswerButtons();
    showQuestion();

    if(document.getElementById("next-btn")){
    document.getElementById("next-btn").classList.add("d-none");
    }
  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
   updateQuestionNumber();

}

function skipQuestion() {

  currentQuestion++;

  if (currentQuestion < totalQuestions) {
     enableAnswerButtons();
    showQuestion();
        if(document.getElementById("next-btn")){
    document.getElementById("next-btn").classList.add("d-none");
        }
  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
   updateQuestionNumber();

}






// Update the question number display
function updateQuestionNumber() {
  const questionNumberDisplay = document.getElementById("question-number");
  const currentQuestionNumber = currentQuestion;
  questionNumberDisplay.innerHTML = `Question ${currentQuestionNumber}/${totalQuestions}`;
}
    // update the progress bar
  updateProgressBar(currentQuestion);
//    console.log(currentQuestion+"????????????currentQuestion????"); // Output: 3

// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  quizStarted = false;
  if (document.getElementById("timer").innerHTML) {
    document.getElementById("timer").innerHTML = "";
  }
  
  const feedback = calculateFeedback();
  document.getElementById("feedback").innerHTML = feedback;
  
  const percentageScore = Math.round((questionCorrect / totalQuestions) * 100);
  const resultMsg = `You scored ${questionCorrect}/${totalQuestions} (${percentageScore}%)`;
  document.getElementById("score").innerHTML = resultMsg;
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");
  
  // Show pie chart for correct and incorrect answers
  showPieChart();
  
  // Unhide the message board
  document.getElementById("MessageBoard").classList.remove("d-none");
}





// Function to show the pie chart of correct and incorrect answers
function showPieChart() {
  const correctAnswers = questionCorrect;
  const incorrectAnswers = totalQuestions - questionCorrect;

  // Create a div for the pie chart
  const chartContainer = document.createElement('div');
  chartContainer.id = 'pie-chart';

  // Set the inner HTML of the chart container
  chartContainer.innerHTML = `
    <h3>Question Results</h3>
    <div class="chart">
      <div class="slice correct" style="--slice-value: ${correctAnswers}"></div>
      <div class="slice incorrect" style="--slice-value: ${incorrectAnswers}"></div>
    </div>
    <div class="legend">
      <div class="legend-item">
        <span class="legend-color correct"></span>
        <span class="legend-label">Correct: ${correctAnswers}</span>
      </div>
      <div class="legend-item">
        <span class="legend-color incorrect"></span>
        <span class="legend-label">Incorrect: ${incorrectAnswers}</span>
      </div>
    </div>
  `;

  // Append the chart container to the quiz container
  const quizContainer = document.getElementById('score');
  quizContainer.appendChild(chartContainer);
}


// Function to calculate the feedback for the quiz taker
function calculateFeedback() {
  let feedback = "";

  if (questionCorrect === totalQuestions) {
    feedback = "Great job! You got all the questions right!";
  } else if (questionCorrect > totalQuestions / 2) {
    feedback = "Good job! You did well, but there is room for improvement.";
  } else {
    feedback = "Keep practicing. You'll get there!";
  }
  return feedback;
}

// Function to start the timer
function startTimer() {
      

        if (timerEnabled == true) {
            clearInterval(timer);
  timer = setInterval(function() {
    const timerEl = document.getElementById("timer");
      if (totalTime < 5) {
    timerEl.style.color = "red";
  } else {
    timerEl.style.color = "black";
  }

        let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timerEl.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (totalTime <= 0) {
          if (countdownPerQuestion == true && timerEnabled == true) { // start timer only if countdown is per question and timer is enabled
     totalTime = questionTime;
    skipQuestion();
  }else{
   
      endQuiz();
  }
    }
        totalTime--;
  }, 1000);

        }
}


function saveQuizCode(quizCode) {
  try {
    localStorage.setItem('savedQuizCode', quizCode);
    console.log('Quiz code saved successfully.');
  } catch (error) {
    console.error('Error saving quiz code:', error);
  }
}

function retrieveQuizCode() {
  try {
    const savedQuizCode = localStorage.getItem('savedQuizCode');
    if (savedQuizCode !== null) {
      console.log('Quiz code retrieved successfully:', savedQuizCode);
      return savedQuizCode;
    } else {
      console.log('No saved quiz code found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving quiz code:', error);
    return null;
  }
}

function retrieveQuizInfo() {
  try {
    const savedQuizInfo = localStorage.getItem('quizInfo');
    if (savedQuizInfo !== null) {
      const quizInfo = JSON.parse(savedQuizInfo);
      console.log('Quiz info retrieved successfully:', quizInfo);
      return quizInfo;
    } else {
      console.log('No saved quiz info found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving quiz info:', error);
    return null;
  }
}





// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("retake-btn").addEventListener("click", () => {
location.reload();
});
