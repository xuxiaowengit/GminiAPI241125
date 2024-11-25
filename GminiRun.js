const fileProcessor=require("./plugins/readyNtxt.js"),directoryPath="./dataIn/待处理TXT",moveFile=require("./plugins/removeFile.js"),fs=require("fs"),path=require("path"),{qusetionRes:qusetionRes}=require("./qusetionTxt.js"),moment=require("moment"),filterString=require("./plugins/filterString.js"),generateLog=require("./plugins/logger.js"),logFilePath=path.join(__dirname,"./log/appRun.log"),message="This is system log,下面是本次系统运行日志：";generateLog(logFilePath,message);const generateContent=require("./Gmini.js"),moveFiles=require("./plugins/fileMover.js"),sourceDir="./outExe/GminiResData",targetDir="./outExe/lastRunDataBackup";moveFiles(sourceDir,targetDir).then((()=>{console.log("数据备份完成")})).catch((r=>{console.error("数据备份失败:",r)}));const{createExcelFile:createExcelFile,appendToExcel:appendToExcel}=require("./plugins/outFile.js");var resData=[],resError=[],resOther=[];function delay(r){return console.log("延时",r,"毫秒"),new Promise((e=>setTimeout(e,r)))}var readyTxtName="";const destDir="outExe/GminiResData/";let currentDateTime=moment().format("MM-DD HH-mm-ss");const errTxtPath=path.join(destDir,"移出的TXT-"+currentDateTime);fs.mkdir(errTxtPath,{recursive:!0},(r=>{if(r)return console.error(`Failed to create directory: ${r.message}`);console.log("Directory created successfully!")}));var arrryStr=[],arrryStr2=[],arrryStr3=[];async function processTxtFiles(r=0){r=1;try{let l;do{if(l=await fileProcessor.getNewTxtFilePath(directoryPath),console.log("filePath:",l),""!==l&&null!==l){const i=await qusetionRes(),n=await fileProcessor.readFileContent(l,r);var e='"'+n.data+'"'+i,t="";try{const i=await generateContent(e);if(t=JSON.stringify(i),""!=i&&null!=i&&"error"!=i.reqStatus&&"ErrorResponse"!=i.reqStatus&&"ErrorRequest"!=i.reqStatus&&"ErrorMessage"!=i.reqStatus&&"接口请求未成功！请检查地址或网络!"!==i.apiError&&i.parts.length>0){var o=JSON.stringify(i.parts[0].text),a=i.parts[0].text,s=filterString.filter(a);if(console.log("分析结果:",s,",返回TXT:",o),console.log("API返回:",t),i.parts.length>0)if(""!==i.parts[0].text&&null!==i.parts[0].text&&void 0!==i.parts[0].text)if("Y111"==s){arrryStr.push(n.email),arrryStr.push("GminiChatV1.5"),arrryStr.push(s);let r=moment().format("MM-DD HH:mm:ss");arrryStr.push(r),resData.push(arrryStr),console.log("arrryStr:",arrryStr),arrryStr=[]}else if("N000"==s){arrryStr2.push(n.email),arrryStr2.push("GminiChatV1.5"),arrryStr2.push(s);let r=moment().format("MM-DD HH:mm:ss");arrryStr2.push(r),resError.push(arrryStr2),console.log("arrryStr2:",arrryStr2),arrryStr2=[]}else{arrryStr3.push(n.email),arrryStr3.push("GminiChatV1.5"),arrryStr3.push("NOT! 0 OR 1 ,"+t);let r=moment().format("MM-DD HH:mm:ss");arrryStr3.push(r),moveFile(l,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成!",e)})),resOther.push(arrryStr3),console.log("arrryStr3-1:",arrryStr3),arrryStr3=[]}else{readyTxtName=l,console.log("第",r,"个,",i.parts.length),arrryStr3.push(n.email),arrryStr3.push("GminiChatV1.5"),arrryStr3.push("返回数据异常,"+t),generateLog(logFilePath,"API返回数据异常:"+n.email);let e=moment().format("MM-DD HH:mm:ss");arrryStr3.push(e),moveFile(l,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成！",e)})),resOther.push(arrryStr3),console.log("arrryStr3-2:",arrryStr3),arrryStr3=[]}else{readyTxtName=l,arrryStr3.push(n.email),arrryStr3.push("GminiChatV1.5"),arrryStr3.push("返回数据格式不匹配,"),console.log("第",r,"个文本数据chatAPI返回异常:",arrryStr),generateLog(logFilePath,"第"+r+"个文件分析");let e=moment().format("MM-DD HH:mm:ss");arrryStr3.push(e),moveFile(l,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成！",e)})),resOther.push(arrryStr3),console.log("arrryStr3-3:",arrryStr3),arrryStr3=[]}}else{readyTxtName=l,arrryStr3.push(n.email),arrryStr3.push("GminiChatV1.5"),arrryStr3.push("返回数据为空！,");let e=moment().format("MM-DD HH:mm:ss");arrryStr3.push(e),console.log("第",r,"个文本分析异常,chatAPI返回无效格式或接口不存在!",JSON.stringify(i)),generateLog(logFilePath,"result为空:"+JSON.stringify(i)),moveFile(l,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成！",e)})),resOther.push(arrryStr3),console.log("arrryStr3-4:",arrryStr3),arrryStr3=[]}}catch(e){readyTxtName=l,console.log("第",r,"个文本处理过程中出现异常，导致中断退出！",e),arrryStr3.push(n.email),arrryStr3.push("GminiChatV1.5"),arrryStr3.push("处理过程中出现异常错误导致循环中断！,");let t=moment().format("MM-DD HH:mm:ss");arrryStr3.push(t),generateLog(logFilePath,e),moveFile(l,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成！",e)})),resOther.push(arrryStr3),console.log("arrryStr3-5:",arrryStr3),arrryStr3=[]}finally{console.log("完成第",r,"个TXT文件处理,模型是:","GminiChatV1.5"),arrryStr=[],arrryStr2=[],arrryStr3=[],r++}}else readyTxtName=l,console.log("TXT文件内容为空或已处理完！"),generateLog(logFilePath,"文件处理完！共计:"+(r-1)+"个。");await delay(3e3)}while(l);let i=moment().format("MM-DD HH-mm-ss");console.log("resData:",resData),console.log("resError:",resError),console.log("resOther:",resOther),resData.length>0&&createExcelFile(resData,"./outExe/GminiResData/为1的-"+i+".xlsx","sheet1"),resError.length>0&&createExcelFile(resError,"./outExe/GminiResData/为0的-"+i+".xlsx","sheet1"),resOther.length>0&&createExcelFile(resOther,"./outExe/GminiResData/非1或0&Error-"+i+".xlsx","sheet1"),generateLog(logFilePath,"完成全部"+(r-1)+"个文本数据处理！并保存了全部数据！")}catch(r){console.error("An error occurred:",r),generateLog(logFilePath,r)}}async function handleResult(r,e,t,o){const a=moment().format("MM-DD HH:mm:ss");let s=[];if(""!==e.parts[0].text&&null!==e.parts[0].text){const o=filterString.filter(e.parts[0].text);s.push(r.email,"GminiChatV1.5",o,a),"Y111"===o?resData.push(s):"N000"===o?resError.push(s):(s[2]="NOT! 0 OR 1 ,"+t,moveFile(filePath,errTxtPath,((r,e)=>{r?console.error("Error moving file:",r):console.log("失败的txt挪出完成!",e)})),resOther.push(s))}}processTxtFiles();