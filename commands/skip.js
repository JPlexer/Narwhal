exports.run = (client, message, args, guild) => {
    client.guildm[message.guild.id].dispatcher.end();
  };

 exports.help = {
    name: "skip",
    category: "Music",
    description: "Skips to the next song",
    usage: "skip"
  }; 