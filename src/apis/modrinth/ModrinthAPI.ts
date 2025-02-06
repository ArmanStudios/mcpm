import {generateUserAgent, UserAgentData} from "./utils";
import { searchProjects } from "./routes/projects/searchProjects";
import { getProject } from "./routes/projects/getProject";
import { getProjectVersions } from "./routes/versions/getProjectVersions";

interface ModrinthAPIOptions {
    apiURL?: string;
    userAgent: UserAgentData | string;
}

class ModrinthAPI {
    baseURL: string;
    userAgent: string;

    constructor(options: ModrinthAPIOptions) {
        this.baseURL = options?.apiURL || "https://api.modrinth.com/v2/";

        if (typeof options.userAgent === "string") {
            this.userAgent = options.userAgent;
        } else {
            this.userAgent = generateUserAgent(options.userAgent);
        }
    }

    async _request<T extends Record<string, any>>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        endpoint: string,
        opts?: {
            query?: URLSearchParams;
            base?: string;
            body?: any;
        }
    ) {
        const queryStr = opts?.query ? "?" + opts.query.toString() : "";
        const url = new URL(endpoint + queryStr, opts?.base || this.baseURL);

        const res = await fetch(url.toString(), {
            method,
            body: opts?.body,
            headers: {
                "User-Agent": this.userAgent,
                Accept: "application/json",
            },
        });
        const data: T = await res.json();
        return data;
    }

    public searchProjects = searchProjects
    public getProject = getProject
    public getProjectVersions = getProjectVersions
}

export { ModrinthAPI, type ModrinthAPIOptions };