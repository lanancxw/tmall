/* 封装ajax */
import ajax from "./ajax.js";
/* 封装懒加载*/
import LazyLoad from "./lazyload.js";
import Cookie from "./cookie.js";
/* 天猫国际 */
export class IndexTmallInt {
    constructor() {
        this.tmallInt = document.querySelector('.j-newFloor .middle-con')
        this.tmallInt1 = document.querySelector('.j-newFloor .middle-con1')
        this.init()
    }
    init() {
        let _this = this;
        new ajax({
            url: "http://10.31.162.53/tmall/php/goods.php",
            success: function (data) {
                let arrdata = JSON.parse(data);
                // console.log(arrdata);
                let strhtml = '';
                for (let value of arrdata) {
                    // console.log(value);
                    strhtml += `
                    <li>
                        <a href="#">
                            <img class="item-img"
                                src="${value.goods_smallpic}" alt="">
                            <div class="item-title">${value.goods_name}</div>
                            <div class="item-price">${value.goods_price}</div>                            
                        </a>
                    </li>
                        `;
                }
                _this.tmallInt.innerHTML += strhtml;
                _this.tmallInt1.innerHTML += strhtml;
            }
        });
    }
}
/* 猜你喜欢 */
export class IndexWonderful {
    constructor() {
        this.wonderful = document.querySelector('.j-wonderful .wonderfulbody')
        this.init()
    }
    init() {
        let _this = this;
        new ajax({
            url: "http://10.31.162.53/tmall/php/goods.php",
            success: function (data) {
                // console.log(JSON.parse(data));
                let arrdata = JSON.parse(data);
                let strhtml = '';
                for (let value of arrdata) {
                    strhtml += `
                    <li >
                        <a href="#">
                            <span class="item-pic">
                                <img data-src="${value.goods_smallpic}" alt="">
                            </span>
                            <span class="item-info">
                                <span class="item-desc">
                                    <em class="item-name">${value.goods_name}</em>
                                </span>
                                <span class="item-price">
                                    ${value.goods_price}
                                </span>
                            </span>
                        </a>
                    </li> 
                        `;
                }
                _this.wonderful.innerHTML += strhtml;
                /* 懒加载 */
                var imgs = document.querySelectorAll('.wonderfulbody img');
                new LazyLoad(imgs);

            }
        })
    }
}
/* 创建内容区小图标 */
export class NewHot {
    constructor() {
        this.footer = document.querySelector('#mallPage .tmall-copyright')
        this.top = document.querySelector('#mallPage .top');
        this.lift = document.querySelector('#mallPage .j-lift');
        this.ul = document.querySelector('.j-newHotBrand .newHotBrandbody')
        this.li = document.querySelectorAll('.j-lift li');
        this.nav = document.querySelectorAll('.j-lift .nav');
        this.louceng0 = document.querySelector('.j-newFloor .floor-img img');
        this.louceng1 = document.querySelector('.j-newFloor1 .floor-img img');
        this.louceng2 = document.querySelector('.j-wonderful');
        this.name = document.querySelector('#mallPage #site-nav .login-info .sn-login');
        this.usersid;
        this.init()
    }
    init() {
        console.log(this.name);
        let cookie = new Cookie();
        console.log(cookie.get('sid'));
        if(cookie.get("sid")){
            console.log(cookie.get('sid'));
            this.usersid = cookie.get("sid")
            new ajax({
                url: "http://10.31.162.53/tmall/php/getsid.php",
                data:{
                    loginsid:this.usersid
                },
                success: (data)=> {
                   let arrdata = JSON.parse(data);
                   console.log(arrdata);
                    this.name.innerHTML = '欢迎' + arrdata.username;
                    this.name.href = '';
                    this.name.nextElementSibling.innerHTML = '退出';
                    this.name.nextElementSibling.onclick = ()=>{
                        cookie.unset('sid','',-1);
                        this.name.nextElementSibling.href = "http://10.31.162.53/tmall/src/login.html";
                    }
                }
            })
        }
        document.onscroll = () => {
            let scrollT = document.documentElement.scrollTop;
            this.scroll();
            /* 侧边楼梯 */
            if (scrollT > 700) {
                this.lift.style.opacity = 1;
            } else {
                this.lift.style.opacity = 0;
            }
        }        
        for(let i = 0;i<this.li.length;i++){
            this.lift.children[1].children[i].onclick = ()=>{
                this.liclick(i)
            }
        }
        let strhtml = '';
        for (let i = 1; i <= 30; i++) {
            strhtml += `
            <li class="brand-item clearfix">
                <div class="brand-img">
                    <img src="//img.alicdn.com/i2/2/TB1D0sLnHSYBuNjSspiXXXNzpXa?abtest=&pos=1&abbucket=&acm=09042.1003.1.1200415&scm=1007.13029.131809.100200300000000_100x150q100.jpg_.webp"
                        alt="">
                </div>
                <div class="brand-mask">
                    <div class="coupon">优惠价 ￥150</div>
                    <div class="enter"><span> 点击进入</span></div>
                </div>
            </li>
            `;
        }
        this.ul.innerHTML += strhtml;
    }
    liclick(i) {
        document.onscroll = null;
        for (let j = 0; j < this.li.length; j++) {
            this.li[j].style.backgroundColor = '#666';
        }
        document.documentElement.scrollTop = this['louceng' + i].offsetTop - 100;
        this.li[i].style.backgroundColor = '#427def';
        setTimeout(()=>{
            document.onscroll = () => {
                let scrollT = document.documentElement.scrollTop;
                this.scroll();
                /* 侧边楼梯 */
                if (scrollT > 700) {
                    this.lift.style.opacity = 1;
                } else {
                    this.lift.style.opacity = 0;
                }
            }
        },50)
    }
    scroll() {
        let scrollT = document.documentElement.scrollTop;
        /* 顶部悬浮 */
        if (scrollT > 700) {
            this.top.style.display = 'block';
            console.log(scrollT, this.louceng0.offsetTop, this.louceng1.offsetTop, this.louceng2.offsetTop)
            if (this.louceng0.offsetTop - 100 < scrollT) {
                this.li[0].style.backgroundColor = '#427def';
                // if()
            } else {
                this.li[0].style.backgroundColor = '#666';
            }
            if (this.louceng1.offsetTop - 100 < scrollT) {
                this.li[0].style.backgroundColor = '#666';
                this.li[1].style.backgroundColor = '#427def';
            } else {
                this.li[1].style.backgroundColor = '#666';
            }
            if (this.louceng2.offsetTop - 100 < scrollT) {
                this.li[1].style.backgroundColor = '#666';
                this.li[2].style.backgroundColor = '#427def';
            } else {
                this.li[2].style.backgroundColor = '#666';
            }
        } else {
            this.top.style.display = 'none';
        }

    }
}
new NewHot();




