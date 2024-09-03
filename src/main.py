import typer

from src.cli.commands import *


app = typer.Typer(no_args_is_help=True)


@app.command()
def install(resource_type: str, resources: list[str]):
    match resource_type:
        case 'plugin' | 'p':
            install_plugin(resources)
        case 'resource-pack' | 'rp' | 'resourcepack':
            install_resourcepack(resources)


@app.command(hidden=True)
def secret():
    raise NotImplementedError()


if __name__ == "__main__":
    app()
