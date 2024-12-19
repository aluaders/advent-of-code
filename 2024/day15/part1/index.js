import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day15').then((data) => {
        const lines = data.split(/\r?\n/);
        const board = [];
        const moves = [];
        const start = {x: 0, y: 0};
        let y = 0;
        let l;

        while(l = lines.shift()) {
            if(l === '') break;
            const indexOf = l.indexOf('@');
            if(indexOf > -1) {
                start.x = indexOf;
                start.y = y;
            }
            board.push(l.replace('@', '.').split(''));
            y++;
        }
        while(l = lines.shift()) {
            moves.push(l.split(''));
        }
        return [board, moves, start];
    }).then(([board, moves, start]) => {
        const maze = structuredClone(board);

        const moveRobot = {
            '^': moveUp,
            '>': moveRight,
            'v': moveDown,
            '<': moveLeft
        };

        let robot = structuredClone(start);

        for(let i = 0; i < moves.length; i++) {
            for(let j = 0 ; j < moves[i].length; j++) {
                const move = moves[i][j];
                moveRobot[move](maze,robot);
            }
        }
        print(maze, robot);

        return maze;
    }).then(maze => {
        maze.forEach((l, y) => {
            l.forEach((c, x) => {
                if(c === 'O') {
                    sum += (y * 100 + x)
                }
            })
        });
    });
    console.log(sum);
}

const moveRight = (board, robot) => {
    const firstOpenSpace =  board[robot.y].indexOf('.', robot.x + 1);
    const firstBlockSpace =  board[robot.y].indexOf('#', robot.x);
    
    if(firstOpenSpace < 0 || firstOpenSpace > firstBlockSpace) return;

    board[robot.y].splice(firstOpenSpace, 1);
    board[robot.y].splice(robot.x, 0, '.');
    robot.x += 1;
}

const moveLeft = (board, robot) => {
    const firstOpenSpace =  board[robot.y].lastIndexOf('.', robot.x - 1);
    const firstBlockSpace =  board[robot.y].lastIndexOf('#', robot.x);
    
    if(firstOpenSpace < 0 || firstOpenSpace < firstBlockSpace) return;

    board[robot.y].splice(firstOpenSpace, 1);
    board[robot.y].splice(robot.x, 0, '.');
    robot.x -= 1;
}

const moveUp = (board, robot) => {
    let firstOpenSpace = -1;

    for(let y = robot.y - 1; y > 0; y--) {
        if(board[y][robot.x] === '#') break;
        if(board[y][robot.x] === '.') {
            firstOpenSpace = y;
            break;
        }
    }

    if(firstOpenSpace === -1) return;
    
    board[firstOpenSpace][robot.x] = board[firstOpenSpace + 1][robot.x];
    board[robot.y - 1][robot.x] = '.';
    robot.y -= 1;
}

const moveDown = (board, robot) => {
    let firstOpenSpace = -1;

    for(let y = robot.y + 1; y < board.length; y++) {
        if(board[y][robot.x] === '#') break;
        if(board[y][robot.x] === '.') {
            firstOpenSpace = y;
            break;
        }
    }

    if(firstOpenSpace === -1) return;

    board[firstOpenSpace][robot.x] = board[firstOpenSpace - 1][robot.x];
    board[robot.y + 1][robot.x] = '.';
    robot.y += 1;
}

const print = (board, robot) => {
    for(let y = 0; y < board.length; y++) {
        let line = ''
        for(let x = 0 ; x < board[y].length; x++) {
            if(robot.x === x && robot.y === y) {
                line += '@';
            } else {
                line += board[y][x];
            }
        }
    }
}

export default result;