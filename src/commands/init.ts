import concreteDefault from '../resources/concrete-default.json';
import * as rl from "readline-sync";
import 'colorts/lib/string'
import {writeFileSync} from "node:fs";
import {concreteConfig} from "../main";

export async function InitCommand(game_version: string | undefined, loader: string | undefined) {
    let concreteJson = concreteDefault;

    concreteConfig.checkForConcreteFile(false)

    if (game_version) {
        concreteJson.game_version = game_version;
    } else {
        concreteJson.game_version = rl.question('Enter Minecraft version: ');
    }
    console.log('Set Minecraft version: '.green + `${concreteJson.game_version}`.yellow)

    if (loader) {
        concreteJson.loader = loader;
    } else {
        concreteJson.loader = rl.question('Enter Minecraft loader: ');
    }
    console.log('Set Minecraft loader: '.green + `${concreteJson.loader}`.yellow)

    writeFileSync(process.cwd()+'/concrete.json', JSON.stringify(concreteJson, null, 2));

    console.log('Successfully Initialized mcpm for directory:'.green + ' concrete.json'.yellow);
}