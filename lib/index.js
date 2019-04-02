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
      evnetName /* 绑定事件 */,
      selector /* 触发事件节点对应选择器 */,
      fn /* 出发函数 */
    ) {
      const that = this
      if (!that.events[evnetName]) {
        const triggerEvent = event => that.trigger(evnetName, event)
        that.events[evnetName] = {}
        that.root.addEventListener(evnetName, triggerEvent)
        that.events[evnetName][`${evnetName}`] = triggerEvent
      }
      that.events[evnetName][selector] = fn
      return that
    }

    trigger(evnetName, event) {
      const that = this
      const paths = event.path
      const length = paths.length
      const selectors = Object.keys(that.events[evnetName])
      for (let i = 0; i < length; i++) {
        const dom = paths[i]
        selectors.forEach(_selector => {
          if (dom.matches && dom.matches(_selector)) {
            that.events[evnetName][_selector].call(dom, event)
          }
        })
      }
    }

    destroy() {
      const that = this
      Object.keys(that.events).forEach(evnetName => {
        that.root.removeEventListener(
          evnetName,
          that.events[evnetName][`${evnetName}`]
        )
      })
    }
  }

  root.Delegator = Delegator
})(window, document)
