const Discord = require('discord.js');
exports.run = async (client, message, args, guild) => {
          if (!client.guildm[message.guild.id].paused) {
        client.guildm[message.guild.id].dispatcher.pause();
        client.guildm[message.guild.id].paused = true;
        const embed = new Discord.RichEmbed()
        .setAuthor(`Narwhal`, client.user.avatarURL)
        .setDescription(`Music`)
        .setColor(0x16ff00)
        .addField(`Current Song`, `${client.guildm[message.guild.id].queueNames[0]} is now paused.\n To resume type ${client.config.prefix}pause again.`, true )
        .setFooter('Designed and Programed by JPlexer, Copyright 2019');
        await message.channel.send({ embed });
        //message.channel.send('OK, I Paused the Music!')
    }
    else {
      client.guildm[message.guild.id].dispatcher.resume();
        client.guildm[message.guild.id].paused = false;
        //message.channel.send('OK, I resumed the Music!')
        const embed = new Discord.RichEmbed()
        .setAuthor(`Narwhal`, client.user.avatarURL)
        .setDescription(`Music`)
        .setColor(0x16ff00)
        .addField(`Current Song`, `${client.guildm[message.guild.id].queueNames[0]} is now resumed.`, true )
        .setFooter('Designed and Programed by JPlexer, Copyright 2019');
        await message.channel.send({ embed });
  }
};

 exports.help = {
    name: "pause",
    category: "Music",
    description: "Pauses the Music",
    usage: "pause"
  }; 