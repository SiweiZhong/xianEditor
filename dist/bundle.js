(function (exports) {
'use strict';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

var Symbol$1 = root.Symbol;

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ponyfill = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}
});

var index$1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _ponyfill2 = _interopRequireDefault(ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  root = commonjsGlobal;
} else {
  root = module;
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
});

var index = index$1;

var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index$$1 = nextListeners.indexOf(listener);
      nextListeners.splice(index$$1, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[index] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[index] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

var ADD_KEY = 'ADD_KEY';
var BACKSPACE = 'BACKSPACE';



var ADD_B = 'ADD_B';

var SET_LOCATION = 'SET_LOCATION';
var SET_ORIGIN = 'SET_ORIGIN';






var S_C_A_KEY = 'S_C_A_KEY'; //shift ctrl alt

var SET_WIDTH = 'SET_WIDTH';
var SET_HEIGHT = 'SET_HEIGHT';

var AUTO_LINEFEED = 'AUTO_LINEFEED';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Identifier = function () {
  function Identifier() {
    classCallCheck(this, Identifier);
  }

  createClass(Identifier, [{
    key: "createEndIdentifier",
    value: function createEndIdentifier() {
      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      var ident = new (Function.prototype.bind.apply(this.constructor, [null].concat(arg)))();
      ident.header = this;
      this.end = ident;
      return ident;
    }
  }]);
  return Identifier;
}();

var Style$1 = function (_Identifier) {
  inherits(Style, _Identifier);

  function Style() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Style);

    var _this = possibleConstructorReturn(this, (Style.__proto__ || Object.getPrototypeOf(Style)).call(this));

    _this.name = 'span';
    _this.style = style;
    _this.init();
    return _this;
  }

  createClass(Style, [{
    key: 'init',
    value: function init() {
      this.width = this.style.width || 0;
    }
  }, {
    key: 'replace',
    value: function replace(width) {
      this.width = width;
    }
  }]);
  return Style;
}(Identifier);

var Group$1 = function (_Identifier) {
  inherits(Group, _Identifier);

  function Group() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Group);

    var _this = possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this));

    _this.name = 'div';
    _this.style = style;
    _this.init();
    return _this;
  }

  createClass(Group, [{
    key: 'init',
    value: function init() {
      this.width = this.style.width || 0;
    }
  }, {
    key: 'replace',
    value: function replace(width) {
      this.width = width;
    }
  }]);
  return Group;
}(Identifier);

var Placeholder$1 = function (_Identifier) {
  inherits(Placeholder, _Identifier);

  function Placeholder(name) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var value = arguments[3];
    classCallCheck(this, Placeholder);

    var _this = possibleConstructorReturn(this, (Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call(this));

    _this.name = name;
    _this.attrs = attrs;
    _this.style = style;
    _this.value = value;

    _this.init();
    return _this;
  }

  createClass(Placeholder, [{
    key: 'init',
    value: function init() {
      var _style = this.style,
          width = _style.width,
          height = _style.height;

      this.width = 0;
      this.height = 0;
      if (width) {
        this.width = +width.match(/\d+/)[0] || 0;
      }
      if (height) {
        this.height = +height.match(/\d+/)[0] || 0;
      }
      this._w = this.width;
      this._h = this.height;
    }
  }, {
    key: 'replace',
    value: function replace(width) {
      this.width = width;
    }
  }]);
  return Placeholder;
}(Identifier);

var mathTag = {
  display: 'inline-block',
  color: '#595959',
  background: '#cecece',
  'border-radius': '0.2em',
  'text-align': 'center'
};

var MathTag = function (_Group) {
  inherits(MathTag, _Group);

  function MathTag() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, MathTag);

    var _this = possibleConstructorReturn(this, (MathTag.__proto__ || Object.getPrototypeOf(MathTag)).call(this));

    _this.name = 'span';
    _this.attrs = attrs;
    _this.style = Object.assign({}, mathTag);

    _this.init();
    return _this;
  }

  return MathTag;
}(Group$1);

var Text = function (_Placeholder) {
  inherits(Text, _Placeholder);

  function Text(value) {
    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

    _this.name = 'span';
    _this.value = value;
    _this.real = value;
    _this.width = 0;
    return _this;
  }

  return Text;
}(Placeholder$1);

