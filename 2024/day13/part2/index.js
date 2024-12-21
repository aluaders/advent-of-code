import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;
    const add = 10000000000000;

    await readFile('day13').then((data) => {
        const lines = data.split(/\r?\n/);
        const games = [];
        for(let i = 0; i < lines.length; i+=4) {
            const game = {};
            const lineA = lines[i].replace('Button A: ', '').replace('X+','').replace('Y+','').replace(' ','').split(',').map(Number);
            const lineB = lines[i+1].replace('Button B: ', '').replace('X+','').replace('Y+','').replace(' ','').split(',').map(Number);
            const lineP = lines[i+2].replace('Prize: ', '').replace('X=','').replace('Y=','').replace(' ','').split(',').map(Number);

            game['a'] = {x: lineA[0], y: lineA[1]}
            game['b'] = {x: lineB[0], y: lineB[1]}
            game['prize'] = {x: lineP[0] + add, y: lineP[1] + add}

            games.push(game);
        }

        return games;
    }).then(games => {
        const winners = [];
        games.forEach((game, num) => {
            const {a, b , prize} = game;
            const bPress = (a.y * prize.x - a.x * prize.y) / (a.y * b.x - a.x * b.y)
            const aPress = (prize.x - b.x * bPress) / a.x;

            if(Number.isInteger(aPress) && Number.isInteger(bPress)) {
                winners.push({a: aPress, b: bPress});
            }
        });
        return winners;
    }).then(winners => {
        winners.forEach(win => sum += (win.a * 3) + win.b);
    });

    console.log(sum);
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}
  
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// function insertUniqueObject(array, obj) {
//     const isDuplicate = array.some(item => {
//         return item.a === obj.a && item.b === obj.b;
//     });
  
//     if (!isDuplicate) {
//         array.push(obj); 
//     }
// }

// function lcmMultiple(...arr) {
//     return arr.reduce((a, b) => getLcm(a, b));
// }

// function findLCD(denominators) {
//     let result = denominators[0];
//     for (let i = 1; i < denominators.length; i++) {
//         result = getLcm(result, denominators[i]);
//     }
//     return result;
// }

const findPrimeCombos = (a, b, prize) => {
    const half = prize / 2;
    const combos = [];
    for(let leftNum = 0; leftNum <= half; leftNum++) {
        for(let rightNum = (leftNum === 0) ? 1 : 0; rightNum <= half; rightNum++) {
            const total = (a * leftNum) + (b * rightNum);
            combos.push({leftNum, rightNum, total})
        }
    }
    return combos;
}

// const findPrimeCombos = (a, b) => {
//     const combos = [];
//     const max = lcm(a, b);
//     const maxA = max / a;
//     const maxB = max / b;

//     console.log(maxA, maxB);

//     for(let leftNum = 0; leftNum <= max; leftNum++) {
//         for(let rightNum = (leftNum === 0) ? 1 : 0; rightNum <= max; rightNum++) {
//             const total = (a * leftNum) + (b * rightNum);
//             combos.push({leftNum, rightNum, total})
//         }
//     }

//     return combos;
// }

// const findPrimeCombos = (a, b) => {
//     const combos = [];
//     const max = lcm(a, b);
//     console.log(max);

//     let total = 0;
//     let iteration = 0;

//     while(total <= max) {
//         const binary = iteration.toString(2);
//         const leftNum = binary.match(new RegExp("0", "g"))?.length ?? 0;
//         const rightNum = binary.length - leftNum;
        
//         total = (a * leftNum) + (b * rightNum);
//         const combo = {leftNum, rightNum, total};
//         const isDuplicate = combos.some(c => c.leftNum === leftNum && c.rightNum === rightNum && c.total === total);
//         if(!isDuplicate) combos.push(combo);
//         iteration++;
//         // console.log(a, b, leftNum, rightNum, total, max)
//     }

//     console.log('---------------------------------- out')

//     return combos;
// }

export default result;


/// 2600 + 46900 = 49500