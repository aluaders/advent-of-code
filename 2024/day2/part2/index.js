import readFile from "../../utils/file.js";

const result = async () => {
    await readFile('day2').then((data) => {
        const lines = data.split(/\r?\n/);
        let sumOfSafe = 0;
        lines.forEach(line => {
            const safe = isSafe(line);
            if(safe) sumOfSafe++;
        })
        console.log(sumOfSafe)
    });
}

const isBetween = (num, min, max)  => {
    return num >= min && num <= max;
}

const isLevelDiff = (num1, num2) => {
    const diff = Math.abs(num1 - num2);
    return isBetween(diff, 1, 3);
}

const isSafe = (line) => {
    const nums = line.split("\ ").map(Number);

    if(!isLevelDiff(nums[0], nums[1])) {
        let nums1 = [...nums];
        let nums2 = [...nums];

        nums1.splice(0,1);
        nums2.splice(1,1);

        return doubleCheck(nums1) || doubleCheck(nums2);
    };
    const isDecrease = (nums[0] > nums[1]);

    for(let i = 1; i < nums.length - 1; i++) {
        if(!isLevelDiff(nums[i], nums[i+1])) {
            let nums1 = [...nums];
            let nums2 = [...nums];
            let nums3 = [...nums];

            nums1.splice(i+1,1);
            nums2.splice(i,1);
            nums3.splice(i-1,1);
    
            return doubleCheck(nums1) || doubleCheck(nums2) || doubleCheck(nums3);
        };
        if(isDecrease) {
            if(nums[i] < nums[i+1]) {
                let nums1 = [...nums];
                let nums2 = [...nums];
                let nums3 = [...nums];

                nums1.splice(i+1,1);
                nums2.splice(i,1);
                nums3.splice(i-1,1);
        
                return doubleCheck(nums1) || doubleCheck(nums2) || doubleCheck(nums3);
            };
        } else {
            if(nums[i] > nums[i+1]) {
                let nums1 = [...nums];
                let nums2 = [...nums];
                let nums3 = [...nums];

                nums1.splice(i+1,1);
                nums2.splice(i,1);
                nums3.splice(i-1,1);
        
                return doubleCheck(nums1) || doubleCheck(nums2) || doubleCheck(nums3);
            };
        }
    }

    return true;
}

const doubleCheck = (nums) => {
    console.log('Double ' + nums.join(' '))
    if(!isLevelDiff(nums[0], nums[1])) return false;
    const isDecrease = (nums[0] > nums[1]);

    for(let i = 1; i < nums.length - 1; i++) {
        if(!isLevelDiff(nums[i], nums[i+1])) return false;
        if(isDecrease) {
            if(nums[i] < nums[i+1]) return false;
        } else {
            if(nums[i] > nums[i+1]) return false;
        }
    }

    return true;
}

export default result;