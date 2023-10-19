import gulp from 'gulp';                     // oh great and mighty!
import htmlmin from 'gulp-htmlmin';          // minify the html
import concat from 'gulp-concat';            // concatenate several files into one
import minify from 'gulp-minify';            // minify the JS
import cleanCSS from 'gulp-clean-css';       // minify the CSS
import clean from 'gulp-clean';              // removing files
import browserSync from 'browser-sync';      // sync browsers while deving
import imagemin from 'gulp-imagemin';						// minify images



const html = () => {
	return gulp.src('./src/*.html')                  // take all html files from source folder
		.pipe(htmlmin({ collapseWhitespace: true }))   // minify the html
		.pipe(gulp.dest('./dist'))                     // put them into the destination folder
	;
};

const js = () => {
	return gulp.src('./src/scripts/**/*.js')          // take all .js from all these folders
		.pipe(concat('script.js'))                      // concatenate them into one file
		.pipe(minify({                                  // minify the result
			ext:{
				src:'.js',                                  // full-size file naming
				min:'.min.js'                               // minified file naming
		},
		}))
		.pipe(gulp.dest('./dist/scripts'))              // put .js and .min.js into the destination folder
	;
};

const css = () => {
	return gulp.src('./src/styles/**/*.css')          // take all .css from all these folders
		.pipe(concat('styles.css'))                     // concatenate them into one file
		.pipe(cleanCSS({compatibility: 'ie8'}))				  // minify CSS
		.pipe(gulp.dest('./dist/styles'))               // put them into the destination folder
	;
};

const cleanDist = () => {
	return gulp.src('./dist', {read: false})					// delete the destination folder
		.pipe(clean())
	;
};

const image = () => {
	return gulp.src('./src/images/**/*.*')						// get all files in these (sub)folders
		.pipe(imagemin())																// minify them
		.pipe(gulp.dest('./dist/images'))               // put them into the destination folder
	;
}

const watcher = () => {
	gulp.watch('./src/*.html',                        html).on('all', browserSync.reload);
	gulp.watch('./src/styles/**/*.{sass,scss,css}',    css).on('all', browserSync.reload);
	gulp.watch('./src/scripts/**/*.js',                 js).on('all', browserSync.reload);
	gulp.watch('./src/images/**/*.js',               image).on('all', browserSync.reload);
};

const server = () => {
	browserSync.init({
		server: {
				baseDir: "./dist"
		}
});
}



gulp.task('cleanDist', cleanDist);
gulp.task('html', html);
gulp.task('script', js);
gulp.task('style', css);
gulp.task('browser-sync', server);
gulp.task('image', image);



// BUILD & DEV:
// 
// run "gulp dev" to continue work.
// run "gulp build" to build the final result.

gulp.task('dev', gulp.series(
	gulp.parallel(html, css, js, image),
	gulp.parallel(server, watcher)
));

gulp.task('build', gulp.series( 
	cleanDist, 
	gulp.parallel(html, css, js, image)
));
