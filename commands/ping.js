exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Ping?");
    setTimeout(function() {
    msg.edit(`Pong! Ich brauchte ${Math.round(client.ping)}ms zum Antworten!`);
   }, 500);
  };
  
  exports.help = {
    name: "ping",
    category: "General",
    description: "Es pingt. Und Pongt dann..... Aber es ist nicht Ping Pong.",
    usage: "ping"
  };