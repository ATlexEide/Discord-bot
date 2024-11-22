import { EmbedBuilder } from "discord.js";

export function getServerStatusEmbed(event) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: "Server",
      iconURL:
        event.event === "ServerStart"
          ? "https://i.imgur.com/wojm0r1.png"
          : "https://i.imgur.com/E0VyRDS.png",
    })
    .setTitle(
      event.event === "ServerStart" ? "Server started" : "Server stopped"
    );
  if (event.event === "ServerStart") {
    chatEmbed.setDescription(
      `${event.motd}

      IP: *${event.ip}:${event.port}*`
    );
  }
  return { embeds: [chatEmbed] };
}
