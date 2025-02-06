import {Project} from "../apis/modrinth/types/Project"
import {modrinthClient} from "../main";
import {ProjectVersion} from "../apis/modrinth/types/ProjectVersion";
import {generateDirectory} from "../utils/directoryManager";
import {downloadAndSaveFromURL} from "../utils/downloader";

export async function InstallCommand(
    resourceType: string,
    resources: string[],
    game_versions?: string[],
    loaders?: string[],
    api?: string,
) {
    if (api === 'modrinth') {
        for (const resource of resources) {
            try {
                const project: Project = await modrinthClient.getProject(resource)
                const param = {
                    project: project,
                    game_versions: game_versions?.toString(),
                    loaders: loaders?.toString(),
                }
                const file =
                    Object.assign(new ProjectVersion, (await modrinthClient.getProjectVersions(param))[0]).getPrimaryFile();
                if (file?.url) {
                    const resourceFolder =
                        resourceType === 'mod' ? 'mods' :
                        resourceType === 'plugin' ? 'plugins' :
                        resourceType === 'resourcepack' ? 'resourcepacks' :
                        resourceType === 'shaderpack' ? 'shaderpacks' : 'mcpm';
                    generateDirectory(`${process.cwd()}/${resourceFolder}/`)
                    await downloadAndSaveFromURL(file.url, `${process.cwd()}/${resourceFolder}/${file.filename}`);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

}