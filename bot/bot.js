import dotenv from 'dotenv';
import Api from './api';

var Discord = require('discord.io');
var logger = require('winston');


// Load in env vars from .env file and grab Discord API token
dotenv.config();
const discordApiToken = process.env.DISCORD_API_TOKEN;

// Initialize Api instance
const api = new Api('fake news', 'fake news');

console.log("Starting Bot");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: discordApiToken,
   autorun: true
});
console.log("Bot initialized");


bot.on('ready', function (evt) {
    console.log('Discord Bot Connected');
    console.log(`Logged in as: ${bot.username}`);
});

//Note, in the future, beerCount will be tracked by the server so that each user has their own data.

class user {
  constructor(name) {
    this.userName = name;
    this.amountAlcohol = 0;
    this.amountCigarette = 0;
    this.amountTHC = 0;
    this.amountNicotine = 0;
  }
}



let productList = ["beer", "beers", "shot", "shots", "wine", "weed", "mj"];
let keywordsList = ["remove", "add", "set"];
let argumentList = ["tall", "half", "glass", "of"];


var beer = ["beer", "beers", "wine", "spirit", "pbr", "pabst", "pabst blue ribbon",
    "heineken", "brewski", "ber", "bere", "sleeman", "cariboo", "sleeve",
    "corona", "asahi", "miller", "coors", "guinness", "dos equis", "bud", 
    "busch", "bud light", "coors light", "miller high life", "moosehead", "mead"];

var wine = ["wine", "red", "white"];

var spirits = ["shot", "vodka", "whiskey", "tequila", "shooter", "rum", 
    "gin", "brandy", "absinthe", "drink", "margarita", "champagne", "prosecco", "cider",
    "sake"];

var cigarette = ["cigarette", "cig", "cug", "smoke", "dart", "buck", "cigarettes",
    "belmont", "pall mall", "dumaurier", "du maurier", "fag", "smokes", "smoks", "smok",
    "bogey", "durry", "fags", "square"];



var marijuana = ["joint", "thai stick", "j", "spliff", "pinner", "fatty", "bowl", "blunt"];

var alcohol = ["beer", "beers", "wine", "spirit", "pbr", "pabst", "pabst blue ribbon",
    "heineken", "brewski", "ber", "bere", "sleeman", "cariboo", "sleeve",
    "corona", "asahi", "miller", "coors", "guinness", "dos equis", "bud", 
    "busch", "bud light", "coors light", "miller high life", "moosehead",
    "wine", "red", "white", "shot", "vodka", "whiskey", "tequila", "shooter", "rum", 
    "gin", "brandy", "absinthe", "drink", "margarita", "champagne", "prosecco", "cider",
    "sake", "mead"];

var cigarette = ["cigarette", "cig", "cug", "smoke", "dart", "buck", "cigarettes",
    "belmont", "pall mall", "dumaurier", "du maurier", "fag", "smokes", "smoks", "smok",
    "bogey", "durry", "fags", "square"]

var marijuana = ["joint", "thai stick", "j", "spliff", "pinner", "fatty", "bowl", "blunt"]



var beerCount = 0; 
var dailyBeerLimit = 4;
var weeklyBeerLimit = 8;

const normalToTall = 1.25
// Configure logger settings


// bot.on('message', function (user, userID, channelID, message, evt) {
//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `!`
    // if(message.substring(0, 1) == '!'){
    //  // Remove the "!" so that the command can be processed.
    //  message = message.substring(1);
    // }

//     var args = message.split(' ');
//     let amount;
//     let product = args[0];
//     let params = {};
//     let keyword; // Set, Remove, add, 

//     var cmd = args[0];
   
//     args = args.splice(1);
//     switch(cmd) {
//         // !ping
//         case 'beer':
//             bot.sendMessage({
//                 to: channelID,
//                 message: 'Beer!'
//             });
//         break;
//         // Just add any case commands if you want to..
//      }
// });

