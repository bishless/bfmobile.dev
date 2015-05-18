var gulp 		= require('gulp'),
	gutil 		= require('gulp-util'),
	jshint		= require('gulp-jshint'),
	concat		= require('gulp-concat'),
	rename		= require('gulp-rename'),
	uglify		= require('gulp-uglify'),
	sass 		= require('gulp-sass'),
	sourcemaps	= require('gulp-sourcemaps'),
	prefix		= require('gulp-autoprefixer'),
	filter		= require('gulp-filter'),
	bs			= require('browser-sync'),
	reload		= bs.reload;


//gulp.task('jshint', function() {
//	return gulp.src(['js_src/**/*.js', 'gulpfile.js'])
//		.pipe(jshint())
//		.pipe(jshint.reporter('jshint-stylish'));
//});
//
//gulp.task('build-js', function() {
//	return gulp.src([
//			'js_src/navigation.js',
//			'js_src/skip-link-focus-fix.js'
//		])
//		.pipe(uglify())
//		.pipe(sourcemaps.init())
//			.pipe(concat('script.min.js', {newLine: '\n'}))
//		.pipe(sourcemaps.write('./'))
//		.pipe(gulp.dest('js'));
//});

gulp.task('build-css', function () {
	return gulp.src(['scss/main.scss'])
		.pipe(sourcemaps.init()) // Process the original sources
			.pipe(sass({
				errLogToConsole: true,
				outputStyle: 'compressed'
			}))
			.pipe(prefix({
				browsers: ['last 2 versions'],
				cascade: true
			})) // Autoprefixer FTW
		.pipe(sourcemaps.write('./')) // Add the map to the modified source.
		.pipe(gulp.dest('css'))
		.pipe(filter('**/*.css')) // Filter stream to only css files for BS
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
	bs({
		proxy: "bfmobile.dev",
		browser: "firefox"
	});
});

gulp.task('bs-reload', function() {
	bs.reload();
});

gulp.task('bacon', ['browser-sync'], function() {
	gulp.watch('scss/*.scss', ['build-css']);
});

gulp.task('default', ['browser-sync'], function() {
	// gulp.watch('js_src/*.js', ['build-js', 'build-admin-js', 'bs-reload']); // Watch for changes to JS
	gulp.watch('scss/**/*.scss', ['build-css']); // Watch for changes to CSS
	gulp.watch('**/*.html', ['bs-reload']); // Watch for changes to HTML
});
