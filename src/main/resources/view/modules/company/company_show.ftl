<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- This code is for demonstration purposes only.  You should not hotlink to Github, Rawgit, or files from the Cytoscape.js documentation in your production apps. -->
<head>
    <link href="../../../static/css/style.css" rel="stylesheet" />
    <meta charset=utf-8 />
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <title>Compound nodes</title>
    <script src="../../../static/js/cytoscape.min.js"></script>
</head>
<body>
<div class="stakeholder">
    <div class="shadow">
        <form action="/company/saveLink" method="post">
            <input type="hidden" name="companyId" id="companyId" value="${companyId}"/>
            <input class="s-input" value="${company.companyName}" type="hidden" readonly/>
            <input type="button" class="sure-input" value="Add Stakeholders"/>
          <#--  <select class="s-select" name="stakeholderId">
                <option value="">select</option>
                <#list stakeholderList as stakeholder>
                    <option value="${stakeholder.id}">${stakeholder.stakeholderName}</option>
                </#list>
            </select>-->
        </form>
    </div>

    <div class="toshow">
        <div button-div class="button-div" >
            <input class="button" onclick="valExchange(2)" id="data" type="button" value="data"/>
        </div>
        <div class="button-div" >
            <input class="button" onclick="valExchange(1)" id="valexchange" type="button" value="value exchange"/>
        </div>
        <div class="button-div" >
            <input class="button" onclick="valExchange(1)" id="totalValue" type="button" value="total value"/>
        </div>
        <div class="sign">
        <span><i class="center"></i>company</span><br/>
        <span><i class="in"></i>intrenal</span><br/>
        <span><i class="out"></i>external</span><br/>
        </div>
    </div>
    <!--弹窗-->
    <div class="shadow-box">

    </div>
    <!--查看-->
    <div class="shadow-container shadow-line">
        <div class="line-title clearfix">
            <h3 class="con-tit shadow-title">Add Stakeholders</h3>
            <i class="close"></i>
        </div>

        <div class="line-content">
           <#-- <h2>正确答案：<span id="rightAnswer"></span></h2>-->
            <div id="lineBox">
                <input class="s-input" id="stakeholderName" placeholder="input stakeholder" type="text"/>
                <div class="screen_div fl">
                    <div name="status" id="intrenal" class="select w90 fl" style="width: 200px;">
                        <ul style="right: 0;">
                            <li class="active"  title="Intrenal Stakeholders" value="1">Intrenal Stakeholders</li>
                            <li  title="External Stakeholders" value="2">External Stakeholders</li>
                        </ul>
                    </div>
                </div>
                <div class="form" style="height: auto">
                    <input class="s-input value-input" placeholder="input indicators" type="text"/>
                    <input class="s-input data-input" placeholder="value" type="text"/>
                    <div class="screen_div fl">
                        <div name="status" id="resourcesType2" class="select w90 fl" style="width: 200px;">
                            <ul style="right: 0;">
                                <li class="active"  title="Company To Stakeholders" value="1">Company To Stakeholders</li>
                                <li  title="Stakeholders To Company" value="2">Stakeholders To Company</li>
                            </ul>
                        </div>
                    </div>
                    <i class="delete"></i>
                </div>
            </div>
               <input type="button" class="add-input" value="Add Value"/>
        </div>
        <div class="shadow-btns">
            <a class="confirm" href="javascript:;">Save</a>
            <a class="cancle" href="javascript:;">Cancle</a>
        </div>
    </div>

