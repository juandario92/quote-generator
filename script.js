let apiQuotes = [];

// SHOW NEW QUOTES
function newQuote(){
    // PICK A RANDOM QUOTE FROM apiQuote ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
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

//On Load
getQuotes();