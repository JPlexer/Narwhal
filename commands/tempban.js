const Discord = require('discord.js');
const tinydate = require('tinydate');
const time = tinydate('{DD}.{MM}.{YYYY} {HH}:{mm}:{ss}');
const ms = require("ms");
exports.run = async(client, message, args, guild) => {
    client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
        if (q.exists){
          prefix = q.data().prefix
          ic = q.data().incidentchannel
        }});

    var tbUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tbUser) return message.channel.send("Can't find user!");
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You can't do that!");

        let bantime = args[1];
        if (!bantime) return message.reply("You didn't specify a Time!");

        message.guild.member(tbUser).ban();
        var tbanEmbed = new Discord.RichEmbed()
            .setDescription("TempBan")
            .setColor(client.config.color)
            .addField("Banned User", `${tbUser} (ID ${tbUser.id})`)
            .addField("Moderator", `<@${message.author.id}>`)
            .addField("Time", time())
            .addField("Banned for", `${ms(ms(bantime))}`);

            var incidentchannel = message.guild.channels.find(`id`, ic);
            if (!incidentchannel) return message.channel.send(`Can't find the Incidentchannel (Set it up using ${prefix}config!`);

    message.guild.member(bUser).ban();
    incidentchannel.send(banEmbed);
        setTimeout(function () {
            message.guild.unban(tbUser);
            incidentchannel.send(`<@${tbUser.id}> has been Unbanned!`);
        }, ms(bantime));
  };

  exports.help = {
    name: "tempban",
    category: "Mod",
    description: "Banns a User for a Certain Time",
    usage: "tempban [User] [Time]"
  };