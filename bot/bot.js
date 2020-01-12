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

const ounceToMils = 29.5735;
const avgBeerPercent = 0.05;
const avgWinePercent = 0.12;
const avgSpiritPercent = 0.40;
const standardDrinkVol = 17.7; //17.2ml of 100% alcohol is considered a "standard drink". This is roughly 12oz of 5% beer, 1.5 ounces of 40% liqour, or 5 ounces of 12% wine.

//default values in ml
const defaultWineVol = 175; 
const shotVol = 44.3603
const beerVol = 354.882;
const tallCanVol = 473.176;
const sleeveVol = 414.029;
const pintVol = 591.471;
const bottleWineVol = 750;



let productList = ["beer", "beers", "shot", "shots", "wine", "weed", "mj"];
let keywordsList = ["remove", "add", "set"];
let argumentList = ["tall", "half", "sleeve", "sleeves", "pints", "pint", "bottle", "bottles", "double"];
let volumeKeywordsList = ["millileters", "millileter", "ml", "L", "liters", "liter", "oz", "oz.", "ounce", "ounces"]; // Note, keywords like pint or sleeve will be tracked elsewhere.


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


let totAlcoholVol = 0;
var beerCount = 0; 
var dailyBeerLimit = 4*standardDrinkVol;
var weeklyBeerLimit = 8;

var wineCount = 0; 
var dailyWineLimit = 4;
var weeklyWineLimit = 8;

let displayMetric = false;


// TODO: display setting. Display in either ml or ounces
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
    let cmd;
    let params = [];
    let measure;
    let size;
    let keyword; // Set, Remove, add, 

    // General command format:
    // (Optional)! (Optional)keyword (Optional)number product (Optional)parameters*

    console.log("Starting to parse the command.");

    console.log(`Args: ${args}, len: ${args.length}`);
    for(let i = 0; i < args.length; i++){

    	console.log(!isNaN(args[i]));
    	if(!isNaN(args[i])){
    		// An amount was specified or potentially an amount of ounces/millileters/liters

            if(args.length > i + 1){
                // I want to access the next element, so make sure we're not at the end of the array first.

                for(let j = 0; j < volumeKeywordsList.length; j++){
                    if(args[i + 1] == volumeKeywordsList[j]){
                        if(measure)
                        measure = args[i + 1];
                        size = parseFloat(args[i]);
                        break;
                    }
                }

                // it wasn't a measure, so the number was an amount.
                if(amount == undefined){
                    amount = parseFloat(args[i]);
                }
            }
            else{
                //no chance as being a measure, so just treat it as an amount
                if(amount == undefined){
                    amount = parseFloat(args[i]);
                }
            }
    	}
    	else{
    		// argument is some kind of word. Try to determine the type.

    		let exitFlag = false;
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
	    				keyword = args[i];

	    				// We've found a match, so no need to continue looking
	    				exitFlag = true;

	    				break;
    				}
    			}
    		}

    	}
    }

    // Message has been fully parsed. Now use the data to construct the command + return message
     console.log(`Amount: ${amount}, Product: ${cmd}, Params: ${params}, Keyword: ${keyword}, Measure: ${measure}`);

    let msgStr;
    switch(cmd){
        case "beer":
        case "beers":


            for(let i = 0; i < params.length; i++){
                if(params[i] == "tall" ||
                    params[i] == "half" || 
                    params[i] == "sleeve" ||
                    params[i] == "pint"){
                    measure = params[i];
                }
                if(params[i] == "pints"){
                    measure = "pint";
                }
                if(params[i] == "sleeves"){
                    measure = "sleeve";
                }
            }
            console.log(`Amount: ${amount}, Product: ${cmd}, Keyword: ${keyword}, Measure: ${measure}, Size: ${size}` );
            size = calcVolAlc(size, measure, amount, "beer");

            if(keyword == "remove"){
                    // User probably made a mistake and wants to remove that amount of liquor from the record.
                    size *= -1;
            }

            totAlcoholVol += size;
            
            msgStr = alcoholConsumptionStringBuilder(user, totAlcoholVol, "beer");
            bot.sendMessage({
                to: channelID,
                message: msgStr
            });
        break;
        case "shot":
        case "shots":

            for(let i = 0; i < params.length; i++){
                if(params[i] == "double" || 
                    params[i] == "bottle" ||
                    params[i] == "bottles"){
                    measure = params[i];
                }
            }

            console.log(`Amount: ${amount}, Product: ${cmd}, Keyword: ${keyword}, Measure: ${measure}, Size: ${size}` );
            size = calcVolAlc(size, measure, amount, "shot");

            if(keyword == "remove"){
                    // User probably made a mistake and wants to remove that amount of liquor from the record.
                    size *= -1;
            }

            totAlcoholVol += size;
            
            msgStr = alcoholConsumptionStringBuilder(user, totAlcoholVol, "shot");
            bot.sendMessage({
                to: channelID,
                message: msgStr
            });
        break;
        case "wine":
            for(let i = 0; i < params.length; i++){
                if(params[i] == "half" || 
                    params[i] == "bottle" ||
                    params[i] == "bottles"){
                    measure = params[i];
                }

            }
            size = calcVolAlc(size, measure, amount, "wine");

            if(keyword == "remove"){
                    // User probably made a mistake and wants to remove that amount of liquor from the record.
                    size *= -1;
            }

            totAlcoholVol += size;
            
            msgStr = alcoholConsumptionStringBuilder(user, totAlcoholVol, "wine");
            bot.sendMessage({
                to: channelID,
                message: msgStr
            });
        break;
    }

       		
});


