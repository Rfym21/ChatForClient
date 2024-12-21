import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
import Pullup from '@better-scroll/pull-up'
import ScrollBar from '@better-scroll/scroll-bar'
import Indicators from '@better-scroll/indicators'
import Slide from '@better-scroll/slide'
import Wheel from '@better-scroll/wheel'
import Zoom from '@better-scroll/zoom'
import NestedScroll from '@better-scroll/nested-scroll'
import InfinityScroll from '@better-scroll/infinity'
import Movable from '@better-scroll/movable'



// 加载插件
BScroll.use(PullDown)
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)
BScroll.use(Pullup)
BScroll.use(ScrollBar)
BScroll.use(Indicators)
BScroll.use(Slide)
BScroll.use(Wheel)
BScroll.use(Zoom)
BScroll.use(NestedScroll)
BScroll.use(InfinityScroll)
BScroll.use(Movable)


/* 
    pulldown 扩展 ： pullDownRefresh: true
    mouseWheel 扩展 BetterScroll 鼠标滚轮的能力 : mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    }
    observe-dom 插件 ： observeDOM: true
    observe-image 插件 ： observeImage: true
    pullup 插件 ： pullUpLoad: true
    scroll-bar 插件 ： scrollY: true,
                      scrollbar: true
    indicators 插件 ：indicators: {
      relationElement: "联动的元素 DOM"
    }
    slide 插件 ： scrollX: true,
                  scrollY: false,
                  slide: {
                    threshold: 100
                  },
                  momentum: false,
                  bounce: false,
                  stopPropagation: true
    wheel 插件 ：  wheel: true
    zoom 插件 ： freeScroll: true,
                scrollX: true,
                scrollY: true,
                zoom: {
                  start: 1,
                  min: 0.5,
                  max: 2
                }
    
*/

class BScrollManager {
  constructor() {
    this._Managers = {

    }
  }

  // 创建一个管理器
  async createManager(id, dom, config = {}) {

    const manager = new BScroll(dom, {
      ...config
    })
    this._Managers[id] = manager
    return manager
  }

  // 获取所有的管理器
  getManagers() {
    return this._Managers
  }

  // 获取一个管理器
  getManager(id) {
    return this._Managers[id]
  }

  // 销毁一个管理器
  destroyManager(id) {
    if (this._Managers[id]) {
      this._Managers[id].destroy()
      delete this._Managers[id]
    }
  }

  // 刷新一个管理器
  refreshManager(id) {
    if (this._Managers[id]) {
      this._Managers[id].refresh()
    }
  }

  // 滚动到最下面
  scrollToBottom(id) {
    console.log("滚动")
    console.log(this._Managers[id].y)
    console.log(this._Managers[id].maxScrollY)
    if (this._Managers[id]) {
      this._Managers[id].scrollTo(0, this._Managers[id].maxScrollY, 1000)
    }
  }
}

const bscrollManager = new BScrollManager()

export default bscrollManager