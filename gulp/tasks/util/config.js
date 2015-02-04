
/*
 * Path for the css, js, and templates
 *
 */

var path = require('path')

exports.js = function () {
	var js = []
	var jsFiles = [
		'/js/custom/*.js'
	]

	jsFiles.forEach(function (path) {
		js.push('app/public' + path)
	})
	return js;
}

exports.bowerJs = function () {
	var root = path.normalize(__dirname + '/../../');
	var bower = []
	var bowerFiles = [
		'/bower_components/jquery/dist/jquery.js',
		'/bower_components/bootstrap/dist/js/bootstrap.js',
		'/bower_components/angular/angular.js',
		'/bower_components/angular-route/angular-route.js',
		'/bower_components/lodash/dist/lodash.compat.js',
		'/bower_components/restangular/dist/restangular.js',
		'/bower_components/ace-builds/src-min-noconflict/ace.js',
		'/bower_components/angular-ui-ace/ui-ace.js'
		//'/js/custom/vendor/**/*.js'
	]

	bowerFiles.forEach(function (path) {
		bower.push('app' + path)
	})
	return bower;
}

exports.css = function () {
	var root = path.normalize(__dirname + '/../../');
	var css = [];
	var cssFiles = [
		'/compileCss/stylus/*.css'
	]

	cssFiles.forEach(function (path) {
		css.push('app/public' + path)
	})

	return css;
}

exports.bowerCss = function () {
	var root = path.normalize(__dirname + '/../../');
	var bowerCss = [];
	var bowerCssFiles = [
		'/bower_components/bootstrap/dist/css/bootstrap.css',
		'/bower_components/components-font-awesome/css/font-awesome.css',
		'/bower_components/font-awesome-animation/dist/font-awesome-animation.css'
	]

	bowerCssFiles.forEach(function (path) {
		bowerCss.push('app' + path)
	})

	return bowerCss;
}



exports.module = function () {
	var module = []
	var moduleFiles = [
		'/js/app.js'
	]

	moduleFiles.forEach(function (path) {
		module.push('app/public' + path)
	})
	return module;
}

exports.services = function () {
	var services = [];
	var serviceFiles = [
		'/js/services/*.js'
	]

	serviceFiles.forEach(function (path) {
		services.push('app/public' + path)
	})
	return services;
}

exports.controllers = function () {
	var controllers = []
	var ctrlFiles = [
		'/js/controllers/layout.js',
		'/js/controllers/database.js'
	]

	ctrlFiles.forEach(function (path) {
		controllers.push('app/public' + path)
	})
	return controllers
}

exports.directives = function () {
	var directives = []
	var directivesFiles = [
		'/js/directives/*.js'
	]

	directivesFiles.forEach(function (path) {
		directives.push('app/public' + path)
	})
	return directives
}

exports.rootMain = function () {
	var root = path.normalize(__dirname + '/../../');
	return root
}
