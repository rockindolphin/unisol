'use strict';

const gulp = require('gulp'),
	path = require('path'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),//оптимизация jpeg,png gif
	webp = require('gulp-webp'),//конвертер webp
	chokidar = require('chokidar'),// следит за файлами
	imageminMozjpeg = require('imagemin-mozjpeg'),// оптимизация jpeg
	svgSprite = require("gulp-svg-sprite"),//svg спрайты
	spritesmith = require('gulp.spritesmith'),//png спрайты
	imageResize = require('gulp-image-resize'),// генерит изображения разных размеров
	rename = require('gulp-rename'),
	gulpif = require('gulp-if'),
	pug = require('gulp-pug'), // gulp-pug\node_modules\pug\node_modules\pug-parser\lib - отредактировать список тегов
	args   = require('yargs').argv,
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	cssnext = require('postcss-cssnext'),
	concat = require('gulp-concat'),
	file = require('gulp-file'),
	insert = require('gulp-insert'),
	babel = require('gulp-babel'),	
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	miss = require('mississippi'),
	notifier = require('node-notifier'),
	mkdirp = require('mkdirp'),
	w3cjs = require('gulp-w3cjs'),
	through2 = require('through2'),
	dl = require('directory-list'),
	cleanCSS = require('gulp-clean-css'),
	PO = require('pofile'),
	each = require('gulp-each'),
	sass = require('gulp-sass'),
	stringifyObject = require('stringify-object'),
	autoprefixer = require('gulp-autoprefixer'),
	runSequence = require('run-sequence'),
	server = require('gulp-server-livereload');

var config = {
	src: {
		html:  'src/pug/*.pug',
		manifest: 'src/root/**/*',
		js: 'src/js/*.js',
		js_vendors: 'src/js/vendors/*.js',
		css_vendors: 'src/css/vendors/*.css',
		fonts:  'src/fonts/**/*',
		css: [
			'src/css/vendors/normalize.css',
			'src/css/style.css',
			'src/css/blocks/**/*.css'
		],
		bootstrap: 'src/css/bootstrap.scss',
		jssocials: 'src/css/vendors/jssocials/jssocials.scss',
		svg_sprites: 'src/images/sprites/svg/*.svg',
		images:  'src/images/**/*',
	},
	dist: {
		html:  'dist',
		manifest: 'dist',
		js: 'dist/js',
		js_vendors: 'dist/js/vendors',
		css_vendors: 'dist/css/vendors',
		fonts: 'dist/fonts',
		css: 'dist/css',
		bootstrap: 'dist/css',
		jssocials: 'dist/css/vendors',
		svg_sprites: 'dist/images',
		images: 'dist/images',
	},
	watch: {
		html:  'src/pug/*.pug',
		manifest: 'src/root/**/*',
		js: 'src/js/*.js',
		js_vendors: 'src/js/vendors/*.js',
		css_vendors: 'src/css/vendors/*.css',
		fonts:  'src/fonts/**/*',
		css: 'src/css/blocks/**/*.css',
		bootstrap: 'src/css/bootstrap-4.1.2/scss/**/*.scss',
		jssocials: 'src/css/vendors/jssocials/**/*.scss',
		svg_sprites: 'src/images/sprites/svg/*.svg',
		images:  'src/images/**/*',
	},
	browsers: ['last 2 versions','ie >= 11','> 1%'],
	images: {
		webp: true,
		generateSpriteSvg: true,
		sizes: []
	},
	css: {
		blocksFile: 'src/css/blocks/items.json',
	}
};

function err_log(error) { 
	console.log([ 
		'', 
		"----------ERROR MESSAGE START----------", 
		("[" + error.name + " in " + error.plugin + "]"), 
		error.message, 
		"----------ERROR MESSAGE END----------", 
		'' 
	].join('\n')); 
	notifier.notify({ title: 'Error', message: error.plugin }); 
} 

function html(src){
	miss.pipe(
		gulp.src(src),
		pug({pretty: '\t', doctype: 'html', locals: {config: config, path: path, args: args}}),
		/*w3cjs(), 
		through2.obj(function(file, enc, cb){ 
			cb(null, file); 
			if (!file.w3cjs.success){ 
				let w3c = file.w3cjs.messages[0]; 
				err_log({ 
					name: w3c.message, 
					plugin:'w3cjs', 
					message:`${w3c.extract}\r\n lastLine:${w3c.lastLine}\r\n lastColumn:${w3c.lastColumn}`
				}); 
			} 
		}),*/
		gulp.dest( config.dist.html ), 		
		(err) => { 
			if (err) return err_log(err); 
		} 
	)
}

