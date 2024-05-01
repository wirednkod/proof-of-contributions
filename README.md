# [WIP] Proof-of-contributions (A Contribution Tracker)

### Description: A simple tool for gathering verification proof of contributions

This repository contains a set of TypeScript functions for tracking a user's contributions and commits within specified organizations on GitHub, stack exchange and discourse. 
The code leverages the GitHub API to retrieve information about repositories, commits, and contributions.

### Overview

The main functionality of this code revolves around two key functions:

### Installation

This repository is using `pnpm`. In order to install all dependencies just run:
```
pnpm install
```

### Usage
To use these functions, first ensure that you have provided the necessary configuration details in .env file, including the GitHub username (`USERNAME`), start date (`START_DATE`), end date (`END_DATE`), and the (comma separated) target organizations (`ORGS`). Then, simply execute:

```
pnpm run dev
```

which orchestrates the retrieval of commits and contributions for each organization specified in the orgs array and prints the results in terminal
