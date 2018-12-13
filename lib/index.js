!function (root, doc) {

	class Delegator {
		constructor(selector/* root选择器 */) {
			// TODO
			this.root = doc.querySelector(selector)
			this.eventList = {}
			this.delegator = e => {
				let currentNode = e.target;
				let targeEventList = this.eventList[e.type]
				while (currentNode != e.currentTarget) {
					targeEventList.forEach(function (target) {
						if (currentNode.matches(target.matcher)) {
							target.callback.call(currentNode, e)
						}
					});
					currentNode = currentNode.parentNode
				}
			}
		}

		on(event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
			if (!this.eventList[event]) {
                this.eventList[event] = [{
                    matcher: selector,
                    callback: fn
                }]
                this.root.addEventListener(event, this.delegator)
            } else {
                this.eventList[event].push({
                    matcher: selector,
                    callback: fn
                })
            }
            return this
		}

		destroy() {
			// TODO
			Object.keys(this.eventList).map(eventName => {
				this.root.removeEventListener(eventName, this.delegator);
			})
		}
	}

	root.Delegator = Delegator
}(window, document)