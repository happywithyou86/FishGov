angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html><html data-ng-app=ngAPI ng-strict-di><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible , content=\"IE=edge\"><base href=\"/\"><title>GovFish</title><meta name=description content><meta name=viewport content=\"width=device-width\"><style>\n        .ng-hide {\n          display: none!important;\n        }\n        [ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {\n          display: none !important;\n        }\n    </style><link rel=stylesheet href=/bower/bootstrap/dist/css/bootstrap.css><link rel=stylesheet href=/bower/angular-motion/dist/angular-motion.css><link rel=stylesheet href=/bower/angular-loading-bar/build/loading-bar.css><link rel=stylesheet href=/bower/toastr/toastr.css><link rel=stylesheet href=/bower/ionicons/css/ionicons.css><link rel=stylesheet href=/bower/videojs/dist/video-js/video-js.css><link rel=stylesheet href=/bower/flat-ui/dist/css/flat-ui.css><link rel=stylesheet href=/bower/font-awesome/css/font-awesome.css><link rel=stylesheet href=/bower/bootstrap-social/bootstrap-social.css><link rel=stylesheet href=/.tmp/stylus/app.css></head><body><section id=content class=ui-view-container><div data-ng-controller=\"Shell as vm\" ng-cloak><div ui-view></div></div></section><script src=/bower/jquery/dist/jquery.js></script><script src=/bower/angular/angular.js></script><script src=/bower/angular-animate/angular-animate.js></script><script src=/bower/angular-strap/dist/angular-strap.js></script><script src=/bower/angular-strap/dist/angular-strap.tpl.js></script><script src=/bower/angular-loading-bar/build/loading-bar.js></script><script src=/bower/angular-ui-router/release/angular-ui-router.js></script><script src=/bower/lodash/dist/lodash.compat.js></script><script src=/bower/restangular/dist/restangular.js></script><script src=/bower/satellizer/satellizer.js></script><script src=/bower/toastr/toastr.js></script><script src=/bower/videojs/dist/video-js/video.js></script><script src=/bower/flat-ui/dist/js/flat-ui.js></script><script src=/bower/angular-sanitize/angular-sanitize.js></script><script src=/bower/oboe/dist/oboe-browser.js></script><script src=/js/commons/commons.module.js></script><script src=/js/core/core.module.js></script><script src=/js/exception/exception.module.js></script><script src=/js/layout/layout.module.js></script><script src=/js/logger/logger.module.js></script><script src=/js/login/login.module.js></script><script src=/js/register/register.module.js></script><script src=/js/router/router.module.js></script><script src=/js/services/services.module.js></script><script src=/js/widgets/widgets.module.js></script><script src=/js/routes/client/about/about.module.js></script><script src=/js/routes/client/main/main.module.js></script><script src=/js/routes/client/sample/sample.module.js></script><script src=/js/app.js></script><script src=/js/commons/commons.js></script><script src=/js/commons/dataservice.js></script><script src=/js/commons/oboe_data_service.js></script><script src=/js/commons/viewContentLoaded.js></script><script src=/js/constants/constants.js></script><script src=/js/core/config.js></script><script src=/js/core/constants.js></script><script src=/js/custom/google_analytics.js></script><script src=/js/custom/layout.js></script><script src=/js/exception/exception-handler.provider.js></script><script src=/js/exception/exception.js></script><script src=/js/layout/shell.js></script><script src=/js/logger/browser.js></script><script src=/js/logger/logger.js></script><script src=/js/login/login.js></script><script src=/js/register/register.js></script><script src=/js/router/routerhelper.js></script><script src=/js/services/authInterceptor.js></script><script src=/js/services/authToken.js></script><script src=/js/services/default_filter.js></script><script src=/js/services/default_results.js></script><script src=/js/services/local_storage.js></script><script src=/js/services/restangular.js></script><script src=/js/services/strapAlert.js></script><script src=/js/services/strapModal.js></script><script src=/js/widgets/checkbox.js></script><script src=/js/widgets/checkboxoptionisaward.js></script><script src=/js/widgets/checkboxoptionissolesource.js></script><script src=/js/widgets/filter_services.js></script><script src=/js/widgets/html_filter.js></script><script src=/js/widgets/isActive.js></script><script src=/js/widgets/isEntered.js></script><script src=/js/widgets/off_canvas.js></script><script src=/js/widgets/saved_count.js></script><script src=/js/widgets/saved_star.js></script><script src=/js/widgets/switches.js></script><script src=/js/widgets/tooltip_linkedin.js></script><script src=/js/routes/client/about/about.js></script><script src=/js/routes/client/about/config.route.js></script><script src=/js/routes/client/main/config.route.js></script><script src=/js/routes/client/main/filter_services.js></script><script src=/js/routes/client/main/item_search.js></script><script src=/js/routes/client/main/main.js></script><script src=/js/routes/client/main/search.js></script><script src=/js/routes/client/main/user_saved_items.js></script><script src=/js/routes/client/sample/config.route.js></script><script src=/js/routes/client/sample/sample.js></script></body></html>");
$templateCache.put("commons/footer.html","<footer class=add-student><div class=container-fluid><div class=row><div class=\"col-sm-3 poweredBy\"><span><i class=\"fa fa-coffee fa-2x\"></i> Powered By</span><ul><li><img src=/images/paragala/codegeeks.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/coml.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/loop_2.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li></ul></div><div class=\"col-sm-6 text-center main-org\"><ul><li><img src=/images/paragala/paragala-logo.png alt=\"Paragala Logo\" class=\"img-responsive paragalaHau\"></li><li><img src=/images/paragala/HAU_logo.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li><li><img src=/images/paragala/cict-logo.png alt=\"Paragala Logo\" class=\"img-responsive hau\"></li></ul></div><div class=\"col-sm-3 developers\"><span><i class=\"fa fa-laptop fa-2x\"></i> Developers</span><ul><li><a href=https://www.facebook.com/canino.jories><i class=\"fa fa-fire\"></i> Jo-Ries Canino</a></li><li><a href=https://www.facebook.com/mikhael12bis target=_blank><i class=\"fa fa-fire\"></i> Michael Biscante</a></li><li><a href=https://www.facebook.com/gensler.manalastas target=_blank><i class=\"fa fa-fire\"></i> Gensler Manalastas</a></li><li><a href=https://www.facebook.com/renamil02 target=_blank><i class=\"fa fa-fire\"></i> Lorena Dayrit</a></li></ul></div></div></div><div class=sub-footer><div class=container><div class=\"row text-center\"><copyright>2014 © PARAGALA - COMMUNICATIONS\' LEAGUE. All rights reserved.</copyright></div></div></div></footer>");
$templateCache.put("commons/header.html","<nav class=\"navbar navbar-default navbar-lg\" role=navigation ng-cloak><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand ui-sref=main ui-sref-active=active target=_self><img style=\"max-width:200px; margin-top: -7px;\" src=/img/GovFishHeader.png></a></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav navbar-right\" ng-controller=\"Login as vm\"><li ng-hide=\"vm.photo !== undefined\"><a class=\"btn btn-social-icon btn-linkedin\" tooltip-linked-in ng-click=\"vm.authenticate(\'linkedin\')\"><i class=\"fa fa-linkedin\"></i></a></li><li ng-show=\"vm.photo !== undefined\" class=text-center ui-sref-active=active><a ui-sref=user_saved_items><i class=\"fa fa-star\" saved-count>Saved ({{saved_items_temp.length || saved_count}})</i></a></li><li ng-show=\"vm.photo !== undefined\" class=text-center><img src={{vm.photo}} class=\"img-circle img-responsive\" style=\"height:50px;margin: 0 auto;margin-top:12px;\"></li><li ng-show=\"vm.photo !== undefined\" class=text-center><a href ng-click=vm.log_out()>Log Out</a></li><li ui-sref-active=active class=text-center><a ui-sref=about target=_self>About GovFish</a></li></ul></div></div></nav>");
$templateCache.put("commons/login.html","<div class=\"modal loginUserAccount\" tabindex=-1 role=dialog ng-controller=\"Login as vm\"><form ng-submit=\"vm.login(loginForm.$valid )\" class=modal-dialog name=loginForm novalidate><div class=modal-content><div class=modal-header><button type=button class=close ng-click=$hide()>&times;</button><h4 class=modal-title>Login</h4></div><div class=modal-body><div class=form-group ng-class=\"{ \'has-error\' : loginForm.email.$invalid &amp;&amp; !loginForm.email.$pristine}\"><alert-login></alert-login><div class=col-xs-12><input class=form-control type=email name=email placeholder=E-mail required ng-model=vm.email ng-minlength=0> <span class=\"glyphicon glyphicon-user\"></span></div><div class=help-block ng-show=\"loginForm.email.$error.required &amp;&amp; loginForm.email.$dirty\">An email address is required</div><div class=help-block ng-show=loginForm.email.$error.email>Please enter an email address</div></div><div class=form-group ng-class=\"{ \'has-error\' : loginForm.password.$invalid &amp;&amp; loginForm.password.$dirty}\"><div class=col-xs-12><input type=password ng-model=vm.password name=password placeholder=Password required ng-minlength=6 class=form-control> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=\"loginForm.password.$error.required &amp;&amp; loginForm.password.$dirty\">Password is Required</div><div class=help-block ng-show=loginForm.password.$error.minlength>Password too Short</div></div></div><div class=modal-footer><input type=submit class=\"btn btn-primary btn-lg\" value=Login></div></div></form></div>");
$templateCache.put("commons/main.html","<div class=\"off-canvas-wrap docs-wrap\" data-offcanvas style=position:fixed><div class=inner-wrap><nav class=tab-bar><section class=left-small><a class=\"left-off-canvas-toggle menu-icon\" aria-expanded=false><span></span></a></section><section class=\"right tab-bar-section\"><h1 class=title>Paragala</h1></section></nav><aside class=left-off-canvas-menu><ul class=off-canvas-list><li><label>Paragala</label></li><li><a href=#/database>Database</a></li><li><a href=#/paragala>Paragala</a></li><li><a href=#/paragala/add-student>Add Student</a></li><li><a href=#/paragala/paragala-results>Results</a></li></ul></aside>{% block section %}{% endblock %} <a class=exit-off-canvas></a></div></div>");
$templateCache.put("commons/paragalaLogin.html","<div class=container><div class=row><div class=\"col-sm-6 col-md-4 col-md-offset-4\"><h1 class=\"text-center login-title\">Sign in to continue to Bootsnipp</h1><div class=account-wall><img class=profile-img src=\"https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120\" alt><form class=form-signin><input type=text class=form-control placeholder=Email required autofocus> <input type=password class=form-control placeholder=Password required> <button class=\"btn btn-lg btn-primary btn-block\" type=submit>Sign in</button> <label class=\"checkbox pull-left\"><input type=checkbox value=remember-me> Remember me</label> <a href=# class=\"pull-right need-help\">Need help?</a><span class=clearfix></span></form></div><a href=# class=\"text-center new-account\">Create an account</a></div></div></div>");
$templateCache.put("commons/register.html","<div class=\"modal register\" tabindex=-1 role=dialog ng-controller=\"Register as vm\"><form ng-submit=\"vm.register(signupForm.$valid, vm.email, vm.username, vm.password, vm.confirmPassword )\" class=modal-dialog name=signupForm novalidate><div class=modal-content><div class=modal-header><button type=button class=close ng-click=$hide()>&times;</button><h4 class=modal-title>Create a Free Account</h4></div><div class=modal-body><div class=form-group ng-class=\"{ \'has-error\' : signupForm.email.$invalid &amp;&amp; !signupForm.email.$pristine}\"><div class=col-xs-12><input type=email name=email ng-model=vm.email class=form-control placeholder=E-mail required ng-blur=vm.checkEmailInBlurred(signupForm)> <span class=\"glyphicon glyphicon-envelope\"></span></div><div class=help-block ng-show=\"signupForm.email.$dirty && signupForm.email.$error.required\">An email address is required</div><div class=help-block ng-show=signupForm.email.$error.email>Please enter an email address</div><div class=help-block ng-show=signupForm.email.$error.taken>That email has been taken, try another one?</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.username.$invalid &amp;&amp; !signupForm.username.$pristine}\"><div class=col-xs-12><input type=text name=username placeholder=Username ng-model=vm.username class=form-control required> <span class=\"glyphicon glyphicon-user\"></span></div><div class=help-block ng-show=\"signupForm.username.$dirty && signupForm.username.$error.required\">A username is required</div><div class=help-block ng-show=signupForm.username.$error.taken>That username has been taken, try another one</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.password.$invalid &amp;&amp; !signupForm.password.$pristine}\"><div class=col-xs-12><input type=password name=password placeholder=Password ng-model=vm.password class=form-control required ng-minlength=6> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=signupForm.$error.minlength>Your password must be at least 6 characters</div></div><div class=form-group ng-class=\"{ \'has-error\' : signupForm.confirmPassword.$invalid &amp;&amp; !signupForm.confirmPassword.$pristine}\"><div class=col-xs-12><input type=password name=confirmPassword placeholder=\"Confirm Password\" ng-model=vm.confirmPassword class=form-control required confirm-password=vm.password> <span class=\"glyphicon glyphicon-lock\"></span></div><div class=help-block ng-show=\"signupForm.confirmPassword.$dirty && signupForm.confirmPassword.$error.equal\">The passwords must match</div></div></div><div class=modal-footer><input type=submit class=\"btn btn-primary btn-lg\" value=Register></div></div></form></div>");
$templateCache.put("commons/sidebar.html","<div id=sidebar-wrapper><span id=sidebarOnandOff><a href><i class=\"fa fa-certificate faa-spin animated\"></i></a></span><ul class=sidebar-nav><li><a href=#/dashboard class=\"faa-parent animated-hover\"><i class=\"fa fa-tachometer\"></i> <span class=icon-hide>Dashboard</span></a></li><li><a ui-sref=database><i class=\"fa fa-database\"></i> <span class=icon-hide>Database</span></a></li><li><a ui-sref=paragala><i class=\"fa fa-trophy\"></i> <span class=icon-hide>Paragala</span></a></li><li><a ui-sref=paragala_add-student><i class=\"fa fa-male\"></i> <span class=icon-hide>Add Student</span></a></li><li><a ui-sref=paragala_paragala-results><i class=\"fa fa-file-text-o\"></i> <span class=icon-hide>Results</span></a></li><li><a ui-sref=rave><i class=\"fa fa-video-camera\"></i> <span class=icon-hide>Rave</span></a></li></ul></div>");
$templateCache.put("client/about/index.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"container about\"><div class=\"col-lg-8 col-lg-offset-2\"><p class=text-center>Our mission is to collect, organize, and display business opportunities posted by the US government and better connect businesses to those opportunities.</p><p class=text-justify></p></div><div class=\"col-lg-12 container-fluid\"><h4 class=\"text-center header\">Help us make it better...</h4><div class=\"col-lg-4 col-md-4 panel\"><h5 class=\"text-center stop-doing\">Stop Doing</h5><p class=\"text-center margin-bottom-off\"><small class=stop-doing-sub>Bugs, issues?</small></p><p class=\"text-center stop-doing-sub\"><small>Let us know so we can fix it</small></p><textarea class=form-control rows=8 style=\"resize: none\" ng-model=vm.stop_doing_text></textarea><div class=\"col-lg-12 text-center\"><button class=\"btn btn-embossed btn-wide btn-success\" ng-click=vm.stop_doing(vm.stop_doing_text)>Submit</button></div></div><div class=\"col-lg-4 col-md-4 panel-mid\"><h5 class=\"text-center keep-doing\">Keep Doing</h5><p class=text-center><small class=keep-doing-sub>What are we doing that you really like? We\'d love to hear from you!</small></p><textarea class=form-control rows=8 style=\"resize: none\" ng-model=vm.keep_doing_text></textarea><div class=\"col-lg-12 text-center\"><button class=\"btn btn-embossed btn-wide btn-success\" ng-click=vm.keep_doing(vm.keep_doing_text)>Submit</button></div></div><div class=\"col-lg-4 col-md-4 panel\"><h5 class=\"text-center start-doing\">Start Doing</h5><p class=text-center><small class=start-doing-sub>What new features you would love to see?</small></p><br><textarea class=form-control rows=8 style=\"resize: none\" ng-model=vm.start_doing_text></textarea><div class=\"col-lg-12 text-center\"><button class=\"btn btn-embossed btn-wide btn-success\" ng-click=vm.start_doing(vm.start_doing_text)>Submit</button></div></div></div></div>");
$templateCache.put("client/main/index.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"containter main\"><div class=\"col-lg-8 col-lg-offset-2 text-center\"><img src=/img/GovFish.png><p>Catch government business opportunities</p></div><div class=\"col-lg-8 col-lg-offset-2\"><div class=\"input-group input-group-hg input-group-rounded\" ng-controller=\"Main as vm\"><input type=text class=form-control autofocus placeholder=\"Opportunity Keywords Here\" ng-model=vm.keyword is-active is-entered=search> <span class=input-group-btn><button class=\"btn is-active\" ng-click=vm.search()><span class=fui-search></span></button></span></div><p class=text-center>In beta development, currently sourcing <a href ng-click=vm.search_all()><span ng-bind=\"totalObj | number\" class=total></span></a> opportunities from FedBizOpps (<a href=https://www.fbo.gov target=_blank>fbo.gov</a>)</p></div></div>");
$templateCache.put("client/main/item_search.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"container item_search\"><div class=col-lg-12><div class=row><div class=\"col-lg-8 col-md-8 col-sm-12 title_border\"><div class=col-sm-12><a href={{itemObj._source.listing_url}} target=_blank><h5 class=title ng-bind-html=itemObj._source.title></h5></a></div><div class=col-sm-12><a href class=\"pull-right star\" ng-click=\"vm.save_items(false, itemObj._id.toString())\"><span class=save_item ng-show=!vm.isAuthenticated>Save Item</span> <i ng-repeat=\"result in search_item_result track by $index\" saved-star={{result}} class=\"fa fa-star-o\"></i></a></div></div><div class=\"col-lg-4 col-md-4 col-sm-12\"><img src={{itemObj._source.logo_url}} class=img-responsive></div></div></div><div class=body><div class=\"col-lg-8 col-md-8 col-sm-12\"><div class=col-lg-12 style=margin-top:20px><p class=description ng-bind-html=\"item_description | newLines\"></p></div><div class=col-lg-12 ng-show=\"itemObj._source.attachments.length > 0\"><div class=col-lg-12><h5>Attachments</h5></div><div ng-repeat=\"attachment in itemObj._source.attachments\"><div class=attachment_child><a href={{attachment.url}} class=attach>{{attachment.title}}</a><p class=default><span>Description:</span> <span ng-bind-html=attachment.description></span></p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-12 right-panel\"><p>Source: <a href={{itemObj._source.listing_url}} target=_blank>FBO</a></p><p>Solicitation Number: {{itemObj._source.solnbr}}</p><p>Due Date: {{itemObj._source.close_date | date}}</p><p>Posted Date: {{itemObj._source.posted_date | date}}</p><p>Notice Type: {{itemObj._source.notice_type}}</p><p>Set Aside: {{itemObj._source.set_aside}}</p><p>Agency: {{itemObj._source.agency}}</p><p>Office: {{itemObj._source.office}}</p><p>LOCATION: {{itemObj._source.location}}</p><p>Classification Code: <span ng-bind-html=itemObj._source.classification_code></span></p><p>NAICS Code: <span ng-bind-html=itemObj._source.naics_code></span></p></div></div><div class=\"col-lg-12 col-md-12 col-sm-12\"><p class=\"note text-center\"><strong>NOTE:</strong> <span class=default>For full details about this opportunity, you can read the official version of this solicitation and download the appropriate forms and rules regarding your submission in the link below.</span></p><p class=\"default bottom text-center\">The official link for this solicitation is: <a href={{itemObj._source.listing_url}} target=_blank>{{itemObj._source.listing_url}}</a></p></div></div>");
$templateCache.put("client/main/search.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"containter search\"><div class=\"col-lg-8 col-lg-offset-2\"><div class=\"input-group input-group-hg input-group-rounded\"><input type=text class=form-control placeholder=\"Opportunity Keywords Here\" ng-model=vm.keyword is-active is-entered=search> <span class=input-group-btn><button class=\"btn is-active\" ng-click=vm.change_keyword(1)><span class=fui-search></span></button></span></div></div><div class=\"col-lg-12 container\" style=margin-top:40px><div ng-hide=\"pageTotal !== 0\" class=text-center ng-cloak>{{noResultText}}<strong><em>{{tempKeyword}}</em></strong></div><div ng-show=\"pageTotal !== 0\" class=pull-left><span ng-bind=showStart></span> <span ng-bind=dash></span> <span ng-bind=showEnd></span> <span ng-bind=of></span> <span ng-bind=pageTotal></span></div><ul class=\"pagination-plain pull-right\" ng-show=\"pageTotal !== 0\"><li class=previous ng-show=previous_hide><a href ng-click=\"vm.change_page(p - 1)\">Previous</a></li><li ng-repeat=\"n in paginateResult\" ng-class=\"{active: {{n}} == p}\"><a href=# ng-click=vm.change_page(n)>{{n}}</a></li><li class=next ng-show=next_hide><a href ng-click=\"vm.change_page(p + 1, vm.pageTotal)\">Next</a></li></ul></div><div class=\"col-lg-12 container-fluid\"><hr class=top-horizontal><div class=\"col-lg-3 col-md-3 categories\"><div class=options><h5>Show results for</h5><label class=checkbox><input check-box-option-is-award type=checkbox value=\"Show award\" id=is_award data-check=false> Show award</label> <label class=checkbox><input check-box-option-is-sole-source type=checkbox value=\"Show sole source\" id=is_sole_source data-check=false> Show sole source</label></div><div class=refine><h5>Refine results by</h5><div class=services ng-show=\"services_filter.length !==0\" ng-cloak><a href filter-services=all_services>Services</a><div class=item ng-repeat=\"item in services_filter track by $index\" ng-show=services><label class=checkbox><input check-box=services type=checkbox value={{item.classification_text}} id={{item.classifiation_code}} data-code={{item.classification_code}} data-check=false ng-checked=check_services> {{item.classification_text}} <span style=\"color: #16a085\">({{item.count}})</span></label></div></div><div class=products ng-show=\"products_filter.length !==0\" ng-cloak><a href filter-services=all_products>Products</a><div class=item ng-repeat=\"item in products_filter track by $index\" ng-show=products><label class=checkbox><input check-box=products type=checkbox data-toggle=checkbox value={{item.classification_text}} id={{item.classification_text}} data-code={{item.classification_code}} data-check=false ng-checked=check_products> {{item.classification_text}} <span style=\"color: #16a085\">({{item.count}})</span></label></div></div></div></div><div class=\"col-lg-9 col-md-9 search_result\"><div ng-repeat=\"result in search_result track by $index\"><div class=\"col-lg-12 item\"><div class=row><div class=\"col-lg-10 col-md-10 col-sm-12\"><h5 style=\"font-size: 20px\"><a href=\"/item/{{result._id}}?keyword={{vm.keyword}}\" target=_self ng-click=vm.clicked_items(result._id)>{{result._source.title}}</a></h5></div><div class=\"col-lg-2 col-md-2 col-sm-12 text-center\"><a href class=star><i saved-star={{result}} class=\"fa fa-star-o fa-2x\"></i></a></div></div><div class=row><div class=\"col-lg-4 col-sm-3\"><p class=same>Solicitation Number: {{result._source.solnbr}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Due Date: {{result._source.close_date | date}}</p></div></div><div class=row><div class=\"col-lg-4 col-sm-3\"><p>Agency: {{result._source.agency}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Posted Date: {{result._source.posted_date | date}}</p></div></div><div class=row><div class=col-lg-12><p>Office: {{result._source.office}}</p></div></div><p class=description ng-bind-html=result.highlight.description[0]></p></div></div></div></div></div><div class=\"col-lg-12 container\"><hr class=top-horizontal><div ng-show=\"pageTotal !== 0\" class=pull-left><span ng-bind=showStart></span> <span ng-bind=dash></span> <span ng-bind=showEnd></span> <span ng-bind=of></span> <span ng-bind=pageTotal></span></div><ul class=\"pagination-plain pull-right\" ng-show=\"pageTotal !== 0\"><li class=previous ng-show=previous_hide><a href ng-click=\"vm.change_page(p - 1)\">Previous</a></li><li ng-repeat=\"n in paginateResult\" ng-class=\"{active: {{n}} == p}\"><a href=# ng-click=vm.change_page(n)>{{n}}</a></li><li class=next ng-show=next_hide><a href ng-click=\"vm.change_page(p + 1, paginateResult.length)\">Next</a></li></ul></div>");
$templateCache.put("client/main/user_saved_items.html","<section ng-include=\"\'commons/header.html\'\"></section><div class=\"col-lg-12 container user_saved_items\"><div ng-repeat=\"result in user_saved_items track by $index\"><div class=col-lg-12><div class=row><div class=\"col-lg-10 col-md-10 col-sm-12\"><h5 style=\"font-size: 20px\"><a href=\"/item/{{result.item_id}}?keyword={{result.keyword}}\" target=_blank ng-click=vm.clicked_items(result.item_id)>{{result.title}}</a></h5></div><div class=\"col-lg-2 col-md-2 col-sm-12 text-center\"><a href><i saved-star={{result}} class=\"fa fa-star-o fa-2x\" ng-show=vm.isAuthenticated></i></a></div></div><div class=row><div class=\"col-lg-4 col-sm-3\"><p class=same>Solicitation Number: {{result.solnbr}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Due Date: {{result.date | date}}</p></div></div><div class=row><div class=\"col-lg-4 col-sm-3\"><p>Agency: {{result.agency}}</p></div><div class=\"col-lg-4 col-sm-3\"><p>Posted Date: {{result.posted_date | date}}</p></div></div><div class=row><div class=col-lg-12><p>Office: {{result.office}}</p></div></div><p class=description ng-bind-html=result.description></p></div></div></div>");
$templateCache.put("client/sample/index.html","Welcome to the Sample Page");}]);