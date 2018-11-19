!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);

      this.delegatorList = {};

      // 触发执行的函数
      this._delegator = (e) => {
        // 兼容性处理
        let event = e || window.event;

        // 获取到目标阶段指向的元素
        let target = event.target;

        // 获取到代理事件的函数
        var currentTarget = event.currentTarget;
        
        // 获取当前类型的列表
        let currentEventList = this.delegatorList[e.type];

        // 遍历外层并且匹配
        while (target !== currentTarget) {

          currentEventList.forEach(item => {

            // 判断是否匹配到我们所需要的元素上
            if (target.matches(item.selector)) {
              // 执行绑定的函数，注意 this
              item.fn.call(target, event)
            }
          })
          target = target.parentNode;
        }

      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      if(!this.delegatorList[event]) {
        this.delegatorList[event] = [{selector, fn}];
        this.root.addEventListener(event, this._delegator);
      } else {
        this.delegatorList[event].push({selector, fn});
      }
      return this;
    }

    destroy () {
      // TODO
      Object.keys(this.delegatorList).map(eventName => {
        this.root.removeEventListener(eventName, this._delegator);
      })
    }
  }

  root.Delegator = Delegator
}(window, document)