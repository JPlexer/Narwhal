const Discord = require('discord.js');
exports.run = async(client, message, args, guild) => {
    client.guildm[message.guild.id].queue.length = 0;
    client.guildm[message.guild.id].dispatcher.end();
    const embed = new Discord.RichEmbed()
    .setAuthor(`Narwhal`, client.user.avatarURL)
    .setDescription(`Music`)
    .setColor(0x16ff00)
    .addField(`Stop`, `The Music is now stopped!`, true )
    .setFooter('Designed and Programed by JPlexer, Copyright 2019');
    await message.channel.send({ embed });
  };

  exports.help = {
    name: "stop",
    category: "Music",
    description: "Stops the Music for you",
    usage: "stop"
  };