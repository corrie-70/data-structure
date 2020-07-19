/**
 * 双链表节点
 */
export class DNode<T>{
    constructor(element?: T) {
        this.element = element;
        this.next = null;
        this.prior = null;
    }
    element: T;
    /**前驱节点 */
    prior: null | DNode<T>;
    /**后继节点 */
    next: null | DNode<T>;
}

export class DoublyLinkedList<T>{
    /**
     * 初始化双链表
     */
    constructor() {
        this.head = new DNode<T>();
    }

    /**头节点 */
    private head: DNode<T>;

    /**
     * 尾插法
     * @param data 
     */
    initListAtTail(data: Array<T>) {
        let dNode: DNode<T>;
        //指向链表尾节点
        let r = this.head;
        for (let i = 0; i < data.length; i++) {
            dNode = new DNode(data[i]);
            //利用对象浅拷贝，修改当前尾节点的next值
            r.next = dNode;
            dNode.prior = r;
            //r指向新的尾节点
            r = dNode;
        }
    }

    /**
     * 头插法
     * @param data 
     */
    initListAtHead(data: Array<T>) {
        let dNode: DNode<T>;
        for (let i = 0; i < data.length; i++) {
            dNode = new DNode(data[i]);
            dNode.prior = this.head;
            //新插入的节点接管head的指向
            dNode.next = this.head.next;
            //head恒指向新插入的节点
            this.head.next = dNode;
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
            const dNode = new DNode(ele);
            //节点插入到p之后
            dNode.next = p.next;
            if (!!p.next) {
                p.next.prior = dNode;
            }
            dNode.prior = p;
            p.next = dNode;
            return true;
        }
    }

    /**
     * 删除指定位置元素
     * @param i 
     */
    listDelete(i: number): boolean | DNode<T> {
        let p = this.head.next;
        let j = 1;
        while (j < i - 1 && !!p) {
            j++;
            p = p.next;
        }
        if (!!p) {
            //删除q
            const q = p.next;
            if (!q) {
                return false;
            }
            p.next = q.next;
            if (!!p.next) {
                p.next.prior = p;
            }
            return q;
        } else {
            return false;
        }
    }
}

//test code
// const slist = new DoublyLinkedList();
// const data = [1, 2, 3, 4];
// slist.initListAtTail(data)
// slist.listInsert(1, 90);
// slist.listDelete(1);