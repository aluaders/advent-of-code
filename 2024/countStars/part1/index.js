import { promises as fs } from "fs";

const result = async () => {
    Promise.allSettled([
        fs.readFile(`2024/countStars/input/input.txt`, {encoding: 'utf-8'}),
        fs.readFile(`2024/countStars/input/teambreakdown.txt`, {encoding: 'utf-8'})
    ]).then((result) => {
        const leaderboard = JSON.parse(result[0].value);
        const teambreakdown = JSON.parse(result[1].value);

        const teams = {}
        
        for (const [key, value] of Object.entries(leaderboard.members)) {
            const name = value.name;
            const stars = value.stars;
            const team = teambreakdown.members[name].team;

            if(value.stars === 0) continue;

            if(!teams[team]) teams[team] = {numOfMembers: 0, total: 0};
            teams[team].total += stars;
            teams[team].numOfMembers += 1;

            if(team === "Product") teams[team].total += 5;
            if(team === "CS") teams[team].total += 5;

            console.log(name, stars, team)
        }

        console.log(teams);
        

        for (const [key, value] of Object.entries(teams)) {
            // console.log(key, (value.total / value.numOfMembers))
            console.log(`${key} - total: ${value.total}, team members: ${value.numOfMembers}`)
        }

        for (const [key, value] of Object.entries(teambreakdown.members)) {
            // console.log(key, (value.total / value.numOfMembers))
            console.log(`${key} ${value.team}`)
        }
    })

    // Promise.all(leaderboard, teams).then(result => {
    //     console.log(result)
    //     console.log(result[1])
    // })

}

export default result;