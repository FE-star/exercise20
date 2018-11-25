!function (root, doc) {

  class Delegator {
    constructor(selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      /**
       * 每一种事件类型定义一个委托，并以事件类型命名，比如click
       * delegators={
       *   'click':{
       *             delegator:delegatorFun,
       *             listeners:[]
       *           }
       * }
       */
      this.delegators = {};
    }

    createDelegator(eventName) {
      return (e) => {
        let event = e || window.event;
        for (let i = 0, len = event.path.length; i < len; i++) {
          let target = event.path[i];
          this.delegators[eventName].listeners.forEach((item) => {
            if (target.matches(item.selector)) {
              item.fn.call(target, event);
            }
          });
          if (target === this.root) return;
        }
      };
    }

    on(event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      if (!this.delegators[event]) {
        let delegator = this.createDelegator(event);
        this.delegators[event] = {
          delegator: delegator,
          listeners: []
        };
        // console.log(this.delegators[event].delegator);
        this.root.addEventListener(event, this.delegators[event].delegator);
      }
      this.delegators[event].listeners.push({
        selector,
        fn
      });
      return this;
    }

    destroy() {
      // TODO
      Object.keys(this.delegators).forEach(event => {
        this.root.removeEventListener(event, this.delegators[event].delegator);
      });
    }
  }

  root.Delegator = Delegator
}(window, document)