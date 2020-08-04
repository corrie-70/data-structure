//链队

/**
 * 链表节点
 */
export class QNode<T> {
    constructor(element?: T) {
        this.element = element;
        this.next = null;
    }
    element: T;
    next: null | QNode<T>;
}

/**
 * 单链表队列
 */
export class LiQueue<T> {
    /**
     * 初始化空队列
     */
    constructor() {
        this.front = null;
        this.rear = null;
    }

    /**头指针，指向链表队头节点 */
    private front: null | QNode<T>;
    /**尾指针，指向链表队尾节点 */
    private rear: null | QNode<T>;

    /**销毁队列 */
    destroyQueue() {
        this.front = null;
        this.rear = null;
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return !this.rear;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        let node = new QNode<T>(ele);
        if (!this.rear) {
            this.rear = node;
            this.front = node;
        } else {
            //更改原尾节点next指向
            this.rear.next = node;
            this.rear = node;
        }
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (!this.rear) {
            return false;
        }
        let ele: T;
        //仅有一个节点
        if (this.front == this.rear) {
            ele = this.front.element;
            this.front = null;
            this.rear = null;
        } else {
            ele = this.front.element;
            this.front = this.front.next;
        }
        return ele;
    }
}

//循环单链表存储队列
//不带头结点，rear指针的next为队头

/**
 * 循环单链表队列
 */
export class CircleLiQueue<T> {
    /**初始化空队列 */
    constructor() {
        this.rear = null;
    }

    /**尾指针，指向链表队尾节点 */
    private rear: null | QNode<T>;

    /**销毁队列 */
    destroyQueue() {
        this.rear = null;
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return !this.rear;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        let node = new QNode<T>(ele);
        if (!this.rear) {
            node.next = node;
            this.rear = node;
        } else {
            node.next = this.rear.next;
            this.rear.next = node;
            this.rear = node;
        }
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (!this.rear) {
            return false;
        }
        let ele: T;
        //仅有一个节点
        if (this.rear.next == this.rear) {
            ele = this.rear.element;
            this.rear = null;
        } else {
            ele = this.rear.next.element;
            this.rear.next = this.rear.next.next;
        }
        return ele;
    }
}

//test code
// let liQueue = new LiQueue<number>();
// for (let i = 0; i < 5; i++) {
//     liQueue.enQueue(i);
// }
// // console.log("liQueue", liQueue);
// liQueue.destroyQueue();
// console.log("liQueue", liQueue);

let circleLiQueue = new CircleLiQueue<number>();
for (let i = 0; i < 2; i++) {
    circleLiQueue.enQueue(i);
}
console.log("liQueue", circleLiQueue);
console.log("liQueue", circleLiQueue.deQueue());
console.log("liQueue", circleLiQueue);
circleLiQueue.destroyQueue();
console.log("liQueue", circleLiQueue);
