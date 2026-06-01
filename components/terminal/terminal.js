// DRAGGING LOGIC
const handle = document.querySelector('.terminal-resize-handle');
const wrapper = document.querySelector('.terminal-wrapper');
let isDragging = false;

window.addEventListener('mousedown', function(e) {
    isDragging = true;
    e.preventDefault(); // Prevent text selection while dragging
});

handle.addEventListener('mouseup', function() {
    isDragging = false;
});


window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        // Calculate height based on how high the mouse is from the bottom of the window
        let newHeight = window.innerHeight - e.clientY;

        const minLimit = 60;  
        const maxLimit = window.innerHeight * 0.8; 

        if (newHeight >= minLimit && newHeight <= maxLimit) {
            // Force the wrapper height with an explicit CSS style injector
            wrapper.style.setProperty('height', newHeight + 'px', 'important');
            
            // Force the handle bar to track right along the upper border lip
            handle.style.setProperty('bottom', (newHeight - 5) + 'px', 'important');
        }
    });



// COMMAND HISTORY
let commandHistory = [];
let historyIndex = -1;

const inputField = document.getElementById('terminal-input');

inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = inputField.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length; // Reset index to the end of the history
            inputField.value = ''; // Clear input after executing command
        }
    } else if (e.key === 'ArrowUp') {
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