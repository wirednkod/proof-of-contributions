import axios from 'axios';
import { Commit, CommitFilter, Repository } from './types';
import "dotenv/config"
import { authenticationHeader, endDate, startDate, username } from './config';

// TODO this should be in consts file
const github_api = "https://api.github.com";

const getAllGithubOrgRepositories = async (orgName: string): Promise<Repository[]> => {
    try {
        const response = await axios.get(`${github_api}/orgs/${orgName}/repos?type=public`, authenticationHeader);
        const repositories: Repository[] = response.data.map((repo: any) => ({
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            description: repo.description,
            archived: repo.archived
            // Add more properties as needed
        }));
        return repositories;
    } catch (error) {
        throw new Error(`Failed to fetch repositories: ${error}`);
    }
}

export const getCommitsForContributor = async (orgName: string): Promise<Commit[] | number> => {
    try {
        const repositories = await getAllGithubOrgRepositories(orgName)
        let commitsNumber: number = 0;
        let commitsForContributor: Commit[] = [];
        for (const repo of repositories) {
            const commitsUrl = `${github_api}/repos/${orgName}/${repo.name}/commits`;
            const response = await axios.get(commitsUrl, {
                ...authenticationHeader,
                params: {
                    author: username,
                    since: startDate,
                    until: endDate
                }
            })
            const commits = response?.data;
            commitsForContributor = (endDate && startDate) ? commits?.filter((c: CommitFilter) => {
                const commitDate = new Date(c.commit.author.date);
                return c?.author?.login === username && commitDate >= startDate && commitDate <= endDate;
            }) : commits;
            commitsNumber += commitsForContributor?.length;
        }
        return commitsNumber;
    } catch (error) {
        throw new Error(`Failed to fetch commits for contributor: ${error}`);
    }
}


export const getGithubContributions = async (orgName: string): Promise<number> => {
    let totalContributions = 0;
    const repositories = await getAllGithubOrgRepositories(orgName)
    try {
        for (const repo of repositories) {
            const url = `${github_api}/repos/${repo.full_name}/contributors`;
            const response = await axios.get(url, authenticationHeader);
            const contributors = response.data;

            const user = contributors.find ? contributors.find((contributor: any) => contributor.login === username) : undefined

            if (user) {
                console.log('Repository:', repo.full_name, " | contributions:", user.contributions)
                totalContributions += user.contributions;
            }
        }

        return totalContributions;
    } catch (error) {
        throw new Error(`Failed to fetch contributions: ${error}`);
    }
}
