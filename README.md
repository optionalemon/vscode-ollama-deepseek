# VSCode DeepSeek Chat Extension

## Overview
A tryout implementation of VSCode extension that integrates DeepSeek AI chat functionality using the Ollama API. It provides a webview-based chat interface where users can interact with the DeepSeek model directly from VSCode.

## Features
- Chat with DeepSeek AI within a VSCode webview panel.
- Streamed responses for real-time conversation.
- Simple UI with input and response display.

## Installation
1. Clone this repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Ollama and pull the DeepSeek model:
   ```sh
   npm install ollama  # Install Ollama
   ollama pull deepseek-r1  # Pull DeepSeek model
   ```

## Usage
1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and run:
   ```
   > Debug: Start Debugging
   ```
3. There should be a new VSCode tab. Open the command palette on that tab and run:
   ```
   > Start DeepSeek Chat
   ```
4. Type a question and click **Ask** to interact with DeepSeek AI.

## Troubleshooting
- **No response from the chat?**
  - Ensure Ollama is available by executing:
    ```sh
    ollama pull deepseek-r1 # OR ollama run deepseek-r1
    ```
  - Check the VSCode Debug Console for errors.
- **Webview not updating?**
  - Reload the extension (`Ctrl+Shift+P` → `Developer: Reload Window`).
