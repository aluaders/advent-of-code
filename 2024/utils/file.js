import { promises as fs } from "fs";

const readFile = (day) => {
    return fs.readFile(`2024/${day}/input/input.txt`, {encoding: 'utf-8'})
}

export default readFile;