function calcVolAlc(size, measure, amount, product){
    console.log(`START: Amount: ${amount}, Product: ${product}, Measure: ${measure}, Size: ${size}`);

    if(amount == undefined){
        // An amount wasn't specified, but we're going to assume they meant they had 1 drink.
        amount = 1;
    }
    
    amount = parseFloat(amount, 10);

    if(size != undefined){
        size = parseFloat(size, 10);// could be undef
    }

    // Got to determine the quantity of alcohol consumed. Everything will be converted to millileters.
    if( measure == "millileters"    ||
        measure == "ml"             ||
        measure == "millileter"     ){
    }

    if( measure == "ounce"    ||
        measure == "ounces"   ||
        measure == "oz"       ||
        measure == "oz."){
        // Convert to ml
        size *= ounceToMils;
    }

    if( measure == "liter"    ||
        measure == "L"        ||
        measure == "liters"   ){
        size *= 1000;
    }

    if(measure == "tall"){
        size = tallCanVol;
    }

    if(measure == "sleeve"  ||
        measure == "sleeves"){
        size = sleeveVol;
    }

    if(measure == "bottle" ||
        measure == "bottles"){
        size = bottleWineVol;
    }

    if(measure == "pint" || measure == "pints"){
        size = pintVol;
    }

    if(measure == "half"){
        amount /= 2;
    }

    if(measure == "double"){
        amount *= 2;
    }

    if(measure == undefined){
        // use default measurements based on the type of drink
        if(product == "beer"){
            size = beerVol;
        }
        else if(product == "shot"){
            size = shotVol;
        }
        else if(product == "wine"){
            size = defaultWineVol;
        }
    }

    // merge size with amount
    console.log(`MID END: Amount: ${amount}, Product: ${product}, Measure: ${measure}, Size: ${size}`);
    size = size * amount;

    // calculate ml of pure alcohol
    if(product == "beer"){
        size *= avgBeerPercent;
    }
    else if(product == "shot"){
        size *= avgSpiritPercent;
    }
    else if(product == "wine"){
        size *= avgWinePercent;
    }

    // return value is 100% alcohol in ml
    console.log(`END: Amount: ${amount}, Product: ${product}, Measure: ${measure}, Size: ${size}`);
    return size;
}

