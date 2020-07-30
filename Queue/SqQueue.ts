//顺序队列实现
/**元素值对象类型 */
export interface ElementType<T> {
    [id: number]: T
}

/**顺序存储结构的队列实现 */
export class SqQueue<T>{
    /**队首指针 */
    private front: number;
    /**队尾指针 */
    private rear: number;
    /**最大长度 */
    private maxSize: number | undefined;
    //不使用数组是因为当数组从头部出一个元素后，整个索引会重新从0排列，之后删除元素错误
    /**元素对象 */
    private data: ElementType<T>;

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    private initQueue(maxSize?: number) {
        this.front = -1;
        this.rear = -1;
        this.maxSize = maxSize;
        this.data = {};
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
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
        this.data[this.rear] = ele;
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.front == this.rear) {
            return false;
        }
        this.front++;
        const ele = this.data[this.front];
        delete this.data[this.front];
        return ele;
    }
}

//环形队列
//判断队满、队空、进队、出队的算法变了，其余同上

/**环形队列实现 */
export class CirQueue<T>{
    /**队首指针 */
    private front: number;
    /**队尾指针 */
    private rear: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素数组 */
    private data: ElementType<T>;

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    /**初始化队列 */
    private initQueue(maxSize?: number) {
        this.front = -1;
        this.rear = -1;
        this.maxSize = maxSize;
        this.data = {};
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.rear == this.front;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        //队满
        if (((this.rear + 1) % this.maxSize) == this.front) {
            return false;
        }
        this.rear = (this.rear + 1) % this.maxSize;
        this.data[this.rear] = ele;
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.front == this.rear) {
            return false;
        }
        this.front = (this.front + 1) % this.maxSize;
        const ele = this.data[this.front];
        delete this.data[this.front]
        return ele;
    }
}

//环形队列
//用队列中元素个数替代尾指针

/**环形队列（元素个数实现） */
export class CircleCountQueue<T>{
    /**队首指针 */
    private front: number;
    /**队列元素个数 */
    private count: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素数组 */
    private data: T[] = [];

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    /**初始化队列 */
    private initQueue(maxSize?: number) {
        this.front = -1;
        this.count = 0;
        this.maxSize = maxSize;
        this.data = [];
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.count == 0;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        //队满
        if (this.count == this.maxSize) {
            return false;
        }
        this.count++;
        this.data.push(ele);
        return true;
    }
}

//test code
let queue = new SqQueue<number>(5);
console.log('queueEmpty', queue.queueEmpty());
const data = [1, 2, 3, 4, 5]
// for (let i = 0; i < data.length; i++) {
//     queue.enQueue(data[i]);
// }
// console.log('queue', queue);
// console.log('deQueue', queue.deQueue(), queue.deQueue());
// console.log('queue', queue);
// console.log(queue.enQueue(1)); //即使已经出队一个元素，还是不能再入队新的元素
// console.log('queueEmpty', queue.queueEmpty());

// let cQueue = new CirQueue<number>(5);
// for (let i = 0; i < data.length; i++) {
//     cQueue.enQueue(data[i]);
// }
// console.log('cQueue', cQueue);
// console.log('deQueue', cQueue.deQueue(), cQueue.deQueue());
// console.log('cQueue', cQueue);
// console.log('cQueue', cQueue.enQueue(6))
// console.log('cQueue', cQueue.enQueue(7))
// console.log('cQueue', cQueue);