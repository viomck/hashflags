import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Hashflag, hashflagFromHashflagWeb } from "./data/hashflag/Hashflag";
import HashflagWeb from "./data/hashflag/HashflagWeb";

function App() {
    const [hashflagsByCampaign, setHashflagsByCampaign] = useState(
        new Map() as Map<string, Hashflag[]>
    );

    useEffect(() => {
        const now = new Date();

        fetch(
            "/api/hashflags/" +
                now.getFullYear() +
                "-" +
                pad(now.getMonth() + 1) +
                "-" +
                pad(now.getDate()) +
                "-" +
                pad(now.getHours())
        )
            .then((res) => res.json())
            .then((hashflagWebs: HashflagWeb[]) => {
                const hashflagsByCampaign = new Map();

                hashflagWebs.map(hashflagFromHashflagWeb).forEach((hf) => {
                    let flags;
                    if (hashflagsByCampaign.has(hf.campaignName)) {
                        flags = hashflagsByCampaign.get(hf.campaignName);
                    } else {
                        flags = [];
                    }

                    hashflagsByCampaign.set(hf.campaignName, [hf, ...flags]);
                });

                console.log(hashflagsByCampaign);

                // Sort map by campaign name
                setHashflagsByCampaign(
                    new Map(
                        [...hashflagsByCampaign].sort((a, b) =>
                            String(a[0]).localeCompare(b[0])
                        )
                    )
                );
            });
    }, []);

    return (
        <div>
            source:{" "}
            <a href="https://github.com/viomckinney/hashflags">
                github.com/viomckinney/hashflags
            </a>
            <Table>
                <thead>
                    <tr>
                        <th>icon</th>
                        <th>campaign</th>
                        <th>hashtags</th>
                        <th>started at (UTC)</th>
                        <th>ends at (UTC)</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(hashflagsByCampaign.entries()).map(
                        ([campaign, flags]) => (
                            <tr key={campaign}>
                                <td>
                                    <img
                                        src={flags[0].assetUrl}
                                        alt={campaign}
                                        width={32}
                                    />
                                </td>
                                <td style={{ maxWidth: "10%" }}>
                                    {campaign.replaceAll("_", " ")}
                                </td>
                                <td>
                                    {flags
                                        .map((f) => f.hashtag)
                                        .sort()
                                        .map((f) => (
                                            <p>{f}</p>
                                        ))}
                                </td>
                                <td>{flags[0].start.toDateString()}</td>
                                <td>{flags[0].end.toDateString()}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}

function pad(n: number): string {
    if (n >= 10) return n.toString();
    return "0" + n.toString();
}

export default App;
