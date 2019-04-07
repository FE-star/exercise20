!function (root, doc) {

  class Delegator {
    /*
     *@param 顶级选择器（代理者）
     */
    constructor (selector) {
      this.root = document.querySelector(selector);//顶级dom
      this.delegatorEvents = {};//代理元素及事件
      //代理逻辑
      this.delegator = e => {        
        let currentNode = e.target;//目标节点
        const targetEventList = this.delegatorEvents[e.type];
        //如果当前目标节点等于事件当前所在的节点，不再向上冒泡
        while (currentNode !== e.currentTarget) {
          targetEventList.forEach(target => {
            if (currentNode.matches(target.matcher)) {
              //开始委托并把当前目标节点的event对象传过去
              target.callback.call(currentNode, e);
            }
          })
          currentNode = currentNode.parentNode;
        }
      }

    }
    /*
     *绑定事件
     *@param event 绑定事件类型
     *@param selector 触发事件节点对应选择器
     *@param fn 触发函数
     * */
    on (event, selector, fn) {
      if (!this.delegatorEvents[event]) {
        this.delegatorEvents[event] = [{
          matcher: selector,
          callback: fn
        }]
        this.root.addEventListener(event, this.delegator);
      }else{
        this.delegatorEvents[event].push({
          matcher: selector,
          callback: fn
        })
      }
      return this;
    }
    /*
     *移除事件
     */
    destroy () {
      Object.keys(this.delegatorEvents).forEach(eventName => {
        this.root.removeEventListener(eventName, this.delegator)
      });
    }
  }

  root.Delegator = Delegator
}(window, document)