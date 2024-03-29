// Declaração de variáveis
const answersBox = document.querySelector('#answers-box');
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
        question: 'PHP foi desenvolvido para qual fim?',
        answers: [
            {
                answer: 'back-end',
                correct: true,
            },
            {
                answer: 'front-end',
                correct: false,
            },
            {
                answer: 'Sistema operacional',
                correct: false,
            },
            {
                answer: 'Banco de dados',
                correct: false,
            }
        ]
    },
    {
        question: 'Uma forma de declarar variável em JavaScript:',
        answers: [
            {
                answer: '$var',
                correct: false,
            },
            {
                answer: 'var',
                correct: true,
            },
            {
                answer: '@var',
                correct: false,
            },
            {
                answer: '#let',
                correct: false,
            }
        ]
    },
    {
        question: 'Qual o seletor de id no CSS?',
        answers: [
            {
                answer: '#',
                correct: true,
            },
            {
                answer: '.',
                correct: false,
            },
            {
                answer: '@',
                correct: false,
            },
            {
                answer: '/',
                correct: false,
            }
        ]
    }
];

// Substituição do quizz para a primeira pergunta
function init() {
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    // Limpa a questão anterior
    const oldButtons = answersBox.querySelectorAll('button');

    oldButtons.forEach((btn) => {
        btn.remove();
    });

    // Altera o texto da pergunta
    const question = document.querySelector('#question');
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    const letters = ['a', 'b', 'c', 'd'];

    // Insere as alternativas
    questions[i].answers.forEach((answer, i) => {
        // Cria o template do botão do Quizz
        const answerTemplate = document
            .querySelector('.answer-template')
            .cloneNode(true);

        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute('correct-answer', answer['correct']);

        // Remove hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // Insere a alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Insere um evento de click no botão
        answerTemplate.addEventListener('click', function () {
            checkAnswer(this);
        });
    });

    // Incrementa o número da questão
    actualQuestion++;
}

// Verifica resposta do usuário
function checkAnswer(btn) {
    // Seleciona todos os botões
    const buttons = answersBox.querySelectorAll('button');

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach((button) => {
        if (button.getAttribute('correct-answer') === 'true') {
            button.classList.add('correct-answer');

            // Verifica se o usuário acertou a pergunta
            if (btn == button) {
                points++;
            }
        } else {
            button.classList.add('wrong-answer');
        }
    });

    // Exibe a próxima pergunta
    nextQuestion();
}

// Exibe a próxima pergunta no Quizz
function nextQuestion() {
    // Timer para usuário ver as respostas
    setTimeout(() => {
        // Verifica se ainda há preguntas
        if (actualQuestion >= questions.length) {
            // Exibe a mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 1500);
}

// Exibe a tela final
function showSuccessMessage() {
    toggleQuizz();

    // Troca dados da tela de sucesso

    // Calcula o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    // Altera o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // Altera o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o score
function toggleQuizz() {
    const quizzContainer = document.querySelector('#quizz-container');
    const scoreContainer = document.querySelector('#score-container');
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// Reiniciar Quizz
document.querySelector('#restart').addEventListener('click', () => {
    // Zera o jogo
    actualQuestion = 0;
    points = 0;
    toggleQuizz();
    init();
});

// Inicialização do Quizz
init();
