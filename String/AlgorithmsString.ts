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

function bruteForce(s: string, t: string): boolean | number {
    let num = 1;
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < t.length; j++) {
            console.log("2");
            if (t[j] == s[i + j]) {
                num++;
            } else {
                break;
            }
        }
        if (num == t.length) {
            return num;
        } else {
            return false;
        }
    }
}
//test code
// console.log(strcmp("abc", "abc"));
// const slist = new SinglyLinkedList<string>();
// slist.initListAtTail(["d", "f", "b", "a", "b", "c"]);
// repl(slist);
// console.log(JSON.stringify(slist));
console.log(bruteForce("abc", "bc"));
