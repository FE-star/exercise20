!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector)
      this.obj = {}
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // 记录事件和对应绑定元素的特征
      let fnObj = {
        selector,
        fn
      }
      // TODO
      if (this.obj[event]) {
        this.obj[event].push(fnObj)
      } else {
        this.obj[event] = [fnObj]
      }
      // 通过onclick绑定实现覆盖式注册
      this.root.onclick =  (e) => {
        let ev = e || window.event
        let target = ev.target || ev.srcElement
        let all
        let arr_two = this.obj[event]
        let len = arr_two.length
        // 依次从事件源向上触发对应元素上绑定的事件
        do{
          for (let i = len; i--;) {
            all = Array.prototype.slice.call(this.root.querySelectorAll(arr_two[i].selector), 0)
            if (~all.indexOf(target)) {
              arr_two[i].fn.call(target, e)
              break
            }
          }
          target = target.parentNode
        }while(target &&  target !== this.root)
      }
      return this
    }

    destroy () {
      // TODO
      // 回收注册的所有事件
      this.obj = {}
    }
  }

  root.Delegator = Delegator
}(window, document)