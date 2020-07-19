import { SinglyLinkedList, SNode } from "./SinglyLinkedList";

//二路归并算法
//将两个有序表合并为一个
//算法思想，遍历两表，取小值复制到新表中

/**
 * 二路归并算法
 * @param list1 
 * @param list2 
 */
function unionList<T>(list1: SinglyLinkedList<T>, list2: SinglyLinkedList<T>): SinglyLinkedList<T> {
    let result = new SinglyLinkedList<T>(),
        p = list1.getHead().next,
        q = list2.getHead().next,
        r: SNode<T> = result.getHead(),
        sNode: SNode<T>;
    while (!!p && !!q) {
        if (p.element < q.element) {
            sNode = new SNode(p.element);
            r.next = sNode;
            r = sNode;
            p = p.next;
        } else {
            sNode = new SNode(q.element);
            r.next = sNode;
            r = sNode;
            q = q.next;
        }
    }
    while (!!p) {
        sNode = new SNode(p.element);
        r.next = sNode;
        r = sNode;
        p = p.next;
    }
    while (!!q) {
        sNode = new SNode(q.element);
        r.next = sNode;
        r = sNode;
        q = q.next;
    }
    return result;
}

//test code

// const slist1 = new SinglyLinkedList();
// slist1.initListAtTail([2, 3, 6, 9, 13])

// const slist2 = new SinglyLinkedList();
// slist2.initListAtTail([0, 1, 4, 20, 23])

// console.log(unionList(slist1, slist2).dispList())