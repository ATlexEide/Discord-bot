import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function getWhitelistEmbed(author, playerInfo) {
  const chatEmbed = new EmbedBuilder();
  const row = new ActionRowBuilder();

  const removeWhitelistBtn = new ButtonBuilder()
    .setCustomId(`whitelist-remove-${author.id}`)
    .setStyle(ButtonStyle.Danger)
    .setLabel("Remove from whitelist");

  chatEmbed
    .setAuthor({
      name: playerInfo.data.player.username,
      iconURL: `https://mineskin.eu/avatar/${playerInfo.data.player.raw_id}`
    })
    .setDescription(`Whitelisted ${author.displayName}`);
  row.addComponents(removeWhitelistBtn);

  return {
    embeds: [chatEmbed],
    components: [row]
  };
}

export function getFailedWhitelistEmbed(author) {
  const chatEmbed = new EmbedBuilder();
  const row = new ActionRowBuilder();
  const okBtn = new ButtonBuilder()
    .setCustomId(`username-invalid`)
    .setStyle(ButtonStyle.Success)
    .setLabel("OK");

  chatEmbed.setDescription("Invalid username");
  row.addComponents(okBtn);

  return {
    embeds: [chatEmbed],
    components: [row]
  };
}
