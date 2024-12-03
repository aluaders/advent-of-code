import readFile from "../../utils/file.js";

const result = async () => {
    const regex = /(mul)\(\d{1,3},\d{1,3}\)/gm
    let sum = 0;
    await readFile('day3').then((data) => {
        const matches = data.match(regex);
        matches.forEach(m =>{ 
            const nums = m.substring(4).slice(0,-1).split(',');
            sum += (nums[0] * nums[1]);
        })
        console.log(sum)
    });
}


export default result;