! function (root, doc) {

  class Delegator {
    constructor(selector /* root选择器 */ ) {
      this.root = doc.querySelector(selector)
      this.delegates = []
      root.addEventListener('click', () => {
        this.delegates.forEach(delegate => {
          const elms = this.root.querySelectorAll(delegate.selector);
          elms.forEach(elm => {
            elm.addEventListener(delegate.event, delegate.fn.bind(elm), false)
          })
        })
      }, true)
    }

    on(event /* 绑定事件 */ , selector /* 触发事件节点对应选择器 */ , fn /* 出发函数 */ ) {
      this.delegates.push({
        event,
        selector,
        fn
      })
      return this;
    }

    destroy() {
      this.delegates = []
    }
  }

  root.Delegator = Delegator
}(window, document)