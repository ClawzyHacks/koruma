const Discord = require('discord.js');
const db = require('quick.db');

exports.run =async (client, message, params, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
    let logkanali = message.mentions.channels.first();
    if (!logkanali) return message.channel.send('Davet kanalı ayarlamak için **bir kanal etiketlemeniz gerekli!** `/dkanal #kanal`')
    db.set(`davetKanal_${message.guild.id}`, message.mentions.channels.first().id)
    let i = await db.fetch(`davetKanal_${message.guild.id}`)
    message.channel.send(`${process.env.basarili} Tebrikler, davet kanalı <#${i}> olarak ayarlandı.`)         
}
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['davetkanalı', 'dkanal'],
 permLevel: 0
};

exports.help = {
 name: 'davetkanalayarla',
 description: 'nblm',
 usage: 'davetkanalı'
};