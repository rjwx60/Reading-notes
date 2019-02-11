### 减少访问**DOM**的次数，将处理留予**JS**端：
DOM 是跟语言无关的API  
DOM 在浏览器的接口是利用 Js 去实现的  
DOM 是现 Js 编码中重要的部分，因客户端脚本编程大多数时是在跟底层文档交互  


### 浏览器将 **DOM** 和 **Js** 独立实现：
IE：JScript-JS  Trident-DOM和渲染  
Safari：SquirrelFish-JS   WebCore-DOM和渲染  
Firefox：SpiderMonkey-JS  Gecko-DOM和渲染  
Chrome：V8-JS  WebCore-DOM和渲染  

分离让其他语言共享使用 DOM 和引擎里面渲染函数  
分离让访问的消耗增加  



### **DOM**不同操作的性能：
#### **DOM**新建：
节点克隆 cloneNode 优于 innerHTML 和 document.createElement() (3-10倍)  
注意：最终选择应取决于可读性、编码习惯等综合因素  


#### **DOM**获取：
##### 获取**HTML**集合：
HTML 集合以一种 "假定实时态" 实时存在，一直与底层文档对象保持连接、同步更新，每取一次状态都会进行新的查询  
如：document.getElemetsByName、…ByClassName、…ByTagName、…、document.images、….links、….forms、….forms[0].elements  

优化一：将集合存储在局部变量中  
优化二：将集合拷贝到数组中，得到一个与NodeList类似的静态列表 P43  
优化三：使用现代浏览器提供的，只返回元素节点的API，P48  


##### 获取**NodeList**：
NodeList 包含匹配节点的类数组对象，非 HTML 集合，故返回的节点不会对应实时的文档结构，是一个静态列表  
如： querySelector()、querySelectorAll()


### 重绘和重排：
具体重绘和重排机制请搜索
重排：浏览器重新计算元素的几何属性，别的元素的几何属性和位置也因此受到影响，浏览器会使渲染树中受到影响的部分失效，并重新构造渲染上述  
重绘：重排后，浏览器会重新绘制受影响 部分到屏幕中  

#### 重排发生：

增删可见 DOM 元素  
元素位置或尺寸改变  
元素内容改变，如文本或图片  
页面渲染器初始化  
浏览器窗口尺寸改变  

#### 重排抑制：

合并多次对 **DOM** 和样式的修改，然后一次性处理  
批量修改样式：通过修改 **cssClass** 来修改  
缓存布局信息**+**让运动元素运动期间脱离文档流  
批量修改 **DOM**：将元素带离文本流 -> 对其应用多重改变 -> 将其带回文档中  

##### 脱离文本流方式：

—隐藏元素，应用修改，重新显示  
—使用文档片断 document fragment ，在当前 DOM 之外构建子树，再将其拷贝回文档  
—将元素拷贝到一个脱离文档的节点中，修改，然后替换原元素  


### 事件委托