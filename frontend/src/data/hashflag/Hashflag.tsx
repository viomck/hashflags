import HashflagWeb from "./HashflagWeb";

type Hashflag = {
    hashtag: string;
    assetUrl: string;
    start: Date;
    end: Date;
    campaignName: string;
};

export function hashflagFromHashflagWeb(web: HashflagWeb): Hashflag {
    return {
        hashtag: web.hashtag,
        assetUrl: web.assetUrl,
        start: new Date(parseInt(web.startingTimestampMs)),
        end: new Date(parseInt(web.endingTimestampMs)),
        campaignName: web.campaignName,
    };
}

export type { Hashflag };
