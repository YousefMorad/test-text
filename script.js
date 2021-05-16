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
    word_choice_container.scrollIntoView()
    document.getElementById('modify-section').style.display = "block"

    if(userText.length == 0){
        word_choice_container.style.display = "none"
        document.getElementById('modify-section').style.display = "none"
        document.getElementById('newTextBox').style.display = "none"
    }
}

function selectWord(btn){
    btns = document.querySelectorAll('.wordbtn')
    if(btn.classList.contains("word-btn-selected")){
        wordsDict[btn.innerHTML] = 0;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                button.classList.remove("word-btn-selected")
            }
        }
    }else{
        wordsDict[btn.innerHTML] = 1;
        for(var button of btns){
            if(button.innerHTML == btn.innerHTML){
                localStorage[btn.innerHTML] = 'true'
                button.classList.add("word-btn-selected")
            }
        }
    }
}

function convertText(){
    var newTextBox = document.getElementById('newTextBox')
    var codes = ['\u0670', '\u06C1', '\u064D', '\u064E', '\u030C', '\u031C']

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

        newTextBox.innerHTML += "<div class=\"decoratedText rtl\" onClick=\"copyDecoration(this)\">" + newWords.join(" ") + "</div>"
    }
    var oldArRes = oldArabic();
    newTextBox.innerHTML += "<div class=\"decoratedText rtl\" onClick=\"copyDecoration(this)\">" + oldArRes.join(" ") + "</div>"
    document.getElementById('newTextBox').style.display = "block"
    document.getElementById('result-section').style.display = "grid";
    document.getElementById('newTextBox').scrollIntoView()

}

function flip(word, code){
    var newWord = ""
    for(var i = 0; i< word.length; i++){
        newWord += word[i] + code
    }
    return newWord;
}

function oldArabic(){
    var newWords = []

    for(var word of wordsList){
        if(wordsDict[word]){
            var newWord = word
            for(var letter of word){
                if (letter in LETTERS_DICT){
                    newWord = newWord.split(letter).join(LETTERS_DICT[letter])
                }
            }
            newWords.push(newWord)
        }else{
            newWords.push(word)
        }
    }

    return newWords
}

function clearSelection(){
    var btns = document.querySelectorAll('.wordbtn')
    
    for(var btn of btns){
        btn.classList.remove("word-btn-selected")
        wordsDict[btn.innerHTML] = 0;
    }
}

function selectKeywords(){
    var btns = document.querySelectorAll('.wordbtn')
    
    for(var btn of btns){
        if(keywords.includes(btn.innerHTML) || localStorage[btn.innerHTML] == 'true'){
            btn.classList.add("word-btn-selected")
            wordsDict[btn.innerHTML] = 1;
        }
    }
}

function copyDecoration(box){
    var range = document.createRange();
    range.selectNode(box);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alertCopyToClipboard();
}

const alertCopyToClipboard = () => {
    const current_alert = $('#alert-text')[0];
    if (current_alert.style.display === 'none') {
        current_alert.style.display = 'grid';
        setTimeout(() => {
            current_alert.style.display = 'none';
        }, 2000);
    }
};