const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send(':no_entry: Reklam filtresini kullanmak için gerekli parametreler vardır, Parametreler: aç, kapat. `/reklam [<parametre>]`')
  
  if (args[0] == 'aç') {
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send(`${process.env.basarili} Başarıyla reklam filtresi açıldı, Yönetici yetkisine sahip olmayanların reklamları engellenecektir.`)

  }
  if (args[0] == 'kapat') {
    db.set(`reklam_${message.guild.id}`, 'kapali')
      message.channel.send(`${process.env.basarili} Başarıyla reklam filtresini kapattınız, Artık reklamlar engellenmeyecek.`)
   
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklam', 'reklam-filtresi', 'reklamfiltresi', 'reklam-filtre', 'reklamfiltre'],
  permLevel: 0
};

exports.help = {
  name: 'reklam-engelleme',
  description: 'nblm',
  usage: 'reklam-engelleme'
};
