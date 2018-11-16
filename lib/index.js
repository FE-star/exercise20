!function (root, doc) {

  if (!Element.prototype.matches) { // Polyfill, https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
      Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  class Delegator {
    constructor (selector/* root选择器 */) {
      this.rootSelector = selector;
      this.root = doc.querySelector(selector);
      this.eventQueue = {}; // 持有对应事件注册的selector和triggerFunction
      this.eventListeners = {}; // 持有listener
    }

    handleEvent(e) {
      var path = e.composedPath();
      for (var i = 0; i < path.length; i++) {
        this.eventQueue[e.type].forEach((c) => {
          if (path[i].matches(c.selector)) {
            c.func.call(path[i], e);
          }
        })
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      if (!this.eventQueue[event]) {
        let listener = this.handleEvent.bind(this); // bind()返回新的函数，直接传到addeventlistener里面你就永远也别想删掉它了
        this.eventQueue[event] = [];
        this.eventListeners[event] = listener;
        this.root.addEventListener(event, listener);
      }

      this.eventQueue[event].push({
        selector: selector,
        func: fn,
      });

      return this;
    }

    destroy () {
      for (var event in this.eventListeners) {
        this.root.removeEventListener(event, this.eventListeners[event]);
      }
    }
  }

  root.Delegator = Delegator;
}(window, document)
