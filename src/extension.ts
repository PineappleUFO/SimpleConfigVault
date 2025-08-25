import * as vscode from 'vscode';
import { ConfigsProvider } from './ConfigsProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new ConfigsProvider();
  vscode.window.createTreeView('simpleConfigVaultView', { treeDataProvider: provider });

  // Commands
  context.subscriptions.push(vscode.commands.registerCommand('simpleConfigVault.refresh', async () => {
    const rootUri = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (rootUri) {
      await provider.updateFileExclusions();
      await vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
    }
    provider.refresh();
  }));

  context.subscriptions.push(vscode.commands.registerCommand('simpleConfigVault.toggleVisibility', async () => {
    const config = vscode.workspace.getConfiguration('simpleConfigVault');
    const current = config.get<boolean>('visible', true);
    await config.update('visible', !current, vscode.ConfigurationTarget.Workspace);
  }));

  // Listeners
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('simpleConfigVault')) {
      vscode.commands.executeCommand('simpleConfigVault.refresh');
    }
  }));

  context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
    vscode.commands.executeCommand('simpleConfigVault.refresh');
  }));

  // Initial setup
  const config = vscode.workspace.getConfiguration('simpleConfigVault');
  const isVisible = config.get<boolean>('visible', true);
  if (isVisible) {
    vscode.commands.executeCommand('simpleConfigVault.refresh');
  }
}

export function deactivate(): Thenable<void> | undefined {
  if (!vscode.workspace.workspaceFolders) {
    return;
  }
  // Clean up only our excludes
  const config = vscode.workspace.getConfiguration('simpleConfigVault');
  const patterns = config.get<string[]>('filePatterns', []);
  const filesConfig = vscode.workspace.getConfiguration('files');
  const exclude: { [key: string]: boolean } = filesConfig.get('exclude', {});
  patterns.forEach(pattern => {
    const excludePattern = pattern.startsWith('**/') ? pattern : `**/${pattern}`;
    delete exclude[excludePattern];
  });
  return filesConfig.update('exclude', exclude, vscode.ConfigurationTarget.Workspace);
}
