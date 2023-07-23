let topThree;
const myArray = [
    { title: "Title", meaning: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quiaqui, architecto dolorem nostrum commodiste!ollitia necessitatibus maxime" },
    { title: "Title", meaning: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quiaqui, architecto dolorem nostrum commodiste!ollitia necessitatibus maxime" },
    { title: "Title", meaning: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quiaqui, architecto dolorem nostrum commodiste!ollitia necessitatibus maxime" },
];
const previousData = localStorage.getItem("history");
if (previousData == null) {
    const arrayString = JSON.stringify(myArray);
    localStorage.setItem("history", arrayString);
}

const existingArrayString = localStorage.getItem("history");
const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
const modeBtn = document.getElementById("mode")

function deleteHistory(title) {
    const deleteMe = topThree.filter(item => item.title !== title);
    localStorage.setItem("history", JSON.stringify(deleteMe));
    console.log(deleteMe);
    Settinghistory();
}
function setToLocalStorage(title, meaning) {
    const newWord = { title: title, meaning: meaning };
    existingArray.push(newWord);

    localStorage.setItem("history", JSON.stringify(existingArray.slice(-3, existingArray.length)));
    Settinghistory();
}
function Settinghistory() {
    const before = document.querySelector('.before');
    const historyData = localStorage.getItem("history");
    topThree = JSON.parse(historyData);

    before.innerHTML = (topThree.reverse().map((item) => (`<div class="container-tab">
        <div><h1>${item.title}</h1><p><i onclick="deleteHistory('${item.title}')" class="fa-solid fa-trash-can"></i></p></div>
        <p>${item.meaning}
        </p>        
    </div>`))
    )
}

Settinghistory();

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
let input = document.getElementById('input');
function searchWord() {
    let inputWord = input.value;

    fetch(`${url}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            result.innerHTML = `<div class="word">
        <h3>${data[0].word}</h3>
        <button onClick="playSound()"><img src="img/volume-up-interface-symbol.png"></button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech} </p>
        <p>/${data[0].phonetic} /</p>
    </div>
    <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
       ${data[0].meanings[0].definitions[0].example || ""}
    </p>`;

            setToLocalStorage(data[0].word, data[0].meanings[0].definitions[0].definition);
            input.value = ""

            if (`${data[0].phonetics[0].audio}`.includes("https")) {
                sound.setAttribute("src", `${data[0].phonetics[0].audio}`);

            }
            else if (`${data[0].phonetics[1].audio}`.includes("https")) {
                sound.setAttribute("src", `${data[0].phonetics[1].audio}`);

            }
            else if (`${data[0].phonetics[2].audio}`.includes("https")) {
                sound.setAttribute("src", `${data[0].phonetics[2].audio}`);

            }
            else {
                console.log("don't have audio")
            }

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error" >Couldn't Find The Word '${inputWord}'</h3>`
        })
}
btn.addEventListener('click', searchWord);
input.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        searchWord();
    }
});

function playSound() {
    sound.play();
}
function crossing() {
    aside.style.display = "none";
}

const aside = document.querySelector('aside');
const beforePage = document.querySelector('.before')
let historyBtn = document.getElementById("history-btn")
historyBtn.addEventListener('click', () => {
    aside.style.display = "block";
});


modeBtn.onclick = () => {

    document.body.classList.toggle("dark")
    if (document.body.classList.contains("dark")) {
        modeBtn.innerText = "Switch to Light"
    }
    else {
        modeBtn.innerText = "Switch To Dark"
    }
}