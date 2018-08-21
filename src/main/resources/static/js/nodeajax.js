$(function(){
    var companyId = $('#companyId').val();
    var type = 2;
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
                selector: 'edge[label = "data"]',
                css: {
                    'curve-style': 'bezier',
                    "label": "data(relationship)",
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': 'rgb(153,204,153)',
                    'line-color': 'rgb(153,204,153)',
                    'width': 1,
                    "edge-text-rotation": "autorotate"
                }
            },
            {
                selector: 'edge[label = "in"]',
                css: {
                    'curve-style': 'bezier',
                    "label": "data(relationship)",
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': 'rgb(153,204,153)',
                    'line-color': 'rgb(153,204,153)',
                    'font-size':'20px',
                    'width': 1,
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
        console.log(result);

        cy.on('tap', 'node', function(evt){
            var node = evt.target;
            if(node._private.data.label == 'company'){
                return false;
            }
            var linkId = node._private.data.linkId;
            $('#boxType').val('2');
            var btnHtml = '\
                 <a class="confirm" href="javascript:;">Save</a>\
                        <a class="cancle" href="javascript:;">Cancle</a>\
                        <a class="del" linkId="'+linkId+'"  href="javascript:;">Delete</a>\
                ';
            $('.shadow-btns').html(btnHtml);
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
                        <input type="hidden" id="stakeholdersId" value="'+data.stakeholderId+'" >\
                         <input type="hidden" id="linkId" value="'+node._private.data.linkId+'" >\
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
                                   <input placeholder="input value" valueId="'+n.relationshipId+'" class="s-input value-input" value="'+n.relationship+'" type="text"/>\
                                   <input placeholder="data" dataId="'+n.dataId+'" class="s-input data-input"  value="'+n.data+'" type="text"/>\
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
                        $('.shadow-title').html('Update Stakeholders');
                        $('#lineBox').html(html);
                        $('.shadow-box').show();
                        $('.shadow-line').show();
                    }
                }
            });
        });

    }, 'json');
});