const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Prefix ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
  let prefixsec = args.slice(0).join(' ');
  if (!prefixsec) return message.channel.send(':no_entry: Prefix ayarlamak için bir prefix belirtiniz. `/prefix +`')
  if (prefixsec.length > 7) return message.channel.send(':no_entry: Ön ek 7 harfden uzun olmamalı!')
  if (prefixsec === '/') return message.channel.send(`${process.env.basarisiz} Botun ana prefixini tekrar ayarlayamazsın.`)
  
  db.set(`prefix_${message.guild.id}`, prefixsec)
  message.channel.send(`${process.env.basarili} Bu sunucuda, başarıyla prefix \`${prefixsec}\` olarak ayarlandı.`)
  
  
  /*if (prefixsec === "sıfırla") {
    db.set(`prefix_${message.guild.id}`, "/")
    message.channel.send(`${process.env.basarili} Başarıyla prefixin sıfırlandı.`)  
  }*/
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ön-ek-ayarla'],
  permLevel: 0
};

exports.help = {
  name: 'prefix',
  description: 'neblm',
  usage: '/ön-ek-ayarla'
};