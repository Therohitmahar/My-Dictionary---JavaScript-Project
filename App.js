let sections = [
  {
    title: "Title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quia qui, architecto dolorem nostrum commodi quam iste! Mollitia, necessitatibus maxime.",
  },
  {
    title: "Title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quia qui, architecto dolorem nostrum commodi quam iste! Mollitia, necessitatibus maxime.",
  },
  {
    title: "Title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quia qui, architecto dolorem nostrum commodi quam iste! Mollitia, necessitatibus maxime.",
  },
];
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
let input = document.getElementById("input");
function searchWord() {
  let inputWord = input.value;

  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      // add the new word to the sections array
      sections.unshift({
        title: inputWord,
        text: data[0].meanings[0].definitions[0].definition,
      });

      result.innerHTML = `<div class="word">
          <h3>${inputWord}</h3>
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

      if (`${data[0].phonetics[0].audio}`.includes("https")) {
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      } else if (`${data[0].phonetics[1].audio}`.includes("https")) {
        sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
      } else if (`${data[0].phonetics[2].audio}`.includes("https")) {
        sound.setAttribute("src", `${data[0].phonetics[2].audio}`);
      } else {
        alert("don't have audio");
      }
    })
    .then(() => {
      console.log("hearing");
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error"> Couldn't Find The Word '${inputWord}'</h3>`;
    });
}

btn.addEventListener("click", searchWord);
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    searchWord();
  }
});

function playSound() {
  sound.play();
}

let history_page = document.getElementById("history-page");
let BigContainer = document.createElement("div");
BigContainer.id = "bigcontainer";
document.getElementById("history-btn").addEventListener("click", () => {
  history_page.style.display = "block";
  history_page.appendChild(BigContainer);
});

let close = document.getElementById("cross");
close.addEventListener("click", () => {
  history_page.style.display = "none";
});

function updateHistory() {
  BigContainer.innerHTML = "";
  sections.forEach((word, index) => {
    container = document.createElement("div");
    let heading = document.createElement("h1");
    let disc = document.createElement("p");
    container.classList.add("history-container", `container${index + 1}`);

    heading.innerHTML = word.title;
    disc.innerHTML = word.text;
    container.appendChild(heading);
    container.appendChild(disc);

    BigContainer.appendChild(container);
  });
}
updateHistory();
