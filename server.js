const loglar = require('./ayarlar.json');
const {
    stripIndents,
    oneLine
} = require('common-tags');
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require('express');
const app = express();
const http = require('http');
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Istanbul");
const Jimp = require('jimp');
const GIFEncoder = require('gifencoder');
const db = require('quick.db')
const weather = require('weather-js');
const arraySort = require('array-sort');
const table = require('table');
const figlet = require('figlet');
const moment2 = require('moment');
require('moment-duration-format');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
const fs = require("fs");
const ms = require('ms');
const chalk = require('chalk')
const { Command } = require('discord.js-commando');
const request = require('request-promise');
const snekfetch = require('snekfetch');
const DBL = require("dblapi.js");
const util = require('util');
const urlExists = util.promisify(require('url-exists'));
const oneLine2 = require('common-tags').oneLine;
const commando = require('discord.js-commando');
require('./util/eventLoader')(client);

client.queue = new Map()

const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMTQ0NTY3NzA5MjU2OTEyNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQyNDc3MzA5fQ.P3pBPjpaOIW0ZkWsnUn_1kF9g10ikulmAa6tbnXucUs', client); 

app.get("/", (request, response) => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Koruma Inc.: '${Date.now()}' aktifim olm ne bakıyon aq`);
  response.sendStatus(200);
});

app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 10000);
  setInterval(() => {
    http.get(`http://korumabin.glitch.me/`);
  }, 10000);

//

client.on('messageReactionAdd', (reaction, user) => {
    /*if (reaction.emoji.id == "537246439789821953"){
      reaction.message.guild.members.get(user.id).addRole("545918036658356225").catch(error => { 
        return console.log("WeracsAPIError: Rol verilemedi")
    });//siyah
    }*/
  
    if (reaction.emoji.name == "⛔"){
      reaction.message.guild.members.get(user.id).addRole("550770567075201086").catch(error => { 
        return console.log("KorumaAPIError: Rol verilemedi")
    });//nsfw
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    /*if (reaction.emoji.id == "537246439789821953"){
      reaction.message.guild.members.get(user.id).removeRole("545918036658356225").catch(error => { 
        return console.log("WeracsAPIError: Rol verilemedi")
    });//siyah
    }*/
  
    if (reaction.emoji.name == "⛔"){
      reaction.message.guild.members.get(user.id).removeRole("550770567075201086").catch(error => { 
        return console.log("KorumaAPIError: Rol verilemedi")
    });//nsfw
    }
});
//

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Koruma - Yüklenen komutlar: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
//

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === loglar.sahip) permlvl = 4;
  return permlvl;
};

client.on('message',async message => {
if (message.content === '<@501445677092569124>') {
  let p = await db.fetch(`prefix_${message.guild.id}`);
    message.channel.send(`:no_entry: Bu sunucuda prefix \`${p || '!! '}\` olarak ayarlanmıştır, komutları kullanırken başına ayarlanan ön-ek'i kullanınız, değiştirmek için \`${p || '/'}prefix\` komudunu kullanınız.`)
}
});

  //Yasaklamalar!
client
     .on('guildBanRemove', async (guild, member, msg) => {
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**${member}** kullanıcısının yasaklaması kaldırıldı.`)
                        .setColor('ORANGE')
                        .setFooter(`Koruma - Log ID: ${member.id}`, client.user.avatarURL)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] '${guild.name}' adlı sunucuda '${member}' kullanıcının yasaklanması kaldırıldı.`)
    else guild.channels.get(membermodChannel).send(embed)      
        })
 //Kanal oluşturuldu.
