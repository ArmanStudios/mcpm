import pkg from '../package.json';
import {Command} from "commander";
import {registerCommands} from "./commands";
import {ModrinthAPI} from "./apis/modrinth/ModrinthAPI";

export const modrinthClient = new ModrinthAPI({userAgent: {
        projectName: "mcpm",
        projectVersion: "0.0.1-EXPERIMENTAL",
        githubUsername: "ArmanStudios"
    }
});

const program = new Command();

program.name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);

registerCommands(program);

program.parse(process.argv);