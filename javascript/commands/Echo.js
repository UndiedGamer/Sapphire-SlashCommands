const SlashCommand = require('../lib/structures/SlashCommand');

module.exports = class extends SlashCommand {
	constructor(context) {
		super(context, {
			enabledGuilds: ['859287138364030977'],
			commandData: {
				name: 'echo',
				description: 'Sends message to a channel',
				options: [
					{
						name: 'message',
						type: 'STRING',
						description: 'The message to send'
					},
					{
						name: 'destination',
						type: 'CHANNEL',
						description: 'The channel to send the message',
						required: false
					}
				]
			}
		});
	}

	async run(message, args) {
		const destination = await args.pick('guildTextChannel').catch(() => message.channel);
		const msg = await args.rest('string');
		await destination.send(msg);
	}

	async slashRun(interaction) {
		let channel = interaction.options.getChannel('destination');
		if (!channel) channel = interaction.channel;
		if (!channel.type === 'GUILD_TEXT') return;
		const message = interaction.options.getString('message');
		channel.send(message);
	}
};
