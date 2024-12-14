import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day10').then((data) => {
        const lines = data.split(/\r?\n/);
        const map = [];
        const ends = [];

        lines.forEach((l, y) => {
            const row = l.split('').map(Number);
            const allEnds = getAllIndices(row, 9);

            ends.push(...allEnds.map(x => ({x, y})))
            map.push(row);
        });

        return [map, ends];
    }).then(([map, ends]) => {
        const trailGuide = {};

        ends.forEach(pos => {
            const beenTo = [];
            const queueMoves = [{elev: 9, pos}];

            let move;
            while(move = queueMoves.pop()) {
                const space = moveIdx(move.pos);

                // if(beenTo.includes(space)) continue;

                if(move.elev === 0) {
                    if(!trailGuide[space]) trailGuide[space] = [];
                    trailGuide[space].push(moveIdx(pos));
                    continue;
                }

                beenTo.push(space);

                // up
                const up = structuredClone(move);
                up.pos.y--;
                up.elev--;

                if(canMove(map, up)) {
                    queueMoves.push(up)
                }

                // right
                const right = structuredClone(move);
                right.pos.x++;
                right.elev--;

                if(canMove(map, right)) {
                    queueMoves.push(right)
                }

                // down
                const down = structuredClone(move);
                down.pos.y++;
                down.elev--;

                if(canMove(map, down)) {
                    queueMoves.push(down)
                }

                // right
                const left = structuredClone(move);
                left.pos.x--;
                left.elev--;

                if(canMove(map, left)) {
                    queueMoves.push(left)
                }
            }
        })
        // console.log(trailGuide);
        return trailGuide;
    }).then(trailGuide => {
        const trailRating = {};
        for(const [key, value] of Object.entries(trailGuide)) {
            trailRating[key] = value.length;
        }
        return trailRating;
    }).then(trailRating => {
        for(const [key, value] of Object.entries(trailRating)) {
            sum += value;
        }
    });

    console.log(sum);
}

const moveIdx = (move) => `${move.x},${move.y}`;
const canMove = (map, move) => map?.[move.pos.y]?.[move.pos.x] === move.elev;

function getAllIndices(arr, value) {
    const indices = [];
    let index = arr.indexOf(value);
  
    while (index !== -1) {
        indices.push(index);
        index = arr.indexOf(value, index + 1);
    }
  
    return indices;
}

export default result;