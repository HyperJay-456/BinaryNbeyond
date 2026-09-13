document.addEventListener("DOMContentLoaded", () => {
  // Main calculation section buttons
  const calculateBtn = document.querySelector('[data-action="calculate"]');
  const clearInputsBtn = document.querySelector('[data-action="clear-inputs"]');

  if (calculateBtn) {
    calculateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof performArithmetic === "function") {
        performArithmetic();
      }
    });
  }

  if (clearInputsBtn) {
    clearInputsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("num1").value = "";
      document.getElementById("num2").value = "";
      document.getElementById("arithResult").innerText = "";
      document.getElementById("arithSteps").innerHTML = "";
      document.getElementById("arithError").innerText = "";
    });
  }

  // Swap operands button
  const swapBtn = document.querySelector('[data-action="swap-operands"]');
  if (swapBtn) {
    swapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const n1 = document.getElementById("num1");
      const n2 = document.getElementById("num2");
      if (n1 && n2) {
        const temp = n1.value;
        n1.value = n2.value;
        n2.value = temp;
        if (n1.value || n2.value) {
          if (typeof performArithmetic === "function") performArithmetic();
        }
      }
    });
  }

  // Quick preset buttons
  document.querySelectorAll('[data-arith-preset]').forEach(btn => {
    btn.addEventListener("click", () => {
      const preset = btn.getAttribute('data-arith-preset');
      const sys = document.getElementById("numberSystem");
      const op = document.getElementById("operation");
      const n1 = document.getElementById("num1");
      const n2 = document.getElementById("num2");
      if (preset === 'bin-sub') {
        sys.value = 'binary'; op.value = 'sub'; n1.value = '1010'; n2.value = '0011';
      } else if (preset === 'bin-neg') {
        sys.value = 'binary'; op.value = 'sub'; n1.value = '11'; n2.value = '101';
      } else if (preset === 'bin-add') {
        sys.value = 'binary'; op.value = 'add'; n1.value = '1011'; n2.value = '0110';
      } else if (preset === 'dec-div') {
        sys.value = 'decimal'; op.value = 'div'; n1.value = '14'; n2.value = '4';
      }
      if (typeof performArithmetic === "function") performArithmetic();
    });
  });

  // Allow Enter key to calculate
  const numberInputs = document.querySelectorAll('#num1, #num2');
  numberInputs.forEach(input => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof performArithmetic === "function") {
          performArithmetic();
        }
      }
    });
  });

  // Practice mode buttons
  const newQuestionBtn = document.querySelector('[data-action="new-question"]');
  const checkAnswerBtn = document.querySelector('[data-action="check-answer"]');
  const showStepsBtn = document.querySelector('[data-action="show-steps"]');

  if (newQuestionBtn) {
    newQuestionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof generateArithmeticPractice === "function") {
        generateArithmeticPractice();
      }
    });
  }

  if (checkAnswerBtn) {
    checkAnswerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof checkArithmeticPractice === "function") {
        checkArithmeticPractice();
      }
    });
  }

  if (showStepsBtn) {
    showStepsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof showArithmeticPracticeSteps === "function") {
        showArithmeticPracticeSteps();
      }
    });
  }

  // Allow Enter key in practice answer to check
  const practiceAnswerInput = document.getElementById("arithPracticeAnswer");
  if (practiceAnswerInput) {
    practiceAnswerInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof checkArithmeticPractice === "function") {
          checkArithmeticPractice();
        }
      }
    });
  }
});
