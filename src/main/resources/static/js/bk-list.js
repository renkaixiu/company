/*页面对象*/
var listView = {
    init: function(){
        da.init();
        this.onFun();
        //初始化页面交互
        $.each(this.inits,function (i,n) {
            typeof n === 'function' && n();
        });
    },
    inits:{
        /**
         * 初始化分页
         */
        pag:null,
        initPage:function () {
            var base = listView.inits;
            var total = $('#total').val();
            base.pag = da.comp.pagination($('.pagination:first'));
            base.pag.drawPage({
                cur:1,  //当前页
                total:total,  //总页数
                pageCount:10 //每页条数
            });
            base.pag.event.change = function (index) {
                toSearch(index,2);
            };
        }
    },
    /*页面绑定事件*/
    onFun: function(){

        /*确认删除*/
  /*      $('.delete-pop .confirm').on('click',function () {
            comView.hidePop('.delete-pop');

            /!*弹出删除错误tip*!/
            listView.showTip();
        });*/

        /*resize 动态设置样式*/
       /* $(window).on('resize',function(){
            var winW = $(window).width() < 1024 ? 1024 : $(window).width(),
                winH = $(window).height(),
                headH = $(".head").height(),
                left_tit = $(".left_tit").height();
            $(".left").css("height",winH-headH-left_tit-20);
            $(".right").css("height",winH-headH-left_tit-40);
        }).trigger('resize');*/

    },
    showTip:function () {
        $('.tip-pop').fadeIn(300).delay(1000).fadeOut(300);
    }

};
listView.init();