// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
	export function activate(context: vscode.ExtensionContext) {

		context.subscriptions.push(
			vscode.window.registerWebviewViewProvider(
				"myView",
				new MyViewProvider()
			)
		);

		context.subscriptions.push(
			vscode.commands.registerCommand('myView.postMessage', () => {
				vscode.window.showInformationMessage('Hello from the webview!');
			})
		);
	}

// This method is called when your extension is deactivated
export function deactivate() {}

export class MyViewProvider implements vscode.WebviewViewProvider {
	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		token: vscode.CancellationToken
		) {
			webviewView.webview.options = {
			enableScripts: true
			};

			webviewView.webview.html = `
				<html>
				<body>
					<button onclick="vscode.postMessage({ command: 'showMessage' })">Click Me</button>
				</body>
				<script>
					const vscode = acquireVsCodeApi();
				</script>
				</html>
			`;
		}
}