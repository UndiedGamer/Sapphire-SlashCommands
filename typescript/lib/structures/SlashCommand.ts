import { Command, CommandOptions, PieceContext } from '@sapphire/framework';
import type { ApplicationCommandData, CommandInteraction } from 'discord.js';

export abstract class SlashCommand extends Command {
	public readonly enabledGuilds: string[];
	public readonly commandData: ApplicationCommandData;

	constructor(context: PieceContext, options: CustomCommand.Options) {
		super(context);
		this.enabledGuilds = options.enabledGuilds;
		this.commandData = options.commandData;
	}

	public abstract slashRun(interaction: CommandInteraction): Awaited<unknown>;
}

export namespace CustomCommand {
	export type Options = CommandOptions & {
		enabledGuilds: string[];
		commandData: ApplicationCommandData;
	};
}
