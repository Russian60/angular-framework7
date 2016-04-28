;(function() {
'use strict';

if (Framework7.prototype.device.android) {
  Dom7('head').append('<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.min.css">' + '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.colors.min.css">');
} else {
  Dom7('.view').append('<div class="navbar"></div>');
  Dom7('head').append('<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.min.css">' + '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.colors.min.css">');
}
}());

;(function() {
'use strict';

window.Framework7.prototype.plugins.hooks = function (app, params) {
  return {
    hooks: {
      appInit: function appInit() {
        Dom7(window).trigger('f7:appInit', { app: app });
      },
      navbarInit: function navbarInit(navbar, pageData) {
        Dom7(window).trigger('f7:navbarInit', { navbar: navbar, pageData: pageData });
      },
      pageInit: function pageInit(pageData) {
        Dom7(window).trigger('f7:pageInit', { pageData: pageData });
      },
      pageBeforeInit: function pageBeforeInit(pageData) {
        Dom7(window).trigger('f7:pageBeforeInit', { pageData: pageData });
      },
      pageBeforeAnimation: function pageBeforeAnimation(pageData) {
        Dom7(window).trigger('f7:pageBeforeAnimation', { pageData: pageData });
      },
      pageAfterAnimation: function pageAfterAnimation(pageData) {
        Dom7(window).trigger('f7:pageAfterAnimation', { pageData: pageData });
      },
      pageBeforeRemove: function pageBeforeRemove(pageData) {
        Dom7(window).trigger('f7:pageBeforeRemove', { pageData: pageData });
      },
      addView: function addView(view) {
        Dom7(window).trigger('f7:addView', { view: view });
      },
      loadPage: function loadPage(view, url, content) {
        Dom7(window).trigger('f7:loadPage', { view: view, url: url, content: content });
      },
      goBack: function goBack(view, url, preloadOnly) {
        Dom7(window).trigger('f7:goBack', { view: view, url: url, preloadOnly: preloadOnly });
      },
      swipePanelSetTransform: function swipePanelSetTransform(views, panel, percentage) {
        Dom7(window).trigger('f7:swipePanelSetTransform', { views: views, panel: panel, percentage: percentage });
      }
    }
  };
};
}());

;(function() {
'use strict';

angular.module('framework7', ['framework7.directives', 'framework7.services']).run(function ($F7Compile, $F7Hooks, HashRouter) {
  $F7Hooks.init();
  $F7Compile.init();
  HashRouter.init();
});
}());

;(function() {
'use strict';

function F7Hooks($rootScope) {

  function init() {
    Dom7(window).on('f7:appInit', function (data) {
      $rootScope.$emit('f7:appInit', data);
    });
    Dom7(window).on('f7:navbarInit', function (data) {
      $rootScope.$emit('f7:navbarInit', data);
    });
    Dom7(window).on('f7:pageInit', function (data) {
      $rootScope.$emit('f7:pageInit', data);
    });
    Dom7(window).on('f7:pageBeforeInit', function (data) {
      $rootScope.$emit('f7:pageBeforeInit', data);
    });
    Dom7(window).on('f7:pageBeforeAnimation', function (data) {
      $rootScope.$emit('f7:pageBeforeAnimation', data);
    });
    Dom7(window).on('f7:pageAfterAnimation', function (data) {
      $rootScope.$emit('f7:pageAfterAnimation', data);
    });
    Dom7(window).on('f7:pageBeforeRemove', function (data) {
      $rootScope.$emit('f7:pageBeforeRemove', data);
    });
    Dom7(window).on('f7:addView', function (data) {
      $rootScope.$emit('f7:addView', data);
    });
    Dom7(window).on('f7:loadPage', function (data) {
      $rootScope.$emit('f7:loadPage', data);
    });
    Dom7(window).on('f7:goBack', function (data) {
      $rootScope.$emit('f7:goBack', data);
    });
    Dom7(window).on('f7:swipePanelSetTransform', function (data) {
      $rootScope.$emit('f7:swipePanelSetTransform', data);
    });
  }

  return { init: init };
}

angular.module('framework7').factory('$F7Hooks', F7Hooks);
}());

