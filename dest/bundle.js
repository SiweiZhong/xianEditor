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





var SET_ROWS_INDEX = 'SET_ROWS_INDEX';
var REMOVE_ROWS_INDEX = 'REMOVE_ROWS_INDEX';
var S_C_A_KEY = 'S_C_A_KEY';

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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
        console.log(state.map(function (v) {
          return v.value;
        }));
        state.splice(a, 0, { type: 'style', value: { name: 'b' } });
        state.splice(b + 1, 0, { type: 'closed' });
        console.log(state.map(function (v) {
          return v.value;
        }));
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
  altKey: false
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
    case SET_ROWS_INDEX:
      {
        var rows = [].concat(toConsumableArray(state.rowsIndex));
        rows.push(action.value);
        return Object.assign({}, state, {
          rowsIndex: rows.sort(function (a, b) {
            return a - b;
          })
        });
      }
    case REMOVE_ROWS_INDEX:
      {
        var _rows = [].concat(toConsumableArray(state.rowsIndex));
        action.value.forEach(function (v) {
          return _rows.splice(_rows.indexOf(v), 1);
        });
        return Object.assign({}, state, {
          rowsIndex: _rows
        });
      }
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
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "icons" }, [_c('span', { staticClass: "icon", on: { "click": _vm.clickingBold } }, [_vm._v("B")]), _vm._v(" "), _c('span', { staticClass: "icon", on: { "click": _vm.clickingAutoLinefeed } }, [_vm._v("Linefeed")]), _vm._v(" "), _c('span', { staticClass: "icon", on: { "click": _vm.clickingMath } }, [_vm._v("Math")])]);
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

function text$1(value) {
  return {
    type: 'text',
    value: value
  };
}
function placeholder$1(content, className) {
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var attr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return {
    type: 'placeholder',
    name: 'span',
    value: content,
    attrs: {
      attrs: Object.assign({
        class: 'placeholder ' + className
      }, attr),
      style: style
    }
  };
}
function enter$1(name) {
  return {
    type: 'enter',
    name: name
  };
}
function style$1(name, attr) {
  return {
    type: 'style',
    value: {
      name: name, attr: attr
    }
  };
}
function closed$1() {
  return {
    type: 'closed'
  };
}

function whereAmI(arr, loc) {
  var x = 0,
      y = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= loc) {
      break;
    }
    y++;
    x = arr[i];
  }
  x = x == 0 ? loc : loc - x - 1;

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
function setRowsIndex(location) {
  return { type: SET_ROWS_INDEX, value: location };
}
function removeRowsIndex(values) {
  if (!(values instanceof Array)) {
    values = [values];
  }
  return { type: REMOVE_ROWS_INDEX, value: values };
}
function scaKey(shiftKey, ctrlKey, altKey) {
  return { type: S_C_A_KEY, value: { shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey } };
}

var tree = {};

var unsubscribe = store.subscribe(function () {
  tree = store.getState();
});

function addSpace() {
  store.dispatch(addKey(placeholder$1('space')));
  store.dispatch(setLocation(tree.editorState.location + 1));
}
function addEnter() {
  store.dispatch(setRowsIndex(tree.editorState.location));
  store.dispatch(addKey(enter$1('br')));
  store.dispatch(setLocation(tree.editorState.location + 1));
}

var tree$1 = {};

var unsubscribe$1 = store.subscribe(function () {
  tree$1 = store.getState();
});

function moveUp$1() {
  var _whereAmI = whereAmI(tree$1.editorState.rowsIndex, tree$1.editorState.location),
      x = _whereAmI.x,
      y = _whereAmI.y;

  if (y !== 0) {
    var a = tree$1.editorState.rowsIndex[y - 2] || 0;
    var b = tree$1.editorState.rowsIndex[y - 1] - a;

    //本行长度比上一行长时，定位到上行结尾, b是个数,x是下标
    if (x > b - 1) {
      x = b; //a==0是边界情况
      if (a > 0) x--;
    }
    var loc = a == 0 ? x : a + x + 1;
    store.dispatch(setLocation(loc));
  }
}
function moveDown$1() {
  var _whereAmI2 = whereAmI(tree$1.editorState.rowsIndex, tree$1.editorState.location),
      x = _whereAmI2.x,
      y = _whereAmI2.y;

  if (y !== tree$1.editorState.rowsIndex.length) {
    var a = tree$1.editorState.rowsIndex[y + 1] || tree$1.words.length; //相当于最后一位补了换行符
    var b = a - tree$1.editorState.rowsIndex[y];

    if (x > b - 1) {
      x = b - 1;
    }
    var loc = tree$1.editorState.rowsIndex[y] + x + 1;
    store.dispatch(setLocation(loc));
  }
}
function moveLeft$1() {
  while (1) {
    if (tree$1.editorState.location == 0) {
      break;
    }
    var x = tree$1.editorState.location - 1;
    var word = tree$1.words[x];

    if (word.type == 'style' || word.type == 'closed') {
      store.dispatch(setLocation(x));
    } else {
      store.dispatch(setLocation(x));
      break;
    }
  }
}
function moveRight$1() {
  while (1) {
    if (tree$1.editorState.location == tree$1.words.length) {
      break;
    }
    var x = tree$1.editorState.location + 1;
    var word = tree$1.words[x];
    if (word && (word.type == 'style' || word.type == 'closed')) {
      store.dispatch(setLocation(x));
    } else {
      store.dispatch(setLocation(x));
      break;
    }
  }
}

