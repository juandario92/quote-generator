const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes = [];

// SHOW NEW QUOTES
function newQuote(){
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
    quoteText.textContent = quote.text;
}

// GET QUOTES FROM API
async function getQuotes() {
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