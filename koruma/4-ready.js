const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loxy's Inc.: Bot sorunsuz bir şekilde yüklendi.`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loxy's Inc.: ${client.user.username} takma ismi ile login yapıldı.`);
  client.user.setStatus('dnd');
  client.user.setActivity("🔥 bot.loxysinc.cf | /yardım ", {type: "WATCHING"});  
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loxy's Inc.: Ready ayarları yapıldı.`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loxy's Inc.: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Loxy's Inc.: Giriş yapılan bot ${client.user.tag}!`)
  
};