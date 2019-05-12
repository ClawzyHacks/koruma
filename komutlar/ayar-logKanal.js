const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, params, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Kayıt kanalı ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
     let logkanali = message.mentions.channels.first();
     if (!logkanali) return message.channel.send(':no_entry: Kayıt kanalı ayarlamak için bir kanal etiketlemeniz gerekli. `/kayıtkanalı #kanal`')
     db.set(`membermodChannel_${message.guild.id}`, message.mentions.channels.first().id)
      let i = await db.fetch(`membermodChannel_${message.guild.id}`)
        message.channel.send(`${process.env.basarili} Kayıt kanalı, <#${i}> olarak ayarlandı.`)    
            
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'kayıtkanalı',
 description: 'neblm',
 usage: 'kayıtkanalı'
};
