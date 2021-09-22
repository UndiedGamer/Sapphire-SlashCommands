import { Listener, PieceContext } from '@sapphire/framework';
import { isNullishOrEmpty } from '@sapphire/utilities';
import type { SlashCommand } from '../lib/structures/SlashCommand';

export class Ready extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			once: true
		});
	}

	public run() {
		const commands = this.container.stores.get('commands');
		// @ts-expect-error i dont need this error
		commands.forEach((cmd) => {
			const command = cmd as unknown as SlashCommand;
			if (isNullishOrEmpty(command.enabledGuilds)) return this.container.client.application?.commands.create(command.commandData);
			command.enabledGuilds.forEach((guild) => {
				this.container.client.guilds.cache.get(guild)?.commands.create(command.commandData);
			});
		});
		this.container.logger.info('Bot is up and running!');
	}
}
