import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day7').then((data) => {
        const lines = data.split(/\r?\n/);
        lines.forEach(l => {
            const split = l.split(': ');
            const value = Number(split[0]);
            const inputs = split[1].split(' ').map(Number);

            if(isValid(value, inputs)) sum += value;
        })

    });
    console.log(sum);
}

const comboMap = { 0: []};
const operatorMap = {
    0: '+',
    1: '*'
}

const isValid = (value, inputs) => {
    if(!comboMap[inputs.length]) {
        comboMap[inputs.length] = generateCombos(inputs.length);
    }

    const combos = comboMap[inputs.length];

    for(let i = 0; i < combos.length; i++) {
        if(value === evalIgnoreOrder([...inputs], combos[i])) {
            return true;
        }
    }

    return false;
}

const generateCombos = (length) => {
    const numOfCombos = parseInt("1".repeat(length - 1), 2);
    const combos = [];

    for(let i = 0; i <= numOfCombos; i++) {
        let combo = i.toString(2).padStart(length-1, '0');
        for(const [key, value] of Object.entries(operatorMap)) {
            combo = combo.replaceAll(key, value);
        }
        combos.push(combo);
    }

    return combos;
}

const evalIgnoreOrder = (numbers, operators) => {
    let result = numbers.shift();
    for(let i = 0; i <  numbers.length; i++) {
        result = eval(`${result} ${operators[i]} ${numbers[i]}`)
    }
    return result;
}

export default result;