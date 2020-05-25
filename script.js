// X // rows 5-50
// Y // colu 5-50
// Z // wall 1-X*Y
// Pos // All except X-max,Y-max

// selecteaza din map ala random X/Y de Z ori
// poate fi un map fara dom creat, mai apoi in rows/cols generate sa fie (pe baza a map) generated
// => gameplay === oricum trebuie un map virtual //nuDom// pt gameplay --- based on rows columns


// ca sa nu le repeti trebui pe _ROWS sa aplici indexOf sa vezi daca este deja wall

var maze_mock_10_10 = 
[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

var virtual_maze = [];
var wall_coord = [];
var virtual_maze_wWalls;


var DOM_ROOT;
var DOM;

(function init__DOM_SELECTORS() {
    DOM_ROOT = document.querySelector('#root');
    DOM = {
        'wrapper': DOM_ROOT.querySelector('.wrapper'),
        'container': DOM_ROOT.querySelector('.container')
    };
})();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function generate_virtual_walls(rows, columns, walls) {
    if (walls > rows*columns) {
        walls = rows*columns;
    }
    wall_coord = [];
    var wall_x;
    var wall_y;
    let i = 0;
    var duplicated = false;

    while (i < walls) {
        duplicated = false;
        wall_x = getRandomInt(0, (rows-1))
        wall_y = getRandomInt(0, (columns-1))

        for (let i = 0; i < wall_coord.length; i++) {
            if(wall_x === wall_coord[i][0] && wall_y === wall_coord[i][1]) {
                duplicated = true;
            }
        }

        if (!duplicated) {
            wall_coord.push([wall_x, wall_y])
            i++;
        }
    }
    // console.error('X/Y for map', wall_coord)
    return wall_coord
}





function generate_virtual_maze(rows, columns, walls) {
    // ROW_X
    // COL_Y
    // EMPTY_MAP
    virtual_maze = [];
    
    for (let i = 0; i < rows; i++) {
        virtual_maze.push([])
        for (let k = 0; k < columns; k++) {
            virtual_maze[i].push(0)
        }
    }

    var wall_coord = generate_virtual_walls(rows, columns, walls);
    // console.warn('---wall_coord--->', wall_coord)


    for (let j = 0; j < wall_coord.length; j++) {
        coord_x = wall_coord[j][0];
        coord_y = wall_coord[j][1];
        console.warn('Maze /W Walls ' + coord_x + ' ' + coord_y)
        virtual_maze[coord_x][coord_y] = 1;
    }
    console.warn('---RESULT--->', virtual_maze)


    // var coord_x;
    // var coord_y;

    // for (let j = 0; j < wall_coord.length; j++) {
    //     coord_x = wall_coord[j][0];
    //     coord_y = wall_coord[j][1];
    //     console.warn('Maze /W Walls ' + coord_x + ' ' + coord_y)
    //     // console.warn('Maze /W Walls ' + virtual_maze)
    //     virtual_maze[coord_x][coord_y] = 1;
    // }
    // console.warn('---RESULT--->', virtual_maze)
    return virtual_maze;
}






















function maze_generator(virtual_maze_map) {
    var wall_HTML = '';
    DOM['container'].innerHTML = '';

    for (let i = 0; i < virtual_maze_map.length; i++) {

        DOM['container'].innerHTML = DOM['container'].innerHTML + `
            <div class="row"></div>
        `;

        var selected_row = DOM['container'].querySelectorAll('.row')[i];
        for (let k = 0; k < virtual_maze_map[i].length; k++) {

            (virtual_maze_map[i][k] === 1) ? wall_HTML = 'wall' : wall_HTML = '';
            if (virtual_maze_map[i][k] === 1) {

            }


            selected_row.innerHTML = selected_row.innerHTML + `
                <div class="column ${wall_HTML}"></div>
            `; 
        }
    }

    
}

function _exe(rows, columns, walls) {
    let virtual_maze = generate_virtual_maze(rows, columns, walls);
    maze_generator(virtual_maze)
}



var road = 0;
var wall = 1;