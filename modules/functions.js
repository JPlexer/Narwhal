const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const yt_api_key = process.env.YT_TOKEN;
const ytpl = require("youtube-playlist");
const fetchVideoInfo = require("youtube-info");
const Discord = require('discord.js');
module.exports = (client) => {
  client.guildm = {};


  /*
  SINGLE-LINE AWAITMESSAGE
  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...
  USAGE
  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);
  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION
  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {
        depth: 1
      });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "n o ._.")
      .replace(client.dummytoken, "n  o ._.");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };
  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  client.isYoutube = function (str) {
      return str.toString().toLowerCase().includes("youtube.com");
    },


    client.skip_song = function (id, message, guild, client) {
      client.guildm[message.guild.id].dispatcher.end();
    },

    client.playMusic = function (id, message, guild, client) {
      client.guildm[message.guild.id].voiceChannel = message.member.voiceChannel;



      client.guildm[message.guild.id].voiceChannel.join().then(connection => {
        stream = ytdl(`https://www.youtube.com/watch?v=${id}`, );
        client.guildm[message.guild.id].skipReq = 0;
        client.guildm[message.guild.id].skippers = [];

        client.guildm[message.guild.id].dispatcher = connection.playStream(stream);
        client.guildm[message.guild.id].dispatcher.on('end', () => {
          client.guildm[message.guild.id].skipReq = 0;
          client.guildm[message.guild.id].skippers = [];
          client.guildm[message.guild.id].queue.shift();
          client.guildm[message.guild.id].queueNames.shift();
          if (client.guildm[message.guild.id].queue.length === 0) {
            client.guildm[message.guild.id].queue = [];
            client.guildm[message.guild.id].queueNames = [];
            client.guildm[message.guild.id].newsongs = [];
            client.guildm[message.guild.id].isPlaying = false;
            client.guildm[message.guild.id].paused = false;
            client.guildm[message.guild.id].voiceChannel.leave();
          } else {
            setTimeout(() => {
              client.playMusic(client.guildm[message.guild.id].queue[0], message, guild, client);
            }, 500)
          }
        })
      });
    },
    client.add_to_queue = function (id, message, client) {
      if (client.isYoutube(id)) {
        client.guildm[message.guild.id].queue.push(getYoutubeID(id));
      } else {
        client.guildm[message.guild.id].queue.push(id);
      }
    },
    

    client.getID = async (str, message, client, guild, cb ) => {
      //WIP for a Playlist Function
     /* if (str.toString().includes("list=")) {
        ytpl(str.toString(), 'url').then(res => {
          res1 = res.data.playlist.slice(0, 1);
          res2 = res.data.playlist.slice(1);
          cb(getYouTubeID(res1));
          res2.forEach(async function (url) { 
            id = getYouTubeID(url)
              client.add_to_queue(id, message, client);
              fetchVideoInfo(id, (err, {
                title
              }) => {
                if (err) throw new Error(err);
                const embed = new Discord.RichEmbed()
                .setAuthor(`Cris`, client.user.avatarURL)
                .setDescription(`Music`)
                .setColor(0x16ff00)
                .addField(`Your Requested Song`, `\n${title}\n has been added to the Queue! `, true )
                .setFooter('Designed and Programed by JPlexer, Copyright 2019');
                message.channel.send({ embed });
                //message.reply(` your Requested Song, **${title}** was added to the Queue!`);
                client.guildm[message.guild.id].queueNames.push(title);
              });
            //client.add_to_queue(id, message, client);
            /*console.log(url)
            id = getYouTubeID(url)
            console.log(id)
          //client.playMusic(id, message, guild, client);
          client.guildm[message.guild.id].queue.push(id);
            fetchVideoInfo(id, (err, { title }) => {
                if (err) throw new Error(err);
                console.log(title);
                client.guildm[message.guild.id].queueNames.push(title);
                
              });
            });
      })
     } else {*/
      if (client.isYoutube(str)) {
        cb(getYouTubeID(str));

      } else {
        client.search_video(str, id => {
          cb(id);
        });
      }
    //}
  };





    client.search_video = function (query, callback) {
      request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
        const json = JSON.parse(body);
        if (!json.items[0]) callback("3_-a9nVZYjk");
        else {
          callback(json.items[0].id.videoId);
        }
      });
    },

    client.guildm = function (client, id, message, guild) {
      if (!client.guildm[message.guild.id]) {
        client.guildm[message.guild.id] = {
          queue: [],
          queueNames: [],
          isPlaying: false,
          dispatcher: null,
          voiceChannel: null,
          paused: false,
          skipReq: 0,
          skippers: []
        };
      }
    },
    /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

    // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
    // later, this conflicts with native code. Also, if some other lib you use does
    // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
    // are, we feel, very useful in code. 

    // <String>.toPropercase() returns a proper-cased string such as: 
    // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
    Object.defineProperty(String.prototype, "toProperCase", {
      value: function () {
        return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      }
    });

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Object.defineProperty(Array.prototype, "random", {
    value: function () {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    // Always best practice to let the code crash on uncaught exceptions. 
    // Because you should be catching them anyway.
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};