!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector);
      this.delegatorEventList = {};
      this.delegator = e => {        
        let currentNode = e.target;
        const targetEventList = this.delegatorEventList[e.type];
        while (currentNode !== e.currentTarget) {
          targetEventList.forEach(target => {
            if (currentNode.matches(target.matcher)) {
              target.callback.call(currentNode, e);
            }
          })
          currentNode = currentNode.parentNode;
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      if (!this.delegatorEventList[event]) {
        this.delegatorEventList[event] = [{
          matcher: selector,
          callback: fn
        }]
        this.root.addEventListener(event, this.delegator);
      } else {
        this.delegatorEventList[event].push({
          matcher: selector,
          callback: fn
        })
      }
      return this;
    }

    destroy () {
      // TODO
      Object.keys(this.delegatorEventList).map(eventName => {
        this.root.removeEventListener(eventName, this.delegator)
      });
    }
  }

  root.Delegator = Delegator
}(window, document)