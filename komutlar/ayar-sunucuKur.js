const Discord = require('discord.js');
const db = require('quick.db');
const { stripIndents } = require('common-tags');

exports.run = (client, message, params) => {
if (message.guild.id === '497762642837110800') return message.channel.send("Bu sunucuda sunucukur yasaklanmıştır.")
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olman gerekli.")
  message.channel.send("Sunucu kurulum işlemini onaylıyorsanız `evet` eğer onaylamıyorsanız `hayır` olarak belirtiniz.").then(() => {
  
  const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 10000
    }).then(collected => {
      if (collected.first().content === 'hayır') {
        return message.reply("İşlem iptal edildi.");
      }});
  
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 10000
    }).then((collected) => {
      if (collected.first().content === 'evet') {
      message.guild.channels.forEach(u => {
        u.delete()
     })
    message.author.send(`${message.author}, Merhaba! ben ${client.user.username} sunucu kurulum mühendisiyim.*${message.guild.name}* adlı sunucuyu şuan kuruyorum. Arkana yaslan ve kahveni al, kurulmasını bekle!`)
    message.guild.createChannel("Sunucu Hakkında", "category").then(kategori => {
    message.guild.createChannel("kurallar", "text").then(kurallar => {
    message.guild.createChannel("duyurular", "text").then(duyurular => {
      kurallar.setParent(kategori.id)  
      duyurular.setParent(kategori.id)  
      kurallar.send(stripIndents`
        ℹ \`${message.guild.name}'na hoşgeldiniz.\`
        Bu sunucuda bulunduğunuz süre boyunca aşağıdaki kuralları kabul etmiş sayılırsınız, bu yüzden takip edin.

        ■ | Argo kelimeler, küfür vb. şeyler yasaktır. (Aşırı derecede kullanılmadığı sürece serbesttir.) - **KICK + BAN**
        ■ | Rahatsız edici paylaşımlar yapmak yasaktır (Örn: +18, korku, cinsellik vs.). - **UYARI + BAN**
        ■ | Spam yapmak yasaktır. - **UYARI + BAN**
        ■ | Reklam yapmak yasaktır. - **UYARI + BAN**
        ■ | Din, dil, ırk ve siyaset hakkında konuşmak yasaktır. - **UYARI + BAN**
        ■ | Herkes birbirine saygılı davranmalıdır. - **KICK + BAN**
        ■ | Sunucu ayarları hakkında bir değişiklik istenemez. - **KICK**
        ■ | Kimsenin tercihi kimseyi ilgilendirmez. - **KICK**
        ■ | Tartışma çıkarmak, tartışmaya dahil olmak yasaktır. - **KICK**
        ■ | Yönetimce verilen kararlara veya sisteme karşı çıkılamaz. Ancak aşırıya kaçılmadığı sürece görüş belirtilebilir. - **KICK**
        ■ | Başkalarını rahatsız edecek davranışlarda bulunmak yasaktır. - **BAN**
        ■ | Kimse başka bir kişiye üstünlük gösteremez. - **KICK**
        ■ | Aşırı derecede emoji ve büyük harf kullanımı yasaktır. - **KICK + BAN**
        ■ | Ahlaka karşı davranışlar sergilemek yasaktır. - **BAN**
        ■ | Başkalarını rahatsız etmek yasaktır. - **UYARI + BAN**
        ■ | Oynuyor.. kısmına küfür, reklam vb. içerikler yazmak yasaktır. - **UYARI + BAN**
        ■ | İsim başına "!" ve benzeri semboller koymak yasaktır. - **UYARI + KICK**
        ■ | Videodayım odasındaki kişiyi etiketlemek yasaktır. - **UYARI + KICK**
        ■ | Logları kirletecek olaylar (Odalarda hızlı gezmek vb.) yapmak yasaktır. - **UYARI + KICK**
`)
  
  message.guild.createChannel("Topluluk", "category").then(kategor => {
  message.guild.createChannel("genel-sohbet", "text").then(sohbet => {
  message.guild.createChannel('medya', "text").then(medya => {
  message.guild.createChannel('bot-kullanım', "text").then(bot => {
    sohbet.setParent(kategor.id)
    medya.setParent(kategor.id)
    bot.setParent(kategor.id)
      
  message.guild.createChannel("Denetim", "category").then(katego => {
  message.guild.createChannel("otorol", "text").then(otorol => {
  message.guild.createChannel('log', 'text').then(modlogg => {
  message.guild.createChannel('giriş-çıkış', 'text').then(girişş => {
    otorol.setParent(katego.id)  
    modlogg.setParent(katego.id)  
    girişş.setParent(katego.id)
    db.set(`otorolKanal_${message.guild.id}`, otorol.id)
    db.set(`membermodChannel_${message.guild.id}`, modlogg.id)
    db.set(`hgKanal_${message.guild.id}`, girişş.id)
})
})
})
})
})
})
})
})
})
})
})
  const embed = new Discord.RichEmbed()
    .setColor(0xffa300)
    .setAuthor("Sunucu Mühendisi: Sunucu başarıyla kuruldu.", client.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setDescription(`Sunucu mühendisi bir sunucuya kurulum yaptı.
    \n
    Kurulum için talep edilen sunucu adı: ${message.guild.name}
    Kurulum için talep edilen sunucu ID: ${message.guild.id}
    Kurulumu talep eden üye: ${message.author.tag}
    Kurulumu talep eden üye ID: ${message.author.id}
    `)
  client.channels.get('561688107666243584').send(embed)
}})})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucukur',
  description: 'nblm',
  usage: 'sunucukur'
};