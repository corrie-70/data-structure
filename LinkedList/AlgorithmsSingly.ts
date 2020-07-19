import { SinglyLinkedList, SNode } from "./SinglyLinkedList";


//删除单链表中元素值最大的节点，假设最大值节点唯一
//算法思想，删除节点只需将前一个节点的next指向修改
//所以，定义两个变量保存指向删除的节点及其前一个节点即可只遍历一次

/**
 * 删除单链表中元素值最大的节点
 * @param list 单链表
 */
function delMaxNode<T>(list: SinglyLinkedList<T>) {
    let p = list.getHead().next, pre = list.getHead(), maxpre = pre, max = p;
    while (!!p) {
        if (max.element < p.element) {
            max = p;
            maxpre = pre;
        }
        //p、pre节点后移
        pre = p;
        p = p.next;
    }
    maxpre.next = max.next;
}

//单链表递增有序排列
//算法思想，将链表拆分为只有头节点和一个数据节点的l1，剩下的为l2
//分别有两个指针pre、p遍历这两个链表，比较大小后插入l1

/**
 * 链表递增有序排列
 * @param list 
 */
function sort<T>(list: SinglyLinkedList<T>) {
    //p指针保存保存从第二个数据节点开始的所有数据（包含第二个数据节点）
    let p = list.getHead().next.next, q: SNode<T>, pre: SNode<T>;
    //list只保留一个数据节点，通过遍历比较大小后，再插入数据节点
    list.getHead().next.next = null;
    while (!!p) {
        //先保存后继节点的值，用于驱使while循环
        q = p.next;
        //每一次的p遍历，走回从list的头节点去遍历list整个链表
        pre = list.getHead();
        //pre的后继节点的值大于p的值会退出循环，所以p是插入在pre节点的后面
        while (!!pre.next && pre.next.element < p.element) {
            pre = pre.next;
        }

        //在pre和pre.next中间插入p
        p.next = pre.next;
        pre.next = p;

        //p指针后移
        p = q;
    }
}

//逆置单链表
//算法思想：将l拆分为包含头节点的l1和数据链部分的l2
//遍历l2，采用头插法将元素插入到l1

/**
 * 逆置单链表
 * @param list 
 */
function reverse<T>(list: SinglyLinkedList<T>) {
    let p = list.getHead().next, q: SNode<T>;
    list.getHead().next = null;
    while (!!p) {
        //临时变量保存p的后继节点
        q = p.next;
        p.next = list.getHead().next;
        list.getHead().next = p;
        p = q;
    }
}

//拆分单链表
//L = {a,'26',b,'25',···，z,'1'}，将L拆分为两个表
//L1 = {a,b,c···}  L2 = {'1','2','3'···}  要求L1使用L的头节点
//算法思想：遍历L，L1采用与L顺序一致，采用尾插法建表，L2采用头插法建表

/**
 * 拆分单链表
 * @param list 
 */
function split<T>(list: SinglyLinkedList<T>): SinglyLinkedList<T> {
    let p = list.getHead().next, q: SNode<T>;
    list.getHead().next = null;
    let l1 = list, r = l1.getHead(), l2 = new SinglyLinkedList<T>()
    console.log(p)
    while (!!p) {
        //尾插法建立L1
        r.next = p;
        r = p;

        //头插法建立L2
        p = p.next;
        //q指向p.next.next，由于头插法会改变p.next的值，所以q提前算好
        q = p.next;
        p.next = l2.getHead().next;
        l2.getHead().next = p;

        //p的遍历是间隔元素进行的
        p = q;
    }
    r.next = null;
    return l2;
}

//test code
// const slist = new SinglyLinkedList();

// const data = ['1', 'd', '2', 'c'];
// slist.initListAtTail(data);
// console.log('lll', JSON.stringify(split(slist)))
// console.log("slist", JSON.stringify(slist));
// console.log("slistconfig", slist.dispList());