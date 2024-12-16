import readFile from "../../utils/file.js";

const maxMoves = 100;
const result = async () => {
    let sum = 0;

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
            game['prize'] = {x: lineP[0], y: lineP[1]}

            games.push(game);
        }

        return games;
    }).then(games => {
        const winners = {};
        const possibleWins = {};
        games.forEach((game, num) => {
            const maxA = Math.min(game.prize.x / game.a.x, 100);
            const maxB = Math.min(game.prize.x / game.b.x, 100);

            for(let a = 0; a <= maxA; a++) {
                for(let b = 0; b < maxB; b++) {
                    if((a * game.a.x) + (b * game.b.x) === game.prize.x) {
                        if(!possibleWins[num]) possibleWins[num] = [];
                        possibleWins[num].push({a, b});
                    }
                }
            }

            possibleWins?.[num]?.forEach(pw => {
                if((pw.a * game.a.y) + (pw.b * game.b.y) === game.prize.y) {
                    if(!winners[num]) winners[num] = [];
                    winners[num].push({...pw});
                }
            })
        })
        return  winners;
    }).then(winners => {
        // loop throught the winner
        // find cheapest number of tokens
        // add up all tokens

        const cheapest = [];

        for(const [key, value] of Object.entries(winners)) {
            value.sort((a, b) => {
                if ((a.a * 3 + a.b) < (b.a * 3 + b.b)) {
                  return -1;
                } else if ((a.a * 3 + a.b) > (b.a * 3 + b.b)) {
                  return 1;
                } else {
                  return 0;
                }
            });

            cheapest.push(value[0]);
        }

        cheapest.forEach(cp => sum += (cp.a * 3) + cp.b);
    });

    console.log(sum);
}

export default result;