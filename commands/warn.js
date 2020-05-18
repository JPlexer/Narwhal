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
    var wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) return message.channel.send("Couldn't find user.");
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You can't do that");
    var wreason = args.join(" ").slice(22);
    if (wreason === "") {
        wreason = "undefined"
    };

    var warnEmbed = new Discord.RichEmbed()
        .setDescription("Warning")
        .setColor(client.config.color)
        .addField("Warned User", `${wUser} (ID ${wUser.id})`)
        .addField("Moderator", `${message.author}`)
        .addField("Time", time())
        .addField("Reason", wreason);

    var rerportschannel = message.guild.channels.find(`id`, ic);
    if (!rerportschannel) return message.channel.send(`Can't find the Incidentchannel (Set it up using ${prefix}config!`);


    rerportschannel.send(warnEmbed);

    return;
  };

  exports.help = {
    name: "warn",
    category: "Mod",
    description: "Warns a User",
    usage: "warn [User] (Reason)"
  };