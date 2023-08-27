/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Get the container where the game cards will be added
    const gamesContainer = document.getElementById('games-container');

    // Loop over each item in the data
    for (const game of games) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class game-card to the div
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>Description: ${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}

// Convert the provided games string to an array of objects
const gamesData = JSON.parse(GAMES_DATA);

// Call the function with the games data
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const totalGames = GAMES_JSON.length;


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerText = totalContributions.toLocaleString();

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerText = `$${totalPledged.toLocaleString()}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // Use the filter() method to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Call the addGamesToPage function to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);


    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // Call the addGamesToPage function to add the funded games to the DOM
    addGamesToPage(fundedGames);
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesStatement =
    unfundedGamesCount === 0
        ? 'All games are fully funded!'
        : `There ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''
        } still unfunded.`;

// Create the main statement with total money raised, total games, and the unfunded games statement
const mainStatement = `We've raised $${totalPledged.toLocaleString()} for ${totalGames} game${totalGames !== 1 ? 's' : ''
    }. ${unfundedGamesStatement}`;


// Create a new paragraph element
const descriptionParagraph = document.createElement('p');

// Use the template string to create the content
const descriptionText = `
A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} games.
Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain${unfundedGamesCount === 1 ? 's' : ''} unfunded.
We need your help to fund these amazing game${unfundedGamesCount !== 1 ? 's' : ''}!
`;

// Set the innerHTML of the paragraph element
descriptionParagraph.innerHTML = descriptionText;

// Append the paragraph element to the descriptionContainer
descriptionContainer.appendChild(descriptionParagraph);


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// Get the top two games using destructuring
const [firstGame, secondGame, ...restGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
// Create elements to display information about the top games
const firstGameElement = document.createElement('div');
const secondGameElement = document.createElement('div');

// Set the content of the first game element
firstGameElement.innerHTML = `
    <h2>${firstGame.name}</h2>
`;

// Set the content of the second game element
secondGameElement.innerHTML = `
    <h2>${secondGame.name}</h2>
`;

// Append the elements to their respective containers in your HTML
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item