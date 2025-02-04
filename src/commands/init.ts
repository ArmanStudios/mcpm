import concreteDefault from '../resources/concrete-default.json';
import * as readLine from "readline";
import 'colorts/lib/string'
import {writeFileSync} from "node:fs";
import {ConcreteConfig} from "../concrete";

export async function InitCommand(game_version: string | undefined, loader: string | undefined) {
    let concreteJson = concreteDefault;
    let rl = readLine.createInterface(process.stdin, process.stdout);

    if (new ConcreteConfig().isExists) {
        console.error('mcpm is already Initialized on current directory (concrete.json)'.red)
        return rl.close();
    }

    if (game_version) {
        concreteJson.game_version = game_version;
    } else {
        rl.question('Enter Minecraft version: ', (answer) => concreteJson.game_version = answer);
    }
    console.log('Set Minecraft version: '.green + `${concreteJson.game_version}`.yellow)

    if (loader) {
        concreteJson.loader = loader;
    } else {
        rl.question('Enter Minecraft loader: ', (answer) => concreteJson.loader = answer);
    }
    console.log('Set Minecraft loader: '.green + `${concreteJson.loader}`.yellow)

    writeFileSync(process.cwd()+'/concrete.json', JSON.stringify(concreteJson, null, 2));

    console.log('Successfully Initialized mcpm for directory:'.green + ' concrete.json'.yellow);

    rl.close()
}