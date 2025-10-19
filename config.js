// environment configuration
const GRID_SIZE = 12;
const CELL_SIZE = 40;
const TERRAIN_TYPES = {
    OBSTACLE: 0,
    SAND: 1,
    MUD: 2,
    WATER: 3
};

const TERRAIN_COSTS = {
    [TERRAIN_TYPES.SAND]: 1,
    [TERRAIN_TYPES.MUD]: 5,
    [TERRAIN_TYPES.WATER]: 10
};

const TERRAIN_COLORS = {
    [TERRAIN_TYPES.OBSTACLE]: [25, 25, 25],
    [TERRAIN_TYPES.SAND]: [238, 224, 199],
    [TERRAIN_TYPES.MUD]: [112, 84, 62],
    [TERRAIN_TYPES.WATER]: [6, 122, 207]
};

// global vars
let grid = [];
let agent;
let food;
let searchType = null;
let animationPlaying = false;
let currentSearch = null;
let collectedFood = 0;
let totalCost = 0;
let canvas;
let searchInProgress = false;