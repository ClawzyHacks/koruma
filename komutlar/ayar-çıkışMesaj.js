const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
       if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
       let mesaj = args.join(' ');
       if (mesaj.length < 1) return message.channel.send("⛔ Çıkış mesajı olarak ayarlamak istediğiniz yazıyı belirtiniz. `/çıkış-mesaj {uye} sunucudan çıktı.`"); 
      
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`cikisMesaj_${message.guild.id}`, newMessage)
        return message.channel.send(`${process.env.basarili} Çıkış mesajı başarıyla ayarlandı.`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çıkış-mesaj',
  description: 'nblm',
  usage: 'çıkış-mesaj'
};