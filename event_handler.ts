import { client } from "./main.ts";
export function handleEvent(gameEvent) {
  const channel = client.channels.cache.get("1293123587385069628");
  if (!channel) throw new Error("Invalid channel");
  if (gameEvent.event === "PlayerJoinEvent") {
    channel.send(
      `${gameEvent.player} joined the server!\nCurrent players online: ${gameEvent.playerCount}`
    );
  }
  if (gameEvent.event === "PlayerQuitEvent") {
    channel.send(
      `${gameEvent.player} left the server :(\nCurrent players online: ${gameEvent.playerCount}`
    );
  }
}
