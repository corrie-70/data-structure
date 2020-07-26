//链栈

/**
 * 节点类型
 */
export class LNode<T> {
    constructor(element?: T) {
        this.element = element;
        this.next = null;
    }
    element: T;
    next: null | LNode<T>;
}

/**链栈类 */
export class LiStack<T>{
    /**初始化空栈 */
    constructor() {
        this.head = new LNode<T>();
    }

    /**头节点 */
    private head: LNode<T>;

    /**销毁栈 */
    destroyStack() {
        this.head.next = null;
    }

    /**判断栈空 */
    stackEmpty(): boolean {
        return !this.head.next;
    }

    /**头插法进栈 */
    push(ele: T): boolean {
        let p = new LNode<T>(ele);
        p.next = this.head.next;
        this.head.next = p;
        return true;
    }

    /**从头部出栈 */
    pop(): boolean | T {
        if (!this.head.next) {
            return false;
        }
        let p = this.head.next;
        this.head.next = p.next;
        return p.element;
    }

    /**返回栈顶元素 */
    getTop(): boolean | T {
        if (!this.head.next) {
            return false;
        }
        return this.head.next.element;
    }
}

//判断表达式里的括号是否匹配
//算法思想：左括号入栈，右括号退一个栈里的元素
//匹配右括号时，栈里元素为空，返回false，否则返回true
/**符号匹配算法 */
function match(exp: string): boolean {
    let match = true;
    let lStack = new LiStack<string>();
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '(') {
            //左括号入栈
            lStack.push(exp[i]);
        } else if (exp[i] == ')') {
            if (lStack.getTop()) {
                //当栈内元素不为空时，出栈
                lStack.pop();
            } else {
                match = false;
                break;
            }
        }
    }
    //循环结束后，栈内元素不为空
    if (!lStack.stackEmpty()) {
        match = false;
    }
    return match;
}

//test code
// let stack = new LiStack();
// console.log('stackEmpty', stack.stackEmpty());
// const data = [1, 2, 3, 4, 5, 6]
const data = "((a+b))"
// for (let i = 0; i < data.length; i++) {
//     stack.push(data[i]);
// }
// console.log('stack', stack);
// console.log('pop', stack.pop());
// console.log('getTop', stack.getTop());
// console.log('stackEmpty', stack.stackEmpty());
// stack.destroyStack()
console.log('destroyStack', match(data));
// console.log(symmetry('strts'));