var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,
    init: function () {
        da.config({
            ajaxUrl: 'http://51teacher.dongao.com/teacher/'
        });
        da.init();
        $.each(this.elements, function (i, n) {
            typeof n === 'function' && n();
        });
    },
    style: [
        { selector: 'node[label = "company"]',
            css: {
                'content': 'data(title)',
                'text-valign': 'center',
                'color': 'white',
                "height": 200,
                "width": 200,
                'text-outline-width': 2,
                'text-outline-color': '#316383',//颜色设置
                "background-color": "rgb(249,203,168)",
                "label": "data(title)"}
        },
        { selector: 'node[label = "intrenal"]',
            css: {
                'content': 'data(title)',
                'text-valign': 'center',
                'color': 'white',
                "height": 100,
                "width": 150,
               /* 'shape': 'rectangle',*/
                'text-outline-width': 2,
                'text-outline-color': '#316383',//颜色设置
                "background-color": "rgb(29,99,162)",
                "label": "data(title)"}
        },
        { selector: 'node[label = "external"]',
            css: {
                'content': 'data(title)',
                'text-valign': 'center',
                'color': 'white',
                "height": 100,
                "width": 150,
               /* 'shape': 'rectangle',*/
                'text-outline-width': 2,
                'text-outline-color': '#316383',//颜色设置
                "background-color": "rgb(6,37,60)",
                "label": "data(title)"}
        },
        {
            selector: 'edge',
            css: {
                'curve-style': 'bezier',
                "label": "data(relationship)",
                'target-arrow-shape': 'triangle',
                'target-arrow-color': 'black',
                'line-color': '#ccc',
                'width': 1
            }
        }/*,
        { selector: 'edge[label = "2"]',
            css: {'target-arrow-shape': 'triangle','content': 'data(relationship)',}
        }*/
    ],
    elements: {
        //进页面初始化查询，没有参数
        getinitData: function () {
            var param = {
                'partnerTeacherClassGoodsId': da.handler.getUrlParam().partnerTeacherClassGoodsId
            };
            da.ajax(param, {
                url: 'examlog/examLog/doQuestionList',
                suc: function (data) {
                    var body = [];
                    $.each(data.showPaperList, function (i, n) {
                        var abc = [];
                        abc.push(
                            {text: n.paperUsed, cla: ''},
                            {text: n.paperName, cla: ''},
                            {
                                text: '<a class="juli"  onclick = "view.handler.toDoDetailPaper(' + n.paperId + "," + da.handler.getUrlParam().partnerTeacherClassGoodsId + ')">做题详情</a><a class="juli" onclick="view.handler.toViewPaper(' + n.paperId + ')">查看试卷</a>',
                                cla: ''
                            }
                        );
                        body.push(abc);
                    });
                    var tableData = {
                        cla: 'teacher_table',
                        head: [
                            {text: '试卷类型', cla: '', width: '20%'},
                            {text: '试卷名称', cla: '', width: '60%'},
                            {text: '操作', cla: '', width: '20%'}
                        ],
                        body: body
                    };
                    $('.table-panel').html(da.ui.table(tableData));
                }
            })
        },
        nodes: [
            {
                data: {id: '172', title: 'company', label: 'company'},
                position: {x: 100, y: 200}
                },
            {data: {id: '183', title: 'Top Gun', label: 'intrenal'}},
            {
                data: {id: '184', title: '2', label: 'intrenal'},
                position: {x: 900, y: 200}
                },
            {data: {id: '185', title: '3', label: 'intrenal'}},
            {data: {id: '186', title: 'Costomers', label: 'external'}},
            {data: {id: '187', title: '5', label: 'external'}},
            {data: {id: '188', title: '5', label: 'external'}},
            {data: {id: '189', title: '5', label: 'external'}}
        ],
        edges: [
            {data: {source: '172', target: '183', relationship: '服务',label: '1'}},
            {data: {source: '183', target: '172', relationship: '利润',label: '2'}},
            {data: {source: '184', target: '172', relationship: '2',label: '2'}},
            {data: {source: '172', target: '184', relationship: '33',label: '2'}},
            {data: {source: '185', target: '172', relationship: '2',label: '2'}},
            {data: {source: '186', target: '172', relationship: '利润',label: '2'}},
            {data: {source: '172', target: '186', relationship: '服务',label: '2'}},
            {data: {source: '187', target: '172', relationship: '2',label: '2'}},
            {data: {source: '188', target: '172', relationship: '2',label: '2'}},
            {data: {source: '189', target: '172', relationship: '2',label: '2'}}
        ]
    },
    layout: {
        name: 'concentric',
        fit:true,
    padding: 30, // the padding on fit
    startAngle:4/ 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    minNodeSpacing: 100
},
    handler:{
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
            if(typeof opt.param === 'object' && opt.paramToString){
                opt.param = JSON.stringify(opt.param);
            }
            if(opt.type.toLowerCase() === 'get'){
                if(opt.URIComponent){
                    opt.param = encodeURIComponent(opt.param);
                }
            }else if(opt.formate){
                opt.param = {data:opt.param};
            }
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
                cache:opt.cache,
                xhrFields: {
                    withCredentials: true
                },
                contentType: opt.contentType,
                processData: opt.processData,
                crossDomain: opt.crossDomain,
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
                    data = base.handler.parseData(data);
                    if(base.conf.ajaxSucPro['code'+data.code]){
                        base.conf.ajaxSucPro['code'+data.code](data,opt,textStatus);
                    }else{
                        base.conf.ajaxSucPro.def(data,opt,textStatus);
                    }
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
        }
    }

});