;(function() {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ngFramework7 = function () {
  function ngFramework7() {
    _classCallCheck(this, ngFramework7);

    this.instance = null;
    this.views = [];
    this.mainView = null;
    this.theme = null;
  }

  _createClass(ngFramework7, [{
    key: "init",
    value: function init(params, debug) {
      this.theme = window.Framework7.prototype.device.android ? "android" : "ios";
      if (this.theme === 'android') {
        params.material = true;
        Dom7('.pages').addClass('navbar-fixed');
      } else {
        params.material = false;
        Dom7('.pages').addClass('navbar-through');
      }

      this.instance = new window.Framework7(params);
      if (debug) window.f7 = this.instance;
    }
  }, {
    key: "addView",
    value: function addView(name, selector, parameters, isMainView) {
      if (this.f7) throw Error('Framework7 not initialized.');
      if (this.views[name]) {
        throw Error("View with name " + name + " already defined!");
      }
      if (this.theme === 'ios') {
        parameters.dynamicNavbar = parameters.dynamicNavbar === true ? true : false;
      }
      var view = this.instance.addView(selector, parameters);
      this.views[name] = view;
      if (isMainView) this.mainView = view;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.instance;
    }
  }, {
    key: "getMainView",
    value: function getMainView() {
      return this.mainView;
    }
  }, {
    key: "$get",
    value: function $get() {
      var _this = this;

      return {
        instance: function instance() {
          return _this.instance;
        },
        mainView: function mainView() {
          return _this.getMainView;
        },
        theme: function theme() {
          return _this.theme;
        },
        view: function view(viewName) {
          if (!viewName && !_this.mainView) throw Error('MainView not defined.');
          if (!viewName && _this.mainView) return _this.mainView;
          if (viewName && !views[viewName]) throw Error("View '" + viewName + "' not defined.");

          return _this.views[viewName];
        }
      };
    }
  }]);

  return ngFramework7;
}();

angular.module('framework7').provider('$F7', ngFramework7);
}());

;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compile = function () {
  function Compile($compile, $timeout, $controller, $rootScope, $F7Router) {
    _classCallCheck(this, Compile);

    this.$compile = $compile;
    this.$timeout = $timeout;
    this.$controller = $controller;
    this.$rootScope = $rootScope;
    this.$F7Router = $F7Router;
  }

  _createClass(Compile, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.$rootScope.$on('f7:pageBeforeInit', function (e, data) {
        var pageData = data.detail.pageData;
        _this.$F7Router.findRouteByUrl(pageData.url).then(function (route) {
          var config = route.config;
          var navbar = data.detail.pageData.navbarInnerContainer;
          var $scope = _this.$rootScope.$new();
          _this.$controller(config.controller, { $scope: $scope }, null, config.controllerAs);
          _this.$timeout(function () {
            var template = angular.element(pageData.container);
            _this.$compile(template)($scope);
            if (navbar) {
              var navbarElement = angular.element(navbar);
              _this.$compile(navbarElement)($scope);
            }
          });
        }).catch(function (err) {
          console.warn(err);
        });
      });
    }
  }, {
    key: 'element',
    value: function element(_element, $scope) {
      var _this2 = this;

      this.$timeout(function () {
        var template = angular.element(_element);
        _this2.$compile(template)($scope);
      });
    }
  }]);

  return Compile;
}();

angular.module('framework7').service('$F7Compile', Compile);
}());