/*        .on('channelCreate', async (channel, guild, msg) => {
                        if (channel.type === "text") {
                                var embed = new Discord.RichEmbed()
                                .setColor('ORANGE')
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`<#${channel.id}> adlı metin kanalı oluşturuldu.`)
                                .setFooter(`Koruma - Log ID: ${msg.guild.id}`, client.user.avatarURL)
                                 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] '${guild.name}' adlı sunucuda '${channel.name}' adlı metin kanalı oluşturuldu.`)
    else channel.guild.channels.get(membermodChannel).send(embed)};
                        if (channel.type === "voice") {
                                var embed = new Discord.RichEmbed()
                                .setColor('ORANGE')
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} adlı ses kanalı oluşturuldu.`)
                                .setFooter(`Koruma - Log ID: ${msg.guild.id}`, client.user.avatarURL)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] '${guild.name}' adlı sunucuda '${channel.name}' adlı ses kanalı oluşturuldu.`)
    else channel.guild.channels.get(membermodChannel).send(embed)}
                        })
    // Kanal silindi.           
        .on('channelDelete', async (channel, guild, msg) => {
 if (channel.type === "text") {
                                let embed = new Discord.RichEmbed()
                                .setColor('ORANGE')
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} adlı metin kanalı silindi.`)
                                .setFooter(`Koruma's' Inc. - Yetkili: ${msg.author.username}`, client.user.avatarURL)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] '${guild.name}' adlı sunucuda '${channel.name}' adlı metin kanalı silindi.`)
    else channel.guild.channels.get(membermodChannel).send(embed)};
                        if (channel.type === "voice") {
                                let embed = new Discord.RichEmbed()
                                .setColor('ORANGE')
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} ses kanalı silindi.`)
                                .setFooter(`Koruma - Log ID: ${msg.guild.id}`, client.user.avatarURL)
 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] '${guild.name}' adlı sunucuda '${channel.name}' adlı ses kanalı silindi.`)
    else channel.guild.channels.get(membermodChannel).send(embed)}      
        })*/
//

client.on('emojiCreate', async emoji => {
  let embedds9 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Oluşturuldu!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`<:${emoji.name}:${emoji.id}> - ${emoji.name} Adlı Emoji Oluşturuldu!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds9)
})

client.on('emojiDelete', async emoji => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Silindi!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`<:${emoji.name}:${emoji.id}>  -  ${emoji.name} Adlı Emoji Silindi!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds0)
})

client.on('roleCreate', async (role, member) => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("ORANGE")
        .setAuthor(`Rol oluşturuldu.`)
        //.setThumbnail(role.guild.iconURL)
        .setDescription(`<@&${role.id}> adlı rol oluşturuldu.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else role.guild.channels.get(membermodChannel).send(embedds0)
})

/*client.on('roleUpdate', async (oRole, nRole) => {
    let embed = new Discord.RichEmbed()
      .setColor('ORANGE')
      .setAuthor(`Rol güncellendi.`)
      .addField("Eski rol:", `${oRole.name}`)
      .addField("Yeni rol:", `${nRole.name}`)
    let membermodChannel = await db.fetch(`membermodChannel_${nRole.guild.id}`)
    nRole.guild.channels.get(membermodChannel).send(embed)
})*/

client.on('roleDelete', async role => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("ORANGE")
        .setAuthor(`Rol silindi.`)
        .setDescription(`<@&${role.id}> adlı rol silindi.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    role.guild.channels.get(membermodChannel).send(embedds0)  
})
client.on('message', async message => {
   let p = await db.fetch(`prefix_${message.guild.id}`);
  let prefix;
  if (p == null) prefix = '/'
  else prefix = `${p}`
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
     if (command === "rastgeleüye") {
        const rastgele = message.guild.members.random().id
        const tada = (client.emojis.find("name", "Korumastada").toString())
        message.channel.send(`Tebrikler, şanslı üye: <@${rastgele}> ${tada}`);
        
    } 
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    });                                          