var tree$2 = {};

var unsubscribe$2 = store.subscribe(function () {
  tree$2 = store.getState();
});

function delBackspace() {
  while (1) {
    var location = tree$2.editorState.location;

    if (location <= 0) break;
    var word = tree$2.words[location - 1];

    if (word.type != 'style' && word.type != 'closed') {
      if (word.type == 'enter') {
        store.dispatch(removeRowsIndex(location - 1));
      }
      store.dispatch(setLocation(location - 1));
      store.dispatch(backspace());

      word = tree$2.words[tree$2.editorState.location - 1];
      if (!word) {
        break;
      }
      if (word.type != 'style' && word.type != 'closed') {
        break;
      }
      if (tree$2.words[tree$2.editorState.location] == 'closed') {
        //遇到空的样式结点就删除
        if (tree$2.words[tree$2.editorState.location - 1] == 'style') {
          store.dispatch(setLocation(tree$2.editorState.location - 1));
          store.dispatch(backspace());
          store.dispatch(setLocation(tree$2.editorState.location - 1));
          store.dispatch(backspace());
        }
      } else if (word.type == 'style') {
        break;
      }
    } else {
      store.dispatch(setLocation(tree$2.editorState.location - 1));
    }
  }
}

var text = text$1;
var placeholder = placeholder$1;
var style = style$1;
var closed = closed$1;


function renderContent(h, i) {
  var _children = [];
  for (; i < this._words.length; i++) {
    var w = this._words[i];
    if (w.type == 'style') {
      var _renderContent$call = renderContent.call(this, h, i + 1),
          children = _renderContent$call.children,
          index = _renderContent$call.index;

      var attrs = Object.assign({}, w.attrs);

      _children[_children.length] = h(w.name, attrs, children);
      i = index;
    } else if (w.type == 'closed') {
      return { children: _children, index: i };
    } else if (w.type == 'placeholder' || w.type == 'enter') {
      var _attrs = Object.assign({}, w.attrs);
      _children[_children.length] = h(w.name, _attrs, w.value);
    } else {
      _children[_children.length] = w.value;
    }
  }
  return _children;
}

