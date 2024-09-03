import os
import shutil

import requests
from rich.progress import *

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
    rprint(f"[green]Successfully installed Plugins:[/green] [yellow]{result}[/yellow]")


def install_resourcepack(urls: list[str]):
    rprint('\nDownloading requested Resource Packs...')
    packs = []
    with Progress(
            SpinnerColumn(style='blue'),
            TextColumn('{task.description}'),
            TaskProgressColumn(),
            BarColumn(),
            DownloadColumn(),
            TimeElapsedColumn()
    ) as prog:
        for url in urls:
            resp = requests.get(url, stream=True)
            filename = get_filename_from_request(resp)
            file_size = int(resp.headers.get('Content-Length', 0))
            task = prog.add_task(f"{filename}", total=file_size)
            generate_file_from_request_with_progress(resp, filename, rf'{os.getcwd()}\.mcpm\cache\resourcepacks', task, prog)
            destination_path = fr'{os.getcwd()}\resourcepacks\{filename}'
            if not os.path.exists(fr'{os.getcwd()}\resourcepacks'):
                os.makedirs(fr'{os.getcwd()}\resourcepacks')
            if os.path.exists(destination_path):
                os.remove(destination_path)
            os.rename(rf'{os.getcwd()}\.mcpm\cache\resourcepacks\{filename}', destination_path)
            packs.append(filename)
    result = ' '.join(packs)
    rprint(f"[green]Successfully installed Resource Packs:[/green] [yellow]{result}[/yellow]")
