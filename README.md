# Minecraft Package Manager (MCPM) 📦

Minecraft Package Manager (MCPM) is an advanced CLI tool for setup Minecraft Instances and Servers. Possibilities of
this tool is much higher than managing big and complex Modpacks and Servers.

## Introduction

NOTICE: MCPM is now on the very beginning (EXPERIMENTAL STAGE).
we ask Developers to help the project. Pull Requests are welcome.

mcpm is builded into EXE installation for Windows which is available
from [Releases Page](https://github.com/ArmanStudios/mcpm/releases).

### mcpm Support

Currently, mcpm Support map are defined as below:

<table>
    <thead>
    <tr>
        <th>Loader</th>
        <th>Resources</th>
        <th>API/Method</th>
        <th>Supported</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Vanilla (Base)</td>
        <td>Resource Packs, Worlds, Versions, Datapacks, Shader Packs, etc.</td>
        <td>-</td>
        <td>🚧 (Planned)</td>
    </tr>
    <tr>
        <td rowspan="3">Spigot/Bukkit</td>
        <td>Plugins</td>
        <td><a href="https://spiget.org">Spiget</a></td>
        <td>✅ (Experimental)</td>
    </tr>
    <tr>
        <td>Config, Server JAR, etc.</td>
        <td>-</td>
        <td>🚧 (Planned)</td>
    </tr>
    <tr>
        <td>Plugin-Dependency, etc.</td>
        <td>-</td>
        <td>❌</td>
    </tr>
    <tr>
        <td>Forge/Fabric</td>
        <td>Mods, Configs, etc.</td>
        <td>-</td>
        <td>❌ (Planned for Long-term)</td>
    </tr>
    </tbody>
</table>

## Usage

mcpm is accessible using Command-Line Interface (CLI) using Command Prompt (cmd) to interact with instance resources.
Shortcut on cli is ```mcpm```.
### Quickstart
- Installing Plugins:
```mcpm install plugin <plugins_id> ...```
<br>Arguments: 
- ```plugins_id```: Identifier of Plugin. accepts Multiple Ids. Id of Plugin is shown on the Plugin's Page url.
<br>Example: ```mcpm install plugin 34315 28140``` (Installs Vault and Luckperms)
<br>(Id of Vault is <u>34315</u> as in ```https://www.spigotmc.org/resources/vault.34315/```)



_More Content Soon..._