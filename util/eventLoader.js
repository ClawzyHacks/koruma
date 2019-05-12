const reqEvent = (event) => require(`../koruma/${event}`);

module.exports = client => {
  client.on('guildMemberAdd', reqEvent('0-sayacGiris'));
  client.on('guildMemberRemove', reqEvent('0-sayacCikis'));
  
  client.on('messageUpdate', reqEvent('1-messageUpdate'));
  client.on('messageDelete', reqEvent('1-messageDelete'));
  
  client.on('guildMemberUpdate', reqEvent('2-guildMemberUpdate'));
  
  client.on('guildMemberAdd', reqEvent('3-giriş'));
  client.on('guildMemberRemove', reqEvent('3-çıkış'));
  
  client.on('ready', () => reqEvent('4-ready')(client));
  client.on('message', reqEvent('4-message'));
  
  client.on('guildMemberAdd', reqEvent('5-otoTag'));
  
  client.on('messageUpdate', reqEvent('mesajduzenleme'));
};