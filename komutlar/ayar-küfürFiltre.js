const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send(':no_entry: Küfür filtresini kullanmak için gerekli parametreler vardır, Parametreler: aç, kapat. `/küfür [<parametre>]`')
  
  if (args[0] == 'aç') {
    db.set(`kufur_${message.guild.id}`, 'acik')
      message.channel.send(`${process.env.basarili} Başarıyla küfür filtresi açıldı, Yönetici yetkisine sahip olmayanların küfürleri engellenecektir.`)

  }
  if (args[0] == 'kapat') {
    db.set(`kufur_${message.guild.id}`, 'kapali')
      message.channel.send(`${process.env.basarili} Başarıyla küfür filtresini kapattınız, Artık küfürler engellenmeyecek.`)
   
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfür', 'küfür-filtresi', 'küfürfiltresi', 'küfür-filtre', 'küfürfiltre'],
  permLevel: 0
};

exports.help = {
  name: 'küfür-engelleme',
  description: '[Admin Komutu]',
  usage: 'küfür-engelleme'
};
