# Simple Config Vault

**Simple Config Vault** is a Visual Studio Code extension that provides a virtual `[configs]` folder in your explorer, giving you quick access to all your project's configuration files in one place. It helps you declutter your workspace by hiding these files from the main explorer view while keeping them easily accessible.

![readme image](https://github.com/PineappleUFO/SimpleConfigVault/blob/master/src/readme_img.png?raw=true)

## Features

-   **Virtual Config Folder**: Displays a `[configs]` folder at the top of your explorer, containing all your important configuration files.
-   **Automatic File Hiding**: Files shown in the virtual folder are automatically hidden from the file explorer, keeping your workspace clean.
-   **Customizable File Patterns**: You can define which files to include in the virtual folder using glob patterns.
-   **Toggle Visibility**: Easily show or hide the virtual folder and its files with a single command.

## Usage

1.  Install the extension from the Visual Studio Code Marketplace.
2.  Once installed, you will see a `[configs]` folder in your explorer, populated with default configuration files (e.g., `tsconfig.json`, `.gitignore`).
3.  To customize which files appear, modify the `simpleConfigVault.filePatterns` setting in your `.vscode/settings.json` file.

## Commands

-   `simpleConfigVault.refresh`: Manually refreshes the contents of the virtual folder.
-   `simpleConfigVault.toggleVisibility`: Shows or hides the virtual folder and its files.

## Extension Settings

This extension contributes the following settings:

-   `simpleConfigVault.filePatterns`: An array of glob patterns to match the files you want to include in the virtual folder.
    -   **Default**: `["tsconfig*.json", ".gitignore", ".eslintrc*", "vite.config.*", "webpack.config.*"]`
-   `simpleConfigVault.visible`: A boolean to control the visibility of the virtual folder.
    -   **Default**: `true`

## Known Issues

There are no known issues at this time.

## Release Notes

### 0.1.1

-   Added screenshot to README.
-   Added extension tests.
-   Minor fixes and improvements.

### 0.1.0

-   Initial release of Simple Config Vault.
-   Added virtual configuration folder, customizable file patterns, and automatic refresh.

---

**Enjoy a cleaner workspace!**
