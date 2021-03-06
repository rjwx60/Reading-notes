## 服务器端的局域网

### 通过防火墙防范外网攻击

#### 防火墙的基本思路
允许特定指向的包通过(无法处理包内容攻击)，屏蔽其他的包(基于路由转发功能的衍生，已由专门软硬件负责)；  
如：包过滤、应用层网关、电路层网关等；  

包过滤：
根据接收包中的接收方IP地址和发送方的 IP地址，来限制允许起点为任意，终点为 Web服务器IP的包通过；允许起点为 Web服务器IP的包通过  
根据接收包中的接收方的端口号，来限制使用的应用程序  
根据接收包中的控制位信息获取访问方向，来限制 Web服务器 对互联网的访问(即根据 SYN 和 ACK 的对应关系得知访问方向，但 UDP包不行，此时需要用包过滤以外的防火墙）  


### 通过多台服务器分担负载(分布式架构)
#### 方式一：使用请求平均分配分担负载
##### 方法1：采用多台服务器，减少每台服务器的访问量

——>  1. DNS轮询  
缺点：不能确认Web服务器是否正常工作  
缺点：无法处理多页面访问的请求(即跨服务器调用资源)  

——>  2. 负载均衡设备  
用负载均衡设备的 IP 代替服务器的实际地址注册到 DNS服务器上，请求包会首先定向到这里  
然后或根据操作是否跨多个页面、或根据 Web服务器的负载状况、或根据事先设置的服务器性能指数分配  


#### 方式二：使用缓存服务器分担负载
##### 方法2：按功能划分服务器，单独处理
——>  a. 正向代理：在客户端一侧部署；  
可实现防护墙、缓存、过滤访问等功能，但须在浏览器中配置，容易发生故障   

——>  b. 反向代理：在服务端一侧部署；  
通过将请求消息中 URI的目录名与服务器关联(DNS服务器解析引导法)，使其能转发一般的不包含完整网址请求消息  

——>  c. 透明代理：
通过查看请求消息中包的头部，根据里面接收方IP转发服务器。需主动拦截，才能让消息到达透明代理，然后判断和转发  


#### 方式三：使用内容分发服务分担负载
CDN：内容分发服务，专门从事相关服务的厂商，负责部署缓存服务器，并租借给Web服务器运营者；有 a & b 两者优点；  

如何查找最新CDN：  
一：使用 DNS服务器 分配访问(通过查询所有路由表信息，估算客户端和缓存服务器的距离)，此法请求次数小，精度较低；  
二：使用 HTTP 报文的 Location 字段，重定向至最近缓存服务器，此法 HTTP消息交互次数多，但精度高；  