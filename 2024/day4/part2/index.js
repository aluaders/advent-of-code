import readFile from "../../utils/file.js";

const result = async () => {
    const word = "XMAS".split('');
    let sum = 0;
    await readFile('day4').then((data) => {
        const lines = data.split(/\r?\n/);
        const letter = 'A';

        for(let y = 0; y < lines.length; y++) {
            const l = lines[y];
            for(let x = 0; x < l.length; x++) {
                if(letter === l.charAt(x)) {
                    if(isX(lines, x, y)) sum++;
                }
            }
        }

    });
    console.log(sum);
}

const isX = (lines, x, y) => {
    const match = ['MS', 'SM'];
    try {
        const corners = [];

        const line1 = `${lines[y+1].charAt(x+1)}${lines[y-1].charAt(x-1)}`;
        const line2 = `${lines[y+1].charAt(x-1)}${lines[y-1].charAt(x+1)}`;

        return match.includes(line1) && match.includes(line2);
    } catch {
        return false;
    }
}


export default result;