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
          :white_small_square: | **${prefix}ban** - Belirtilen kullanıcıyı sunucudan yasaklar.
          :white_small_square: | **${prefix}kick** - Belirtilen kullanıcıyı sunucudan uzaklaştırır.
          :white_small_square: | **${prefix}uyar** - Belirtilen kullanıcıyı uyarır.
          :white_small_square: | **${prefix}temizle** - Belirtilen sayı kadar sohbeti temizler.
          :white_small_square: | **${prefix}sustur** - Etiketlenen kullanıcıyı belirlenen süreyle susturur.
          :white_small_square: | **${prefix}sunucu** - Sunucu hakkında bilgi alırsınız.
          :white_small_square: | **${prefix}sunucuresmi** Sunucunun resmini gösterir.
          :white_small_square: | **${prefix}sunucu roller** - Sunucudaki rolleri gösterir.
          :white_small_square: | **${prefix}sunucu emojiler** - Sunucudaki emojileri gösterir.
          :white_small_square: | **${prefix}reklamtaraması** - Kullanıcıların oynuyor kısmında reklam varmı diye tarar.
          :white_small_square: | **${prefix}rastgeleüye** - Kullanıcıların arasından rastgele bir kişi seçer.
          :white_small_square: | **${prefix}oylama** - Oylama yapar.
          :white_small_square: | **${prefix}kilit** - Belirtilen süre kadar sohbeti kilitler.
          :white_small_square: | **${prefix}çekiliş** - Belirtilen kanalda ve sürede çekiliş yapar.
          :white_small_square: | **${prefix}kanal** - Yazı kanalı veya ses kanalı açmanıza yardımcı olur.
          \n**[Davet](https://bit.ly/loxys-davet)** | **[API](https://api-loxys.glitch.me/)**`)
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
  name: 'yetkili',
  description: 'Yetkili komudu!',
  usage: '/yetkili'
};