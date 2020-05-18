module.exports.run = async (client, msg) => {
    const Discord = require('discord.js');
    let user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          const embed = new Discord.RichEmbed()
          .setAuthor(client.config.botname, client.user.avatarURL)
          .setDescription(`Profilbild`)
          .setColor(client.config.color)
          .setImage(user.avatarURL)
          await msg.channel.send({ embed });
       }
    }else{
        const embed = new Discord.RichEmbed()
        .setAuthor(client.config.botname, client.user.avatarURL)
        .setDescription(`Profilbild`)
        .setColor(client.config.color)
        .setImage(msg.author.avatarURL)
        await msg.channel.send({ embed });     
    }
};

exports.help = {
    name: "pic",
    category: "Pix",
    description: "Fetch the Profile Picture of somebody else!",
    usage: "pic"
};