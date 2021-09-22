const { Command } = require('@sapphire/framework');

module.exports = class extends Command {
	enabledGuilds;
	commandData;

	constructor(context, options) {
		super(context);
		this.enabledGuilds = options.enabledGuilds;
		this.commandData = options.commandData;
	}
};
