import { EmbedBuilder } from "discord.js";

export function getServerStatusEmbed(event, action) {
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
  if (action === "start") {
    chatEmbed.setDescription(
      `${event.motd}

      IP: *${event.ip}:${event.port}*`
    );
  }
  // .setDescription(``);
  return { embeds: [chatEmbed] };
}
