const { SapphireClient } = require('@sapphire/framework');
const { token } = require('./config');

const client = new SapphireClient({
	defaultPrefix: '!',
	regexPrefix: /^(hey +)?bot[, ]/i,
	intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

client.login(token);
