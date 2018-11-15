!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      this.rootSelector = selector;
      this.root = doc.querySelector(selector);
      this.eventQueue = {}; // 持有对应事件注册的selector和triggerFunction
      this.eventListeners = {}; // 持有listener
    }

    handleEvent(e) {
      var target = e.target;
      var filterArray = this.eventQueue[e.type].filter((element) => { // 基本要求是从root到给定selector所获得的element再到target element这样的路径是存在的
        var closestElmtOrNull = target.closest(element.selector);
        if (closestElmtOrNull) {
          return closestElmtOrNull.closest(this.rootSelector) === this.root;
        }
        return false;
      });
      filterArray.sort((a, b) => {
        let aElement = target.closest(a.selector);
        let bElement = target.closest(b.selector);
        let temp = target.parentElement;
        while (temp !== this.root) { // 从target到root先找到的元素在数组前面
          if (temp === aElement) {
            return 1;
          }
          if (temp === bElement) {
            return -1;
          }
          temp = temp.parentElement;
        }
      });
      filterArray.forEach((element) => {
        element.func.call(target.closest(element.selector), e); // 注意this
      });
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
