!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      //绑定事件的跟元素
      this.root =document.querySelector(selector);
      //存储绑定的事件
      this.events={}
      //执行的函数
      this.delegator=function delegator(e){
        // 兼容性处理
        let _event = e || window.event;
          // 获取到目标阶段指向的元素
        let target = _event.target || _event.srcElement;

        // 获取到代理事件的函数
        let currentTarget = _event.currentTarget;

        var _events=this.events[e.type];
        // 处理 matches 的兼容性
        if (!Element.prototype.matches) {
            Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
              var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
              while (--i >= 0 && matches.item(i) !== this) {}
              return i > -1;            
            };
        }

        // 遍历外层并且匹配
        while (target !== currentTarget) {
          // 判断是否匹配到我们所需要的元素上
          _events.forEach(t => {
            if (target.matches(t.selector)) {
              var sTarget = target
              t.callback.call(sTarget, e)
            }
          })

          target = target.parentNode;
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO

      if (!Array.isArray(this.events[event])) {
        this.events[event] = []
      }

      this.root.addEventListener(event, this.delegator, false)

      this.events[event].push({
        selector: selector,
        callback: fn
      })

      return this
    }

    destroy () {
      // TODO
      for (let type in this.events) {
        this.root.removeEventListener(type, this.delegator, false);
      }
    }
  }

  root.Delegator = Delegator
}(window, document)