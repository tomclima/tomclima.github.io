let lastStepTime = 0;
const STEP_DELAY = 50;

function setup()
{
    // creates canvas inside container
    const canvasContainer = document.getElementById('canvasContainer');
    canvas = createCanvas(GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    canvas.parent('canvasContainer');
    
    generateGrid();
    agent = new Agent();
    placeFood();
}

function draw()
{
    background(255);
    drawGrid();
    drawFood();
    drawAgent();
    
    if (animationPlaying && agent.moving)
    {
        agent.move();
    }
    else if (searchInProgress && !agent.moving)
    {
        const now = millis(); // tempo atual em ms desde o início do sketch
        if (now - lastStepTime > STEP_DELAY)
        {
            continueSearch();
            lastStepTime = now;
        }
    }
}

function changeSearchType(type)
{
    searchType = type;
}

function startSearch()
{
    currentSearch = {
        type: searchType,
        visited: new Set(),
        frontier: [],
        path: null
    };
    
    // initializes the search
    switch(searchType)
    {
        case 'bfs':
            initializeBFSSearch();
            break;

        case 'dfs':
            initializeDFSSearch();
            break;

        case 'ucs':
            initializeUCSSearch();
            break;

        case 'greedy':
            initializeGreedySearch();
            break;

        case 'astar':
            initializeAStarSearch();
            break;
    }
    
    searchInProgress = true;
    animationPlaying = true;
}


function continueSearch()
{
    if (!currentSearch || !searchInProgress) return;
    
    switch(currentSearch.type)
    {
        case 'bfs':
            bfsSearchStep();
            break;

        case 'dfs':
            dfsSearchStep();
            break;

        case 'ucs':
            ucsSearchStep();
            break;

        case 'greedy':
            greedySearchStep();
            break;

        case 'astar':
            aStarSearchStep();
            break;
    }
}

function resetEnvironment()
{
    generateGrid();
    agent.reset();
    placeFood();

    currentSearch = null;
    collectedFood = 0;
    totalCost = 0;

    animationPlaying = false;
    searchInProgress = false;
}