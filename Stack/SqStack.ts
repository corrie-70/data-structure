//顺序存储结构的栈算法实现
export class SqStack<T> {
    /**栈顶指针 */
    private top: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素数组（也能用对象实现） */
    private data: T[] = [];

    /**栈初始化 */
    constructor(maxSize?: number) {
        this.top = -1;
        this.maxSize = maxSize;
    }

    /**销毁栈 */
    destroyStack() {
        this.top = -1;
        this.data = [];
        this.maxSize = undefined;
    }

    /**判断栈空 */
    stackEmpty(): boolean {
        return this.top == -1;
    }

    /**进栈 */
    push(ele: T): boolean {
        if (!this.maxSize || (!!this.maxSize && this.top == this.maxSize - 1)) {
            return false;
        }
        this.top++;
        this.data.push(ele);
        return true;
    }

    /**出栈 */
    pop(): boolean | T {
        if (this.top == -1) {
            return false;
        }
        this.top--;
        return this.data.pop();
    }

    /**返回栈顶元素 */
    getTop(): boolean | T {
        if (this.top == -1) {
            return false;
        }
        return this.data[this.top];
    }
}

//test code
// let stack = new SqStack(5);
// console.log('stackEmpty', stack.stackEmpty());
// const data = [1, 2, 3, 4, 5, 6]
// for (let i = 0; i < data.length; i++) {
//     stack.push(data[i]);
// }
// console.log('stack', stack);
// console.log('pop', stack.pop());
// console.log('getTop', stack.getTop());
// console.log('stackEmpty', stack.stackEmpty());
