import { EmbedBuilder } from "discord.js";

export function getServerStatusEmbed(event: any) {
  console.clear();
  console.log(event);
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: "Server",
      iconURL:
        event.event === "ServerStart"
          ? "https://i.imgur.com/wojm0r1.png"
          : "https://i.imgur.com/E0VyRDS.png"
    })
    .setTitle(
      event.event === "ServerStart" ? "Server started" : "Server stopped"
    );
  if (event.event === "ServerStart") {
    chatEmbed.setDescription(
      `${event.server_message}

      IP: *${event.server_ip}:${event.server_port}*`
    );
  }
  return { embeds: [chatEmbed] };
}
