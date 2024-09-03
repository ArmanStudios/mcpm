import json
import os
from typing import Optional

from src.utils.registry import get_install_path


def __(key: str, attributes=None):
    if attributes is None:
        attributes = {}

    deflang = 'en_US'  # TODO

    node_priority = key.split('.')
    with open(f'{get_install_path() or os.getcwd()}/lang/{deflang}/{node_priority[0]}.json') as file:
        keys_json = file.read()
    keys = json.loads(keys_json)
    del node_priority[0]

    for node in node_priority:
        if isinstance(keys, dict) and node in keys:
            keys = keys[node]
        elif isinstance(keys, list):
            try:
                # Convert key to integer if it is in string format (for list indices)
                node = int(node)
                keys = keys[node]
            except (ValueError, IndexError):
                raise KeyError(f"Translation Node '{node}' not found.")
        else:
            raise KeyError(f"Translation Node '{node}' not found.")

    return keys.format(**attributes)