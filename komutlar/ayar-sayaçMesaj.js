const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {  
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
     let mesaj = args.join(' ');
     if (mesaj.length < 1) return message.channel.send("⛔ Sayaç mesaj ayarlamak için birşey girmelisin! `/sayaç-mesaj Ekibe yeni bir katıldı, ekip {sayac} olmaya {toplam-kullanıcı} kişi kaldı.`"); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
     let memberSayac = await db.fetch(`memberSayac_${message.guild.id}`);
     if (memberSayac == null) memberSayac = `{member} sunucuya hoşgeldin.`
        if (args.length < 1) return message.channel.send(":LOXYsX: Sayaç mesajlarını ayarlamak için birşeyler yazmanız gerek. \n\n**Not**: `Bu mesajlar platinum-üye adlı pakete sahip olan kişiler 0için geçerli değildir.`");
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberSayac_${message.guild.id}`, newMessage)
            return message.channel.send(`:LOXYscheckMark: Başarıyla sayaç mesajı ayarlandı, artık sayaç mesajları ayarladığınız şekildedir.`)
        
    
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['smesaj', 's-mesaj', 'sayaç-mesaj'],
  permLevel: 0
};

exports.help = {
  name: 'smesaj',
  description: 'Giriş çıkış mesajları.',
  usage: 'sayac-mesaj'
};