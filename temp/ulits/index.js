const XLSX=require("xlsx"),generateLog=require("./logger"),path=require("path"),{writeToExcel:writeToExcel,appendDataToExcel:appendDataToExcel,appendToExcel:appendToExcel,checkFileExists:checkFileExists}=require("./outFile"),{readExcelFile:readExcelFile}=require("./readFile"),httpClient=require("./axios"),{saveTextToFile:saveTextToFile}=require("./outFile"),interactWithChatGPT=require("./chatAPI"),fs=require("fs");var outPath="C:\\Users\\jeking\\Desktop\\AI分析结果\\",today=new Date,year=today.getFullYear(),month=(today.getMonth()+1).toString().padStart(2,"0"),day=today.getDate().toString().padStart(2,"0"),hours=today.getHours(),minutes=today.getMinutes(),seconds=today.getSeconds(),milliseconds=today.getMilliseconds(),fullDate=year+"-"+month+"-"+day,dayHour=year+"-"+month+"-"+day+"-"+hours,nowTime=year+"-"+month+"-"+day+" "+hours+"-"+minutes+"-"+seconds+":"+milliseconds+"ms";function updateMilliseconds(){today=new Date,year=today.getFullYear(),month=(today.getMonth()+1).toString().padStart(2,"0"),day=today.getDate().toString().padStart(2,"0"),hours=today.getHours(),minutes=today.getMinutes(),seconds=today.getSeconds(),milliseconds=today.getMilliseconds(),dayHour=year+"-"+month+"-"+day+"-"+hours,fullDate=year+"-"+month+"-"+day,nowTime=year+"-"+month+"-"+day+" "+hours+"-"+minutes+"-"+seconds+":"+milliseconds+"ms",options.nowTime=nowTime,options.fullDate=fullDate,options.dayHour=dayHour}setInterval(updateMilliseconds,1e3);const filePath="./dataIn/第三批测试数据0511.xlsx";let regex=/\/([^\/]+)\.\w+$/,match=filePath.match(regex);const modelName="openchat:7b-v3.5-q6_K";let sanitizedName=modelName.replace(/:/g,"_").replace(/ /g,"_");const myModule=require("./makeExcel");var outfilePath=outPath+"已分析"+match[1]+"记录("+`${sanitizedName})`+dayHour+".xlsx",outfilePath2=outPath+match[1]+"分析失败记录("+`${sanitizedName})`+dayHour+".xlsx";console.log("输出路径:",outfilePath,"--",outfilePath);const logFilePath=path.join(__dirname,"./log/appRun.log"),message=`This is  system log,下面是本次(${nowTime})系统日志：`;function removeLinesWithURLs(e){return e.split(/\r?\n/).filter((e=>!/(https?:\/\/)/.test(e))).join("\n")}generateLog(logFilePath,message);var excledata=[],Failed=[],url1="https://r.jina.ai/";function main(){(async()=>{try{const e=await readExcelFile(filePath);console.log("表格数据:",e[0],e.length),iterateArray(e,(()=>{appendToExcel(outfilePath,dayHour,excledata),today=new Date,milliseconds=today.getMilliseconds(),0!==Failed.length?(appendToExcel(outfilePath2,dayHour,Failed),generateLog(logFilePath,`全部处理完,程序退出！--${nowTime}`),console.log("首轮分析有部分失败:",Failed)):console.log("首轮分析没有失败，数组为空！"),setTimeout((function(){console.log(`全部处理完,分析模型为:${modelName}程序退出`),process.exit()}),1e4)}),e[0][1])}catch(e){console.error("Error reading Excel file:"),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`Error reading Excel file:${e}--${nowTime}`)}})()}function iterateArray(e,t,o){let i=0;!function a(){i<e.length?(console.log("等待处理总数量：",e.length-i,o),getJinaApi(e[i],(()=>{i++,a()}),e[i][1],i,e[i])):t()}()}function getJinaApi(e,t,o,i,e){var a=url1+o;console.log("开始处理第:",i+1,"网站,Url3:",a,",分析模型为:"+modelName),httpClient.get(a,{null:""}).then((a=>{if(a,""!=a){let o=removeLinesWithURLs(a).replace(/(\r\n|\n|\r)|[^\x20-\x7E\u00C0-\u02AF\u0400-\u04FF\u0621-\u064A\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0E00-\u0E7F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]|[^A-Za-z\u00C0-\u02AF\u0400-\u04FF\u0621-\u064A\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0E00-\u0E7F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/gm," ");console.log("已完成第",i+1,"网站获取",e[1]),openchatApiPost(o,e,t,i),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`已完成第${i+1}网站:${e[1]}获取--${nowTime}`)}else today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`jina.ai接口请求返回格式异常数据,--${nowTime}`),array3.splice(0,0,e[0]||"没有数据"),array3.splice(1,0,o),array3.splice(2,0,e[2]||"没有数据"),array3.splice(3,0,e[3]||"没有数据"),array3.splice(4,0,"jinaAPI请求失败!"),Failed.push(array3),saveTextToFile(newText,"./txt/"+e[0]+".txt")})).catch((i=>{var a=[];console.error("jina.ai接口请求失败:",e),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`jina.ai接口请求失败,${i}--${nowTime}`),a.splice(0,0,e[0]||"没有数据"),a.splice(1,0,o),a.splice(2,0,e[2]||"没有数据"),a.splice(3,0,e[3]||"没有数据"),a.splice(4,0,"jinaAPI请求失败!"),Failed.push(a),t()}))}var excelData=[];function openchatApiPost(e,t,o,i){var a="Determine if it is relevant to the Battery business, Energy Storage Business, ESS product, \n            UPS uninterruptible power supply, telecom tower, or PV Solar business.If it is relevant, reply with 1; if not, reply with 0.\n            Only reply with 0 or 1,no analysis or explanation is needed.text is:"+e;const l="原表没有相关属性";console.log("开始第",i+1,"个网站",t[1]+"分析..."),interactWithChatGPT(a,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1YTBlMjIzLWQ0ZGYtNGFkNC1iZjBlLTA3OWIyMTUxYmU5YiJ9.S95yOdHFmevutvd7_w81hBJjA2kKlnAQCdG0b7VwW7s","http://192.168.1.254:11434/v1/chat/completions",modelName).then((a=>{if(a.choices&&a.choices[0].message){console.log("分析结果：",JSON.stringify(a.choices[0].message,null,2)),console.log("已完成第",i+1,"网站",t[1]+"分析"),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`已完成第${i+1}网站:${t[1]}分析--${nowTime}`);var s=[],n=[];if(s.splice(0,0,t[0]||l),s.splice(1,0,t[1]||l)," 1"===a.choices[0].message.content)s.splice(2,0,t[3]||l),s.splice(3,0,"是"),s.splice(4,0,"");else if(" 0"===a.choices[0].message.content)s.splice(2,0,t[3]||l),s.splice(3,0,"非"),s.splice(4,0,"");else{var r="未准确识别！"+a.choices[0].message.content;s.splice(2,0,""),s.splice(3,0,"!!"),s.splice(4,0,r),n.splice(0,0,t[0]||l),n.splice(1,0,t[1]||l),n.splice(2,0,t[2]||l),n.splice(3,0,t[3]||l),n.splice(4,0,"首轮分析失败！"),Failed.push(n)}milliseconds=today.getMilliseconds(),s.splice(5,0,nowTime),excelData.push(s),excledata=excelData}else console.log("openchatAPI返回的数据不含预期的格式结构!"),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`当次openchatAPI返回的数据不含预期的格式结构!:${a.choices[0].message}--${nowTime}`),n.splice(0,0,t[0]||"没有数据"),n.splice(1,0,t[1]||"没有数据"),n.splice(2,0,t[2]||"没有数据"),n.splice(3,0,t[3]||"没有数据"),n.splice(4,0,"chapAPI分析失败，返回格式非预期或没有返回！"),Failed.push(n);const c=1200*Math.random();setTimeout((()=>{console.log(` 分析 ${t[1]} 延时 ${c} ms`),saveTextToFile(e,"./txt/"+t[0]+".txt").then((()=>{console.log("已保存"+t[1]+"到txt!")})).catch((e=>{console.error("An error occurred while saving the file:",e),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`An error occurred while saving the file--${e}`)})),o()}),c)})).catch((e=>{console.error("Error interacting with openChat:",e),today=new Date,milliseconds=today.getMilliseconds(),generateLog(logFilePath,`Error interacting with openChatAPI${e}--${nowTime}`),o()}))}var options={outfilePath:outfilePath,outfilePath2:outfilePath2,nowTime:nowTime,fullDate:fullDate,dayHour:dayHour};function nextMethod(e){console.log("Next method with main:",e),main()}myModule.asyncFunction("data to process",options,(function(e,t){e?console.error("Error:",e):nextMethod(t)}));