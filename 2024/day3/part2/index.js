import readFile from "../../utils/file.js";

const result = async () => {
    const regex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm
    let sum = 0;
    await readFile('day3').then((data) => {
        const matches = data.match(regex);
        let isDo = true;
        for(let i = 0; i < matches.length; i++) {
            if(matches[i] === 'do()') {
                isDo = true;
            } else if(matches[i] === `don't()`) {
                isDo = false;
            } else if(isDo) {
                const nums = matches[i].substring(4).slice(0,-1).split(',');
                sum += (nums[0] * nums[1]);
            }
        }
        console.log(sum)
    });
}


export default result;