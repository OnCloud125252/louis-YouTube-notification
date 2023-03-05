import express from "express";
import { readFileSync } from "fs";

import Channel from "./_modules/Channel/index.js";
import ReadableTime from "./_modules/ReadableTime/index.js";


const ytapi = express();
const status = express();
const packageJSON = JSON.parse(readFileSync("./package.json"));

const host = "0.0.0.0";
const statusPort = "9000";

const notifier = new Channel("UCipcFficbraNNUjqYw4ugWQ");
notifier.newVideo();
ytapi.use("/getNotified", notifier.listener());

status.get("/ping", (_, res) => {
    res.json({ message: `Service is up : ${ReadableTime(Math.round(performance.now()))["string"]} | API v${packageJSON.version}` });
});

status.listen(statusPort, host, () => {
    console.log(`Status displayed on : https://youtube-notification-bot.alexliao.repl.co:9000/ping`);
});