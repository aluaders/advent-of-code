import readFile from "../../utils/file.js";

const wide = 101;
const tall = 103;
const seconds = 100;

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
        const board = [];
        robots.forEach(robot => {
            const x = ((robot.pos.x + (robot.vel.x * seconds % wide) < 0) ? wide + robot.pos.x + (robot.vel.x * seconds % wide)  : robot.pos.x + (robot.vel.x * seconds % wide)) % wide;
            const y = ((robot.pos.y + (robot.vel.y * seconds % tall) < 0) ? tall + robot.pos.y + (robot.vel.y * seconds % tall)  : robot.pos.y + (robot.vel.y * seconds % tall)) % tall;
    
            board.push({x, y});
        });

        return board;
    }).then(board => {
        print(board);
        const quards = {
            0: 0,
            1: 0,
            2: 0,
            3: 0
        };
        const horiDivide = Math.floor(tall / 2);
        const vertDivide = Math.floor(wide / 2);
        board.forEach(robot => {
            if(robot.x === vertDivide || robot.y === horiDivide) return;
            if(robot.x > vertDivide && robot.y > horiDivide) {
                quards[0]++;
             } else if(robot.x > vertDivide && robot.y < horiDivide) {
                quards[1]++;
            } else if(robot.x < vertDivide && robot.y > horiDivide) {
                quards[2]++;
            } else if(robot.x < vertDivide && robot.y < horiDivide) {
                quards[3]++;
            } 
        })

        console.log(quards)
        sum = quards[0] * quards[1] * quards[2] * quards[3];
    });
    console.log(sum);
}

const print = (board) => {
    const view = Array.from({ length: tall }, () => Array(wide).fill('.'));
    board.forEach(robot => {
        if(view[robot.y][robot.x] === '.') view[robot.y][robot.x] = 0;
        view[robot.y][robot.x]++;
    })
    const horiDivide = Math.floor(tall / 2);
    const vertDivide = Math.floor(wide / 2);

    for(let y = 0 ; y < tall; y++) {
        let line = '';
        for(let x = 0; x < wide; x++) {
            if(x === vertDivide || y === horiDivide) {
                line += ' ';
                continue;
            }
            line += view[y][x];
        }
        console.log(line);
    }
}

export default result;