!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
	  // TODO
		this.root = doc.querySelector(selector);
		this.delegatorList = {};
		this.delegator = (e, ...args) => {
			let target = e.target;
			const targetEventList = this.delegatorList[e.type];
			while( target !== e.currentTarget ) {
				targetEventList.forEach( item => {
					if ( target.matches(item.selector) ) {
						item.func.call( target, e, ...args);
					}
				})
				target = target.parentNode;
			}
		}
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
		if ( !this.delegatorList[event] ) {
			this.root.addEventListener(event, this.delegator);
			this.delegatorList[event] = [];
		}
		this.delegatorList[event].push ({ selector: selector, func: fn});
		return this;
    }

    destroy () {
		Object.keys( this.delegatorList ).map( event => {
			this.root.removeEventListener( event, this.delegator);
		})
		this.delegatorList = {};
    }
  }

  root.Delegator = Delegator
}(window, document)