var Space = function (_Text) {
  inherits(Space, _Text);

  function Space() {
    classCallCheck(this, Space);

    var _this = possibleConstructorReturn(this, (Space.__proto__ || Object.getPrototypeOf(Space)).call(this));

    _this.value = '&nbsp';
    _this.real = '\x20';
    return _this;
  }

  return Space;
}(Text);

var Tab = function (_Text) {
  inherits(Tab, _Text);

  function Tab() {
    classCallCheck(this, Tab);

    var _this = possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this));

    _this.value = '&nbsp&nbsp&nbsp&nbsp';
    _this.real = '\x20\x20\x20\x20';
    return _this;
  }

  return Tab;
}(Text);

var Enter = function (_Text) {
  inherits(Enter, _Text);

  function Enter() {
    classCallCheck(this, Enter);

    var _this = possibleConstructorReturn(this, (Enter.__proto__ || Object.getPrototypeOf(Enter)).call(this));

    _this.name = 'br';
    _this.value = '<br>';
    _this.real = '\n';
    return _this;
  }

  return Enter;
}(Text);

function words() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var editorState = arguments[2];
  var location = editorState.location,
      origin = editorState.origin;

  switch (action.type) {
    case ADD_KEY:
      state = [].concat(toConsumableArray(state));
      state.splice(location, 0, action.value);
      return state;

    case BACKSPACE:
      {
        state = [].concat(toConsumableArray(state));
        state.splice(location, 1);
        return state;
      }

    case ADD_B:
      {
        var a = origin,
            b = location;
        if (a == b) return state;

        if (a > b) {
          var c = b;
          b = a;
          a = c;
        }
        state = [].concat(toConsumableArray(state));

        var w = new Style$1({ 'font-weight': 'bold' });
        state.splice(a, 0, w);
        state.splice(b + 1, 0, w.createEndIdentifier());

        return state;
      }

    default:
      return state;
  }
}

var initEditorState = {
  location: 0,
  origin: 0,
  rowsIndex: [],
  shiftKey: false,
  ctrlKey: false,
  altKey: false,
  autoLinefeed: true
};
function editorState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initEditorState;
  var action = arguments[1];

  switch (action.type) {

    case SET_LOCATION:
      return Object.assign({}, state, {
        location: action.value
      });

    case SET_ORIGIN:
      return Object.assign({}, state, {
        origin: action.value
      });

    case S_C_A_KEY:
      {
        var _action$value = action.value,
            shiftKey = _action$value.shiftKey,
            ctrlKey = _action$value.ctrlKey,
            altKey = _action$value.altKey;

        return Object.assign({}, state, {
          shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey
        });
      }

    case SET_WIDTH:
      return Object.assign({}, state, {
        width: action.value
      });

    case SET_HEIGHT:
      return Object.assign({}, state, {
        height: action.value
      });

    case AUTO_LINEFEED:
      return Object.assign({}, state, {
        autoLinefeed: action.value
      });

    default:
      return state;
  }
}

function app() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var _editorState = editorState(state.editorState, action);

  return {
    editorState: _editorState,
    words: words(state.words, action, _editorState)
  };
}

var store = createStore(app);

var Preview = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "icons" }, [_c('span', { staticClass: "icon", on: { "click": _vm.clickingBold } }, [_vm._v("B")]), _c('span', { staticClass: "icon", on: { "click": _vm.clickingMath } }, [_vm._v("Math")])]);
  }, staticRenderFns: [], _scopeId: 'data-v-7b124cdc',
  data: function data() {
    return {
      autoLinefeed: false
    };
  },

  methods: {
    clickingBold: function clickingBold(event) {
      this.$emit('clickingTools', 'bold');
    },
    clickingAutoLinefeed: function clickingAutoLinefeed(event) {
      this.$emit('clickingTools', 'autoLinefeed', this.autoLinefeed);
      this.autoLinefeed = !this.autoLinefeed;
    },
    clickingMath: function clickingMath(event) {
      this.$emit('clickingTools', 'math');
    }
  }
};

