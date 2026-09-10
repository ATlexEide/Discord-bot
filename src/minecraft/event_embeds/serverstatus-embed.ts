import { EmbedBuilder } from "discord.js";

export function getServerStatusEmbed(event: any) {
  console.clear();
  console.log(event);
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: "Server",
      iconURL:
        event.name === "ServerStart"
          ? "https://i.imgur.com/wojm0r1.png"
          : "https://i.imgur.com/E0VyRDS.png"
    })
    .setTitle(
      event.name === "ServerStart" ? "Server started" : "Server stopped"
    );
  if (event.name === "ServerStart") {
    chatEmbed.setDescription(
      `${event.motd}

      IP: *mc.theburrow.no*`
    );
  }
  return { embeds: [chatEmbed] };
}
