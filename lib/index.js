!(function(root, doc) {
	class Delegator {
		constructor(selector /* root选择器 */) {
			// TODO
			this.root = document.querySelector(selector)
			this.listenList = {}
			this.deleg = e => {
        console.log(3);
				var target = e.target
				while (target !== e.currentTarget) {
					this.listenList[e.type].forEach(element => {
						if (target.matches(element.name)) {
							element.cb.call(target, e)
						}
					})
					target = target.parentNode
				}
			}
		}
		on(
			event /* 绑定事件 */,
			selector /* 触发事件节点对应选择器 */,
			fn /* 出发函数 */
		) {
			// TODO
			if (!this.listenList[event]) {
        console.log(1);
				this.listenList[event] = [
					{
						name: selector,
						cb: fn
					}
				]
				this.root.addEventListener(event, this.deleg)
			} else {
        console.log(2);
				this.listenList[event].push({
					name: selector,
					cb: fn
				})
			}
			return this
		}

		destroy() {
			// TODO
			Object.keys(this.listenList).forEach(e => {
				this.root.removeEventListener(e, this.deleg)
			})
		}
	}

	root.Delegator = Delegator
})(window, document)
