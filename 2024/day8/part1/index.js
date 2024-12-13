import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day8')
    .then((data) => {
        const map = {};
        const allNodes = [];
        const lines = data.split(/\r?\n/);
        const limits = {x: lines[0].length, y: lines.length};

        lines.forEach((line, y) => {
            line.split('').forEach((char, x) => {
                if(char === '.') return;
                if(!map[char]) map[char] = [];
                map[char].push({x, y})
                allNodes.push(`${x},${y}`);
            });
        });

        return [map, allNodes, limits];
    }).then(([map, allNodes, limits]) => {
        const antinodes = [];
        for(const [key, value] of Object.entries(map)) {
            const nodes = [...value];
            for(let i = 0; i < nodes.length - 1; i++) {
                for(let j = i + 1; j < nodes.length; j++) {
                    // console.log(nodes[i], nodes[j]);
                    const distance = {
                        x: nodes[j].x - nodes[i].x,
                        y: nodes[j].y - nodes[i].y
                    }

                    let x, y;

                    x = nodes[i].x - distance.x;
                    y = nodes[i].y - distance.y;

                    if(x >= 0 && y >=0 && x < limits.x && y < limits.y && 
                        antinodes.filter(node => node.x === x && node.y === y).length === 0) {
                        antinodes.push({x,y});
                    }

                    x = nodes[i].x + 2 * distance.x;
                    y = nodes[i].y + 2 * distance.y;

                    if(x >= 0 && y >=0 && x < limits.x && y < limits.y && 
                        antinodes.filter(node => node.x === x && node.y === y).length === 0) {
                        antinodes.push({x,y});
                    }
                }
            }
        }

        return [map, antinodes, limits];
    }).then(([map, antinodes, limits]) => {
        console.log(map, antinodes);
        sum = antinodes.length;

        for(let y = 0; y < limits.y; y++) {
            const ans = antinodes.filter(value => value.y === y);
            let line = '.'.repeat(limits.x);
            line = line.split('');
            ans.forEach(n => {
                line[n.x] = '#';
            })
            line = line.join('');
            console.log(line);
        }
    });
    console.log(sum);
}

export default result;