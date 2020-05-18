const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
  const embed = new Discord.RichEmbed()
    .setAuthor(client.config.botname, client.user.avatarURL)
    .setDescription(`About`)
    .setColor(client.config.color)
    .addField(`Creator`, `JPlexer`, true )
    .addField(`Music Design based on AstralEars by`, `vicr123`, true )
    .addField(`Version`, `${client.config.botver}`, true )
    .addField(`Bot User`, `${client.config.branch}`, true )
    await message.channel.send({ embed });
  };
  
  exports.help = {
    name: "about",
    category: "General",
    description: "About this Bot",
    usage: "about"
  };