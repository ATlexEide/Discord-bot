import { Guild } from "discord.js";
import { client, globalErrorHandler } from "../../main.js";

export async function fetchEvents() {
  const guild: Guild | undefined = client.guilds.cache.get(
    "1440456875320807576"
  );

  const events = await guild?.scheduledEvents
    .fetch()
    .then((res) => res.toJSON())
    .catch((e) => globalErrorHandler(e));

  return events;
}
