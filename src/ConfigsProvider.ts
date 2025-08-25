import * as vscode from 'vscode';
import * as path from 'path';

export class ConfigsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

  constructor() {}

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      return [];
    }

    if (element) {
      return []; // No sub-children
    }

    const config = vscode.workspace.getConfiguration('simpleConfigVault');
    const patterns = config.get<string[]>('filePatterns', []);

    if (patterns.length === 0) {
      return [];
    }

    // Collect unique files using a Map keyed by fsPath
    const fileMap = new Map<string, vscode.TreeItem>();
    const combinedPattern = `{${patterns.join(',')}}`;
    const found = await vscode.workspace.findFiles(new vscode.RelativePattern(workspaceRoot, combinedPattern), null);

    found.forEach(uri => {
      const relPath = path.relative(workspaceRoot, uri.fsPath);
      const label = relPath || path.basename(uri.fsPath); // Use relative path for label
      if (!fileMap.has(uri.fsPath)) {
        fileMap.set(uri.fsPath, new ConfigFile(label, uri));
      }
    });

    return Array.from(fileMap.values());
  }

  getParent(element: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem> {
    return undefined; // All items are top-level
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  async updateFileExclusions(): Promise<void> {
    const config = vscode.workspace.getConfiguration('simpleConfigVault');
    const isVisible = config.get<boolean>('visible', true);
    const patterns = config.get<string[]>('filePatterns', []);
    const filesConfig = vscode.workspace.getConfiguration('files');
    const sourceExclude = filesConfig.get<{ [key: string]: boolean }>('exclude', {});
    const newExclude = { ...sourceExclude };

    patterns.forEach(pattern => {
      const excludePattern = pattern.startsWith('**/') ? pattern : `**/${pattern}`;
      if (isVisible) {
        newExclude[excludePattern] = true;
      } else {
        delete newExclude[excludePattern];
      }
    });

    await filesConfig.update('exclude', newExclude, vscode.ConfigurationTarget.Workspace);
  }
}

class ConfigFile extends vscode.TreeItem {
  constructor(label: string, public resourceUri: vscode.Uri) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.command = { command: 'vscode.open', title: 'Open File', arguments: [this.resourceUri] };
    this.contextValue = 'file';
  }
}