;(function() {
"use strict";

function HashRouter() {

  var Router = {
    $get: function $get($rootScope, $F7Router) {
      var _this = this;

      return {
        init: function init() {
          _this.init();
          $rootScope.$on('f7:pageAfterAnimation', function (e, data) {
            if (data.detail.pageData.swipeBack) {
              $F7Router.findRouteByUrl(data.detail.pageData.url).then(function (route) {
                Router.navigate(route.path);
              });
            }
          });
        }
      };
    },
    init: function init(onRouteChange, onRouteNotFound) {

      Router.__eventOnChange = onRouteChange;
      Router.__eventOnNotFound = onRouteNotFound;

      if (!("onhashchange" in window)) {
        console.error("The browser doesn't support HASH on URL!");
        return false;
      }
      Router.__bindHashChange();
      if (window.location.hash == '' || window.location.hash == '#') {
        Router.__listener('#/');
        return true;
      } else {
        Router.__listener(window.location.hash);
        return true;
      }
      return true;
    },
    navigate: function navigate(hash) {

      window.location.hash = hash;
    },
    run: function run(route) {

      if (Router.__eventOnChange != null) Router.__eventOnChange(route);
      Router.__run(route, 'before');
    },
    add: function add(route, overwrite) {

      var isAlreadyMapped = false;
      if (!route.path) {
        console.error("Cannot find property path when adding a new route!");
        return false;
      }
      for (var i = 0; i < Router.routes.length; i++) {
        if (Router.routes[i].path === route.path) {
          isAlreadyMapped = true;
          if (overwrite === true) {
            Router.routes[i] = route;
            return;
          }
          break;
        }
      }
      if (isAlreadyMapped) {
        console.error("A ruote for the path " + ruote.path + " is already mapped!");
        return false;
      }
      Router.routes.push(route);
    },
    findRoute: function findRoute(path) {

      for (var i = 0; i < Router.routes.length; i++) {
        if (Router.routes[i].path === path) return Router.routes[i];
      }
    },
    matchRoute: function matchRoute(hash) {

      var hashParts = Router.__cleanHash(hash);
      var testerSlices = hashParts.hashParams.split("/");
      var tester = hashParts.hashParams;
      var params = {};
      var query = {};

      //parse querystring
      if (hashParts.hashQueryArray.length > 0) {
        for (var q = 0; q < hashParts.hashQueryArray.length; q++) {
          var keyValue = hashParts.hashQueryArray[q].split('=');
          if (keyValue.length >= 1 && keyValue[0]) {
            query[keyValue[0]] = keyValue[1] ? decodeURIComponent(keyValue[1]) : '';
          }
        }
      }

      //parse hash parameters
      for (var i = 0; i < Router.routes.length; i++) {
        var route = Router.routes[i];
        tester = hashParts.hashParams;

        if (route.path.search(/:/) > 0) {
          //Dynamic parts
          var routeSlices = route.path.split("/");
          for (var x = 0; x < routeSlices.length; x++) {
            if (x < testerSlices.length && routeSlices[x].charAt(0) === ":") {
              params[routeSlices[x].replace(/:/, '')] = testerSlices[x];
              tester = tester.replace(testerSlices[x], routeSlices[x]);
            }
          }
        }

        if (route.path === tester) {
          route.params = params;
          route.url = hash;
          route.query = query;
          return route;
        }
      }
      return null;
    },
    routes: [],
    __bindHashChange: function __bindHashChange() {
      window.onhashchange = function () {
        Router.__listener(location.hash);
      };
    },
    __cleanHash: function __cleanHash(hash) {
      var result = {};
      var hashIndexOfQuery = hash.indexOf('?');

      result.hash = hash;
      result.hashParams = hashIndexOfQuery >= 0 ? hash.substring(0, hashIndexOfQuery) : hash;
      result.hashQuery = hashIndexOfQuery >= 0 ? hash.substring(hash.indexOf('?') + 1) : '';
      result.hashQueryArray = result.hashQuery ? result.hashQuery.split('&') : [];

      var cleanedHashParams = result.hashParams.replace(/\/+$/, '');
      if (result.hashParams !== cleanedHashParams) {
        window.onhashchange = null;
        result.hash = cleanedHashParams;
        result.hash += result.hashQuery ? '?' + result.hashQuery : '';
        window.location.hash = result.hash;
        Router.__bindHashChange();
      }

      return result;
    },
    __listener: function __listener(hash) {
      if (hash === '') hash = '#/';
      var route = Router.matchRoute(hash);
      if (!route && !Router.__eventOnNotFound) {
        console.error("Cannot find a valid route for hash " + hash + "!");
        return false;
      } else if (!route && Router.__eventOnNotFound) {
        Router.__eventOnNotFound(Router.__hashToArray(hash));
        return false;
      }
      return Router.run(route);
    },
    __hashToArray: function __hashToArray(hash) {
      var tokens = hash.split("/");
      if (tokens.length > 0 && tokens[0] == '#') tokens.shift();
      return tokens;
    },
    __run: function __run(route, state, previousResult) {
      if (route[state]) {
        var runTask = new Router.__task(function (result) {
          var nextState = Router.__nextState(state);
          if (nextState) Router.__run(route, nextState, result);
        });
        route.event = {};
        route.event.previousResult = previousResult;
        route.event.state = state;
        route.task = runTask;
        route[state]();
      } else {
        var nextState = Router.__nextState(state);
        if (nextState) Router.__run(route, nextState);
      }
    },
    __nextState: function __nextState(state) {
      if (state == 'before') return 'on';
      if (state == 'on') return 'after';
      return null;
    },
    __eventOnChange: null,
    __eventOnNotFound: null,
    __task: function __task(doneFunction) {
      return {
        __callback: doneFunction,
        done: function done(result) {
          this.__callback(result);
        }
      };
    }
  };

  return Router;
}

angular.module('framework7').provider('HashRouter', HashRouter);
}());

