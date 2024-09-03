import winreg


def get_install_path():
    reg_path = f'SOFTWARE\\mcpm\\Installation'

    # Try reading the 64-bit registry key
    try:
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, reg_path) as key:
            install_path, _ = winreg.QueryValueEx(key, "Path")
            return install_path
    except FileNotFoundError:
        pass

    # Try reading the 32-bit registry key
    try:
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, f"SOFTWARE\\WOW6432Node\\mcpm\\Installation") as key:
            install_path, _ = winreg.QueryValueEx(key, "Path")
            return install_path
    except FileNotFoundError:
        pass

    return None