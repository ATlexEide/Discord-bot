import { EmbedBuilder } from "@discordjs/builders";

export function getGamemodeEmbed(event: any) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://minotar.net/avatar/${event.player}.png`
    })
    .setTitle("Changed gamemode")
    .setDescription(
      `*from ${event.gameMode.toLowerCase()} to ${event.newGameMode.toLowerCase()}*`
    );
  // .setDescription(``);
  return { embeds: [chatEmbed] };
}
