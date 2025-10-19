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
        
        this.path = [];
        this.currentPathIndex = 0;
        this.moving = false;
    }
    
    setPath(path)
    {
        this.path = path;
        this.currentPathIndex = 0;
        this.moving = path.length > 0;
    }
    
    move()
    {
        if (this.moving && this.currentPathIndex < this.path.length)
        {
            const nextNode = this.path[this.currentPathIndex];
            this.x = nextNode.x;
            this.y = nextNode.y;
            this.currentPathIndex++;
            
            // adds movement cost
            const terrain = grid[this.y][this.x];
            if (terrain !== TERRAIN_TYPES.OBSTACLE)
            {
                totalCost += TERRAIN_COSTS[terrain];
            }
            
            // checks if collected the food
            if (this.x === food.x && this.y === food.y)
            {
                collectedFood++;
                document.getElementById("foodCount").innerText = collectedFood;

                setTimeout(() => {
                    placeFood();
                    startSearch();
                }, 1000);
            }
        }
        else { this.moving = false; }
    }
}