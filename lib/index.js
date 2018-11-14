!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this.delegatedListeners = {};
    }

    delegator (eventNm) {
      return (e, ...args) => {
        var event = e || window.event;
        // console.log(e);
        var i = 0, len = event.path.length;
        while (i < len) {
          var target = event.path[i];
          this.delegatedListeners[eventNm].listeners.forEach(item => {
            if (target.matches(item.selector)) {
              item.fn.call(target, e, ...args);
            }
          })
          if (target === this.root) return
          i++;
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // 字符串处理selector
      selector = selector.replace(/^\s+(.*?)\s+$/g, '$1');

      if (!this.delegatedListeners[event]) {
        let delegator = this.delegator(event);
        this.delegatedListeners[event] = {
          delegator,
          listeners: []
        }
        this.root.addEventListener(event, delegator);
      };
      this.delegatedListeners[event].listeners.push({
        selector,
        fn
      })

      return this
    }

    destroy () {
      // TODO
      Object.keys(this.delegatedListeners).forEach(eventNm => {
          this.root.removeEventListener(eventNm, this.delegatedListeners[eventNm].delegator);
      })
    }
  }

  root.Delegator = Delegator
}(window, document)