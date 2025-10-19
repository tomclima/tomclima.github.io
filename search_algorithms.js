function getNeighbors(node)
{
    const neighbors = [];
    const directions = [
        {dx: 0, dy: -1}, // up
        {dx: 1, dy: 0},  // right
        {dx: 0, dy: 1},  // down
        {dx: -1, dy: 0}  // left
    ];
    
    for (let dir of directions)
    {
        const nx = node.x + dir.dx;
        const ny = node.y + dir.dy;
        
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && 
            grid[ny][nx] !== TERRAIN_TYPES.OBSTACLE)
        {
            neighbors.push({x: nx, y: ny});
        }
    }
    
    return neighbors;
}


function initializeBFSSearch()
{
    const startNode = new Node(agent.x, agent.y);
    currentSearch.frontier = [startNode];
    currentSearch.visited.add(nodeToString(startNode));
}

function bfsSearchStep()
{
    if (currentSearch.frontier.length === 0)
    {
        searchInProgress = false;
        return; 
    }
    
    const currentNode = currentSearch.frontier.shift();
    
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;
        return;
    }
    
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr))
        {
            currentSearch.visited.add(neighborStr);
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode);
            currentSearch.frontier.push(neighborNode);
        }
    }
}


function initializeDFSSearch()
{
    const startNode = new Node(agent.x, agent.y);
    currentSearch.frontier = [startNode];
    currentSearch.visited.add(nodeToString(startNode));
}

function dfsSearchStep()
{
    if (currentSearch.frontier.length === 0) 
    {
        searchInProgress = false;
        return;
    }
    
    const currentNode = currentSearch.frontier.pop();
    
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;
        return;
    }
    
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr))
        {
            currentSearch.visited.add(neighborStr);
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode);
            currentSearch.frontier.push(neighborNode);
        }
    }
}