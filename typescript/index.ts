import { SapphireClient } from '@sapphire/framework';
import { token } from './config';

const client = new SapphireClient({
	defaultPrefix: '!',
	intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

client.login(token);
