!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this.delegatedListeners = {};
      this.cache = {};
    }

    cachedQuerySelector(selector) {
      selector = selector.replace(/^\s+(.*?)\s+$/g, '$1');
      if (this.cache[selector]) return this.cache[selector];
      var item = doc.querySelector(selector);
      this.cache[selector] = item;
      return item;
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      var item = this.cachedQuerySelector(selector);
      if (!this.delegatedListeners[event]) this.delegatedListeners[event] = [];
      let delegated = fn.bind(item);
      this.delegatedListeners[event].push({
        target: item,
        event: delegated
      })
      item.addEventListener(event, delegated);
      return this
    }

    destroy () {
      // TODO
      Object.keys(this.delegatedListeners).forEach(eventNm => {
        this.delegatedListeners[eventNm].forEach(item => {
          item.target.removeEventListener(eventNm, item.event);
        })
      })
    }
  }

  root.Delegator = Delegator
}(window, document)