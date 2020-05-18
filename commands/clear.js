const Discord = require('discord.js');
exports.run = async(client, message, args, guild) => {
    client.guildm[message.guild.id].queue = [client.guildm[message.guild.id].queue.slice(0, 1)];
    client.guildm[message.guild.id].queueNames = [client.guildm[message.guild.id].queueNames.slice(0, 1)];
    const embed = new Discord.RichEmbed()
    .setAuthor(`Narwhal`, client.user.avatarURL)
    .setDescription(`Music`)
    .setColor(0x16ff00)
    .addField(`The Songs after the Current one have been removed!`, `The current Song isn't affected!`, true )
    .setFooter('Designed and Programed by JPlexer, Copyright 2019');
    await message.channel.send({ embed });
  };

  exports.help = {
    name: "clear",
    category: "Music",
    description: "clears the queue, while keeping the current song",
    usage: "clear"
  };