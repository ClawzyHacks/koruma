const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let kullanıcı = message.mentions.users.first() || message.author;
  let paket = await db.fetch(`pakets_${kullanıcı.id}`)
  let paketYazi;
  
  if (!args[0]) {
    if (kullanıcı.bot) return message.channel.send(":no_entry: Maalesef, bot veya benzeri üyelerin paketi yoktur.")
    if (paket === "platinum-paket") paketYazi = "Platinum"
    message.channel.send(`${kullanıcı.username}'in, ${paketYazi || "Paket satın almamış veya paket bulunamıyor, almak için `http://bit.ly/loxy-paketal` siteyi ziyaret edebilirsiniz."}`)
  }
  
  if (args[0] === "ver") {
    if(message.author.id !== "245225049882099713" && message.author.id !== "442321157320867841") return message.channel.send(':no_entry: Paket verebilmek için `Bot Sahibi` yetkisine sahip olman gerek.')
    db.set(`pakets_${kullanıcı.id}`, 'platinum-paket')
    message.channel.send(`İşlem başarılı, <@${kullanıcı.id}> adlı kullanıcıya *Platinum* paket verdiniz.`)
    var pakets = client.channels.find('id', '526723881562669056')
    pakets.send(`-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=- \n\nBir kullanıcıya **platinum-paket** verildi! \n\nVeren yetkili: **${message.author.tag} | ${message.author.id}** \nVerilen kişi: **${kullanıcı.tag} | ${kullanıcı.id}**\n\n-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=- \n\n`)
  }
  
  if (args[0] === "al") {
    if(message.author.id !== "245225049882099713" && message.author.id !== "442321157320867841") return message.channel.send(':no_entry: Paketi bir kullancıdan almak için `Bot Sahibi` yetkisine sahip olman gerek.')
      if (paket == null) return message.channel.send("İşlem geçersiz, bu kullanıcıda  paket bulunmamakta!")
      db.delete(`pakets_${kullanıcı.id}`)
      message.channel.send(`İşlem başarılı, <@${kullanıcı.id}> adlı kullanıcıya *Platinum* paket aldınız!`)
      var pakets = client.channels.find('id', '526723881562669056')
      pakets.send(`-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=- \n\nBir kullanıcıdan **platinum-paket** alındı! \n\nAlınan yetkili: **${message.author.tag} | ${message.author.id}** \nAlınan kişi: **${kullanıcı.tag} | ${kullanıcı.id}**\n\n-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=- \n\n`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['paket'],
  permLevel: 0
};

exports.help = {
  name: "paket",
  description: "nblm",
  usage: "paket"
};
