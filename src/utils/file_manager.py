import os
import shutil
from rich.progress import Progress
from requests import Response


def generate_file_from_request_with_progress(resp, filename, path, task = None, progress = None):
    """
    Generate file from requested file
    :param Response resp: Response that succeed from file download
    :param filename: Name of file when it gets generated
    :param path: Path for generating the file
    :param Progress progress:
    :return:
    """

    # Generate directories if not exist
    if not os.path.exists(path):
        os.makedirs(path)

    # Generate the file
    with open(f'{path}/{filename}', 'wb') as file:
        for chunk in resp.iter_content(1024):
            file.write(chunk)
            progress.update(task, advance=len(chunk))
        file.close()


def get_filename_from_request(resp: Response):
    filename = resp.headers.get('Content-Disposition')
    if filename is not None:
        return filename
    else:
        return resp.url.split('/')[-1]