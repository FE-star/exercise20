!(function(root, doc) {
  class Delegator {
    constructor(selector /* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector) || undefined
      // 记录绑定的绑定
      this.events = {
        //  时间名称
        // 'click':{
        //   // selector: callback
        //   'li.item':fn
        // }
      }
    }

    on(
      eventName /* 绑定事件 */,
      selector /* 触发事件节点对应选择器 */,
      fn /* 出发函数 */
    ) {
      const that = this
      if (!this.events[eventName]) {
        const triggerEvent = event => that.trigger(eventName, event)
        that.events[eventName] = {}
        that.root.addEventListener(eventName, triggerEvent)
        that.events[eventName][`${eventName}`] = triggerEvent
      }
      that.events[eventName][selector] = fn
      return that
    }

    trigger(eventName, event) {
      const that = this
      const paths = event.path
      const length = paths.length
      const selectors = Object.keys(that.events[eventName])
      for (let i = 0; i < length; i++) {
        const dom = paths[i]
        selectors.forEach(_selector => {
          if (dom.matches && dom.matches(_selector)) {
            that.events[eventName][_selector].call(dom, event)
          }
        })
      }
    }

    destroy() {
      const that = this
      Object.keys(that.events).forEach(eventName => {
        that.root.removeEventListener(
          eventName,
          that.events[eventName][`${eventName}`]
        )
      })
    }
  }

  root.Delegator = Delegator
})(window, document)
