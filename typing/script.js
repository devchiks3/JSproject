const words = [
  "bridge", "castle", "danger", "easter", "fabric", "garden", "hamlet",
  "island", "jungle", "kettle", "lemon", "mango", "napkin", "orange",
  "pencil", "quartz", "rabbit", "silver", "timber", "unique", "velvet",
  "walnut", "xenon", "yellow", "zipper", "almond", "butter", "candle",
  "donkey", "empire", "father", "gentle", "hunter", "insect", "jostle",
  "kitten", "launch", "marble", "needle", "oyster", "planet", "quiver",
  "rocket", "saddle", "throne", "utmost", "valley", "wander", "yonder",
  "zephyr", "artful", "barrel", "corner", "dimple", "entire", "fright",
  "giggle", "harmon", "ignite", "jigsaw", "kennel", "locket", "muffin",
  "noodle", "palace", "riddle", "simple", "tangle", "uplift", "vendor",
  "winter", "happen", "frozen", "struck", "placed", "circle", "finger",
  "listen", "mirror", "nature", "people", "please", "potato", "purple",
  "random", "reason", "return", "rubber", "safety", "sample", "school",
  "screen", "search", "second", "select", "shadow", "single", "sister",
  "spring", "square", "stable", "stream", "string", "strong", "studio",
  "submit", "sunset", "switch", "system", "talent", "target", "ticket"
];


const textContainer=document.getElementById('text-container');
const timerElement=document.getElementById('timer')
const tryAgainButton =document.getElementById('try-again');
const finalScoreElement=document.getElementById('final-score')
let totalTyped ='';
let currentCharIndex = 0;
let errors = 0 ;
let longText = generateLongText()
let timeLeft = 60;
let timerInterval;
let typingStarted = false;

// textContainer.textContent=longText


//shuffle the words array
function shuffleArray(array){
    for(let i = array.length -1; i>0; i--) {
        const j =Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]]
    }
    return array;
}

 //combine shuffle words
 function  generateLongText(){
    const shuffledWords = shuffleArray([...words]);
    return shuffledWords.join(' ');
 }

 // start countdown timer
 function startTimer(){
    if(!typingStarted){
        typingStarted  = true;
        timerInterval = setInterval(() =>{
                timeLeft--
            timerElement.textContent = `Time left: ${timeLeft}s `
            if (timeLeft <= 0) {                                       
                clearInterval(timerInterval)
                endTest()
            }
        }, 1000)
    }
 }

 //end the test and display the final result
 function endTest(){
    timerElement.textContent = `Time's up!`
//    finalScoreElement.textContent = `Final WPN: `
 finalScoreElement.textContent = `Final WPM: ${calculateWPN()}`;  // ✅ score add kiya
    textContainer.style.display='none'
    tryAgainButton.style.display = 'block'
    calculateWPN()
}

//calculate word per min

function calculateWPN(){
    const wordsTyped = totalTyped.trim().split(/\s+/).length
    const baseWPN = Math.round((wordsTyped / 6)* 60)
    const adjustedWPN = Math.max(baseWPN - errors, 0)
    return adjustedWPN
}
 // handle typed over displayed text and scrolling
 document.addEventListener('keydown', (e)=> {
   startTimer()



    if (e.key === 'Backspace') {
        if (totalTyped.length>0){
            currentCharIndex = Math.max(currentCharIndex-1, 0);
            totalTyped=totalTyped.slice(0,-1)
        } 
    }else if(e.key.length===1 && !e.ctrlKey && !e.metaKey){

            totalTyped += e.key     
            currentCharIndex++  
        }
    //console.log('e.key',e.key, 'totalTyped',totalTyped, 'currentCharIndex', currentCharIndex);
    const textArray=longText.split('')
    //console.log(textArray)
    textContainer.innerText='';

    errors = 0;

    for ( let i = 0 ; i< textArray.length;i++) {
        const span = document.createElement('span')

        if(i<totalTyped.length)
            {
                if(totalTyped[i]===textArray[i]){
                    span.classList.add('correct')
                }else{
                     span.classList.add('error')
                     errors++
                }
            }
            span.textContent = textArray[i]
            textContainer.appendChild(span)
    }

    //scroll the container only after 20 characters
    if (totalTyped.length >=20){
        const scrollAmount = (totalTyped.length - 20)* 14
        textContainer.scrollLeft= scrollAmount
    }
 })
 function resetTest() {
    clearInterval(timerInterval)
    timeLeft = 60
    timerElement.textContent = `Time left: ${timeLeft}s `
    finalScoreElement.textContent = ''
    textContainer.style.display ='block'
    tryAgainButton.style.display = 'none'
    totalTyped = ''
    typingStarted = false
    currentCharIndex = 0
    errors = 0
    textContainer.scrollLeft = 0
    longText = generateLongText()
    init()

    
 }
 // initiate the test
 function init(){
    if(isMobileDevice()){
        showMobileMessage()
    }else{
        textContainer.innerText = longText
        timerElement.textContent = `Time left: ${timeLeft}s `
    }
   

 }
 // try again button listner
 tryAgainButton.addEventListener('click', resetTest)

 // detect the device is mobile

 function isMobileDevice(){
    return /Mobi|Andriod/i.test(navigator.userAgent) || window.innerWidth < 800
 }

 // show message for mobile user
 function showMobileMessage(){
    textContainer.textContent = 'This typing test is designed for desktop use only'
 }
 //startup
 init()