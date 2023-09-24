let rightAns,
    rightNumber = 0,
    falseNumber = 0;

document.addEventListener('DOMContentLoaded', function () {
    addQuestion();

    eventListeners();
});

eventListeners = () => {
    document.querySelector('#check').addEventListener('click', validateAnswer);

}
addQuestion = () => {
    const url = 'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple';
    fetch(url)
        .then(data => data.json())
        .then(result => showQuestion(result.results));
}

showQuestion = questions => {

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        rightAns = question.correct_answer;

        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAns);

        questionHTML.innerHTML = `<div class="row justify-content-between heading">
        <p class="category">Category:${question.category}</p>
        <div class="scores">
        <span class="badge badge-dark">${rightNumber}</span>
        <span class="badge badge-danger">${falseNumber}</span>
        </div>
        <div>
        <h2 class="text-center">${question.question};`

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-5');
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12', 'col-md-5');
            answerHTML.textContent = answer;

            answerHTML.onclick = selectAnswer;




            answerDiv.appendChild(answerHTML);
        })
        questionHTML.appendChild(answerDiv); /*Main wrapper */

        document.querySelector('#app').appendChild(questionHTML);
    })
}
selectAnswer = (e) => {
    if (document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    }

    e.target.classList.add('active');
}
validateAnswer = () => {
    if (document.querySelector('.questions .active')) {

        verifyAnswer();

    } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = "Please select Answer";
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 2000);

    }
}
verifyAnswer = () => {
    const userAnswer = document.querySelector('.questions .active');
    if (userAnswer.textContent === rightAns) {
        rightNumber++;
        alert("your answer is correct")
    } else {
        falseNumber++;
        alert("your answer is false")
    }

    const app = document.querySelector('#app');
    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
    addQuestion();
}