const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {  
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
     let mesaj = args.join(' ');
     if (mesaj.length < 1) return message.channel.send("⛔ Sayaç çıkış mesaj ayarlamak için birşey girmelisin! `/sayaç-çıkış Ekipten biri ayrıldı, ekip {sayac} olmaya {toplam-kullanıcı} kişi kaldı.`"); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
     let memberSayac = await db.fetch(`memberSayac_${message.guild.id}`);
     if (memberSayac == null) memberSayac = `{member} sunucuya hoşgeldin.`
        if (args.length < 1) return message.channel.send(`${process.env.basarisiz} Sayaç çıkış mesajı ayarlamak için birşey girmelisin. \`/sayaç-çıkış Ekipten biri ayrıldı, ekip {sayac} olmaya {toplam-kullanıcı} kişi kaldı.\``);
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberSayacCikis_${message.guild.id}`, newMessage)
            return message.channel.send(`${process.env.basarili} Sayaç çıkış mesajı başarıyla ayarlandı.`)
        
    
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sayaç-çıkış',
  description: 'nblm',
  usage: 'sayac-çıkış'
};