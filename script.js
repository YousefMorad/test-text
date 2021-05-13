var wordsDict = {};
var wordsList = [];
function formatWords (){
    var userText = document.getElementById('userText').value
    var wordsBox = document.getElementById('wordsBox')
    wordsBox.innerHTML = ""
    wordsDict = {}
    wordsList = userText.split(" ")
    for (var word of wordsList){
        wordsDict[word] = 0;
        wordsBox.innerHTML += "<button type=\"button\" class=\"btn wordbtn\" onclick=\"selectWord(this)\">" + word + "</button>"
    }
    wordsBox.style.display = "flex"
    document.getElementById('control-btns').style.display = "block"
}

function selectWord(btn){
    btns = document.querySelectorAll('.wordbtn')
    if(btn.classList.contains("btn-danger")){
        wordsDict[btn.innerHTML] = 0;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                button.classList.remove("btn-danger")
            }
        }
    }else{
        wordsDict[btn.innerHTML] = 1;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                button.classList.add("btn-danger")
            }
        }
    }
}

function convertText(){
    var newText = document.getElementById('newText')
    var newWords = []

    for(var word of wordsList){
        if (wordsDict[word]){
            newWords.push(flip(word));
        }else{
            newWords.push(word);
        }
    }

    newText.innerHTML = newWords.join(' ')
    newText.style.display = "flex"
}

function flip(word){
    var newWord = ""
    for(var i = 0; i< word.length; i++){
        newWord += word[i] + '\u0360'
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