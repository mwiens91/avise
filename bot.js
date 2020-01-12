var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
let beerCount = 0;
// Configure logger settings

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
           		let msgString = "";

           		//Set amount of beers drank
           		msgString += `${user} you've drank ${beerCount} `;
           		if(beerCount == 1){
           			msgString += "beer!";
           		}
           		else{
           			msgString += "beers!";
           		}
           		
           		bot.sendMessage({
                    to: channelID,
                    message: msgString
                });

            break;
         }
     }
});