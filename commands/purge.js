const Discord = require('discord.js');
exports.run = async(client, message, args, guild) => {

    client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
        if (q.exists){
          prefix = q.data().prefix
          ic = q.data().incidentchannel
        }});
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send("You can't do that!");
        return;
    }
    if (isNaN(args[0])) {
        message.channel.send(`Please say how many Messages you would like to delete. \n For Example: ${prefix}purge 6 deletes 6 Messages`);
        return;
    }
    const fetched = await message.channel.fetchMessages({
        limit: args[0]
    });
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`));
  };

  exports.help = {
    name: "purge",
    category: "Mod",
    description: "Deletes a Certain Amount of Messages",
    usage: "purge [number]"
  };