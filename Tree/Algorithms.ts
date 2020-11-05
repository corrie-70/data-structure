import { BSTNode } from "./BinarySearchTree";

// 将有序数组转换为二叉平衡树
var sortedArrayToBST = function (nums: number[]) {
    return _sortedArrayToBST(null, nums);
};

function _sortedArrayToBST(
    node: BSTNode<number> | null,
    nums: number[]
): BSTNode<number> {
    const len = nums.length;
    const mid = len % 2 === 0 ? len / 2 : Math.floor(len / 2);
    if (node == null) {
        node = new BSTNode(nums[mid]);
        if (mid > 0) {
            node.lNode = _sortedArrayToBST(node.lNode, nums.slice(0, mid));
            node.rNode = _sortedArrayToBST(
                node.rNode,
                nums.slice(mid + 1, len)
            );
        }
        return node;
    }
}

console.log(JSON.stringify(sortedArrayToBST([-10, -3, 0, 5, 9, 10, 12])));
