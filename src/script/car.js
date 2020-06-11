import ajax from "./ajax.js";
import Cookie from "./cookie.js";
export default class Car {
    constructor() {
        this.tr = document.querySelector('.content .con-title1');
        this.tbody = document.querySelector('tbody');
        this.header = document.querySelector('.header');
        this.footer = document.querySelector('.tmall-copyright');


        this.arrsid = [];
        this.arrnum = [];
        this.sid;
        this.num;
        this.trClone;
        this.init();
    }
    init() {
        if (new Cookie().get('cookiesid') && new Cookie().get('cookienum')) {
            this.arrsid = new Cookie().get('cookiesid').split(',');//获取cookie,同时转换成数组
            this.arrnum = new Cookie().get('cookienum').split(',');//获取cookie,同时转换成数组
            for (let i = 0; i < this.arrsid.length; i++) {
                this.ajax(this.arrsid[i], this.arrnum[i])
            }

        }
        /* 加减 */

        /* 公共首尾复用 */
        this.include();
    }
    ajax(sid, num) {
        new ajax({
            url: 'http://10.31.162.53//tmall/php/goods.php',
            success: (data) => {
                let arrdata = JSON.parse(data);
                for (let value of arrdata) {
                    if (sid === value.goods_id) {
                        this.trClone = this.tr.cloneNode(true);
                        this.trClone.index = value.goods_id
                        this.trClone.querySelector('.line2 .food').src = value.goods_smallpic;
                        this.trClone.querySelector('.line2 .info').innerHTML = value.goods_name;
                        this.trClone.querySelector('.line3 .del').innerHTML = value.goods_price;
                        this.trClone.querySelector('.line4 .num-box').value = num;
                        this.trClone.querySelector('.line5').innerHTML = (value.goods_price * num).toFixed(2);
                        /* 之前设置弹性盒要恢复 */
                        this.trClone.style.display = 'flex';

                    }
                }
                this.tbody.appendChild(this.trClone);
                this.carHandler();
            }
        })
    }
    carHandler() {
        let tbody = document.querySelector('tbody');
        let tr1 = document.querySelectorAll('.con-title1');
        let add = document.querySelectorAll('.con-title1 .line4 .add');
        let cut = document.querySelectorAll('.con-title1 .line4 .cut');
        let count = document.querySelectorAll('.con-title1 .line4 .num-box');
        let price = document.querySelectorAll('.con-title1 .line3 .del');
        let sum = document.querySelectorAll('.con-title1 .line5');
        let cardel = document.querySelectorAll('.con-title1 .line6 .cardel');
        let checkbox = document.querySelectorAll('tr .line1 input');

        let footer = document.querySelector('.footer li input');
        let tolDel = document.querySelector('.footer li .delete');

        let footNum = document.querySelector('.footer-r .amount-sum .org')//尾部数量
        let footPrice = document.querySelector('.footer-r .price-sum .org')//尾部价格
        let btn = document.querySelector('.footer-r button');

        let sid;
        let numSum;//尾部总数
        let priceSum;//尾部总价格
        let trueLen = 0;

        let arrsid
        let arrnum

        /* 获取cookie */

        if (new Cookie().get('cookiesid') && new Cookie().get('cookienum')) {
            arrsid = new Cookie().get('cookiesid').split(',');
            arrnum = new Cookie().get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
        /* 加减 */
        for (let i = 1; i < tr1.length; i++) {
            add[i].onclick = () => {
                sid = tr1[i].index;
                console.log(i);
                console.log(sid);
                count[i].value++;//数据加加
                let anum = (Number(count[i].value) * Number(price[i].innerHTML))
                console.log(anum);
                sum[i].innerHTML = anum.toFixed(2);

                console.log(sum[i].innerHTML);
                arrnum[arrsid.indexOf(sid)] = count[i].value;//重新赋值
                new Cookie().set('cookienum', arrnum, 10);//存cookie
            }

            cut[i].onclick = () => {
                count[i].value--;
                if (count[i].value <= 1) {
                    count[i].value = 1;

                }
                sum[i].innerHTML = (count[i].value * price[i].innerHTML).toFixed(2);
                arrnum[arrsid.indexOf(sid)] = count[i].value;
                new Cookie().set('cookienum', arrnum, 10);
            }

        }


        // console.log(cardel);
        /* 全选 */
        checkbox[0].onclick = () => {
            for (let i = 1; i < checkbox.length; i++) {

                checkbox[i].checked = checkbox[0].checked;
                footer.checked = checkbox[0].checked;
            }
        }
        footer.onclick = () => {
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = footer.checked;
            }
            fn()
        }
        for (let i = 2; i < checkbox.length; i++) {
            checkbox[i].onclick = () => {
                ;
                if (checkbox[i].checked === true) {
                    trueLen++;
                } else {
                    trueLen--;
                }
                console.log(trueLen);
                if (trueLen === checkbox.length - 2) {
                    checkbox[0].checked = checkbox[i].checked
                    footer.checked = checkbox[i].checked
                } else {
                    checkbox[0].checked = false
                    footer.checked = false
                }
            }
        }

        if (new Cookie().get('cookiesid') && new Cookie().get('cookienum')) {
            arrsid = new Cookie().get('cookiesid').split(',');
            arrnum = new Cookie().get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
        for (let i = 1; i < cardel.length; i++) {
            cardel[i].onclick = () => {
                if (confirm('你确定删除这条商品吗')) {
                    sid = tr1[i].index;
                    tr1[i].remove();
                    console.log(arrsid,arrnum);
                    let index = arrsid.indexOf(sid)
                    arrsid.splice(index, 1);
                    arrnum.splice(index, 1);
                    new Cookie().set('cookiesid', arrsid, 10);//存cookie
                    new Cookie().set('cookienum', arrnum, 10);//存cookie
                }
            }
        }

        function fn() {
            if (footer.checked === true) {
                numSum = 0;
                priceSum = 0;
                for (let i = 1; i < tr1.length; i++) {
                    let value = parseInt(count[i].value);
                    numSum += value;
                    let price = Number(sum[i].innerHTML);
                    priceSum += price;
                }
                footNum.innerHTML = numSum;
                // console.log(typeof priceSum)
                footPrice.innerHTML = priceSum.toFixed(2);
                btn.style.background = '#ff4400';

                tolDel.onclick = () => {
                    if (confirm('你确定删除全部吗？')) {
                        for(let i = 1; i < tr1.length; i++){
                            tr1[i].remove()
                        }
                        new Cookie().unset('cookiesid', '', -1);
                        new Cookie().unset('cookienum', '', -1);
                        this.checkbox[0].checked = false;
                        this.footer.checked = false;
                    }
                }
            } else {
                footNum.innerHTML = 0;
                footPrice.innerHTML = 0.00;
                btn.style.background = '#B0B0B0'
            }
        }





    }
    include() {
        new ajax({
            url: 'include/header.html',
            success: (data) => {
                this.header.innerHTML = data
            }
        })
        new ajax({
            url: 'include/footer.html',
            success: (data) => {
                this.footer.innerHTML = data
            }
        })
    }
}
new Car();