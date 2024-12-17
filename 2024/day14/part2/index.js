import {readFile} from "../../utils/file.js";

const wide = 101;
const tall = 103;

const result = async () => {
    let sum = 1;

    await readFile('day14').then((data) => {
        const lines = data.split(/\r?\n/);
        const robots = [];
        lines.forEach(l => {
            const info = l.split(' ');
            const starting = info[0].replace('p=','').split(',').map(Number);
            const velocity = info[1].replace('v=','').split(',').map(Number);

            robots.push({
                pos: {x: starting[0], y: starting[1]},
                vel: {x: velocity[0], y: velocity[1]}
            })
        });
        return robots;
    }).then(robots => {
        let board = [];

        for(let seconds = 1; seconds < 10000; seconds++) {
            board = [];
            robots.forEach(robot => {
                const x = ((robot.pos.x + (robot.vel.x * seconds % wide) < 0) ? wide + robot.pos.x + (robot.vel.x * seconds % wide)  : robot.pos.x + (robot.vel.x * seconds % wide)) % wide;
                const y = ((robot.pos.y + (robot.vel.y * seconds % tall) < 0) ? tall + robot.pos.y + (robot.vel.y * seconds % tall)  : robot.pos.y + (robot.vel.y * seconds % tall)) % tall;
        
                board.push({x, y});
            });

            if(findTree(board))
                print(board, seconds)
        }
        return board;
    });
    console.log(sum);
}

const findTree = (board) => {
    const view = Array.from({ length: tall }, () => Array(wide).fill(' '));
    board.forEach(robot => {
        if(view[robot.y][robot.x] === ' ') view[robot.y][robot.x] = 0;
        view[robot.y][robot.x]++;
    })

    const lines = [];
    for(let y = 0 ; y < tall; y++) {
        let line = '';
        for(let x = 0; x < wide; x++) {
            line += view[y][x];
        }
        lines.push(line);
    }

    // look for maybe a tree branch?
    for(let i = 0; i < lines.length; i++) {
        const index = lines[i].indexOf('1111');
        if(index > -1) {
            if(lines[i-1]?.substring(index - 1, index -1 + 3) === '111' &&
                lines[i-2]?.substring(index - 1, index -1 + 2) === '11'
            )
            return true;
        }
    }

    return false;
}

const print = async (board, seconds) => {
    const view = Array.from({ length: tall }, () => Array(wide).fill(' '));
    board.forEach(robot => {
        if(view[robot.y][robot.x] === ' ') view[robot.y][robot.x] = 0;
        view[robot.y][robot.x]++;
    })

    const lines = [];
    for(let y = 0 ; y < tall; y++) {
        let line = '';
        for(let x = 0; x < wide; x++) {
            line += view[y][x];
        }
        lines.push(line);
    }
    console.log(`---- Seconds ${seconds} -----\n`);
    console.log(lines.join('\n'));
    console.log('\n');
}

export default result;