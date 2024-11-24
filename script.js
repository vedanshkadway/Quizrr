const quizData = [
    {
      question: "A body is projected vertically upwards with an initial velocity of 20 m/s. What is the maximum height reached by the body? (g = 10 m/s²)",
      options: ["10m", " 20m", "30m", " 40m"],
      correct: 2,
    },
    {
      question: "A car accelerates uniformly from rest to a speed of 20 m/s in 10 seconds. What is the acceleration of the car?",
      options: [" 1 m/s²", "2 m/s²", "3 m/s²", "4 m/s²"],
      correct: 1,
    },
    {
      question: "What is the SI unit of power?",
      options: ["Joule (J)", "Watt (W)", "Newton (N)", "Coulomb (C)"],
      correct: 1,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const submitBtn = document.getElementById("submit-btn");
  const resultEl = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    // Clear previous options
    optionsEl.innerHTML = "";
  
    // Render options
    currentQuestion.options.forEach((option, index) => {
      const optionEl = document.createElement("li");
      optionEl.className =
        "bg-gray-100 hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center";
      optionEl.innerHTML = `
        <input type="radio" name="answer" id="option${index}" value="${index}" class="mr-2">
        <label for="option${index}">${option}</label>
      `;
      optionEl.addEventListener("click", () => {
        document.getElementById(`option${index}`).checked = true;
      });
      optionsEl.appendChild(optionEl);
    });
  }
  
  function getSelectedAnswer() {
    const radios = document.querySelectorAll("input[name='answer']");
    for (const radio of radios) {
      if (radio.checked) {
        return parseInt(radio.value);
      }
    }
    return null;
  }
  
  function handleSubmit() {
    const selectedAnswer = getSelectedAnswer();
  
    if (selectedAnswer === null) {
      alert("Please select an answer!");
      return;
    }
  
    // Check if the answer is correct
    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultEl.classList.remove("hidden");
    resultText.textContent = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
  }
  
  // Load the first question
  submitBtn.addEventListener("click", handleSubmit);
  loadQuestion();
  