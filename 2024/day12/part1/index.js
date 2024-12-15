import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day12').then((data) => {
        const lines = data.split(/\r?\n/);
        const garden = [];
        lines.forEach(l => garden.push(l.split('')));
        return garden;
    }).then(garden => {
        const editGarden = structuredClone(garden);
        const plots = [];

        for(let y = 0; y < editGarden.length; y++) {
            for(let x = 0; x < editGarden[0].length; x++) {
                const crop = editGarden[y][x];
                if(crop === '.') continue;

                const surrounding = [{x, y}];
                const plot = [];
                let spot;

                while(spot = surrounding.pop()) {
                    if(editGarden?.[spot.y]?.[spot.x] != crop) continue;

                    editGarden[spot.y][spot.x] = '.';
                    plot.push({...spot});

                    surrounding.push(
                        {x: spot.x, y: spot.y - 1},
                        {x: spot.x + 1, y: spot.y},
                        {x: spot.x, y: spot.y + 1},
                        {x: spot.x - 1, y: spot.y},
                    )
                }
                plots.push(plot);
            }
        }

        return plots;
    }).then(plots => {
        plots.forEach(plot => {
            const search = plot.map(p => `${p.x},${p.y}`);
            let area = 0;

            plot.forEach(p => {
                spacesAroundArea(p).forEach(s => {
                    if(!search.includes(s)) area++;
                });
            })

            sum += (search.length * area);
        });
    });

    console.log(sum);
}

const spacesAroundArea = (pos) => [up(pos), right(pos), down(pos), left(pos)];
const up = (pos) => `${pos.x},${pos.y - 1}`;
const right = (pos) => `${pos.x + 1},${pos.y}`;
const down = (pos) => `${pos.x},${pos.y + 1}`;
const left = (pos) => `${pos.x - 1},${pos.y}`;

export default result;