!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector)
      this.events = {}
      this.delegator = e => {
        var _event = e || window.event
        var target = _event.target || _event.srcElement
        var currentTarget = _event.currentTarget

        var _events = this.events[e.type]

        while (target !== currentTarget) {
          _events.forEach(t => {
            if (target.matches(t.selector)) {
              var sTarget = target
              t.callback.call(sTarget, e)
            }
          })

          target = target.parentNode
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
          i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1       
      }
  }

  root.Delegator = Delegator
}(window, document)