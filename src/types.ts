export interface Repository {
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    archived: boolean;
    // Add more properties as needed
}

export interface Commit {
    sha: string;
    author: {
        login: string;
    }
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        };
    };
    // Add more properties as needed
}

export interface CommitFilter { commit: { author: { date: string | number | Date; }; }; author: { login: string; }; }

export type ReturnCommitType = "commits" | "commits_no"