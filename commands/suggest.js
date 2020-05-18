const Discord = require('discord.js');

exports.run = async(client, message, args, guild) => {
  client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if (q.exists){
        prefix = q.data().prefix
        sc = q.data().suggestchannel
    };

    var suggestEmbed = new Discord.RichEmbed()
        .setAuthor(client.config.botname, client.user.avatarURL)
        .setColor(client.config.color)
        .addField("Suggestion", `${args}`)
        .setFooter(message.author.username, message.author.avatarURL);
    var suggchannel = message.guild.channels.find(`id`, sc);
    if (!suggchannel) return message.channel.send(`Can't find the Suggestionschannel (Set it up using ${prefix}config!`);


    suggchannel.send(suggestEmbed);

    return;
 })};

  exports.help = {
    name: "suggest",
    category: "General",
    description: "Suggestions...",
    usage: "suggest"
  };