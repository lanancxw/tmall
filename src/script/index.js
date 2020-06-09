/* 封装ajax */
import ajax from "./ajax.js";
/* 封装懒加载*/
import LazyLoad from "./lazyload.js";
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
    constructor(){
        this.ul = document.querySelector('.j-newHotBrand .newHotBrandbody')
        this.init()
    }
    init() {
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
}
new NewHot();



