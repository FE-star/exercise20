!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.stack = [];
      this.root  = document.querySelector(selector);
      this.delegate = null;
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      this.stack.push(fn)

      // 链式调用时，移除先前的on传入的出发函数
      if ( this.delegate != null ){
        this.root.removeEventListener(event, this.delegate)
      }
      // 查出满足selector的dom
      this.delegate = (e) => {
        var i = 0;
        while (i < e.path.length) {
          if(e.path[i].matches(selector)){
            // 后进先出
            this.stack.reverse().forEach(fn => {
              fn.call(e.path[i], e)
            });
            return 0;
          }
          i++;
        }
      }
      this.root.addEventListener(event, this.delegate)
      return this;
    }

    destroy () {
      // TODO
      this.root.removeEventListener(event, this.delegate);
      this.delegate = null;
      this.stack = []
    }
  } 

  root.Delegator = Delegator
}(window, document)


 