import { orgs, startDate, endDate, username } from "./config";
import { getCommitsForContributor, getGithubContributions } from "./functions";


const main = async () => {
    let total_contribs = 0;
    let total_commits = 0;
    try {
        console.log(`\n From: ${startDate} to: ${endDate}.`)
        for (const org of orgs) {
            console.log(`\nOn org ${org}:\n`)
            const [commits_no, commits] = await getCommitsForContributor(org)

            total_commits += commits_no;
            console.log(`Commits of user '${username}' for ${org}: ${commits_no}`);
            commits.forEach(c => {
                console.log(`Commit: ${Object.keys(c)} ${Object.values(c)}`);
            })
            const contributions: number = await getGithubContributions(org);
            total_contribs += contributions
            console.log(`Contributions for ${org}: ${contributions}\n`);
        }
        console.log(`------------------------------------------------`);
        console.log(`Total commits of user '${username}' from ${startDate} until  ${endDate}: ${total_commits}`);
        console.log(`Total contributions of user '${username}': ${total_contribs}`);
    } catch (error: any) {
        console.error("Generic", error.message);
    }
}

main()