import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day7').then((data) => {
        const lines = data.split(/\r?\n/);
        lines.forEach(l => {
            const split = l.split(': ');
            const value = Number(split[0]);
            const inputs = split[1].split(' ').map(Number);

            if(isValid(value, inputs)) {
                sum += value
            } else {

            };
        })

    });
    console.log(sum);
}

const comboMap = { 0: []};
const operatorMap = {
    0: '+',
    1: '*',
    2: '|'
}

const isValid = (value, inputs) => {
    if(!comboMap[inputs.length]) {
        comboMap[inputs.length] = generateCombos(inputs.length);
    }

    const combos = comboMap[inputs.length];

    for(let i = 0; i < combos.length; i++) {
        const equation = addOperators(inputs, combos[i]);
        if(value === evalIgnoreOrder(equation)) {
            return true;
        }
    }

    return false;
}

const generateCombos = (length) => {
    const numOfCombos = parseInt("2".repeat(length - 1), 3);
    const combos = [];

    for(let i = 0; i <= numOfCombos; i++) {
        let combo = i.toString(3).padStart(length-1, '0');
        for(const [key, value] of Object.entries(operatorMap)) {
            combo = combo.replaceAll(key, value);
        }
        combos.push(combo);
    }

    return combos;
}

const evalIgnoreOrder = (equation) => {
    const split = equation.split(' | ');
    let result = '';

    for(let sp in split) {
        const split2 = split[sp].split(' ');
        
        result = `${result}${split2.shift()}`;
        for(let i = 0; i < split2.length - 1; i += 2) {
            result = eval(`${result} ${split2[i]} ${split2[i + 1]}`)
        }
    }

    return Number(result);
}

const addOperators = (numbers, operators) => {
    return numbers.map((element, index) => [element, operators[index]]).flat().slice(0,-1).join(' ');
}

export default result;