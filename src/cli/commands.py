import os
import shutil

from src.utils.spiget_api import *


def install_plugin(plugins_input: list[int, str]):
    plugins_name = []
    rprint('\nDownloading requested Plugins...')
    with Progress(
            SpinnerColumn(style='blue'),
            TextColumn('{task.description}'),
            TaskProgressColumn(),
            BarColumn(),
            DownloadColumn(),
            TimeElapsedColumn()
    ) as prog:
        for plugin_input in plugins_input:
            file = download(plugin_input, prog)
            filename = file.split('\\')[-1]
            destination_path = fr'{os.getcwd()}\plugins\{filename}'
            if not os.path.exists(fr'{os.getcwd()}\plugins'):
                os.makedirs(fr'{os.getcwd()}\plugins')
            if os.path.exists(destination_path):
                os.remove(destination_path)
            os.rename(file, destination_path)
            filename = filename[:-4]
            plugins_name.append(filename)
    result = ' '.join(plugins_name)
    rprint(f"[green]Successfully installed plugins:[/green] [yellow]{result}[/yellow]")