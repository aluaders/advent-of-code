import readFile from "../../utils/file.js";

const result = async () => {
    const word = "XMAS".split('');
    let sum = 0;
    await readFile('day5').then((data) => {
        const lines = data.split(/\r?\n/);
        let isRules = true;
        const rules = {};
        
        lines.forEach((l, idx) => {
            if(!l) {
                isRules = false;
                return;
            }

            if(isRules) {
                const input = l.split('|').map(Number);
                if(!rules[input[0]]) rules[input[0]] = [];
                rules[input[0]].push(input[1]);
            } else {
                const input = l.split(',').map(Number);
                if(!isValid(rules, input)) {
                    const fixed = fixedInput(rules, input);
                    sum += fixed[Math.floor(fixed.length / 2)];
                } 
            }
         })
    });
    console.log(sum);
}

const isValid = (rules, input) => {
    for(let i = 0; i < input.length - 1; i++) {
        if(!rules?.[input[i]]?.includes(input[i+1])) return false;
    }

    return true;
}

const fixedInput = (rules, input) => {
    for(let i = 0 ; i < input.length; i++) { 
        const ordered = [input[i]];
        const leftovers = [...input];
        leftovers.splice(i, 1);

        try {
            const possibles = [];
            findMatch(rules,ordered,leftovers, possibles);
            if(possibles.length > 0) return possibles;
        } catch {
            continue;
        }
    }

    console.log('error')
    return [];
}

const findMatch = (rules, ordered, leftovers, possibles) => {
    if(leftovers.length === 0) {
        possibles.push(...ordered);
    }

    if(possibles.length > 1) {
        return;
    }

    const endNum = ordered[ordered.length - 1];
    // console.log('--', endNum, leftovers)
    const nextNums = rules[endNum];
    const commons = nextNums.filter(v => leftovers.includes(v));

    if(commons.length === 0) return;

    for(let i = 0; i < commons.length; i++) {
        const newLeftovers = [...leftovers];
        const newOrdered = [...ordered];

        newLeftovers.splice(newLeftovers.indexOf(commons[i]), 1);
        newOrdered.push(commons[i]);

        // console.log('--', newOrdered, newLeftovers);
        
        findMatch(rules, newOrdered, newLeftovers, possibles);
    }
}

export default result;