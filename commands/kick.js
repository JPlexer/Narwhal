const Discord = require('discord.js');
const tinydate = require('tinydate');
const time = tinydate('{DD}.{MM}.{YYYY} {HH}:{mm}:{ss}');

exports.run = async(client, message, args, guild) => {

  client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if (q.exists){
      prefix = q.data().prefix
      ic = q.data().incidentchannel
    }});
    var kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Can't find user!");
    var kReason = args.join(" ").slice(22);
    if (kReason === "") {
        kReason = "undefined"
    };
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You can't do that!");

    var kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor(client.config.color)
        .addField("Kicked User", `${kUser} (ID ${kUser.id})`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Time", time())
        .addField("Reason", kReason);

        var incidentchannel = message.guild.channels.find(`id`, ic);
        if (!incidentchannel) return message.channel.send(`Can't find the Incidentchannel (Set it up using ${prefix}config!`);

    message.guild.member(kUser).kick(kReason);
    incidentchannel.send(kickEmbed);

    return;
  };

  exports.help = {
    name: "kick",
    category: "Mod",
    description: "Kicks a User",
    usage: "kick [user] (reason)"
  };