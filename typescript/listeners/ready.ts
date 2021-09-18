import { Listener, PieceContext } from '@sapphire/framework';
import type { CustomCommand } from 'lib/structures/CustomCommand';

export class Ready extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			once: true
		})
	}

	public async run() {
		const commands = this.container.stores.get('commands');
		commands.forEach((cmd) => {
			const command = cmd as CustomCommand;
			if (!command.slashRun) return;
			if (command.enabledGuilds.length === 0) throw new Error('You have to specify guilds!')
			command.enabledGuilds.forEach((guild) => {
				this.container.client.guilds.cache.get(guild)?.commands.create(command.commandData)
			})
		})
		this.container.logger.info('Bot is up and running!')
	}
}