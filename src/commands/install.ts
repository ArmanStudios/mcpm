import {Project} from "../apis/modrinth/types/Project"
import {concreteConfig, modrinthClient} from "../main";
import {ProjectVersion} from "../apis/modrinth/types/ProjectVersion";
import {generateDirectory} from "../utils/directoryManager";
import {downloadAndSaveFromURL} from "../utils/downloader";
import {ConcreteFileNotFoundException} from "../exceptions/concreteExceptions";

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
                const version = Object.assign(new ProjectVersion, (await modrinthClient.getProjectVersions(param))[0])

                if (version.id) {
                    if (concreteConfig.checkForResourceVersion(version.id)) {
                        console.log(
                            `Resource ${project.title?.bold} with the same version of ${version.version_number?.bold} is already installed.`.yellow
                        )
                        return;
                    }
                }

                const file = version.getPrimaryFile();
                if (file?.url) {
                    const resourceFolder =
                        resourceType === 'mod' ? 'mods' :
                        resourceType === 'plugin' ? 'plugins' :
                        resourceType === 'resourcepack' ? 'resourcepacks' :
                        resourceType === 'shaderpack' ? 'shaderpacks' : 'mcpm';
                    generateDirectory(`${process.cwd()}/${resourceFolder}/`)
                    await downloadAndSaveFromURL(
                        file.url,
                        `${process.cwd()}/${resourceFolder}/${file.filename}`,
                        { customName: `${project.title} (${version.version_number} - ${file.filename})` }
                    )
                }
                if (concreteConfig.checkForResource(project)) {
                    concreteConfig.removeResource(project)
                }
                concreteConfig.addResource(project, version, file?.filename)
            } catch (e) {
                if (e instanceof ConcreteFileNotFoundException) {
                    console.error(e.message.red);
                }
                console.error(e)
            }
        }
    }

}