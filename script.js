const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// SHOW LOADING

function loading() {
    loader.hidden = false; // Al definirlo en "false" damos la orden de que se muestre el elemento, ya que estamos modificando la propiedad "hidden"
    quoteContainer.hidden = true; // Al definirlo en "true" damos la orden de que se oculte el div de citas al llamar al loading
}

//HIDE LOADING
function loadingComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// SHOW NEW QUOTES
function newQuote(){
    loading();
    // PICK A RANDOM QUOTE FROM apiQuote ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // CHECK IF AUTHOR IS EMPTY, REPLACE FOR 'UNKNOW';
    if(!quote.author){
        authorText.textContent = "Unknow";
    } else {
        authorText.textContent = quote.author;
    }

    // CHECK QUOTE LENGTH TO DETERMINE STYLING
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // SET QUOTE, REMOVE LOADER
    quoteText.textContent = quote.text;
    loadingComplete();
}

// GET QUOTES FROM API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){

    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);


//On Load
getQuotes();
