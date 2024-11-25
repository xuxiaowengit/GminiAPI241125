const gulp=require("gulp"),uglify=require("gulp-uglify"),gutil=require("gulp-util"),rimraf=require("rimraf"),fs=require("fs"),fs2=require("fs-extra"),path=require("path");gulp.task("clean",(function(i){console.log("执行清理"),rimraf("dist/**/!(*.git)",i)})),gulp.task("js",gulp.series((function(i){gulp.src("./*.js").pipe(uglify()).pipe(gulp.dest("dist")).on("end",i).on("error",gutil.log)}))),gulp.task("json",gulp.series((function(i){gulp.src("./*.json").pipe(gulp.dest("dist")).on("end",i).on("error",gutil.log)}))),gulp.task("copy-directories",(async function(){try{for(const e of await fs2.readdir("./")){var i=path.join("./",e);console.log("file:",e),(await fs2.stat(i)).isDirectory()&&"node_modules"!==e&&"dist"!==e&&".git"!==e&&"TEMP"!==e&&await fs2.copy(i,path.join("./dist",e))}console.log("Directories copied successfully.")}catch(i){console.error("Failed to copy directories:",i)}})),gulp.task("default",gulp.series("clean","copy-directories","js","json",(function(i){gutil.log("Gulp tasks finished."),i()})));