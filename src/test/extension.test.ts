import * as assert from 'assert';
import * as vscode from 'vscode';


import { ConfigsProvider } from '../ConfigsProvider';

suite('Extension Test Suite', function () {
    this.timeout(10000);

    test('ConfigsProvider should find configured files', async () => {
        const config = vscode.workspace.getConfiguration('simpleConfigVault');
        await config.update('filePatterns', ['tsconfig.json', '.gitignore'], vscode.ConfigurationTarget.Workspace);

        const provider = new ConfigsProvider();
        const children = await provider.getChildren();

        assert.strictEqual(children.length, 2, 'Should find 2 files');
        const labels = children.map(c => c.label);
        assert.ok(labels.includes('tsconfig.json'), 'Should include tsconfig.json');
        assert.ok(labels.includes('.gitignore'), 'Should include .gitignore');
    });

    test('updateFileExclusions should update files.exclude configuration', async () => {
        const config = vscode.workspace.getConfiguration('simpleConfigVault');
        await config.update('visible', true, vscode.ConfigurationTarget.Workspace);
        await config.update('filePatterns', ['vite.config.js'], vscode.ConfigurationTarget.Workspace);

        const provider = new ConfigsProvider();
        await provider.updateFileExclusions();

        const filesConfig = vscode.workspace.getConfiguration('files');
        const exclude = filesConfig.get<object>('exclude');
        assert.ok(exclude, 'Exclude config should exist');
        assert.strictEqual((exclude as any)['**/vite.config.js'], true, 'vite.config.js should be excluded');

        // Test hiding files
        await config.update('visible', false, vscode.ConfigurationTarget.Workspace);
        await provider.updateFileExclusions();
        const newFilesConfig = vscode.workspace.getConfiguration('files');
        const newExclude = newFilesConfig.get<object>('exclude');
        assert.strictEqual((newExclude as any)['**/vite.config.js'], undefined, 'vite.config.js should not be excluded when not visible');
    });



    test('refresh command should be executable', async () => {
        // This test mainly ensures the command is registered and doesn't throw an error.
        try {
            await vscode.commands.executeCommand('simpleConfigVault.refresh');
            assert.ok(true, 'Refresh command executed without error');
        } catch (error) {
            assert.fail('The refresh command should not throw an error.');
        }
    });
});
