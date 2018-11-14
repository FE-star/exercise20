describe('delegator', () => {
  let delegator

  // init
  before(() => {
    document.body.innerHTML = `
      <div id="container">
        <li class="item" id="item1"><span id="btn1">hello</span></li>
        <li class="item"><span>world</span></li>
      </div>
    `
  })

  describe('第一次绑定', () => {
    it('可以拿到root节点', () => {
      delegator = new Delegator('#container')
  
      document.getElementById('container')
        .should.equal(delegator.root)
    })
  
    it('可以代理事件并响应', (done) => {
      delegator.on('click', 'li.item', function (e) {
        e.target.innerText.should.equal('hello')
        // this 应当指向正确的元素
        this.should.equal(document.getElementById('item1'))
        // TODO
        done()
      })
  
      // trigger
      document.querySelector('#btn1').click()
    })

    after(() => {
      // destroy
      delegator.destroy()
    })
  })

  describe('第二次绑定', () => {
    it('事件代理触发顺序满足冒泡规则', (done) => {
      let times = 0
      delegator = new Delegator('#container')

      delegator.on('click', 'li.item', function (e) {
        // 这个再触发
        times.should.equal(1)
        done()
      }).on('click', 'li span', function () {
        // 这个先触发
        times.should.equal(0)
        times++
      })

      document.querySelector('#btn1').click()
    })

    after(() => {
      // destroy
      delegator.destroy()
    })
  })

  describe('第三次绑定', () => {
    it('添加新元素应当也能够响应绑定', (done) => {
      delegator = new Delegator('#container')

      const li = document.createElement('li')
      li.className = 'item'
      li.innerHTML = `<span>hahaha</span>`

      delegator.on('click', 'li.item', function (e) {
        this.should.equal(li)
        done()
      })

      document.getElementById('container')
        .appendChild(li)

      li.querySelector('span').click()
    })

    after(() => {
      // destroy
      delegator.destroy()
    })
  })

})