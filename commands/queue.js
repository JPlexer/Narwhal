const Discord = require('discord.js');
exports.run = (client, message, args, guild) => {

  if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.reply('ERROR: Cris doesn\'t have the permission to send embed links please enable them to use the full help.');
  const embed = new Discord.RichEmbed()
    .setAuthor(`Narwhal`, client.user.avatarURL)
    .setDescription('Queue')
    .setColor(0x16ff00)
    .setFooter('Designed and Programed by JPlexer, Copyright 2019');
    let cat = '';
    client.guildm[message.guild.id].queueNames.forEach(function(x) {
    cat = cat + x + '\n';
  })
  if (cat !== ''){
   embed.addField('Songs', cat, true);
  }
   message.channel.send({ embed });

    /*let message2 = "```";
    for (let i = 0; i < client.guildm[message.guild.id].queueNames.length; i++) {
      const temp = `${i + 1}: ${client.guildm[message.guild.id].queueNames[i]}${i === 0? "**(Currently Playing)***" : ""}\n`;
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);*/
  };

  exports.help = {
    name: "queue",
    category: "Music",
    description: "Shows you the queue",
    usage: "queue"
  };