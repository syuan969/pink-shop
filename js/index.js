window.addEventListener('load', function() {
    //动画函数
    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';

        }, 15);
    }
    //动画函数



    //1.获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //2.鼠标经过显示隐藏按钮

    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            //9.定时器自动播放
            timer = setInterval(function() {
                arrow_r.click();
            }, 2000);
        })
        // 3.动态生成小圆圈
    var ul = focus.querySelector('ul');
    // console.log(ul.children.length);
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        //创建小li
        var li = document.createElement('li');
        //记录当前小圆圈索引号
        li.setAttribute('index', i);
        //添加li
        ol.appendChild(li);
        //4。小圆圈排他思想
        li.addEventListener('click', function() {
            // li.className = '';
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //5.点击圆圈移动图片
            //ul移动距离等于小圆圈索引号乘以图片宽度

            // console.log(focusWidth);
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            // console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    //ol第一个设置背景色
    ol.children[0].className = 'current';
    //6.克隆第一张图片放到最后
    var first = ul.children[0].cloneNode(true); //true为深克隆，false为浅克隆
    //7.右侧按钮移动图片
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    //节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                //8.点击右侧按钮，小圆圈跟着动
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 清除所有圆圈背景色
                circleChange();
            }

        })
        //左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //8.点击右侧按钮，小圆圈跟着动
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length-1;
            // }
            circle = circle < 0 ? circle = ol.children.length - 1 : circle;
            // 清除所有圆圈背景色
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //9.定时器自动播放
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
})