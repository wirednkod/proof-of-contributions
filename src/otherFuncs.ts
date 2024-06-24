import { authToken, username } from "./config"

const getColorContributions = async () => {
    const headers = {
        'Authorization': `${authToken}`,
    }
    const body = {
        "query": `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`
    }
    const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
    const data = await response.json()
    return data
}

const main = async () => {
    const data = await getColorContributions()
    console.log(JSON.stringify(data))
}

main()