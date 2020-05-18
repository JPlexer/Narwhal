const Discord = require('discord.js');
exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
  const embed = new Discord.RichEmbed()
  .setAuthor(client.config.botname, client.user.avatarURL)
  .setDescription(`Serverinfo`)
  .setColor(client.config.color)
  .addField(`Server Name`, `${message.guild.name}`, true )
  .addField(`Created at:`, `${message.guild.createdAt}`, true )
  .addField(`User Count`, `${message.guild.memberCount}`, true )
  await message.channel.send({ embed });
};

exports.help = {
  name: "serverinfo",
  category: "System",
  description: "Gibt dir Serverinfos",
  usage: "serverinfo"
};