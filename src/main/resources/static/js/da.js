/**
 * @description		依赖jquery 针对pc端
 * @author 			zwr
 * @date:			2017-11-6
 * @modify:
 * @version 		1.0.0
 */
var da = {
    //版本号
    version:'1.0.0',
	/*
	 * 公共配置选项
	 */
    cons:{},//常量
    conf:{
        tip:{
            t00:'系统繁忙，请稍后再试',
            t01:'ajax请求路径为空',
            t02:'请求错误，请稍后再试',
            t03:'网络繁忙，请稍后再试',
            t04:'您处于未联网状态<br/>请联网后重试',
        },
        userTip:{
            u00:'',
            u01:'请选择学校',
            u02:'请输入姓名',
            u03:'请输入学号',
            u04:'请输入手机号',
            u05:'请输入正确的手机号',
            u06:'注册成功！<br/>跳转至购物车页面',
            u07:'您还未登录，请先登录',
            u08:'请选择您要购买的商品~',
            u09:'登录成功！<br/>跳转至购物车页面',
            u10:'请选择您要购买的商品~',
            u11:'请从正常流程跳转',
            u12:'请选择您的支付方式',
            u13:'登录超时，请重新登录',
            u14:'未查询到数据',
            u15:'您还没有做错的试题，快去做题吧~',
            u16:'您还没有听课记录，快去听课吧~',
            u17:'您还没有实训记录，快去实训吧~',
            u18:'您还没有练习记录，快去练习吧~',
            u19:'您还没有收藏试题，快去做题吧~',
            u20:'现在还没有模拟考试，先去做些别的吧~',
            u21:'您还没有可以听的课程，先去做些别的吧~',
            u22:'现在还没有章节练习，先去做些别的吧~',
            u23:'现在还没有作业，先去做些别的吧~',
            u24:'您还没有财务实训记录，快去财务实训吧~',
            u25:'您还没有作业记录，快去做作业吧~',
            u26:'您还没有做题记录，快去做题吧~',
            u27:'现在还没有模块练习，先去做些别的吧~',
            u28:'现在还没有阶段测试，先去做些别的吧~',
            u29:'当前没有课程'
        },
        localName:'data_dongao',
        sessionName:'data_dongao',
        ajaxUrl:'',
        ajaxDefParam:{},
        ajaxSucPro:{
            code0:function (data,opt,textStatus) {
                da.comp.tip.show(data.msg);
            },
            code1:function (data,opt,textStatus) {
                opt.suc && opt.suc(data.body,textStatus);
            },
            code9:function (data,opt,textStatus) {
                da.comp.tip.show(data.msg,function () {
                    page.handler.signOut();
                });
            },
            def:function (data,opt,textStatus) {
                da.comp.tip.show(data.msg);
            }
        },
        ajaxStatus:{
            200:function () {

            },
            404:function () {

            },
            500:function () {

            }
        },//默认ajax返回状态码处理
        ajaxBefore:null,//公共ajax请求拦截判断
        loaddingUrl:'../../static/cc/common/img/loadding.gif',//默认loadding图片路径
        appList:['resize','session','local','tool','device','comp','layer']//默认初始化列表
    },
    config:function (conf,callback) {
        conf && $.extend(this.conf,conf);
        callback && callback('ok');
    },
    init:function (appList) {
        var base = this;
        $.each(appList || base.conf.appList,function (i,n) {
            if(base[n] && base[n].inited === false){
                base[n].init && base[n].init();
                base[n].inited = true;
            }
        });
    },
	/*
	 * 公共ajax请求
	 */
    _ajaxWait:0,
    ajax:function (param,setting){
        var base = this,
            opt = {
                url:'',           //请求路径
                param:param,           //请求入参
                bef:null,//请求发送前
                tot:null,//请求超时
                err:null,//请求错误
                suc:null,//请求成功
                cop:null,//请求完成
                loadding:true,   //是否展示loadding框
                async:true,      //是否异步
                type:'POST',     //请求类型
                dataType:'json',//交互数据类型
                timeout:60*1000, //请求超时时间
                cache:false,      //是否启用缓存
                ajaxURI:base.conf.ajaxUrl, //默认使用baseUrl
                defParam:base.conf.ajaxDefParam,
                crossDomain: !0,
                formate:!0,//参数格式化为{data:xxx}
                URIComponent:true,//url转码
                paramToString:true //json 转码
            };
        $.extend(opt,setting);
        //检测是否有网
        if(navigator.onLine === false){
            base.comp.tip.show(base.conf.tip.t04);
            opt.cop && opt.cop();
            return false;
        }
        if(!$.isEmptyObject(opt.defParam)){
            $.extend(opt.param,opt.defParam);
        }
		/*if(typeof opt.param === 'object' && opt.paramToString){
		 opt.param = JSON.stringify(opt.param);
		 }*/
        if(opt.type.toLowerCase() === 'get'){
            if(opt.URIComponent){
                opt.param = encodeURIComponent(opt.param);
            }
        }/*else if(opt.formate){
		 opt.param = {data:opt.param};
		 }*/
        if(base.validate.isNull(opt.url)){
            base.comp.tip.show(base.conf.tip.t01);
            return false;
        }
        $.ajax({
            url:opt.ajaxURI + opt.url,
            data:opt.param,
            dataType:opt.dataType,
            async:opt.async,
            timeout:opt.timeout,
            type:opt.type,
			/*cache:opt.cache,
			 xhrFields: {
			 withCredentials: true
			 },
			 contentType: opt.contentType,
			 processData: opt.processData,
			 crossDomain: opt.crossDomain,*/
            beforeSend:function(XMLHttpRequest){
                if(base.conf.ajaxBefore){
                    var _ret = base.conf.ajaxBefore(XMLHttpRequest,opt);
                    if(_ret === false){
                        return false;
                    }
                }
                if(opt.loadding){
                    base._ajaxWait += 1;
                    base.comp.loadding.show();
                }
                opt.bef && opt.bef(XMLHttpRequest);
            },
            success:function(data, textStatus){
                opt.suc && opt.suc(data,textStatus);
            },
            error:function(data, textStatus){
                data = {
                    code:'t02',
                    msg:base.conf.tip.t02
                };
                opt.err ? opt.err(data, textStatus) : da.comp.tip.show(data.msg);
            },
            complete:function(XMLHttpRequest, textStatus){
                if(opt.loadding){
                    base._ajaxWait -= 1;
                    if(base._ajaxWait <= 0){
                        base.comp.loadding.hide();
                    }
                }
                if(textStatus === 'timeout'){
                    var data = {
                        code:'t03',
                        msg:base.conf.tip.t03
                    };
                    opt.tot ? opt.tot(data, textStatus) : da.comp.tip.show(data.msg);
                }
                opt.cop && opt.cop(XMLHttpRequest, textStatus);
            },
            statusCode: opt.ajaxStatus || base.conf.ajaxStatus
        });
    },
	/*
	 * UI
	 */
    comp:{
        //顶级window
        win:null,
        // loadding等待
        loadding:{
            id:'da-loadding',
            //显示loadding@[target]
            show:function(_target){
                var target = _target || $(da.comp.win.document.body),
                    box = target.find('#'+this.id);
                if(box.length === 0){
                    box = $('<div>',{
                        id:this.id,
                        'class':'da-loadding popup',
                        style:_target?'position:absolute;':'',
                        html:function () {
                            return [
                                '<div class="popup-mask"></div>',
                                $('<div></div>',{
                                    'class':'popup-box',
                                    html:'<img src="'+da.conf.loaddingUrl+'"/>'
                                })
                            ]
                        }
                    });
                    target.append(box);
                    target.css('position') === 'static'?target.css('position','relative'):0;
                }
                box.show();
            },
            //隐藏loadding
            hide:function(target){
                target = target || $(da.comp.win.document.body);
                target.find('#'+this.id).hide();
            }
        },
        //提示框 类似与alert
        tip:{
            _list:[],
            id:'da-tip',
            //显示
            show:function(tip,call,btnText){
                var base = this;
                if($(da.comp.win.document.body).find('#'+this.id).length > 0){
                    base._list.push({tip:tip,call:call,btnText:btnText});
                    return false;
                }
                var box = $('<div>',{
                    id:this.id,
                    'class':'da-tip popup',
                    html:function () {
                        return [
                            '<div class="popup-mask"></div>',
                            $('<div></div>',{
                                'class':'popup-box',
                                html:[
                                    $('<div></div>',{
                                        'class':'da-tip-con',
                                        html:$('<p></p>',{
                                            html:tip
                                        })
                                    }),
                                    $('<div></div>',{
                                        'class':'da-tip-btns',
                                        html:btnText?btnText:'确定',
                                        click:function () {
                                            base.hide();
                                            call && call();
                                        }
                                    })
                                ]
                            })
                        ]
                    }
                });
                $(da.comp.win.document.body).append(box);
                box.show();
				/*box.find('.popup-box .da-tip-con p').css({
				 'margin-top':function () {
				 return -$(this).height()/2;
				 }
				 });*/
            },
            //隐藏
            hide:function(){
                var base = this;
                $(da.comp.win.document.body).find('#'+this.id).remove();
                if(base._list.length){
                    base.show(base._list[0].tip,base._list[0].call,base._list[0].btnText);
                    base._list.shift();
                }
            }
        },
        //提示框 类似与alert
        confirm:{
            id:'da-confirm',
            //显示confirm@setting = {tip:'11',sure:function(){},canc:function(){}};
            show:function(setting){
                var base = this,
                    box = $('<div>',{
                        id:this.id,
                        'class':'da-confirm popup',
                        html:function () {
                            return [
                                '<div class="popup-mask"></div>',
                                $('<div></div>',{
                                    'class':'popup-box',
                                    html:[
                                        $('<div></div>',{
                                            'class':'da-confirm-content',
                                            html:$('<p></p>',{
                                                html:setting.tip
                                            })
                                        }),
                                        $('<ul></ul>',{
                                            'class':'btn-panel clearfix w240',
                                            html:function () {
                                                return [
                                                    $('<li></li>',{
                                                        'class':'btn btn-save',
                                                        html:'确定',
                                                        click:function () {
                                                            base.hide();
                                                            setting.sure && setting.sure();
                                                        }
                                                    }),
                                                    $('<li></li>',{
                                                        'class':'btn btn-canc btn-gray',
                                                        html:'取消',
                                                        click:function () {
                                                            base.hide();
                                                            setting.canc && setting.canc();
                                                        }
                                                    })
                                                ];
                                            }
                                        })
                                    ]
                                })
                            ]
                        }
                    });
                $('body').append(box);
                box.show();
                box.find('.popup-box').css({
                    'margin-top':function () {
                        return -$(this).height()/2;
                    }
                });
            },
            //隐藏loadding
            hide:function(){
                $('#'+this.id).remove();
            }
        },
        //提示框 小奥头像+文字
        aoTip:{
            id:'da-ao-tip',
            //显示loadding
            show:function(tip,call){
                var base = this,
                    box = $('<div>',{
                        id:this.id,
                        'class':'da-ao-tip',
                        html:function () {
                            return $('<div></div>',{
                                html:[
                                    $('<i></i>',{
                                        click:function () {
                                            base.hide();
                                            call && call();
                                        }
                                    }),
                                    $('<div></div>',{
                                        html:'<img src="static/img/ao.png">'
                                    }),
                                    $('<div></div>',{
                                        html:tip
                                    })
                                ]
                            })
                        }
                    });
                $(da.comp.win.document.body).append(box);
                box.css({
                    display:'-webkit-box'
                });
            },
            //隐藏
            hide:function(){
                $(da.comp.win.document.body).find('#'+this.id).remove();
            }
        },
        //弹框
        popup:function (setting) {
            var opt = {
                hide:false,   //是否为隐藏
                win:da.comp.win,   //默认在最高层拼接弹出框
                close:function () {},//关闭回调事件
                cla:'',       //追加样式 calss
                boxSize:{},    //弹窗大小 {width:0,height:0}
                boxStyle:'',   //弹窗样式
                _boxId:'pop'+(+new Date()).toString().slice(-5)+(Math.random().toString().slice(-5)),
                html:'',       //弹窗内容   可初始设置 也可 show的时候设置  show时设置级别高
                title:''        //弹窗title
            };
            $.extend(opt,setting);
            return {
                setTitle:function (text) {
                    var base = this;
                    base.html.find('.box-title p:first').html(text);
                },
                html:null,
                show:function (html,callback) {
                    var box = $('#'+opt._boxId),base = this;
                    if(opt.hide && box.length){
                        box.show();
                        callback && callback(box);
                    }else{
                        if(html){
                            box.remove();
                        }else{
                            html = opt.html;
                        }
                        base.html = this._getHtml(html);
                        $(opt.win.document.body).append(base.html);
                        var win = $(opt.win);
                        base.html.find('.popup-box').css({
                            top:function () {
                                var p = $(this);
                                $(this).find('.box-content').height(function () {
                                    return p.height() - $(this).siblings('.box-title').height();
                                });
                                return Math.max((win.height() - p.height())/2,0);
                            },
                            left:function () {
                                return Math.max((win.width() - $(this).width())/2,0);
                            }
                        });
                        base._onFun();
                        callback && callback(base.html);
                    }
                },
                _moseInfo:{
                    bind: false,
                    isDown: false,
                    offsetX: 0,
                    offsetY: 0,
                    target: null
                },
                _getHtml:function (html) {
                    var base = this;
                    return $('<div></div>',{
                        id:opt._boxId,
                        'class':'popup',
                        html:function () {
                            return [
                                '<div class="popup-mask"></div>',
                                $('<div></div>',{
                                    'class':'popup-box',
                                    style:opt.boxStyle,
                                    html:function () {
                                        $(this).css({
                                            width:opt.boxSize.width || '100%',
                                            height:opt.boxSize.height || '100'
                                        });
                                        return [
                                            $('<div></div>',{
                                                'class':'box-title' + (opt.title ? '':' no-title'),
                                                html:function () {
                                                    return [
                                                        '<p>'+opt.title+'</p>',
                                                        opt.close === false?null:$('<i></i>',{
                                                            'class':'close',
                                                            click:function (e) {
                                                                var r = true;
                                                                if(typeof opt.close === 'function'){
                                                                    r = opt.close();
                                                                }
                                                                r !== false && base.hide();
                                                            },
                                                            mousedown:function (e) {
                                                                opt.win.event? opt.win.event.cancelBubble = true : e.stopPropagation();
                                                            }
                                                        })
                                                    ];
                                                },
                                                mousedown: function (e) {
                                                    base._moseInfo.isDown = true;
                                                    base._moseInfo.offsetX = e.offsetX;
                                                    base._moseInfo.offsetY = e.offsetY;
                                                    base._moseInfo.target = $(this).parent();
                                                }
                                            }),
                                            $('<div></div>',{
                                                'class':'box-content',
                                                html:function () {
                                                    return html || opt.html;
                                                }
                                            })
                                        ];
                                    }
                                })
                            ];
                        }
                    });
                },
                _onFun: function () {
                    var base = this;
                    if (base._moseInfo.bind) {
                        return false;
                    } else {
                        base._moseInfo.bind = true;
                    }
                    $(opt.win.document).on({
                        mouseup: function () {
                            if (base._moseInfo.isDown === true) {
                                base._moseInfo.isDown = false;
                                base._moseInfo.target = false;
                            }
                        },
                        mousemove:function (e) {
                            if (base._moseInfo.isDown === true && base._moseInfo.target) {
                                var target = base._moseInfo.target;
                                target.css({
                                    top: Math.max(e.pageY - base._moseInfo.offsetY,0),
                                    left: e.pageX - base._moseInfo.offsetX
                                });
                            }
                        }
                    });
                },
                hide:function () {
                    if(opt.hide){
                        $(opt.win.document.body).find('#'+opt._boxId).hide();
                    }else{
                        $(opt.win.document.body).find('#'+opt._boxId).remove();
                    }
                }
            };
        },
        //分页
        pagination:function(target,setting){
            var opt = {
                    cur:1,
                    total:0,
                    pageCount:1,
                    form:null
                },
                _this = this;
            _this.event={
                change : null
            };
            if(setting && setting.form){
                setting.form.update(function (param) {
                    _this.formParam = param;
                });
            }
            this.getFormParam = function () {
                return _this.formParam || {};
            };
            //跳转页面
            this.toPage = function(pageIndex,noChange){
                //判断是否为数字
                if(typeof pageIndex !== 'number'){
                    return false;
                }
                //判断是否超出范围
                if(pageIndex < 1 || pageIndex > opt.totalPage){
                    return false;
                }
                opt.cur = pageIndex;
                if(pageIndex === 1){
                    target.find('.page_prev').addClass('disabled');
                    target.find('.page_first').addClass('disabled');
                }else{
                    target.find('.page_prev').removeClass('disabled');
                    target.find('.page_first').removeClass('disabled');
                }
                if(pageIndex === opt.totalPage){
                    target.find('.page_next').addClass('disabled');
                    target.find('.page_last').addClass('disabled');
                }else{
                    target.find('.page_next').removeClass('disabled');
                    target.find('.page_last').removeClass('disabled');
                }
                var html = getHtml();
                target.find('.num').remove();
                target.find('.page_prev').after(html);
                noChange !== false && _this.event.change && _this.event.change(pageIndex);
            };
            this.getCur = function () {
                return opt.cur;
            };
            this.next = function () {
                _this.toPage(opt.cur+1);
            };
            //跳转页面
            this.last = function(){
                _this.toPage(opt.totalPage);
            };
            this.prev = function () {
                _this.toPage(opt.cur-1);
            };
            //跳转页面
            this.first = function(){
                _this.toPage(1);
            };
            //画页面
            this.drawPage = function(set){
                $.extend(opt,set);
                opt.totalPage = Math.ceil(opt.total/opt.pageCount);
                var html = [];
                html.push(getPageHtml({pageIndex:'&lt;&lt;',cla:'page_first',fun:_this.first}));
                html.push(getPageHtml({pageIndex:'&lt;',cla:'page_prev',fun:_this.prev}));
                html.push(getPageHtml({pageIndex:'&gt;',cla:'page_next',fun:_this.next}));
                html.push(getPageHtml({pageIndex:'&gt;&gt;',cla:'page_last',fun:_this.last}));
                if(opt.total > 0){
                    target.html([
                        $('<ul></ul>',{
                            'class':'fl',
                            html:html
                        }),
                        $('<p></p>',{
                            'class':'fl',
                            html:'每页'+opt.pageCount+'条，共'+opt.total+'条'
                        })
                    ]).addClass('clearfix pagination');
                    _this.toPage(opt.cur,false);
                }else{
                    target.html($('<p></p>',{
                        'class':'fl'
                    })).addClass('clearfix pagination');
                }
            };
            function getHtml() {
                var i = 1,max = opt.totalPage,html = [];
                if(opt.totalPage > 5){
                    if(opt.cur <= 2){
                        i = 1;
                        max = 5;
                    }else if(opt.cur > opt.totalPage - 2){
                        i = opt.totalPage - 4;
                        max = opt.totalPage;
                    }else{
                        i = opt.cur - 2;
                        max = opt.cur + 2;
                    }
                }
                for(;i <= max;i++){
                    html.push(getPageHtml({pageIndex:i,cla:'num'+(opt.cur === i?' active':''),fun:_this.toPage}));
                }
                return html;
            }
            function getPageHtml(par){
                return $('<li></li>',{
                    'class':par.cla,
                    pageIndex:par.pageIndex,
                    html:par.pageIndex,
                    click:function(){
                        if(par.fun){
                            if(!$(this).hasClass('disabled')){
                                if($(this).hasClass('num')){
                                    par.fun.call(this,par.pageIndex);
                                }else{
                                    par.fun.call(this,par.cla);
                                }
                            }
                        }
                    }
                });
            }
            this.drawPage(setting);
            return this;
        },
        //文件上传
		/*elem	    上传按钮，如：elem: $('#id')。
		 ajaxURI     上传baseUrl 默认跟当前ajax统一
		 url	        服务端上传接口路径 同ajax
		 type	    上传接口的 HTTP 类型	string	post 同ajax
		 data	    请求上传接口的额外参数	object	-
		 accept	    指定允许上传的文件类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）	string	images
		 exts	    允许上传的文件后缀。一般结合 accept 参数类设定。假设 accept 为 file 类型时，那么你设置 exts: 'zip|rar|7z' 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式	string	jpg|png|gif|bmp|jpeg
		 auto	    是否选完文件后自动上传。如果设定 false，那么需要设置 bindAction 参数来指向一个其它按钮提交上传	boolean	true
		 bindAction	指向一个按钮触发上传，一般配合 auto: false 来使用。值为选择器或DOM对象，如：bindAction: '#btn'	string/object	-
		 field	    设定文件域的字段名	string	file
		 size	    设置文件最大可允许上传的大小，单位 KB。不支持ie8/9	number	0（即不限制）
		 multiple	是否允许多文件上传。设置 true即可开启。不支持ie8/9	boolean	false
		 drag	    是否接受拖拽的文件上传，设置 false 可禁用。不支持ie8/9	boolean	true
		 choose	    auto 为false 时 有效   选择文件后的回调函数。返回一个object参数，详见下文	function	-
		 bef	        文件提交上传前的回调。返回一个object参数（同上），详见下文	function	-
		 suc	        执行上传请求后的回调。返回三个参数，分别为：res（服务端响应信息）、index（当前文件的索引）、upload（重新上传的方法，一般在文件上传失败后使用）。详见下文	function	-
		 err	        执行上传请求出现异常的回调（一般为网络异常、URL 404等）。返回两个参数，分别为：index（当前文件的索引）、upload（重新上传的方法）。详见下文	function	-*/
        upload:function (opt) {
            var r = "da-upload-file"
                , u = "da-upload-form"
                , s = "da-upload-choose"
                , ufile = "da-upload-file"
                , uform = "da-upload-form"
                , uiframe = "da-upload-iframe"
                , uchoose = "da-upload-choose",
                inited = false;
            var f = function (set) {
                this.init(set);
            };
            f.prototype.inited = false;
            f.prototype.init = function (setting) {
                $.extend(this.config,setting);
                setting.elem && this.render();
            };
            f.prototype.setElem = function (elem) {
                if(inited){
                    this.config.elem = elem;
                    this.render();
                }
            };
            f.prototype.config = {
                elem:null,
                accept: "images",
                exts: "",
                auto: !0,
                bindAction: null,
                url: "",
                field: "file",
                type: "post",
                data: {},
                drag: !0,
                size: 0,
                multiple: !1,
                choose:false,//选择预览
                ajaxURI:'', //接口请求所有路径
                bef:null,
                loadding:true,//loadding框
                paramter:null//提交参数
            };
            f.prototype.render = function() {
                inited = true;
                this.file();
                this.events();
            };
            f.prototype.file = function() {
                var e = this
                    , t = e.config
                    , o = e.elemFile = $(['<input class="' + ufile + '" type="file" name="' + t.field + '"', t.multiple ? " multiple" : "", ">"].join(""))
                    , a = t.elem.next();
                (a.hasClass(r) || a.hasClass(u)) && a.remove();
                da.device.ie && da.device.ie < 10 && t.elem.wrap('<div class="da-upload-wrap"></div>');
                e.isFile() ? (e.elemFile = t.elem,t.field = t.elem[0].name) : t.elem.after(o),
                da.device.ie && da.device.ie < 10 && e.initIE();
            };
            //初始化 ie 浏览器下的ui
            f.prototype.initIE = function() {
                var e = this
                    , t = e.config
                    , n = $('<iframe id="' + uiframe + '" class="' + uiframe + '" name="' + uiframe + '" frameborder="0"></iframe>')
                    , o = $(['<form target="' + uiframe + '" class="' + uform + '" method="' + t.type, '" key="set-mine" enctype="multipart/form-data" action="' + (t.ajaxURI + t.url) + '">', "</form>"].join(""));
                $("#" + uform)[0] || $("body").append(n),
                t.elem.next().hasClass(uiframe) || e.elemFile.wrap(o);
            };
            f.prototype.msg = function(e) {
                return false;
            };
            f.prototype.isFile = function() {
                var e = this.config.elem[0];
                if (e)
                    return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type
            };
            f.prototype.preview = function(callback) {
                var base = this;
                window.FileReader && $.each(base.chooseFiles, function(i, t) {
                    var n = new FileReader;
                    n.readAsDataURL(t);
                    n.onload = function() {
                        callback && callback(n,i,t)
                    };
                })
            };
            f.prototype.upload = function(e, t) {
                var o, base = this, l = base.config, r = base.elemFile[0],
                    //上传时浏览器大于ie9
                    u = function() {
                        $.each(e || base.files || base.chooseFiles || r.files, function(e, t) {
                            var n = new FormData;
                            n.append(l.field, t);
                            if(l.paramter){
                                l.paramter(l.data);
                            }
                            $.each(l.data, function(e, i) {
                                n.append(e, i)
                            });
                            da.ajax(n,{
                                url: l.url,
                                type: l.type,
                                formate:!1,
                                contentType: !1,
                                processData: !1,
                                ajaxURI:l.ajaxURI,
                                paramToString:false,
                                suc: function(i) {
                                    d(e, i)
                                },
                                err: function() {
                                    base.msg("请求上传接口出现异常");
                                    m(e);
                                }
                            });
                        });
                    },
                    //ie9及以下
                    p = function() {
                        var e = $("#" +uiframe),_parent = base.elemFile.parent();
                        if(l.paramter){
                            l.paramter(l.data);
                            base.elemFile.siblings().remove();
                            _parent.append(function() {
                                var _inputs = [];
                                return $.each(l.data, function(i, t) {
                                    _inputs.push('<input type="hidden" name="' + i + '" value="' + t + '">')
                                }),
                                    _inputs.join("");
                            }())
                        }
                        _parent.submit();
                        clearInterval(f.timer);
                        f.timer = setInterval(function() {
                            var i, t = e.contents().find("body");
                            try {
                                i = t.text();
                            } catch (n) {
                                base.msg("获取上传后的响应信息出现异常");
                                clearInterval(f.timer);
                                m();
                            }
                            i && (clearInterval(f.timer),
                                t.html(""),
                                d(0, i))
                        }, 30)
                    },
                    //上传成功
                    d = function(e, i) {
                        if (base.elemFile.next("." + uchoose).remove(),r.value = "","object" != typeof i){
                            try {
                                i = JSON.parse(i)
                            } catch (t) {
                                return i = {},base.msg("请对上传接口返回有效JSON")
                            }
                        }
                        "function" == typeof l.suc && l.suc(i, e || 0, function(e) {
                            base.upload(e);
                        });
                    },
                    //上传失败
                    m = function(e) {
                        l.auto && (r.value = "");
                        "function" == typeof l.err && l.err(e || 0, function(e) {
                            base.upload(e);
                        });
                    },
                    v = l.exts,
                    h = function() {
                        var i = [];
                        $.each(e || base.chooseFiles, function(e, t) {
                            i.push(t.name)
                        });
                        return i;
                    }(),
                    g = {
                        preview: function(e) {
                            base.preview(e)
                        },
                        upload: function(e, i) {
                            var t = {};
                            t[e] = i,
                                base.upload(t)
                        },
                        pushFile: function() {
                            base.files = base.files || {};
                            $.each(base.chooseFiles, function(e, i) {
                                base.files[e] = i
                            });
                            return base.files;
                        },
                        elemFile: r
                    },
                    y = function() {
                        return "choose" === t ? l.choose && l.choose(g) : (l.bef && l.bef(g,l),
                            da.device.ie ? da.device.ie > 9 ? u() : p() : void u())
                    };
                switch (h = 0 === h.length ? r.value.match(/[^\/\\]+\..+/g) || [] || "" : h,l.accept) {
                    case "file":
                        if (v && !RegExp("\\w\\.(" + v + ")$", "i").test(escape(h)))
                            return base.msg("选择的文件中包含不支持的格式"),
                                r.value = "";
                        break;
                    case "video":
                        if (!RegExp("\\w\\.(" + (v || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(h)))
                            return base.msg("选择的视频中包含不支持的格式"),
                                r.value = "";
                        break;
                    case "audio":
                        if (!RegExp("\\w\\.(" + (v || "mp3|wav|mid") + ")$", "i").test(escape(h)))
                            return base.msg("选择的音频中包含不支持的格式"),
                                r.value = "";
                        break;
                    default:
                        if ($.each(h, function(e, i) {
                                RegExp("\\w\\.(" + (v || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(i)) || (o = !0)
                            }),o)
                            return base.msg("选择的图片中包含不支持的格式"),
                                r.value = ""
                }
                return l.size > 0 && !(da.device.ie && da.device.ie < 10) ? $.each(base.chooseFiles, function(e, i) {
                    if (i.size > 1024 * l.size) {
                        var t = l.size / 1024;
                        return t = t >= 1 ? Math.floor(t) + (t % 1 > 0 ? t.toFixed(1) : 0) + "MB" : l.size + "KB",
                            r.value = "",
                            base.msg("文件不能超过" + t)
                    }
                    y()
                }) : void y()
            };
            f.prototype.events = function() {
                var e = this,
                    t = e.config,
                    //选中的文件
                    _setChoose = function(i) {
                        e.chooseFiles = {},
                            $.each(i, function(i, t) {
                                var n = (new Date).getTime();
                                e.chooseFiles[n + "-" + i] = t
                            })
                    },
                    //回调预览
                    _choose = function(i, n) {
                        var o = e.elemFile
                            , a = i.length > 1 ? i.length + "个文件" : (i[0] || {}).name || o[0].value.match(/[^\/\\]+\..+/g) || [] || "";
                        o.next().hasClass(uchoose) && o.next().remove(),
                            e.upload(null, "choose"),
                        e.isFile() || t.choose || o.after('<span class="da-inline ' + uchoose + '">' + a + "</span>")
                    };
                t.elem.off("upload.start").on("upload.start", function() {
                    e.elemFile[0].click()
                });
                da.device.ie && da.device.ie < 10 || t.elem.off("upload.over").on("upload.over", function() {
                    var e = i(this);
                    e.attr("lay-over", "")
                }).off("upload.leave").on("upload.leave", function() {
                    var e = i(this);
                    e.removeAttr("lay-over")
                }).off("upload.drop").on("upload.drop", function(n, l) {
                    var r = i(this),
                        _files = l.originalEvent.dataTransfer.files || [];
                    r.removeAttr("lay-over");
                    _setChoose(_files);
                    t.auto ? e.upload(_files) : _choose(_files);
                });
                e.elemFile.off("upload.change").on("upload.change", function() {
                    var _files = this.files || [];
                    _setChoose(_files);
                    t.auto ? e.upload() : _choose(_files)
                });
                t.bindAction && t.bindAction.off("upload.action").on("upload.action", function() {
                    e.upload();
                });
                t.elem.data("haveEvents") || (
                    e.elemFile.on("change", function() {
                        $(this).trigger("upload.change")
                    }),
                        t.elem.on("click", function() {
                            e.isFile() || $(this).trigger("upload.start")
                        }),
                    t.drag && t.elem.on("dragover", function(e) {
                        e.preventDefault(),
                            i(this).trigger("upload.over")
                    }).on("dragleave", function(e) {
                        $(this).trigger("upload.leave")
                    }).on("drop", function(e) {
                        e.preventDefault(),
                            i(this).trigger("upload.drop", e)
                    }),
                    t.bindAction && t.bindAction.on("click", function() {
                        $(this).trigger("upload.action")
                    }),
                        t.elem.data("haveEvents", !0)
                );
            };
            return new f(opt);
        },
        //带 inp-pl 类的input框 处理placeholder 兼容
        placeHolder:function (){
            var _inps = $('.inp-pl'),_that,_this;
            if(da.device.ie && da.device.ie < 9 && _inps.length >0) {
                $.each(_inps, function (i, n) {
                    _that = $(n);
                    if (!_that.parent().hasClass('inp-pl-p')) {
                        _that.before($('<span>', {
                            style: _that.val() ? 'display:none;' : '',
                            'class': 'inp-bg-pl', html: _that.attr('placeholder'),
                            'click':function (e){
                                $(this).next('.inp-pl').focus();
                                if (e && e.stopPropagation) {
                                    e.stopPropagation();
                                } else {
                                    window.event.cancelBubble = true;
                                }
                            }
                        })).parent().addClass('inp-pl-p');
                    }
                });
                _inps.on('input propertychange', function () {
                    _this = $(this);
                    _this.prev('.inp-bg-pl').toggle(da.validate.isNull(_this.val()));
                });
            }
        },
        //是否被初始化过
        inited:false,
        init:function () {
            var base = this;
            base.win = window;
            $.fn.getVal = function () {
                var _v = [];
                if(this.length === 0){
                    return ;
                }
                if(this.hasClass('select')){
                    $.each(this,function (i,n) {
                        $(n).find('li.active:not(.select-not)').each(function (j,k) {
                            _v.push($(k).attr('value'));
                        });
                    });
                    return _v.join(',');
                }else if((this.hasClass('checkbox') || this.hasClass('radio'))){
                    $.each(this,function (i,n) {
                        $(n).hasClass('active') && !$(n).hasClass('checkAll') && _v.push($(n).attr('value'));
                    });
                    return _v.join(',');
                }else if(this[0].tagName === 'INPUT'){
                    $.each(this,function (i,n) {
                        _v.push(n.value);
                    });
                    return _v.join(',');
                }
            };
            //使用时不要传入_li,只需传入val
            $.fn.setVal = function (val,_li) {
                var _this = $(this);
                if(_this.hasClass('select')){
                    var options = null,_showText = [];
                    if(_this.hasClass('multiple')){
                        if(da.validate.isNull(_li)){
                            _this.find('li').removeClass('active');
                            var values = val.split(',');
                            if(values.length === 0){
                                options = $(_li);
                            }else{
                                var _s = [];
                                $.each(values,function (i,n) {
                                    _s.push('li[value='+n+']');
                                });
                                options = _this.find(_s.join(','));
                            }
                            $.each(options,function (i,n) {
                                _showText.push(n.innerHTML);
                                $(n).addClass('active');
                            });
                        }else{
                            $(_li).toggleClass('active');
                            var _thisb = $(_li).hasClass('active');
                            if($(_li).hasClass('select-all')){
                                _this.find('li').toggleClass('active',$(_li).hasClass('active'));
                            }else{
                                _this.find('li.select-all').toggleClass('active',(_thisb && _this.find('li').length - 1 === _this.find('li.active').length));
                            }
                            _this.find('li.active:not(.select-not,.select-all)').each(function (i,n) {
                                _showText.push($(n).html());
                            });
                            if(_showText.length === 0){
                                _this.setDef();
                                return false;
                            }
                        }
                    }else{
                        _this.find('li').removeClass('active');
                        if(da.validate.isNull(val)){
                            options = $(_li);
                        }else{
                            options = _this.find('li[value='+val+']');
                        }
                        $.each(options,function (i,n) {
                            _showText.push(n.innerHTML);
                            $(n).addClass('active');
                        });
                    }
                    _this.find('span').attr('title',_showText.join(',')).html(_showText.join(','));
                    this[0].updateCall && this[0].updateCall(val);
                }else if($(this).hasClass('checkbox') || $(this).hasClass('radio')){
                    return $(this).attr('value',val);
                }else if(this[0].tagName === 'INPUT'){
                    return $(this).val(val);
                }
            };
            $.fn.setDef = function () {
                var _this = $(this);
                if(_this.hasClass('select')){
                    _this.find('li').removeClass('active');
                    var options = _this.find('li:first');
                    $.each(options,function (i,n) {
                        _this.find('span').html(n.innerHTML);
                        $(n).addClass('active');
                    });
                    this[0].updateCall && this[0].updateCall(_this.getVal());
                }
            };
            $.fn.setCheck = function (val) {
                if($(this).hasClass('checkbox') || $(this).hasClass('radio')){
                    $(this).toggleClass('active',val === false?false:true);
                    this[0].updateCall && this[0].updateCall(val === false?false:true);
                }
            };
            $.fn.getCheck = function () {
                if($(this).hasClass('checkbox') || $(this).hasClass('radio')){
                    return $(this).hasClass('active');
                }
            };
            $.fn.up = function () {
                var _this = $(this);
                if(_this.hasClass('select')){
                    _this.find('ul').hide();
                    _this.find('i').removeClass('down');
                    _this.removeClass('select-show');
                }
            };
            $.fn.update = function (call) {
                var _this = this;
                if(_this.hasClass('select') || _this.hasClass('radio') || _this.hasClass('form')){
                    this[0].updateCall = call;
                }
            };
            $.fn.refresh = function (data) {
                var _this = $(this);
                if(_this.hasClass('select')){
                    //data = [{value:'',text:''}]
                    var _lis = [],
                        _ul=_this.find('ul:first'),
                        _p = _this.find('p:first'),
                        textArr = [],
                        texts = '';
                    $.each(data,function (i,n) {
                        _lis.push($(n));
                        if($(n).attr('class') == 'active'){
                            textArr.push($(n).text());
                        }
                    });
                    texts = textArr.join(',')
                    if(_p.length === 0){
                        _this.append($('<p></p>',{
                            'class':'clearfix',
                            html:'<span title="'+texts+'">'+texts+'</span><i></i>'
                        }));
                    }else{
                        var _span = _p.find('span'),_i = _p.find('i');
                        if(_span.length === 0){
                            _p.append('<span>'+texts+'</span>');
                        }else{
                            _span.html(texts);
                        }
                        if(_i.length === 0){
                            _p.append('<i></i>');
                        }
                    }
                    if(_ul.length === 0){
                        _this.append($('<ul></ul>',{
                            html:_lis
                        }));
                    }else{
                        _ul.html(_lis);
                    }
                    _this.up();
                }
            };
            $.fn.submit = function (set) {
                var _this = this;
                if(_this.hasClass('form')){
                    this[0].onSubmit = function (data) {
                        var param = {};
                        _this.find('.select,input').each(function (i,n) {
                            param[n.getAttribute('name')] = $(n).getVal();
                        });
                        var _names = {};
                        _this.find('.radio,.checkbox').each(function (i,n) {
                            _names[$(n).attr('name')] = '';
                        });
                        $.each(_names,function (i,n) {
                            param[i] = _this.find('[name='+i+']').getVal();
                        });
                        data = $.extend(param,data);
                        var s = true;
                        if(set.validate){
                            s = set.validate(data);
                        }
                        if(s === false){
                            return s;
                        }
                        if(set.paramter){
                            set.paramter(data);
                        }
                        _this[0].updateCall && _this[0].updateCall(data);
                        da.ajax(data,set);
                    };
                }
            };
            //适配有分页等情况时使用
            $.fn.toSubmit = function (param) {
                var _this = this;
                if(_this.hasClass('form')){
                    this[0].onSubmit && this[0].onSubmit(param);
                }
            };

            $(window.document.body).off()
                .on({
                    click:function () {
                        $('.select').each(function (i,n) {
                            if($(n).find('ul:visible').length > 0){
                                $(n).up();
                            }
                        });
                    }
                })
                //单选按钮
                .on({
                    click:function () {
                        var name = $(this).attr('name'),
                            cancel = $(this).attr('cancel'),
                            _from = $(this).parents('.form'),
                            _from = _from.length === 0 ?$(document):_from,
                            _checkAll = _from.find('.checkAll[name='+name+']');
                        if(cancel === 'true'){
                            $(this).setCheck(!$(this).getCheck());
                        }else{
                            _from.find('.radio'+(name?'[name='+name+']':'')).removeClass('active');
                            $(this).addClass('active');
                        }
                        if(!$(this).hasClass('checkAll') && _checkAll.length > 0){
                            //设置全选按钮
                            var _isAll = true;
                            _from.find('.radio[name='+name+']:not(.checkAll)').each(function (i,n) {
                                if(!$(n).hasClass('active')){
                                    return _isAll = false;
                                }
                            });
                            _checkAll.toggleClass('active',_isAll);
                        }
                        return false;
                    }
                },'.radio')
                //多选按钮
                .on({
                    click:function () {
                        var name = $(this).attr('name'),
                            _from = $(this).parents('.form'),
                            _from = _from.length === 0 ?$(document):_from,
                            _checkAll =_from.find('.checkAll[name='+name+']');
                        $(this).setCheck(!$(this).getCheck());
                        if(!$(this).hasClass('checkAll') && _checkAll.length > 0){
                            //设置全选按钮
                            var _isAll = true;
                            _from.find('.checkbox[name='+name+']:not(.checkAll)').each(function (i,n) {
                                if(!$(n).hasClass('active')){
                                    return _isAll = false;
                                }
                            });
                            _checkAll.toggleClass('active',_isAll);
                        }
                        return false;
                    }
                },'.checkbox')
                //全选按钮
                .on({
                    click:function () {
                        var _name = $(this).attr('name'),
                            _from = $(this).parents('.form'),
                            _from = _from.length === 0 ?$(document):_from;
                        _from.find('[name='+_name+']').setCheck($(this).hasClass('active'));
                        return false;
                    }
                },'.checkAll')
                //select框
                .on({
                    click:function () {
                        $('.select').not(this).each(function (i,n) {
                            $(n).up();
                        });
                        var _this = $(this),
                            ulPanel = _this.children('ul');
                        //带disabled 的select 点击无效
                        if(_this.hasClass('disabled')){
                            return ;
                        }
						/*	ulPanel.width(_this.width() - 24);
						 ulPanel.prev().find('span:first').width($(this).width() - 44);*/
                        ulPanel.toggle();
                        _this.find('i').toggleClass('down',ulPanel.is(':visible'));
                        // 模糊搜索添加 class
                        if(_this.hasClass('search')){
                            _this.toggleClass('select-show').find('input').val('').trigger('keyup');
                        }
                        return false;
                    }
                },'.select')
                .on({
                    click:function () {
                        var _p = $(this).parents('.select');
                        _p.setVal($(this).attr('value'),this);
                        if(!_p.hasClass('multiple')){
                            _p.up();
                        }
                        return false;
                    }
                },'.select li')
                // 模糊查找
                .on({
                    'input propertychange keyup': function () {
                        var _this = $(this),
                            _list = _this.parents('.select').find('li'),
                            val = _this.val();
                        if (val) {
                            _list.hide().filter(':contains(' + val + ')').show();
                        } else {
                            _list.show();
                        }
                    }
                }, '.select .sear-mask input')
                // 模糊搜索阻止点击冒泡
                .on({
                    click: function (e) {
                        if (e && e.stopPropagation) {
                            e.stopPropagation();
                        } else {
                            window.event.cancelBubble = true;
                        }
                    }
                }, '.select .sear-mask')
                .on({
                    click:function () {
                        var _p = $(this).parents('.form');
                        _p[0].onSubmit && _p[0].onSubmit();
                        return false;
                    }
                },'.submit')
                .on({
                    click:function () {
                        var _p = $(this).parents('.form');
                        _p.find('input').each(function (i,n) {
                            n.value='';
                        });
                        _p.find('.select').each(function (i,n) {
                            $(n).setDef();
                        });
                        return false;
                    }
                },'.reset')
            ;
            //初始化select
            $('.select').each(function (i,n) {
                var _this = $(this),
                    _ul=_this.find('ul:first');
                if(_ul.length === 0 || _ul.find('li').length === 0){
                    return true;
                }
				/*var _d = [];
				 $.each(_ul.children('li'),function (j,k) {
				 _d.push({value:$(k).attr('value'),text:k.innerHTML,isActive:($(k).attr('class') || '')});
				 });
				 _this.refresh(_d);*/
                _this.refresh(_ul.children('li'));
            });
            //初始化placehodler
            this.placeHolder();
        }
    },
	/*
	 * 处理程序
	 */
    handler:{
        //转换ajax结果
        parseData:function(data) {
            data = {
                code:data.result.code,
                msg:data.result.msg,
                body:data.body
            };
            return data;
        },
        //获取url链接外来参数
        getUrlParam:function () {
            var params = {},
                href = window.location.search.slice(1);
            if(href){
                href = href.split('&');
                for(var i = 0;i < href.length;i++){
                    var p = href[i].split('=');
                    params[p[0]] = decodeURIComponent(p[1]);
                }
            }
            return params;
        },
        //获取url链接data
        getUrlData:function () {
            var href = window.location.search.slice(1).split('=')[0];
            try{
                href && (href = JSON.parse(decodeURIComponent(href)));
            }catch (e){
                href = {};
            }
            return href;
        },
        //获取UUID
        getUuid:function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        //转换data为urldata
        getDataUrl:function (data) {
            if($.isEmptyObject(data)){
                return '';
            }else{
                var _urlData = [];
                $.each(data,function (i,n) {
                    _urlData.push(i+'='+encodeURIComponent(n));
                });
                return _urlData.join('&');
            }
        }
    },
	/*
	 * 设备检测
	 * */
    device : {
        os:false,
        ie:false,
        wx:false,
        android:false,
        ios:false,
        inited:false,
        init:function () {
            var o = navigator.userAgent.toLowerCase(),
                r = {
                    os: function() {
                        return /windows/.test(o) ? "windows" : /linux/.test(o) ? "linux" : /iphone|ipod|ipad|ios/.test(o) ? "ios" : /mac/.test(o) ? "mac" : void 0
                    }(),
                    ie: function() {
                        return ~~(!!(window.ActiveXObject || "ActiveXObject"in window) && ((o.match(/msie\s(\d+)/) || [])[1] || "11"))
                    }(),
                    wx: n("micromessenger")
                };
            function n(o) {
                var t = new RegExp("/([^\\s\\_\\-]+)"),e;
                return e = (o.match(t) || [])[1],
                e || !1
            }
            r.android = /android/.test(o);
            r.ios = "ios" === r.os;
            $.extend(this,r);
        }
    },
	/*
	 * 检验处理程序
	 */
    validate:{
		/*
		 * 是否为空字符串 或者空对象或者空数组
		 * @param o:对象或字符串或数组
		 * @returns {boolean}
		 */
        isNull:function(o){
            var isNull = false;
            isNull = $.isEmptyObject(o);
            if(typeof o === 'number'){
                o = o+'';
            }
            if(typeof o === 'string'){
                isNull = $.isEmptyObject(o.replace(/[ ]/g, "")) || o === '';
            }
            return  isNull;
        },
		/*
		 * 验证是否为手机号
		 * @param no
		 */
        isMobileNO:function (no){
            return /13|14|15|18|17\d{9}/.test(no);
        },
		/*
		 * 验证电子邮箱格式
		 * @param email
		 */
        isEmail:function(email){
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            return reg.test(email);
        },
        isIdCardNo:function (num) {
            num = num.toUpperCase();
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){
                return '输入的身份证号长度不对，或者号码不符合规定！<br>15位号码应全为数字，18位号码末位可以为数字或X。';
            }
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            //下面分别分析出生日期和校验位
            var len, re;
            len = num.length;
            if (len == 15){
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确
                var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay){
                    return '输入的身份证号里出生日期不对！';
                }else{
                    //将15位身份证转成18位
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for(i = 0; i < 17; i ++)
                    {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    return true;
                }
            }
            if (len == 18){
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay){
                    return '输入的身份证号里出生日期不对！';
                }else{
                    //检验18位身份证的校验码是否正确。
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    for(i = 0; i < 17; i ++){
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)){
                        //$("#tip").html('18位身份证的校验码不正确！应该为：' + valnum);
                        return '18位身份证的校验码不正确！';
                    }
                    return true;
                }
            }
            return '18位身份证的校验码不正确！';
        }
        ,
		/*
		 * 判断是否为 微信浏览器打开
		 * @returns {Boolean} true  是:false  否
		 */
        isWeiXin:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger';
        },
		/*
		 * 判断是否为汉字
		 * @returns {Boolean} true  是:false  否
		 */
        isChiChar:function(val){
            return /^[\u4E00-\u9FA5]+$/.test(val);
        }
    },
	/*
	 * 跳转页面
	 */
    changePage:function(url,data,show){
        var base = this;
        //检测是否有网
        if(navigator.onLine === false){
            base.comp.tip.show(base.conf.tip.t04);
            return false;
        }
        var param = null;
        if(data !== false){
            param = base.handler.getUrlData();
            param = $.extend(param,data);
            param = base.validate.isNull(param)?'':'?'+encodeURIComponent(JSON.stringify(param));
        }

        if(show !== true){
            window.location.href = url + (data === false?'':param);
            return false;
        }else{
            da.comp.loadding.show();
        }
        var _t = setTimeout(function(){
            clearTimeout(_t);
            window.location.href = url + param;
        },10);
    },
	/*
	 * sessionStorage
	 */
    session:{
        data:{},
        name:'session',
        //赋值session
        set:function(data){
            da.local.set(this.data || data);
            //sessionStorage.setItem(this.name,JSON.stringify(data || this.data));
            data && (this.data = data);
        },
        //获取session信息
        get:function(){
            return da.local.get();
            //return JSON.parse(sessionStorage.getItem(this.name)) || {};
        },
        //修改session name
        setName:function (name) {
            this.name = name;
        },
        //是否被初始化过
        inited:false,
        init:function () {
            name && this.setName(name);
            this.data = this.get();
        }
    },
	/*
	 * localStorage
	 */
    local:{
        data:{},
        name:'local',
        //保存localStorage信息
        set:function(data){
            localStorage && localStorage.setItem(this.name,JSON.stringify(data || this.data));
            data && (this.data = data);
        },
        //获取localStorage信息
        get:function(){
            return (localStorage && JSON.parse(localStorage.getItem(this.name))) || {};
        },
        //修改local name
        setName:function (name) {
            this.name = name;
        },
        //是否被初始化过
        inited:false,
        init:function (name) {
            name && this.setName(name);
            this.data = this.get();
        }
    },
	/*
	 * 页面窗口重绘时 事件
	 */
    resize:{
        //所有对象
        all: [],
        //添加对象
        add: function (name, fun ,doThis) {
            var resize = {fun: name};
            if (typeof name === 'string') {
                resize.name = name;
                resize.fun = fun;
            }
            this.all.push(resize);
            doThis === true && $(window).trigger('resize');
        },
        //根据name移除更新项  返回是否删除成功
        remove: function (name) {
            var base = this;
            for (var i = 0, max = base.all.length; i < max; i++) {
                if (base.all[i].name === name) {
                    base.all.splice(i, 1);
                    break;
                }
            }
            return max !== base.all.length;
        },
        //是否被初始化过
        inited:false,
        //初始化执行
        init: function () {
            var base = this;
            $(window).on('resize', function () {
                var w = $(window).width(), h = $(window).height();
                for (var i = 0, max = base.all.length; i < max; i++) {
                    base.all[i].fun(w, h);
                }
            });
        }
    },
    tool:{
        //是否被初始化过
        inited:false,
        init:function () {
            $.each(this.inits,function (i,n) {
                n();
            });
        },
        inits:{
            str:function () {
                //拓展属性
                String.prototype.replaceAll = function (s1, s2) {
                    return this.replace(new RegExp(s1, "gm"), s2);
                };
            }
        }
    },
	/*
	 * 根据数据获取HTml
	 */
    ui:{
        //获取表单
        //数据格式
		/*data = {
		 cla:'',
		 head: [
		 {text: '序号', cla: '', width: '10%'},
		 {text: '用户名', cla: '', width: '15%'},
		 {text: '姓名', cla: '', width: '10%'},
		 {text: '学号', cla: '', width: '15%'},
		 {text: '班级', cla: '', width: '15%'},
		 {text: '状态', cla: '', width: '15%'},
		 {text: '操作', cla: '', width: '20%'}
		 ],
		 body: [
		 [{text:'1',cla:'',width:''},{text:'张三',cla:''},{text:'张三',cla:''},{text:'000001',cla:''},{text:'会计1班',cla:''},{text:'启用',cla:''},{text:'<a>修改</a>',cla:''}]
		 ]
		 };*/
        table:function (data) {
            return $('<table></table>',{
                'class':data.cla,
                html:function () {
                    var _h = [];
                    if(data.head && data.head.length){
                        _h.push($('<thead></thead>',{
                            html:function () {
                                var _headh = [];
                                $.each(data.head,function (i,n) {
                                    _headh.push($('<td></td>',{
                                        width:n.width,
                                        'class':n.cla,
                                        html:n.text
                                    }))
                                });
                                return $('<tr></tr>',{html:_headh});
                            }
                        }));
                    }
                    if(data.body){
                        _h.push($('<tbody></tbody>',{
                            html:function () {
                                var _bodyh = [],_tr=[];
                                if(data.body && data.body.length){
                                    $.each(data.body,function (i,n) {
                                        _tr=[];
                                        $.each(n,function (j,k) {
                                            _tr.push($('<td></td>',{
                                                width:k.width,
                                                'class':k.cla,
                                                html:k.text
                                            }));
                                        });
                                        _bodyh.push($('<tr></tr>',{html:_tr}));
                                    });
                                }else{
                                    _bodyh.push($('<tr></tr>',{
                                        html:$('<td></td>',{
                                            'class':'table-no-data',
                                            colspan:data.head.length,
                                            html:data.noData || da.conf.userTip.u14
                                        })
                                    }));
                                }
                                return _bodyh;
                            }
                        }));
                    }
                    return _h;
                }
            });
        },
        none:function (tip,url) {
            return $('<div></div>',{
                'class':'da-none-panel',
                html:function () {
                    return [
                        $('<div></div>',{
                            html:$('<img/>',{
                                src:url,
                                load:function () {
                                    this.parentNode.style.paddingTop = (144 - this.height) + 'px';
                                    this.parentNode.style.height = 'auto';
                                    this.style.width = this.width + 'px';
                                }
                            })
                        }),
                        '<p>'+tip+'</p>'
                    ];
                }
            });
        }
    },
    //弹层
    layer:{
        inited:false,
        init:function () {
            var base = this,n,t,
                o = {
                    getPath: function () {
                        var e = document.scripts, t = e[e.length - 1], i = t.src;
                        if (!t.getAttribute("merge"))return i.substring(0, i.lastIndexOf("/") + 1)
                    }(),
                    config: {},
                    end: {},
                    minIndex: 0,
                    minLeft: [],
                    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                    type: ["dialog", "page", "iframe", "loading", "tips"],
                },
                r = {
                    //v: "3.1.0",
                    index: 0,
                    path: o.getPath,
                    config: function (e, t) {
                        e = e || {},
                            r.cache = o.config = i.extend({}, o.config, e),
                            r.path = o.config.path || r.path,
                        "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready();
                        return this;
                    },
                    ready: function (e) {
                        return this;
                    },
                    alert: function (e, t, n) {
                        var a = "function" == typeof t;
                        return a && (n = t), r.open($.extend({content: e, yes: n}, a ? {} : t))
                    },
                    confirm: function (e, t, n, a) {
                        var s = "function" == typeof t;
                        return s && (a = n, n = t), r.open($.extend({content: e, btn: o.btn, yes: n, btn2: a}, s ? {} : t))
                    },
                    msg: function (e, n, a) {
                        var s = "function" == typeof n, f = o.config.skin, c = (f ? f + " " + f + "-msg" : "") || "da-layer-msg", u = l.anim.length - 1;
                        return s && (a = n), r.open($.extend({
                            content: e,
                            time: 3e3,
                            shade: !1,
                            skin: c,
                            title: !1,
                            closeBtn: !1,
                            btn: !1,
                            resize: !1,
                            end: a
                        }, s && !o.config.skin ? {skin: c + " da-layer-hui", anim: u} : function () {
                            return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "da-layer-hui")), n
                        }()))
                    },
                    load: function (e, t) {
                        return r.open($.extend({type: 3, icon: e || 0, resize: !1, shade: .01}, t))
                    },
                    tips: function (e, t, n) {
                        return r.open($.extend({
                            type: 4,
                            content: [e, t],
                            closeBtn: !1,
                            time: 3e3,
                            shade: !1,
                            resize: !1,
                            fixed: !1,
                            maxWidth: 210
                        }, n));
                    }
                };
            var s = function (e) {
                var t = this;
                t.index = ++r.index, t.config = $.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function () {
                    t.creat()
                }, 30)
            };
            s.pt = s.prototype;
            var l = ["da-layer", ".da-layer-title", ".da-layer-main", ".da-layer-dialog", "da-layer-iframe", "da-layer-content", "da-layer-btn", "da-layer-close"];
            l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
                type: 0,
                shade: .3,
                fixed: !0,
                move: l[1],
                title: "&#x4FE1;&#x606F;",
                offset: "auto",
                area: "auto",
                closeBtn: 1,
                time: 0,
                zIndex: 19891014,
                maxWidth: 360,
                anim: 0,
                isOutAnim: !0,
                icon: -1,
                moveType: 1,
                resize: !0,
                scrollbar: !0,
                tips: 2
            },
                s.pt.vessel = function (e, t) {
                    var n = this, a = n.index, r = n.config, s = r.zIndex + a,
                        f = "object" == typeof r.title,
                        c = r.maxmin && (1 === r.type || 2 === r.type),
                        u = r.title ? '<div class="da-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";

                    return r.zIndex = s,
                        t([r.shade ? '<div class="da-layer-shade" id="da-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; ") + '"></div>' : "",
                                '<div class="' + l[0] + (" da-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " da-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type]
                                + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: '
                                + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u)
                                + '<div id="' + (r.id || "") + '" class="da-layer-content' + (0 == r.type && r.icon !== -1 ? " da-layer-padding" : "")
                                + (3 == r.type ? " da-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="da-layer-ico da-layer-ico' + r.icon + '"></i>' : "")
                                + (1 == r.type && e ? "" : r.content || "") + '</div><span class="da-layer-setwin">'
                                + function () {
                                    var e = c ? '<a class="da-layer-min" href="javascript:;"><cite></cite></a><a class="da-layer-ico da-layer-max" href="javascript:;"></a>' : "";
                                    return r.closeBtn && (e += '<a class="da-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e
                                }()
                                + "</span>" + (r.btn ? function () {
                                    var e = "";
                                    "string" == typeof r.btn && (r.btn = [r.btn]);
                                    for (var t = 0, i = r.btn.length; t < i; t++)e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
                                    return '<div class="' + l[6] + " da-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
                                }() : "")
                                + (r.resize ? '<span class="da-layer-resize"></span>' : "") + "</div>"], u,
                            $('<div class="da-layer-move"></div>')),
                        n;
                },
                s.pt.creat = function () {
                    var e = this, t = e.config, a = e.index, s = t.content, f = "object" == typeof s, c = $("body");
                    if (!t.id || !$("#" + t.id)[0]) {
                        switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == da.device.ie && (t.fixed = !1), t.type) {
                            case 0:
                                t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
                                break;
                            case 2:
                                var s = t.content = f ? t.content : [t.content || "http://www.dongao.com", "auto"];
                                t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a
                                    + '" onload="this.className=\'\';" class="da-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                                break;
                            case 3:
                                delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
                                break;
                            case 4:
                                f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="da-layer-TipsG"></i>', delete t.title,
                                    t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips")
                        }
                        if (e.vessel(f, function (n, r, u) {
                                c.append(n[0]), f ? function () {
                                    2 == t.type || 4 == t.type ? function () {
                                        $("body").append(n[1])
                                    }() : function () {
                                        s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("da-layer-wrap").wrap(n[1]), $("#" + l[0] + a).find("." + l[5]).before(r))
                                    }()
                                }() : c.append(n[1]), $(".da-layer-move")[0] || c.append(o.moveElem = u), e.layero = $("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
                            }).auto(a), $("#da-layer-shade" + e.index).css({
                                "background-color": t.shade[1] || "#000",
                                opacity: t.shade[0] || t.shade
                            }), 2 == t.type && 6 == da.device.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function () {
                                e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips()
                            }), t.time <= 0 || setTimeout(function () {
                                r.close(e.index)
                            }, t.time), e.move().callback(), l.anim[t.anim]) {
                            var u = "layer-anim " + l.anim[t.anim];
                            e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass(u)
                            })
                        }
                        t.isOutAnim && e.layero.data("isOutAnim", !0)
                    }
                },
                s.pt.auto = function (e) {
                    var t = this, a = t.config, o = $("#" + l[0] + e);
                    "" === a.area[0] && a.maxWidth > 0 && (da.device.ie && da.device.ie < 8 && a.btn && o.width(o.innerWidth()), o.outerWidth() > a.maxWidth && o.width(a.maxWidth));
                    var s = [o.innerWidth(), o.innerHeight()], f = o.find(l[1]).outerHeight() || 0, c = o.find("." + l[6]).outerHeight() || 0, u = function (e) {
                        e = o.find(e), e.height(s[1] - f - c - 2 * (0 | parseFloat(e.css("padding-top"))))
                    };
                    switch (a.type) {
                        case 2:
                            u("iframe");
                            break;
                        default:
                            "" === a.area[1] ? a.maxHeight > 0 && o.outerHeight() > a.maxHeight ? (s[1] = a.maxHeight, u("." + l[5])) : a.fixed && s[1] >= n.height() && (s[1] = n.height(), u("." + l[5])) : u("." + l[5])
                    }
                    return t
                },
                s.pt.offset = function () {
                    var e = this, t = e.config, i = e.layero, a = [i.outerWidth(), i.outerHeight()], o = "object" == typeof t.offset;
                    e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0],
                        e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ?
                            e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ?
                                (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ?
                                    (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ?
                        n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ?
                        n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()),
                    i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
                        top: e.offsetTop,
                        left: e.offsetLeft
                    })
                },
                s.pt.tips = function () {
                    var e = this, t = e.config, a = e.layero, o = [a.outerWidth(), a.outerHeight()], r = $(t.follow);
                    r[0] || (r = $("body"));
                    var s = {
                        width: r.outerWidth(),
                        height: r.outerHeight(),
                        top: r.offset().top,
                        left: r.offset().left
                    }, f = a.find(".da-layer-TipsG"), c = t.tips[0];
                    t.tips[1] || f.remove(), s.autoLeft = function () {
                        s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
                            right: 12,
                            left: "auto"
                        })) : s.tipLeft = s.left
                    },
                        s.where = [function () {
                            s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("da-layer-TipsB").addClass("da-layer-TipsT").css("border-right-color", t.tips[1])
                        }, function () {
                            s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("da-layer-TipsL").addClass("da-layer-TipsR").css("border-bottom-color", t.tips[1])
                        }, function () {
                            s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("da-layer-TipsT").addClass("da-layer-TipsB").css("border-right-color", t.tips[1])
                        }, function () {
                            s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("da-layer-TipsR").addClass("da-layer-TipsL").css("border-bottom-color", t.tips[1])
                        }],
                        s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop()
                        + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
                        "background-color": t.tips[1],
                        "padding-right": t.closeBtn ? "30px" : ""
                    }),
                        a.css({left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0), top: s.tipTop - (t.fixed ? n.scrollTop() : 0)})
                },
                s.pt.move = function () {
                    var e = this, t = e.config, a = $(document), s = e.layero, l = s.find(t.move), f = s.find(".da-layer-resize"), c = {};
                    return t.move && l.css("cursor", "move"), l.on("mousedown", function (e) {
                        e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show())
                    }), f.on("mousedown", function (e) {
                        e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show()
                    }), a.on("mousemove", function (i) {
                        if (c.moveStart) {
                            var a = i.clientX - c.offset[0], o = i.clientY - c.offset[1], l = "fixed" === s.css("position");
                            if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
                                var f = n.width() - s.outerWidth() + c.stX, u = n.height() - s.outerHeight() + c.stY;
                                a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u)
                            }
                            s.css({left: a, top: o})
                        }
                        if (t.resize && c.resizeStart) {
                            var a = i.clientX - c.offset[0], o = i.clientY - c.offset[1];
                            i.preventDefault(), r.style(e.index, {
                                width: c.area[0] + a,
                                height: c.area[1] + o
                            }), c.isResize = !0, t.resizing && t.resizing(s)
                        }
                    }).on("mouseup", function (e) {
                        c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
                    }), e
                },
                s.pt.callback = function () {
                    function e() {
                        var e = a.cancel && a.cancel(t.index, n);
                        e === !1 || r.close(t.index)
                    }

                    var t = this, n = t.layero, a = t.config;
                    t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function () {
                        a.success(n, t.index)
                    }) : a.success(n, t.index)), 6 == da.device.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function () {
                        var e = $(this).index();
                        if (0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index); else {
                            var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
                            o === !1 || r.close(t.index)
                        }
                    }), n.find("." + l[7]).on("click", e), a.shadeClose && $("#da-layer-shade" + t.index).on("click", function () {
                        r.close(t.index)
                    }), n.find(".da-layer-min").on("click", function () {
                        var e = a.min && a.min(n);
                        e === !1 || r.min(t.index, a)
                    }), n.find(".da-layer-max").on("click", function () {
                        $(this).hasClass("da-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function () {
                            a.full && a.full(n)
                        }, 100))
                    }), a.end && (o.end[t.index] = a.end)
                },
                o.reselect = function () {
                    $.each($("select"), function (e, t) {
                        var n = $(this);
                        n.parents("." + l[0])[0] || 1 == n.attr("layer") && $("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null
                    })
                },
                s.pt.IE6 = function (e) {
                    $("select").each(function (e, t) {
                        var n = $(this);
                        n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({layer: "1"}).hide(), n = null
                    })
                },
                s.pt.openLayer = function () {
                    var e = this;
                    r.zIndex = e.config.zIndex, r.setTop = function (e) {
                        var t = function () {
                            r.zIndex++, e.css("z-index", r.zIndex + 1)
                        };
                        return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex
                    }
                },
                o.record = function (e) {
                    var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
                    e.find(".da-layer-max").addClass("da-layer-maxmin"), e.attr({area: t})
                },
                o.rescollbar = function (e) {
                    l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"))
                };
            r.getChildFrame = function (e, t) {
                return t = t || $("." + l[4]).attr("times"), $("#" + l[0] + t).find("iframe").contents().find(e)
            },
                r.getFrameIndex = function (e) {
                    return $("#" + e).parents("." + l[4]).attr("times")
                },
                r.iframeAuto = function (e) {
                    if (e) {
                        var t = r.getChildFrame("html", e).outerHeight(), n = $("#" + l[0] + e), a = n.find(l[1]).outerHeight() || 0, o = n.find("." + l[6]).outerHeight() || 0;
                        n.css({height: t + a + o}), n.find("iframe").css({height: t})
                    }
                },
                r.iframeSrc = function (e, t) {
                    $("#" + l[0] + e).find("iframe").attr("src", t)
                },
                r.style = function (e, t, n) {
                    var a = $("#" + l[0] + e), r = a.find(".da-layer-content"), s = a.attr("type"), f = a.find(l[1]).outerHeight() || 0, c = a.find("." + l[6]).outerHeight() || 0;
                    a.attr("minLeft");
                    s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260),
                    parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(),
                        s === o.type[2] ? a.find("iframe").css({height: parseFloat(t.height) - f - c}) : r.css({height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))}))
                },
                r.min = function (e, t) {
                    var a = $("#" + l[0] + e), s = a.find(l[1]).outerHeight() || 0, f = a.attr("minLeft") || 181 * o.minIndex + "px", c = a.css("position");
                    o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
                        width: 180,
                        height: s,
                        left: f,
                        top: n.height() - s,
                        position: "fixed",
                        overflow: "hidden"
                    }, !0), a.find(".da-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f)
                },
                r.restore = function (e) {
                    var t = $("#" + l[0] + e), n = t.attr("area").split(",");
                    t.attr("type");
                    r.style(e, {
                        width: parseFloat(n[0]),
                        height: parseFloat(n[1]),
                        top: parseFloat(n[2]),
                        left: parseFloat(n[3]),
                        position: t.attr("position"),
                        overflow: "visible"
                    }, !0), t.find(".da-layer-max").removeClass("da-layer-maxmin"), t.find(".da-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e)
                },
                r.full = function (e) {
                    var t, a = $("#" + l[0] + e);
                    o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function () {
                        var t = "fixed" === a.css("position");
                        r.style(e, {
                            top: t ? 0 : n.scrollTop(),
                            left: t ? 0 : n.scrollLeft(),
                            width: n.width(),
                            height: n.height()
                        }, !0), a.find(".da-layer-min").hide()
                    }, 100)
                },
                r.title = function (e, t) {
                    var n = $("#" + l[0] + (t || r.index)).find(l[1]);
                    n.html(e)
                },
                r.close = function (e) {
                    var t = $("#" + l[0] + e), n = t.attr("type"), a = "layer-anim-close";
                    if (t[0]) {
                        var s = "da-layer-wrap", f = function () {
                            if (n === o.type[1] && "object" === t.attr("conType")) {
                                t.children(":not(." + l[5] + ")").remove();
                                for (var a = t.find("." + s), r = 0; r < 2; r++)a.unwrap();
                                a.css("display", a.data("display")).removeClass(s)
                            } else {
                                if (n === o.type[2])try {
                                    var f = $("#" + l[4] + e)[0];
                                    f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f)
                                } catch (c) {
                                }
                                t[0].innerHTML = "", t.remove()
                            }
                            "function" == typeof o.end[e] && o.end[e](), delete o.end[e]
                        };
                        t.data("isOutAnim") && t.addClass("layer-anim " + a), $("#da-layer-moves, #da-layer-shade" + e).remove(),
                        6 == da.device.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft")));

                        da.device.ie && da.device.ie < 10 || !t.data("isOutAnim")
                            ?
                            f() :
                            setTimeout(function () {
                                f()
                            }, 200)
                    }
                },
                r.closeAll = function (e) {
                    $.each($("." + l[0]), function () {
                        var t = $(this), n = e ? t.attr("type") === e : 1;
                        n && r.close(t.attr("times")), n = null
                    })
                };
            var f = r.cache || {},
                c = function (e) {
                    return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
                };
            r.prompt = function (e, t) {
                var a = "";
                if (e = e || {}, "function" == typeof e && (t = e), e.area) {
                    var o = e.area;
                    a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area
                }
                var s, l = 2 == e.formType ? '<textarea class="da-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function () {
                    return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="da-layer-input" value="' + (e.value || "") + '">'
                }(), f = e.success;
                return delete e.success, r.open($.extend({
                    type: 1,
                    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                    content: l,
                    skin: "da-layer-prompt" + c("prompt"),
                    maxWidth: n.width(),
                    success: function (e) {
                        s = e.find(".da-layer-input"), s.focus(), "function" == typeof f && f(e)
                    },
                    resize: !1,
                    yes: function (i) {
                        var n = s.val();
                        "" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {tips: 1}) : t && t(n, i, s)
                    }
                }, e))
            };
            r.tab = function (e) {
                e = e || {};
                var t = e.tab || {}, n = "da-this", a = e.success;
                return delete e.success, r.open($.extend({
                    type: 1,
                    skin: "da-layer-tab" + c("tab"),
                    resize: !1,
                    title: function () {
                        var e = t.length, i = 1, a = "";
                        if (e > 0)for (a = '<span class="' + n + '">' + t[0].title + "</span>"; i < e; i++)a += "<span>" + t[i].title + "</span>";
                        return a
                    }(),
                    content: '<ul class="da-layer-tabmain">' + function () {
                        var e = t.length, i = 1, a = "";
                        if (e > 0)for (a = '<li class="da-layer-tabli ' + n + '">' + (t[0].content || "no content") + "</li>"; i < e; i++)a += '<li class="da-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                        return a
                    }() + "</ul>",
                    success: function (t) {
                        var o = t.find(".da-layer-title").children(), r = t.find(".da-layer-tabmain").children();
                        o.on("mousedown", function (t) {
                            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                            var a = $(this), o = a.index();
                            a.addClass(n).siblings().removeClass(n), r.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o)
                        }), "function" == typeof a && a(t)
                    }
                }, e))
            };
            r.photos = function (t, n, a) {
                function o(e, t, i) {
                    var n = new Image;
                    return n.src = e, n.complete ? t(n) : (n.onload = function () {
                        n.onload = null, t(n)
                    }, void(n.onerror = function (e) {
                        n.onerror = null, $(e)
                    }))
                }

                var s = {};
                if (t = t || {}, t.photos) {
                    var l = t.photos.constructor === Object, f = l ? t.photos : {}, u = f.data || [], d = f.start || 0;
                    s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
                    var y = t.success;
                    if (delete t.success, l) {
                        if (0 === u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
                    } else {
                        var p = $(t.photos), h = function () {
                            u = [], p.find(t.img).each(function (e) {
                                var t = $(this);
                                t.attr("layer-index", e), u.push({
                                    alt: t.attr("alt"),
                                    pid: t.attr("layer-pid"),
                                    src: t.attr("layer-src") || t.attr("src"),
                                    thumb: t.attr("src")
                                })
                            })
                        };
                        if (h(), 0 === u.length)return;
                        if (n || p.on("click", t.img, function () {
                                var e = $(this), n = e.attr("layer-index");
                                r.photos($.extend(t, {photos: {start: n, data: u, tab: t.tab}, full: t.full}), !0), h()
                            }), !n)return
                    }
                    s.imgprev = function (e) {
                        s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e)
                    }, s.imgnext = function (e, t) {
                        s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e)
                    }, s.keyup = function (e) {
                        if (!s.end) {
                            var t = e.keyCode;
                            e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
                        }
                    }, s.tabimg = function (e) {
                        if (!(u.length <= 1))return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e)
                    }, s.event = function () {
                        s.bigimg.hover(function () {
                            s.imgsee.show()
                        }, function () {
                            s.imgsee.hide()
                        }), s.bigimg.find(".da-layer-imgprev").on("click", function (e) {
                            e.preventDefault(), s.imgprev()
                        }), s.bigimg.find(".da-layer-imgnext").on("click", function (e) {
                            e.preventDefault(), s.imgnext()
                        }), $(document).on("keyup", s.keyup)
                    }, s.loadi = r.load(1, {shade: !("shade" in t) && .9, scrollbar: !1}), o(u[d].src, function (n) {
                        r.close(s.loadi), s.index = r.open($.extend({
                            type: 1,
                            id: "da-layer-photos",
                            area: function () {
                                var a = [n.width, n.height], o = [$(e).width() - 100, $(e).height() - 100];
                                if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
                                    var r = [a[0] / o[0], a[1] / o[1]];
                                    r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
                                }
                                return [a[0] + "px", a[1] + "px"]
                            }(),
                            title: !1,
                            shade: .9,
                            shadeClose: !0,
                            closeBtn: !1,
                            move: ".da-layer-phimg img",
                            moveType: 1,
                            scrollbar: !1,
                            moveOut: !0,
                            isOutAnim: !1,
                            skin: "da-layer-photos" + c("photos"),
                            content: '<div class="da-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="da-layer-imgsee">' + (u.length > 1 ? '<span class="da-layer-imguide"><a href="javascript:;" class="da-layer-iconext da-layer-imgprev"></a><a href="javascript:;" class="da-layer-iconext da-layer-imgnext"></a></span>' : "") + '<div class="da-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="da-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
                            success: function (e, i) {
                                s.bigimg = e.find(".da-layer-phimg"), s.imgsee = e.find(".da-layer-imguide,.da-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e)
                            },
                            end: function () {
                                s.end = !0, $(document).off("keyup", s.keyup)
                            }
                        }, t))
                    }, function () {
                        r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                            time: 3e4,
                            btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                            yes: function () {
                                u.length > 1 && s.imgnext(!0, !0)
                            }
                        })
                    })
                }
            };
            o.run = function (t) {
                n = $(window);
                l.html = $("html"),
                    r.open = function (e) {
                        var t = new s(e);
                        return t.index
                    }
            };
            o.run($);
            r.ready();
            $.extend(base,r);
        }
    }
};
