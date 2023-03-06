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
            const response = await YouTubeAPI(this.channelID, process.env.youtube_api_key, "snippet");
            return response.data["items"][0]["snippet"]["title"];
        }
        catch (error) {
            throw new Error("Channel not found");
        }
    }
}

// {
//     "kind": "youtube#channelListResponse",
//         "etag": "2-obTjazfQhD-csUQBcpE6S0QpU",
//             "pageInfo": {
//         "totalResults": 1,
//             "resultsPerPage": 5
//     },
//     "items": [
//         {
//             "kind": "youtube#channel",
//             "etag": "9kNvKONZNSUdsW8zTFX_F5nMEIY",
//             "id": "UCipcFficbraNNUjqYw4ugWQ",
//             "snippet": {
//                 "title": "Alex Liao",
//                 "description": "",
//                 "customUrl": "@alexliao507",
//                 "publishedAt": "2021-02-16T07:26:08.264946Z",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://yt3.ggpht.com/ytc/AL5GRJVU5H51WlCSH1DqhIX8RiSGJn9qUFrvZT-Xq3kr7w=s88-c-k-c0x00ffffff-no-rj",
//                         "width": 88,
//                         "height": 88
//                     },
//                     "medium": {
//                         "url": "https://yt3.ggpht.com/ytc/AL5GRJVU5H51WlCSH1DqhIX8RiSGJn9qUFrvZT-Xq3kr7w=s240-c-k-c0x00ffffff-no-rj",
//                         "width": 240,
//                         "height": 240
//                     },
//                     "high": {
//                         "url": "https://yt3.ggpht.com/ytc/AL5GRJVU5H51WlCSH1DqhIX8RiSGJn9qUFrvZT-Xq3kr7w=s800-c-k-c0x00ffffff-no-rj",
//                         "width": 800,
//                         "height": 800
//                     }
//                 },
//                 "localized": {
//                     "title": "Alex Liao",
//                     "description": ""
//                 }
//             },
//             "statistics": {
//                 "viewCount": "135",
//                 "subscriberCount": "5",
//                 "hiddenSubscriberCount": false,
//                 "videoCount": "3"
//             }
//         }
//     ]
// }

async function YouTubeAPI(channel_ID, API_key, part) {
    const partFilter = ["snippet", "statistics"];
    if (!partFilter.includes(part)) throw new Error("Invalid part");
    return axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
            params: {
                part: part,
                id: channel_ID,
                key: API_key
            }
        }
    );
}