//顺序队列实现

/**顺序存储结构的队列实现 */
export class SqQueue<T>{
    /**队首指针 */
    private front: number;
    /**队尾指针 */
    private rear: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素数组 */
    private data: T[] = [];

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.front = -1;
        this.rear = -1;
        this.maxSize = maxSize;
    }

    /**销毁队列 */
    destroyQueue() {
        this.front = -1;
        this.rear = -1;
        this.maxSize = undefined;
        this.data = [];
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.front == this.rear
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        //尾指针等于最大长度减一时，队列满
        if (this.rear == this.maxSize - 1) {
            return false;
        }
        this.rear++;
        this.data.push(ele);
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.front == this.rear) {
            return false;
        }
        this.front++;
        return this.data.shift();
    }
}

//test code
let queue = new SqQueue(5);
console.log('queueEmpty', queue.queueEmpty());
const data = [1, 2, 3, 4, 5]
for (let i = 0; i < data.length; i++) {
    queue.enQueue(data[i]);
}
console.log('queue', queue);
console.log('deQueue', queue.deQueue());
console.log('queue', queue);
console.log('queueEmpty', queue.queueEmpty());
// console.log(symmetry('strts'));