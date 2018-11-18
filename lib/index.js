!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this._eventMap = {}

      this.on = this.on.bind(this);
      this.destroy = this.destroy.bind(this);

      this.handleEventTrigger = (e) => {
        const listenerList = this._eventMap[e.type]; 
        let target = e.target;

        while(target !== e.currentTarget) {
          for (const { selector, fn } of listenerList) {
            if (target.matches(selector)) {
              fn.call(target, e);
            }
          }

          target = target.parentNode;
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      if (!this._eventMap[event]) {
        this.root.addEventListener(event, this.handleEventTrigger);
        this._eventMap[event] = [];
      }

      this._eventMap[event].push({
        selector,
        fn,
      });

      return this;
    }

    destroy () {
      for (const event in this._eventMap) {
        this.root.removeEventListener(event, this.handleEventTrigger);
      }
    }
  }

  root.Delegator = Delegator
}(window, document)