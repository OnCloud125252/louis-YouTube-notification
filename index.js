import dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Partials } from "discord.js";

import { setUpListener } from "./_modules/Listener/index.js";
import { notifier } from "./_modules/Listener/index.js";
import { Video } from "./_modules/Youtube/index.js";


dotenv.config();
const botClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel]
});

setUpListener(notifier.listener());
// notifier.unsubscribe("UCipcFficbraNNUjqYw4ugWQ");
notifier.on("notified", async data => {
    const isLive = await new Video(data.video.id).isLive();
    console.log("Channel Name : " + data.channel.name);
    console.log("Channel Link : " + data.channel.link);
    console.log("Video Name   : " + data.video.name);
    console.log("Video Link   : " + data.video.link);
    console.log("Status       : " + (isLive ? "Live Stream" : "Video"));

    const notifyMessage = isLive ? (
        `${data.channel.name} 開台啦\n${data.video.link}`
    ) : (
        `${data.channel.name} 上片啦\n${data.video.link}`
    );

    botClient.channels.cache.get("1082546196037505045").send(notifyMessage);
});

botClient.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

botClient.login(process.env.discordbot_token);