const fs=require("fs").promises,path=require("path");let readFiles=new Set;async function readFileContent(e,t){try{const n=await fs.readFile(e,"utf8");readFiles.add(e,t);const o=/\\([^\\]*?)(?=\.txt$)/,r=e.match(o)[1];return console.log("完成第"+t|"问题读取！个文件读取,",r),{data:n,email:r}}catch(t){throw console.error(`Error reading file ${e}:`,t),t}}let conuts=0;async function getNewTxtFilePath(e){try{const t=(await fs.readdir(e,{withFileTypes:!0})).filter((t=>t.isFile()&&t.name.endsWith(".txt")&&!readFiles.has(path.join(e,t.name)))).map((t=>path.join(e,t.name)));return console.log("一共有",t.length,"个文件等待处理！"),t.length>0?(console.log(" TxtFiles.length ",t.length),conuts++,t[0]):(console.log("全部文本处理完毕,共计:",conuts,"个Txt文件。"),"")}catch(e){throw console.error("Error getting new txt file path:",e),e}}module.exports={readFileContent:readFileContent,getNewTxtFilePath:getNewTxtFilePath};