function whereAmI(words, location) {
  var x = 0;
  var loc = location;

  if (words.length == 0) {
    return { x: 0, y: 0 };
  } else if (loc == words.length) {
    // 光标在结尾处时
    loc--;
    x++;
    if (words[loc] instanceof Enter) {
      return { x: 0, y: words[loc].rowNum + 1 };
    }
  }

  var word = words[loc];
  var y = word.rowNum;
  for (var i = loc; i >= 0; i--) {
    var w = words[i];
    if (w.rowNum == word.rowNum) {
      x++;
    } else {
      break;
    }
  }
  x--;

  return { x: x, y: y };
}

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var fontSize = '16px';
var fontWeight = 'normal';
var fontFamily = 'Microsoft YaHei';

ctx.font = fontSize + ' ' + fontWeight + ' ' + fontFamily;

function getFontWidth() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fontSize;
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fontWeight;
  var family = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : fontFamily;

  ctx.save();
  ctx.font = size + ' ' + weight + ' ' + family;
  var w = ctx.measureText(text).width;
  ctx.restore();
  return w;
}

function setData(self, state) {
  self.state = state.editorState;
  self.words = state.words;
}

function addKey(word) {
  return { type: ADD_KEY, value: word };
}
function backspace() {
  return { type: BACKSPACE };
}
function addB() {
  return { type: ADD_B };
}

function setLocation(location) {
  return { type: SET_LOCATION, value: location };
}
function setOrigin(location) {
  return { type: SET_ORIGIN, value: location };
}
function scaKey(shiftKey, ctrlKey, altKey) {
  return { type: S_C_A_KEY, value: { shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey } };
}
function setWidth(width) {
  return { type: SET_WIDTH, value: width };
}
function setHeight(height) {
  return { type: SET_HEIGHT, value: height };
}

var tree$1 = {};

var unsubscribe$1 = store.subscribe(function () {
  tree$1 = store.getState();
});

function updateWordsProps(location) {
  // let {location} = tree.editorState;
  if (tree$1.words.length == 0) {
    return;
  }

  while (location <= tree$1.words.length) {
    var loc = location;
    var word = tree$1.words[--loc];

    if (!word) {
      location++;
      continue;
    }

    var rowNum = void 0;
    var text = word.real || '';
    var width = word._w || 0;

    while (loc > 0) {
      var last = tree$1.words[--loc];
      if (last instanceof Style$1) {
        continue;
      }
      if (rowNum == undefined) {
        rowNum = last.rowNum;
      }
      if (last.rowNum != rowNum) {
        break;
      }
      if (last instanceof Enter) {
        rowNum++;
        break;
      }
      text += last.real || '';
      width += last._w || 0;

      if (loc < 0) break;
    }
    word.rowNum = rowNum || 0;

    width += getFontWidth(text);
    if (tree$1.words[location - 2] instanceof Enter) {
      width = getFontWidth(word.real);
    } else if (tree$1.editorState.autoLinefeed && width > tree$1.editorState.width) {
      width = getFontWidth(word.real);
      word.rowNum++;
    }
    word.width = width;

    location++;
  }
}

var tree = {};

var unsubscribe = store.subscribe(function () {
  tree = store.getState();
});

function addWord(key) {
  var word = void 0;
  if (key == ' ') {
    word = new Space();
  } else if (key == 'Tab') {
    word = new Tab();
  } else {
    word = new Text(key);
  }
  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location + 1));
  store.dispatch(setOrigin(tree.editorState.location));

  updateWordsProps(tree.editorState.location);
}



function addMath() {
  var start = new MathTag({ class: "math_tag" });

  store.dispatch(addKey(new Text('$')));
  store.dispatch(addKey(start));

  store.dispatch(setLocation(tree.editorState.location + 2));
  store.dispatch(addKey(start.createEndIdentifier()));
  store.dispatch(addKey(new Text('$')));

  store.dispatch(setOrigin(tree.editorState.location));

  updateWordsProps(tree.editorState.location - 2);
}

function addEnter() {
  var word = new Enter();

  store.dispatch(addKey(word));
  store.dispatch(setLocation(tree.editorState.location + 1));
  store.dispatch(setOrigin(tree.editorState.location));
  updateWordsProps(tree.editorState.location);
}

var tree$2 = {};

var unsubscribe$2 = store.subscribe(function () {
  tree$2 = store.getState();
});