function copyFiles(src, dest){
	miss.pipe(
		gulp.src(src),
		gulp.dest( dest ), 		
		(err) => { 
			if (err) return err_log(err); 
		} 
	)	
}

function js(src){
	miss.pipe(
		gulp.src( src ),
		sourcemaps.init(),
		babel({
			presets: ['env'],
			plugins: ['es6-promise']			
		}),
		browserify({
			insertGlobals : true,
		}),
		gulpif(
			(args.prod || args.production) || args.uglify,
			uglify() 			
		),
		gulpif(
			(args.prod || args.production) || args.uglify,
			rename({
				suffix: '.min'
			})		
		),		
		sourcemaps.write('/'),
		gulp.dest( config.dist.js ),
		(err) => {
			if (err) return err_log(err);
		}
	)	
}

function css(){
	miss.pipe(
		gulp.src( config.src.css ),
		sourcemaps.init(),
		concat('style.css'),
		postcss([
			cssnext({
				browsers: config.browsers,
				features: {
					customProperties: {
						preserve: true
					}
				} 
			}),
		]),	
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			cleanCSS({compatibility: '*'})			
		),
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			rename({
				suffix: '.min'
			})			
		),				
		sourcemaps.write('/'),
		gulp.dest( config.dist.css ), 			
		(err) => {
			if (err) return err_log(err);
		}	
	);			
}

function bootstrap(){
	miss.pipe(
		gulp.src( config.src.bootstrap ),
		sass(),
		autoprefixer({
			browsers: config.browsers
		}), 
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			cleanCSS({compatibility: '*'})			
		),
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			rename({
				suffix: '.min'
			})			
		),			  
		gulp.dest( config.dist.bootstrap ), 
		(err) => {
			if (err) return err_log(err);
		}
	);	
}

function jssocials(){
	miss.pipe(
		gulp.src( config.src.jssocials ),
		sass(),
		autoprefixer({
			browsers: config.browsers
		}),   
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			cleanCSS({compatibility: '*'})			
		),	
		gulpif(
			(args.prod || args.production) || args.cleanCSS,
			rename({
				suffix: '.min'
			})			
		),				 
		gulp.dest( config.dist.jssocials ), 
		(err) => {
			if (err) return err_log(err);
		}
	);	
}

function svg_sprites(){
	gulp.src( config.src.svg_sprites )	
	.pipe(svgSprite({
		mode: {
			symbol: {
				dest: '',
				sprite: 'sprite.svg',
				example: true        
			},
		},
	}))
	.pipe( gulp.dest(config.dist.svg_sprites) )
	.pipe( gulp.dest('src/images') );
}

function WebP(src, quality){
	miss.pipe(
		gulp.src( src ),
		webp({
			quality: quality,
			preset: 'photo',
			method: 6
		}),
		gulp.dest( config.dist.images ),
		(err) => {
			if (err) return err_log(err);
		}		
	)
}

function jpegPngGif(src, quality){
	miss.pipe(
		gulp.src( src ),
		imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 0}),
			imageminMozjpeg({
				quality: quality,
				progressive: true,
			})                 
		]),
		gulp.dest( config.dist.images ),
		(err) => {
			if (err) return err_log(err);
		}				
	)
}

function images(src, quality){
	quality = quality || 100;
	jpegPngGif(src, quality);				
	config.images.webp ? WebP(src, quality) : false;
}

gulp.task('images', [], () => {
	images(config.src.images);
});

gulp.task('svg_sprites', [], () => {
	svg_sprites();
});

gulp.task('jssocials', function(){
	jssocials();
});

gulp.task('bootstrap', function(){
	bootstrap();
});

gulp.task('css', function(){
	css();
});

gulp.task('fonts', () => {
	copyFiles(config.src.fonts, config.dist.fonts);
});

gulp.task('js', () => {
	js(config.src.js);
});

gulp.task('js_vendors', () => {
	copyFiles(config.src.js_vendors, config.dist.js_vendors);
});

gulp.task('css_vendors', () => {
	copyFiles([config.src.css_vendors, '!src/css/vendors/normalize.css'], config.dist.css_vendors);
});

gulp.task('html', [], ()=>{
	html(config.src.html);
});

gulp.task('manifest', [], ()=>{
	copyFiles(config.src.manifest, config.dist.manifest);
});

