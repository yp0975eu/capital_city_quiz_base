let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play_again')
let clearButton = document.querySelector('#clear')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 
let URL = `https://api.worldbank.org/v2/country/${countryCode}?format=json` // world Bank API url

function randomnizedCountry(){
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length)// get random index from the array
    let randomCountry = countriesAndCodes[randomIndex]
    randomCountryElement.innerHTML = randomCountry.name
    let countryCode = randomCountry["alpha-2"]
    URL = `https://api.worldbank.org/v2/country/${countryCode}?format=json` // world Bank API url
}
//console.log(URL) // checking if the url is working
     
// TODO when the page loads, select an element at random from the countriesAndCodes array
window.addEventListener('load', function(){
    // TODO display the country's name in the randomCountryElement 
    randomCountryElement()
    
})

// TODO add a click event handler to the submitButton.  When the user clicks the button,
submitButton.addEventListener("click", function(){    
        quizgame_Handling()// call the quiz game function to handle users answers
})

function quizgame_Handling(){
    //  * read the text from the userAnswerElement 
    let userAnswertext = userAnswerElement.value
    /* Use fetch() to make a call to the World Bank API with the two-letter country code 
    (from countriesAndCodes, example 'CN' or 'AF')*/
    fetch(URL)// 
        .then(response => response.json()) // data is received as JSON string and converted to JSON object and returned
        // work with the JSON object returned from the the first primise
        .then(countries => {
            //extract the capital city from the World Bank API response.
           let capitalCity = countries[1][0].capitalCity
            // * Compare it to the user's answer.
            if (capitalCity.toLowerCase() == userAnswertext) {
                resultTextElement.innerHTML = `CORRECT! The capital city of ${randomCountry.name} is ${userAnswertext}`
            }else{
                resultTextElement.innerHTML = `WRONG! The capital city of ${randomCountry.name} is NOT ${userAnswertext}, it is ${capitalCity}`
            }

        }).catch(err => {
            Console.log(err)//If an error occurs, display an alert message. 
        }) 

}

//
clearButton.addEventListener('click', function() {
    resultTextElement.innerHTML = ''
    userAnswerElement.value = ''
    
})
// TODO finally, connect the play again button. Clear the user's answer, 
playAgainButton.addEventListener('click', function() {
    resultTextElement.innerHTML = ''
    userAnswerElement.value = ''
   let randomIndex = Math.floor(Math.random() * countriesAndCodes.length)// get random index from the array
   randomCountry = countriesAndCodes[randomIndex]
   randomCountryElement.innerHTML = randomCountry.name
})
// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 