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

export default result;
