!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector);
      this.eventsObj = {};
      this.delegator = e =>{
        let target = e.target;
        let currentTarget = e.currentTarget;
        while(target !== currentTarget){
            this.eventsObj[e.type].forEach(item => {
            if(target.matches(item.selector)){
                item.callback.call(target,e);
            }
          });
        
          target = target.parentNode;
        }
      }
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
    
      if(!this.eventsObj[event]){
        this.eventsObj[event] = [];
      }
      this.eventsObj[event].push({
          selector,
          callback: fn
      })

      this.root.addEventListener(event, this.delegator);
      return this;
    }

    destroy () {
      // TODO
      Object.keys(this.eventsObj).forEach(item => {
        this.root.removeEventListener(item, this.delegator)
      })
      this.eventsObj = {};
    }
  }

  root.Delegator = Delegator
}(window, document)