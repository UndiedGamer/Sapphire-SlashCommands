const { Listener } = require('@sapphire/framework')

module.exports = class extends Listener {
	constructor(context) {
		super(context, {
			once: true
		})
	}

	async run() {
		const commands = this.container.stores.get('commands');
		commands.forEach((cmd) => {
			const command = cmd;
			if (!command.slashRun) return;
			if (command.enabledGuilds.length === 0) throw new Error('You have to specify guilds!')
			command.enabledGuilds.forEach((guild) => {
				this.container.client.guilds.cache.get(guild)?.commands.create(command.commandData)
			})
		})
		this.container.logger.info('Bot is up and running!')
	}
}