;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var F7Router = function () {
  function F7Router(HashRouterProvider, $F7Provider) {
    _classCallCheck(this, F7Router);

    this.$F7Provider = $F7Provider;
    this.HashRouter = HashRouterProvider;
    this.routes = [];
  }

  _createClass(F7Router, [{
    key: 'when',
    value: function when(path, config) {
      var self = this;
      var route = {
        path: path,
        config: config,
        before: function before() {
          var template = self.$F7Provider.theme === 'android' ? this.config.templateUrls.android : this.config.templateUrls.ios;

          console.log('load: ', template);
          self.loadPage(template, this.config.name, this.config.controller, this.config.controllerAs, this.config.hooks);
          this.task.done();
        },
        on: function on() {
          this.task.done();
        },
        after: function after() {
          this.task.done();
        }
      };
      this.HashRouter.add(route);
      this.routes.push(route);
      return this;
    }
  }, {
    key: 'loadPage',
    value: function loadPage(url, pageName, controller, controllerAs, hooks) {
      var _this = this;

      var theme = this.$F7Provider.theme;
      var view = this.$F7Provider.getMainView();
      if (~view.history.indexOf(url)) {
        view.router.back({ force: 'true', url: url });
      } else {
        Dom7.get(url, function (data) {

          var content = Dom7(data);

          var ngController = controller;
          if (controllerAs) ngController += ' as ' + controllerAs;

          content.find('.page').attr('data-page', pageName);

          content = _this.setLayout(theme, content);

          // é necessário passar a url para que o histórico do f7 funcione normalmente
          // e não haja duplicidade de telas
          view.router.load({ content: content, url: url, animatePages: true });
        });
      }
    }
  }, {
    key: 'setLayout',
    value: function setLayout(theme, htmlContent) {

      var root = htmlContent.parent();
      var content = htmlContent.find('.page');
      var navbar = htmlContent.find('.navbar');
      var toolbar = htmlContent.find('.toolbar');

      if (theme === 'ios') {
        if (navbar.html()) {
          content.addClass('navbar-through');
          htmlContent.parent().prepend(navbar);
        }
        if (toolbar.html()) {
          content.addClass('toolbar-through');
          htmlContent.parent().append(toolbar);
        }
      } else {
        if (navbar.html()) {
          content.addClass('navbar-fixed');
        }
        if (toolbar.html()) {
          content.addClass('toolbar-fixed');
        }
      }
      return htmlContent.parent().html();
    }
  }, {
    key: '$get',
    value: function $get($rootScope, $compile) {
      var _this2 = this;

      return {
        back: this.back,
        state: function state(pageName) {
          var route = _this2.routes.find(function (route) {
            return route.config.name === pageName;
          });
          // TODO: pass router params and querystring.
          if (route) {
            _this2.HashRouter.navigate(route.path);
          } else {
            throw new Error('Route doesn\'t exist!');
          }
        },
        findRouteByUrl: function findRouteByUrl(url) {
          return new Promise(function (resolve, reject) {

            var route = _this2.routes.find(function (route) {
              if (_this2.$F7Provider.theme === 'android') {
                return route.config.templateUrls.android === url;
              } else {
                return route.config.templateUrls.ios === url;
              }
            });

            return route ? resolve(route) : reject();
          });
        }
      };
    }

    // Public Factory Methods

  }, {
    key: 'state',
    value: function state(pageName) {
      var url = pageName.toLowerCase() + '.view.html';
      var route = this.routes.find(function (route) {
        return route.config.templateUrl === url;
      });
      // TODO: pass router params and querystring.
      this.HashRouter.navigate(route.path);
    }
  }, {
    key: 'back',
    value: function back() {
      window.history.back();
    }
  }]);

  return F7Router;
}();

