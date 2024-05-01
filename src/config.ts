import "dotenv/config"

export const username = process.env.USERNAME || "";
export const orgs = process.env.ORGS?.split(",") || [];
export const startDate = new Date(process.env?.START_DATE || "1982-01-01T00:00:00Z");
export const endDate = new Date(process.env?.END_DATE || "1982-01-01T00:00:00Z");
export const authenticationHeader = {
    headers: {
        Authorization: process.env.AUTHORIZATION_TOKEN || ""
    }
}