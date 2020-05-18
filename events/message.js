// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {
  if(!client.currentMemory) {client.currentMemory= {}}
  let gid = message.guild.id;

  if (client.currentMemory[gid] == null) {
      client.currentMemory[gid] = {
          queue: [],
          playing: null,
          channel: null,
          dispatcher: undefined,
          voiceConnection: null,
          textChannel: null,
          mediaPlayerMessage: null,
          paused: false,
          repeat: false
      };
  }
client.db.collection('guilds').doc(message.guild.id).get().then((q) => {
  if (q.exists){
    prefix = q.data().prefix
    ic = q.data().incidentchannel
  } else {
    client.db.collection('guilds').doc(message.guild.id).set({
      'guildID' : message.guild.id,
      'guildName' : message.guild.name,
      'guildOwner' : message.guild.owner.user.username,
      'guildOwnerID': message.guild.owner.id,
      'incidentchannel': 'undefined',
      'prefix': "n!"
    })
  }}
    ).then(() => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) message.guild.fetchMember(message.author);

  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
})
  
};