class Agent
{
    constructor()
    {
        this.reset();
    }
    
    reset()
    {
        do {
            this.x = Math.floor(Math.random() * GRID_SIZE);
            this.y = Math.floor(Math.random() * GRID_SIZE);
        } while (grid[this.y][this.x] === TERRAIN_TYPES.OBSTACLE);
        
        this.start_x = this.x;
        this.start_y = this.y;
        this.path = [];
        this.currentPathIndex = 0;
        this.moving = false;
    }

    resetStartPos()
    {
        this.start_x = this.x;
        this.start_y = this.y;
    }
    
    setPath(path)
    {
        // remove o primeiro elemento se for igual à posição atual
        if (path.length > 0 && path[0].x === this.x && path[0].y === this.y)
        {
            path.shift();
        }

        this.path = path;
        this.currentPathIndex = 0;
        this.moving = path.length > 0;
    }
    
    move() {
        if (!this.moving || this.waiting || this.currentPathIndex >= this.path.length)
        {
            if (this.currentPathIndex >= this.path.length) { this.moving = false; }
            return;
        }

        const currTerrain = grid[this.y][this.x];
        const currCost = TERRAIN_COSTS[currTerrain] || 1; // fallback
        const delay = currCost * 100;

        // to avoid multiple setTimeout simultaneously
        this.waiting = true;

        // only updates position when delay finishes
        this.timerId = setTimeout(() => {

            if (currTerrain !== TERRAIN_TYPES.OBSTACLE) 
            {
                totalCost += currCost;
                document.getElementById("totalCost").innerText = totalCost;
            }

            // moves the agent
            const nextNode = this.path[this.currentPathIndex];
            this.x = nextNode.x;
            this.y = nextNode.y;

            this.currentPathIndex++;
            this.waiting = false;
            this.timerId = null;

            // checks food collision
            if (this.x === food.x && this.y === food.y)
            {
                collectedFood++;
                document.getElementById("foodCount").innerText = collectedFood;

                totalCost += TERRAIN_COSTS[grid[this.y][this.x]];
                document.getElementById("totalCost").innerText = totalCost;
                totalCost = 0;

                setTimeout(() => {
                    this.resetStartPos();
                    placeFood();
                    startSearch();
                    document.getElementById("totalCost").innerText = totalCost;
                }, 1500);
            }

            // finished the path
            if (this.currentPathIndex >= this.path.length) { this.moving = false; }

        }, delay);
    }
}