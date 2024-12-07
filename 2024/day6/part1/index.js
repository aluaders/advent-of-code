import readFile from "../../utils/file.js";

const MOVES = ['Up', 'Right', 'Down', 'Left'];
const MAX = {
    x: 0,
    y: 0
}

const result = async () => {
    let sum = 0;
    const gaurds = [];
    let startPos;

    await readFile('day6').then((data) => {
        const lines = data.split(/\r?\n/);

        MAX.y = lines.length;
        MAX.x = lines[0].length;

        lines.forEach((l, y) => {
            l.split('').map((value, x) => {
                if(value === '#') gaurds.push({x, y});
                if(value === '^') startPos = {x, y};
            })
        })

        let pos = startPos;
        let direction = 0;
        while(pos) {
            pos = move(gaurds, pos, MOVES[direction]);
            direction = (direction + 1) % 4;
        }
        
        let unique = [...new Set(beenTo)];
        sum = unique.length;
    });
    console.log(sum);
}

const beenTo = [];

const move = (gaurds, pos, direction) => {
    let gaurdsAt, stopAt;

    switch(direction) {
        case MOVES[0]: 
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                for(let i = 0; i < pos.y; i++) {
                    beenTo.push(`${pos.x},${i}`);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.y = stopAt.y + 1;

            for(let i = stopAt.y; i <= pos.y; i++) {
                beenTo.push(`${pos.x},${i}`);
            }
            break;
        case MOVES[1]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                for(let i = pos.x; i < MAX.x; i++) {
                    beenTo.push(`${i},${pos.y}`);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.x = stopAt.x - 1;

            for(let i = pos.x; i <= stopAt.x; i++) {
                beenTo.push(`${i},${pos.y}`);
            }
            break;
        case MOVES[2]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                for(let i = pos.y; i < MAX.y; i++) {
                    beenTo.push(`${pos.x},${i}`);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.y = stopAt.y - 1;

            for(let i = pos.y; i <= stopAt.y; i++) {
                beenTo.push(`${pos.x},${i}`);
            }
            break;
        case MOVES[3]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                for(let i = 0; i < pos.x; i++) {
                    beenTo.push(`${i},${pos.y}`);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.x = stopAt.x + 1;

            for(let i = stopAt.x; i <= pos.x; i++) {
                beenTo.push(`${i},${pos.y}`);
            }
            break;
        default:
            console.log('Out!')
    }

    return stopAt;
}

const gaurdsSort = (x, y, move) => {
    if (x[move] < y[move]) {
      return -1;
    }
    if (x[move] > y[move]) {
      return 1;
    }
    return 0;
}

const findGarudsAt = (gaurds, pos, move, stay, direction) => {
    if(direction === MOVES[0] || direction === MOVES[3])
        return gaurds.filter(g => g[move] < pos[move] && g[stay] === pos[stay]).sort((x,y) => gaurdsSort(x, y, move));
    return gaurds.filter(g => g[move] > pos[move] && g[stay] === pos[stay]).sort((x,y) => gaurdsSort(x, y, move));
}

export default result;