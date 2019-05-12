const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send(':no_entry: Capslock filtresini kullanmak için gerekli parametreler vardır, Parametreler: aç, kapat. `/capslock [<parametre>]`')
  
  if (args[0] == 'aç') {
    db.set(`capsEngel_${message.guild.id}`, 'var')
      message.channel.send(`${process.env.basarili} Başarıyla capslock filtresi açıldı, Yönetici yetkisine sahip olmayanların tamamen büyük yazılan kelimeler engellenecektir.`)

  }
  if (args[0] == 'kapat') {
    db.delete(`capsEngel_${message.guild.id}`)
      message.channel.send(`${process.env.basarili} Başarıyla capslock filtresini kapattınız, Artık tamamen büyük yazılan kelimeler engellenmeyecek.`)
   
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslock'],
  permLevel: 0
};

exports.help = {
  name: 'capsengel',
  description: 'nblm',
  usage: 'capsengel'
};
