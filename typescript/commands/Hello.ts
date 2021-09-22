import type { PieceContext } from '@sapphire/framework';
import type { CommandInteraction, Message } from 'discord.js';
import { SlashCommand } from '../lib/structures/SlashCommand';

export class Hello extends SlashCommand {
	constructor(context: PieceContext) {
		super(context, {
			enabledGuilds: ['859287138364030977'],
			description: 'says hello',
			commandData: {
				name: 'hello',
				description: 'says hello'
			}
		});
	}

	async run(message: Message) {
		await message.reply('Hello from normal command');
	}

	async slashRun(interaction: CommandInteraction) {
		await interaction.reply('Hello from slashy bois');
	}
}
