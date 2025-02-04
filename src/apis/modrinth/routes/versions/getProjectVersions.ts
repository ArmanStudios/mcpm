import {ProjectVersion} from "../../types/ProjectVersion";
import {Project} from "../../types/Project";
import {modrinthClient} from "../../../../main";

// export async function getVersions(this: Project): Promise<ProjectVersion[]> {
//     return await modrinthClient._request<ProjectVersion[]>("GET", `project/${this.id}/version`, {});
// }
export interface ProjectVersionOptions {
    project: Project;
    loaders?: string[];
    game_versions?: string[];
    featured?: boolean;
}

export async function getProjectVersions(options: ProjectVersionOptions): Promise<ProjectVersion[]> {
    return await modrinthClient._request<ProjectVersion[]>("GET", `project/${options.project.id}/version`, {});
}