const SlashCommand = require('../lib/structures/SlashCommand');

module.exports = class extends SlashCommand {
	constructor(context) {
		super(context, {
			enabledGuilds: ['859287138364030977'],
			commandData: {
				name: 'hello',
				description: 'says hello'
			}
		});
	}

	async run(message) {
		await message.reply('Hello from normal command');
	}

	async slashRun(interaction) {
		await interaction.reply('Hello from slashy bois');
	}
};
