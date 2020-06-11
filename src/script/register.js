/* 封装ajax */
import ajax from "./ajax.js";

export class register {
    constructor() {
        this.username = document.querySelector('.input-user input');
        this.userspan = document.querySelector('.input-user span');
        this.password = document.querySelector('.input-pwd input');
        this.pwdspan = document.querySelector('.input-pwd span');
        this.email = document.querySelector('.input-email input');
        this.emailspan = document.querySelector('.input-email span');
        this.agree = document.querySelector('.agree input');
        this.submit = document.querySelector('.submit');
        this.form = document.querySelector('form');
        this.userflag = false;
        this.pwdflag = false;
        this.emailflag = false;
        this.btnflag = false;
        this.init();
    }
    init() {
        /* 判断用户名 */
        this.username.onfocus = () => {
            this.username.oninput = () => {
                this.userJudge()
            }
        }
        this.username.onblur = () => {
            if (this.username.value === '') {
                this.userspan.innerHTML = '中英文均可，最长14个英文或7个汉字';
                this.userspan.style.color = '#aaa';

            }
        }

        /* 判断密码 */
        this.password.onfocus = () => {
            this.password.oninput = () => {
                this.pwdJudge()
            }
        }
        this.password.onblur = () => {
            if (this.password.value === '') {
                this.pwdspan.innerHTML = '长度为8~14个字符,至少包含2种字符';
                this.pwdspan.style.color = '#aaa';
            }
        }

        /* 判断邮箱 */
        this.email.onfocus = () => {
            this.email.oninput = () => {
                this.emailJudge()
            }
        }
        this.email.onblur = () => {
            if (this.email.value === '') {
                this.emailspan.innerHTML = '';
                this.emailspan.style.color = '#aaa';
            }
        }
        /* 同意协议 */
        this.agree.onclick = () => {
            console.log(this.agree.checked);
            if (this.agree.checked === true) {
                this.btnflag = true;
            }
        }
        /* 点击注册时 */
        this.submit.onclick = () => {
            if (this.username.value === '') {
                this.userspan.innerHTML = '用户名不能为空';
                this.userspan.style.color = 'red';
            }
            if (this.password.value === '') {
                this.pwdspan.innerHTML = '密码不能为空';
                this.pwdspan.style.color = 'red';
            }
            if (this.email.value === '') {
                this.emailspan.innerHTML = '邮箱不能为空';
                this.emailspan.style.color = 'red';
            }
            if (this.userflag !== true || this.pwdflag !== true || this.emailflag !== true || this.btnflag !== true) {
                return false
            } else {
                /* 把数据存入数据库 */
                new ajax({
                    type: 'post',
                    url: 'http://10.31.162.53/tmall/php/register.php',
                    data: {
                        username1: this.username.value,
                        password: this.password.value,
                        email: this.email.value
                    }
                })
            }

            this.username.value = '';
            this.password.value = '';
            this.email.value = '';
            this.agree.checked = false;

        }

    }
    userJudge() {
        let len = this.username.value.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
        if (len <= 14) {
            new ajax({
                type: 'post',
                url: 'http://10.31.162.53/tmall/php/register.php',
                data: {
                    username: this.username.value
                },
                success: (data) => {
                    if (!data) {
                        this.userspan.innerHTML = '中英文均可，最长14个英文或7个汉字';
                        this.userspan.style.color = '#aaa';
                        this.userflag = true;
                    } else {
                        this.userspan.innerHTML = '该用户已经存在';
                        this.userspan.style.color = 'red';
                    }

                }
            })

        } else {
            this.userspan.innerHTML = '该用户名长度错误';
            this.userspan.style.color = 'red';
        }

    }
    pwdJudge() {
        console.log(this.password.value.length);
        if (this.password.value.length >= 8 && this.password.value.length <= 14) {
            this.password.innerHTML = '长度为8~14个字符,至少包含2种字符';
            this.pwdspan.style.color = '#aaa';
            let regnum1 = /\d+/;
            let regnum2 = /[a-z]+/;
            let regnum3 = /[A-Z]+/;
            let regnum4 = /[\W_]+/;
            let num = 0;
            if (regnum1.test(this.password.value)) {
                num++;
            }
            if (regnum2.test(this.password.value)) {
                num++;
            }
            if (regnum3.test(this.password.value)) {
                num++;
            }
            if (regnum4.test(this.password.value)) {
                num++;
            }
            switch (num) {
                case 1:
                    this.pwdspan.innerHTML = '弱';
                    this.pwdspan.style.color = 'red';
                    break;
                case 2:
                case 3:
                    this.pwdspan.innerHTML = '中';
                    this.pwdspan.style.color = 'orange';
                    this.pwdflag = true;
                    break;
                case 4:
                    this.pwdspan.innerHTML = '强';
                    this.pwdspan.style.color = 'green';
                    this.pwdflag = true;
                    break;
            }
        } else if (this.password.value === '') {
            this.pwdspan.innerHTML = '密码不能为空';
            this.pwdspan.style.color = 'red';

        } else {
            this.pwdspan.innerHTML = '该用户名长度错误';
            this.pwdspan.style.color = 'red';
        }

    }
    emailJudge() {
        if (/^(\w+[\+\-\.]*\w)\@(\w+[\-\.]*\w)\.(\w+[\+\-\.]*\w)$/.test(this.email.value)) {
            this.emailspan.innerHTML = '';
            // this.emailspan.style.color = '#aaa';
            this.emailflag = true;

        } else if (this.email.value === '') {
            this.emailspan.innerHTML = '不能为空';
            this.emailspan.style.color = 'red';

        } else {
            this.emailspan.innerHTML = '该邮箱错误';
            this.emailspan.style.color = 'red';
        }
    }
}
new register();