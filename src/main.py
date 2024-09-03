import typer

from src.cli.commands import *

# import src.cli.install as command_install


app = typer.Typer(invoke_without_command=True)
# app.add_typer(command_install.app, name='install')


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
