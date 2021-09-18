const { Listener } = require('@sapphire/framework')

module.exports = class extends Listener {
	constructor(context) {
		super(context, {
			once: true
		})
	}

	async run() {
		const commands = this.container.stores.get('commands');
		for (const command of commands) {
			if (!command.slashRun) return;
			if (command.enabledGuilds.length === 0) return this.container.client.application?.commands.create(command.commandData)
			for (const guild of command.enabledGuilds) {
				this.container.client.guilds.cache.get(guild)?.commands.create(command.commandData)
			}
		}
		this.container.logger.info('Bot is up and running!')
	}
}