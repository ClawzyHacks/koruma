const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
     let mesaj = args.join(' ');
     if (mesaj.length < 1) return message.channel.send("⛔ Giriş çıkış mesaj ayarlamak için birşey girmelisin! `/giriş-mesaj {sunucu} sunucusuna hoşgeldin, {uye}`"); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
     let memberGiris = await db.fetch(`memberGiris_${message.guild.id}`);
     if (memberGiris == null) memberGiris = `{member} sunucuya hoşgeldin.`
        if (args.length < 1) return message.channel.send(":LOXYsX: Giriş çıkış mesajlarını ayarlamak için birşeyler yazmanız gerek.");
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberGiris_${message.guild.id}`, newMessage)
        return message.channel.send(`:LOXYscheckMark: Başarıyla karşılama mesajları ayarlandı, sunucunuza biri girince yazdıklarınız hoşgeldin kanalına yazılacaktır.`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'giriş-mesaj',
  description: 'Giriş çıkış mesajları.',
  usage: '-giriş-mesaj'
};