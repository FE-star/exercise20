!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this._eventMap = {}

      this.on = this.on.bind(this);
      this.destroy = this.destroy.bind(this);

      this.handleEventTrigger = (event) => (e) => {
        const { selectorList, fnList } = this._eventMap[event]; 
        const targetList = [];
        for (const selector of selectorList) {
          targetList.push(this.root.querySelectorAll(selector))
        }

        // 逐级弹出
        if (fnList.length > 0 && targetList.length > 0) {
          this.callListener(e.target, targetList, fnList, e)
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      if (!this._eventMap[event]) {
        const listener = this.handleEventTrigger(event);
        this.root.addEventListener(event, listener)

        this._eventMap[event] = {
          selectorList: [],
          fnList: [],
          listenFnList: listener, // 用于remove
        }
      }

      const { selectorList, fnList } = this._eventMap[event];
      selectorList.push(selector);
      fnList.push(fn);

      return this;
    }

    callListener(target, targetList, fnList, e) {
      if (this.root.contains(target)) {
        for (let index = 0, len = targetList.length; index < len; index++) {
          for (const node of targetList[index]) {
            target === node && fnList[index].call(target, e)
          }
        }
        this.callListener(target.parentNode, targetList, fnList, e)
      }
    }

    destroy () {
      for (const event in this._eventMap) {
        const { listenFnList } = this._eventMap[event];

        this.root.removeEventListener(event, listenFnList);
      }
    }
  }

  root.Delegator = Delegator
}(window, document)