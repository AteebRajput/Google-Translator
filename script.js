// ============================================================
//              ALL DOM ELEMENTS
// ============================================================

const srcLang = document.getElementById("source-language")
const trgtLang =  document.getElementById("target-language")
const srcText = document.getElementById("source-lang-text")
const trgtText = document.getElementById("target-lang-text")
const swap = document.getElementById("swap")
const copyToClipboard = document.getElementById("copy-to-clipboard")
// ============================================================
//              ALL REQUIRED VARIABLES
// ============================================================

let sourceLanguage = "en"
let targetLanguage = "ur"
let sourceText = null;
let targetText = null;
const delayTime = 3000;
let timer;


// ============================================================
//              ALL FUNCTIONS
// ============================================================

// 1- function to add delay in API call

const addDelayInApiCall = async () => {
    if (sourceText === "") {
        trgtText.value = ""
    }
    clearTimeout(timer)
    timer = await setTimeout(async () => {
        translate()
    }, delayTime)
}
// 2- Function to translate source into target language

const translate = async () => {
    if (sourceText === "") {
        trgtText.value = ""
    }

    const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=${sourceLanguage}&to=${targetLanguage}&query=${sourceText}`;
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'd237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa',
            'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            translate: 'rapidapi'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.translation);
        trgtText.value = result.translation
    } catch (error) {
        console.error(error);
    }
}
// ============================================================
//              ALL EVENT LISTENERS
// ============================================================

// 1- Event Listener to get Source Language
srcLang.addEventListener("change", (e) => {
    sourceLanguage = e.target.value
    srcText.value = ''
    trgtText.value = ''
})

// 2- Event Listener to get target Language
trgtLang.addEventListener("change", (e) => {
    targetLanguage = e.target.value
    translate()
})

// 3- Event Listener to get Source Text

srcText.addEventListener("input", (e) => {
    sourceText = e.target.value.trim();
    if (sourceText === "") {
        trgtText.value = ``
    }
    addDelayInApiCall()
})

// 4- Event Listener to get Target Text

trgtText.addEventListener("input", (e) => {
    targetText = e.target.value
})

// 5. Event Listener For Swap button
swap.addEventListener("click", () => {
    [sourceLanguage, targetLanguage] = [targetLanguage, sourceLanguage];
    [srcLang.value, trgtLang.value] = [trgtLang.value, srcLang.value];
    let tempText = srcText.value
    srcText.value = trgtText.value;
    trgtText.value = tempText;
})

// 6. Event Listener For Copy to Clipboard button
copyToClipboard.addEventListener("click", () => {
    navigator.clipboard.writeText(trgtText.value)
        .then(() => {
            console.log('Text copied to clipboard')
        })
})

// ============================================================
//              INIT
// ============================================================
