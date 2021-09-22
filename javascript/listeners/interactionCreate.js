const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
	async run(interaction) {
		if (!interaction.isCommand()) return;
		const cmd = this.container.stores.get('commands').get(interaction.commandName);

		if (!cmd) return;

		try {
			const command = cmd;
			command.slashRun(interaction);
		} catch (e) {
			this.container.logger.fatal(e);

			if (interaction.replied) {
				interaction
					.followUp({
						content: `There was an error:\n\`\`\`${e.message}\`\`\``,
						ephemeral: true
					})
					.catch((e) => this.container.logger.fatal('An error occurred following up on an error', e));
			}
		}
	}
};
