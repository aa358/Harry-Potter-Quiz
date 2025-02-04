fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');

    let currentQuestion = 0;
    let score = 0;

    // Function to display questions
    function showQuestion() {
      const question = data[currentQuestion];
      quizContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="options">
          ${question.options.map(option => `
            <label>
              <input type="radio" name="option" value="${option}">
              ${option}
            </label>
          `).join('')}
        </div>
      `;

      // Add event listeners to the options
      const options = document.querySelectorAll('input[name="option"]');
      options.forEach(option => {
        option.addEventListener('click', checkAnswer);
      });
    }

    // Function to check the answer
    function checkAnswer() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
        if (selectedOption.value === data[currentQuestion].answer) {
          score++;
        }
        currentQuestion++;
        if (currentQuestion < data.length) {
          showQuestion();
        } else {
          showResults();
        }
      }
    }

    // Function to display results
    function showResults() {
      quizContainer.innerHTML = '';
      let message = '';

      if (score <= 6) {
        message = "Better luck next time!";
      } else if (score >= 7 && score <= 9) {
        message = "Look out for your Hogwarts letter in the mail!";
      } else if (score === 10) {
        message = "Hermione, is that you?";
      }

      resultsContainer.innerHTML = `
        <p>Your score: ${score} out of ${data.length}</p>
        <p>${message}</p>
        <button id="restart">Retake Quiz</button>
      `;

      // Add event listener to restart the quiz
      document.getElementById('restart').addEventListener('click', restartQuiz);
    }

    // Function to restart the quiz
    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      resultsContainer.innerHTML = '';
      showQuestion();
    }

    // Start the quiz
    showQuestion();
  })
  .catch(error => console.error('Error loading questions:', error));
