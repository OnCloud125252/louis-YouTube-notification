import YouTubeNotifier from "youtube-notification";


export default class Channel {
    constructor(channelID) {
        if (typeof (channelID) === "string") {
            this.channelID = channelID;

            this.notifier = new YouTubeNotifier({
                hubCallback: "https://Youtube-Notification-Bot.alexliao.repl.co/getNotify",
                port: 3000,
                path: "/getNotify"
            });
            this.notifier.setup();
            this.notifier.subscribe(channelID);
            this.notifier.on("subscribe", data => {
                console.log(`Notification API listening on : https://Youtube-Notification-Bot.alexliao.repl.co/getNotify`);
                console.log("Connected to YouTube channel : " + data.channel);
            });
        }
        else {
            throw new Error("channel ID must be string!");
        }
    }

    listener() {
        return this.notifier.listener();
    }

    newVideo() {
        this.notifier.on("notified", data => {
            console.log("New Video");
            console.log(data);
        });
    }
}