import {
  Guild,
  GuildScheduledEvent,
  GuildScheduledEventStatus
} from "discord.js";
import { globalErrorHandler } from "../../main.js";

const cacheTimeout = 5; //minutes

let cache: void | GuildScheduledEvent<GuildScheduledEventStatus>[] = undefined;
let nextUpdate: Date = new Date();
let lastUpdate: Date = new Date();
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
      lastUpdate = new Date();
    }
    return { last_update: lastUpdate, events: cache };
  } catch (e) {
    globalErrorHandler(e);
  }
}
