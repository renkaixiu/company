<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>批量导入人员</title>
<#--<link rel="shortcut icon" type="image/x-icon" href="${request.getContextPath()}/favicon.ico" />
<link rel="stylesheet" href="${request.getContextPath()}/larry/common/layui/css/layui.css"  media="all">
<link rel="stylesheet" href="${request.getContextPath()}/larry/common/css/form.css"  media="all">
<link href="${request.getContextPath()}/css/ztree/zTreeStyle.css" rel="stylesheet" type="text/css" />-->
</head>
<body>
<div class="form">
    <input type="text" value="hello"/>

    <select>
        <#if tUserList?? && tUserList?size gt 0>
            <option>请选择</option>
            <#list tUserList as tUser>
                <option>${tUser.username}</option>
            </#list>
        </#if>
    </select>

</div>
<script type="text/javascript">

</script>
</body>
</html>