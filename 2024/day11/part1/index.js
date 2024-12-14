import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day11').then((data) => {
        const lines = data.split(/\r?\n/);
        return lines[0].split(' ').map(Number);
    }).then(data => {
        const memo = {};
        let stones = [...data];
        let newStones = [];
        let blinks = 25;

        while(blinks-- > 0) {
            newStones = [];

            stones.forEach(s => {
                let result;

                if(memo[s]) {
                    result = memo[s];
                }else if(s === 0) {
                    result = [1];
                } else if(`${s}`.length % 2 === 0) {
                    const numAsString = `${s}`;
                    const left = Number(numAsString.slice(0, numAsString.length / 2));
                    const right = Number(numAsString.slice(numAsString.length / 2, numAsString.length));
                    result = [left, right];
                } else {
                    result = [s * 2024];
                }

                memo[s] = result;
                newStones.push(...result);
            });

            stones = [...newStones];
        }
        return stones;
    }).then(stones => {
        sum = stones.length;
    });

    console.log(sum);
}

export default result;