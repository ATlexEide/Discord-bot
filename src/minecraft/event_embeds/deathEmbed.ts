import { EmbedBuilder } from "@discordjs/builders";

export function getDeathEmbed(event: any) {
  const deathEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://mineskin.eu/avatar/${event.player_uuid}`
    })
    .setTitle("Player died :0")
    .setDescription(event.message);
  return { embeds: [deathEmbed] };
}
