!function (root, doc) {

  class Delegator {
    constructor(selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this.delegatorEventList = {};
      this.delegator = function delegator(e) {
        
        let en = e || window.event;
        // e.target是当前执行者，e.currentTarget是事件监听者，兼容IE浏览器
        let target = en.target || en.srcElement;
        // e.type是绑定的事件名称，获取相同事件名称的被委托的事件列表
        let targetEventList = this.delegatorEventList[en.type];
        // 循环判断当前节点是否是事件监听者节点，如果是则触发绑定的事件函数
        while (target !== en.currentTarget)
          targetEventList.forEach(event => {
            if (target.matches(event.selector)) {
              event.fn.call(target, en);
            }
          }); {
          target = target.parentNode;
        }
      }
    }

    on(event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 触发函数 */) {
      // TODO
      // 判断是否有和传入的事件名称相对应的委托事件列表，
      // 如果有则把传入的选择器和函数加入到列表中，相反则初始化一个数组并把选择器和函数加入进来
      // 之所以用数组是因为一个父元素会包含各种子元素，所有的子元素事件都绑定在一个父元素上，
      // 不同的子元素对应的选择器和要触发的执行函数会不一样
      if (this.delegatorEventList[event]) {
        this.delegatorEventList[event].push({
          matches: selector,
          fn: fn
        });
      } else {
        this.delegatorEventList[event] = [{
          matches: selector,
          fn: fn
        }];
      }
      if (doc.addEventListener) {
        this.root.addEventListener(event, this.delegator);
      } else {
        this.root.attachEvent("on" + event, this.delegator);
      }
      return this;
    }

    destroy() {
      // TODO
      Object.keys(this.delegatorEventList).map(eventName => {
        this.root.removeEventListener(eventName, this.delegator)
      });
    }
  }

  root.Delegator = Delegator
}(window, document)