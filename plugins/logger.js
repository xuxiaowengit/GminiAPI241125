const fs=require("fs"),path=require("path");function generateLog(e,o){const r=`${(new Date).toISOString()}: ${o}\n`;fs.appendFile(e,r,(e=>{e?console.error("Error writing to log file:",e):console.log("Log message written to log file:",r.trim())}))}module.exports=generateLog;