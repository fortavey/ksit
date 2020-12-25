const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

function clear(){
	return del('build/*');
}


const cssFilesArray = [
	'./src/constant/css/wp.less',
	'./src/constant/css/normalize.less',
	'./src/constant/css/magnific-popup.less',
	'./src/constant/css/slick.less',
	'./src/constant/css/options.less',
];
pushFiles();

function pushFiles() {
	const files = fs.readdirSync(path.join(__dirname, '/src/css'), (err, files) => {
		if(err) throw err;
		return files;
	});

	files.forEach(el => {
		if(el.search(/.less/) !== -1)	cssFilesArray.push('./src/css/' + el);
	});
}


function styles(){
	return gulp.src(cssFilesArray)
				 .pipe(gulpif(isDev, sourcemaps.init()))
				 .pipe(concat('style.less'))
				 .pipe(less())
			   .pipe(gcmq())
			   .pipe(autoprefixer({
					 overrideBrowserslist: ['last 4 versions'],
					 cascade: false
					}))
					.pipe(gulpif(isProd, cleanCSS({
						level: 1
					})))
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}

function html(){
	return gulp.src('./src/*.html')
			   .pipe(gulp.dest('./build'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}
const jsFilesArray = [
	'./src/constant/plugins/slick.min.js',
	'./src/constant/plugins/jquery.magnific-popup.min.js',
];
pushJsFiles();

function pushJsFiles() {
	const files = fs.readdirSync(path.join(__dirname, '/src/js'), (err, files) => {
		if(err) throw err;
		return files;
	});

	files.forEach(el => {
		if(el.search(/.js/) !== -1)	jsFilesArray.push('./src/js/' + el);
	});
}

function js(){
	return gulp.src(jsFilesArray)
				.pipe(gulpif(isDev, sourcemaps.init()))
				.pipe(concat('app.js'))
				.pipe(babel())
				.pipe(uglify())
				.pipe(gulpif(isDev, sourcemaps.write()))
			   	.pipe(gulp.dest('./build/js/'))
			   	.pipe(gulpif(isSync, browserSync.stream()));
}
function img(){
	return gulp.src('./src/img/**/*')
							.pipe(gulp.dest('./build/img'));
}
function fonts(){
	return gulp.src('./src/fonts/**/*')
							.pipe(gulp.dest('./build/fonts'));
}
function moveJquery(){
	return gulp.src('./src/constant/jquery/**/*')
							.pipe(gulp.dest('./build/js/jquery'))
}

function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: "./build/",
	        }
	    });
	}

	gulp.watch('./src/css/**/*.less', styles);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/**/*.html', html);
}

let build = gulp.series(clear, gulp.parallel(styles, html, js, img, fonts, moveJquery));

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));