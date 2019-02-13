## 从接入网接入互联网内部

### 接入流程
#### 一、承前启后，客户端生成网络包，经过集线器 和 交换机到达 互联网接入路由器  
互联网接入路由器：按接入网规则发送包  
接入网：指连接互联网与家庭、公司网络的通信线路；一般家用接入网方式包括 ADSL、FTTH 等  

ADSL：不对称数字用户线，上下行的通信速率不对称  
FTTH：基于光纤的接入网技术，关键在于对光纤的使用，传入的光线需入射角小、相位一致，否则会衰减或相互干涉抵消  

单模光纤：对光源和光敏元件性能要求高，信号失真小，传输距离远  
多模光纤：对光源和光敏元件性能要求低，信号失真大，传输距离近  

<!-- ![图1](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-01.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-01.png" alt="图1" width="400px">

<!-- ![图2](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-02.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-02.png" alt="图2" width="400px">


#### 二、互联网接入路由器在网络包前加上 MAC头部、PPPoE头部、PPP头部共3种头部；若为 FTTH方式则有直连和使用分光器的方式
如下图：其中的ONU-光网络单元，用于将电信号转换成光信号，其中的OLT-光线路终端，两者均具备调整信号收发时机来避免碰撞的功能。

<!-- ![图3](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-03.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-03.png" alt="图3" width="400px">


#### 二、互联网接入路由器在网络包前加上 MAC头部、PPPoE头部、PPP头部共3种头部；若为 ADSL方式则发往 ADSLModem

##### 二-1、ADSLModem 将网络包拆分成独立的信元，用于 ATM(异步传输技术)  

##### 二-2、ADSL 采用振幅调制 和 相位调制相结合的 正交振幅调制 QAM来调制信号，并通过合成多个频率的波，提高能表示的比特数，进而提升整体的传输速率;  

##### 二-3、ADSL Modem 将信元转换为电信号，随即进入分离器(滤波器)，跟电话的语音信号汇合、混合传输出去;  

##### 二-4、经由大楼的 IDF-中间配线盘 和 MDF-主配线盘，到达安保器(防雷电)，进入电线杆上架设的电话线缆;    

##### 二-5、线缆最终会到达电话局，经过电话局的配线盘、分离器，到达 DSLAM-数字用户线接入复用设备(即多路ADSL Modem);  

##### 二-6、信元从 DSLAM 发出，到达 BAS(包转发设备)，此时将接收到的 ATM信元 还原成原始的包，并将包前的 MAC头部、PPPoE头部去除，取出 PPP头部 和 后面的数据，配上隧道专用头部(一般为L2TP技术）;  

#### 三、不管是ADSL，还是FTTH，最终都会发送到BAS；  

MAC头部、PPPoE头部作用：将包发送到BAS接口；  
BAS功能：负责将 ATM信元 还原 网络包并转发至互联网内部；  
BAS功能：作为用户认证的窗口，只有用户登录验证通过了之后，才可访问互联网；  

<!-- ![图4](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-04.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-04.png" alt="图4" width="400px">

<!-- ![图6](https://github.com/rjwx60/Reading-notes/blob/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-06.png) -->
<img src="https://github.com/rjwx60/Reading-notes/raw/master/%E3%80%8AHow%20Networks%20Work%E3%80%8B-%20%E6%88%B7%E6%A0%B9%E5%8B%A4/imgs/4-06.png" alt="图6" width="400px">


### PPoE & PPoA
BAS 使用 PPPoE 和 PPPoA 来实现，而 PPPoE 最初由 PPP协议 发展 P217；  
PPP 消息不能单独发送，需借用 HDLC协议 作容器，但 ADSL 和 FTTH 无法使用 HDLC，故诞生PPPoE  

ADSL 使用 PPPoE，用以太包将 PPP 消息封装，随后将以太网包拆分成信元  
ADSL 使用 PPPoA，直接用信元封装 PPP 消息，而不添加 MAC头部 和 PPPoE头部  

### 接入网的用户流程
——>  配置运营商分配的用户名和密码  
——>  接入路由器根据 PPPoE 的发现机制寻找 BAS(同ARP广播，通过此查询 BAS的MAC地址）  
——>  与 BAS 通信，用 加密的CHAP(挑战握手认证协议) 和 不加密的PAP(密码验证协议) 传输密码等信息给 BAS  
——>  BAS 校验密码
——>  BAS 向用户下发 TCP/IP 配置信息(IP地址、DNS服务器IP地址(私有地址)、默认网关IP地址等)  
——>  即可访问互联网  

### 零碎
ADSL、FTTH 等接入网与用户签约的运营商设备相连，这些设备称为POP，NOC 则是规模扩大化后的POP  
互联网内部使用 BGP机制 在运营商之间交换路由信息。
