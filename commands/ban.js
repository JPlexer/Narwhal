const Discord = require('discord.js');
const tinydate = require('tinydate');
const time = tinydate('{DD}.{MM}.{YYYY} {HH}:{mm}:{ss}');

exports.run = async(client, message, args, guild) => {
  client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if (q.exists){
      prefix = q.data().prefix
      ic = q.data().incidentchannel
    }});
    var bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Can't find user!");
    var bReason = args2.join(" ").slice(22);
    if (bReason === "") {
        bReason = "undefined"
    };
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You cant do that!");

    var banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor(client.config.color)
        .addField("Banned User", `${bUser} (ID ${bUser.id})`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Time", time())
        .addField("Reason", bReason);

    var incidentchannel =  message.guild.channels.find(`id`, ic);
    if (!incidentchannel) return message.channel.send(`Can't find the Incidentchannel (Set it up using ${prefix}config!`);

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  };

  exports.help = {
    name: "ban",
    category: "Mod",
    description: "Bans a User",
    usage: "ban [User] (Reason)"
  };