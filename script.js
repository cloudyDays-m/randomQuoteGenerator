let quotes = {};
let currentQuoteIndex = 0;

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteButton');
const quoteContainer = document.querySelector('.quote-container');

// loading the quotes from jsom file 
async function loadQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotesData = await response.json();
        console.log("quotes loaded successfully");

    } catch(error) {
        console.error('error in loading quotes: ', error);
        //fall back quotes incase the json file fails to load properly
        quotesData = {
            "quotes": [
                {
                     "quote":"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.","author":"Henry Ford",

                }, 
                { 
                    "quote":"It’s not the years in your life that count. It’s the life in your years.","author":"Abraham Lincoln"
                }
            ]
        };
    }
}

// a function to get a random quote to display
function getRandomQuote() {
    let newIndex; 
    do {
        newIndex = Math.floor(Math.random()*quotesData.quotes.length);

    } while (newIndex === currentQuoteIndex && quotesData.quotes.length > 1);

    currentQuoteIndex = newIndex;
    return quotesData.quotes[currentQuoteIndex];
}

// updating a quote with an fade in animation 

function updateQuote() {
    quoteContainer.classList.add('loading');
    newQuoteBtn.disabled = true;
    quoteText.classList.add('fade-out');
    quoteAuthor.classList.add('fade-out');

    setTimeout(() => {
        const newQuote = getRandomQuote();
        
        quoteText.textContent = newQuote.quote;
        quoteAuthor.textContent = newQuote.author;

        quoteText.classList.remove('fade-out');
        quoteAuthor.classList.remove('fade-out');
        quoteText.classList.add('fade-in');
        quoteAuthor.classList.add('fade-in');

        setTimeout(() => {
            quoteContainer.classList.remove('loading');
            newQuoteBtn.disabled = false;
            
            quoteText.classList.remove('fade-in');
            quoteAuthor.classList.remove('fade-in');
        }, 100);


    }, 300);
    
}

function insertText() { 
    quoteText.value()
}

newQuoteBtn.addEventListener('click', updateQuote);
document.addEventListener('DOMContentLoaded', loadQuotes);
