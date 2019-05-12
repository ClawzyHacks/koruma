const Discord = require('discord.js');
const db = require("quick.db");
   
exports.run = async (client, message, args, guild) => {
  let p = await db.fetch(`prefix_${message.guild.id}`);
  let prefix;
  if (p == null) prefix = '/'
  else prefix = `${p}`
    const yardım = new Discord.RichEmbed()
      .setColor(0xffa500)
      .setAuthor(`Loxy`, client.user.avatarURL)
      .setDescription("[Botu sunucuya ekle](https://www.bit.ly/loxys-davet) | [Anlık istatistik](https://www.anlikistatistik.com/loxys-dev) | [Destek Sunucusu](https://discord.gg/A8CwfTG)\n\n**Ping**: " + client.ping + "ms!\n\n")
      .setThumbnail(client.user.avatarURL)
      .addField(`Loxy's Dev - Komutlar`, `
        :white_small_square: | **${prefix}anakomutlar**: Sunucu için gerekli olan birkaç komutlar.
        :white_small_square: | **${prefix}yetkili**: Sunucuyu yönetmek için gerekli olan komutlar!
        :white_small_square: | **${prefix}kayıtsistemi**: Sunucuda kayıt sistemi için yapmanız gereken talimatları gösterir.
        `)   
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
    message.channel.send(yardım)
   await message.react('🇹');
   await message.react('🇲');
  console.log(`Koruma Bildirme: '${message.author.tag}' yardım komudunu '${message.guild.name}' adlı sunucuda kullandı.`)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım', 'help', 'command', 'halp', 'help', 'y', 'komutlar'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Yardım komudu!',
  usage: '/yardım'
};