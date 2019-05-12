const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author
    let küfürVeritabani = await db.fetch(`projectLAC_${user.id}_küfür`)
    let reklamVeritabani = await db.fetch(`projectLAC_${user.id}_reklam`)
    let uyar = await db.fetch(`projectLAC_${user.id}_uyarNeden`) 
    
    if (user.bot) return message.channel.send(`***Botların küfür ve reklam puanı bulunmamaktadır.***`)
  
    let durumYazi;
    if (küfürVeritabani == '0' || reklamVeritabani == '0') durumYazi = 'Normal, temizsin.'
    if (küfürVeritabani == '10' || reklamVeritabani == '10') durumYazi = 'Dikkatli ol.'
    if (küfürVeritabani == '20' || reklamVeritabani == '20') durumYazi = 'Şüphelisin.'
    if (küfürVeritabani > '20' || küfürVeritabani == '20' || reklamVeritabani > '20' || reklamVeritabani == '20') durumYazi = 'Şüphelisin.'

    const embed = new Discord.RichEmbed()
        .setColor(0xffa300)
        .setDescription(`
            ***Kullanıcı: ${user.tag}***
            ***Durumun: ${durumYazi || 'Normal, temizsin.'}***

            **Küfür puanın**: ${küfürVeritabani || 'Veritabanında kayıtlı bir veri bulunamadı.'}
            **Reklam puanın**: ${reklamVeritabani || 'Veritabanında kayıtlı bir veri bulunamadı.'}   

            **Uyarılma**: ${uyar || 'Bu zamana kadar uyarılmamışsın, tebrikler.'}
        `)    
        .setFooter(`L.A.C: Anti Reklam & Küfür`, user.avatarURL)
    message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'puan',
  description: 'nblm',
  usage: 'puan'
};
