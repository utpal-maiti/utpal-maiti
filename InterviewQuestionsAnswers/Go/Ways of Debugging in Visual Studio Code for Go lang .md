Debugging Go code in Visual Studio Code (VS Code) can be quite efficient with the right setup. Here are some steps and tips to help you get started:

1. **Install the Go Extension**:
   - Open VS Code and go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
   - Search for "Go" and install the official Go extension by the Go team.

2. **Install Delve**:
   - Delve is a debugger for the Go programming language. You can install it by running the following command in your terminal:
     ```sh
     go install github.com/go-delve/delve/cmd/dlv@latest
     ```

3. **Configure Your Debugger**:
   - Open your Go project in VS Code.
   - Click on the Run and Debug icon in the Activity Bar.
   - Click on "create a launch.json file" to create a new configuration file.
   - Select "Go" from the list of environments. This will generate a `launch.json` file with a default configuration.

4. **Set Breakpoints**:
   - Open the Go file you want to debug.
   - Click in the gutter to the left of the line numbers to set breakpoints. A red dot will appear to indicate the breakpoint.

5. **Start Debugging**:
   - Click on the green play button in the Run and Debug view or press `F5` to start debugging.
   - The debugger will start, and execution will pause at the breakpoints you've set.

6. **Use Debugging Tools**:
   - **Variables**: Inspect variables in the VARIABLES section of the Debug view.
   - **Watch**: Add expressions to the WATCH section to monitor their values.
   - **Call Stack**: View the call stack to understand the sequence of function calls.
   - **Step Over/Into/Out**: Use these commands to navigate through your code.

For more detailed instructions and examples, you can refer to the [DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/debugging-go-code-with-visual-studio-code) [1](https://www.digitalocean.com/community/tutorials/debugging-go-code-with-visual-studio-code) and the [VS Code documentation](https://code.visualstudio.com/docs/languages/go) [2](https://code.visualstudio.com/docs/languages/go).