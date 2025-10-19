let started = false;
let currentSearchType = "bfs";

// updates searchType accordingly to the radio buttons
document.querySelectorAll('input[name="searchType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (!started)
        {
            currentSearchType = radio.value;
            changeSearchType(currentSearchType);
        }
    });
});

// start button
document.getElementById("btnStart").addEventListener("click", () => {
    if (!started)
    {
        started = true;
        document.getElementById("btnStart").disabled = true;
        document.getElementById("resetEnvBtn").disabled = true;

        // deactivate the radio buttons
        document.querySelectorAll('input[name="searchType"]').forEach(r => r.disabled = true);

        // starts search
        changeSearchType(currentSearchType);
        startSearch();
    }
});