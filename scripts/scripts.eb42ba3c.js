"use strict";angular.module("wgafApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","config","angular-flash.service","angular-flash.flash-alert-directive","siyfion.sfTypeahead","angular-loading-bar","ui.utils","infinite-scroll","angularMoment"]).config(["$stateProvider","$urlRouterProvider","$httpProvider","flashProvider","$locationProvider",function(a,b,c,d,e){a.state("main",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl","abstract":!0}).state("main.dashboard",{url:"",templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).state("main.share",{url:"share",templateUrl:"views/share-link.html",controller:"ShareCtrl"}).state("main.follow",{url:"follow",templateUrl:"views/follow.html",controller:"FollowCtrl"}).state("main.profile",{url:"@:username",templateUrl:"views/main.profile.html",controller:"ProfileCtrl"}).state("cover",{url:"/",templateUrl:"views/cover.html",controller:"CoverCtrl"}).state("cover.sign-in",{url:"sign-in",templateUrl:"views/sign-in.html"}).state("cover.sign-up",{url:"sign-up",templateUrl:"views/sign-up.html"}).state("cover.sign-up.verify",{url:"",templateUrl:"views/verify-email.html"}),b.otherwise("/"),c.interceptors.push("authInterceptor"),d.errorClassnames.push("alert-danger"),d.warnClassnames.push("alert-warn"),d.infoClassnames.push("alert-info"),d.successClassnames.push("alert-success"),e.html5Mode(!0)}]).run(["$state","$window","$rootScope",function(a,b,c){var d=[/^main/];c.$on("$stateChangeStart",function(c,e){for(var f=0;f<d.length;++f)d[f].test(e.name)&&!b.sessionStorage.user&&(c.preventDefault(),a.go("cover"))})}]),angular.module("config",[]).constant("ENV","production").constant("API","https://wgaf.herokuapp.com"),angular.module("wgafApp").directive("userSearch",["API",function(a){return{restrict:"E",scope:{model:"=",valid:"="},templateUrl:"views/user-search.html",controller:["$scope",function(b){b.valid=!1;var c=[],d=new Bloodhound({name:"users",remote:{url:a+"/users?search=%QUERY",filter:function(a){return b.$apply(function(){c=_.union(c,_.map(a,"username"))}),a}},datumTokenizer:function(a){return Bloodhound.tokenizers.whitespace(a.username)},queryTokenizer:Bloodhound.tokenizers.whitespace});d.initialize(),b.userData={name:"usernames",displayKey:"username",source:d.ttAdapter()},b.$watch(function(a){return{cache:c,model:a.model}},function(){b.valid=_.contains(c,b.model)},!0)}]}}]),angular.module("wgafApp").controller("MainCtrl",["$scope","$window","$state","flash",function(a,b,c,d){a.user=angular.fromJson(b.sessionStorage.user),a.signout=function(){delete b.sessionStorage.user,d.success="Signed out",c.go("cover")}}]),angular.module("wgafApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("wgafApp").controller("CoverCtrl",["$scope","$http","API","$window","$log","$state","flash",function(a,b,c,d,e,f,g){d.sessionStorage.user&&f.go("main.dashboard"),a.user={},a.signingIn=!1,a.signingUp=!1,a.signInText=function(){return a.signingIn?"Signing in...":"Sign in"},a.signUpText=function(){return a.signingUp?"Signing up...":"Sign up"},a.signIn=function(){delete a.signInError,a.signingIn=!0,b.post(c+"/auth",a.user).success(function(b){d.sessionStorage.user=angular.toJson({username:a.user.username,token:b.token}),f.go("main.dashboard")}).error(function(b){delete d.sessionStorage.token,a.signingIn=!1,"email not verified"===b.message?a.signInError=a.user.username+", please verify your email before signing in.":"bad auth"===b.message?a.signInError="Invalid username or password.":g.error="Something went wrong..."})},a.signUp=function(){delete a.signUpError,a.signingUp=!0,b.post(c+"/users",a.user).success(function(b){e.info("signed up: ",b),a.signingUp=!1,g.success="Account created",f.go("cover.sign-up.verify")}).error(function(b){"username already exists"===b.message&&(a.signUpError="Username is taken. Please pick another username."),a.signingUp=!1})}}]),angular.module("wgafApp").factory("authInterceptor",["$window","$log","$q","$location",function(a,b,c,d){return{request:function(b){b.headers=b.headers||{};var c=angular.fromJson(a.sessionStorage.user);return a.sessionStorage.user&&(b.headers.Authorization="Bearer "+c.token),b},response:function(a){return 401===a.status&&(b.warn("Not authenticated: ",a),d.path("/signin")),a||c.when(a)}}}]),angular.module("wgafApp").controller("ShareCtrl",["$scope","$window","$http","API","flash","$log",function(a,b,c,d,e,f){a.share={url:null,summary:"",reset:function(){this.url=null,this.summary=null}},a.sharing=!1,a.shareLink=function(b){a.sharing=!0,c.post(d+"/users/"+a.user.username+"/links",a.share).success(function(){e.success="Link added",a.share.reset(),b.$setPristine()}).error(function(a){e.error="Something went wrong...",f.error(a)})["finally"](function(){a.sharing=!1})}}]),angular.module("wgafApp").controller("FollowCtrl",["$scope","$http","API","flash","$log",function(a,b,c,d,e){a.follow={username:null,valid:!1,reset:function(){this.username=null,this.valid=!1}},a.following=!1,a.followUser=function(){a.following=!0,b.post(c+"/users/"+a.user.username+"/following",{target:a.follow.username}).success(function(){d.success="Following "+a.follow.username,a.follow.reset()}).error(function(b){e.error("Error following user: ",b),/^already following/.test(b.message)&&(d.info="Already following "+a.follow.username,a.follow.reset())})["finally"](function(){a.following=!1})}}]),angular.module("wgafApp").controller("DashboardCtrl",function(){}),angular.module("wgafApp").controller("ProfileCtrl",["$scope","$http","$stateParams","$log","flash","API","db",function(a,b,c,d,e,f,g){a.profile=g.profiles[c.username]||{username:c.username,loading:!0};var h=function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase())};b.get(f+"/users/"+c.username).success(function(b){a.profile=b,a.profile.followers=b.followers.sort(h),a.profile.following=b.following.sort(h),g.profiles[c.username]=a.profile}).error(function(a){d.error(a),e.error="Something went wrong..."})}]),angular.module("wgafApp").service("db",function(){this.links={},this.profiles={}}),angular.module("wgafApp").factory("linksLoader",["db","flash","$http","API","$log",function(a,b,c,d,e){return{instantiate:function(f){return{links:a.links[f]||[],busy:!1,page:0,limit:null,done:!1,username:f,loadLinks:function(){var f=this;if(!f.busy){if(f.page>0&&f.limit&&f.links.length>=f.limit)return void(f.done=!0);f.busy=!0,c.get(d+"/users/"+f.username+"/links?page="+f.page+"&limit=40").success(function(b){b.length<40&&(f.done=!0,0===b.length)||(0===f.page&&(f.links=[]),f.links=_.uniq(_.sortBy(f.links.concat(b),function(a){return-a.time}),!0,"time"),a.links[f.username]=f.links,f.page+=1)}).error(function(a){b.error="Something went wrong...",e.error(a),f.done=!0})["finally"](function(){f.busy=!1})}}}}}}]),angular.module("wgafApp").directive("links",["linksLoader",function(a){return{templateUrl:"views/links.html",restrict:"E",scope:{username:"=",limit:"=?"},link:function(b){b.loader=a.instantiate(b.username),angular.isDefined(b.limit)&&(b.loader.limit=b.limit)}}}]),angular.module("wgafApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>\n"),a.put("views/cover.html",'<div class="banner">\n    <h1>w.g.a.f</h1>\n    <p>No nonsense web curation tool. Get one email daily, with updates from the people you choose.</p>\n</div>\n\n<div class="action">\n  <div ui-view>\n        <button type="button" class="btn btn-default btn-lg" ui-sref=".sign-up">Sign up</button>\n        <div>\n            or <a ui-sref=".sign-in">Sign in</a>\n        </div>\n    </div>\n</div>\n'),a.put("views/dashboard.html",'<links username="user.username"/>\n'),a.put("views/follow.html",'<form role="form" class="wgaf-action-form wgaf-follow-form form-inline">\n  <div class="form-group">\n    <user-search model="follow.username" valid="follow.valid"/>\n  </div>\n  <button ng-disabled="following || !follow.valid || follow.username === user.username" type="submit" class="btn btn-default btn-lg" ng-click="followUser()">Follow</button>\n</form>\n'),a.put("views/links.html",'<div class="links-list" infinite-scroll="loader.loadLinks()" infinite-scroll-distance="2" infinite-scroll-disabled="loader.busy || loader.done">\n\n  <div class="link-item" ng-repeat="link in loader.links">\n    <a class="link" href="{{link.url}}" target="_blank">{{link.url}}</a>\n    <span ng-if="link.summary"> - <em>{{link.summary}}</em></span>\n    <span class="time" am-time-ago="link.time"></span>\n    <hr ng-if="!$last"/>\n  </div>\n\n  <div class="link-item" ng-show="loader.busy">Loading...</div>\n  <div class="link-item" ng-show="!loader.busy && loader.links.length === 0"><em>None</em></div>\n\n</div>\n'),a.put("views/main.html",'<div class="header">\n  <h1><a class="home" ui-sref="main.dashboard">w.g.a.f</a></h1>\n  <div>\n    Hello, <a ui-sref="main.profile({username: user.username})">{{user.username}}</a>.\n    <ul class="nav-list pull-right">\n      <li><a ui-sref="main.share">Share link</a></li>\n      <li><a ui-sref="main.follow">Follow</a></li>\n      <li><a ng-click="signout()">Sign out</a></li>\n    </ul>\n  </div>\n</div>\n\n<div ui-view>\n  <p>Get started by sharing a link, or following a user.</p>\n</div>\n'),a.put("views/main.profile.html",'<h2 ng-if="profile.username !== user.username">{{profile.username}}</h2>\n\n<div class="following">\n  <h4>Following<span ng-show="profile.following"> ({{profile.following.length}})</span>:</h4>\n  <p ng-show="profile.loading">Loading...</p>\n  <p ng-if="profile.following.length === 0"><em>Nobody</em></p>\n  <p ng-if="profile.following.length > 0">\n    <span ng-repeat="username in profile.following">\n      <a ui-sref="main.profile({username: username})">{{username}}</a><span ng-if="!$last" class="comma">, </span>\n    </span>\n  </p>\n</div>\n\n<div class="followers">\n  <h4>Followers<span ng-show="profile.followers"> ({{profile.followers.length}})</span>:</h4>\n  <p ng-show="profile.loading">Loading...</p>\n  <p ng-if="profile.followers.length === 0"><em>Nobody</em></p>\n  <p ng-if="profile.followers.length > 0">\n    <span ng-repeat="username in profile.followers">\n      <a ui-sref="main.profile({username: username})">{{username}}</a><span ng-if="!$last" class="comma">, </span>\n    </span>\n  </p>\n</div>\n\n<div class="recent" ng-if="profile.username !== user.username">\n  <h4>Recently shared:</h4>\n  <links username="profile.username" limit="10"/>\n</div>\n'),a.put("views/share-link.html",'<form role="form" name="shareForm" class="wgaf-action-form wgaf-share-link-form">\n  <div class="form-group">\n    <input ng-model="share.url" type="url" placeholder="Link" class="form-control"\n           required="true"/>\n  </div>\n  <div class="form-group">\n    <textarea ng-model="share.summary" rows="2" placeholder="A short summary, if you like." ng-maxlength="160" class="form-control"></textarea>\n  </div>\n  <div class="action">\n    <button ng-disabled="sharing || shareForm.$invalid" type="button" class="btn btn-default btn-lg" ng-click="shareLink(shareForm)">g.a.f</button>\n  </div>\n</form>\n'),a.put("views/sign-in.html",'<form role="form" name="signInForm">\n  <p class="text-danger" ng-if="signInError">{{signInError}}</p>\n    <div class="form-group">\n        <input type="text" class="form-control" placeholder="Username" ng-model="user.username" required="true">\n        <div class="form-group">\n            <input type="password" class="form-control" placeholder="Password" ng-model="user.password" required="true">\n        </div>\n    </div>\n    <div class="action">\n        <button ng-disabled="signingIn || signInForm.$invalid" type="submit" class="btn btn-default btn-lg" ng-click="signIn()">{{signInText()}}</button>\n        <div ng-hide="signingIn">\n            or <a ui-sref="cover.sign-up">Sign up</a>\n        </div>\n    </div>\n\n</form>\n'),a.put("views/sign-up.html",'<div ui-view>\n  <form role="form" name="signUpForm" show-validation>\n    <p class="text-danger" ng-if="signUpError">{{signUpError}}</p>\n    <div class="form-group">\n        <input type="email" class="form-control" placeholder="Email" ng-model="user.email" required="true">\n    </div>\n    <div class="form-group">\n        <input type="text" class="form-control" placeholder="Username" ng-model="user.username" required="true" pattern="^[A-Za-z][_A-Za-z0-9]*$">\n    </div>\n    <div class="form-group">\n        <input type="password" class="form-control" placeholder="Password" ng-model="user.password" required="true" ng-minlength="4">\n    </div>\n    <div class="form-group">\n        <input type="password" class="form-control" placeholder="Confirm password" ng-model="user.confirmPassword" ui-validate="\'$value===user.password\'" ui-validate-watch="\'user.password\'">\n    </div>\n\n    <div class="action">\n        <button ng-disabled="signingUp || signUpForm.$invalid" type="submit" class="btn btn-default btn-lg" ng-click="signUp()">{{signUpText()}}</button>\n        <div ng-hide="signingUp">\n            or <a ui-sref="cover.sign-in">Sign in</a>\n        </div>\n    </div>\n</form>\n</div>\n'),a.put("views/user-search.html",'<input type="text"\n       class="form-control"\n       placeholder="Username"\n       ng-model="model"\n       datasets="userData"\n       options="{highlight:true}"\n       sf-typeahead\n       suggestion-key="username" />\n'),a.put("views/verify-email.html","<p><strong>{{user.username}}</strong>, your account has been created. We have sent a verification email to <strong>{{user.email}}</strong>. Please verify your email before signing in.</p>\n")}]);