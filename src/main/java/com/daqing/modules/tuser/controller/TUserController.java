package com.daqing.modules.tuser.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.daqing.modules.tuser.model.TUser;
import com.daqing.modules.tuser.service.TUserService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by dongao on 2018/6/22.
 */
@Controller
@RequestMapping("/tuser")
public class TUserController {
    @Autowired
    private TUserService tUserService;

    @RequestMapping("/toTUserList")
    public String toTUserList(Model model, HttpServletRequest request, HttpServletResponse response){
      /*  List<TUser> tUserList = tUserService.selectAll();
        model.addAttribute("tUserList",tUserList);*/
        return "tuser/index";
    }
    @RequestMapping(value = "/getJson",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public String getJson(){
        List<Map> nodesList = new ArrayList<Map>();
        List<Map> edgesList = new ArrayList<Map>();
        Map dataMap1 = new HashMap();
        Map dataMap2 = new HashMap();
        Map nodeMap = new HashMap();
        nodeMap.put("id","172");
        nodeMap.put("title","company");
        nodeMap.put("label","company");
        dataMap2.put("data",nodeMap);
        nodesList.add(dataMap2);
        Map nodeMap1 = new HashMap();
        nodeMap1.put("id","183");
        nodeMap1.put("title","customers");
        nodeMap1.put("label","intrenal");
        dataMap1.put("data",nodeMap1);
        nodesList.add(dataMap1);
        Map resuleMap = new HashMap();
        resuleMap.put("nodes",nodesList);
        Map edgesMap = new HashMap();
        Map edgesMap1 = new HashMap();
        Map edgedataMap = new HashMap();
        Map edgedataMap1 = new HashMap();
        edgesMap.put("source","172");
        edgesMap.put("target","183");
        edgesMap.put("relationship","服务");
        edgesMap.put("label","1");
        edgesMap1.put("source","183");
        edgesMap1.put("target","172");
        edgesMap1.put("relationship","利润");
        edgesMap1.put("label","1");
        edgedataMap.put("data",edgesMap);
        edgedataMap1.put("data",edgesMap1);
        edgesList.add(edgedataMap);
        edgesList.add(edgedataMap1);
        resuleMap.put("edges",edgesList);
        String result = JSONUtils.toJSONString(resuleMap);
        System.out.println(result);
        return result;
    }

/*    @RequestMapping("exportExcel")
    public void exportExcel(HttpServletResponse response) throws IOException{
        //创建工作簿
        XSSFWorkbook xssfWorkBook = new XSSFWorkbook();
        //创建一个sheet
        XSSFSheet sheet = xssfWorkBook.createSheet("表格1");
        //设置默认宽度
        sheet.setDefaultColumnWidth(10);
        //设置字体
        XSSFFont font = xssfWorkBook.createFont();
        font.setColor(IndexedColors.VIOLET.index);
        font.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        //sheet中添加表头第0行
        XSSFRow rowMerged = sheet.createRow(0);
        //合并列
        sheet.addMergedRegion(new CellRangeAddress(0,0,1,10));
        XSSFCell cellMerged = rowMerged.createCell(0);

        //设置表头，表头居中
        XSSFCellStyle style = xssfWorkBook.createCellStyle();
        //设置字体样式
        style.setFont(font);

       // style.setFillForegroundColor(IndexedColors.GOLD.index);
       // style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setBorderTop(CellStyle.BORDER_THIN);

        //设置表头居中
        style.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        cellMerged.setCellValue("作业名称");
        cellMerged.setCellStyle(style);

        cellMerged = rowMerged.createCell(1);
        cellMerged.setCellValue("表格");
        cellMerged.setCellStyle(style);

        //创建单元格
        XSSFRow row = sheet.createRow(1);
        row.setHeight((short)600);
        //合并列
        sheet.addMergedRegion(new CellRangeAddress(1,1,1,2));
        XSSFCell cell;
        cell = row.createCell(0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell(1);
        cell.setCellValue("习题");
        cell.setCellStyle(style);

        cell = row.createCell(2);
        cell.setCellValue("知识点");
        cell.setCellStyle(style);

        //创建单元格
        XSSFRow row1 = sheet.createRow(2);
        row1.setHeight((short)600);
        //合并列
        XSSFCell cell1;
        cell1 = row1.createCell(0);
        cell1.setCellValue("<strong>序号</strong>");
        cell1.setCellStyle(style);

        cell1 = row1.createCell(1);
        cell1.setCellValue("习题");
        cell1.setCellStyle(style);

        cell1 = row1.createCell(2);
        cell1.setCellValue("知识点");
        cell1.setCellStyle(style);


        String fileName = "表格";
        response.setContentType("application/vnd.ms-excel");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        response.setHeader( "Content-Disposition" ,"attachment;filename=\"" + new String(fileName.getBytes( "gb2312" ), "iso-8859-1" ) + ".xlsx" + "\"" );
        OutputStream ouputStream = response.getOutputStream();
        xssfWorkBook.write(ouputStream);
        ouputStream.flush();
        ouputStream.close();
    }*/

/*    @RequestMapping("/ep")
    public void ep(HttpServletResponse response) throws IOException{
        //创建工作簿
        HSSFWorkbook hssfWorkBook = new HSSFWorkbook();
        HSSFSheet sheet = hssfWorkBook.createSheet("Test");// 创建工作表(Sheet)
        FileInputStream stream=new FileInputStream("D:\\1.jpg");
        byte[] bytes=new byte[(int)stream.getChannel().size()];
        stream.read(bytes);//读取图片到二进制数组
        int pictureIdx = hssfWorkBook.addPicture(bytes,HSSFWorkbook.PICTURE_TYPE_JPEG);
        HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
        HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 0, 0,(short)0, 0, (short)5, 5);
        HSSFPicture pict = patriarch.createPicture(anchor,pictureIdx);
        String fileName = "表格";
        response.setContentType("APPLICATION/OCTET-STREAM");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        response.setHeader( "Content-Disposition" ,"attachment;filename=\"" + new String(fileName.getBytes( "gb2312" ), "iso-8859-1" ) + ".xls" + "\"" );
        OutputStream ouputStream = response.getOutputStream();
        hssfWorkBook.write(ouputStream);
        ouputStream.flush();
        ouputStream.close();
    }*/



}
