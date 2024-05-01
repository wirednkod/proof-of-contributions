import { orgs, startDate, endDate, username } from "./config";
import { getCommitsForContributor, getGithubContributions } from "./functions";

const main = async () => {
    let total_contribs = 0;
    let total_commits = 0;
    try {
        for (const org of orgs) {
            console.log(`\n Between: ${startDate} - ${endDate} - ${username} on org ${org}:\n`)
            const commits = await getCommitsForContributor(org)
            if (typeof commits === "number") {
                total_commits += commits;
                console.log(`Commits of user '${username}' for ${org}: ${commits}`);
            } else {
                console.log(`Commits of user '${username}' for ${org}: ${commits.join(`\n`)}`);
            }
            const contributions: number = await getGithubContributions(org);
            total_contribs += contributions
            console.log(`Contributions for ${org}: ${contributions}\n`);
        }
        console.log(`------------------------------------------------`);
        console.log(`Total commits of user '${username}' from ${startDate} until  ${endDate}: ${total_commits}`);
        console.log(`Total contributions of user '${username}': ${total_contribs}`);
    } catch (error: any) {
        console.error(error.message);
    }
}

main()