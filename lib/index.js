!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector);
      this.eventMap = {};
      // 所有的事件都绑定到this.root上，同一个事件只绑定一次
      this.delegator = (e) => {
        const delegatorTarget = e.currentTarget;
        let currentTarget = e.target;
        const type = e.type;
        const eventQueue = this.eventMap[type];
        while (currentTarget !== delegatorTarget) {
          eventQueue.forEach((target) => {
            if (currentTarget.matches(target.selector)) {
              target.fn.call(currentTarget, e);
            }
          });
          currentTarget = currentTarget.parentNode;
        }
      };
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO 
      if (!this.eventMap[event]) {
        this.eventMap[event] = [];
        this.root.addEventListener(event, this.delegator, false);
      }
      this.eventMap[event].push({
        selector,
        fn
      });
      return this;
    }

    destroy () {
      // TODO
      for (let [type,] of Object.entries(this.eventMap)) {
        this.root.removeEventListener(type, this.delegator, false);
      }
    }
  }

  root.Delegator = Delegator
}(window, document)