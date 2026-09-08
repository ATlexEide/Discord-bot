import {
  Guild,
  GuildScheduledEvent,
  GuildScheduledEventStatus
} from "discord.js";
import { globalErrorHandler } from "../../main.js";

const cacheTimeout = 5; //minutes

let cache: void | GuildScheduledEvent<GuildScheduledEventStatus>[] = undefined;
let nextUpdate: Date = new Date();
nextUpdate.setMinutes(nextUpdate.getMinutes() + cacheTimeout);

export async function fetchEvents(guild: Guild | undefined) {
  try {
    const isOutdated: Boolean = nextUpdate ? nextUpdate < new Date() : true;

    if (guild === undefined) return;
    if (!cache || isOutdated) {
      const events = await guild?.scheduledEvents
        .fetch()
        .then((res) => res.toJSON())
        .catch((e) => globalErrorHandler(e));
      cache = events;
    }
    return cache;
  } catch (e) {
    globalErrorHandler(e);
  }
}
