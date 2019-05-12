const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
    let kanal = message.mentions.channels.first()
    if (!kanal) return message.channel.send("***Komut kullanımını kapatacağınız kanalı etiketleyiniz.***")
  
  if (db.has(`kanal.engel.${kanal.id}`)) {
    await db.delete(`kanal.engel.${kanal.id}`)
    return message.channel.send(`${process.env.basarili} Başarıyla, ${kanal} adlı kanalda komut kullanımı aktif edildi.`)
  } else {
    await db.set(`kanal.engel.${kanal.id}`, kanal.id)
    return message.channel.send(`${process.env.basarili} Başarıyla, ${kanal} adlı kanalda komut kullanımı engellendi. Pasif etmek için \`/kanalengel #${kanal.name}\``)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalengel',
  description: 'nblm',
  usage: 'kanalengel'
};