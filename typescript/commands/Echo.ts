import type { Args, PieceContext } from '@sapphire/framework';
import type { CommandInteraction, Message, TextChannel } from 'discord.js';
import { SlashCommand } from '../lib/structures/SlashCommand';

export class Echo extends SlashCommand {
	constructor(context: PieceContext) {
		super(context, {
			enabledGuilds: ['859287138364030977'],
			description: 'Sends a message',
			commandData: {
				name: 'echo',
				description: 'Sends a message',
				options: [
					{
						name: 'message',
						type: 'STRING',
						description: 'The message to send',
						required: true
					},
					{
						name: 'destination',
						type: 'CHANNEL',
						description: 'The channel to send the message'
					}
				]
			}
		});
	}

	async run(message: Message, args: Args) {
		const destination = await args.pick('guildTextChannel').catch(() => message.channel);
		const msg = await args.rest('string');
		await destination.send(msg);
	}

	async slashRun(interaction: CommandInteraction) {
		let channel = interaction.options.getChannel('destination');
		// @ts-expect-error it is assignable
		if (!channel) channel = interaction.channel!;
		// @ts-expect-error it is not a string
		if (!channel.type === 'GUILD_TEXT') return;
		const message = interaction.options.getString('message')!;
		await (channel as TextChannel)!.send(message);
		await interaction.reply({ ephemeral: true, content: 'Done!' });
	}
}