client.on('guildCreate', async guild => {
  const girismesaj = [
    ":inbox_tray: | **Koruma's Dev** sunucunuza başarıyla eklendi.",
    " ",
    "**Koruma** siz ve üyelerinize yardımcı olmak üzerine kurulup,",
    "Her geçen gün kendini yenilemektedir.",
    "Eğerki sizde botumuza destek çıkmak istiyorsanız sunucularınızda kullanabilirsiniz. :yellow_heart:",
    " ",
    "**Koruma** - Resmi Destek Sunucusu:",
    "https://discord.gg/Wf3ChWC",
  ]
  guild.owner.send(girismesaj)
  console.log(`Koruma Bilgilendirme: ${guild.name}. sunucuya katıldım!`);
})

client.on('guildCreate', guild => {
  let giris = new Discord.RichEmbed()
    .setColor(0x36393E)
    .setDescription(`:inbox_tray: **_Bot bir sunucuya eklendi._ :yellow_heart:**\n:white_small_square: | **Bot,** ${guild.name} **adlı sunucuya eklendi.**\n:white_small_square: | **Sunucunun sahibi**: ${guild.owner}\n:white_small_square: | **Sunucuda bulunan kişi**: ${guild.memberCount}`)
    .setFooter(`Koruma  Log | Sunucu ID: ${guild.ownerID}`, client.user.avatarURL)
  client.channels.get('508617972328431617').send(giris);
});
         
client.on('guildDelete', guild => {
  let cikis = new Discord.RichEmbed()
    .setColor(0x36393E)
    .setDescription(`:outbox_tray: **_Bot bir sunucudan atıldı._ :frowning:**\n:white_small_square: | **Bot,** ${guild.name} **adlı sunucudan çıkarıldı.**\n:white_small_square: | **Sunucunun sahibi**: ${guild.owner}`)
    .setFooter(`Koruma Log | Sunucu ID: ${guild.ownerID}`, client.user.avatarURL)
  client.channels.get('508617972328431617').send(cikis);
});

client.on('message', message => {
if (message.channel.type === 'dm') {
  if (message.author.bot) return;
  const embed = new Discord.RichEmbed()
    .setColor(0xffa300)
    .setAuthor(`${message.author.username} kullanıcısı bota mesaj attı.`, message.author.avatarURL)
    .addField("Mesaj içeriği", '```' + message.content + '```')
    .setFooter(`Kanal: DM | Kullanıcı: ${message.author.tag}`, client.user.avatarURL)
    .setTimestamp()
  client.channels.get('523970061673693194').send(embed)
}
});
const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', async () => {
  wait(1000);
  client.guilds.forEach(g => {
    g.fetchInvites()
    .catch(error => { 
        return console.log("Koruma: DiscordAPIError: Missing Permissions")
    })
    .then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', async (member, guild, message) => {
let role = await  db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = await db.fetch(`autoRole_${member.guild.id}`)
 let i = await db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {
  
  if (!i) return 
  member.addRole(member.guild.roles.get(otorol))
  member.guild.channels.get(i).send(`${process.env.basarili} \`${member.user.tag}\` adlı kullancıya \`${role}\` rolü verildi.`) 
} catch (e) {
 console.log(e)
}
}
});

  const sqlite = require('quick.db');

