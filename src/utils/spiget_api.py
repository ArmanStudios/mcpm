import requests
from src.utils.exceptions import *
from src.utils.file_manager import *
from rich import print as rprint

SPIGET_API_ENDPOINT = "https://api.spiget.org/v2/"


def download(resource_id: str, prog):
    resp = requests.get(SPIGET_API_ENDPOINT+f"resources/{resource_id}")

    resp_json = resp.json()

    resp_version = requests.get(SPIGET_API_ENDPOINT+f"resources/{resource_id}/versions/{resp_json['version']['id']}")
    resp_version_name = resp_version.json()['name']

    file_name = f'{resp_json['name']}-{resp_version_name}.jar'

    resp_file = requests.get(SPIGET_API_ENDPOINT+f"resources/{resource_id}/download", stream=True)
    if resp_file.headers.get('Content-Type') != "application/java-archive":
        content_disposition = resp_file.headers.get('Content-Disposition')
        filename = content_disposition.split('filename=')[-1].strip('"')
        fileext = filename.split('.')[-1]

        if fileext != 'jar':
            rprint('[red]The file of download link is not a plugin. Consider checking plugin\'s download link.[/red]')
            raise FileIsNotPluginException()

    file_size = int(resp_file.headers.get('Content-Length', 0))
    task = prog.add_task(f"{resp_json['name']} v{resp_version_name}", total=file_size)
    generate_file_from_request_with_progress(resp_file, file_name, rf'{os.getcwd()}\.mcpm\cache\plugins\spiget', task, prog)

    return fr'{os.getcwd()}\.mcpm\cache\plugins\spiget\{file_name}'