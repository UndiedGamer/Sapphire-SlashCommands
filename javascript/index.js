const { SapphireClient } = require('@sapphire/framework');
const { token } = require('./config');

const client = new SapphireClient({
	defaultPrefix: '!',
	intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

client.login(token)