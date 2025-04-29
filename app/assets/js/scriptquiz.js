const questions = [
    {
      question: "Qual linguagem é usada para estilizar páginas web?",
      answers: [
        { text: "HTML", correct: false },
        { text: "JavaScript", correct: false },
        { text: "CSS", correct: true },
        { text: "Python", correct: false }
      ]
    },
    {
      question: "O que significa a sigla CPU?",
      answers: [
        { text: "Central Performance Unit", correct: false },
        { text: "Central Processing Unit", correct: true },
        { text: "Computer Personal Unit", correct: false },
        { text: "Central Programming Unit", correct: false }
      ]
    },
    {
      question: "Qual dessas é uma linguagem de programação?",
      answers: [
        { text: "Windows", correct: false },
        { text: "Linux", correct: false },
        { text: "Python", correct: true },
        { text: "Chrome", correct: false }
      ]
    },
    {
      question: "Qual empresa criou o sistema operacional Android?",
      answers: [
        { text: "Apple", correct: false },
        { text: "Google", correct: true },
        { text: "Microsoft", correct: false },
        { text: "Samsung", correct: false }
      ]
    },
    {
      question: "O que é um 'bug' em programação?",
      answers: [
        { text: "Um vírus de computador", correct: false },
        { text: "Erro no código", correct: true },
        { text: "Atualização de sistema", correct: false },
        { text: "Aplicativo novo", correct: false }
      ]
    },
    {
      question: "Qual dessas linguagens é usada principalmente para análise de dados?",
      answers: [
        { text: "C#", correct: false },
        { text: "Ruby", correct: false },
        { text: "Python", correct: true },
        { text: "PHP", correct: false }
      ]
    }
  ];
  
  const questionElement = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const scoreElement = document.getElementById('score');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    scoreElement.innerHTML = "";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerText = "Quiz finalizado!";
    scoreElement.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    nextButton.innerText = "Jogar novamente";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();