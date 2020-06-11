/* 封装ajax */
import ajax from "./ajax.js";
/* 封装懒加载 */
import LazyLoad from "./lazyload.js";

/* 分页 */
new CustomPagination('#page', {
    next_prev_links: 'yes',//是否开启[上一页/下一页]
    inupt_forward: 'yes',//是否开启[输入跳转]
    total: 5,//总页数（必需）
    count: 3,//显示的页码个数，多余页码会用...代替
    changePage: function (pageNum) { //切换页码成功回调
        console.log('当前页码：' + pageNum); //当前页码
        let wonderful = document.querySelector('.j-wonderful .wonderfulbody');
        let footer = document.querySelector('.tmall-copyright');
        let header = document.querySelector('.header');
        new ajax({
            url: 'include/header.html',
            success:(data) => {
                header.innerHTML = data
            }
        })
        new ajax({
            url: 'include/footer.html',
            success:(data) => {
                footer.innerHTML = data
            }
        })
        new ajax({
            url: "http://10.31.162.53/tmall/php/list.php",
            data: {
                page: pageNum
            },
            success: function (data) {
                // console.log(JSON.parse(data));
                let arrdata = JSON.parse(data);
                let strhtml = '';
                for (let value of arrdata) {
                    strhtml += `
                    <li>
                        <a href="./detail.html?sid=${value.goods_id}">
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
                wonderful.innerHTML = strhtml;
                var imgs = document.querySelectorAll('.wonderfulbody img');
                new LazyLoad(imgs);
                new Sort();
                // new LazyLoad(imgs);
            }
        });
    }
});

/* 排序 */
export default class Sort {
    constructor() {
        this.btnDefault = document.querySelector('.default');
        this.btnCeil = document.querySelector('.ceil');
        this.btnFloor = document.querySelector('.floor');
        this.ul = document.querySelector('.wonderfulbody');
        this.li = document.querySelectorAll('.wonderfulbody li');
        this.imgs = document.querySelectorAll('.wonderfulbody img');
        this.array_default = [];//排序前的li数组
        this.array = [];//排序中的数组
        this.prev = null;
        this.next = null;
        this.init();
    }
    init() {
        for (let i = 0; i < this.li.length; i++) {
            this.array_default.push(this.li[i]);
        }
        this.btnDefault.onclick = () => {
            for (let i = 0; i < this.array_default.length; i++) {
                this.ul.appendChild(this.array_default[i]);
            }
        }
        this.btnCeil.addEventListener('click', () => this.btnceilHandler());
        this.btnFloor.addEventListener('click', () => this.btnfloorHandler());
    }
    btnceilHandler() {  
        for (let i = 0; i < this.array.length - 1; i++) {
            for (let j = 0; j < this.array.length - i - 1; j++) {
                this.prev = parseFloat(this.array[j].children[0].children[1].children[1].textContent);
                this.next = parseFloat(this.array[j + 1].children[0].children[1].children[1].textContent);
                if (this.prev > this.next) {
                    let temp = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = temp;     
                              
                }
            }
        }
        for (let i = 0; i < this.array.length; i++) {
            this.ul.appendChild(this.array[i]);
        }
        
        document.documentElement.scrollTop = 1;
    }
    btnfloorHandler() {
        for (let i = 0; i < this.array.length - 1; i++) {
            for (let j = 0; j < this.array.length - i - 1; j++) {
                this.prev = parseFloat(this.array[j].children[0].children[1].children[1].textContent);
                this.next = parseFloat(this.array[j + 1].children[0].children[1].children[1].textContent);
                if (this.prev < this.next) {
                    let temp = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = temp;
                }
            }
        }
        for (let i = 0; i < this.array.length; i++) {
            this.ul.appendChild(this.array[i]);
        }
        document.documentElement.scrollTop = 2
    }
}
/* 点击跳转 */
