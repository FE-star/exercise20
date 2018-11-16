!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = document.querySelector(selector);
      this._eventList = {}
      this.handleEvent = this.handleEvent.bind(this)
    }
    addEvent (event, selector, fn) {
      if(!this._eventList[event]){
        this._eventList[event] = {
          [selector]: [fn]
        }
        return;
      }
      if(!this._eventList[event][selector]){
        this._eventList[event][selector] = [fn];
      }else {
        this._eventList[event][selector] = [...this._eventList[event][selector],fn];
      }
    }
    handleEvent(e) {
      const currentEventList = this._eventList[e.type];
      e.path.map((target) => {
        Object.keys(currentEventList).map((selector) => {
          if(target.matches(selector)){
            currentEventList[selector].map((fn) => {
              fn.call(target, e)
            })
          }
        })
        
      })
    }
    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      this.addEvent(event, selector, fn);
      this.root.addEventListener(event, this.handleEvent)
      return this;
    }

    destroy () {
      // TODO
      Object.keys(this._eventList).map((event) => {
        this.root.removeEventListener(event, this.handleEvent)
      })
      this._eventList = {}
    }
  }

  root.Delegator = Delegator
}(window, document)