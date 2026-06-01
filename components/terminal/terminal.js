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

import { shell_history } from './shell.js';
import { run_command } from './shell.js';

shell_history(inputField);
run_command(inputField);