bot.on('message', function (user, userID, channelID, message, evt) {
//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `!`

    // if(message.channel.type != "dm" && message.substring(0, 1) != '!'){
    // 	// Messages must start with the '!' character in order for the bot to attepmt to process the command.
    // 	// Direct messages can optionally start with the '!' character, but it's not required.
    // 	return;
    // }

    if(user == bot.username){ return};

    if(message.substring(0, 1) == '!'){
     // Remove the "!" so that the command can be processed.
     message = message.substring(1);
    }

    var args = message.split(' ');
    let amount;
    let product;
    let params = [];
    let keyword; // Set, Remove, add, 

    // General command format:
    // (Optional)! (Optional)keyword (Optional)number product (Optional)parameters*

    console.log("Starting to parse the command.");

    console.log(`Args: ${args}, len: ${args.length}`);
    for(let i = 0; i < args.length; i++){

    	console.log(!isNaN(args[i]));
    	if(!isNaN(args[i])){
    		// An amount was specified

    		if(amount !== undefined){
    			// Amount was specified more than once. Throw an error.
    			// TODO:
    		}

    		amount = args[i];
    	}
    	else{
    		// argument is some kind of word. Try to determine the type.

    		exitFlag = false;
    		for(let j = 0; j < productList.length; j++){
    			if(productList[j] === args[i]){
    				// Found a match. Argument was the product to track.
    				cmd = args[i];

    				// We've found a match, so no need to continue looking
    				exitFlag = true;

    				break;
    			}
    		}

    		if(!exitFlag){
    			for(let j = 0; j < argumentList.length; j++){
	    			if(argumentList[j] === args[i]){
	    				// Found a match. Argument was an argument
	    				params.push(args[i]);

	    				// We've found a match, so no need to continue looking
	    				exitFlag = true;

	    				break;
	    			}
    			}
    		}

    		if(!exitFlag){
    			for(let j = 0; j < keywordsList.length; j++){
	    			if(keywordsList[j] === args[i]){
	    				// Found a match. Argument was a keyword
	    				params.push(args[i]);

	    				// We've found a match, so no need to continue looking
	    				exitFlag = true;

	    				break;
    				}
    			}
    		}

    	}
    }

    console.log("Finished parsing the command.");
    console.log(`Amount: ${amount}, Product: ${product}, Params: ${params}, Keyword: ${keyword}`);

    // Message has been fully parsed. Now use the data to construct the command + return message

    switch(cmd){
        case "beer":
        console.log("beginning printing.");

            if(amount == undefined){
                // An amount wasn't specified, but we're going to assume they meant they drank 1 beer.
                amount = 1;
            }

            amount = parseInt(amount, 10);

            for(let i = 0; i < params.length; i++){
                if(params[i] == "tall"){
                    amount *= normalToTall;
                }
            }

            beerCount += amount;
            
            let msgStr = beerStringBuilder(user);
            bot.sendMessage({
                to: channelID,
                message: msgStr
            });
        break;
    }

       		
});




function beerStringBuilder(user){
	let msgString = "";
	let dailyLimit = dailyBeerLimit;
	let weeklyLimit = weeklyBeerLimit;
	let count = beerCount;

	console.log(`DAILY LIMIT: ${dailyLimit}, ${weeklyLimit}, ${count}.`);

    msgString += `${user} you've drank ${count} `;

	if(count == 1){
		msgString += "beer.";
	}
	else{
		msgString += "beers.";
	}

	console.log(`DAILY LIMIT: ${dailyLimit - count == -1}`);
	if(dailyLimit - count == 0){
		msgString += " You have reached your daily drinking limit and should not continue drinking!";
	}
	else if(dailyLimit - count == -1){
		// user has drank 1 beer past their limit.
		msgString += " You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop ;-; ";
	}
	else if(dailyLimit - count < -1){
		// user has drank 1 beer past their limit.
		msgString += " You have greatly surpassed your daily drinking limit! Future 'you' is going to be very disappointed.";
	}
	else if(dailyLimit - count <= 2){
		msgString += ` You are nearing your desired daily beer limit of ${dailyLimit} `;
		if(dailyLimit == 1){
			msgString += "beer.";
		}
		else{
			msgString += "beers.";
		}
	}

	console.log(`RETURN STRING: ${msgString}`);
	return msgString;
}


// function loggerStringBuilder(product, user){
// 	let msgString = "";
// 	let dailyLimit;
// 	let weeklyLimit;
// 	let count;
// 	let productSing;
// 	let productPlur;

// 	if(product == "beer"){
// 		dailyLimit = dailyBeerLimit;
// 		weeklyLimit = weeklyBeerLimit;
// 		count = beerCount;
// 		productPlur = "beers";
// 		productSing = "beer";
// 	}
// 	else if(product == "nicotine"){
// 		// TODO: 
// 	}

//     msgString += `${user} you've `;
//    	if(product == "beer"){
//    		msgString += "drank ";
//    	}

//     msgString += `${count} `;
// 	if(count == 1){
// 		msgString += `${productSing}.`;
// 	}
// 	else{
// 		msgString += `${productPlur}.`;
// 	}

// 	if(dailyLimit - count == 0){
// 		msgString += "You have reached your daily drinking limit and should not continue drinking!";
// 	}
// 	else if(dailyLimit - count < 0){
// 		msgString += "You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop. ";
// 	}
// 	else if(dailyLimit - count <= 2){
// 		msgString += `You are nearing your desired daily beer limit of ${dailyLimit} `;
// 		if(dailyLimit == 1){
// 			msgString += "beer.";
// 		}
// 		else{
// 			msgString += "beers.";
// 		}
// 	}



// 	return msgString;
// }