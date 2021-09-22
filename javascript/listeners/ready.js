const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
	constructor(context) {
		super(context, {
			once: true
		});
	}

	async run() {
		const commands = this.container.stores.get('commands');
		commands.forEach((command) => {
			if (isNullishOrEmpty(command.enabledGuilds)) return this.container.client.application.commands.create(command.commandData);
			command.enabledGuilds.forEach((guild) => {
				this.container.client.guilds.cache.get(guild).commands.create(command.commandData);
			});
		});
		this.container.logger.info('Bot is up and running!');
	}
};
