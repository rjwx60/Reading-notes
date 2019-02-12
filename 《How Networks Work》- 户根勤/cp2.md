

## 协议栈通过TCP协议收发数据的操作
1.创建套接字  
2.客户端套接字与服务器套接字相连  
3.收发数据，协议栈会与网卡配合，将数据切成小块并封装成网络包，再将网络包转换成电信号或光信号发送  
4.断开连接并删除套接字，断开操作的本质是当消息收发完成后客户端和服务器相互确认的过程  
<!-- ![图1](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-01.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-01.png" alt="图1" width="400px">



### 一、套接字创建
调用 socket 创建套接字  
一步：利用内存管理模块分配一个套接字所需的内存空间  
二步：写入初始状态的控制信息  
三步：将这个套接字的描述符告知应用程序  

注意：套接字刚创建完成时，并无任何有用数据，浏览器可根据网址查询 IP，但这也只是浏览器等程序知道，在创建套接字时此类信息并无传递给协议栈  
<!-- ![图3](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-03.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-03.png" alt="图3" width="400px">



#### 套接字
协议栈内部有一块用于存放控制信息的内存空间，记录用于控制数据收发操作的控制信息  
如：通信对象的IP地址、端口号、通信操作的进行状态等  

套接字：存放控制信息的内存空间  
套接字记录了用于控制通信操作的各种控制信息，协议栈在执行操作的时需要参阅这些控制信息  

终端输入 netstat 显示套接字内容，每一行相当于一个套接字  
<!-- ![图2](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-02.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-02.png" alt="图2" width="400px">




### 二、连接服务器
连接实际上是通信双方交换控制信息，在套接字中记录这些必要信息并准备数据收发的一连串操作  

1.需要将自身拥有的服务器 IP 地址和端口号等信息告知协议栈  
2.需要开辟用于存放临时收发数据的内存空间  
3.传达开始通信的请求  

#### 控制信息有两类
一类：客户端 和 服务器相互联络时交换的控制信息，这种在连接、收发、断开都需要用到  
二类：保存在套接字中的用来控制协议栈操作的信息  

控制信息位于网络包的头部，以太网、IP协议也有自己的控制信息  
<!-- ![图4](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-04.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-04.png" alt="图4" width="400px">



#### 连接操作的实际过程
首先，客户端创建头部，包含表示开始数据收发操作的控制信息；  
然后，将头部中的控制位的 SYN 比特设置为 1，表示"连接"；  
接着，TCP 模块将信息，传递给 IP 模块，并委托它进行发送；  

然后，服务器收到后，从等待连接状态变为正在连接状态：  
在 TCP 头部中设置发送方和接收方的端口号，设置 SYN 为 1，表示"连接"，并将 ACK 设为 1，表示已收到相应网络包；  

然后，客户端收到后，也需要将 ACK 设置为 1，返回给服务器；  
最后，服务器收到后，连接操作才算全部完成，套接字进入随时可收发数据的状态。  



### 三、协议栈接收数据的具体操作过程
<!-- ![图8](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-08.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-08.png" alt="图8" width="400px">


#### TCP协议收发数据的操作小结：P93 - 95  
<!-- ![图9](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-09.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-09.png" alt="图9" width="400px">


#### 数据发送过程实际是网卡将数字信号转换成电或光信号
1.网卡驱动从 IP 模块获取包，放入网卡缓存，向 MAC 模块发送发送包的指令  
2.MAC 模块工作，从缓冲区中取出包，在头部加上报头 和 起始帧分界符，在末尾加上 FCS（帧校验序列）  
3.报头作用：确定包的读取时机，测量时钟信号的特殊信号  
4.为了区分每个比特的间隔，除了发送数据信号，还发送时钟信号  
5.为了因传输产生的时间差而导致的偏移，采用将数据信号 和 时钟信号叠加的方法  
6.FCS作用: 用以检查包传输过程中因噪声导致的波形紊乱的问题，类似于磁盘的 CRC 错误校验码  



### 四、断开连接，将控制位中的 FIN 比特设为 1



## 包、TCP、IP、MAC简介
### 包零碎
<!-- ![图10](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-010.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-10.png" alt="图10" width="400px">


#### 接收网络包的操作过程 P99-102 P123
—>接收信号  
—>PHY(MAU) 模块将信号转换成通用格式并发送给 MAC 模块  

—>MAC 模块通过报头的波形同步时钟，遇到起始帧分界符时将后面的信号转换成为数字信息，存放到缓冲区中，到信号末尾时候，检查 FCS  
若利用包头到结尾的所有比特计算出的 FCS 跟末尾的 FCS 不一致，则弃包  
若无问题，检查 MAC 地址是否与本机一致，一致的话，通知计算机  

—>通知计算机的操作使用中断的机制。
首先，网卡向扩展总线中的中断信号线发送信号，该线通过计算机中的中断控制器连接到 CPU  
然后，CPU 暂时挂起正在处理的任务，切换到操作系统的中断处理程序，程序调用网卡驱动，控制网卡执行接收操作  

—>网卡从缓冲区中取出包，交给 TCP/IP 协议  
—>IP 模块首先检查 IP 头部，若格式没问题，就查看接收方的 IP 地址：  
若有问题，就通过 ICMP 消息将错误告知发送方  
若无问题，就接收这个包，接收后，IP 模块将包暂存，等待 IP 头部中具有相同 ID 的包全部到达  
然后根据，IP 头部中、表示当前分片在整个包中所处位置的分片偏移量字段，来将分片还原成原始包，此步亦称分片重组  
重组完成后，交给 TCP 模块  

—>TCP 模块根据：IP 头部中的接收方 IP 地址，IP 头部中的发送方 IP 地址，以及 TCP 头部中的接收方和发送方端口号，来查找对应的套接字  
然后根据套接字中的通信状态来执行相应的操作：  
若是应用程序数据，返回确认接收包，放入缓存，等待读取  
若是建立或断开连接的控制包，返回相应的控制包，告知应用程序建立和断开连接的操作状态  





### TCP头部零碎
#### TCP头部中的字段 MTU 和 MSS
应用程序交给协议栈发送的数据长度是由应用程序本身决定的，不同的应用程序交予的数据的长度不尽相同，所以要对发送的数据做一个限制  

MTU 是每个网络包能容纳的数据长度  
MSS 除去头部后，一个网络包所能容纳的 TCP 数据的最大长度  
<!-- ![图5](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-05.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-05.png" alt="图5" width="400px">



#### TCP头部中的字段 ACK号 和 序号
通过 TCP 头部中的 序号 和 ACK号 可以确认接收方是否收到了网络包  
<!-- ![图6](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-06.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-06.png" alt="图6" width="400px">


TCP 根据网络包平均往返时间动态调整 ACK号 等待时间，并采用滑动窗口方式  
<!-- ![图7](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-07.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-07.png" alt="图7" width="400px">


ACK号 发送时机：接收方收到数据时，若确认内容无问题，则返回 ACK号 告知  
更新窗口大小时机：接收方从缓冲区中取出数据，传递给应用程序的时候  


#### TCP和UDP的差别
TCP 需要接收确认、有窗口机制、需要交换控制信息、需要建立和断开连接  
UDP 以上均不需，只需在数据前加上头部，然后交给 IP 模块即可  

TCP 多用于应用程序收发数据等操作，如：浏览器数据收发、邮件  
UDP 多用于收发较短控制数据等操作如查询，如：DNS查询、交换控制信息  
UDP 多用于音视频数据等重发无意义、有时间要求的操作，如查询，如：DNS查询、交换控制信息  



### IP、MAC头部零碎

#### IP头部
IP 地址长度为32比特  
IP 头部包含通信对象的 IP 地址(由 TCP 模块告知，而 TCP 在执行连接操作时从应用程序获得)  

IP 模块负责添加 IP 头部和 MAC 头部  
IP头部 包含 IP 协议规定的、根据 IP 地址将包发往目的地所需的控制信息  
MAC头部 包含通过以太网的局域网，将包传输至最近的路由器所需的控制信息  

#### MAC头部
MAC 地址长度为48比特，在网卡生产时写入  
MAC 头部包含接收方和发送方的 MAC 地址等信息  

在发往给对方时，需要知道对方的MAC地址，但包还未发送，所以就需要像通过域名查询IP那样，这里通过IP查询MAC地址  

##### 利用ARP查询MAC地址
ARP 通过广播，将包发给连接在同一以太网中的所有设备  

网卡的 MAC 模块生成通用信号后，需通过 PHY(MAU) 模块转换成可在不同网线中传输的信号格式，经由网线发送，接收同理  
故可认为 PHY(MAU) 模块作用是将 MAC 模块产生的信号进行格式转换  












## 零碎知识点：
IP 中 ICMP 协议用于告知网络包传送过程中产生的错误和各种控制信息  
IP 中 ARP 协议用于根据IP地址查询相应的以太网MAC地址  

网卡负责完成实际的收发操作  
网卡驱动程序负责控制网卡硬件  

过去的以太网，在网络中任一一台设备发送的信号所有设备均可接收到，只是同接收者匹配的就接收，否则丢弃  
现在的以太网，信号只会根据MAC地址流到指定的设备  

以太网 3 性质：
将包发送到MAC头部的接收方MAC地址代表的目的地  
用发送方MAC地址识别发送方  
用以太类型识别包的内容  

路由器：按照IP规则传输包，根据目标地址判断下一个路由器的位置，路由器中有用于IP协议的表  
集线器：按照以太网规则传输包，在子网中将网络包传输到下一个路由，集线器中有用于以太网协议的表  
只有在经过路由器时，MAC头部才会更新，集线器的职能更多体现在转发上  
<!-- ![图11](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-11.png)   -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/2-11.png" alt="图11" width="400px">


