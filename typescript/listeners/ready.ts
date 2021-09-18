import { Listener, PieceContext } from '@sapphire/framework';
import type { CustomCommand } from 'lib/structures/CustomCommand';

export class Ready extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			once: true
		})
	}

	// @ts-expect-error i dont need this error
	public async run() {
		const commands = this.container.stores.get('commands');
		for (const cmd of commands) {
			const command = cmd as unknown as CustomCommand;
			if (!command.slashRun) return;
			if (command.enabledGuilds.length === 0) return this.container.client.application?.commands.create(command.commandData)
			for (const guild of command.enabledGuilds) {
				this.container.client.guilds.cache.get(guild)?.commands.create(command.commandData)
			}
		}
		this.container.logger.info('Bot is up and running!')
	}
}