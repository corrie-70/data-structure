//集合（数组）的并集、交集、差集、子集运算

/**
 * 并集
 * @param arr1 
 * @param arr2 
 */
function union<T>(arr1: T[], arr2: T[]): T[] {
    const res = [...arr1];
    arr2.forEach(item => {
        if (res.indexOf(item) == -1) {
            res.push(item)
        }
    })
    return res;
}

/**
 * 交集
 * @param arr1 
 * @param arr2 
 */
function intersection<T>(arr1: T[], arr2: T[]): T[] {
    const res: T[] = [];
    arr1.forEach(item => {
        if (arr2.indexOf(item) != -1) {
            res.push(item)
        }
    })
    return res;
}

/**
 * 差集（只包含在arr1内的元素）
 * @param arr1 
 * @param arr2 
 */
function difference<T>(arr1: T[], arr2: T[]): T[] {
    const res: T[] = [];
    arr1.forEach(item => {
        if (arr2.indexOf(item) == -1) {
            res.push(item)
        }
    })
    return res;
}

/**
 * 子集
 * 如果arr2是arr1的子集，返回true，否则返回false
 * @param arr1 
 * @param arr2 
 */
function isSubArr<T>(arr1: T[], arr2: T[]): boolean {
    if (arr2.length > arr1.length) {
        return false
    }
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            return false;
        }
    }
    return true;
}

const arr1 = [1, 2, 3, 4, 5]
const arr2 = [4, 5]
console.log(union(arr1, arr2))
console.log(intersection(arr1, arr2))
console.log(difference(arr1, arr2))
console.log(isSubArr(arr1, arr2))