function moveUp$1() {
  if (tree$2.words.length == 0) return;

  var _whereAmI = whereAmI(tree$2.words, tree$2.editorState.location),
      x = _whereAmI.x,
      y = _whereAmI.y; //x y是下标从零计数

  var loc = tree$2.editorState.location;
  var n = 0;
  var i = loc > 0 ? loc - 1 : 0;
  for (; i >= 0; i--) {
    if (tree$2.words[i] instanceof Style$1) {
      loc--;
      continue;
    }
    if (tree$2.words[i].rowNum < y - 1) {
      break;
    }

    loc--;
    if (tree$2.words[i].rowNum == y - 1) {
      n++;
    }
  }
  loc += n > x ? x : n - 1;
  loc = loc < 0 ? 0 : loc;

  store.dispatch(setLocation(loc));
  if (!tree$2.editorState.shiftKey) {
    store.dispatch(setOrigin(tree$2.editorState.location));
  }
}
function moveDown$1() {
  if (tree$2.words.length == 0) return;

  var _whereAmI2 = whereAmI(tree$2.words, tree$2.editorState.location),
      x = _whereAmI2.x,
      y = _whereAmI2.y;

  var loc = tree$2.editorState.location;
  var n = 0;

  var length = tree$2.words.length;
  var i = loc == length - 1 ? length : loc;
  for (; i < length; i++) {
    if (tree$2.words[i] instanceof Style$1) {
      loc++;
      continue;
    }
    if (tree$2.words[i].rowNum > y + 1) {
      break;
    }

    if (tree$2.words[i].rowNum == y + 1) {
      if (n == x) {
        break;
      }
      n++;
    }
    loc++;
  }
  store.dispatch(setLocation(loc));

  if (!tree$2.editorState.shiftKey) {
    store.dispatch(setOrigin(tree$2.editorState.location));
  }
}
function moveLeft$1() {
  while (tree$2.editorState.location > 0) {
    var x = tree$2.editorState.location - 1;
    var word = tree$2.words[x];

    if (word instanceof Style$1) {
      store.dispatch(setLocation(x));
    } else {
      store.dispatch(setLocation(x));
      if (!tree$2.editorState.shiftKey) {
        store.dispatch(setOrigin(tree$2.editorState.location));
      }
      break;
    }
  }
}
function moveRight$1() {
  while (tree$2.editorState.location < tree$2.words.length) {
    var x = tree$2.editorState.location + 1;
    var word = tree$2.words[x];
    if (word instanceof Style$1) {
      store.dispatch(setLocation(x));
    } else {
      store.dispatch(setLocation(x));
      if (!tree$2.editorState.shiftKey) {
        store.dispatch(setOrigin(tree$2.editorState.location));
      }
      break;
    }
  }
}

var tree$3 = {};

var unsubscribe$3 = store.subscribe(function () {
  tree$3 = store.getState();
});

function delBackspace() {
  while (1) {
    var location = tree$3.editorState.location;

    if (location <= 0) break;
    var word = tree$3.words[location - 1];

    if (word instanceof Placeholder$1) {

      store.dispatch(setLocation(location - 1));
      store.dispatch(backspace());

      var last = tree$3.words[tree$3.editorState.location - 1];
      if (!last) {
        break;
      }
      word = tree$3.words[tree$3.editorState.location];
      if ((word instanceof Style$1 || word instanceof Group$1) && word.header) {
        //遇到空的样式节点就删除
        if (word.header === last) {
          store.dispatch(backspace());
          store.dispatch(setLocation(tree$3.editorState.location - 1));
          store.dispatch(backspace());
        }
        if (tree$3.words[tree$3.editorState.location - 1] instanceof Placeholder$1) {
          break;
        }
      } else {
        break;
      }
    } else {
      store.dispatch(setLocation(tree$3.editorState.location - 1));
    }
  }
  store.dispatch(setOrigin(tree$3.editorState.location));

  updateWordsProps(tree$3.editorState.location);
}

function renderContent(h, i) {
  var _children = [];
  for (; i < this._words.length; i++) {
    var w = this._words[i];
    var len = _children.length;
    if (w instanceof Style$1) {
      if (w.end) {
        var _renderContent$call = renderContent.call(this, h, i + 1),
            children = _renderContent$call.children,
            index = _renderContent$call.index;

        var attrs = { style: w.style };
        _children[len] = h(w.name, attrs, children);
        i = index;
      } else {
        return { children: _children, index: i };
      }
    } else if (w instanceof Group$1) {
      if (w.end) {
        var _renderContent$call2 = renderContent.call(this, h, i + 1),
            _children2 = _renderContent$call2.children,
            _index = _renderContent$call2.index;

        var _attrs = { style: w.style };
        _children[len] = h(w.name, _attrs, _children2);
        i = _index;
      } else {
        return { children: _children, index: i };
      }
    } else if (w instanceof Placeholder$1) {
      if (w instanceof Text) {
        if (w.constructor.name == 'Text') {
          _children[len] = w.value;
        } else {
          _children[len] = h(w.name, { domProps: { innerHTML: w.value } });
        }
      } else {
        var _attrs2 = { attrs: w.attrs, style: w.style };
        _children[len] = h(w.name, _attrs2, w.value);
      }
    }
  }
  return _children;
}

