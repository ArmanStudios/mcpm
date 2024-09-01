class FileIsNotPluginException(Exception):
    def __init__(self):
        super().__init__("The requested file is not a plugin. Consider to check the plugin download link.")