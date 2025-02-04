import fs from "fs";
import path from "path";
import yaml from "yaml";

const appPath = process.cwd(); // Get the directory where the script is running
const configPath = path.join(appPath, "assets/config.yml");

let selectedLang = "en_US";

try {
    if (fs.existsSync(configPath)) {
        const configData = yaml.parse(fs.readFileSync(configPath, "utf-8"));
        if (configData.language) {
            selectedLang = configData.language;
        }
    }
} catch (error) {
    console.error("Error loading config.yml:", error);
}

const langFilePath = path.join(appPath, `assets/lang/${selectedLang}.json`);
let translations: { [x: string]: any; };

try {
    if (fs.existsSync(langFilePath)) {
        translations = JSON.parse(fs.readFileSync(langFilePath, "utf-8"));
    } else {
        console.warn(`Translation file not found: ${langFilePath}`);
    }
} catch (error) {
    console.error("Error loading translation file:", error);
}

export function __(key: string): string {
    return translations[key] || key;
}
