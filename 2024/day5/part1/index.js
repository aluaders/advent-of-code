import readFile from "../../utils/file.js";

const result = async () => {
    const word = "XMAS".split('');
    let sum = 0;
    await readFile('day5').then((data) => {
        const lines = data.split(/\r?\n/);
        let isRules = true;
        let rules = {};
        
        lines.forEach((l, idx) => {
            if(!l) {
                isRules = false;
                // console.log(rules);
                return;
            }

            if(isRules) {
                const nums = l.split('|');
                if(!rules[nums[0]]) rules[nums[0]] = [];
                rules[nums[0]].push(nums[1]);
            } else {
                // console.log(l);
                if(isValid(rules, l)) {
                    // console.log('valid')
                    const pages = l.split(',').map(Number);
                    sum += pages[Math.floor(pages.length / 2)];
                } 
            }
         })
    });
    console.log(sum);
}

const isValid = (rules, input) => {
    const nums = input.split(',');

    for(let i = 0; i < nums.length - 1; i++) {
        // console.log(nums[i])
        if(!rules?.[nums[i]]?.includes(nums[i+1])) return false;
    }

    return true;
}

export default result;