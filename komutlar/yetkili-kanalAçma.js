const Discord = require('discord.js');

exports.run = async (client, message, args, guild) => {
  let kanalİsmi = args.slice(1).join(' ');
  
  if (!args[0]) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olman gerek.")
      message.channel.send(":no_entry: Kanal açmak için birkaç parametreler bulunmaktadır, Parametreler: Ses ve yazı. `/kanal-aç ses, yazı [<kanal ismi>]`")
  }
  
  if (args[0] === "ses") {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olman gerek.")
    if (!kanalİsmi) return message.channel.send(":no_entry: Oluşturulacak olan ses kanalının ismini giriniz. `/kanal-aç ses [<kanal ismi>]`")
      message.guild.createChannel(kanalİsmi, 'voice')
      message.channel.send(`${process.env.basarili} Başarıyla, \`${kanalİsmi}\` adlı ses kanalı oluşturuldu.`)
  }
  
  if (args[0] === "yazı") {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olman gerek.")
    if (!kanalİsmi) return message.channel.send(":no_entry: Oluşturulacak olan yazı kanalının ismini giriniz. `/kanal-aç yazı [<kanal ismi>]`")
      message.guild.createChannel(kanalİsmi, 'text')
      message.channel.send(`${process.env.basarili} Başarıyla, \`${kanalİsmi}\` adlı yazı kanalı oluşturuldu.`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanal', 'channel', 'kanal-aç'],
  permLevel: 3
};

exports.help = {
  name: 'kanal',
  description: 'neblm',
  usage: 'kanal'
};
