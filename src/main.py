import typer

from src.cli.commands import install_plugin

# import src.cli.install as command_install


app = typer.Typer(invoke_without_command=True)
# app.add_typer(command_install.app, name='install')


@app.command()
def install(resource_type: str, resource_id: list[int]):
    match resource_type:
        case 'plugin':
            install_plugin(resource_id)


@app.command(hidden=True)
def secret():
    raise NotImplementedError()


if __name__ == "__main__":
    app()
