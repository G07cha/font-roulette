// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as utils from './utils';

const availableFonts: ReadonlyArray<string> = ['Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Comic Sans MS', 'Trebuchet MS', 'Impact', 'monospace'];

function getRandomFont(): string {
	const fontIndex = utils.getRandomInt(0, availableFonts.length - 1);
	return availableFonts[fontIndex];
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const font = getRandomFont();

	console.debug(`[font-roulette] Setting ${font} font`);

	const oldFont = vscode.workspace.getConfiguration().editor.fontFamily;
	vscode.workspace.getConfiguration().update('editor.fontFamily', font, vscode.ConfigurationTarget.Global);

	let disposable = vscode.commands.registerCommand('extension.revert', () => {
		vscode.workspace.getConfiguration().update('editor.fontFamily', oldFont, vscode.ConfigurationTarget.Global);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
