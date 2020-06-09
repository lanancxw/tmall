import ajax from "./ajax.js";
import Cookie from "./cookie.js";
/* 渲染数据 */
export class Detail {
    constructor(sid) {
        this.sid = location.search.substring(1).split('=')[1];
        this.info = document.querySelector('#content .detail-render');
        this.pic = document.querySelector('#content .detail-render');
        this.spic = document.querySelector('.pic .spic');      
        this.bpic = document.querySelector('.bpic');
        this.bf = document.querySelector('.pic .bf');
        this.sf = document.querySelector('.spic .sf'); 
        this.slunul = document.querySelector('.slun ul')      
        this.list = document.querySelectorAll('.slun li');
        this.bfang = document.querySelector('.bfang');

        
        this.init();
    }
    init() {
        /* 把sid发送到服务器请求整条数据 */
        new ajax({
            url: 'http://10.31.162.53//tmall/php/getsid.php',
            data: {
                sid: this.sid
            },
            success:(data) => {
                let arrdata = JSON.parse(data);
                /* 渲染图片 */
                this.spic.children[0].src = arrdata.goods_bigpic;
                this.bpic.src = arrdata.goods_bigpic;
                let listpic = arrdata.goods_listpic.split(',');
                let strhtml = ''
                for(let i = 0; i < listpic.length; i++){
                    strhtml += `
                    <li><img src="${listpic[i]}"
                    alt=""></li>
                    `    
                }
                this.slunul.innerHTML = strhtml;
                new Glass();

                /* 渲染文字 */
                let strhtml1 = '';
                strhtml1 += `
                <div class="d-title">${arrdata.goods_name}</div>
                <div class="d-price">
                    <i>价格</i><span class="red">${arrdata.goods_price}</span>
                </div>
                <div class="d-extra">
                    <span class="extra1">运费</span>
                    <span>杭州<i class="iconfont icon-xiala"></i></span>
                    <span>上城区<i class="iconfont icon-xiala"></i></span>
                </div>
                <div class="d-press">
                    <span class="press1">累计评价<i class="red">${arrdata.goods_rate}</i></span>
                    <span class="press2">送天猫积分<i class="green">${arrdata.goods_score}</i>起</span>
                </div> 
                    `;
                this.info.innerHTML = strhtml1;
            }
        })
    }
}
new Detail();

/* 放大镜效果 */
export class Glass extends Detail{
    constructor(){
        super()
        this.x;
        this.y;
        this.bili;
        this.init();
    }
    init(){
        //小放/大放 = 小图/大图
        this.sf.style.width = (this.bf.offsetWidth * this.spic.offsetWidth / this.bpic.offsetWidth)+'px';
        this.sf.style.height = (this.bf.offsetHeight * this.spic.offsetHeight / this.bpic.offsetHeight)+'px';
        this.x = this.spic.offsetLeft;
        this.y = this.spic.offsetTop;
        this.bili = this.bpic.offsetWidth / this.spic.offsetWidth
        this.spic.onmouseenter = ()=>{
            this.sf.style.visibility = 'visible';
            this.bfang.style.visibility = 'visible';
        }
        this.spic.onmouseleave= ()=>{
            this.sf.style.visibility = 'hidden';
            this.bfang.style.visibility = 'hidden';
        }
        document.addEventListener('mousemove',(e) => this.sfmoveHandler(e));
        for(let i = 0; i < this.list.length; i++){
            this.list[i].onclick = ()=>{
                // this.list[i].children[0].src;
                this.spic.children[0].src = this.list[i].children[0].src;
                this.bpic.src = this.list[i].children[0].src;
            }
        }
    }
    sfmoveHandler(e){
        let leftValue = e.pageX - this.sf.offsetWidth/2 - 80;
        let topValue = e.pageY - this.sf.offsetHeight/2 - 30;
        if(leftValue < 0){
            leftValue = 0;
        }else if(leftValue >= this.spic.offsetWidth - this.sf.offsetWidth){
            leftValue = this.spic.offsetWidth - this.sf.offsetWidth;

        }
        if(topValue < 0){
            topValue = 0;
        }else if(topValue >= this.spic.offsetHeight - this.sf.offsetHeight){           
            topValue = parseInt(this.spic.offsetHeight - this.sf.offsetHeight);
        }
        this.sf.style.left = leftValue + 'px';
        this.sf.style.top = topValue + 'px';
        this.bpic.style.left = -this.bili * leftValue + 'px';
        this.bpic.style.top = -this.bili * topValue + 'px';
    }
}

/* 存储cookie */
export class Car extends Detail{
    constructor(sid){
        super(sid);
        this.car = document.querySelector('.detail .d-btn .car');
        this.count = document.querySelector('.detail .d-num .num');
        this.arrsid = [];//存储商品编号
        this.arrnum = [];//存储商品数量
        this.cookie();
       
    }
    cookie(){
        console.log(this.car);
        // 取出cookie,判断是第一次还是多次点击
        if(new Cookie().get('cookiesid') && new Cookie().get('cookienum')){
            this.arrsid = new Cookie().get('cookiesid').split(',');//获取cookie,同时转换成数组
            this.arrnum = new Cookie().get('cookienum').split(',');//获取cookie,同时转换成数组
        }else{
            this.arrsid = [];
            this.arrnum = [];
        }
        //判断是否第一次加入购物车
        this.car.addEventListener('click',()=>{
            if(this.arrsid.indexOf(this.sid) !== -1){//存在，不是第一次               
                let result = parseInt(this.arrnum[this.arrsid.indexOf(this.sid)]) + parseInt(this.count.value);                 
                this.arrnum[this.arrsid.indexOf(this.sid)] = result;
                let a = this.arrnum[this.arrsid.indexOf(this.sid)]
            }else{//第一次添加
                this.arrsid.push(this.sid);
                this.arrnum.push(this.count.value);
                new Cookie().set('cookiesid',this.arrsid,10);
            }
            new Cookie().set('cookienum',this.arrnum,10);
            this.car.href = './car.html';
        });
    }
}
new Car();
