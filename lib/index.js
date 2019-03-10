!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      this.root=document.querySelector(selector)
      this._list={}
      this.FN=Symbol('FN')
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      var evs=this._list[event]=this._list[event]||{},root=this.root
      evs[selector]=evs[selector]||[]
      evs[selector].push(fn)
      if(evs[this.FN])this.root.removeEventListener(event,evs[this.FN])
      evs[this.FN]=function(e){
        var _t=e.target
        do for(selector in evs) if(_t.matches(selector))
          evs[selector].forEach(fn=>{fn.call(_t,e)})
        while (_t=_t.parentNode,root!=_t&&_t)
      }
      this.root.addEventListener(event,evs[this.FN])
      return this
    }

    destroy () {
      Object.keys(this._list).forEach(function(event){
        this.root.removeEventListener(event,this._list[event][this.FN])
      }.bind(this));
      this._list=this.root=this.FN=null
    }
  }

  root.Delegator = Delegator
}(window, document)