gulp.task('clean', [], ()=>{
	del.sync( ['./dist/**/*'] );
});

gulp.task('server', [], ()=>{
	return gulp.src( 'dist' )
			.pipe( 
				server({ 
					livereload: true,
					defaultFile: 'index.html', 
					open: false, 
					directoryListing: false 
				}) 
			);
});

gulp.task('watch', function() { 

	let html_watcher = chokidar.watch( config.watch.html, { ignoreInitial: true } ); 
	html_watcher.on('change', (file) => { html(file) }); 
	html_watcher.on('add', (file) => { html(file) }); 

	let manifest_watcher = chokidar.watch( config.watch.manifest, { ignoreInitial: true } ); 
	manifest_watcher.on('change', (file) => { copyFiles(file, config.dist.manifest) }); 
	manifest_watcher.on('add', (file) => { copyFiles(file, config.dist.manifest) }); 

	let js_watcher = chokidar.watch( config.watch.js, { ignoreInitial: true } ); 
	js_watcher.on('change', (file) => { js(file) }); 
	js_watcher.on('add', (file) => { js(file) }); 		

	let js_vendors_watcher = chokidar.watch( config.watch.js_vendors, { ignoreInitial: true } ); 
	js_vendors_watcher.on('change', (file) => { copyFiles(file, config.dist.js_vendors) }); 
	js_vendors_watcher.on('add', (file) => { copyFiles(file, config.dist.js_vendors) }); 		

	let css_vendors_watcher = chokidar.watch( config.watch.css_vendors, { ignored: /normalize\.css/, ignoreInitial: true } ); 
	css_vendors_watcher.on('change', (file) => { copyFiles(file, config.dist.css_vendors) }); 
	css_vendors_watcher.on('add', (file) => { copyFiles(file, config.dist.css_vendors) }); 		

	let fonts_watcher = chokidar.watch( config.watch.fonts, { ignoreInitial: true } ); 
	fonts_watcher.on('change', (file) => { 
		var folder = path.parse(file).dir.split(path.sep).pop();
		copyFiles(file, `${config.dist.fonts}${path.sep}${folder}`); 
	}); 
	fonts_watcher.on('add', (file) => { 
		var folder = path.parse(file).dir.split(path.sep).pop();
		copyFiles(file, `${config.dist.fonts}${path.sep}${folder}`); 
	});

	let css_watcher = chokidar.watch( config.watch.css, { ignoreInitial: true } ); 
	css_watcher.on('change', (file) => { css() }); 
	css_watcher.on('add', (file) => { css() });

	let bootstrap_watcher = chokidar.watch( config.watch.bootstrap, {ignoreInitial: true} );
	bootstrap_watcher.on('change', (file) => { bootstrap() });
	bootstrap_watcher.on('add', (file) => { bootstrap() });	

	let jssocials_watcher = chokidar.watch( config.watch.jssocials, {ignoreInitial: true} );
	jssocials_watcher.on('change', (file) => { jssocials() });
	jssocials_watcher.on('add', (file) => { jssocials() });

	let svg_sprites_watcher = chokidar.watch( config.watch.svg_sprites, {ignoreInitial: true} ); 
	svg_sprites_watcher.on('change', () => { svg_sprites() });	
	svg_sprites_watcher.on('add', () => { svg_sprites() });	

	let images_watcher = chokidar.watch( config.watch.images, { ignored: /sprites/, ignoreInitial: true } );
	images_watcher.on('change', (file) => { images(file) });	
	images_watcher.on('add', (file) => { images(file) });	

});

gulp.task( 'build', ['clean'], function(){
	runSequence(
		'html',
		'images',
		'manifest',
		'js',
		'js_vendors',
		'fonts',
		'css',
		'css_vendors',
		'bootstrap',
		'jssocials',
		'svg_sprites',
	)
});

gulp.task('default', [ 
	'build', 
	'server', 
	'watch' 
]);

const   BEM = require('./bem.js'); 
gulp.task('bem', function() { 
	new Promise((resolve,reject)=>{ 
		gulp.src( config.css.blocksFile ) 
		.pipe(insert.transform(function(contents, file) { 
			resolve( JSON.parse(contents) ); 
			return contents; 
		})); 
	}).then((items)=>{ 
		if( items.length === 0 ){ 
			err_log({message:'empty items.json', plugin: 'bem'}) 
		} 
		BEM(args, items); 
		return items; 
	});     
}); 