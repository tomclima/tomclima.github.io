function generateGrid()
{
    let obstacle_prob = 10 / 100; // 10%
    let sand_prob = 40 / 100; // 40%
    let mud_prob = 30 / 100; // 30%
    // let water_prob = 20 / 100; // 20%

    grid = [];
    for (let y = 0; y < GRID_SIZE; y++)
    {
        grid[y] = [];
        for (let x = 0; x < GRID_SIZE; x++)
        {
            const rand = Math.random(); // 1 <= rand <= 0
            let curr_prob = obstacle_prob;

            if (rand < curr_prob) { grid[y][x] = TERRAIN_TYPES.OBSTACLE; }
            else if (rand < (curr_prob += sand_prob)) { grid[y][x] = TERRAIN_TYPES.SAND; }
            else if (rand < (curr_prob += mud_prob)) { grid[y][x] = TERRAIN_TYPES.MUD; }
            else { grid[y][x] = TERRAIN_TYPES.WATER; }
        }
    }
}

function placeFood()
{
    let is_food_in_obstacle = true;
    let is_food_in_agent_pos = true;
    // let attempts = 0;

    do
    {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        }

        is_food_in_obstacle = (grid[food.y][food.x] === TERRAIN_TYPES.OBSTACLE);
        is_food_in_agent_pos = (food.x === agent.x && food.y === agent.y);

        // if (attempts++ > 100) break; // limiting iterations

    } while (is_food_in_agent_pos || is_food_in_obstacle)
    
    console.log("Food at:", food.x, food.y);
}

function drawGrid()
{
    // draws terrain
    for (let y = 0; y < GRID_SIZE; y++)
    {
        for (let x = 0; x < GRID_SIZE; x++)
        {
            const terrain = grid[y][x];
            const color = TERRAIN_COLORS[terrain];
            fill(color[0], color[1], color[2]);
            noStroke();
            rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            
            // draws terrain costs
            if (terrain !== TERRAIN_TYPES.OBSTACLE)
            {
                fill(0);
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(8);

                text(TERRAIN_COSTS[terrain], 
                     x * CELL_SIZE + CELL_SIZE/2, 
                     y * CELL_SIZE + CELL_SIZE/2);
            }
        }
    }

    if (currentSearch) { drawSearchState(); }
}

function drawSearchState()
{
    const half_cell = CELL_SIZE / 2;

    // visited nodes
    fill(34, 139, 34, 127);
    noStroke();
    for (let node of Array.from(currentSearch.visited))
    {
        const [x, y] = node.split(',').map(Number);
        circle(x * CELL_SIZE + half_cell, y * CELL_SIZE + half_cell, half_cell);
    }
    
    // border nodes
    fill(255, 6, 6, 127);
    noStroke();
    for (let node of currentSearch.frontier)
    {
        circle(node.x * CELL_SIZE + half_cell, node.y * CELL_SIZE + half_cell, half_cell);
    }
    
    // final path
    if (currentSearch.path)
    {
        stroke(225, 173, 1);
        strokeWeight(3);
        noFill();
        beginShape();
        
        vertex(agent.start_x * CELL_SIZE + half_cell, 
               agent.start_y * CELL_SIZE + half_cell);
        for (let node of currentSearch.path)
        {
            vertex(node.x * CELL_SIZE + half_cell, 
                   node.y * CELL_SIZE + half_cell);
        }

        endShape();
    }
}

function drawFood()
{
    push();
    noStroke();
    fill(225, 173, 1);
    circle(food.x * CELL_SIZE + CELL_SIZE/2, food.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE * 0.7);
    pop();
}

function drawAgent()
{
    push();
    noStroke();

    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(0, 255, 255);

    fill(0, 255, 255);
    circle(agent.x * CELL_SIZE + CELL_SIZE/2, agent.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2);
    pop();
}