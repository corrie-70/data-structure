/**
 * 单链表节点
 */
export class SNode<T> {
    constructor(element?: T) {
        this.element = element;
        this.next = null;
    }
    element: T;
    next: null | SNode<T>;
}

/**
 * 单链表，元素值初始位置为1
 */
export class SinglyLinkedList<T> {
    constructor() {
        this.initList();
    }

    /**头节点 */
    head: SNode<T>;
    /**节点数 */
    private count: number;

    /**
     * 初始化空链表
     */
    initList() {
        this.head = new SNode<T>();
        this.count = 0;
    }

    /**
     * 尾插法初始化单链表，链表顺序与数组排序一致
     * @param data 数组参数
     */
    initListAtTail(data: Array<T>) {
        let sNode: SNode<T>;
        //指向链表尾节点
        let r = this.head;
        if (data.length === 0) return;
        for (let i = 0; i < data.length; i++) {
            sNode = new SNode(data[i]);
            //利用对象浅拷贝，修改当前尾节点的next值
            r.next = sNode;
            //r指向新的尾节点
            r = sNode;
            this.count++;
        }
    }

    /**
     * 头插法初始化单链表，链表顺序与数组排序相反
     * @param data
     */
    initListAtHead(data: Array<T>) {
        let sNode: SNode<T>;
        if (data.length === 0) return;
        for (let i = 0; i < data.length; i++) {
            sNode = new SNode(data[i]);
            //新插入的节点接管head的指向
            sNode.next = this.head.next;
            //head恒指向新插入的节点
            this.head.next = sNode;
            this.count++;
        }
    }

    /**
     * 判断链表是否为空
     */
    listEmpty(): boolean {
        return !this.head.next;
    }

    /**
     * 返回链表长度
     */
    listLength(): number {
        return this.count;
    }

    /**
     * 输出链表元素
     */
    dispList() {
        let p = this.head.next;
        while (!!p) {
            console.log(p.element);
            p = p.next;
        }
    }

    /**
     * 按位置查找元素，存在则返回元素值，否则返回false
     * @param i 位置序号
     */
    getElem(i: number): T | boolean {
        //超出链表长度返回false
        if (i > this.count || i == 0) {
            return false;
        }
        let p = this.head;
        let j = 0;
        while (j < i && !!p.next) {
            j++;
            p = p.next;
        }
        return p.element;
    }

    /**
     * 按元素值查找，存在则返回位置，否则返回0
     * @param ele 元素值
     */
    locateElem(ele: T): number {
        let p = this.head.next;
        let i = 1;
        while (!!p && p.element != ele) {
            i++;
            p = p.next;
        }
        if (!p) {
            return 0;
        } else {
            return i;
        }
    }

    /**
     * 在指定位置插入元素，插入成功返回true，否则false
     * @param i
     * @param ele
     */
    listInsert(i: number, ele: T): boolean {
        let j = 1;
        let p = this.head.next;
        while (j < i - 1 && !!p) {
            j++;
            p = p.next;
        }
        if (!p) {
            return false;
        } else {
            const sNode = new SNode(ele);
            //节点插入到p之后
            sNode.next = p.next;
            p.next = sNode;
            this.count++;
            return true;
        }
    }

    /**
     * 删除指定位置元素
     * @param i
     */
    listDelete(i: number): boolean | SNode<T> {
        //超出链表长度返回false
        if (i > this.count || i == 0) {
            return false;
        }
        let p = this.head.next;
        let j = 1;
        while (j < i - 1 && !!p) {
            j++;
            p = p.next;
        }
        if (!!p) {
            const q = p.next;
            p.next = q.next;
            this.count--;
            return q;
        }
    }
}

/**
 * 通过释放内存方法，将变量的引用置为空
 * @param prop
 */
function destroyProp(prop: any) {
    prop = null;
}

//test code
// const slist = new SinglyLinkedList();
// console.log("slist", slist);
// console.log("slistconfig", slist.dispList());
// const data = [1, 2, 3, 4];
// slist.initListAtTail(data);
// console.log("initListAtTail", JSON.stringify(slist));
// console.log("initListAtTailconfig", slist.listDelete(3));
