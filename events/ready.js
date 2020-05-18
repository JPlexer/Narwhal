module.exports = (client) => {
  console.log(`Connecting to The Interwebz`)
    console.log(`Connected to The Interwebz! Ready to confuse a total of ${client.users.size} users, in ${client.channels.size} channels on ${client.guilds.size} servers.`);
    client.user.setActivity(
        `JPlexer`, {
        type: "LISTENING"
      });
}