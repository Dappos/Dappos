'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('regenerator-runtime/runtime');
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
require('core-js/modules/es6.promise');
var axios = _interopDefault(require('axios'));

var currencyDefaults = {
  jpy: {
    decimal: '.',
    thousands: ',',
    prefix: '¥',
    suffix: '',
    precision: 0,
    masked: false
  },
  usd: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  },
  hkd: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  },
  aud: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  },
  twd: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  },
  sgd: {
    decimal: '.',
    thousands: ',',
    prefix: '$',
    suffix: '',
    precision: 2,
    masked: false
  },
  eur: {
    decimal: '.',
    thousands: ',',
    prefix: '€',
    suffix: '',
    precision: 2,
    masked: false
  },
  gbp: {
    decimal: '.',
    thousands: ',',
    prefix: '£',
    suffix: '',
    precision: 2,
    masked: false
  },
  krw: {
    decimal: '.',
    thousands: ',',
    prefix: '₩',
    suffix: '',
    precision: 2,
    masked: false
  }
};

var ethTo = {
  wei: 1000000000000000000,
  kwei: 1000000000000000,
  mwei: 1000000000000,
  gwei: 1000000000,
  szabo: 1000000,
  finney: 1000,
  eth: 1
};

function isFiat(currency) {
  currency = currency.toLowerCase();
  return currencyDefaults[currency];
}

function isETH(currency) {
  currency = currency.toLowerCase();
  return ethTo[currency];
}

function getRate(currency) {
  var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'eth';
  if (!currency) return;
  if (!currencyDefaults[currency.toLowerCase()]) return;
  currency = currency.toUpperCase();
  var tokenIds = {
    'eth': '1027',
    'dai': '2308'
  };
  var tokenId = tokenIds[token.toLowerCase()];
  var url = "https://api.coinmarketcap.com/v2/ticker/".concat(tokenId, "/?convert=").concat(currency);
  return axios.get(url).then(function (res) {
    var rate = res.data.data.quotes[currency].price;
    if (isNaN(rate)) return;
    return rate;
  }).catch(function (error) {
    console.error(error);
    return false;
  });
}
function convert(amount, from, to) {
  if (!from || !to || !amount || isNaN(amount)) return false;
  from = from.toLowerCase();
  to = to.toLowerCase();

  if (isETH(from) && isETH(to)) {
    var rate = ethTo[from];
    var result = amount / rate;
    result = result * ethTo[to];
    return result;
  }

  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var _rate, _result, _rate2, _result2, rate2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(isFiat(from) && isETH(to))) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return getRate(from);

            case 3:
              _rate = _context.sent;

              if (_rate) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              _result = amount / _rate;
              _result = _result * ethTo[to];
              return _context.abrupt("return", resolve(_result));

            case 9:
              if (!(isETH(from) && isFiat(to))) {
                _context.next = 19;
                break;
              }

              _rate2 = ethTo[from];

              if (_rate2) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return");

            case 13:
              _result2 = amount / _rate2;
              _context.next = 16;
              return getRate(to);

            case 16:
              rate2 = _context.sent;
              _result2 = _result2 * rate2;
              return _context.abrupt("return", resolve(_result2));

            case 19:
              reject(new Error('something bad happened'));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.ethTo = ethTo;
exports.getRate = getRate;
exports.default = convert;
