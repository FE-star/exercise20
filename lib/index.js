! function (root, doc) {

  class Delegator {
    constructor(selector /* root选择器 */ ) {
      this.root = doc.querySelector(selector)
      this.delegates = {}
    }

    on(event /* 绑定事件 */ , selector /* 触发事件节点对应选择器 */ , fn /* 出发函数 */ ) {
      if(!this.delegates[event]) {
        this.delegates[event] = {
          handler: this._delegate(event),
          store: []
        }
        const {handler, store} = this.delegates[event];
        store.push({selector, fn});
        this.root.addEventListener(event, handler);
      } else {
        this.delegates[event].store.push({selector, fn})
      }
      return this;
    }

    destroy() {
      for(let event in this.delegates) {
        this.root.removeEventListener(event, this.delegates[event].handler)
      }
    }

    _delegate(event) {
      return (e) => {
        const {store} = this.delegates[event];
        for(let i = 0; i < e.path.length; i++) {
          const current = e.path[i];
          if (current === this.root) return;
          const last = store[store.length - 1]
          if(current.matches(last.selector)) {
            last.fn.call(current, e);
            store.pop();
            if (store.length === 0) return;
          }
        }
        store.forEach(p => {
          const elm = this.root.querySelector(p.selector);
          p.fn.call(elm, e);
        })
      }
    }
  }

  root.Delegator = Delegator
}(window, document)