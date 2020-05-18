const fetchVideoInfo = require("youtube-info");
const Discord = require('discord.js');
exports.run = async (client, message, args, guild) => {
    if (message.member.voiceChannel || client.guildm[message.guild.id].voiceChannel != null) {
      if (client.guildm[message.guild.id].queue.length > 0 || client.guildm[message.guild.id].isPlaying) {
        client.getID(args, message, client, guild, id => {
          client.add_to_queue(id, message, client);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            const embed = new Discord.RichEmbed()
            .setAuthor(`Narwhal`, client.user.avatarURL)
            .setDescription(`Music`)
            .setColor(0x16ff00)
            .addField(`Your Requested Song`, `\n${title}\n has been added to the Queue! `, true )
            .setFooter('Designed and Programed by JPlexer, Copyright 2019');
            message.channel.send({ embed });
            //message.reply(` your Requested Song, **${title}** was added to the Queue!`);
            client.guildm[message.guild.id].queueNames.push(title);
          });
        });
       } else {
        isPlaying = true;
        client.getID(args, message, client, guild, id => {
          client.guildm[message.guild.id].queue.push(id);
          console.log(id);
          client.playMusic(id, message, guild, client);
          fetchVideoInfo(id, (err, { title }) => {
            if (err) throw new Error(err);
            client.guildm[message.guild.id].queueNames.push(title);
            const embed = new Discord.RichEmbed()
            .setAuthor(`Narwhal`, client.user.avatarURL)
            .setDescription(`Music`)
            .setColor(0x16ff00)
            .addField(`Your Requested Song`, `\n${title}\n is now Playing! `, true )
            .setFooter('Designed and Programed by JPlexer, Copyright 2019');
            message.channel.send({ embed });
            //message.reply(` your Requested Song, **${title}** is now Playing!`);
          })
        });}
    } else {
      message.reply(" you must be in a Voice Channel!");
    }
  };

  exports.help = {
    name: "play",
    category: "Music",
    description: "Plays your favourite Songs",
    usage: "play [songname]"
  };