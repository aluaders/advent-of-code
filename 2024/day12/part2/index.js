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
            const area = plot.map(p => current(p));
            const minX = findMin(plot, 'x');
            const minY = findMin(plot, 'y');
            const maxX = findMax(plot, 'x');
            const maxY = findMax(plot, 'y');

            let fence = 0;

            for(let y = minY; y <= maxY; y++) {
                let isOpenTop = false;
                let isOpenBotton = false;

                for(let x = minX; x <= maxX; x++) {
                    if(!area.includes(current({x, y}))) {
                        if(isOpenTop) {
                            fence++;
                        }

                        if(isOpenBotton) {
                            fence++;
                        }

                        isOpenTop = false;
                        isOpenBotton = false;
                        continue
                    };
                    if(!area.includes(up(x,y))) {
                        isOpenTop = true;
                    } else {
                        if(isOpenTop) {
                            fence++;
                        }
                        isOpenTop = false;
                    }

                    if(!area.includes(down(x,y))) {
                        isOpenBotton = true;
                    } else {
                        if(isOpenBotton) {
                            fence++;
                        }
                        isOpenBotton = false;
                    }
                }

                if(isOpenTop) {
                    fence++};
                if(isOpenBotton) {
                    fence++};
            }

            for(let x = minX; x <= maxX; x++) {
                let isOpenRight = false;
                let isOpenLeft = false;
                for(let y = minY; y <= maxY; y++) {
                    if(!area.includes(current({x, y}))) {
                        if(isOpenRight) {
                            fence++;
                        }

                        if(isOpenLeft) {
                            fence++;
                        }
                        isOpenRight = false;
                        isOpenLeft = false;
                        continue
                    };

                    if(!area.includes(right(x,y))) {
                        isOpenRight = true;
                    } else {
                        if(isOpenRight) {
                            fence++;
                        }
                        isOpenRight = false;
                    }

                    if(!area.includes(left(x,y))) {
                        isOpenLeft = true;
                    } else {
                        if(isOpenLeft) {
                            fence++;
                        }
                        isOpenLeft = false;
                    }
                }

                if(isOpenRight) fence++;
                if(isOpenLeft) fence++;
            }
            sum += (area.length * fence);
        });
    });
    
    console.log(sum);
}


const findMin = (arr, cord) => arr.reduce((min, item) => {
    return item[cord] < min ? item[cord] : min;
}, Infinity);

const findMax = (arr, cord) => arr.reduce((max, item) => {
    return item[cord] > max ? item[cord] : max;
}, -Infinity);

const current = (pos) => `${pos.x},${pos.y}`;
const up = (x, y) => `${x},${y - 1}`;
const right = (x, y) => `${x + 1},${y}`;
const down = (x, y) => `${x},${y + 1}`;
const left = (x, y) => `${x - 1},${y}`;

export default result;