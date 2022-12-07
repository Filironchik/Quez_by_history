const inputs = {
    titleQuez: getId("titleQuez"),
    title: getId("title"),
    Q1: getId("Q1"),
    Q2: getId("Q2"),
    Q3: getId("Q3"),
    Q4: getId("Q4"),
    add: getId("Add"),
    dwn: getId("Dowanlowd")
}

inputs.add.addEventListener("click", add())

function getId(id) {
    return document.getElementById(id)
}

const quez = (title) => {
    this.id = "Id_" + new Date()
    this.title = title
    this.answers = answers
}



let _number = 0

const qvest = (number, title, answers) => {
    this.number = number;
    this.title = title;
    this.answers = answers;
}

function add() {
    let answers = [
        inputs.Q1.value,
        inputs.Q2.value,
        inputs.Q3.value,
        inputs.Q4.value,
    ]
    answers.push(qvest(_number, inputs.title.value, answers))
    _number++

    let q = new quez(inputs.titleQuez.value, answers)
    inputs.dwn.download = JSON.stringify(q)

}