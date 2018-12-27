(function () {
  var _ = function (element) {
    var u = {
      first: function () {
        return element[0];
      },
      last: function () {
        return element[element.length - 1];
      },
      without: function () {
        var args = [].slice.call(arguments);
        var newArr = [];
        element.forEach(function (x) {
          if (!args.includes(x)) {
            newArr.push(x);
          }
        });
        return newArr;
      },
      lastIndexOf: function (query) {
        var i;
        var start = element.length - 1;
        for (i = start; i >= 0; i -= 1) {
          if (element[i] === query) {
            return i;
          }
        }
        return -1;
      },
      sample: function (qty) {
        var sampled = [];
        var copy = element.slice();
        var get = function () {
          var idx = Math.floor(Math.random() * copy.length);
          var el = copy[idx];
          copy.splice(idx, 1);
          return el;
        };
        if (!qty) {
          return get();
        }
        while (qty) {
          sampled.push(get());
          qty -= 1;
        }
        return sampled;
      },
      findWhere: function (query) {
        return element.find(match(query));
      },
      where: function (query) {
        return element.filter(match(query));
      },
      pluck: function (key) {
        return element.map(function (obj) {
          return obj[key];
        });
      },
      keys: function () {
        return Object.keys(element);
      },
      values: function () {
        return Object.keys(element).map(function (key) {
          return element[key];
        });
      },
      pick: function () {
        var props = [].slice.call(arguments);
        var newObj = {};
        props.forEach(function (prop) {
          if (Object.prototype.hasOwnProperty.call(element, prop)) {
            newObj[prop] = element[prop];
          }
        });
        return newObj;
      },
      omit: function () {
        var props = [].slice.call(arguments);
        var newObj = {};
        Object.keys(element).forEach(function (key) {
          if (!props.includes(key)) {
            newObj[key] = element[key];
          }
        });
        return newObj;
      },
      has: function (prop) {
        return Object.prototype.hasOwnProperty.call(element, prop);
      },
    };

    function match(query) {
      return function (obj) {
        return Object.keys(query).every(function (key) {
          return obj[key] === query[key];
        });
      };
    }

    (['isElement', 'isArray', 'isObject', 'isFunction', 'isBoolean', 'isString', 'isNumber']).forEach(function (method) {
      u[method] = function () {
        _[method].call(u, element);
      };
    });

    _.range = function (a, b) {
      var start = b === undefined ? 0 : a;
      var end = b === undefined ? a : b;
      var newArr = [];
      var i;
      for (i = start; i < end; i += 1) {
        newArr.push(i);
      }
      return newArr;
    };

    _.extend = function (oldObj) {
      var objs = [].slice.call(arguments, 1);
      objs.forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
          oldObj[key] = obj[key];
        });
      });
      return oldObj;
    };

    _.isElement = function (obj) {
      return obj && obj.nodeType === 1;
    };


    _.isObject = function (obj) {
      var type = typeof obj;
      return type === 'function' || (type === 'object' && Boolean(obj));
    };

    ['Boolean', 'String', 'Number'].forEach(function (methodString) {
      _['is' + methodString] = function (obj) {
        return toString.call(obj) === '[object ' + methodString + ']';
      };
    });

    _.isArray = Array.isArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    };

    _.isFunction = function (obj) {
      return typeof obj === 'function';
    };
    return u;
  };

  window._ = _;
}());