import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day11').then((data) => {
        const lines = data.split(/\r?\n/);
        return lines[0].split(' ').map(Number);
    }).then(data => {
        let stones = {};

        data.forEach(d => {
            if(!stones[d]) stones[d] = 0;
            stones[d]++;
        })

        let blinks = 0;

        while(blinks < 75) {
            blinks++;
            const newStones = {};

            for(const [key, value] of Object.entries(stones)) {
                let result;
                const stone = Number(key);

                if(stone === 0) {
                    if(!newStones[1]) newStones[1] = 0;
                    newStones[1] += value
                } else if(`${stone}`.length % 2 === 0) {
                    const numAsString = `${stone}`;
                    const left = Number(numAsString.slice(0, numAsString.length / 2));
                    const right = Number(numAsString.slice(numAsString.length / 2, numAsString.length));
                    
                    if(!newStones[left]) newStones[left] = 0;
                    newStones[left] += value

                    if(!newStones[right]) newStones[right] = 0;
                    newStones[right] += value;
                } else {
                    result = [stone * 2024];
                    if(!newStones[result]) newStones[result] = 0;
                    newStones[result] += value;
                }
            }

            stones = structuredClone(newStones);
        }

        return stones;
    }).then(stones => {
        for(const [key, value] of Object.entries(stones)) sum += value;
    });

    console.log(sum);
}

export default result;