</div>
<div id="cy" >
</div>
<!-- Load application code at the end to ensure DOM is loaded -->
<script src="../../../static/js/jquery-1.7.2.min.js"></script>
<script src="../../../static/js/nodeajax.js"></script>
<script src="../../../static/js/da.js"></script>
<script src="../../../static/js/bk-list.js"></script>
<script>
    function valExchange(type) {
        var companyId = $('#companyId').val();
        $.get('http://localhost:8080/company/getJson?companyId='+companyId+"&type="+type, function(result) {
            var style = [
                { selector: 'node[label = "company"]',
                    css: {
                        'content': 'data(title)',
                        'text-valign': 'center',
                        'color': 'white',
                        "height": 200,
                        "width": 200,
                        'text-outline-width': 2,
                        'text-outline-color': 'rgb(16,142,233)',
                        "background-color": "rgb(16,142,233)",
                        "label": "data(title)"}
                },
                { selector: 'node[label = "intrenal"]',
                    css: {
                        'content': 'data(title)',
                        'text-valign': 'center',
                        'color': 'white',
                        "height": 150,
                        "width": 150,
                        'text-outline-width': 1,
                        'text-outline-color': 'rgb(153,204,153)',//颜色设置
                        "background-color": "rgb(153,204,153)",
                        "label": "data(title)"}
                },
                { selector: 'node[label = "external"]',
                    css: {
                        'content': 'data(title)',
                        'text-valign': 'center',
                        'color': 'white',
                        "height": 150,
                        "width": 150,
                        'text-outline-width': 2,
                        'text-outline-color': '#6f5499',//颜色设置
                        "background-color": "#6f5499",
                        "label": "data(title)"}
                },
                {
                    selector: 'edge[label = "in"]',
                    css: {
                        'curve-style': 'bezier',
                        "label": "data(relationship)",
                        'target-arrow-shape': 'triangle',
                        'target-arrow-color': 'rgb(153,204,153)',
                        'line-color': 'rgb(153,204,153)',
                        'width': 1,
                        'font-size':'20px',
                        "edge-text-rotation": "autorotate"
                    }
                },
                {
                    selector: 'edge[label = "out"]',
                    css: {
                        'curve-style': 'bezier',
                        "label": "data(relationship)",
                        'target-arrow-shape': 'triangle',
                        'target-arrow-color': '#6f5499',
                        'line-color': '#6f5499',
                        'font-size':'20px',
                        'width': 1,
                        "edge-text-rotation": "autorotate"
                    }
                },
                {
                    selector: 'edge[label = "comp"]',
                    css: {
                        'curve-style': 'bezier',
                        "label": "data(relationship)",
                        'target-arrow-shape': 'triangle',
                        'target-arrow-color': 'rgb(16,142,233)',
                        'line-color': 'rgb(16,142,233)',
                        'font-size':'20px',
                        'width': 1,
                        "edge-text-rotation": "autorotate"
                    }
                },
                { selector: 'edge[label = "new"]',
                    css: {}
                }
            ];

            var cy = cytoscape({
                container: document.getElementById('cy'),
                style: style,
                layout: {
                    name: 'circle',
                    fit:true,
                    padding: 30, // the padding on fit
                    startAngle: 3/2 * Math.PI, // where nodes start in radians
                    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
                    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
                    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
                    minNodeSpacing: 100
                },
                elements: result
            });

            cy.on('tap', 'node', function(evt){
                var node = evt.target;
                var linkId = node._private.data.linkId;
                $.ajax({
                    type:"post",
                    url:"http://localhost:8080/company/getRelationValue",
                    dataType:"json",
                    data:{
                        'linkId':linkId
                    },
                    traditional: true,
                    success:function (data) {
                       if (data.code == 1){
                           $('#lineBox').html('');
                           var html = '\
                           <input class="s-input" placeholder="input Stakeholders" id="stakeholderName" value="'+data.stakeholderName+'" type="text"/>\
                             <div class="screen_div fl">\
                                <div name="status" id="intrenal" class="select w90 fl" style="width: 200px;">\
                                   <ul style="right: 0;">\
                                   ';
                           if(data.isInternal == 1){
                               html += '\
                                 <li class="active"  title="Intrenal Stakeholders" value="1">Intrenal Stakeholders</li>\
                                 <li  title="External Stakeholders" value="2">External Stakeholders</li>\
                                 </ul>\
                                 <p class="clearfix"><span title="Intrenal Stakeholders">Intrenal Stakeholders</span><i></i></p>\
                               ';
                           }else{
                               html += '\
                                 <li  title="Intrenal Stakeholders" value="1">Intrenal Stakeholders</li>\
                                 <li  class="active"  title="External Stakeholders" value="2">External Stakeholders</li>\
                                 </ul>\
                                 <p class="clearfix"><span title="External Stakeholders">External Stakeholders</span><i></i></p>\
                               ';

                           }
                            html +='\
                                </div>\
                                </div>\
                                ';
                           $.each(data.relationshipList, function (i, n) {
                               html += '\
                                <div class="form" style="height: auto">\
                                   <input placeholder="input indicators" class="s-input value-input" value="'+n.relationship+'" type="text"/>\
                                   <input placeholder="value"  class="s-input data-input"  value="'+n.data+'" placeholder="value" type="text"/>\
                                   <div class="screen_div fl">\
                                   <div name="status" id="resourcesType2" class="select w90 fl" style="width: 200px;">\
                                   <ul style="right: 0;">\
                                   ';
                               if(n.to == 1){
                                   html += '\
                               <li class="active"  title="Company To Stakeholders" value="1">Company To Stakeholders</li>\
                               <li  title="Stakeholders To Company" value="2">Stakeholders To Company</li>\
                               </ul>\
                               <p class="clearfix"><span title="Company To Stakeholders">Company To Stakeholders</span><i></i></p>\
                               ';
                               }else{
                                   html +='\
                               <li   title="Company To Stakeholders" value="1">Company To Stakeholders</li>\
                               <li class="active" title="Stakeholders To Company" value="2">Stakeholders To Company</li>\
                               </ul>\
                               <p class="clearfix"><span title="Stakeholders To Company">Stakeholders To Company</span><i></i></p>\
                                   ';
                                }
                                  html+= '\
                                    </div>\
                                   </div>\
                                   <i class="delete"></i>\
                                   </div> \
                               ';
                           });
                           $('#lineBox').html(html);
                           $('.shadow-box').show();
                           $('.shadow-line').show();
                       }
                    }
                });
            });

        }, 'json');
    }
    $('.sure-input').on('click',function () {
        $('.shadow-box').show();
        $('.shadow-line').show();
    });
    $('.close').on('click',function () {
        $('.shadow-box').hide();
        $('.shadow-line').hide();
    });
    $('.cancle').on('click',function () {
        $('.shadow-box').hide();
        $('.shadow-line').hide();
    });
    $('.add-input').on('click',function () {
        var html='\
                <div class="form" style="height: auto">\
                    <input class="s-input value-input" placeholder="input indicators" type="text"/>\
                    <input class="s-input data-input" placeholder="value" type="text"/>\
                    <div class="screen_div fl">\
                    <div name="status" class="select w90 fl" style="width: 200px;">\
                    <ul style="right: 0;">\
                    <li class="active"  title="Company To Stakeholders" value="1">Company To Stakeholders</li>\
                    <li  title="Stakeholders To Company" value="2">Stakeholders To Company</li>\
                    </ul>\
                    <p class="clearfix"><span title="Company To Stakeholders">Company To Stakeholders</span><i></i></p>\
                    </div>\
                    </div>\
                    <i class="delete"></i> \
                </div>\
        ';
        $('#lineBox').append(html);
    });
    $('#lineBox').on('click','.delete',function () {
        if($('.value-input').length > 1){
            $(this).parent().remove();
        }
    });
    $('.confirm').on('click',function () {
        var valueData = [];
        $.each($('.form'),function (i, n){
            var value = $(this).find('.value-input').val();
            var data = $(this).find('.data-input').val();
            var to =$(this).find('li.active:not(.select-not)').attr("value");
            valueData.push({value:value,data:data,to:to});
        });
        valueData = JSON.stringify(valueData);
        var stakeholder = $('#stakeholderName').val();
        var internal = $('#intrenal').find('li.active:not(.select-not)').attr("value");
        $.ajax({
            type:"post",
            url:"http://localhost:8080/company/saveRelationValue",
            dataType:"json",
            data:{
                'valueData':valueData,
                'stakeholder':stakeholder,
                'internal':internal,
                'companyId':$('#companyId').val()
            },
            traditional: true,
            success:function (data) {
                $('.close').click();
            }
        });
        window.location.reload();
    });

</script>
</body>
</html>