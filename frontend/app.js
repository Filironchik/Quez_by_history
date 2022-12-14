function GetDataFromServer(id) {
    const apiurl = "http://localhost:3000/test/" + id;
    fetch(apiurl).then(
        response => {
            return response.json()
        }
    )
        .then(data => {
            startQuiz(data);
        })
        .catch(error => {
            console.log(error);
        });
}

function ectAnswers(element, answers) {
    const apiurl = "http://localhost:3000/test/" + element.id;
    fetch(apiurl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(answers),
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache"
    }).then(
        response => {
            return response.json();
        }
    )
        .then(Answers => {
            finishQuiz(element, Answers)
            console.log(Answers);
        })
        .catch(error => {
            console.log(error);
        });
}

function addEventsBtnThemes() {
    const btns = {
        theme1: document.getElementById("themes_0"),
        theme2: document.getElementById("themes_1"),
        theme3: document.getElementById("themes_2"),
        theme4: document.getElementById("themes_3"),
        theme5: document.getElementById("themes_4"),
        themeMu: document.getElementById("themes_mu"),
    }
    btns.theme1.addEventListener("click", () => GetDataFromServer("id12313120"))
    btns.theme2.addEventListener("click", () => GetDataFromServer("id12313121"))
    btns.theme3.addEventListener("click", () => GetDataFromServer("id12313122"))
    btns.theme4.addEventListener("click", () => GetDataFromServer("id12313123"))
    btns.theme5.addEventListener("click", () => GetDataFromServer("id12313124"))
    btns.themeMu.addEventListener("click", () => alert("Времено недоступно"))
}
addEventsBtnThemes()

// const btns = ["themes_1", "themes_2", "themes_3", "themes_4", "themes_5", "themes_mu",]

// const idStTh = ["id12313123", "id12313124", "id12313125", "id12313126", "id12313127"]

// function addEventsBtnThemes() {
//     for (i = 0; i < btns.length; i++) {
//         getId(btns[i]).addEventListener("click", () => startQuiz("ID_" + idStTh[i]))
//     }
// }
// addEventsBtnThemes()

const templateQuest = {
    containerQuiz: `<div style="margin-top: 200px; width: 500px;" id="container_quiz">
    <div id="container_answers"></div>
        <input class="btn_answer" type="button" value="Начать тест" id="btn_quest">
</div>`,
    title: `<p class="title_question" id="title_question"><span>{$numberQuestion} вопрос из {$length}:</span><br>{$title}<p>`,
    answer: `<label id="label">
					<input class="input__radio" type="radio" name="answer" value="{$value}">
					<span>{$text}</span>
				</label>`
}
const templateBordResults = `<div class="container_results" id="container_results">
<h1 class="p_resulte title_resulte" id="title">{$title}</h1>
<p class="p_resulte" id="message">{$mesege}</p>
<h2 class="p_resulte" id="result">{$result}</h2>
<input class="btn_resulte" type="button" value="Вернуться назад" id="btn_exit">
</div>`
const templateBordThemes = `
<div class="wrapper" id="block_themes">
			<p class="title">Интересные тесты на разные темы</p>
			<div class="themes">
				<p class="title__themes">Великий Новгород</p>
				<input type="button" value="Выбрать" class="btn_themes" id="themes_0">
			</div>
			<div class="themes">
				<p class="title__themes">Киевская Русь</p>
				<input type="button" value="Выбрать" class="btn_themes" id="themes_1">
			</div>
			<div class="themes">
				<p class="title__themes">Время правления Ивана Грозного</p>
				<input type="button" value="Выбрать" class="btn_themes" id="themes_2">
			</div>
			<div class="themes">
				<p class="title__themes">Владимиро-Суздальское княжество</p>
				<input type="button" value="Выбрать" class="btn_themes" id="themes_3">
			</div>
			<div class="themes">
				<p class="title__themes">Монголо-татарское иго</p>
				<input type="button" value="Выбрать" class="btn_themes" id="themes_4">
			</div>
			<div class="themes">
				<input type="number" placeholder="Другой тест" class="input_themes" id="input">
				<input type="button" value="Выбрать" class="btn_themes" id="themes_mu">
			</div>
		</div>`

const mainContainer = document.getElementById("main_container")

function getId(id) {
    return document.getElementById(id)
}

function startQuiz(element) {

    let answers = []
    let numberQuestion = 0

    getId("block_themes").remove()

    mainContainer.insertAdjacentHTML("afterbegin", templateQuest.containerQuiz)
    getId("btn_quest").addEventListener("click", () => checkResults(showQuestion(element, numberQuestion, answers)))

    renderQuestion(element, numberQuestion)
    function checkResults(result) {
        if (result !== undefined) { answers.push(result); numberQuestion++; console.log(numberQuestion) }
    }

}

function showQuestion(element, numberQuestion, answers) {
    let result = checkAnswer()

    if (result === undefined) {
        return undefined
    } else {
        numberQuestion++
        if (checkQustion(element, numberQuestion, answers, result) == true) {
            return;
        }
        renderQuestion(element, numberQuestion)
        return result
    }
}

function checkQustion(element, numberQuestion, answers, result) {
    if (numberQuestion >= element.questions.length) {
        answers.push(result)
        ectAnswers(element, answers)
        return true;
    }
}

function renderQuestion(element, numberQuestion) {
    if (document.getElementById("btn_quest").value === "Ответить") {
        for (i = 0; i < element.questions[numberQuestion].answers.length; i++) {
            document.querySelector("#label").remove()
        }

        document.getElementById("title_question").remove()
    }

    getId("container_quiz").insertAdjacentHTML("afterbegin", getHTML(element, "title", "", numberQuestion))

    for (let i = 0; i < element.questions[numberQuestion].answers.length; i++) {
        getId("container_answers").insertAdjacentHTML("beforebegin", getHTML(element, "answer", i, numberQuestion))
    }

    if (document.getElementById("btn_quest") !== "Ответить") document.getElementById("btn_quest").value = "Ответить"

}

function checkAnswer() {

    const checkedRadio = document.querySelector('input[type="radio"]:checked')

    if (!checkedRadio) {

        return undefined;
    }

    console.log("int " + parseInt(checkedRadio.value))

    return parseInt(checkedRadio.value)
}

function getHTML(element, type, number, numberQuestion) {
    if (type === "title") {
        return templateQuest.title.replace("{$title}", element.questions[numberQuestion].title).replace("{$numberQuestion}", 1 + numberQuestion).replace("{$length}", element.questions.length)
    } else {
        return templateQuest.answer.replace("{$value}", number).replace("{$text}", element.questions[numberQuestion].answers[number])
    }
}



function finishQuiz(element, Answers) {



    getId("container_quiz").remove()

    let title,
        mesege,
        result

    if (Answers == element.questions.length) {
        title = "Поздравляем!"
        mesege = "Вы ответили верно на все вопросы!"

    } else if ((Answers * 100) / element.questions.length >= 50) {
        title = 'Неплохой результат!';
        mesege = 'Вы дали более половины правильных ответов';
    } else {
        title = 'Стоит подучить материал!';
        mesege = 'Пока у вас меньше половины правильных ответов';
    }
    result = `${Answers}` + " из " + `${element.questions.length}`

    mainContainer.insertAdjacentHTML("afterbegin", templateBordResults.replace("{$title}", title).replace("{$mesege}", mesege).replace("{$result}", result))
    document.getElementById("btn_exit").addEventListener("click", () => exit())

    function exit() {
        getId("container_results").remove()
        mainContainer.insertAdjacentHTML("afterbegin", templateBordThemes)
        addEventsBtnThemes()
    }
}