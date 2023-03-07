import axios from "axios";


export class Channel {
    constructor(channelID) {
        if (typeof (channelID) === "string") {
            this.channelID = channelID;
        }
        else {
            throw new Error("channel ID must be string!");
        }
    }

    async name() {
        try {
            const response = await YouTubeAPI(process.env.youtube_api_key, "channels", "snippet", { channelID: this.channelID });
            return response.data["items"][0]["snippet"]["title"];
        }
        catch (error) {
            throw new Error("Channel not found");
        }
    }

    async subscribersCount() {
        try {
            const response = await YouTubeAPI(process.env.youtube_api_key, "channels", "statistics", { channelID: this.channelID });
            return response.data["items"][0]["statistics"]["subscriberCount"];
        }
        catch (error) {
            throw new Error("Channel not found");
        }
    }
}

export class Video {
    constructor(videoID) {
        if (typeof (videoID) === "string") {
            this.videoID = videoID;
        }
        else {
            throw new Error("video ID must be string!");
        }
    }

    async isLive() {
        try {
            const response = await YouTubeAPI(process.env.youtube_api_key, "videos", "snippet", { videoID: this.videoID });
            return response.data["items"][0]["snippet"]["liveBroadcastContent"] === "live";
        }
        catch (error) {
            throw new Error("Video not found");
        }
    }
}

async function YouTubeAPI(API_key, type, part, option) {
    switch (type) {
        case "channels": {
            const partFilter = ["snippet", "statistics"];
            if (!partFilter.includes(part)) throw new Error("Invalid content part");
            return axios.get(
                "https://www.googleapis.com/youtube/v3/channels",
                {
                    params: {
                        part: part,
                        id: option.channelID,
                        key: API_key
                    }
                }
            );
        }

        case "videos": {
            const partFilter = ["snippet"];
            if (!partFilter.includes(part)) throw new Error("Invalid part");
            return axios.get(
                "https://www.googleapis.com/youtube/v3/videos",
                {
                    params: {
                        part: part,
                        id: option.videoID,
                        key: API_key
                    }
                }
            );
        }

        default: {
            throw new Error("Invalid api type");
        }
    }
}