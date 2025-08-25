# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-08-25

### Added

-   **Virtual Configuration Folder**: Implemented a new tree view in the explorer named `[configs]` that displays a virtual folder containing common configuration files from your project.
-   **Customizable File Patterns**: Added a new setting, `simpleConfigVault.filePatterns`, allowing users to define which files appear in the virtual folder using glob patterns.
-   **Toggle Visibility**: Introduced a new command, `simpleConfigVault.toggleVisibility`, and a corresponding setting, `simpleConfigVault.visible`, to show or hide the virtual folder.
-   **Dynamic Refresh**: The virtual folder now automatically refreshes when the configuration changes or when a new workspace folder is opened.
-   **Manual Refresh**: Added a `simpleConfigVault.refresh` command to allow users to manually refresh the contents of the virtual folder.
-   **File Exclusion**: Files shown in the virtual folder are now automatically hidden from the file explorer to reduce clutter. This behavior is linked to the `simpleConfig-vault.visible` setting.
-   **Initial Project Setup**: The extension now initializes correctly, setting up all necessary commands, listeners, and the initial view state upon activation.

### Changed

-   **Project Structure**: Refactored the entire extension from the initial template to a more robust and maintainable structure.
-   **Activation Events**: The extension now activates when its view is visible, ensuring it only runs when needed.
-   **Configuration**: All settings are now properly defined under the `simpleConfigVault` configuration section.

