var wordsDict = {};
var wordsList = [];
function formatWords (){
    var userText = document.getElementById('userText').value
    var wordsBox = document.getElementById('wordsBox')
    const word_choice_container = document.getElementById('word-choice-container');
    wordsBox.innerHTML = ""
    wordsDict = {}
    wordsList = userText.split(" ")
    for (var word of wordsList){
        wordsDict[word] = 0;
        wordsBox.innerHTML += "<button type=\"button\" class=\"btn wordbtn\" id=\"word-btn\" onclick=\"selectWord(this)\">" + word + "</button>"
    }

    word_choice_container.style.display = "grid"
    document.getElementById('control-btns').style.display = "block"
}

function selectWord(btn){
    btns = document.querySelectorAll('.wordbtn')
    if(btn.classList.contains("word-btn-red")){
        wordsDict[btn.innerHTML] = 0;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                button.classList.remove("word-btn-red")
            }
        }
    }else{
        wordsDict[btn.innerHTML] = 1;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                button.classList.add("word-btn-red")
            }
        }
    }
}

function convertText(){
    var newTextBox = document.getElementById('newTextBox')
    var codes = ['\u0360', '\u06C1', '\u064D', '\u0332', '\u0300']

    newTextBox.innerHTML = ""
    for (var code of codes){
        var newWords = []
        for(var word of wordsList){
            if (wordsDict[word]){
                newWords.push(flip(word, code));
            }else{
                newWords.push(word);
            }
        }

        newTextBox.innerHTML += "<h5 style=\"background-color: cadetblue; margin-top: 0.5em; padding:5px; display:flex; flex-direction:row-reverse;\">" + newWords.join(" ") + "</h5>"
    }
}

function flip(word, code){
    var newWord = ""
    for(var i = 0; i< word.length; i++){
        newWord += word[i] + code
    }
    return newWord;
}

function clearSelection(){
    var btns = document.querySelectorAll('.wordbtn')
    
    for(var btn of btns){
        btn.classList.remove("btn-danger")
        wordsDict[btn.innerHTML] = 0;
    }
}

function selectKeywords(){
    var btns = document.querySelectorAll('.wordbtn')
    
    for(var btn of btns){
        if(keywords.includes(btn.innerHTML)){
            btn.classList.add("btn-danger")
            wordsDict[btn.innerHTML] = 1;
        }
    }
}

const viewResult = (result) => {
    document.getElementById('view-box').innerHTML = result;
};