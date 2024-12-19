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
            const expanded = l.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.','..').replace('@', '@.');
            const indexOf = expanded.indexOf('@');
            if(indexOf > -1) {
                start.x = indexOf;
                start.y = y;
            }
            board.push(expanded.replace('@','.').split(''));
            y++;
        }
        while(l = lines.shift()) {
            moves.push(...l.split(''));
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
        // print(maze, robot);

        moves.flat().forEach(move => {
            moveRobot[move](maze,robot);
            // print(maze, robot);
        })

        return maze;
    }).then(maze => {
        maze.forEach((l, y) => {
            l.forEach((c, x) => {
                if(c === '[') {
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

    for(let x = firstOpenSpace; x >= robot.x; x--) {
        board[robot.y][x] = board[robot.y][x - 1];
    }

    board[robot.y][robot.x] = '.';
    robot.x += 1;
}

const moveLeft = (board, robot) => {
    const firstOpenSpace =  board[robot.y].lastIndexOf('.', robot.x - 1);
    const firstBlockSpace =  board[robot.y].lastIndexOf('#', robot.x);
    
    if(firstOpenSpace < 0 || firstOpenSpace < firstBlockSpace) return;

    for(let x = firstOpenSpace + 1; x <= robot.x; x++) {
        board[robot.y][x-1] = board[robot.y][x];
    }

    board[robot.y][robot.x] = '.';

    robot.x -= 1;
}

const moveUp = (board, robot) => {
    const queueLookAt = [{...robot}];
    let queueToMove = [];

    let spot;
    while(spot = queueLookAt.pop()) {
        const x = spot.x;
        const y = spot.y - 1;

        if(board[y][x] === '#') {
            return;
        }

        if(board[y][x] === '.') {
            continue;
        }
        
        if(board[y][x] === '[') {
            queueLookAt.push({x, y}, {x: x + 1, y});
            addVertical(queueToMove, '[', {x, y}, {x: x + 1, y});
        } else if(board[y][x] === ']') {
            queueLookAt.push({x, y}, {x: x - 1, y});
            addVertical(queueToMove, ']', {x, y}, {x: x - 1, y});
        }
    }

    queueToMove.sort((a,b) => b.y - a.y);

    while(spot = queueToMove.pop()) {
        const isLeft = spot.side === '[';
        const y = spot.y - 1;

        if(isLeft) {
            board[y][spot.x[0]] = '[';
            board[y][spot.x[1]] = ']';

            board[spot.y][spot.x[0]] = '.';
            board[spot.y][spot.x[1]] = '.';
        } else {
            board[y][spot.x[0]] = ']';
            board[y][spot.x[1]] = '[';

            board[spot.y][spot.x[0]] = '.';
            board[spot.y][spot.x[1]] = '.';
        }
    }

    robot.y -= 1;
}

const moveDown = (board, robot) => {
    const queueLookAt = [{...robot}];
    let queueToMove = [];

    let spot;
    while(spot = queueLookAt.pop()) {
        const x = spot.x;
        const y = spot.y + 1;

        if(board[y][x] === '#') {
            return;
        }

        if(board[y][x] === '.') {
            continue;
        }
        
        if(board[y][x] === '[') {
            queueLookAt.push({x, y}, {x: x + 1, y});
            addVertical(queueToMove, '[', {x, y}, {x: x + 1, y});
        } else if(board[y][x] === ']') {
            queueLookAt.push({x, y}, {x: x - 1, y});
            addVertical(queueToMove, ']', {x, y}, {x: x - 1, y});
        }
    }

    queueToMove.sort((a,b) => a.y - b.y);

    while(spot = queueToMove.pop()) {
        const isLeft = spot.side === '[';
        const y = spot.y + 1;

        if(isLeft) {
            board[y][spot.x[0]] = '[';
            board[y][spot.x[1]] = ']';

            board[spot.y][spot.x[0]] = '.';
            board[spot.y][spot.x[1]] = '.';
        } else {
            board[y][spot.x[0]] = ']';
            board[y][spot.x[1]] = '[';

            board[spot.y][spot.x[0]] = '.';
            board[spot.y][spot.x[1]] = '.';
        }
    }

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
        console.log(line);
    }
}

const addVertical = (arr, side, block1, block2) => {
    const isDuplicate = arr.some(item => {
        return item.y === block1.y && (item.x[0] === block1.x || item.x[0] === block2.x);
    });

    if (!isDuplicate) {
        arr.push({side, y: block1.y, x: {0: block1.x, 1: block2.x}});
    }
}

export default result;