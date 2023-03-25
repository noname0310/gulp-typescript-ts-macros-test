import gulp from "gulp";
import gulpTypescript from "gulp-typescript";
import tsMacros from "ts-macros";
import ts from "typescript";

const tsProject = gulpTypescript.createProject(
    "tsconfig.json",
    {
        getCustomTransformers: (program?: ts.Program) => {
            console.log(program === undefined); // Note: this will be true when isolatedModules is true.
            return {
                before: [tsMacros(program!) as unknown as ts.CustomTransformerFactory]
            };
        },
        isolatedModules: true // Note: this config occurs error.
    });

gulp.task("scripts", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("watch", 
    gulp.series(
        "scripts",
        () => gulp.watch("src/**/*.ts", gulp.series("scripts")))
);