client.on('message', async (message, guild) => {
  let p = await db.fetch(`prefix_${message.guild.id}`);
  let prefix;
  if (p == null) prefix = '/'
  else prefix = `${p}`
  const argüman = message.content.substring(prefix.length).split(" ");
  const komut = argüman.shift().toLowerCase();
  if(komut === "responder" || komut == "yanıtlayıcı" || komut == 'özelkomut') {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Bu komutu kullanacak yetkin bulunmuyor.')
  if (!argüman[0]) return message.channel.send("Komut ismini boş bırakamazsınız.")
  let yanıt = db.fetch(`yanıtlayıcı.${message.guild.id}`)
  if (yanıt == null) db.set(`yanıtlayıcı.${message.guild.id}`, [])
   
  if (argüman[0] == "ekle"){
  let [birinci, ikinci] = argüman.slice(1).join(' ').split(':')
  if (!ikinci) return message.channel.send('Yanıtlayıcıyı \`:\` ile ayırınız.')
  let veri = {
  isim: birinci,
  yanıt: ikinci,
  sahip: message.author.username
  };
  sqlite.push(`yanıtlayıcı.${message.guild.id}`, veri)
  message.channel.send(`**${veri.isim}** adlı komut eklendi.`)
  }

  if (argüman[0] == "bilgi"){
  let yanıt = db.fetch(`yanıtlayıcı.${message.guild.id}`)[argüman[1] - 1]
  if (yanıt == null && yanıt == []) return message.channel.send("Girilen numarada yanıtlayıcı bulunmuyor.")
  const ışıklımışıklı = new Discord.RichEmbed()
  .setColor(0xffa300)
  .setAuthor(message.guild.name, message.guild.iconURL || client.user.avatarURL)
  .setDescription(`**İsim:** ${yanıt.isim}\n**Yanıt:** ${yanıt.yanıt}\n**Sahip:** ${yanıt.sahip}`)
  message.channel.send(ışıklımışıklı)
  }
   
  if (argüman[0] == "liste"){
  let sayı = 0;
  let yanıt = db.fetch(`yanıtlayıcı.${message.guild.id}`)
  if (yanıt == null && yanıt == []) return message.channel.send("Liste boş görünüyor.")
  const ışıklımışıklı = new Discord.RichEmbed()
  .setColor(0xffa300)
  .setAuthor(message.guild.name, message.guild.iconURL || client.user.avatarURL)
  .setDescription(`${yanıt.map(duldul => `**${++sayı}** \`${duldul.isim}\`\n**Yanıt:** ${duldul.yanıt}\n**Sahip:** ${duldul.sahip}\n`)}`)
  .setFooter(`Toplam ${yanıt.length} yanıtlayıcı bulunuyor.`)
  message.channel.send(ışıklımışıklı)
  }
   
  if (argüman[0] == "temizle"){
  let yanıt = db.fetch(`yanıtlayıcı.${message.guild.id}`)
  if (yanıt == null && yanıt == []) return message.channel.send("Liste boş görünüyor.")
  sqlite.delete(`yanıtlayıcı.${message.guild.id}`)
  message.channel.send("Yanıtlayıcı listesi temizlendi.")
  }
 }
})

client.on('message', async message => {
const cmd = message.content.toLowerCase().substring().split(" ");
if (message.author.bot) return;
if (message.author.id === client.user.id) return;
if (message.channel.type === "dm") return;
if (message.author.bot) return;
let yanıtlama = await db.fetch(`yanıtlayıcı.${message.guild.id}`)
if (yanıtlama == null) return;
yanıtlama.map(duldul => {
    if (message.content.toLowerCase() === duldul.isim) {
        message.channel.send(duldul.yanıt)
    }
})
});

client.on('message', async message => { 
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || loglar.prefix
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`**${message.author.tag}**, adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}, **${kullanıcı.tag}** AFK durumunda: \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`**${message.author.tag}**, adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    let i = await db.fetch(`kufur_${msg.guild.id}`)
      
    if (i == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "göt", "amına", "oruspu", "orosbu", "dalyarak", "orrosbu", "orr", "orusbu evladı", "ananın amını", "şerefsiz", "pezo", "pezevenk", "şero", "p1ç", "am evladı", "meme", "yarr", "şiktir", "siktir git", "siktir", "got", "bok", "sg", "ananı", "sktr", "pipi", "popo", "sex", "seks", "porno", "porn", "sakso", "sıktır", "örüspü", "öruspu", "süraleni"];
        if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
            try {
              if (!msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.delete();
                    db.add(`projectLAC_${msg.author.id}_küfür`, '+1')  
                    return msg.channel.send(`${msg.author.tag}, küfür etmesene koçm`).then(msg => msg.delete(3000));
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
      if (!i) return;
      });

client.on('messageUpdate', async (oldMsg, newMsg) => {  
	if (!oldMsg.guild) return;
    if (oldMsg.author.bot) return;
    let i = await db.fetch(`kufur_${oldMsg.guild.id}`)
    
    if (i == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "göt", "amına", "oruspu", "orosbu", "dalyarak", "orrosbu", "orr", "orusbu evladı", "ananın amını", "şerefsiz", "pezo", "pezevenk", "şero", "p1ç", "am evladı", "meme", "yarr", "şiktir", "siktir git", "siktir", "got", "bok", "sg", "ananı", "sktr", "pipi", "popo", "sex", "seks", "porno", "porn", "sakso", "sıktır", "örüspü", "öruspu", "süraleni"];
        if (kufur.some(word => newMsg.content.toLowerCase().includes(word))) {
        try {
            if (!oldMsg.member.hasPermission("ADMINISTRATOR")) {
                newMsg.delete();
                db.add(`projectLAC_${oldMsg.author.id}_küfür`, '+1')
                return oldMsg.channel.send(`${oldMsg.author.tag}, sakın deneme mesajını düzenlesende küfür edemezsin.`).then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
	});
      
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklam_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".rf.gd", ".az", ".party",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('L.A.C: Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("L.A.C: Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    db.add(`projectLAC_${msg.author.id}_reklam`, '+1') 
                    return msg.channel.send(`${msg.author.tag}, reklam yapmasana koçm`).then(msg => msg.delete(3000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    

client.on('messageUpdate', async (oldMsg, newMsg) => {  
    if (!oldMsg.guild) return;
    if (oldMsg.author.bot) return;
      
    let i = await db.fetch(`reklam_${oldMsg.guild.id}`)  
        if (i == 'acik') {
            const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".rf.gd", ".az", ".party",];
            if (reklam.some(word => newMsg.content.toLowerCase().includes(word))) {
              try {
                if (!oldMsg.member.hasPermission("ADMINISTRATOR")) {
                  newMsg.delete();
                  
                  let embed = new Discord.RichEmbed()
                  .setColor(0xffa300)
                  .setFooter('L.A.C: Reklam engellendi.', client.user.avatarURL)
                  .setAuthor(oldMsg.guild.owner.user.username, oldMsg.guild.owner.user.avatarURL)
                  .setDescription("L.A.C: Reklam sistemi, " + `***${oldMsg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                  .addField('Reklamı yapan kişi', 'Kullanıcı: '+ oldMsg.author.tag +'\nID: '+ oldMsg.author.id, true)
                  .addField('Engellenen mesaj', oldMsg.content, true)
                  .setTimestamp() 
                  oldMsg.guild.owner.user.send(embed)
                  db.add(`projectLAC_${oldMsg.author.id}_reklam`, '+1') 
                  return oldMsg.channel.send(`${oldMsg.author.tag}, reklam yapmasana koçm`).then(msg => msg.delete(3000));
                  
                }              
              } catch(err) {
                console.log(err);
              }
            }
        }
        if (!i) return;
        });

client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD'){
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
          if (db.has(`kayıt_${msg.guild.id}`)) {
            if (user.id != client.user.id){
              let mesaj = db.get(`kayıtmesaj_${msg.guild.id}`)
              let srol = db.get(`kayıtrol_${msg.guild.id}`)
              if (msg.id == mesaj) {
                var roleObj = msg.guild.roles.get(srol);
                var memberObj = msg.guild.members.get(user.id);
                    memberObj.removeRole(roleObj)
                if (db.has(`kayıtotorol_${msg.guild.id}`)) {
                  memberObj.addRole(db.get(`kayıtotorol_${msg.guild.id}`))
                } 
              }
            }
          }
        })
        }
});
    
client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.has(`capsEngel_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.reply('bu sunucuda capslock engeli vardır, dikkatli olun.').then(m => m.delete(1500))
       }
       }
     }
   }
  }
});


client.login(loglar.token);