var Editor = { _scopeId: 'data-v-1f894013',
  name: 'editor',
  props: ['width', 'height'],
  data: function data() {
    return {
      state: {},
      words: [],
      hheadAscent: 0, //文字渲染后行高与文字高度比
      fontSize: 16,
      head: 0,
      isFocused: false,
      isProcess: false
    };
  },

  computed: {
    lineHeight: function lineHeight() {
      return this.fontSize * this.hheadAscent;
    },
    offsetY: function offsetY() {
      var a = Math.floor(this.height / this.lineHeight);
      var b = this.y();
      var m = b - this.head;
      if (m >= a) {
        this.head += m - a + 1;
      } else if (m < 0) {
        this.head += m;
      }
      return -this.head * this.lineHeight;
    },
    _words: function _words() {
      var _state = this.state,
          origin = _state.origin,
          location = _state.location;


      if (origin == location) {
        return this.words;
      }
      var words = this.words.slice();

      var a = origin,
          b = location;
      if (a > b) {
        var c = b;
        b = a;
        a = c;
      }
      var arr = this.words.slice(a, b);
      var start = new Style$1({
        'line-height': this.lineHeight + 'px',
        background: '#3390ff'
      });

      arr.unshift(start);
      arr.push(start.createEndIdentifier());
      words.splice.apply(words, [a, b - a].concat(toConsumableArray(arr)));

      return words;
    }
  },
  methods: {
    x: function x() {
      //Vue2取消了computed cache ,使用方法调用计算x y的值
      var location = this.state.location;

      var y = this.y();
      var width = 0;
      while (1) {
        if (location == 0) {
          break;
        }
        var word = this.words[--location];
        if (word.rowNum == y) {
          if (!word.width) continue;
          width = word.width;
          break;
        }
      }
      return width - 1;
    },
    y: function y() {
      var words = this.words;
      var location = this.state.location;

      var i = 0;
      while (location >= 0) {
        if (location == 0 && !words[location]) {
          //没有任何输入时
          return 0;
        }

        var word = words[--location];
        if (word instanceof Placeholder$1) {
          i = word.rowNum;
          if (word instanceof Enter) {
            //光标左边是换行时y+1
            i++;
          } else if (words[location + 1]) {
            if (words[location + 1].rowNum > word.rowNum) {
              i++;
            }
          }
          break;
        }
      }
      return i;
    },
    keydown: function keydown(event) {
      var key = event.key,
          code = event.code,
          shiftKey = event.shiftKey,
          ctrlKey = event.ctrlKey,
          altKey = event.altKey,
          target = event.target;
      var state = this.state,
          words = this.words;
      var location = state.location,
          rowsIndex = state.rowsIndex;

      if (key != 'Process') {
        this.isProcess = false;
        store.dispatch(scaKey(shiftKey, ctrlKey, altKey));

        switch (code) {
          case 'ArrowUp':
            moveUp$1();
            break;
          case 'ArrowDown':
            moveDown$1();
            break;
          case 'ArrowLeft':
            moveLeft$1();
            break;
          case 'ArrowRight':
            moveRight$1();
            break;
          case 'Backspace':
            delBackspace();
            break;
          case 'NumpadEnter': //Enter
          case 'Enter':
            //Enter
            addEnter(key);
            break;
          case 'ShiftLeft':
          case 'ControlLeft':
          case 'AltLeft':
          case 'ShiftRight':
          case 'ControlRight':
          case 'AltRight':
            break;
          default:
            addWord(key);
        }
        event.preventDefault();
      } else {
        this.isProcess = true;
      }
      // event.preventDefault();
    },
    oninput: function oninput(event) {
      var _event$target = event.target,
          selectionStart = _event$target.selectionStart,
          selectionEnd = _event$target.selectionEnd;


      if (this.isProcess && selectionStart == selectionEnd) {
        var text = [].concat(toConsumableArray(event.target.innerHTML));
        window.el = event.target;

        text.forEach(function (s) {
          addWord(s);
        });
        this.isProcess = false;
        // event.target.innerHTML = '';
      }
    },
    editorFocus: function editorFocus(event) {
      this.$refs.back.focus();
    }
  },
  created: function created() {
    var _this = this;

    var unsubscribe = store.subscribe(function () {
      setData(_this, store.getState());
    });
    store.dispatch(setLocation(0));
    store.dispatch(setWidth(this.width));
    store.dispatch(setHeight(this.height));
  },
  mounted: function mounted() {
    var sp = document.createElement('span');
    sp.style.fontSize = '1000px';
    sp.style.visibility = 'hidden';
    sp.style.position = 'absolute';
    sp.style.top = '0px';
    sp.style.left = '0px';
    sp.innerHTML = 'a';
    document.body.appendChild(sp);

    this.hheadAscent = sp.offsetHeight / 1000; // 获取真实行高比
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];

    var data = renderContent.call(this, h, 0);
    // console.log(this._words.map(w => w.value ? w.value+'=>'+w.rowNum+'-'+w.width : undefined))
    // console.log(this._words)
    return h(
      'div',
      { 'class': 'wrap', on: {
          'click': this.editorFocus
        },
        style: { 'width': this.width + 'px', 'height': this.height + 'px' } },
      [h(
        'textarea',
        {
          ref: 'back',
          'class': 'back', attrs: { contenteditable: 'true'
          },
          on: {
            'keydown': this.keydown,
            'input': this.oninput,
            'focus': function focus() {
              return _this2.isFocused = true;
            },
            'blur': function blur() {
              return _this2.isFocused = false;
            }
          }
        },
        []
      ), h(
        'div',
        {
          'class': ["editor", this.isFocused ? 'isFocused' : ''],
          style: {
            'line-height': this.lineHeight + 'px',
            '--x': this.x() + 'px',
            '--y': this.y() * this.lineHeight + 'px',
            'top': this.offsetY + 'px',
            'word-break': this.autoLinefeed ? 'break-all' : 'normal'
          }
        },
        [data.length || this.isFocused ? "" : h(
          'span',
          { style: { color: '#ccc' } },
          ['\u8BF7\u8F93\u5165\u5185\u5BB9...']
        ), data]
      )]
    );
  }
};

