angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html><html data-ng-app=ngAPI ng-strict-di><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible , content=\"IE=edge\"><base href=\"/\"><title>GovFish</title><meta name=description content><meta name=viewport content=\"width=device-width\"><style>\n        .ng-hide {\n          display: none!important;\n        }\n        [ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {\n          display: none !important;\n        }\n    </style><link rel=stylesheet href=/bower/bootstrap/dist/css/bootstrap.css><link rel=stylesheet href=/bower/angular-motion/dist/angular-motion.css><link rel=stylesheet href=/bower/angular-loading-bar/build/loading-bar.css><link rel=stylesheet href=/bower/toastr/toastr.css><link rel=stylesheet href=/bower/ionicons/css/ionicons.css><link rel=stylesheet href=/bower/videojs/dist/video-js/video-js.css><link rel=stylesheet href=/bower/flat-ui/dist/css/flat-ui.css><link rel=stylesheet href=/.tmp/stylus/app.css></head><body><section id=content class=ui-view-container><div data-ng-controller=\"Shell as vm\" ng-cloak><div ui-view></div></div></section><script src=/bower/jquery/dist/jquery.js></script><script src=/bower/angular/angular.js></script><script src=/bower/angular-animate/angular-animate.js></script><script src=/bower/angular-strap/dist/angular-strap.js></script><script src=/bower/angular-strap/dist/angular-strap.tpl.js></script><script src=/bower/angular-loading-bar/build/loading-bar.js></script><script src=/bower/angular-ui-router/release/angular-ui-router.js></script><script src=/bower/lodash/dist/lodash.compat.js></script><script src=/bower/restangular/dist/restangular.js></script><script src=/bower/satellizer/satellizer.js></script><script src=/bower/toastr/toastr.js></script><script src=/bower/videojs/dist/video-js/video.js></script><script src=/bower/flat-ui/dist/js/flat-ui.js></script><script src=/bower/angular-sanitize/angular-sanitize.js></script><script src=/js/commons/commons.module.js></script><script src=/js/core/core.module.js></script><script src=/js/exception/exception.module.js></script><script src=/js/layout/layout.module.js></script><script src=/js/logger/logger.module.js></script><script src=/js/login/login.module.js></script><script src=/js/register/register.module.js></script><script src=/js/router/router.module.js></script><script src=/js/services/services.module.js></script><script src=/js/widgets/widgets.module.js></script><script src=/js/routes/client/about/about.module.js></script><script src=/js/routes/client/main/main.module.js></script><script src=/js/routes/client/sample/sample.module.js></script><script src=/js/app.js></script><script src=/js/commons/commons.js></script><script src=/js/commons/dataservice.js></script><script src=/js/commons/viewContentLoaded.js></script><script src=/js/constants/constants.js></script><script src=/js/core/config.js></script><script src=/js/core/constants.js></script><script src=/js/custom/google_analytics.js></script><script src=/js/custom/layout.js></script><script src=/js/exception/exception-handler.provider.js></script><script src=/js/exception/exception.js></script><script src=/js/layout/shell.js></script><script src=/js/logger/logger.js></script><script src=/js/login/login.js></script><script src=/js/register/register.js></script><script src=/js/router/routerhelper.js></script><script src=/js/services/authInterceptor.js></script><script src=/js/services/authToken.js></script><script src=/js/services/restangular.js></script><script src=/js/services/strapAlert.js></script><script src=/js/services/strapModal.js></script><script src=/js/widgets/decode_html.js></script><script src=/js/widgets/isActive.js></script><script src=/js/widgets/isEntered.js></script><script src=/js/widgets/switches.js></script><script src=/js/routes/client/about/config.route.js></script><script src=/js/routes/client/main/config.route.js></script><script src=/js/routes/client/main/main.js></script><script src=/js/routes/client/main/search.js></script><script src=/js/routes/client/sample/config.route.js></script><script src=/js/routes/client/sample/sample.js></script></body></html>");
$templateCache.put("commons/footer.html","<footer class=add-student><div class=container-fluid><div class=row><div class=\"col-sm-3 poweredBy\"><span><i class=\"fa fa-coffee fa-2x\"></i> Powered By</span><ul><li><img src=/images/paragala/codegeeks.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/coml.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/loop_2.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li></ul></div><div class=\"col-sm-6 text-center main-org\"><ul><li><img src=/images/paragala/paragala-logo.png alt=\"Paragala Logo\" class=\"img-responsive paragalaHau\"></li><li><img src=/images/paragala/HAU_logo.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/cict-logo.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li></ul></div><div class=\"col-sm-3 developers\"><span><i class=\"fa fa-laptop fa-2x\"></i> Developers</span><ul><li><a href=https://www.facebook.com/canino.jories><i class=\"fa fa-fire\"></i> Jo-Ries Canino</a></li><li><a href=https://www.facebook.com/mikhael12bis target=_blank><i class=\"fa fa-fire\"></i> Michael Biscante</a></li><li><a href=https://www.facebook.com/gensler.manalastas target=_blank><i class=\"fa fa-fire\"></i> Gensler Manalastas</a></li><li><a href=https://www.facebook.com/renamil02 target=_blank><i class=\"fa fa-fire\"></i> Lorena Dayrit</a></li></ul></div></div></div><div class=sub-footer><div class=container><div class=\"row text-center\"><copyright>2014 © PARAGALA - COMMUNICATIONS\' LEAGUE. All rights reserved.</copyright></div></div></div></footer>");
$templateCache.put("commons/header.html","<nav class=\"navbar navbar-default navbar-lg\" role=navigation ng-cloak><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand ui-sref=main ui-sref-active=active target=_self><img style=\"max-width:200px; margin-top: -7px;\" src=/img/GovFishHeader.png></a></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\"><li ui-sref-active=active><a ui-sref=about>About GovFish</a></li></ul></div></div></nav><alert-info></alert-info>");
$templateCache.put("commons/login.html","<div class=\"modal loginUserAccount\" tabindex=-1 role=dialog ng-controller=\"Login as vm\"><form ng-submit=\"vm.login(loginForm.$valid )\" class=modal-dialog name=loginForm novalidate><div class=modal-content><div class=modal-header><button type=button class=close ng-click=$hide()>&times;</button><h4 class=modal-title>Login</h4></div><div class=modal-body><div class=form-group ng-class=\"{ \'has-error\' : loginForm.email.$invalid &amp;&amp; !loginForm.email.$pristine}\"><alert-login></alert-login><div class=col-xs-12><input class=form-control type=email name=email placeholder=E-mail required ng-model=vm.email ng-minlength=0> <span class=\"glyphicon glyphicon-user\"></span></div><div class=help-block ng-show=\"loginForm.email.$error.required &amp;&amp; loginForm.email.$dirty\">An email address is required</div><div class=help-block ng-show=loginForm.email.$error.email>Please enter an email address</div></div><div class=form-group ng-class=\"{ \'has-error\' : loginForm.password.$invalid &amp;&amp; loginForm.password.$dirty}\"><div class=col-xs-12><input type=password ng-model=vm.password name=password placeholder=Password required ng-minlength=6 class=form-control> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=\"loginForm.password.$error.required &amp;&amp; loginForm.password.$dirty\">Password is Required</div><div class=help-block ng-show=loginForm.password.$error.minlength>Password too Short</div></div></div><div class=modal-footer><input type=submit class=\"btn btn-primary btn-lg\" value=Login></div></div></form></div>");
$templateCache.put("commons/main.html","<div class=\"off-canvas-wrap docs-wrap\" data-offcanvas style=position:fixed><div class=inner-wrap><nav class=tab-bar><section class=left-small><a class=\"left-off-canvas-toggle menu-icon\" aria-expanded=false><span></span></a></section><section class=\"right tab-bar-section\"><h1 class=title>Paragala</h1></section></nav><aside class=left-off-canvas-menu><ul class=off-canvas-list><li><label>Paragala</label></li><li><a href=#/database>Database</a></li><li><a href=#/paragala>Paragala</a></li><li><a href=#/paragala/add-student>Add Student</a></li><li><a href=#/paragala/paragala-results>Results</a></li></ul></aside>{% block section %}{% endblock %} <a class=exit-off-canvas></a></div></div>");
$templateCache.put("commons/paragalaLogin.html","<div class=container><div class=row><div class=\"col-sm-6 col-md-4 col-md-offset-4\"><h1 class=\"text-center login-title\">Sign in to continue to Bootsnipp</h1><div class=account-wall><img class=profile-img src=\"https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120\" alt><form class=form-signin><input type=text class=form-control placeholder=Email required autofocus> <input type=password class=form-control placeholder=Password required> <button class=\"btn btn-lg btn-primary btn-block\" type=submit>Sign in</button> <label class=\"checkbox pull-left\"><input type=checkbox value=remember-me> Remember me</label> <a href=# class=\"pull-right need-help\">Need help?</a><span class=clearfix></span></form></div><a href=# class=\"text-center new-account\">Create an account</a></div></div></div>");
$templateCache.put("commons/register.html","<div class=\"modal register\" tabindex=-1 role=dialog ng-controller=\"Register as vm\"><form ng-submit=\"vm.register(signupForm.$valid, vm.email, vm.username, vm.password, vm.confirmPassword )\" class=modal-dialog name=signupForm novalidate><div class=modal-content><div class=modal-header><button type=button class=close ng-click=$hide()>&times;</button><h4 class=modal-title>Create a Free Account</h4></div><div class=modal-body><div class=form-group ng-class=\"{ \'has-error\' : signupForm.email.$invalid &amp;&amp; !signupForm.email.$pristine}\"><div class=col-xs-12><input type=email name=email ng-model=vm.email class=form-control placeholder=E-mail required ng-blur=vm.checkEmailInBlurred(signupForm)> <span class=\"glyphicon glyphicon-envelope\"></span></div><div class=help-block ng-show=\"signupForm.email.$dirty && signupForm.email.$error.required\">An email address is required</div><div class=help-block ng-show=signupForm.email.$error.email>Please enter an email address</div><div class=help-block ng-show=signupForm.email.$error.taken>That email has been taken, try another one?</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.username.$invalid &amp;&amp; !signupForm.username.$pristine}\"><div class=col-xs-12><input type=text name=username placeholder=Username ng-model=vm.username class=form-control required> <span class=\"glyphicon glyphicon-user\"></span></div><div class=help-block ng-show=\"signupForm.username.$dirty && signupForm.username.$error.required\">A username is required</div><div class=help-block ng-show=signupForm.username.$error.taken>That username has been taken, try another one</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.password.$invalid &amp;&amp; !signupForm.password.$pristine}\"><div class=col-xs-12><input type=password name=password placeholder=Password ng-model=vm.password class=form-control required ng-minlength=6> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=signupForm.$error.minlength>Your password must be at least 6 characters</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.confirmPassword.$invalid &amp;&amp; !signupForm.confirmPassword.$pristine}\"><div class=col-xs-12><input type=password name=confirmPassword placeholder=\"Confirm Password\" ng-model=vm.confirmPassword class=form-control required confirm-password=vm.password> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=\"signupForm.confirmPassword.$dirty && signupForm.confirmPassword.$error.equal\">The passwords must match</div></div></div><div class=modal-footer><input type=submit class=\"btn btn-primary btn-lg\" value=Register></div></div></form></div>");
$templateCache.put("commons/sidebar.html","<div id=sidebar-wrapper><span id=sidebarOnandOff><a href><i class=\"fa fa-certificate faa-spin animated\"></i></a></span><ul class=sidebar-nav><li><a href=#/dashboard class=\"faa-parent animated-hover\"><i class=\"fa fa-tachometer\"></i> <span class=icon-hide>Dashboard</span></a></li><li><a ui-sref=database><i class=\"fa fa-database\"></i> <span class=icon-hide>Database</span></a></li><li><a ui-sref=paragala><i class=\"fa fa-trophy\"></i> <span class=icon-hide>Paragala</span></a></li><li><a ui-sref=paragala_add-student><i class=\"fa fa-male\"></i> <span class=icon-hide>Add Student</span></a></li><li><a ui-sref=paragala_paragala-results><i class=\"fa fa-file-text-o\"></i> <span class=icon-hide>Results</span></a></li><li><a ui-sref=rave><i class=\"fa fa-video-camera\"></i> <span class=icon-hide>Rave</span></a></li></ul></div>");
$templateCache.put("client/about/index.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"container about\"><div class=\"col-lg-8 col-lg-offset-2\"><p class=text-center>Our mission is to collect, organize, and display business opportunities posted by the US government and better connect businesses to those opportunities.</p><p class=text-justify></p></div><div class=\"col-lg-8 col-lg-offset-2\"><h5 class=text-center>How?</h5><ol><li>Collect, organize and display all government business opportunities in one location</li><li>Give this capability to users and business for free</li></ol></div></div>");
$templateCache.put("client/main/index.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"containter main\"><div class=\"col-lg-8 col-lg-offset-2 text-center\"><img src=/img/GovFish.png><p>Helping You Catch Government Business Opportunities</p></div><div class=\"col-lg-8 col-lg-offset-2\"><div class=\"input-group input-group-hg input-group-rounded\" ng-controller=\"Main as vm\"><input type=text class=form-control placeholder=\"Opportunity Keywords Here\" ng-model=vm.keyword is-active is-entered=search> <span class=input-group-btn><button class=\"btn is-active\" ng-click=vm.search()><span class=fui-search></span></button></span></div><p class=text-center>Currently sourcing opportunities from FedBizOpps(<a href=https://www.fbo.gov target=_blank>fbo.gov</a>)</p></div></div>");
$templateCache.put("client/main/item_search.html","item search");
$templateCache.put("client/main/search.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"containter search\" ng-controller=\"Search as vm\"><div class=\"col-lg-8 col-lg-offset-2\"><div class=\"input-group input-group-hg input-group-rounded\"><input type=text class=form-control placeholder=\"Opportunity Keywords Here\" ng-model=vm.keyword is-active is-entered=search> <span class=input-group-btn><button class=\"btn is-active\" ng-click=vm.change_keyword(1)><span class=fui-search></span></button></span></div></div><div class=\"col-lg-12 container\" style=margin-top:40px><div ng-show=\"pageTotal === 0\" class=text-center>No Search Result for <strong><em>{{tempKeyword}}</em></strong></div><div ng-show=\"pageTotal !== 0\" class=pull-left><span ng-bind=showStart></span> <span ng-bind=dash></span> <span ng-bind=showEnd></span> <span ng-bind=of></span> <span ng-bind=pageTotal></span></div><ul class=\"pagination-plain pull-right\" ng-show=\"pageTotal !== 0\"><li class=previous ng-show=previous_hide><a href ng-click=\"vm.change_page(p - 1)\">Previous</a></li><li ng-repeat=\"n in paginateResult\" ng-class=\"{active: {{n}} == p}\"><a href=# ng-click=vm.change_page(n)>{{n}}</a></li><li class=next ng-show=next_hide><a href ng-click=\"vm.change_page(p + 1, vm.pageTotal)\">Next</a></li></ul></div><div class=\"col-lg-12 container\"><div><div ng-repeat=\"result in search_result\"><div class=col-lg-12><h5 style=\"font-size: 20px\"><a href=/item/{{result._source.title}}>{{result._source.title}}</a></h5><div class=row><div class=\"col-lg-4 col-sm-3\"><p style=font-weight:600;opacity:0.7>Solicitation Number: {{result._source.solnbr}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Due Date: {{result._source.close_date | date}}</p></div></div><div class=row><div class=\"col-lg-4 col-sm-3\"><p>Agency: {{result._source.agency}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Posted Date: {{result._source.posted_date | date}}</p></div></div><div class=row><div class=col-lg-12><p>Office: {{result._source.office}}</p></div></div><p class=description ng-bind-html=result.highlight.description[0]></p></div></div></div></div><div class=col-lg-12><div ng-show=\"pageTotal !== 0\" class=pull-left><span ng-bind=showStart></span> <span ng-bind=dash></span> <span ng-bind=showEnd></span> <span ng-bind=of></span> <span ng-bind=pageTotal></span></div><ul class=\"pagination-plain pull-right\" ng-show=\"pageTotal !== 0\"><li class=previous ng-show=previous_hide><a href ng-click=\"vm.change_page(p - 1)\">Previous</a></li><li ng-repeat=\"n in paginateResult\" ng-class=\"{active: {{n}} == p}\"><a href=# ng-click=vm.change_page(n)>{{n}}</a></li><li class=next ng-show=next_hide><a href ng-click=\"vm.change_page(p + 1, paginateResult.length)\">Next</a></li></ul></div></div>");
$templateCache.put("client/sample/index.html","Welcome to the Sample Page");}]);