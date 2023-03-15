
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn =document.getElementById('search-btn');
let input =document.getElementById('input');
function searchWord(){
    let inputWord = input.value;

    fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data)=> {
        console.log(data);
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
    
    if(`${data[0].phonetics[0].audio}`.includes("https")){
        sound.setAttribute("src",`${data[0].phonetics[0].audio}`);
        
    }
    else if(`${data[0].phonetics[1].audio}`.includes("https")){
        sound.setAttribute("src",`${data[0].phonetics[1].audio}`);
        
    }
    else if(`${data[0].phonetics[2].audio}`.includes("https")){
        sound.setAttribute("src",`${data[0].phonetics[2].audio}`);
        
    }
    else{
        console.log("dont have auido")
    }
        
    
})
.catch(()=>{
        result.innerHTML= `<h3 class="error" >Coudn't Find The Word '${inputWord}'</h3>`
    })
}
btn.addEventListener('click', searchWord);
input.addEventListener('keypress', function (event) {
    if(event.keyCode === 13){
        searchWord();
    }
});

function playSound(){
    sound.play();
}
let history_page= document.getElementById('history-page');

document.getElementById('history-btn').addEventListener('click',()=>{
    history_page.style.display="block";
})
document.getElementById('cross').addEventListener('click', ()=>{
    history_page.style.display="none";

})