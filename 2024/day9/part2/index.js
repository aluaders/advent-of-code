import readFile from "../../utils/file.js";

const result = async () => {
    let sum = 0;

    await readFile('day9').then((data) => {
        const lines = data.split(/\r?\n/);
        return lines[0].split('').map(Number);
    }).then((data) => {
        const blocks = convertTo2D(data, 2);
        const disk = [];

        let pL = 0;
        let pR = blocks.length - 1;

        while(pL < pR) {
            if(blocks[pL].free > 0) break;
            pL++;
        }

        while(pR > pL) {
            const rightBlock = blocks[pR];
            const preRightBlock = blocks[pR - 1];

            for(let pL = 0; pL < pR; pL++) {
                const leftBlock = blocks[pL];
                if(leftBlock.free >= rightBlock.file) {
                    preRightBlock.free += rightBlock.file + rightBlock.free;
                    rightBlock.free = leftBlock.free - rightBlock.file;
                    leftBlock.free = 0;
                    blocks.splice(pL + 1, 0, rightBlock);
                    blocks.splice(pR + 1, 1);
                    pR++;

                    while(pL < pR) {
                        if(blocks[pL].free > 0) break;
                        pL++;
                    }

                    break;
                }
            }
            pR--;
        }

        for(let i = 0; i < blocks.length; i++) {
            const b = blocks[i];
            disk.push(...Array(b.file).fill(b.id));
            disk.push(...Array(b.free).fill(0));
        }
        return disk;
    }).then(diskmap => {
        diskmap.forEach((num, idx) => sum += (num * idx));
    });

    console.log(sum);
}

function convertTo2D(arr, numCols) {
    const result = [];
    for (let i = 0; i < arr.length; i += numCols) {
        const subarr = arr.slice(i, i + numCols);
        result.push({id: (i / 2), file: subarr[0], free: subarr[1] ?? 0});
    }

    return result;
}

export default result;