var App = {
  name: 'app',
  props: ['width', 'height'],
  data: function data() {
    return {
      state: {},
      words: []
    };
  },

  computed: {},
  methods: {
    clickingTools: function clickingTools(name) {
      if (name == 'bold') {
        if (this.state.location == this.state.origin) {
          return;
        }
        store.dispatch(addB());

        store.dispatch(setLocation(this.state.location + 1));
        store.dispatch(setOrigin(this.state.origin + 1));
      } else if (name == 'math') {
        addMath();
      }
    },
    submit: function submit(event) {
      var text = this.words.map(function (w) {
        if (w instanceof Placeholder) {
          return w.value;
        } else {
          if (w.end) {
            // return `<span style="font-weight:bold">`
            if (w instanceof Style) {
              return '<' + w.name + ' style="' + stringify(w.style) + '">';
            } else if (w instanceof Group) {
              return '<' + w.name + ' class="' + w.attrs.class + '">';
            }
          } else if (w.header) {
            return '</' + w.name + '>';
          }
        }
      }).join('');

      this.$emit('submit-content', text);
    }
  },

  created: function created() {
    var _this = this;

    var unsubscribe = store.subscribe(function () {
      setData(_this, store.getState());
    });
  },
  render: function render(h) {
    return h(
      'div',
      { 'class': 'xianEditor' },
      [h(
        Preview,
        {
          on: {
            'clickingTools': this.clickingTools
          }
        },
        []
      ), h(
        Editor,
        {
          attrs: { width: this.width, height: this.height }
        },
        []
      ), h(
        'button',
        {
          on: {
            'click': this.submit
          }
        },
        ['\u9884\u89C8']
      )]
    );
  }
};

exports.App = App;

}((this.xianEditor = this.xianEditor || {})));
//# sourceMappingURL=bundle.js.map
