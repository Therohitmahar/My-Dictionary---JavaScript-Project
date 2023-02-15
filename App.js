
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn =document.getElementById('search-btn');

function searchWord(){
    let inputWord = document.getElementById('input').value;

    fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data)=> {
        console.log(data);
        result.innerHTML = `<div class="word">
        <h3>${inputWord}</h3>
        <button onClick="playSound()"><img src="img/volume-up-interface-symbol.png"</button>
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
    sound.setAttribute("src",`${data[0].phonetics[0].audio}`);
    
        
    
})
.catch(()=>{
        result.innerHTML= `<h3 class="error" >Coudn't Find The Word '${inputWord}'</h3>`
    })
}
btn.addEventListener('click', searchWord);

function playSound(){
    sound.play();
}