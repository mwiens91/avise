var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//Note, in the future, beerCount will be tracked by the server so that each user has their own data.

let beerCount = 0; 
let dailyBeerLimit = 4;
let weeklyBeerLimit = 8;
// Configure logger settings
console.log("Starting Bot");
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
console.log("Bot initialized");
bot.on('ready', function (evt) {
    console.log('Discord Bot Connected');
    console.log(`Logged in as: ${bot.username}`);
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
           	case 'beer':
           		
           		beerCount++;
           		
           		let msgString = loggerStringBuilder("beer", user);
           		bot.sendMessage({
                    to: channelID,
                    message: msgString
                });

            break;
         }
     }
});



function loggerStringBuilder(product, user){
	let msgString = "";
	let dailyLimit;
	let weeklyLimit;
	let count;
	let productSing;
	let productPlur;

	if(product == "beer"){
		dailyLimit = dailyBeerLimit;
		weeklyLimit = weeklyBeerLimit;
		count = beerCount;
		productPlur = "beers";
		productSing = "beer";
	}
	else if(product == "nicotine"){
		// TODO: 
	}

    msgString += `${user} you've `;
   	if(product == "beer"){
   		msgString += "drank ";
   	}

    msgString += `${count} `;
	if(count == 1){
		msgString += `${productSing}.`;
	}
	else{
		msgString += `${productPlur}.`;
	}

	if(dailyLimit - count == 0){
		msgString += "You have reached your daily drinking limit and should not continue drinking!";
	}
	else if(dailyLimit - count < 0){
		msgString += "You have surpassed your daily drinking limit! Your liver is crying and would like you to please stop. ";
	}
	else if(dailyLimit - count <= 2){
		msgString += `You are nearing your desired daily beer limit of ${dailyLimit} `;
		if(dailyLimit == 1){
			msgString += "beer.";
		}
		else{
			msgString += "beers.";
		}
	}



	return msgString;
}