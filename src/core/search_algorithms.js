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


// region BFS
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
    
    // FIFO
    const currentNode = currentSearch.frontier.shift();
    
    // found the food
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;

        return;
    }
    
    // adding the neighbors in the frontier array
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr)) // not visited
        {
            currentSearch.visited.add(neighborStr);

            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode);
            currentSearch.frontier.push(neighborNode);
        }
    }
}
// endregion BFS


// region DFS
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

    // LIFO
    const currentNode = currentSearch.frontier.pop();
    
    // found the food
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;

        return;
    }
    
    // adding the neighbors in the frontier array
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr)) // not visited
        {
            currentSearch.visited.add(neighborStr);
            
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode);
            currentSearch.frontier.push(neighborNode);
        }
    }
}
// endregion DFS


// region UCS
function initializeUCSSearch()
{
    const startNode = new Node(agent.x, agent.y, null, 0);
    currentSearch.frontier = [startNode];
}

function ucsSearchStep()
{
    if (currentSearch.frontier.length === 0)
    {
        searchInProgress = false;
        return;
    }
    
    // orders the frontier array
    currentSearch.frontier.sort((a, b) => a.cost - b.cost);
    const currentNode = currentSearch.frontier.shift(); // lower cost
    const currentStr = nodeToString(currentNode);
    
    if (currentSearch.visited.has(currentStr)) { return; } // already visited
    currentSearch.visited.add(currentStr);
    
    // found the food
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;

        return;
    }
    
    // adding neighbors to the frontier array
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr)) // not visited
        {
            const terrainCost = TERRAIN_COSTS[grid[neighbor.y][neighbor.x]];
            const newCost = currentNode.cost + terrainCost;
            
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode, newCost);
            currentSearch.frontier.push(neighborNode);
        }
    }
}
// endregion UCS


// region Greedy
function initializeGreedySearch()
{
    const heuristic = manhattanDistance(agent.x, agent.y, food.x, food.y);
    const startNode = new Node(agent.x, agent.y, null, 0, heuristic);

    currentSearch.frontier = [startNode];
}

function greedySearchStep()
{
    if (currentSearch.frontier.length === 0)
    {
        searchInProgress = false;
        return;
    }
    
    // orders based on heuristic
    currentSearch.frontier.sort((a, b) => a.heuristic - b.heuristic);
    const currentNode = currentSearch.frontier.shift(); // lower heuristic
    const currentStr = nodeToString(currentNode);
    
    if (currentSearch.visited.has(currentStr)) { return; } // already visited
    currentSearch.visited.add(currentStr);

    // found the food
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;

        return;
    }
    
    // adding neighbors to the frontier array
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr)) // not visited
        {
            const heuristic = manhattanDistance(neighbor.x, neighbor.y, food.x, food.y);
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode, 0, heuristic);

            currentSearch.frontier.push(neighborNode);
        }
    }
}
// endregion Greedy


// region A*
function initializeAStarSearch()
{
    const heuristic = manhattanDistance(agent.x, agent.y, food.x, food.y);
    const startNode = new Node(agent.x, agent.y, null, 0, heuristic);

    currentSearch.frontier = [startNode];
}

function aStarSearchStep()
{
    if (currentSearch.frontier.length === 0)
    {
        searchInProgress = false;
        return;
    }
    
    // sorts based on totalCost (cost + heuristic)
    currentSearch.frontier.sort((a, b) => a.totalCost - b.totalCost);
    const currentNode = currentSearch.frontier.shift(); // lower totalCost
    const currentStr = nodeToString(currentNode);
    
    if (currentSearch.visited.has(currentStr)) { return; }
    currentSearch.visited.add(currentStr);
    
    // found the food
    if (currentNode.x === food.x && currentNode.y === food.y)
    {
        currentSearch.path = reconstructPath(currentNode);
        agent.setPath(currentSearch.path);
        searchInProgress = false;

        return;
    }
    
    // adding neighbors to the frontier array
    for (let neighbor of getNeighbors(currentNode))
    {
        const neighborStr = nodeToString(neighbor);
        if (!currentSearch.visited.has(neighborStr)) // not visited
        {
            const terrainCost = TERRAIN_COSTS[grid[neighbor.y][neighbor.x]];
            const newCost = currentNode.cost + terrainCost;
            const heuristic = manhattanDistance(neighbor.x, neighbor.y, food.x, food.y);
            const neighborNode = new Node(neighbor.x, neighbor.y, currentNode, newCost, heuristic);

            currentSearch.frontier.push(neighborNode);
        }
    }
}
// endregion A*