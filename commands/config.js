const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You cant do that!");
    if (args.length === 0) {
        message.channel.send('Please say what you want to do (List: setPrefix, setIncidentChannel[Only use the Channel ID], setSuggest[Only use the Channel ID])');
    } else if (args.length > 0){
        if(args[0] === 'setPrefix'){
            if (args[1].length === 0) {
                return message.channel.send('Please enter a Prefix after the Command!');
            }
            const nPrefix = args[1]

            client.db.collection('guilds').doc(message.guild.id).update({
              'prefix' : nPrefix
            }).then(() => {
                message.channel.send(`Prefix has been set to ${nPrefix}`)
            });
            return;
        }

        if(args[0] === 'setSuggest'){
            if (args[1].length === 0) {
                return message.channel.send('Please enter a Channel after the Command!');
            }
            const succ = args[1]

            client.db.collection('guilds').doc(message.guild.id).update({
              'suggestchannel' : succ
            }).then(() => {
                message.channel.send(`Channel has been set to ${succ}`)
            });
            return;
        }

        if(args[0] === 'setIncidentChannel'){
            if (args[1].length === 0) {
                return message.channel.send('Please enter a Channel after the Command!');
            }
            const CH = args[1]

            client.db.collection('guilds').doc(message.guild.id).update({
              'incidentchannel' : CH
            }).then(() => {
                message.channel.send(`Channel has been set to ${CH}`)
            });
            return;
        }

    }
};

exports.help = {
    name: "config",
    category: "System",
    description: "Configure the Bot",
    usage: "config"
};