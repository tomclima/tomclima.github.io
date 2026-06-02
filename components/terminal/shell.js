let commandHistory = [];
let displayedCommands = [];
let historyIndex = -1;


export function shell_history(inputField){
    
    inputField.addEventListener('keydown', function(e) {

        if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length; // Move index to the end
                inputField.value = ''; // Clear input if we go past the last command
            }
        }
    });
}

export function run_command(inputField){
    
    inputField.addEventListener('keydown', function(e) {

        if (e.key === 'Enter') {
            const command = inputField.value.trim();
            displayedCommands.push((["cmd", command]))
            renderOutput()
            if(command=="history"){
                    commandHistory.forEach(element => {
                    displayedCommands.push(["out", element])
                });
                renderOutput()
            }
            else if (command == "home"){
                window.location.replace("/")
            }
            else if (command=="whoami"){
                window.location.replace("/whoami")
            }
            else if(command =="clear_history"){
                commandHistory = [];
                historyIndex=0;
            }
            else if(command =="clear"){
                displayedCommands=[];
                renderOutput();
            }
            if(command){
               commandHistory.push(command);
                historyIndex = commandHistory.length; // Reset index to the end of the history
                inputField.value = ''; // Clear input after executing command
            }
        }
    });
}


function renderOutput() {
    const outputTarget = document.querySelector('.terminal-output');
    if (!outputTarget) return;

    // 1. Clear everything currently on the screen safely
    outputTarget.innerHTML = '';

    // Loop through the array and build an HTML element for each string
    displayedCommands.forEach(([type, text]) => {
        const line = document.createElement('div');
        line.className = 'terminal-historic-line';

        // 2. Create the prompt span and the command text span in memory
        const promptSpan = document.createElement('span');
        promptSpan.className = 'terminal-output'; // Keeps your rotating block layout!

        const textSpan = document.createElement('span');
        textSpan.className = 'command-text';
        
        // 3. Inject text safely using textContent to prevent script injections
        textSpan.textContent = text;

        // 4. Evaluate types correctly using triple equals (===)
        if (type === "cmd") {
            promptSpan.textContent = 'tomclima@portfolio:~$';

        } 
        line.appendChild(promptSpan);
        line.appendChild(textSpan);

        // 5. Send the securely constructed line directly to the terminal target
        outputTarget.appendChild(line);
    });

    // Auto-scroll to the bottom
    const screen = document.querySelector('.terminal-screen');
    if (screen) {
        screen.scrollTop = screen.scrollHeight;
    }
}
