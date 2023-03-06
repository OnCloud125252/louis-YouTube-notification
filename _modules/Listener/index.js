import express from "express";
import YouTubeNotifier from "youtube-notification";
import { readFileSync } from "fs";
import dotenv from "dotenv";

import ReadableTime from "../ReadableTime/index.js";


dotenv.config();

const packageJSON = JSON.parse(readFileSync("./package.json"));
const status_port = process.env.status_port ?? 9000
const notifier_domain = process.env.notifier_domain ?? "Youtube-Notification-Bot.alexliao.repl.co";
const notifier_path = process.env.notifier_path ?? "/getNotify";
const channelID = process.env.channel ?? "UCipcFficbraNNUjqYw4ugWQ";

export const notifier = new YouTubeNotifier({
    hubCallback: `https://${notifier_domain}${notifier_path}`,
    port: 3000,
    path: notifier_path
});

export function setUpListener(middleware) {
    notifier.setup();
    notifier.on("subscribe", data => {
        console.log(`Notification API listening on : https://${notifier_domain}${notifier_path}`);
        console.log("Connected to YouTube channel : " + data.channel);
    });
    notifier.subscribe(channelID);

    const ytapi = express();
    ytapi.use(notifier_path, middleware);

    const status = express();
    status.get("/ping", (_, res) => {
        res.json({ message: `Service is up : ${ReadableTime(Math.round(performance.now()))["string"]} | API v${packageJSON.version}` });
    });
    status.listen(status_port, "0.0.0.0", () => {
        console.log(`Status displayed on : https://${notifier_domain}:${status_port}/ping`);
    });
}