angular.module('framework7').provider('$F7Router', F7Router);
}());

;(function() {
'use strict';

angular.module('framework7.services', ['framework7.services.modals']);
}());

;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var F7Modal = function () {
  function F7Modal($F7, $F7Compile, $rootScope) {
    _classCallCheck(this, F7Modal);

    this.instance = $F7.instance();
    this.$F7Compile = $F7Compile;
    this.$rootScope = $rootScope;
  }

  _createClass(F7Modal, [{
    key: 'alert',
    value: function alert(text, title) {
      var alert = this.instance.alert;
      return new Promise(function (resolve) {
        if (title) {
          alert(text, title, function () {
            return resolve();
          });
        } else {
          alert(text, function () {
            return resolve();
          });
        }
      });
    }
  }, {
    key: 'confirm',
    value: function confirm(text, title) {
      var confirm = this.instance.confirm;
      return new Promise(function (resolve, reject) {
        if (title) {
          confirm(text, title, function () {
            return resolve();
          }, function () {
            return reject();
          });
        } else {
          confirm(text, function () {
            return resolve();
          }, function () {
            return reject();
          });
        }
      });
    }
  }, {
    key: 'prompt',
    value: function prompt(text, title) {
      var prompt = this.instance.prompt;
      return new Promise(function (resolve, reject) {
        if (title) {
          var element = prompt(text, title, function (res) {
            return resolve(res);
          }, function () {
            return reject();
          });
        } else {
          prompt(text, function (res) {
            return resolve(res);
          }, function () {
            return reject();
          });
        }
      });
    }
  }, {
    key: 'custom',
    value: function custom(parameters, scope) {
      var _this = this;

      return new Promise(function (resolve) {
        var modal = _this.instance.modal;
        var element = modal(parameters);
        _this.$F7Compile.element(element, scope);
        resolve(element);
      });
    }
  }]);

  return F7Modal;
}();

angular.module('framework7.services.modals', []).service('$F7Modal', F7Modal);
}());

;(function() {
'use strict';

angular.module('framework7.directives', ['framework7.directive.goBack', 'framework7.directive.goTo']);
}());

;(function() {
'use strict';

function goBack($F7Router) {

  function link(scope, element) {
    element.bind('click', function () {
      $F7Router.back();
    });
  }

  return {
    restrict: 'A',
    link: link
  };
}

angular.module('framework7.directive.goBack', []).directive('goBack', goBack);
}());

;(function() {
'use strict';

function goTo($F7Router) {

  function link(scope, element, attr) {
    element.bind('click', function () {
      $F7Router.state(attr.goTo);
    });
  }

  return {
    restrict: 'A',
    link: link
  };
}

angular.module('framework7.directive.goTo', []).directive('goTo', goTo);
}());
