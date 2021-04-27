<http://hcysun.me/vue-design/zh/renderer-diff.html#%E5%87%8F%E5%B0%8Fdom%E6%93%8D%E4%BD%9C%E7%9A%84%E6%80%A7%E8%83%BD%E5%BC%80%E9%94%80>


# dom-diff算法要点

## 预处理思路

去掉相同的前置和后置节点

## 下一步的diff算法

判断是否有节点需要移动，以及如何移动和找出拿下需要被添加或移除的节点

使用hash表记录原来dom的位置，然后遍历新的children, 生成了和新的的children等长的[], 元素是对应的原来children的位置
然后计算出最长递增子序列，这些dom不需要被移动
