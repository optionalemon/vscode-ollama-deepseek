import * as vscode from "vscode";
import ollama from "ollama";

export function activate(context: vscode.ExtensionContext) {
	console.log(
		'Congratulations, your extension "vscode-extension" is now active!'
	);

	let disposable = vscode.commands.registerCommand(
		"ollama-deepseek-ext.startDeepSeekChat",
		() => {
			const panel = vscode.window.createWebviewPanel(
				"deepChat",
				"DeepSeek Chat",
				vscode.ViewColumn.One,
				{ enableScripts: true }
			);

			panel.webview.html = getWebViewContent();

			panel.webview.onDidReceiveMessage(
				async (message: any) => {
					if (message.command === "chat") {
						const userPrompt = message.q;
						let responseText = '';

						console.log("User Prompt: ", userPrompt);

						try {
							const streamResponse = await ollama.chat({
								model: "deepseek-r1:latest",
								messages: [{ role: "user", content: userPrompt }],
								stream: true,
							});

							for await (const response of streamResponse) {
								responseText += response.message.content;
								panel.webview.postMessage({ command: 'chatResponse', answer: responseText });
							}
						} catch (error) {
							console.error(error);
						}
					}
				}
			);
		}
	);

	context.subscriptions.push(disposable);
}

function getWebViewContent(): string {
	return /*html*/ `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<style>
				body {
					font-family: sans-serif;
					margin:1rem;
				}
				#prompt {
					width: 100%;
					box-sizing: border-box;
				}
				#response {
					border: 1px solid #ccc;
					margin-top: 1rem;
					padding: 1rem;
					min-height: 200px;
				}
			</style>
		</head>	
		<body>
			<h1>DeepSeek Chat</h1>
			<div>
				<input type="text" id="prompt" placeholder="Ask me anything...">
				<button id="askBtn">Ask</button>
			</div>
			<div id="response"></div>
			<script>
				const vscode = acquireVsCodeApi();
				const question = document.getElementById('prompt');
				const ask = document.getElementById('askBtn');
				const response = document.getElementById('response');

				ask.addEventListener('click', () => {
					const q = question.value;
					if (!q) return;
					response.innerText = 'Loading...';
					vscode.postMessage({ command: 'chat', q });
				});

				window.addEventListener('message', event => {
					const { command, answer } = event.data;
					if (command === 'chatResponse') {
						console.log('Chat Response: ', answer);
						response.innerText = answer;
					}
				});
			</script>
		</body>
		</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() { }
