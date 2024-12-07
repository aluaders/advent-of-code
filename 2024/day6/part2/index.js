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
        let maxLoops = 0;
        while(pos) {
            pos = move(gaurds, pos, MOVES[direction]);
            direction = (direction + 1) % 4;
            maxLoops++;
        }
        
        let uniqueMoves = [...new Set(beenTo)];
        uniqueMoves.splice(uniqueMoves.indexOf(`${startPos.x},${startPos.y}`),1);

        let obstructionLoops = 0;
        // console.log(uniqueMoves);
        uniqueMoves.forEach(obs => {
            // console.log(obs)
            const split = obs.split(',').map(Number);
            const newGaurds = [...gaurds];
            newGaurds.push({
                x: split[0],
                y: split[1]
            });

            let pos = startPos;
            let direction = 0;
            const lastSteps = [];
            try{
                while(pos) {
                    pos = findLoops(newGaurds, pos, MOVES[direction], lastSteps);
                    direction = (direction + 1) % 4;
                }
            } catch (e) {
                // console.log('stopped - ', e );
                obstructionLoops++;
            }
        })

        console.log(obstructionLoops);
    });
}

const beenTo = [];

const addNewSpaces = (spaces, direction, lastSteps) => {
    let newSpace = false;
    spaces.forEach(s => {
        const spot = `${s} - ${direction}`;

        if(!lastSteps.includes(spot)){
            lastSteps.push(spot);
            newSpace = true;
        }
    })

    return newSpace;
}

const move = (gaurds, pos, direction) => {
    let gaurdsAt, stopAt;

    switch(direction) {
        case MOVES[0]: 
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                for(let i = 0; i < pos.y; i++) {
                    const space = `${pos.x},${i}`;
                    if(!beenTo.includes(space)) beenTo.push(space);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.y = stopAt.y + 1;

            for(let i = stopAt.y; i <= pos.y; i++) {
                const space = `${pos.x},${i}`;
                if(!beenTo.includes(space)) beenTo.push(space);
            }
            break;
        case MOVES[1]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                for(let i = pos.x; i < MAX.x; i++) {
                    const space = `${i},${pos.y}`;
                    if(!beenTo.includes(space)) beenTo.push(space);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.x = stopAt.x - 1;

            for(let i = pos.x; i <= stopAt.x; i++) {
                const space = `${i},${pos.y}`;
                if(!beenTo.includes(space)) beenTo.push(space);
            }
            break;
        case MOVES[2]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                for(let i = pos.y; i < MAX.y; i++) {
                    const space = `${pos.x},${i}`;
                    if(!beenTo.includes(space)) beenTo.push(space);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.y = stopAt.y - 1;

            for(let i = pos.y; i <= stopAt.y; i++) {
                const space = `${pos.x},${i}`;
                if(!beenTo.includes(space)) beenTo.push(space);
            }
            break;
        case MOVES[3]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                for(let i = 0; i < pos.x; i++) {
                    const space = `${i},${pos.y}`;
                    if(!beenTo.includes(space)) beenTo.push(space);
                }
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.x = stopAt.x + 1;

            for(let i = stopAt.x; i <= pos.x; i++) {
                const space = `${i},${pos.y}`;
                if(!beenTo.includes(space)) beenTo.push(space);
            }
            break;
        default:
            console.log('Out!')
    }

    return stopAt;
}

const findLoops = (gaurds, pos, direction, lastSteps) => {
    let gaurdsAt, stopAt;
    const spaces = [];

    switch(direction) {
        case MOVES[0]: 
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.y = stopAt.y + 1;

            for(let i = stopAt.y; i <= pos.y; i++) {
                spaces.push(`${pos.x},${i}`);
            }
            if(!addNewSpaces(spaces, direction, lastSteps)) throw new Error();
            break;
        case MOVES[1]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.x = stopAt.x - 1;

            for(let i = pos.x; i <= stopAt.x; i++) {
                spaces.push(`${i},${pos.y}`);
            }
            if(!addNewSpaces(spaces, direction, lastSteps)) throw new Error();
            break;
        case MOVES[2]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'y', 'x', direction);

            if(gaurdsAt.length === 0) {
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt[0]);
            stopAt.y = stopAt.y - 1;

            for(let i = pos.y; i <= stopAt.y; i++) {
                spaces.push(`${pos.x},${i}`);
            }
            if(!addNewSpaces(spaces, direction, lastSteps)) throw new Error();
            break;
        case MOVES[3]:
            gaurdsAt = findGarudsAt(gaurds, pos, 'x', 'y', direction);
            
            if(gaurdsAt.length === 0) {
                return undefined;
            }

            stopAt = structuredClone(gaurdsAt.pop());
            stopAt.x = stopAt.x + 1;

            for(let i = stopAt.x; i <= pos.x; i++) {
                spaces.push(`${i},${pos.y}`);
            }
            if(!addNewSpaces(spaces, direction, lastSteps)) throw new Error();
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