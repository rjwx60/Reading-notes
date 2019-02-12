## 减少Js脚本下载对性能的影响

### 一、将脚本置底：
脚本会阻塞页面的其他资源的下载，因脚本执行过程中，可能会修改页面内容，故：  
遇到内嵌脚本时，浏览器会阻塞别的文件的下载、渲染、用户交互，先执行脚本，再继续解析和渲染页面  
遇到外链脚本时，浏览器会阻塞别的文件的下载、渲染、用户交互，先下载脚本，然后解析并执行，再继续解析和渲染页面  

以前，串行下载，单个脚本下载、解析、执行完成后，才开始其他资源的下载（包括下一个脚本）  
现在，并行下载，所有脚本下载、解析、执行完成后，才开始其他资源的下载  

浏览器在遇到`<body>`标签前，不会渲染页面的任何部分:  
将脚本置于底部，是JS优化首要规则  
将脚本置于底部，页面的大部分内容已经下载完成并显示给了用户，故页面下载不会显得太慢  


### 二、将脚本合并，并使用CDN：
减少页面包含脚本数  
多个脚本通过一个脚本地址获取  
如：`<script type="text/javascript" src="…..1.js&…..2.js"></script>`    


### 三、无阻塞下载JS：

#### 延迟脚本Defer属性：
不阻塞其他进程，可随意放置;  
随页面解析而下载;  
下载但不执行，直到DOM加载完成才执行 (即 onload 事件被触发前);  
缺点: 有兼容性问题 (实际上大部分浏览器都已支持)    

#### 动态脚本：
通过一小段脚本，动态创建 `script` 标签，以下载新脚本;  
随标签被添加到页面而下载;  
下载和执行均不阻塞其他进程;  
缺点: 返回的代码会立即执行，若不经处理会有顺序调用问题    

跨浏览器工作:  
<!-- ![图1](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/1-01.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/1-01.png" alt="图1" width="400px">

经loadScript处理后的顺序下载和执行:  
<!-- ![图2](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/02.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/1-02.png" alt="图2" width="400px">



#### 利用XHR获取脚本并注入页面：
通过一小段脚本，动态创建 XHR 对象，以下载新脚本;  
随页面解析执行下载;  
下载但不执行，不阻塞其他进程;  
最后通过创建动态script元素将代码注入页面中   
缺点: 限制同域文件下载    


#### 综合推荐：
先添加，动态加载脚本所需代码;  
后添加，加载初始化页面所需的剩下代码;  
<!-- ![图3](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/03.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8A%E9%AB%98%E6%80%A7%E8%83%BD%20JavaScript%E3%80%8B%20-%20Nicbolas.C.Zakas/imgs/1-03.png" alt="图2" width="400px">



### 四、无阻塞加载库：
YUI3、LazyLoad、LABjs