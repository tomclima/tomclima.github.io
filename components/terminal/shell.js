let commandHistory = [];
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
            if(command=="history"){
                    commandHistory.forEach(element => {
                    console.log(element)
                });
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
            if(command){
               commandHistory.push(command);
                historyIndex = commandHistory.length; // Reset index to the end of the history
                inputField.value = ''; // Clear input after executing command
            }
        }
    });
}
