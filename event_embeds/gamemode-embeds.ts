import { EmbedBuilder } from "@discordjs/builders";

export function getGamemodeEmbed(event) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://minotar.net/avatar/${event.player}.png`,
    })
    .setTitle(`changed gamemode to ${event.newGamemode}`);
  // .setDescription(``);
  return { embeds: [chatEmbed] };
}
