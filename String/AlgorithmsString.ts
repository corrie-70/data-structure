//串的相关算法
//串的顺序和链结构参考顺序表和链表

import { SinglyLinkedList, SNode } from "../LinkedList/SinglyLinkedList";

//比较顺序串大小
//算法思想：在两个串的共同范围内比较对应字符
//如果共同范围字符均相同，则比较串长度，长度相等时返回0
/**
 * 比较顺序串大小
 * @param s 顺序串s
 * @param t 顺序串t
 */
function strcmp(s: string, t: string): number {
    for (let i = 0; i < s.length; i++) {
        if (!t[i]) break;
        if (s[i] < t[i]) {
            return -1;
        } else if (s[i] > t[i]) {
            return 1;
        }
    }
    if (s.length < t.length) {
        return -1;
    } else if (s.length > t.length) {
        return 1;
    }
    return 0;
}

//修改链串最先出现的字串“ab”为“xyz”
/**
 * 链串替换
 * @param str 链串
 */
function repl(str: SinglyLinkedList<string>) {
    let p = str.getHead(),
        q: SNode<string>;
    while (!!p) {
        if (p.element == "a" && p.next.element == "b") {
            p.element = "x";
            p.next.element = "z";
            q = new SNode<string>("y");
            q.next = p.next;
            p.next = q;
        }
        p = p.next;
    }
}

//模式匹配
//Brute-Force算法，简称BF算法，简单匹配算法
//遍历目标串s，逐一比较字符是否与模板串t相等
//如果不相等，s的遍历值加1，否则，返回t在s中的位置
/**
 * 简单匹配算法
 * @param s 目标串
 * @param t 模板串
 */
function bruteForce(s: string, t: string): boolean | number {
    //记录相同字符个数
    let num: number, i: number;
    for (i = 0; i < s.length; i++) {
        //相同字符长度等于t长度，说明匹配完成，不再循环
        if (num == t.length) {
            break;
        } else {
            num = 0;
        }
        for (let j = 0; j < t.length; j++) {
            //字符相同，继续循环j，并记录num
            //不相同则退出本循环，执行i+1
            if (t[j] == s[i + j]) {
                num++;
            } else {
                break;
            }
        }
    }
    if (num == t.length) {
        return i - 1;
    } else {
        return false;
    }
}

//KMP算法
//解决BF算法内主串指针回溯问题
//算法思想：计算next数组保存前面与开头字符相同的字符个数

/**
 * 获取next数组
 * @param str 
 */
function getNext(str: string): number[] {
    let result: number[] = [], k = -1;
    result.push(k);
    for (let i = 0; i < str.length; i++) {
        if (k == -1 || str[i] === str[0]) {
            k++;
            result.push(k);
        } else {
            k = result[k];
        }
    }
    return result
}

/**
 * KMP计算
 * @param s 目标串
 * @param t 匹配串
 */
function KMPIndex(s: string, t: string) {
    let next = getNext(t), i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (j == -1 || s[i] == t[j]) {
            i++; j++;
        } else {
            j = next[j]
        }
    }
    if (j == t.length) {
        return i - t.length
    } else {
        return -1;
    }
}
//test code
// console.log(strcmp("abc", "abc"));
// const slist = new SinglyLinkedList<string>();
// slist.initListAtTail(["d", "f", "b", "a", "b", "c"]);
// repl(slist);
// console.log(JSON.stringify(slist));
// console.log(bruteForce("asdcdbc", "bc"));
console.log(KMPIndex('aaab', 'ab'))