var App = { _scopeId: 'data-v-04c2046b',
  name: 'app',
  props: ['width', 'height'],
  data: function data() {
    return {
      data: [],
      state: {},
      words: [],
      hheadAscent: 0, //文字渲染后行高与文字高度比
      fontSize: 16,
      head: 0,
      autoLinefeed: true,
      input: undefined,
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
      var b = this.y;
      var m = b - this.head;

      if (m >= a) {
        this.head += m - a + 1;
        return -this.head * this.lineHeight;
      } else if (m < 0) {
        this.head += m;
        return -this.head * this.lineHeight;
      }
      return -this.head * this.lineHeight;
    },
    _words: function _words() {
      var _state = this.state,
          origin = _state.origin,
          location = _state.location;

      var words = this.words.slice();

      var text = '';
      var offsetWidth = 0;
      var width = 0;
      var rowNum = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (w.type == 'text') {
          if (this.autoLinefeed && offsetWidth + getFontWidth(text + w.value) > this.width) {
            text = '';
            offsetWidth = 0;
            rowNum++;
          }
          text += w.value;
          var _width = getFontWidth(text);

          w.width = offsetWidth + _width;
          w.rowNum = rowNum;
        } else if (w.type == 'enter') {
          text = '';
          w.width = width;
          w.rowNum = rowNum++;
        } else if (w.type == 'placeholder') {
          if (this.autoLinefeed && offsetWidth + getFontWidth(text + w.value) > this.width) {
            text = '';
            offsetWidth = 0;
            rowNum++;
          }
          var _width2 = getFontWidth(text);
          offsetWidth += w.attrs.attrs.width;
          w.width = offsetWidth + _width2;

          w.rowNum = rowNum;
        }
      }
      console.log(words.map(function (o) {
        return o.value;
      }));
      if (origin == location) {
        return words;
      }
      var a = origin,
          b = location;
      if (a > b) {
        var c = b;
        b = a;
        a = c;
      }
      var arr = this.words.slice(a, b);
      arr.unshift(style('span', {
        style: {
          'line-height': this.lineHeight + 'px',
          background: '#3390ff'
        }
      }));
      arr.push(closed());
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
      while (1) {
        if (location == 0 && !words[location]) {
          return 0;
        }
        var word = words[location--];
        if (word) {
          if (word.rowNum >= 0) {
            if (word.type == 'enter' && i > 0) {
              //光标左边是换行时y+1
              i += word.rowNum;
            } else {
              i = word.rowNum;
            }
            break;
          }
          continue;
        } else {
          // location是最后一位
          i = 1;
        }
      }
      return i;
    },
    clickingTools: function clickingTools(name) {
      if (name == 'bold') {
        if (this.state.location == this.state.origin) {
          return;
        }
        store.dispatch(addB());

        store.dispatch(setLocation(this.state.location + 1));
        store.dispatch(setOrigin(this.state.origin + 1));
      } else if (name == 'autoLinefeed') {
        this.autoLinefeed = arguments.length <= 1 ? undefined : arguments[1];
      } else if (name == 'math') {
        var width = getFontWidth('M') * 1.4;
        var node1 = placeholder('M', 'math_tag', { width: width + 'px' }, { width: width });
        var node2 = placeholder('M', 'math_tag', { width: width + 'px' }, { width: width });
        store.dispatch(addKey(node1));
        store.dispatch(setLocation(this.state.location + 1));
        store.dispatch(setOrigin(this.state.location));
        store.dispatch(addKey(node2));
      }
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

        if (code.slice(0, 3) == 'Key' || code.slice(0, 3) == 'Dig') {
          // 主键盘字母&数字
          store.dispatch(addKey(text(key)));
          store.dispatch(setLocation(location + 1));
        }

        switch (code) {
          case 'Backquote': // `
          case 'Minus': // -
          case 'Equal': // +

          case 'BracketLeft': // [
          case 'BracketRight': // ]

          case 'Backslash': // \
          case 'Semicolon': // ;
          case 'Quote': // '

          case 'Comma': // ,
          case 'Period': // .
          case 'Slash': // /

          case 'Numpad0':
          case 'Numpad1':
          case 'Numpad2':
          case 'Numpad3':
          case 'Numpad4':
          case 'Numpad5':
          case 'Numpad6':
          case 'Numpad7':
          case 'Numpad8':
          case 'Numpad9':

          case 'NumpadDecimal': // .
          case 'NumpadAdd': // +
          case 'NumpadSubtract': // -
          case 'NumpadMultiply': // *
          case 'NumpadDivide':
            // /
            store.dispatch(addKey(text(key)));
            store.dispatch(setLocation(location + 1));
        }

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
          case 'Space':
            addSpace();
            break;
          case 'Backspace':
            delBackspace();
            break;
          case 'NumpadEnter': //Enter
          case 'Enter':
            //Enter
            addEnter();
            break;
        }

        if (!shiftKey) {
          store.dispatch(setOrigin(this.state.location));
        }
        event.preventDefault();
      } else {
        this.isProcess = true;
      }

      // event.preventDefault();
    },
    oninput: function oninput(event) {
      var _this = this;

      var _event$target = event.target,
          selectionStart = _event$target.selectionStart,
          selectionEnd = _event$target.selectionEnd;


      if (this.isProcess && selectionStart == selectionEnd) {
        var _text = [].concat(toConsumableArray(event.target.innerHTML));
        window.el = event.target;

        _text.forEach(function (s) {
          store.dispatch(addKey(_text(s)));
          store.dispatch(setLocation(_this.state.location + 1));
        });
        this.isProcess = false;
        // event.target.innerHTML = '';
      }
    },
    editorFocus: function editorFocus(event) {
      this.$refs.back.focus();
    },
    submit: function submit(event) {
      var text = this.words.map(function (w) {
        if (w.type == "text") {
          return w.value;
        }
      }).join('');
      this.$emit('submit-content', text);
    }
  },

  created: function created() {
    var _this2 = this;

    var unsubscribe = store.subscribe(function () {
      setData(_this2, store.getState());
    });
    store.dispatch(setLocation(0));
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

    this.hheadAscent = sp.offsetHeight / 1000;
  },
  render: function render(h) {
    var _this3 = this;

    var data = renderContent.call(this, h, 0);
    return h(
      'div',
      { 'class': 'xianEditor', on: {
          'click': this.editorFocus
        }
      },
      [h(
        Preview,
        {
          on: {
            'clickingTools': this.clickingTools
          }
        },
        []
      ), h(
        'div',
        { 'class': 'wrap', style: { 'width': this.width + 'px', 'height': this.height + 'px' } },
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
                return _this3.isFocused = true;
              },
              'blur': function blur() {
                return _this3.isFocused = false;
              }
            }
          },
          []
        ), h(
          'div',
          { 'class': ["editor", this.isFocused ? 'isFocused' : ''],
            style: {
              'line-height': this.lineHeight + 'px',
              '--x': this.x() + 'px',
              '--y': this.y() * this.lineHeight + 'px',
              'top': this.offsetY + 'px',
              'word-break': this.autoLinefeed ? 'break-all' : 'normal'
            } },
          [data.length || this.isFocused ? "" : h(
            'span',
            { style: { color: '#ccc' } },
            ['\u8BF7\u8F93\u5165\u5185\u5BB9...']
          ), data]
        )]
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
