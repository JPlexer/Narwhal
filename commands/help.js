const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args) => {
  client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if (q.exists){
      prefix = q.data().prefix}});
  if (!args[0]) {
  const categories = [];
  const commands = Array.from(client.commands.keys());
  commands.forEach(function(x) {
    if (!categories.includes(client.commands.get(x).help.category)) {
      categories.push(client.commands.get(x).help.category);
    }
  });

  if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.reply('ERROR: ' + client.config.botname + ' doesn\'t have the permission to send embed links please enable them to use the full help.');
  const embed = new Discord.RichEmbed()
    .setAuthor(client.config.botname+` Help`, client.user.avatarURL)
    .setDescription('Every command you input into ' + client.config.botname + ' requires the prefix `' + prefix + '`')
    .setColor(client.config.color)

  categories.forEach(function(x) {
    let cat = '';
    commands.forEach(function(command) {
      if (client.commands.get(command).help.category == x) {
        cat = cat + command + '\n';
      }
    });
    embed.addField(x, cat, true);
  });

  await message.channel.send({ embed });
} else {
  let command = args[0];
  if (client.commands.has(command)) {
    command = client.commands.get(command);
    if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.reply('ERROR: ' + client.config.botname + ' doesn\'t have the permission to send embed links please enable them to use the full help.');
  const embed = new Discord.RichEmbed()
    .setAuthor(client.config.botname+` Help`, client.user.avatarURL)
    .setDescription('Every command you input into ' + client.config.botname + ' requires the prefix `' + prefix + '`')
    .setColor(client.config.color)
    .addField(`${prefix}${command.help.name}`, `${command.help.description}\n Usage: ${command.help.usage}`, true )
    await message.channel.send({ embed });
  }
}
};

  exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for you.",
    usage: "help [command]"
  };