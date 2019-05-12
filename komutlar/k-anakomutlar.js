const Discord = require('discord.js');
const db = require("quick.db");
   
exports.run = async (client, message, args) => {
  let p = await db.fetch(`prefix_${message.guild.id}`);
  let prefix;
  if (p == null) prefix = '/'
  else prefix = `${p}`
    const yardım = new Discord.RichEmbed()
      .setColor(0xEEC000)
      .setDescription(`
        :white_small_square: | **${prefix}panel** - Botta sunucu için ayarladığınız özellikleri görürsünüz.
        :white_small_square: | **${prefix}sayaç** - Belirlediğiniz sayıya kadar sayan bir sayaç ayarlar.
        :white_small_square: | **${prefix}otorol** - Ayarladığınız rolü yeni gelen herkese verir.
        :white_small_square: | **${prefix}gkanal** - Hoşgeldin mesajlarının gönderileceği yeri seçersiniz.
        :white_small_square: | **${prefix}sa-as** - Botun sa yazılınca aleyküm selam diye cevap vermesini ayarlarsınız.
        :white_small_square: | **${prefix}küfür-filtresi** - Küfür filtresini açıp kapatırsınız.
        :white_small_square: | **${prefix}giriş-mesaj** - Giriş yapınca ayarlanan hoşgeldin kanalında ne yazacağını seçersiniz.
        :white_small_square: | **${prefix}çıkış-mesaj** - Çıkış yapınca ayarlanan çıkış kanalında ne yazacağını belirlersiniz.  
        :white_small_square: | **${prefix}sayaç-mesaj** - Sayaç giriş mesajını ayarlarsınız.
        :white_small_square: | **${prefix}sayaç-çıkış** - Sayaç çıkış mesajını ayarlarsınız.
        :white_small_square: | **${prefix}sunucukur** - Bot sizin için bir sunucu kurar.
        :white_small_square: | **${prefix}stat** - Sunucu istatistiklerini gösteren panel kurar.  
        :white_small_square: | **${prefix}everyone** - Everyone atılıp atılmamasını ayarlar.
        :white_small_square: | **${prefix}ototag** - Ototag ayarlarsanız.   
        :white_small_square: | **${prefix}ototagkanal** - Ototag kanalını ayarlarsınız..
        :white_small_square: | **${prefix}davetkanalı** - Belirlediğiniz kanalı davet kanalı olarak ayarlar.
        :white_small_square: | **${prefix}kayıt** - Kayıt sistemi.
        :white_small_square: | **${prefix}kanalengel** - Komut kullanımı engelleyeceğiniz kanalı belirlersiniz.
        :white_small_square: | **${prefix}capsengel** - Tamamen büyük yazılı kelimeleri engeller.
        \n**[Davet](https://discordapp.com/oauth2/authorize?client_id=501445677092569124&scope=bot&permissions=2146958847)** | **[API](https://api-loxys.glitch.me/)**`)
      .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
    message.channel.send(yardım)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'anakomutlar',
  description: 'Ana komutlar!',
  usage: '/anakomutlar'
};