function alcoholConsumptionStringBuilder(user, volConsumed, product){
    let msgString = "";
    let dailyLimit = dailyBeerLimit; //dailyLimit in ml
    // let weeklyLimit = weeklyBeerLimit;

    let drinks = (volConsumed / standardDrinkVol).toFixed(1);

    if(drinks < 0 && drinks > -0.1){
        drinks = 0.0;
    }
    msgString += `${user} you've had ${drinks} drinks.`;

    let limitRatio = volConsumed / dailyLimit;
    dailyLimit = (dailyLimit/standardDrinkVol).toFixed(1);
    if(limitRatio > 0.96 && limitRatio < 1.04){
        msgString += " You have reached your daily drinking limit and should not continue drinking!";
    }
    else if(limitRatio >= 1.04 && limitRatio <= 1.4){
        // user has drank ~20% past their limit.
        msgString += " You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop ;-; ";
    }
    else if(limitRatio > 1.4 ){
        // drank 40% more than they've wanted to.
        msgString += " You have greatly surpassed your daily drinking limit! Future 'you' is going to be very disappointed.";
    }
    else if(limitRatio <= 0.96 && limitRatio >= 0.80){
        msgString += ` You are over 80% of the way toward your daily limit of ${dailyLimit} drinks.`;
    }
    else if(limitRatio < 0.80){
        msgString += ` You are ${limitRatio.toFixed(2)* 100}% of the way to your desired daily beer limit of ${dailyLimit} drinks.`;
    }

    console.log(`RETURN STRING: ${msgString}`);
    return msgString;
}

// function beerStringBuilder(user){
// 	let msgString = "";
// 	let dailyLimit = dailyBeerLimit;
// 	let weeklyLimit = weeklyBeerLimit;
// 	let count = beerCount;

//     msgString += `${user} you've drank ${count} `;

// 	if(count == 1){
// 		msgString += "beer.";
// 	}
// 	else{
// 		msgString += "beers.";
// 	}

// 	if(dailyLimit - count == 0){
// 		msgString += " You have reached your daily drinking limit and should not continue drinking!";
// 	}
// 	else if(dailyLimit - count == -1){
// 		// user has drank 1 beer past their limit.
// 		msgString += " You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop ;-; ";
// 	}
// 	else if(dailyLimit - count < -1){
// 		// user has drank 1 beer past their limit.
// 		msgString += " You have greatly surpassed your daily drinking limit! Future 'you' is going to be very disappointed.";
// 	}
// 	else if(dailyLimit - count <= 2){
// 		msgString += ` You are nearing your desired daily beer limit of ${dailyLimit} `;
// 		if(dailyLimit == 1){
// 			msgString += "beer.";
// 		}
// 		else{
// 			msgString += "beers.";
// 		}
// 	}

// 	console.log(`RETURN STRING: ${msgString}`);
// 	return msgString;
// }

// function wineStringBuilder(user){
//     let msgString = "";
//     let dailyLimit = dailyWineLimit;
//     let weeklyLimit = weeklyWineLimit;
//     let count = wineCount;

//     msgString += `${user} you've drank ${count} `;

//     if(count == 1){
//         msgString += "glass of wine.";
//     }
//     else{
//         msgString += "glasses of wine.";
//     }

//     if(dailyLimit - count == 0){
//         msgString += " You have reached your daily drinking limit and should not continue drinking!";
//     }
//     else if(dailyLimit - count == -1){
//         // user has drank 1 beer past their limit.
//         msgString += " You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop ;-; ";
//     }
//     else if(dailyLimit - count < -1){
//         // user has drank 1 beer past their limit.
//         msgString += " You have greatly surpassed your daily drinking limit! Future 'you' is going to be very disappointed.";
//     }
//     else if(dailyLimit - count <= 2){
//         msgString += ` You are nearing your desired daily alcohol limit of ${dailyLimit} `;
//         if(dailyLimit == 1){
//             msgString += "glass of wine.";
//         }
//         else{
//             msgString += "glasses of wine.";
//         }
//     }

//     console.log(`RETURN STRING: ${msgString}`);
//     return msgString;
// }