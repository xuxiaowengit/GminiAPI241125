const fs=require("fs"),path=require("path"),moveFile=(e,r,s)=>{const c=path.join(r,path.basename(e));fs.mkdir(r,{recursive:!0},(e=>{if(e)return console.error(`Failed to create directory: ${e.message}`);console.log("Directory created successfully!")})),fs.existsSync(r)||fs.mkdirSync(r,{recursive:!0}),fs.copyFile(e,c,(e=>{if(e)return s(e);s(null,"File copied successfully")}))};module.exports=moveFile;