import readFile from "../../utils/file.js";

const result = async () => {
    const word = "XMAS".split('');
    let sum = 0;
    await readFile('day4').then((data) => {
        const lines = data.split(/\r?\n/);
        const letter = word.pop();

        for(let y = 0; y < lines.length; y++) {
            const l = lines[y];
            for(let x = 0; x < l.length; x++) {
                if(letter === l.charAt(x)) {
                    // console.log(`${y} ${matchesHorizontal(lines ,x,y,[...word])}`)
                    if(matchesDiagonal1(lines,x,y,[...word])) sum++;
                    if(matchesDiagonal2(lines,x,y,[...word])) sum++;
                    if(matchesDiagonal3(lines,x,y,[...word])) sum++;
                    if(matchesDiagonal4(lines,x,y,[...word])) sum++;
                    if(matchesHorizontal(lines,x,y,[...word])) sum++;
                    if(matchesHorizontalBackwards(lines,x,y,[...word])) sum++;
                    if(matchesVertical(lines,x,y,[...word])) sum++;
                    if(matchesVerticalBackwards(lines,x,y,[...word])) sum++;
                }
            }
        }

    });
    console.log(sum);
}

const matchesNextLetter = (lines, x, y, letter) => {
    try{
        // console.log(`${lines[y]} ${lines[y].charAt(x)} === ${letter}`);
        return lines[y].charAt(x) === letter;
    } catch {
        return false;
    }
}

const matches= (lines, x, y, w, xDif, yDif) => {
    if(w.length === 0) return true;
    const letter = w.pop();

    if(matchesNextLetter(lines, x+xDif, y+yDif, letter)) {
        return matches(lines, x+xDif, y+yDif, [...w], xDif, yDif)
    }

    return false;
}

const matchesHorizontal= (lines, x, y, w) => {
    return matches(lines, x, y, w, 1, 0);
}

const matchesHorizontalBackwards= (lines, x, y, w) => {
    return matches(lines, x, y, w, -1, 0);
}

const matchesVertical = (lines, x, y, w) => {
    return matches(lines, x, y, w, 0, -1);
}

const matchesVerticalBackwards = (lines, x, y, w) => {
    return matches(lines, x, y, w, 0, 1);
}

const matchesDiagonal1 = (lines, x, y, w) => {
    return matches(lines, x, y, w, 1, 1);
}

const matchesDiagonal2 = (lines, x, y, w) => {
    return matches(lines, x, y, w, 1, -1);
}

const matchesDiagonal3 = (lines, x, y, w) => {
    return matches(lines, x, y, w, -1, 1);
}

const matchesDiagonal4 = (lines, x, y, w) => {
    return matches(lines, x, y, w, -1, -1);
}


export default result;