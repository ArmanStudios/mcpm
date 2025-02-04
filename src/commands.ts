import {Argument, Command, Option } from "commander";
import {InstallCommand} from "./commands/install";
import {InitCommand} from "./commands/init";

export function registerCommands(program: Command) {

    program.command('install')
        .description('Installs specified Resource')
        .addArgument(new Argument('<RESOURCE_TYPE>', `type of Resource.`)
            .choices(['mod', 'plugin', 'shaderpack', 'resourcepack']
            )
        )
        .argument('<RESOURCES...>', 'name or ID of Resource.')
        .addOption(new Option('--api', `defines API for getting resources.`)
            .choices(['modrinth'])
            .default('modrinth')
        )
        .action((resourceType, resources, api) =>
            InstallCommand(resourceType, resources, api)
        );

    program.command('init')
        .description('Initializes mcpm for directory within concrete.json')
        .addOption(new Option('--game-version [game_version]', 'Minecraft\'s version of directory. this is based on what version your instance/server is using.'))
        .addOption(new Option('--loader [loader]', 'Minecraft Loader of directory (forge, fabric, paper, etc...)'))
        .action((options) =>
            InitCommand(options.gameVersion, options.loader)
        )
}