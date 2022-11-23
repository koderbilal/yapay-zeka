const discord = require("discord.js")
const fs = require('fs-extra')

const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
GatewayIntentBits.AutoModerationConfiguration,
GatewayIntentBits.AutoModerationExecution,
GatewayIntentBits.DirectMessageReactions,
GatewayIntentBits.DirectMessageTyping,
GatewayIntentBits.DirectMessages,
GatewayIntentBits.GuildBans,
GatewayIntentBits.GuildEmojisAndStickers,
GatewayIntentBits.GuildIntegrations,
GatewayIntentBits.GuildInvites,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.GuildMessageTyping,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildPresences,
GatewayIntentBits.GuildScheduledEvents,
GatewayIntentBits.GuildVoiceStates,
GatewayIntentBits.GuildWebhooks,
GatewayIntentBits.Guilds,
GatewayIntentBits.MessageContent
] });

const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
const config = require("./config.json")

client.login(config.token);

client.on("ready", () => {
    console.log(`${client.user.tag} hazır!`)
    client.user.setPresence({ activities: [{ name: 'Swanex ❤️' }], status: 'idle' });
})
const prefix = config.prefix 
const bendb = require("./Databasem/app.js");

client.on("messageCreate", async message => {
    const db = new bendb({
        path: `./database.json`,
        seperator: ".",
        spaces: 10
    });
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    //if (message.author.id !== ayarlar.botOwner && message.author.id !== message.guild.owner.id) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length);
    if(command === "safe"){ // komutlar bu şekilde eklenecektir. if(command === "komut")
        // kullanımı !safe id şeklindedir
    // let abici = message.guild.members.cache.get(args[0])
      message.channel.send(`merhaba <@${args[0]}>`)
      //message.channel.send({ content: `${config.mesajsil}`})
      // args[0]
    }
    if(command === "eval"){
    //if (message.author.id !== owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${owner}>`});;
    if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi`});
    let code = args.join(' ');
    function clean(text) {
    if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
    text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
    return text;
  };
  let res;
  try {
    res = eval(clean(code));
    if (typeof res !== 'string') res = require('node:util').inspect(res);
  }  catch(err) { 
    console.error(err.stack);
    res = err.message;
     } 
     message.channel.send(res, {code: "js", split: true});
    } // buraya if eklenip komut eklenebilir
    if(command === "mee"){
        message.channel.send({content: "merhaba dünya"})
    }
    if(command === "kelime"){
        // ${args[0]} ${args[1]}
        let arr = message.content.split(' ').slice(2)
        let ben = arr.join(' ')
        console.log(arr.join(' '))
        db.set(`${args[0]}`,`${ben}`)
        message.channel.send({content: `"${args[0]}" kelimesinin cevabı "${ben}" olarak kaydedilmiştir`})
    }

  return;
});





client.on("messageCreate", async message => {

    const db = new bendb({
        path: `./database.json`,
        seperator: ".",
        spaces: 10
    });
    if (message.author.bot || !message.guild || message.content.toLowerCase().startsWith(prefix)) return;

 let command = message.content.split()

 let arr = message.content.split(' ').slice(1)

 if(db.get(`${command}`) === null) {
    message.channel.send({content: `girdiğiniz ${command} kelimesi bulunamadı, lütfen bu kelimeyi oluşturmak için ${prefix}kelime ${command} 'yazılacak şey' diye yazabilir misiniz.`})
 }
 else if(db.get(`${command}`) !== null){
  message.channel.send({content:`${db.get(`${command}`)}`})
 }
});
