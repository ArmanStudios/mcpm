import {Project} from "../apis/modrinth/types/Project"
import {modrinthClient} from "../main";
import {ProjectVersion} from "../apis/modrinth/types/ProjectVersion";
import {generateDirectory} from "../utils/directoryManager";
import {downloadAndSaveFromURL} from "../utils/downloader";

export async function InstallCommand(
    resourceType: string,
    resources: string[],
    api: string,

) {
    switch (resourceType) {
        case 'mod': {
            for (const resource of resources) {
                try {
                    const project: Project = await modrinthClient.getProject(resource)
                    const file =
                        Object.assign(new ProjectVersion, (await modrinthClient.getProjectVersions(
                            {
                                project: project,
                            }
                        ))[0]).getPrimaryFile();
                    if (file?.url) {
                        generateDirectory(`${process.cwd()}/mods/`)
                        await downloadAndSaveFromURL(file.url, `${process.cwd()}/mods/${file.filename}`);
                    }
                    console.log();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}