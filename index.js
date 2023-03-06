import dotenv from "dotenv";

import { setUpListener } from "./_modules/Listener/index.js";
import { notifier } from "./_modules/Listener/index.js";


dotenv.config();

setUpListener(notifier.listener());

notifier.on("notified", data => {
    console.log(data);
});



// {
// video: {
// id: '8hnz7aUiCUg',
// title: 'Test',
// link: 'https://www.youtube.com/watch?v=8hnz7aUiCUg'
// },
// channel: {
// id: 'UCipcFficbraNNUjqYw4ugWQ',
// name: 'Alex Liao',
// link: 'https://www.youtube.com/channel/UCipcFficbraNNUjqYw4ugWQ'
// },
// published: 2023-03-05T10:21:29.000Z,
// updated: 2023-03-05T10:21:39.930Z
// }

// curl "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCipcFficbraNNUjqYw4ugWQ&key=AIzaSyBHGW536inrEhk5We9CBim9ccusm1GUJok"