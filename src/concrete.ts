import fs from "fs";

export class ConcreteConfig {
    game_version?: string;
    loader?: string;
    isExists: boolean = false;

    constructor() {
        if (fs.existsSync(`${process.cwd()}/concrete.json`)) {
            const concrete = JSON.parse(fs.readFileSync(`${process.cwd()}/concrete.json`, 'utf8'));
            Object.assign(this, concrete);
            this.isExists = true;
        }
    }
}