const Discord = require('discord.js');
module.exports = async (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.db.collection('guilds').doc(guild.id).set({
    'guildID' : guild.id,
    'guildName' : guild.name,
    'guildOwner' : guild.owner.user.username,
    'guildOwnerID': guild.owner.id,
    'incidentchannel': 'undefined',
    'prefix': "n!"
  });
  };