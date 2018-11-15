!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this.eventCollection = {};
      // Using `bind this` not `arrow function` for prevent creating multiple functions
      // Also prevent trigger multiple click
      this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(e) {
      const eventPath = e.path;
      const type = this.eventCollection[e.type];
      if (!type) return;
      for (let i = 0; i < eventPath.length; i++) {
        if (eventPath[i] === e.currentTarget) return;
        type[eventPath[i]] && type[eventPath[i]].call(eventPath[i], e);
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 触发函数 */) {
      // TODO
      if (!this.eventCollection[event]) {
        this.eventCollection[event] = {};
      }

      // It may not be a good way, saved a big element as key and used querySelector.
      Object.assign(this.eventCollection[event], { [doc.querySelector(selector)]: fn });
      this.root.addEventListener(event, this.handleEvent);
      return this;
    }

    destroy () {
      // TODO
      Object.keys(this.eventCollection).forEach(event => {
        this.root.removeEventListener(event, this.handleEvent);
      })
      this.eventCollection = {};
    }
  }

  root.Delegator = Delegator
}(window, document)
