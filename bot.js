const Discord = require("discord.js");
const {
  promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
require('dotenv').config()

const client = new Discord.Client();

client.config = require("./config.js");

client.logger = require("./modules/Logger");


require("./modules/functions.js")(client);

client.commands = new Enmap();

const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount)
})

client.db = admin.firestore();

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);

  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.login(client.config.token);
};

init();

