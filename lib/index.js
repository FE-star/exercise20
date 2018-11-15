!function (root, doc) {

  class Delegator {
    constructor(selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector);
      /**
       * 用于存储事件列表
       * [{ eventName: event,selector: selector,fn: fn}]
       */
      this.events = [];
      // 监听是否有新节点插入，如果有新节点插入，那么为新节点注册事件（如果有需要的话）
      this.root.addEventListener('DOMNodeInserted', (e) => {
        this.events.forEach(event => {
          let eles = document.querySelectorAll(event.selector);
          eles.forEach((ele) => {
            if (e.target == ele) {
              e.target.addEventListener(event.eventName, event.fn)
            }
          });
        });
      }, false);
    }

    on(event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      let e = {
        eventName: event,
        selector: selector,
        fn: fn
      }
      this.events.includes(e) ? null : this.events.push(e);
      let eles = document.querySelectorAll(selector);
      eles.forEach((ele) => {
        ele.addEventListener(event, fn)
      });
      return this;
    }

    destroy() {
      // TODO
      this.events = [];
    }
  }
  root.Delegator = Delegator
}(window, document)

