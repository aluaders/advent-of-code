import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day9').then((data) => {
        const lines = data.split(/\r?\n/);
        return lines[0].split('').map(Number);
    }).then((data) => {
        const blocks = convertTo2D(data, 2);

        let pointerLeft = 0;
        let pointerRight = blocks.length - 1;

        let diskLeft = blocks[pointerLeft];
        let diskRight = blocks[pointerRight];

        const disk = [];

        while(pointerLeft < pointerRight) {
            disk.push(...Array(diskLeft[0]).fill(pointerLeft));

            while(diskLeft[1] > 0) {
                diskLeft[1]--;

                if(diskRight[0] === 0) {
                    pointerRight--;
                    diskRight = blocks[pointerRight];
                }

                if(pointerLeft >= pointerRight) return disk;

                disk.push(pointerRight);
                diskRight[0]--;
            }

            pointerLeft++;
            diskLeft = blocks[pointerLeft];
        }

        if(pointerLeft < pointerRight) {
            while(diskRight[0] > 0) {
                disk.push(pointerRight);
                diskRight--;
            }
        }

        console.log(pointerLeft, pointerRight);

        return disk;
    }).then(diskmap => {
        diskmap.forEach((num, idx) => sum += (num * idx));
    });

    console.log(sum);
}

function convertTo2D(arr, numCols) {
    const result = [];
    for (let i = 0; i < arr.length; i += numCols) {
        result.push(arr.slice(i, i + numCols));
    }

    return result;
}

export default result;