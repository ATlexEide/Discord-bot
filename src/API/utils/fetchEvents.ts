import { Guild } from "discord.js";
import { globalErrorHandler } from "../../main.js";

export async function fetchEvents(guild: Guild | undefined) {
  if (guild === undefined) return;
  const events = await guild?.scheduledEvents
    .fetch()
    .then((res) => res.toJSON())
    .catch((e) => globalErrorHandler(e));

  return events;
}
