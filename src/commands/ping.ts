import { SlashCommandBuilder } from "discord.js";
import type { Command } from "./types";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong."),
  async execute(interaction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  },
};

export default command;
