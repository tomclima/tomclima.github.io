class Node
{
    constructor(x, y, parent = null, cost = 0, heuristic = 0)
    {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.cost = cost;
        this.heuristic = heuristic;
        this.totalCost = cost + heuristic;
    }
}

function nodeToString(node)
{
    return `${node.x},${node.y}`;
}

function manhattanDistance(x1, y1, x2, y2)
{
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function reconstructPath(node)
{
    const path = [];
    let current = node;

    while (current !== null)
    {
        path.unshift({x: current.x, y: current.y});
        current = current.parent;
    }
    
    return path;
}