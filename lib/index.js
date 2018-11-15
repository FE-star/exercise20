!function (root, doc) {

  class Delegator {
    constructor(selector/* root选择器 */) {
      // TODO
      // super();
      this.root = doc.querySelector(selector)
      this.delegatorList = {}
    }



    on(event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      if (!this.delegatorList[event]) {
        var self = this;
        var bindFun = function (e) {
          console.log('!!!!!!!!',this)
          for (var i = 0; i < e.path.length; i++) {
            self.delegatorList[event].bindList.forEach(item => {
              if (e.path[i].matches(item.selector)) {
                console.log('done');
                item.cb.call(e.path[i], e)
              }
            });
            if (self.root == e.path[i])
              break
          }
        }

        this.root.addEventListener(event, bindFun)

        this.delegatorList[event] = {
          bindFun,
          bindList: [{ 
            cb: fn, 
            selector 
          }]
        }
      } else {
        this.delegatorList[event].bindList.push({
          cb: fn,
          selector
        })
      }
      return this;
    }

    destroy() {
      // TODO;
      Object.keys(this.delegatorList).forEach(item => {
        this.root.removeEventListener(item, this.delegatorList[item].bindFun);
      })
    }
  }

  root.Delegator = Delegator
}(window, document)