const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix  
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Sayaç ayarlamak için `Yönetici` yetkisine sahip olman gerek.')  
  
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first() || message.channel
  
  if(!args[0]) return message.channel.send(`${process.env.basarisiz} Sayaç ayarlamak için bir sayı ve kanal belirtmelisiniz. \`${prefix}sayaç 100 #sayaç\``)
  if (!sayackanal) return message.channel.send(`${process.env.basarisiz} Sayaç ayarlamak için bir sayı ve kanal belirtmelisiniz. \`${prefix}sayaç 100 #sayaç\``)
  if(isNaN(args[0])) return message.channel.send(`${process.env.basarisiz} Geçerli bir sayı girmelisin.`)
  if(args[0] <= message.guild.members.size) return message.channel.send(`${process.env.basarisiz} Sunucudaki kullanıcı sayısından (${message.guild.members.size}) daha yüksek bir değer girmelisin.`)
  db.set(`sayacSayi_${message.guild.id}`, args[0])
  db.set(`sayacKanal_${message.guild.id}`, message.mentions.channels.first().id)
  message.channel.send(`${process.env.basarili} Sayaç \`${args[0]}\`, sayaç kanalı ${sayackanal} olarak ayarlandı.`)
}
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
 
exports.help = {
  name: 'sayaç',
  description: 'Sayacı ayarlar.',
  usage: 'sayaç <sayı> <#kanal> / sıfırla'
}