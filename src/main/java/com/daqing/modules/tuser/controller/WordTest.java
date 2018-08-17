package com.daqing.modules.tuser.controller;


        import java.io.BufferedWriter;
        import java.io.File;
        import java.io.FileNotFoundException;
        import java.io.FileOutputStream;
        import java.io.IOException;
        import java.io.OutputStreamWriter;
        import java.io.Writer;
        import java.util.ArrayList;
        import java.util.HashMap;
        import java.util.List;
        import java.util.Map;

        import freemarker.template.Configuration;
        import freemarker.template.Template;
        import freemarker.template.TemplateException;

public class WordTest {

    private Configuration configuration = null;

    public WordTest(){
        configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
    }

    public static void main(String[] args) {
        WordTest test = new WordTest();
        test.createWord();
    }

    public void createWord(){
        Map<String,Object> dataMap=new HashMap<String,Object>();
        getData(dataMap);
        configuration.setClassForTemplateLoading(this.getClass(), "/templates");  //FTL文件所存在的位置
        Template t=null;
        try {
            t = configuration.getTemplate("111.ftl"); //文件名
        } catch (IOException e) {
            e.printStackTrace();
        }
        File outFile = new File("D:/outFilessa"+Math.random()*10000+".xls");  //生成文件的路径
        Writer out = null;
        try {
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile)));
        } catch (FileNotFoundException e1) {
            e1.printStackTrace();
        }

        try {
            t.process(dataMap, out);
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //这里赋值的时候需要注意,xml中需要的数据你必须提供给它,不然会报找不到某元素错的.
    private void getData(Map<String, Object> dataMap) {
        dataMap.put("topQuestion", "<p>甲公司在2016年发生如下与金融资产有关的业务：&nbsp;<br />\n" +
                "（1）1月1日，从证券交易市场购入B公司股票200股，拥有B公司5%有表决权的股份，对乙公司不具有控制，共同控制或重大影响支付价款50万元，其中包含已宣告但尚未发放的现金股利5万元，另支付相关交易费用1.5万元。B公司股票在活跃市场中存在报价，公允价值能够可靠计量。甲公司持有该股票的期间不确定，且不准备划分为交易性金融资产。<br />\n" +
                "（2）1月10日，从乙公司购入当日发行的债券100万份，共支付价款1650万元，债券面值总额为1500万元，票面利率8%，实际利率5%。债券期限为5年，分期付息、到期还本。甲公司准备将该债券持有至到期。 <br />\n" +
                "（3）3月10，甲公司将其持有的交易性金融资产进行出售，取得出售价款为30万元。该交易性金融资产系2015年12月21日购入，购入时的成本为28万元，持有期间确认累计公允价值变动-2万元。 <br />\n" +
                "（4）7月1日，支付银行存款购入丙公司有表决权股份的30%，对丙公司能够施加重大影响。甲公司实际支付价款800万元，购买当日，丙公司可辨认净资产公允价值为2100万元。交易过程中发生相关税费20万元。 <br />\n" +
                "（5）12月31日，甲公司持有的B公司股票的公允价值为40万元，属于公允价值的正常波动。丙公司本年度实现净利润200万元，甲公司持有丙公司股票的公允价值为1000万元。 <br />\n" +
                "要求：根据上述资料，不考虑其他因素，分析回答下列小题（答案中金额单位用万元表示）。</p>");
        dataMap.put("questionContent", "<p>增值税扣缴义务发生时间为纳税人支付货款的当天。（&nbsp;&nbsp;&nbsp; ）</p>");
       /* dataMap.put("month", "2");
        dataMap.put("day", "13");
        dataMap.put("auditor", "鑫");
        dataMap.put("phone", "xxxxxxxxxxxxx");
        dataMap.put("weave", "文涛");*/
//      dataMap.put("number", 1);
//      dataMap.put("content", "内容"+2);

      /*  List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 10; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("number", i);
            map.put("content", "内容"+i);
            list.add(map);
        }


        dataMap.put("list", list);*/
    }
}

