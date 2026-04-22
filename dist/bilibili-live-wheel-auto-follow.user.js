// ==UserScript==
// @name         B站独轮车 + 自动跟车 / Bilibili Live Auto Follow
// @namespace    https://github.com/aijc123/bilibili-live-wheel-auto-follow
// @version      2.5.11
// @author       aijc123
// @description  给 B 站/哔哩哔哩直播间用的弹幕助手：支持独轮车循环发送、自动跟车、粉丝牌禁言巡检、常规发送、同传、烂梗库和弹幕替换规则。
// @license      AGPL-3.0
// @icon         https://www.bilibili.com/favicon.ico
// @homepage     https://github.com/aijc123/bilibili-live-wheel-auto-follow
// @homepageURL  https://github.com/aijc123/bilibili-live-wheel-auto-follow
// @source       https://github.com/aijc123/bilibili-live-wheel-auto-follow.git
// @supportURL   https://github.com/aijc123/bilibili-live-wheel-auto-follow/issues
// @match        *://live.bilibili.com/*
// @require      https://unpkg.com/@soniox/speech-to-text-web@1.4.0/dist/speech-to-text-web.umd.cjs
// @require      data:application/javascript,%3Bwindow.SonioxSpeechToTextWeb%3Dwindow%5B%22speech-to-text-web%22%5D%3B
// @connect      bilibili-guard-room.vercel.app
// @connect      localhost
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (speechToTextWeb) {
  'use strict';

  var n$1, l$3, u$3, t$2, i$2, r$2, o$2, e$2, f$2, c$2, s$2, a$2, h$2, p$3, v$2, d$2 = {}, w$3 = [], _$3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g$2 = Array.isArray;
  function m$2(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function b$2(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k$1(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return x$2(l2, e2, i2, r2, null);
  }
  function x$2(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$3 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$3.vnode && l$3.vnode(e2), e2;
  }
  function S$1(n2) {
    return n2.children;
  }
  function C$1(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function $(n2, l2) {
    if (null == l2) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = m$2({}, u2);
      o2.__v = u2.__v + 1, l$3.vnode && l$3.vnode(o2), q$1(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? $(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, D(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && P(o2);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
    }), P(n2);
  }
  function A$1(n2) {
    (!n2.__d && (n2.__d = true) && i$2.push(n2) && !H.__r++ || r$2 != l$3.debounceRendering) && ((r$2 = l$3.debounceRendering) || o$2)(H);
  }
  function H() {
    try {
      for (var n2, l2 = 1; i$2.length; ) i$2.length > l2 && i$2.sort(e$2), n2 = i$2.shift(), l2 = i$2.length, I(n2);
    } finally {
      i$2.length = H.__r = 0;
    }
  }
  function L(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, _2, g2, m2 = t2 && t2.__k || w$3, b2 = l2.length;
    for (f2 = T$1(u2, l2, m2, f2, b2), a2 = 0; a2 < b2; a2++) null != (p2 = u2.__k[a2]) && (h2 = -1 != p2.__i && m2[p2.__i] || d$2, p2.__i = a2, _2 = q$1(n2, p2, h2, i2, r2, o2, e2, f2, c2, s2), v2 = p2.__e, p2.ref && h2.ref != p2.ref && (h2.ref && J(h2.ref, null, p2), s2.push(p2.ref, p2.__c || v2, p2)), null == y2 && null != v2 && (y2 = v2), (g2 = !!(4 & p2.__u)) || h2.__k === p2.__k ? (f2 = j$2(p2, f2, n2, g2), g2 && h2.__e && (h2.__e = null)) : "function" == typeof p2.type && void 0 !== _2 ? f2 = _2 : v2 && (f2 = v2.nextSibling), p2.__u &= -7);
    return u2.__e = y2, f2;
  }
  function T$1(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = x$2(null, o2, null, null, null) : g$2(o2) ? o2 = n2.__k[r2] = x$2(S$1, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = x$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = O(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $(e2)), K(e2, e2));
    return t2;
  }
  function j$2(n2, l2, u2, t2) {
    var i2, r2;
    if ("function" == typeof n2.type) {
      for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = j$2(i2[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = $(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function O(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || s2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (s2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function z$1(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || _$3.test(l2) ? u2 : u2 + "px";
  }
  function N(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || z$1(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || z$1(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(a$2, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2[s$2] = t2[s$2] : (u2[s$2] = h$2, n2.addEventListener(l2, r2 ? v$2 : p$3, r2)) : n2.removeEventListener(l2, r2 ? v$2 : p$3, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function V(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2[c$2]) u2[c$2] = h$2++;
        else if (u2[c$2] < t2[s$2]) return;
        return t2(l$3.event ? l$3.event(u2) : u2);
      }
    };
  }
  function q$1(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, d2, _2, k2, x2, M, $2, I2, P2, A2, H2, T2 = u2.type;
    if (void 0 !== u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$3.__b) && a2(u2);
    n: if ("function" == typeof T2) try {
      if (k2 = u2.props, x2 = T2.prototype && T2.prototype.render, M = (a2 = T2.contextType) && i2[a2.__c], $2 = a2 ? M ? M.props.value : a2.__ : i2, t2.__c ? _2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (x2 ? u2.__c = h2 = new T2(k2, $2) : (u2.__c = h2 = new C$1(k2, $2), h2.constructor = T2, h2.render = Q), M && M.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), x2 && null == h2.__s && (h2.__s = h2.state), x2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = m$2({}, h2.__s)), m$2(h2.__s, T2.getDerivedStateFromProps(k2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) x2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), x2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (x2 && null == T2.getDerivedStateFromProps && k2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(k2, $2), u2.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(k2, h2.__s, $2)) {
          u2.__v != t2.__v && (h2.props = k2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), w$3.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(k2, h2.__s, $2), x2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, d2);
        });
      }
      if (h2.context = $2, h2.props = k2, h2.__P = n2, h2.__e = false, I2 = l$3.__r, P2 = 0, x2) h2.state = h2.__s, h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), w$3.push.apply(h2.__h, h2._sb), h2._sb = [];
      else do {
        h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++P2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i2 = m$2(m$2({}, i2), h2.getChildContext())), x2 && !p2 && null != h2.getSnapshotBeforeUpdate && (d2 = h2.getSnapshotBeforeUpdate(v2, y2)), A2 = null != a2 && a2.type === S$1 && null == a2.key ? E$1(a2.props.children) : a2, f2 = L(n2, g$2(A2) ? A2 : [A2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), _2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (H2 = o2.length; H2--; ) b$2(o2[H2]);
        B$1(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || B$1(u2);
      l$3.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = G(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
    return (a2 = l$3.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function B$1(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B$1));
  }
  function D(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) J(t2[i2], t2[++i2], t2[++i2]);
    l$3.__c && l$3.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$3.__e(n3, u3.__v);
      }
    });
  }
  function E$1(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g$2(n2) ? n2.map(E$1) : m$2({}, n2);
  }
  function G(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, w2, _2, m2 = i2.props || d$2, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((y2 = e2[a2]) && "setAttribute" in y2 == !!x2 && (x2 ? y2.localName == x2 : 3 == y2.nodeType)) {
        u2 = y2, e2[a2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$3.__m && l$3.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) m2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = e2 && n$1.call(u2.childNodes), !c2 && null != e2) for (m2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) m2[(y2 = u2.attributes[a2]).name] = y2.value;
      for (a2 in m2) y2 = m2[a2], "dangerouslySetInnerHTML" == a2 ? p2 = y2 : "children" == a2 || a2 in k2 || "value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2 || N(u2, a2, null, y2, o2);
      for (a2 in k2) y2 = k2[a2], "children" == a2 ? v2 = y2 : "dangerouslySetInnerHTML" == a2 ? h2 = y2 : "value" == a2 ? w2 = y2 : "checked" == a2 ? _2 = y2 : c2 && "function" != typeof y2 || m2[a2] === y2 || N(u2, a2, y2, m2[a2], o2);
      if (h2) c2 || p2 && (h2.__html == p2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (p2 && (u2.innerHTML = ""), L("template" == t2.type ? u2.content : u2, g$2(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && $(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) b$2(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == w2 ? u2.removeAttribute("value") : null != w2 && (w2 !== u2[a2] || "progress" == x2 && !w2 || "option" == x2 && w2 != m2[a2]) && N(u2, a2, w2, m2[a2], o2), a2 = "checked", null != _2 && _2 != u2[a2] && N(u2, a2, _2, m2[a2], o2));
    }
    return u2;
  }
  function J(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$3.__e(n3, t2);
    }
  }
  function K(n2, u2, t2) {
    var i2, r2;
    if (l$3.unmount && l$3.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || J(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$3.__e(n3, u2);
      }
      i2.base = i2.__P = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && K(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || b$2(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function R(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$3.__ && l$3.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], q$1(t2, u2 = t2.__k = k$1(S$1, null, [u2]), o2 || d$2, d$2, t2.namespaceURI, o2 ? null : t2.firstChild ? n$1.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), D(e2, u2, f2);
  }
  n$1 = w$3.slice, l$3 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$3 = 0, t$2 = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C$1.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$2({}, this.state), "function" == typeof n2 && (n2 = n2(m$2({}, u2), this.props)), n2 && m$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), A$1(this));
  }, C$1.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A$1(this));
  }, C$1.prototype.render = S$1, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$2 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, H.__r = 0, f$2 = Math.random().toString(8), c$2 = "__d" + f$2, s$2 = "__a" + f$2, a$2 = /(PointerCapture)$|Capture$/i, h$2 = 0, p$3 = V(false), v$2 = V(true);
  var f$1 = 0;
  function u$2(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$3.vnode && l$3.vnode(l2), l2;
  }
  var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  var t$1, r$1, u$1, i$1, o$1 = 0, f = [], c$1 = l$3, e$1 = c$1.__b, a$1 = c$1.__r, v$1 = c$1.diffed, l$2 = c$1.__c, m$1 = c$1.unmount, s$1 = c$1.__;
  function p$2(n2, t2) {
    c$1.__h && c$1.__h(r$1, n2, o$1 || t2), o$1 = 0;
    var u2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function y$2(n2, u2) {
    var i2 = p$2(t$1++, 3);
    !c$1.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__H.__h.push(i2));
  }
  function _$2(n2, u2) {
    var i2 = p$2(t$1++, 4);
    !c$1.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__h.push(i2));
  }
  function A(n2) {
    return o$1 = 5, T(function() {
      return { current: n2 };
    }, []);
  }
  function T(n2, r2) {
    var u2 = p$2(t$1++, 7);
    return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function j$1() {
    for (var n2; n2 = f.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2) try {
        t2.__h.some(z), t2.__h.some(B), t2.__h = [];
      } catch (r2) {
        t2.__h = [], c$1.__e(r2, n2.__v);
      }
    }
  }
  c$1.__b = function(n2) {
    r$1 = null, e$1 && e$1(n2);
  }, c$1.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$1 && s$1(n2, t2);
  }, c$1.__r = function(n2) {
    a$1 && a$1(n2), t$1 = 0;
    var i2 = (r$1 = n2.__c).__H;
    i2 && (u$1 === r$1 ? (i2.__h = [], r$1.__h = [], i2.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.some(z), i2.__h.some(B), i2.__h = [], t$1 = 0)), u$1 = r$1;
  }, c$1.diffed = function(n2) {
    v$1 && v$1(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i$1 === c$1.requestAnimationFrame || ((i$1 = c$1.requestAnimationFrame) || w$2)(j$1)), t2.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u$1 = r$1 = null;
  }, c$1.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.some(z), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c$1.__e(r2, n3.__v);
      }
    }), l$2 && l$2(n2, t2);
  }, c$1.unmount = function(n2) {
    m$1 && m$1(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.some(function(n3) {
      try {
        z(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c$1.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w$2(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n2) {
    var t2 = r$1, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
  }
  function B(n2) {
    var t2 = r$1;
    n2.__c = n2.__(), r$1 = t2;
  }
  function C(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  var i = Symbol.for("preact-signals");
  function t() {
    if (!(s > 1)) {
      var i2, t2 = false;
      !(function() {
        var i3 = c;
        c = void 0;
        while (void 0 !== i3) {
          if (i3.S.v === i3.v) i3.S.i = i3.i;
          i3 = i3.o;
        }
      })();
      while (void 0 !== h$1) {
        var n2 = h$1;
        h$1 = void 0;
        v++;
        while (void 0 !== n2) {
          var r2 = n2.u;
          n2.u = void 0;
          n2.f &= -3;
          if (!(8 & n2.f) && w$1(n2)) try {
            n2.c();
          } catch (n3) {
            if (!t2) {
              i2 = n3;
              t2 = true;
            }
          }
          n2 = r2;
        }
      }
      v = 0;
      s--;
      if (t2) throw i2;
    } else s--;
  }
  function n(i2) {
    if (s > 0) return i2();
    e = ++u;
    s++;
    try {
      return i2();
    } finally {
      t();
    }
  }
  var r = void 0;
  function o(i2) {
    var t2 = r;
    r = void 0;
    try {
      return i2();
    } finally {
      r = t2;
    }
  }
  var h$1 = void 0, s = 0, v = 0, u = 0, e = 0, c = void 0, d$1 = 0;
  function a(i2) {
    if (void 0 !== r) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== r) {
        t2 = { i: 0, S: i2, p: r.s, n: void 0, t: r, e: void 0, x: void 0, r: t2 };
        if (void 0 !== r.s) r.s.n = t2;
        r.s = t2;
        i2.n = t2;
        if (32 & r.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = r.s;
          t2.n = void 0;
          r.s.n = t2;
          r.s = t2;
        }
        return t2;
      }
    }
  }
  function l$1(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  l$1.prototype.brand = i;
  l$1.prototype.h = function() {
    return true;
  };
  l$1.prototype.S = function(i2) {
    var t2 = this, n2 = this.t;
    if (n2 !== i2 && void 0 === i2.e) {
      i2.x = n2;
      this.t = i2;
      if (void 0 !== n2) n2.e = i2;
      else o(function() {
        var i3;
        null == (i3 = t2.W) || i3.call(t2);
      });
    }
  };
  l$1.prototype.U = function(i2) {
    var t2 = this;
    if (void 0 !== this.t) {
      var n2 = i2.e, r2 = i2.x;
      if (void 0 !== n2) {
        n2.x = r2;
        i2.e = void 0;
      }
      if (void 0 !== r2) {
        r2.e = n2;
        i2.x = void 0;
      }
      if (i2 === this.t) {
        this.t = r2;
        if (void 0 === r2) o(function() {
          var i3;
          null == (i3 = t2.Z) || i3.call(t2);
        });
      }
    }
  };
  l$1.prototype.subscribe = function(i2) {
    var t2 = this;
    return j(function() {
      var n2 = t2.value, o2 = r;
      r = void 0;
      try {
        i2(n2);
      } finally {
        r = o2;
      }
    }, { name: "sub" });
  };
  l$1.prototype.valueOf = function() {
    return this.value;
  };
  l$1.prototype.toString = function() {
    return this.value + "";
  };
  l$1.prototype.toJSON = function() {
    return this.value;
  };
  l$1.prototype.peek = function() {
    var i2 = r;
    r = void 0;
    try {
      return this.value;
    } finally {
      r = i2;
    }
  };
  Object.defineProperty(l$1.prototype, "value", { get: function() {
    var i2 = a(this);
    if (void 0 !== i2) i2.i = this.i;
    return this.v;
  }, set: function(i2) {
    if (i2 !== this.v) {
      if (v > 100) throw new Error("Cycle detected");
      !(function(i3) {
        if (0 !== s && 0 === v) {
          if (i3.l !== e) {
            i3.l = e;
            c = { S: i3, v: i3.v, i: i3.i, o: c };
          }
        }
      })(this);
      this.v = i2;
      this.i++;
      d$1++;
      s++;
      try {
        for (var n2 = this.t; void 0 !== n2; n2 = n2.x) n2.t.N();
      } finally {
        t();
      }
    }
  } });
  function y$1(i2, t2) {
    return new l$1(i2, t2);
  }
  function w$1(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function _$1(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var n2 = t2.S.n;
      if (void 0 !== n2) t2.r = n2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function b$1(i2) {
    var t2 = i2.s, n2 = void 0;
    while (void 0 !== t2) {
      var r2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== r2) r2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = r2;
      } else n2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = r2;
    }
    i2.s = n2;
  }
  function p$1(i2, t2) {
    l$1.call(this, void 0);
    this.x = i2;
    this.s = void 0;
    this.g = d$1 - 1;
    this.f = 4;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  p$1.prototype = new l$1();
  p$1.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === d$1) return true;
    this.g = d$1;
    this.f |= 1;
    if (this.i > 0 && !w$1(this)) {
      this.f &= -2;
      return true;
    }
    var i2 = r;
    try {
      _$1(this);
      r = this;
      var t2 = this.x();
      if (16 & this.f || this.v !== t2 || 0 === this.i) {
        this.v = t2;
        this.f &= -17;
        this.i++;
      }
    } catch (i3) {
      this.v = i3;
      this.f |= 16;
      this.i++;
    }
    r = i2;
    b$1(this);
    this.f &= -2;
    return true;
  };
  p$1.prototype.S = function(i2) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    l$1.prototype.S.call(this, i2);
  };
  p$1.prototype.U = function(i2) {
    if (void 0 !== this.t) {
      l$1.prototype.U.call(this, i2);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  p$1.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
    }
  };
  Object.defineProperty(p$1.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i2 = a(this);
    this.h();
    if (void 0 !== i2) i2.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function g$1(i2, t2) {
    return new p$1(i2, t2);
  }
  function S(i2) {
    var n2 = i2.m;
    i2.m = void 0;
    if ("function" == typeof n2) {
      s++;
      var o2 = r;
      r = void 0;
      try {
        n2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        m(i2);
        throw t2;
      } finally {
        r = o2;
        t();
      }
    }
  }
  function m(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    S(i2);
  }
  function x$1(i2) {
    if (r !== this) throw new Error("Out-of-order effect");
    b$1(this);
    r = i2;
    this.f &= -2;
    if (8 & this.f) m(this);
    t();
  }
  function E(i2, t2) {
    this.x = i2;
    this.m = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
  }
  E.prototype.c = function() {
    var i2 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.m = t2;
    } finally {
      i2();
    }
  };
  E.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    S(this);
    _$1(this);
    s++;
    var i2 = r;
    r = this;
    return x$1.bind(this, i2);
  };
  E.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.u = h$1;
      h$1 = this;
    }
  };
  E.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) m(this);
  };
  E.prototype.dispose = function() {
    this.d();
  };
  function j(i2, t2) {
    var n2 = new E(i2, t2);
    try {
      n2.c();
    } catch (i3) {
      n2.d();
      throw i3;
    }
    var r2 = n2.d.bind(n2);
    r2[Symbol.dispose] = r2;
    return r2;
  }
  var l, d, h, p = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__, _ = [];
  j(function() {
    l = this.N;
  })();
  function g(i2, r2) {
    l$3[i2] = r2.bind(null, l$3[i2] || function() {
    });
  }
  function b(i2) {
    if (h) {
      var n2 = h;
      h = void 0;
      n2();
    }
    h = i2 && i2.S();
  }
  function y(i2) {
    var n2 = this, t2 = i2.data, e2 = useSignal(t2);
    e2.value = t2;
    var f2 = T(function() {
      var i3 = n2, t3 = n2.__v;
      while (t3 = t3.__) if (t3.__c) {
        t3.__c.__$f |= 4;
        break;
      }
      var o2 = g$1(function() {
        var i4 = e2.value.value;
        return 0 === i4 ? 0 : true === i4 ? "" : i4 || "";
      }), f3 = g$1(function() {
        return !Array.isArray(o2.value) && !t$2(o2.value);
      }), a3 = j(function() {
        this.N = F;
        if (f3.value) {
          var n3 = o2.value;
          if (i3.__v && i3.__v.__e && 3 === i3.__v.__e.nodeType) i3.__v.__e.data = n3;
        }
      }), v3 = n2.__$u.d;
      n2.__$u.d = function() {
        a3();
        v3.call(this);
      };
      return [f3, o2];
    }, []), a2 = f2[0], v2 = f2[1];
    return a2.value ? v2.peek() : v2.value;
  }
  y.displayName = "ReactiveTextNode";
  Object.defineProperties(l$1.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: y }, props: { configurable: true, get: function() {
    var i2 = this;
    return { data: { get value() {
      return i2.value;
    } } };
  } }, __b: { configurable: true, value: 1 } });
  g("__b", function(i2, n2) {
    if ("string" == typeof n2.type) {
      var r2, t2 = n2.props;
      for (var o2 in t2) if ("children" !== o2) {
        var e2 = t2[o2];
        if (e2 instanceof l$1) {
          if (!r2) n2.__np = r2 = {};
          r2[o2] = e2;
          t2[o2] = e2.peek();
        }
      }
    }
    i2(n2);
  });
  g("__r", function(i2, n2) {
    i2(n2);
    if (n2.type !== S$1) {
      b();
      var r2, o2 = n2.__c;
      if (o2) {
        o2.__$f &= -2;
        if (void 0 === (r2 = o2.__$u)) o2.__$u = r2 = (function(i3, n3) {
          var r3;
          j(function() {
            r3 = this;
          }, { name: n3 });
          r3.c = i3;
          return r3;
        })(function() {
          var i3;
          if (p) null == (i3 = r2.y) || i3.call(r2);
          o2.__$f |= 1;
          o2.setState({});
        }, "function" == typeof n2.type ? n2.type.displayName || n2.type.name : "");
      }
      d = o2;
      b(r2);
    }
  });
  g("__e", function(i2, n2, r2, t2) {
    b();
    d = void 0;
    i2(n2, r2, t2);
  });
  g("diffed", function(i2, n2) {
    b();
    d = void 0;
    var r2;
    if ("string" == typeof n2.type && (r2 = n2.__e)) {
      var t2 = n2.__np, o2 = n2.props;
      if (t2) {
        var e2 = r2.U;
        if (e2) for (var f2 in e2) {
          var u2 = e2[f2];
          if (void 0 !== u2 && !(f2 in t2)) {
            u2.d();
            e2[f2] = void 0;
          }
        }
        else {
          e2 = {};
          r2.U = e2;
        }
        for (var a2 in t2) {
          var c2 = e2[a2], v2 = t2[a2];
          if (void 0 === c2) {
            c2 = w(r2, a2, v2);
            e2[a2] = c2;
          } else c2.o(v2, o2);
        }
        for (var s2 in t2) o2[s2] = t2[s2];
      }
    }
    i2(n2);
  });
  function w(i2, n2, r2, t2) {
    var o2 = n2 in i2 && void 0 === i2.ownerSVGElement, e2 = y$1(r2), f2 = r2.peek();
    return { o: function(i3, n3) {
      e2.value = i3;
      f2 = i3.peek();
    }, d: j(function() {
      this.N = F;
      var r3 = e2.value.value;
      if (f2 !== r3) {
        f2 = void 0;
        if (o2) i2[n2] = r3;
        else if (null != r3 && (false !== r3 || "-" === n2[4])) i2.setAttribute(n2, r3);
        else i2.removeAttribute(n2);
      } else f2 = void 0;
    }) };
  }
  g("unmount", function(i2, n2) {
    if ("string" == typeof n2.type) {
      var r2 = n2.__e;
      if (r2) {
        var t2 = r2.U;
        if (t2) {
          r2.U = void 0;
          for (var o2 in t2) {
            var e2 = t2[o2];
            if (e2) e2.d();
          }
        }
      }
      n2.__np = void 0;
    } else {
      var f2 = n2.__c;
      if (f2) {
        var u2 = f2.__$u;
        if (u2) {
          f2.__$u = void 0;
          u2.d();
        }
      }
    }
    i2(n2);
  });
  g("__h", function(i2, n2, r2, t2) {
    if (t2 < 3 || 9 === t2) n2.__$f |= 2;
    i2(n2, r2, t2);
  });
  C$1.prototype.shouldComponentUpdate = function(i2, n2) {
    if (this.__R) return true;
    var r2 = this.__$u, t2 = r2 && void 0 !== r2.s;
    for (var o2 in n2) return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      var e2 = 2 & this.__$f;
      if (!(t2 || e2 || 4 & this.__$f)) return true;
      if (1 & this.__$f) return true;
    } else {
      if (!(t2 || 4 & this.__$f)) return true;
      if (3 & this.__$f) return true;
    }
    for (var f2 in i2) if ("__source" !== f2 && i2[f2] !== this.props[f2]) return true;
    for (var u2 in this.props) if (!(u2 in i2)) return true;
    return false;
  };
  function useSignal(i2, n2) {
    return T(function() {
      return y$1(i2, n2);
    }, []);
  }
  function useComputed(i2, n2) {
    var r2 = A(i2);
    r2.current = i2;
    d.__$f |= 4;
    return T(function() {
      return g$1(function() {
        return r2.current();
      }, n2);
    }, []);
  }
  var q = function(i2) {
    queueMicrotask(function() {
      queueMicrotask(i2);
    });
  };
  function x() {
    n(function() {
      var i2;
      while (i2 = _.shift()) l.call(i2);
    });
  }
  function F() {
    if (1 === _.push(this)) (l$3.requestAnimationFrame || q)(x);
  }
  function gmSignal(key, defaultValue) {
    const s2 = y$1(_GM_getValue(key, defaultValue));
    j(() => _GM_setValue(key, s2.value));
    return s2;
  }
  function getGraphemes(str) {
    const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
    return Array.from(segmenter.segment(str), ({ segment }) => segment);
  }
  function trimText(text, maxLength2) {
    if (!text) return [text];
    const graphemes = getGraphemes(text);
    if (graphemes.length <= maxLength2) return [text];
    const parts = [];
    let currentPart = [];
    let currentLength = 0;
    for (const char of graphemes) {
      if (currentLength >= maxLength2) {
        parts.push(currentPart.join(""));
        currentPart = [char];
        currentLength = 1;
      } else {
        currentPart.push(char);
        currentLength++;
      }
    }
    if (currentPart.length > 0) {
      parts.push(currentPart.join(""));
    }
    return parts;
  }
  function stripTrailingPunctuation(text) {
    if (!text) return text;
    return text.replace(/[.,!?;:。，、！？；：…]+$/, "");
  }
  const SENTENCE_PUNCT = new Set([".", "?", "!", "。", "？", "！", "…"]);
  const CLAUSE_PUNCT = new Set([",", ";", ":", "、", "，", "；", "："]);
  function splitTextSmart(text, maxLen, opts = {}) {
    if (!text || maxLen <= 0) return [text];
    const graphemes = getGraphemes(text);
    if (graphemes.length <= maxLen) return [text];
    const lookback = opts.lookback ?? Math.max(4, Math.floor(maxLen / 3));
    const minTail = Math.min(maxLen, opts.minTail ?? Math.max(3, Math.floor(maxLen / 8)));
    const isWs = (g2) => g2.length === 1 && /\s/.test(g2);
    const parts = [];
    let i2 = 0;
    while (i2 < graphemes.length) {
      while (i2 < graphemes.length && isWs(graphemes[i2])) i2++;
      if (i2 >= graphemes.length) break;
      const remaining = graphemes.length - i2;
      if (remaining <= maxLen) {
        parts.push(graphemes.slice(i2).join(""));
        break;
      }
      const windowEnd = i2 + maxLen;
      const minBreak = Math.max(i2 + 1, windowEnd - lookback);
      let cut = -1;
      let skipNext = 0;
      for (let j2 = windowEnd - 1; j2 >= minBreak; j2--) {
        if (SENTENCE_PUNCT.has(graphemes[j2])) {
          cut = j2 + 1;
          break;
        }
      }
      if (cut === -1) {
        for (let j2 = windowEnd - 1; j2 >= minBreak; j2--) {
          if (CLAUSE_PUNCT.has(graphemes[j2])) {
            cut = j2 + 1;
            break;
          }
        }
      }
      if (cut === -1) {
        for (let j2 = windowEnd - 1; j2 >= minBreak; j2--) {
          if (isWs(graphemes[j2])) {
            cut = j2;
            skipNext = 1;
            break;
          }
        }
      }
      if (cut === -1) cut = windowEnd;
      parts.push(graphemes.slice(i2, cut).join(""));
      i2 = cut + skipNext;
    }
    if (parts.length >= 2) {
      const lastG = getGraphemes(parts[parts.length - 1]);
      if (lastG.length < minTail) {
        const prevG = getGraphemes(parts[parts.length - 2]);
        const transfer = Math.min(minTail - lastG.length, prevG.length - 1);
        if (transfer > 0) {
          parts[parts.length - 2] = prevG.slice(0, prevG.length - transfer).join("");
          parts[parts.length - 1] = prevG.slice(prevG.length - transfer).join("") + parts[parts.length - 1];
        }
      }
    }
    return parts;
  }
  function extractRoomNumber(url) {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/").filter((segment) => segment !== "");
    return pathSegments.find((segment) => Number.isInteger(Number(segment)));
  }
  function addRandomCharacter(text) {
    if (!text || text.length === 0) return text;
    const graphemes = getGraphemes(text);
    const randomIndex = Math.floor(Math.random() * (graphemes.length + 1));
    graphemes.splice(randomIndex, 0, "­");
    return graphemes.join("");
  }
  function formatDanmakuError(error) {
    if (!error) return "未知错误";
    if (error === "f" || error.includes("f")) return "f - 包含全局屏蔽词";
    if (error === "k" || error.includes("k")) return "k - 包含房间屏蔽词";
    return error;
  }
  function processMessages(text, maxLength2, addRandomChar = false) {
    return text.split("\n").flatMap((line) => {
      let l2 = line;
      if (addRandomChar && l2?.trim()) {
        l2 = addRandomCharacter(l2);
      }
      return trimText(l2, maxLength2);
    }).filter((line) => line?.trim());
  }
  const maxLogLines = gmSignal("maxLogLines", 1e3);
  const logLines = y$1([]);
  function appendLog(arg, label, display) {
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const message = typeof arg === "string" ? `${ts} ${arg}` : arg.cancelled ? `${ts} ⏭ ${label}: ${display}（被手动发送中断）` : arg.success ? `${ts} ✅ ${label}: ${display}` : `${ts} ❌ ${label}: ${display}，原因：${formatDanmakuError(arg.error)}`;
    const max = maxLogLines.value;
    const lines = logLines.value;
    const next = lines.length >= max ? [...lines.slice(lines.length - max + 1), message] : [...lines, message];
    logLines.value = next;
  }
  const msgSendInterval = gmSignal("msgSendInterval", 1);
  const maxLength = gmSignal("maxLength", 38);
  const randomColor = gmSignal("randomColor", false);
  const randomInterval = gmSignal("randomInterval", false);
  const randomChar = gmSignal("randomChar", false);
  const aiEvasion = gmSignal("aiEvasion", false);
  const forceScrollDanmaku = gmSignal("forceScrollDanmaku", false);
  const optimizeLayout = gmSignal("optimizeLayout", false);
  const danmakuDirectMode = gmSignal("danmakuDirectMode", true);
  const danmakuDirectConfirm = gmSignal("danmakuDirectConfirm", false);
  const danmakuDirectAlwaysShow = gmSignal("danmakuDirectAlwaysShow", false);
  const unlockForbidLive = gmSignal("unlockForbidLive", true);
  const guardRoomEndpoint = gmSignal("guardRoomEndpoint", "https://bilibili-guard-room.vercel.app");
  const guardRoomSyncKey = gmSignal("guardRoomSyncKey", "");
  const activeTab = gmSignal("activeTab", "fasong");
  const msgTemplates = gmSignal("MsgTemplates", []);
  const activeTemplateIndex = gmSignal("activeTemplateIndex", 0);
  const logPanelOpen = gmSignal("logPanelOpen", false);
  const autoSendPanelOpen = gmSignal("autoSendPanelOpen", true);
  const autoBlendPanelOpen = gmSignal("autoBlendPanelOpen", true);
  const normalSendPanelOpen = gmSignal("normalSendPanelOpen", true);
  const memesPanelOpen = gmSignal("memesPanelOpen", true);
  const dialogOpen = gmSignal("dialogOpen", false);
  const autoBlendWindowSec = gmSignal("autoBlendWindowSec", 20);
  const autoBlendThreshold = gmSignal("autoBlendThreshold", 4);
  const autoBlendCooldownSec = gmSignal("autoBlendCooldownSec", 35);
  const autoBlendRoutineIntervalSec = gmSignal("autoBlendRoutineIntervalSec", 60);
  const autoBlendPreset = gmSignal("autoBlendPreset", "normal");
  const autoBlendAdvancedOpen = gmSignal("autoBlendAdvancedOpen", false);
  gmSignal("autoBlendDryRun", true);
  gmSignal("autoBlendAvoidRisky", true);
  gmSignal("autoBlendBlockedWords", "抽奖\n加群\n私信\n房管\n举报");
  const autoBlendIncludeReply = gmSignal("autoBlendIncludeReply", false);
  const autoBlendUseReplacements = gmSignal("autoBlendUseReplacements", true);
  const autoBlendRequireDistinctUsers = gmSignal("autoBlendRequireDistinctUsers", true);
  const autoBlendMinDistinctUsers = gmSignal("autoBlendMinDistinctUsers", 3);
  const autoBlendSendCount = gmSignal("autoBlendSendCount", 1);
  const autoBlendSendAllTrending = gmSignal("autoBlendSendAllTrending", false);
  const enableMemeContribution = gmSignal("enableMemeContribution", false);
  const memeContributorCandidates = gmSignal("memeContributorCandidates", []);
  const memeContributorSeenTexts = gmSignal("memeContributorSeenTexts", []);
  const sonioxApiKey = gmSignal("sonioxApiKey", "");
  const sonioxLanguageHints = gmSignal("sonioxLanguageHints", ["zh"]);
  const sonioxAutoSend = gmSignal("sonioxAutoSend", true);
  const sonioxMaxLength = gmSignal("sonioxMaxLength", 40);
  const sonioxWrapBrackets = gmSignal("sonioxWrapBrackets", false);
  const sonioxTranslationEnabled = gmSignal("sonioxTranslationEnabled", false);
  const sonioxTranslationTarget = gmSignal("sonioxTranslationTarget", "en");
  (() => {
    const old = _GM_getValue("replacementRules", []);
    if (old.length > 0) {
      const existing = _GM_getValue("localGlobalRules", []);
      if (existing.length === 0) {
        _GM_setValue("localGlobalRules", old);
      }
      _GM_deleteValue("replacementRules");
    }
  })();
  const localGlobalRules = gmSignal("localGlobalRules", []);
  const localRoomRules = gmSignal("localRoomRules", {});
  const remoteKeywords = gmSignal("remoteKeywords", null);
  const remoteKeywordsLastSync = gmSignal("remoteKeywordsLastSync", null);
  const persistSendState = gmSignal("persistSendState", {});
  const sendMsg = y$1(false);
  const sttRunning = y$1(false);
  const cachedRoomId = y$1(null);
  const autoBlendEnabled = y$1(false);
  const autoBlendStatusText = y$1("已关闭");
  const autoBlendCandidateText = y$1("暂无");
  const autoBlendLastActionText = y$1("暂无");
  let sendStateRestored = false;
  j(() => {
    const persist = persistSendState.value;
    const roomId = cachedRoomId.value;
    const sending = sendMsg.value;
    if (roomId === null) return;
    const key = String(roomId);
    if (persist[key]) {
      if (!sendStateRestored) {
        sendStateRestored = true;
        const stored2 = _GM_getValue("persistedSendMsg", {});
        if (stored2[key]) {
          sendMsg.value = true;
          appendLog("🔄 已恢复独轮车运行状态");
        }
        return;
      }
      const stored = _GM_getValue("persistedSendMsg", {});
      _GM_setValue("persistedSendMsg", { ...stored, [key]: sending });
    } else {
      const stored = _GM_getValue("persistedSendMsg", {});
      if (key in stored) {
        const { [key]: _2, ...rest } = stored;
        _GM_setValue("persistedSendMsg", rest);
      }
    }
  });
  const cachedStreamerUid = y$1(null);
  const availableDanmakuColors = y$1(null);
  const replacementMap = y$1(null);
  const cachedEmoticonPackages = y$1([]);
  function isEmoticonUnique(msg) {
    return cachedEmoticonPackages.value.some((pkg) => pkg.emoticons.some((e2) => e2.emoticon_unique === msg));
  }
  const fasongText = y$1("");
  (() => {
    const pageWindow = _unsafeWindow;
    const originalFetch = pageWindow.fetch;
    const patchedFetch = async (input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      const resp = await originalFetch.call(pageWindow, input, init);
      if (unlockForbidLive.value && url.includes("/xlive/web-room/v1/index/getInfoByUser")) {
        console.log("[LAPLACE Chatterbox] Hijacking getInfoByUser fetch response:", url);
        const text = await resp.text();
        try {
          const data = JSON.parse(text);
          if (data?.data?.forbid_live) {
            data.data.forbid_live.is_forbid = false;
            data.data.forbid_live.forbid_text = "";
            console.log("[LAPLACE Chatterbox] Blacklist livestream block removed");
            return new Response(JSON.stringify(data), {
              status: resp.status,
              statusText: resp.statusText,
              headers: resp.headers
            });
          }
        } catch {
        }
        return new Response(text, {
          status: resp.status,
          statusText: resp.statusText,
          headers: resp.headers
        });
      }
      return resp;
    };
    pageWindow.fetch = Object.assign(patchedFetch, originalFetch);
  })();
  const VERSION = _GM_info.script.version;
  const BASE_URL = {
BILIBILI_ROOM_INIT: "https://api.live.bilibili.com/room/v1/Room/room_init",
BILIBILI_ROOM_INFO_BY_UID: "https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld",
BILIBILI_MSG_SEND: "https://api.live.bilibili.com/msg/send",
BILIBILI_MSG_CONFIG: "https://api.live.bilibili.com/xlive/web-room/v1/dM/AjaxSetConfig",
BILIBILI_GET_DM_CONFIG: "https://api.live.bilibili.com/xlive/web-room/v1/dM/GetDMConfigByGroup",
BILIBILI_GET_EMOTICONS: "https://api.live.bilibili.com/xlive/web-ucenter/v2/emoticon/GetEmoticons",
BILIBILI_MEDAL_WALL: "https://api.live.bilibili.com/xlive/web-ucenter/user/MedalWall",
BILIBILI_ROOM_USER_INFO: "https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByUser",
BILIBILI_SILENT_USER_LIST: "https://api.live.bilibili.com/xlive/web-ucenter/v1/banned/GetSilentUserList",
    LAPLACE_CHAT_AUDIT: "https://edge-workers.laplace.cn/laplace/chat-audit",
    REMOTE_KEYWORDS: "https://workers.vrp.moe/gh-raw/laplace-live/public/master/artifacts/livesrtream-keywords.json",
    LAPLACE_MEMES: "https://workers.vrp.moe/laplace/memes",
    LAPLACE_MEME_COPY: "https://workers.vrp.moe/laplace/meme-copy"
  };
  function isRateLimitError(error) {
    if (!error) return false;
    return error.includes("频率") || error.includes("过快") || error.toLowerCase().includes("rate");
  }
  function isMutedError(error) {
    if (!error) return false;
    return error.includes("禁言") || error.includes("被封") || error.toLowerCase().includes("muted");
  }
  function isAccountRestrictedError(error) {
    if (!error) return false;
    const lower = error.toLowerCase();
    return error.includes("账号") || error.includes("账户") || error.includes("风控") || error.includes("封号") || error.includes("封禁") || lower.includes("account") || lower.includes("risk");
  }
  function formatDuration(seconds) {
    const rounded = Math.max(1, Math.ceil(seconds));
    if (rounded < 60) return `${rounded} 秒`;
    const minutes = Math.ceil(rounded / 60);
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = Math.ceil(minutes / 60);
    if (hours < 24) return `${hours} 小时`;
    return `${Math.ceil(hours / 24)} 天`;
  }
  function durationFromString(text) {
    const unitMatch = text.match(/(\d+)\s*(秒|分钟|分|小时|天)/);
    if (unitMatch) {
      const value = Number(unitMatch[1]);
      const unit = unitMatch[2];
      if (unit === "秒") return formatDuration(value);
      if (unit === "分" || unit === "分钟") return formatDuration(value * 60);
      if (unit === "小时") return formatDuration(value * 60 * 60);
      if (unit === "天") return formatDuration(value * 24 * 60 * 60);
    }
    const dateMatch = text.match(/(20\d{2}[-/]\d{1,2}[-/]\d{1,2}(?:\s+\d{1,2}:\d{1,2}(?::\d{1,2})?)?)/);
    if (!dateMatch) return null;
    const end = new Date(dateMatch[1].replace(/\//g, "-")).getTime();
    if (!Number.isFinite(end) || end <= Date.now()) return null;
    return `${formatDuration((end - Date.now()) / 1e3)}（到 ${dateMatch[1]}）`;
  }
  function durationFromData(data) {
    if (typeof data === "string") return durationFromString(data);
    if (typeof data !== "object" || data === null) return null;
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (typeof value === "string") {
        const parsed = durationFromString(value);
        if (parsed) return parsed;
      } else if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        if (lowerKey.includes("remain") || lowerKey.includes("left") || lowerKey.includes("duration") || lowerKey.includes("second") || lowerKey.includes("ttl") || key.includes("剩余") || key.includes("时长")) {
          return formatDuration(value);
        }
        if (lowerKey.includes("end") || lowerKey.includes("expire") || lowerKey.includes("until") || key.includes("解除")) {
          const ms = value > 1e10 ? value : value * 1e3;
          if (ms > Date.now()) return `${formatDuration((ms - Date.now()) / 1e3)}（到 ${new Date(ms).toLocaleString()}）`;
        }
      } else {
        const nested = durationFromData(value);
        if (nested) return nested;
      }
    }
    return null;
  }
  function describeRestrictionDuration(error, data) {
    return durationFromString(error ?? "") ?? durationFromData(data) ?? "接口未返回时长";
  }
  function scanRestrictionSignals(data, source) {
    const signals = [];
    scanNode(data, source, signals);
    return signals;
  }
  function scanNode(data, source, signals, path = "") {
    if (typeof data === "string") {
      const kind = classifyText(data);
      if (kind) signals.push({ kind, message: data, duration: describeRestrictionDuration(data, null), source });
      return;
    }
    if (typeof data !== "object" || data === null) return;
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const currentPath = path ? `${path}.${key}` : key;
      if (typeof value === "boolean" && value) {
        if (lowerKey.includes("silent") || lowerKey.includes("mute") || key.includes("禁言")) {
          signals.push({ kind: "muted", message: currentPath, duration: describeRestrictionDuration(void 0, data), source });
        } else if (lowerKey.includes("forbid") || lowerKey.includes("block") || key.includes("封") || key.includes("黑")) {
          signals.push({ kind: "blocked", message: currentPath, duration: describeRestrictionDuration(void 0, data), source });
        }
      }
      scanNode(value, source, signals, currentPath);
    }
  }
  function classifyText(text) {
    if (text === "账号已注销" || text.includes("账号已注销")) return "deactivated";
    if (isRateLimitError(text)) return "rate-limit";
    if (isMutedError(text)) return "muted";
    if (isAccountRestrictedError(text)) return "account";
    if (text.includes("拉黑") || text.includes("黑名单") || text.toLowerCase().includes("blacklist")) return "blocked";
    return null;
  }
  function buildReplacementMap() {
    const map = new Map();
    const rk = remoteKeywords.value;
    if (rk) {
      const globalKeywords = rk.global?.keywords ?? {};
      for (const [from, to] of Object.entries(globalKeywords)) {
        if (from) map.set(from, to);
      }
      const rid2 = cachedRoomId.value;
      if (rid2 !== null) {
        const roomData = rk.rooms?.find((r2) => String(r2.room) === String(rid2));
        const roomKeywords = roomData?.keywords ?? {};
        for (const [from, to] of Object.entries(roomKeywords)) {
          if (from) map.set(from, to);
        }
      }
    }
    for (const rule of localGlobalRules.value) {
      if (rule.from) map.set(rule.from, rule.to ?? "");
    }
    const rid = cachedRoomId.value;
    if (rid !== null) {
      const roomRules = localRoomRules.value[String(rid)] ?? [];
      for (const rule of roomRules) {
        if (rule.from) map.set(rule.from, rule.to ?? "");
      }
    }
    replacementMap.value = map;
  }
  function applyReplacements(text) {
    if (replacementMap.value === null) {
      buildReplacementMap();
    }
    let result = text;
    for (const [from, to] of (replacementMap.value ?? new Map()).entries()) {
      result = result.split(from).join(to);
    }
    return result;
  }
  function md5(str) {
    function rotateLeft(n2, s2) {
      return n2 << s2 | n2 >>> 32 - s2;
    }
    function addUnsigned(x22, y2) {
      const lsw = (x22 & 65535) + (y2 & 65535);
      const msw = (x22 >> 16) + (y2 >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    function cmn(q2, a22, b22, x22, s2, t2) {
      return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a22, q2), addUnsigned(x22, t2)), s2), b22);
    }
    function ff(a22, b22, c22, d22, x22, s2, t2) {
      return cmn(b22 & c22 | ~b22 & d22, a22, b22, x22, s2, t2);
    }
    function gg(a22, b22, c22, d22, x22, s2, t2) {
      return cmn(b22 & d22 | c22 & ~d22, a22, b22, x22, s2, t2);
    }
    function hh(a22, b22, c22, d22, x22, s2, t2) {
      return cmn(b22 ^ c22 ^ d22, a22, b22, x22, s2, t2);
    }
    function ii(a22, b22, c22, d22, x22, s2, t2) {
      return cmn(c22 ^ (b22 | ~d22), a22, b22, x22, s2, t2);
    }
    function w2(arr, idx) {
      return arr[idx] ?? 0;
    }
    function convertToWordArray(s2) {
      const wordArray = [];
      for (let i2 = 0; i2 < s2.length * 8; i2 += 8) {
        const idx = i2 >> 5;
        wordArray[idx] = w2(wordArray, idx) | (s2.charCodeAt(i2 / 8) & 255) << i2 % 32;
      }
      return wordArray;
    }
    function wordToHex(value) {
      let hex = "";
      for (let i2 = 0; i2 < 4; i2++) {
        hex += (value >> i2 * 8 + 4 & 15).toString(16) + (value >> i2 * 8 & 15).toString(16);
      }
      return hex;
    }
    const x2 = convertToWordArray(str);
    let a2 = 1732584193;
    let b2 = 4023233417;
    let c2 = 2562383102;
    let d2 = 271733878;
    const padIdx = str.length >> 2;
    x2[padIdx] = w2(x2, padIdx) | 128 << str.length % 4 * 8;
    x2[(str.length + 8 >> 6 << 4) + 14] = str.length * 8;
    for (let i2 = 0; i2 < x2.length; i2 += 16) {
      const oldA = a2;
      const oldB = b2;
      const oldC = c2;
      const oldD = d2;
      a2 = ff(a2, b2, c2, d2, w2(x2, i2 + 0), 7, 3614090360);
      d2 = ff(d2, a2, b2, c2, w2(x2, i2 + 1), 12, 3905402710);
      c2 = ff(c2, d2, a2, b2, w2(x2, i2 + 2), 17, 606105819);
      b2 = ff(b2, c2, d2, a2, w2(x2, i2 + 3), 22, 3250441966);
      a2 = ff(a2, b2, c2, d2, w2(x2, i2 + 4), 7, 4118548399);
      d2 = ff(d2, a2, b2, c2, w2(x2, i2 + 5), 12, 1200080426);
      c2 = ff(c2, d2, a2, b2, w2(x2, i2 + 6), 17, 2821735955);
      b2 = ff(b2, c2, d2, a2, w2(x2, i2 + 7), 22, 4249261313);
      a2 = ff(a2, b2, c2, d2, w2(x2, i2 + 8), 7, 1770035416);
      d2 = ff(d2, a2, b2, c2, w2(x2, i2 + 9), 12, 2336552879);
      c2 = ff(c2, d2, a2, b2, w2(x2, i2 + 10), 17, 4294925233);
      b2 = ff(b2, c2, d2, a2, w2(x2, i2 + 11), 22, 2304563134);
      a2 = ff(a2, b2, c2, d2, w2(x2, i2 + 12), 7, 1804603682);
      d2 = ff(d2, a2, b2, c2, w2(x2, i2 + 13), 12, 4254626195);
      c2 = ff(c2, d2, a2, b2, w2(x2, i2 + 14), 17, 2792965006);
      b2 = ff(b2, c2, d2, a2, w2(x2, i2 + 15), 22, 1236535329);
      a2 = gg(a2, b2, c2, d2, w2(x2, i2 + 1), 5, 4129170786);
      d2 = gg(d2, a2, b2, c2, w2(x2, i2 + 6), 9, 3225465664);
      c2 = gg(c2, d2, a2, b2, w2(x2, i2 + 11), 14, 643717713);
      b2 = gg(b2, c2, d2, a2, w2(x2, i2 + 0), 20, 3921069994);
      a2 = gg(a2, b2, c2, d2, w2(x2, i2 + 5), 5, 3593408605);
      d2 = gg(d2, a2, b2, c2, w2(x2, i2 + 10), 9, 38016083);
      c2 = gg(c2, d2, a2, b2, w2(x2, i2 + 15), 14, 3634488961);
      b2 = gg(b2, c2, d2, a2, w2(x2, i2 + 4), 20, 3889429448);
      a2 = gg(a2, b2, c2, d2, w2(x2, i2 + 9), 5, 568446438);
      d2 = gg(d2, a2, b2, c2, w2(x2, i2 + 14), 9, 3275163606);
      c2 = gg(c2, d2, a2, b2, w2(x2, i2 + 3), 14, 4107603335);
      b2 = gg(b2, c2, d2, a2, w2(x2, i2 + 8), 20, 1163531501);
      a2 = gg(a2, b2, c2, d2, w2(x2, i2 + 13), 5, 2850285829);
      d2 = gg(d2, a2, b2, c2, w2(x2, i2 + 2), 9, 4243563512);
      c2 = gg(c2, d2, a2, b2, w2(x2, i2 + 7), 14, 1735328473);
      b2 = gg(b2, c2, d2, a2, w2(x2, i2 + 12), 20, 2368359562);
      a2 = hh(a2, b2, c2, d2, w2(x2, i2 + 5), 4, 4294588738);
      d2 = hh(d2, a2, b2, c2, w2(x2, i2 + 8), 11, 2272392833);
      c2 = hh(c2, d2, a2, b2, w2(x2, i2 + 11), 16, 1839030562);
      b2 = hh(b2, c2, d2, a2, w2(x2, i2 + 14), 23, 4259657740);
      a2 = hh(a2, b2, c2, d2, w2(x2, i2 + 1), 4, 2763975236);
      d2 = hh(d2, a2, b2, c2, w2(x2, i2 + 4), 11, 1272893353);
      c2 = hh(c2, d2, a2, b2, w2(x2, i2 + 7), 16, 4139469664);
      b2 = hh(b2, c2, d2, a2, w2(x2, i2 + 10), 23, 3200236656);
      a2 = hh(a2, b2, c2, d2, w2(x2, i2 + 13), 4, 681279174);
      d2 = hh(d2, a2, b2, c2, w2(x2, i2 + 0), 11, 3936430074);
      c2 = hh(c2, d2, a2, b2, w2(x2, i2 + 3), 16, 3572445317);
      b2 = hh(b2, c2, d2, a2, w2(x2, i2 + 6), 23, 76029189);
      a2 = hh(a2, b2, c2, d2, w2(x2, i2 + 9), 4, 3654602809);
      d2 = hh(d2, a2, b2, c2, w2(x2, i2 + 12), 11, 3873151461);
      c2 = hh(c2, d2, a2, b2, w2(x2, i2 + 15), 16, 530742520);
      b2 = hh(b2, c2, d2, a2, w2(x2, i2 + 2), 23, 3299628645);
      a2 = ii(a2, b2, c2, d2, w2(x2, i2 + 0), 6, 4096336452);
      d2 = ii(d2, a2, b2, c2, w2(x2, i2 + 7), 10, 1126891415);
      c2 = ii(c2, d2, a2, b2, w2(x2, i2 + 14), 15, 2878612391);
      b2 = ii(b2, c2, d2, a2, w2(x2, i2 + 5), 21, 4237533241);
      a2 = ii(a2, b2, c2, d2, w2(x2, i2 + 12), 6, 1700485571);
      d2 = ii(d2, a2, b2, c2, w2(x2, i2 + 3), 10, 2399980690);
      c2 = ii(c2, d2, a2, b2, w2(x2, i2 + 10), 15, 4293915773);
      b2 = ii(b2, c2, d2, a2, w2(x2, i2 + 1), 21, 2240044497);
      a2 = ii(a2, b2, c2, d2, w2(x2, i2 + 8), 6, 1873313359);
      d2 = ii(d2, a2, b2, c2, w2(x2, i2 + 15), 10, 4264355552);
      c2 = ii(c2, d2, a2, b2, w2(x2, i2 + 6), 15, 2734768916);
      b2 = ii(b2, c2, d2, a2, w2(x2, i2 + 13), 21, 1309151649);
      a2 = ii(a2, b2, c2, d2, w2(x2, i2 + 4), 6, 4149444226);
      d2 = ii(d2, a2, b2, c2, w2(x2, i2 + 11), 10, 3174756917);
      c2 = ii(c2, d2, a2, b2, w2(x2, i2 + 2), 15, 718787259);
      b2 = ii(b2, c2, d2, a2, w2(x2, i2 + 9), 21, 3951481745);
      a2 = addUnsigned(a2, oldA);
      b2 = addUnsigned(b2, oldB);
      c2 = addUnsigned(c2, oldC);
      d2 = addUnsigned(d2, oldD);
    }
    return wordToHex(a2) + wordToHex(b2) + wordToHex(c2) + wordToHex(d2);
  }
  let cachedWbiKeys = null;
  function setCachedWbiKeys(keys) {
    cachedWbiKeys = keys;
  }
  (() => {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      this._url = typeof url === "string" ? url : url.toString();
      return originalOpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
    };
    XMLHttpRequest.prototype.send = function(body) {
      const url = this._url;
      if (url?.includes("/x/web-interface/nav")) {
        console.log("[LAPLACE Chatterbox] Intercepted request:", url);
        this.addEventListener("load", function() {
          try {
            const data = JSON.parse(this.responseText);
            if (data?.data?.wbi_img) {
              console.log("[LAPLACE Chatterbox] wbi_img:", data.data.wbi_img);
              const img_url = data.data.wbi_img.img_url;
              const sub_url = data.data.wbi_img.sub_url;
              const img_key = img_url?.split("/").pop()?.split(".")[0] ?? "";
              const sub_key = sub_url?.split("/").pop()?.split(".")[0] ?? "";
              setCachedWbiKeys({ img_key, sub_key });
              console.log("[LAPLACE Chatterbox] Extracted WBI keys:", cachedWbiKeys);
            } else {
              console.log("[LAPLACE Chatterbox] Response received but wbi_img not found:", data);
            }
          } catch (err) {
            console.error("[LAPLACE Chatterbox] Error parsing response:", err);
          }
        });
      }
      return originalSend.call(this, body);
    };
  })();
  async function waitForWbiKeys(timeout = 5e3, interval = 100) {
    const startTime = Date.now();
    while (!cachedWbiKeys) {
      if (Date.now() - startTime > timeout) {
        return false;
      }
      await new Promise((r2) => setTimeout(r2, interval));
    }
    return true;
  }
  const mixinKeyEncTab = [
    46,
    47,
    18,
    2,
    53,
    8,
    23,
    32,
    15,
    50,
    10,
    31,
    58,
    3,
    45,
    35,
    27,
    43,
    5,
    49,
    33,
    9,
    42,
    19,
    29,
    28,
    14,
    39,
    12,
    38,
    41,
    13,
    37,
    48,
    7,
    16,
    24,
    55,
    40,
    61,
    26,
    17,
    0,
    1,
    60,
    51,
    30,
    4,
    22,
    25,
    54,
    21,
    56,
    59,
    6,
    63,
    57,
    62,
    11,
    36,
    20,
    34,
    44,
    52
  ];
  function getMixinKey(orig) {
    return mixinKeyEncTab.map((n2) => orig[n2]).join("").slice(0, 32);
  }
  function encodeWbi(params, wbiKeys) {
    const mixin_key = getMixinKey(wbiKeys.img_key + wbiKeys.sub_key);
    const currentTime = Math.round(Date.now() / 1e3);
    const charaFilter = /[!'()*]/g;
    const paramsWithWts = { ...params, wts: currentTime };
    const sortedQuery = Object.keys(paramsWithWts).sort().map((key) => {
      const resolvedValue = paramsWithWts[key]?.toString() ?? "";
      const value = resolvedValue.replace(charaFilter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&");
    const wbi_sign = md5(sortedQuery + mixin_key);
    const unsortedQuery = Object.keys(params).map((key) => {
      const resolvedValue = params[key]?.toString() ?? "";
      const value = resolvedValue.replace(charaFilter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&");
    return `${unsortedQuery}&w_rid=${wbi_sign}&wts=${currentTime}`;
  }
  const DEFAULT_DANMAKU_COLORS = [
    "0xe33fff",
    "0x54eed8",
    "0x58c1de",
    "0x455ff6",
    "0x975ef9",
    "0xc35986",
    "0xff8c21",
    "0x00fffc",
    "0x7eff00",
    "0xffed4f",
    "0xff9800"
  ];
  function getCookie(name) {
    const prefix = `${name}=`;
    return document.cookie.split(";").map((c2) => c2.trim()).find((c2) => c2.startsWith(prefix))?.slice(prefix.length);
  }
  function getSpmPrefix() {
    const metaTag = document.querySelector('meta[name="spm_prefix"]');
    return metaTag?.getAttribute("content") ?? "444.8";
  }
  function getCsrfToken() {
    return getCookie("bili_jct");
  }
  function getDedeUid() {
    return getCookie("DedeUserID");
  }
  async function getRoomId(url = window.location.href) {
    const shortUid = extractRoomNumber(url);
    const room = await fetch(`${BASE_URL.BILIBILI_ROOM_INIT}?id=${shortUid}`, {
      method: "GET",
      credentials: "include"
    });
    if (!room.ok) {
      throw new Error(`HTTP ${room.status}: ${room.statusText}`);
    }
    const roomData = await room.json();
    cachedStreamerUid.value = roomData.data.uid;
    return roomData.data.room_id;
  }
  let cachedRoomSlug = null;
  async function ensureRoomId() {
    const currentSlug = extractRoomNumber(window.location.href) ?? null;
    if (cachedRoomId.value !== null && cachedRoomSlug === currentSlug) {
      return cachedRoomId.value;
    }
    cachedRoomId.value = null;
    cachedRoomSlug = currentSlug;
    const roomId = await getRoomId();
    cachedRoomId.value = roomId;
    buildReplacementMap();
    return roomId;
  }
  async function fetchEmoticons(roomId) {
    const resp = await fetch(`${BASE_URL.BILIBILI_GET_EMOTICONS}?platform=pc&room_id=${roomId}`, {
      method: "GET",
      credentials: "include"
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const json = await resp.json();
    if (json?.code === 0 && json.data?.data) {
      cachedEmoticonPackages.value = json.data.data.filter((pkg) => pkg.pkg_id !== 100);
    }
  }
  function toNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
    return null;
  }
  function firstString(...values) {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "未知";
  }
  function roomIdFromLiveLink(value) {
    if (typeof value !== "string") return null;
    const match = value.match(/live\.bilibili\.com\/(?:blanc\/)?(\d+)/);
    if (!match) return null;
    return toNumber(match[1]);
  }
  function findMedalEntries(data) {
    if (typeof data !== "object" || data === null) return [];
    const root = data;
    const candidates = [root.list, root.data];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) return candidate;
      if (typeof candidate === "object" && candidate !== null) {
        const nested = candidate;
        if (Array.isArray(nested.list)) return nested.list;
      }
    }
    return [];
  }
  function medalEntryToRoom(entry) {
    if (typeof entry !== "object" || entry === null) return null;
    const obj = entry;
    const medal = typeof obj.medal_info === "object" && obj.medal_info !== null ? obj.medal_info : {};
    const anchor = typeof obj.anchor_info === "object" && obj.anchor_info !== null ? obj.anchor_info : {};
    const linkedRoomId = roomIdFromLiveLink(obj.link) ?? roomIdFromLiveLink(medal.link) ?? roomIdFromLiveLink(anchor.link);
    const directRoomId = toNumber(medal.roomid) ?? toNumber(medal.room_id) ?? toNumber(obj.roomid) ?? toNumber(obj.room_id);
    const roomId = directRoomId ?? linkedRoomId;
    const anchorUid = toNumber(medal.target_id) ?? toNumber(anchor.uid) ?? toNumber(obj.target_id);
    if (roomId === null || roomId <= 0) return null;
    return {
      roomId,
      medalName: firstString(medal.medal_name, medal.name, obj.medal_name, obj.medal_name, obj.name),
      anchorName: firstString(obj.target_name, anchor.uname, anchor.name, medal.anchor_uname, obj.anchor_uname, obj.uname),
      anchorUid,
      source: directRoomId !== null ? "medal-room-id" : "medal-link"
    };
  }
  function medalEntryToAnchorFallback(entry) {
    if (typeof entry !== "object" || entry === null) return null;
    const obj = entry;
    const medal = typeof obj.medal_info === "object" && obj.medal_info !== null ? obj.medal_info : {};
    const anchor = typeof obj.anchor_info === "object" && obj.anchor_info !== null ? obj.anchor_info : {};
    const anchorUid = toNumber(medal.target_id) ?? toNumber(anchor.uid) ?? toNumber(obj.target_id);
    if (anchorUid === null || anchorUid <= 0) return null;
    return {
      medalName: firstString(medal.medal_name, medal.name, obj.medal_name, obj.name),
      anchorName: firstString(obj.target_name, anchor.uname, anchor.name, medal.anchor_uname, obj.anchor_uname, obj.uname),
      anchorUid
    };
  }
  async function fetchRoomByAnchorUid(anchor) {
    const resp = await fetch(`${BASE_URL.BILIBILI_ROOM_INFO_BY_UID}?mid=${anchor.anchorUid}`, {
      method: "GET",
      credentials: "include"
    });
    if (!resp.ok) return null;
    const json = await resp.json();
    if (json.code !== 0) return null;
    const roomId = toNumber(json.data?.roomid) ?? roomIdFromLiveLink(json.data?.link);
    if (roomId === null || roomId <= 0) return null;
    return { ...anchor, roomId, source: "anchor-uid" };
  }
  async function fetchMedalRooms() {
    const uid = getDedeUid();
    if (!uid) throw new Error("未找到登录 UID，请先登录 Bilibili");
    const resp = await fetch(`${BASE_URL.BILIBILI_MEDAL_WALL}?target_id=${encodeURIComponent(uid)}`, {
      method: "GET",
      credentials: "include"
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const json = await resp.json();
    if (json.code !== 0) throw new Error(json.message ?? json.msg ?? `code ${json.code}`);
    const entries = findMedalEntries(json.data);
    const rooms = entries.map(medalEntryToRoom).filter((room) => room !== null);
    const unresolvedAnchors = entries.filter((entry) => medalEntryToRoom(entry) === null).map(medalEntryToAnchorFallback).filter((anchor) => anchor !== null);
    for (const anchor of unresolvedAnchors) {
      const room = await fetchRoomByAnchorUid(anchor);
      if (room) rooms.push(room);
    }
    const deduped = new Map();
    for (const room of rooms) deduped.set(room.roomId, room);
    return [...deduped.values()];
  }
  async function fetchRoomUserInfoSignals(roomId) {
    const resp = await fetch(`${BASE_URL.BILIBILI_ROOM_USER_INFO}?room_id=${roomId}&from=0`, {
      method: "GET",
      credentials: "include"
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const json = await resp.json();
    if (json.code !== 0) {
      return [
        {
          kind: "unknown",
          message: json.message ?? json.msg ?? `code ${json.code}`,
          duration: describeRestrictionDuration(json.message ?? json.msg, json.data),
          source: "getInfoByUser"
        }
      ];
    }
    return scanRestrictionSignals(json.data, "getInfoByUser");
  }
  async function fetchSilentListSignals(roomId) {
    const uid = getDedeUid();
    if (!uid) return [];
    const url = `${BASE_URL.BILIBILI_SILENT_USER_LIST}?room_id=${roomId}&ps=50&pn=1`;
    const resp = await fetch(url, { method: "GET", credentials: "include" });
    if (!resp.ok) return [];
    const json = await resp.json();
    if (json.code !== 0) return [];
    const text = JSON.stringify(json.data);
    if (!text.includes(uid)) return [];
    return [
      {
        kind: "muted",
        message: "当前账号出现在房间禁言列表中",
        duration: describeRestrictionDuration(void 0, json.data),
        source: "GetSilentUserList"
      }
    ];
  }
  async function checkMedalRoomRestriction(room) {
    const checkedAt = Date.now();
    try {
      const [roomInfoSignals, silentListSignals] = await Promise.all([
        fetchRoomUserInfoSignals(room.roomId),
        fetchSilentListSignals(room.roomId)
      ]);
      const allSignals = [...roomInfoSignals, ...silentListSignals];
      const deactivatedSignals = allSignals.filter((signal) => signal.kind === "deactivated");
      const signals = allSignals.filter((signal) => signal.kind !== "unknown" && signal.kind !== "deactivated");
      return {
        room,
        status: signals.length > 0 ? "restricted" : deactivatedSignals.length > 0 ? "deactivated" : "ok",
        signals,
        checkedAt,
        note: signals.length > 0 ? void 0 : deactivatedSignals.length > 0 ? "主播账号已注销，跳过禁言判断" : "接口未发现禁言/封禁信号"
      };
    } catch (err) {
      return {
        room,
        status: "unknown",
        signals: [],
        checkedAt,
        note: err instanceof Error ? err.message : String(err)
      };
    }
  }
  async function sendDanmaku(message, roomId, csrfToken) {
    const emoticon = isEmoticonUnique(message);
    const form = new FormData();
    form.append("bubble", "2");
    form.append("msg", message);
    form.append("color", "16777215");
    form.append("mode", "1");
    form.append("room_type", "0");
    form.append("jumpfrom", "0");
    form.append("reply_mid", "0");
    form.append("reply_attr", "0");
    form.append("replay_dmid", "");
    form.append("statistics", '{"appId":100,"platform":5}');
    form.append("fontsize", "25");
    form.append("rnd", String(Math.floor(Date.now() / 1e3)));
    form.append("roomid", String(roomId));
    form.append("csrf", csrfToken);
    form.append("csrf_token", csrfToken);
    if (emoticon) {
      form.append("dm_type", "1");
      form.append("emoticon_options", "{}");
    }
    try {
      let query = "";
      if (cachedWbiKeys) {
        query = encodeWbi(
          {
            web_location: getSpmPrefix()
          },
          cachedWbiKeys
        );
      }
      const url = `${BASE_URL.BILIBILI_MSG_SEND}?${query}`;
      const resp = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: form
      });
      if (!resp.ok) {
        return {
          success: false,
          message,
          isEmoticon: emoticon,
          error: `HTTP ${resp.status}`
        };
      }
      const json = await resp.json();
      if (json.code !== 0) {
        return {
          success: false,
          message,
          isEmoticon: emoticon,
          error: json.message ?? json.msg ?? `code ${json.code}`,
          errorCode: json.code,
          errorData: json.data
        };
      }
      return {
        success: true,
        message,
        isEmoticon: emoticon
      };
    } catch (err) {
      return {
        success: false,
        message,
        isEmoticon: emoticon,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
  async function setDanmakuMode(roomId, csrfToken, mode) {
    const form = new FormData();
    form.append("room_id", String(roomId));
    form.append("mode", mode);
    form.append("csrf_token", csrfToken);
    form.append("csrf", csrfToken);
    form.append("visit_id", "");
    try {
      await fetch(BASE_URL.BILIBILI_MSG_CONFIG, { method: "POST", credentials: "include", body: form });
    } catch {
    }
  }
  async function setRandomDanmakuColor(roomId, csrfToken) {
    const colorSet = availableDanmakuColors.value ?? DEFAULT_DANMAKU_COLORS;
    const color = colorSet[Math.floor(Math.random() * colorSet.length)] ?? "0xffffff";
    const form = new FormData();
    form.append("room_id", String(roomId));
    form.append("color", color);
    form.append("csrf_token", csrfToken);
    form.append("csrf", csrfToken);
    form.append("visit_id", "");
    try {
      await fetch(BASE_URL.BILIBILI_MSG_CONFIG, { method: "POST", credentials: "include", body: form });
    } catch {
    }
  }
  function formatAutoBlendSenderInfo(uniqueUsers, totalCount) {
    return uniqueUsers > 0 ? `${uniqueUsers} 人 / ${totalCount} 条` : `${totalCount} 条`;
  }
  function shortAutoBlendText(text) {
    return trimText(text, 18)[0] ?? text;
  }
  function formatAutoBlendStatus({ enabled, isSending: isSending2, cooldownUntil: cooldownUntil2, now }) {
    if (!enabled) return "已关闭";
    if (isSending2) return "正在跟车";
    const left = Math.max(0, Math.ceil((cooldownUntil2 - now) / 1e3));
    return left > 0 ? `冷却中 ${left}s` : "观察中";
  }
  function formatAutoBlendCandidate(candidates) {
    let best = null;
    for (const candidate of candidates) {
      if (candidate.totalCount < 2) continue;
      if (!best || candidate.totalCount > best.totalCount) best = candidate;
    }
    if (!best) return "暂无";
    return `${shortAutoBlendText(best.text)}（${formatAutoBlendSenderInfo(best.uniqueUsers, best.totalCount)}）`;
  }
  const subscriptions = new Set();
  let observer = null;
  let pollTimer = null;
  let healthTimer = null;
  let attached = null;
  function isValidDanmakuNode(node) {
    if (!node.classList.contains("chat-item") || !node.classList.contains("danmaku-item")) return false;
    const count = node.classList.length;
    if (count === 2) return true;
    if (node.classList.contains("chat-colorful-bubble") && node.classList.contains("has-bubble") && count === 4)
      return true;
    if (node.classList.contains("has-bubble") && count === 3) return true;
    return false;
  }
  function extractDanmakuInfo(node) {
    const text = node.dataset.danmaku;
    const replymid = node.dataset.replymid;
    if (text === void 0 || replymid === void 0) return null;
    const userEl = node.querySelector("[data-uname]") ?? node.querySelector("[data-uid]");
    return {
      node,
      text,
      uname: userEl?.getAttribute("data-uname") ?? null,
      uid: userEl?.getAttribute("data-uid") ?? null,
      isReply: replymid !== "0"
    };
  }
  function notifyAttach(container, sub) {
    if (sub.onAttach) {
      try {
        sub.onAttach(container);
      } catch (err) {
        console.error("[danmaku-stream] onAttach error:", err);
      }
    }
    if (sub.emitExisting && sub.onMessage) {
      const onMessage = sub.onMessage;
      for (const node of container.querySelectorAll(".chat-item.danmaku-item")) {
        if (!isValidDanmakuNode(node)) continue;
        const ev = extractDanmakuInfo(node);
        if (!ev) continue;
        try {
          onMessage(ev);
        } catch (err) {
          console.error("[danmaku-stream] emitExisting error:", err);
        }
      }
    }
  }
  function startPollTimer() {
    if (pollTimer) return;
    pollTimer = setInterval(() => {
      if (tryAttach() && pollTimer !== null) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    }, 1e3);
  }
  function tryAttach() {
    const container = document.querySelector(".chat-items");
    if (!container) return false;
    attached = container;
    for (const sub of subscriptions) notifyAttach(container, sub);
    observer = new MutationObserver((mutations) => {
      for (const m2 of mutations) {
        for (let i2 = 0; i2 < m2.addedNodes.length; i2++) {
          const node = m2.addedNodes[i2];
          if (!(node instanceof HTMLElement)) continue;
          if (!isValidDanmakuNode(node)) continue;
          const ev = extractDanmakuInfo(node);
          if (!ev) continue;
          for (const sub of subscriptions) {
            if (!sub.onMessage) continue;
            try {
              sub.onMessage(ev);
            } catch (err) {
              console.error("[danmaku-stream] onMessage error:", err);
            }
          }
        }
      }
    });
    observer.observe(container, { childList: true, subtree: false });
    return true;
  }
  function ensureAttached() {
    if (attached && !attached.isConnected) {
      observer?.disconnect();
      observer = null;
      attached = null;
    }
    if (attached || pollTimer) return;
    if (tryAttach()) return;
    startPollTimer();
  }
  function maybeDetach() {
    if (subscriptions.size > 0) return;
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    if (healthTimer) {
      clearInterval(healthTimer);
      healthTimer = null;
    }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    attached = null;
  }
  function subscribeDanmaku(sub) {
    subscriptions.add(sub);
    if (attached) {
      notifyAttach(attached, sub);
    } else {
      ensureAttached();
    }
    if (!healthTimer) {
      healthTimer = setInterval(() => {
        if (attached && !attached.isConnected) {
          console.log("[danmaku-stream] chat container detached, re-attaching...");
          observer?.disconnect();
          observer = null;
          attached = null;
          if (!tryAttach()) startPollTimer();
        }
      }, 2e3);
    }
    return () => {
      subscriptions.delete(sub);
      maybeDetach();
    };
  }
  function normalizeGuardRoomEndpoint$1(endpoint) {
    return endpoint.trim().replace(/\/+$/, "");
  }
  function classifyRiskEvent(error, errorData) {
    if (isMutedError(error)) {
      return { kind: "muted", level: "stop", advice: `检测到房间禁言，先停车。禁言时长：${describeRestrictionDuration(error, errorData)}。` };
    }
    if (isAccountRestrictedError(error)) {
      return { kind: "account_restricted", level: "stop", advice: `检测到账号级风控，先停发。限制时长：${describeRestrictionDuration(error, errorData)}。` };
    }
    if (isRateLimitError(error)) {
      return { kind: "rate_limited", level: "observe", advice: "发送频率过快，先降频或暂停自动跟车。" };
    }
    return { kind: "send_failed", level: "observe", advice: "发送失败，建议看一眼房间状态和替换词。" };
  }
  async function syncGuardRoomRiskEvent(input) {
    const endpoint = normalizeGuardRoomEndpoint$1(guardRoomEndpoint.value);
    const syncKey = guardRoomSyncKey.value.trim();
    if (!endpoint || !syncKey) return;
    const payload = {
      eventId: `risk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      scriptVersion: VERSION,
      occurredAt: ( new Date()).toISOString(),
      ...input,
      reason: input.reason?.slice(0, 500),
      advice: input.advice?.slice(0, 500)
    };
    await fetch(`${endpoint}/api/risk-events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-sync-key": syncKey
      },
      body: JSON.stringify(payload)
    }).catch(() => void 0);
  }
  const MAX_PER_HOUR = 5;
  const MAX_CANDIDATES = 15;
  const MAX_SEEN = 200;
  const MIN_RECURRENCE_GAP_MS = 10 * 60 * 1e3;
  const SESSION_MAP_KEY = "memeSessionMap";
  const SESSION_MAP_MAX_AGE_MS = 2 * 60 * 60 * 1e3;
  function loadSessionMap() {
    const raw = _GM_getValue(SESSION_MAP_KEY, {});
    const now = Date.now();
    const map = new Map();
    for (const [text, timestamps] of Object.entries(raw)) {
      const last = timestamps.at(-1);
      if (last !== void 0 && now - last < SESSION_MAP_MAX_AGE_MS) {
        map.set(text, timestamps);
      }
    }
    return map;
  }
  function saveSessionMap(map) {
    const raw = {};
    for (const [text, timestamps] of map) raw[text] = timestamps;
    _GM_setValue(SESSION_MAP_KEY, raw);
  }
  const sessionMap = loadSessionMap();
  const nominationTimestamps = [];
  function passesQualityFilter(text) {
    const len = text.length;
    if (len < 4 || len > 30) return false;
    if (/^\d+$/.test(text)) return false;
    if ([...text].every((c2) => c2 === text[0])) return false;
    if (/^[\p{P}\p{S}\s]+$/u.test(text)) return false;
    return true;
  }
  function recordMemeCandidate(text) {
    if (!enableMemeContribution.value) return;
    if (!passesQualityFilter(text)) return;
    const now = Date.now();
    const times = sessionMap.get(text) ?? [];
    times.push(now);
    sessionMap.set(text, times);
    saveSessionMap(sessionMap);
    if (times.length < 2) return;
    if (now - times[0] < MIN_RECURRENCE_GAP_MS) return;
    if (memeContributorSeenTexts.value.includes(text)) return;
    if (memeContributorCandidates.value.includes(text)) return;
    const oneHourAgo = now - 36e5;
    const recentCount = nominationTimestamps.filter((t2) => t2 >= oneHourAgo).length;
    if (recentCount >= MAX_PER_HOUR) return;
    const candidates = [...memeContributorCandidates.value, text];
    memeContributorCandidates.value = candidates.length > MAX_CANDIDATES ? candidates.slice(-MAX_CANDIDATES) : candidates;
    const seen = [...memeContributorSeenTexts.value, text];
    memeContributorSeenTexts.value = seen.length > MAX_SEEN ? seen.slice(-MAX_SEEN) : seen;
    nominationTimestamps.push(now);
    appendLog(`[贡献者] 检测到高质量烂梗 "${text}"，已加入待贡献池`);
  }
  function ignoreMemeCandidate(text) {
    memeContributorCandidates.value = memeContributorCandidates.value.filter((c2) => c2 !== text);
    if (!memeContributorSeenTexts.value.includes(text)) {
      const seen = [...memeContributorSeenTexts.value, text];
      memeContributorSeenTexts.value = seen.length > MAX_SEEN ? seen.slice(-MAX_SEEN) : seen;
    }
  }
  function clearMemeSession() {
    sessionMap.clear();
    saveSessionMap(sessionMap);
  }
  const SendPriority = {
    AUTO: 0,
    STT: 1,
    MANUAL: 2
  };
  const HARD_MIN_GAP_MS = 1010;
  const queue = [];
  let processing = false;
  let lastSendCompletedAt = 0;
  let inflight = null;
  function cancelAutoItem(item, error) {
    if (item.cancelled || item.priority !== SendPriority.AUTO) return;
    item.cancelled = true;
    item.resolve({ success: false, cancelled: true, message: item.message, isEmoticon: false, error });
  }
  function insertByPriority(item) {
    let i2 = queue.length;
    while (i2 > 0 && queue[i2 - 1].priority < item.priority) i2--;
    queue.splice(i2, 0, item);
  }
  async function processQueue() {
    if (processing) return;
    processing = true;
    try {
      while (queue.length > 0) {
        while (queue.length > 0 && queue[0].cancelled) queue.shift();
        const item = queue.shift();
        if (!item) break;
        inflight = item;
        if (lastSendCompletedAt > 0) {
          const sinceLast = Date.now() - lastSendCompletedAt;
          if (sinceLast < HARD_MIN_GAP_MS) {
            await new Promise((r2) => setTimeout(r2, HARD_MIN_GAP_MS - sinceLast));
          }
        }
        if (item.cancelled) {
          inflight = null;
          continue;
        }
        try {
          const result = await sendDanmaku(item.message, item.roomId, item.csrfToken);
          lastSendCompletedAt = Date.now();
          item.resolve(result);
        } catch (err) {
          lastSendCompletedAt = Date.now();
          item.reject(err);
        } finally {
          inflight = null;
        }
      }
    } finally {
      processing = false;
    }
  }
  function enqueueDanmaku(message, roomId, csrfToken, priority = SendPriority.AUTO) {
    return new Promise((resolve, reject) => {
      const item = { message, roomId, csrfToken, priority, resolve, reject, cancelled: false };
      insertByPriority(item);
      if (priority === SendPriority.MANUAL) {
        if (inflight !== null) cancelAutoItem(inflight, "preempted");
        for (const q2 of queue) {
          if (q2 !== item) cancelAutoItem(q2, "preempted");
        }
      }
      void processQueue();
    });
  }
  function cancelPendingAuto() {
    if (inflight !== null) cancelAutoItem(inflight, "loop-stopped");
    for (const q2 of queue) cancelAutoItem(q2, "loop-stopped");
  }
  const trendMap = new Map();
  let cooldownUntil = 0;
  let unsubscribe$1 = null;
  let cleanupTimer = null;
  let burstSettleTimer = null;
  let pendingBurstText = null;
  let routineTimeout = null;
  let routineActive = false;
  let myUid = null;
  let isSending = false;
  let rateLimitHitCount = 0;
  let firstRateLimitHitAt = 0;
  let moderationStopReason = null;
  const BURST_SETTLE_MS = 1500;
  const RATE_LIMIT_BACKOFF_MS = 2 * 60 * 1e3;
  const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1e3;
  const RATE_LIMIT_STOP_THRESHOLD = 3;
  function clearPendingAutoBlend(reason) {
    if (burstSettleTimer) {
      clearTimeout(burstSettleTimer);
      burstSettleTimer = null;
    }
    pendingBurstText = null;
    trendMap.clear();
    updateCandidateText();
    autoBlendLastActionText.value = reason;
  }
  function stopAutoBlendAfterModeration(reason) {
    moderationStopReason = reason;
    clearPendingAutoBlend(reason);
    autoBlendEnabled.value = false;
    appendLog(reason);
  }
  function handleSendFailure(result, roomId) {
    const now = Date.now();
    const error = result.error;
    const duration = describeRestrictionDuration(result.error, result.errorData);
    if (isMutedError(error)) {
      const risk = classifyRiskEvent(result.error, result.errorData);
      void syncGuardRoomRiskEvent({
        ...risk,
        source: "auto-blend",
        roomId,
        errorCode: result.errorCode,
        reason: result.error
      });
      stopAutoBlendAfterModeration(`自动跟车：检测到你在本房间被禁言，已自动关闭。禁言时长：${duration}。`);
      return true;
    }
    if (isAccountRestrictedError(error)) {
      const risk = classifyRiskEvent(result.error, result.errorData);
      void syncGuardRoomRiskEvent({
        ...risk,
        source: "auto-blend",
        roomId,
        errorCode: result.errorCode,
        reason: result.error
      });
      stopAutoBlendAfterModeration(`自动跟车：检测到账号级限制/风控，已自动关闭。限制时长：${duration}。`);
      return true;
    }
    if (!isRateLimitError(error)) {
      const risk = classifyRiskEvent(result.error, result.errorData);
      void syncGuardRoomRiskEvent({
        ...risk,
        source: "auto-blend",
        roomId,
        errorCode: result.errorCode,
        reason: result.error
      });
      return false;
    }
    if (now - firstRateLimitHitAt > RATE_LIMIT_WINDOW_MS) {
      firstRateLimitHitAt = now;
      rateLimitHitCount = 0;
    }
    rateLimitHitCount += 1;
    if (rateLimitHitCount >= RATE_LIMIT_STOP_THRESHOLD) {
      void syncGuardRoomRiskEvent({
        kind: "rate_limited",
        source: "auto-blend",
        level: "stop",
        roomId,
        errorCode: result.errorCode,
        reason: result.error,
        advice: "10 分钟内多次触发频率限制，自动跟车已经停车，建议休息一阵再开。"
      });
      stopAutoBlendAfterModeration("自动跟车：10 分钟内多次触发发送频率限制，已自动关闭，避免继续被系统/房管盯上。");
      return true;
    }
    void syncGuardRoomRiskEvent({
      kind: "rate_limited",
      source: "auto-blend",
      level: "observe",
      roomId,
      errorCode: result.errorCode,
      reason: result.error,
      advice: "触发发送频率限制，自动跟车会先歇 2 分钟。"
    });
    cooldownUntil = Math.max(cooldownUntil, now + RATE_LIMIT_BACKOFF_MS);
    clearPendingAutoBlend(`自动跟车：触发发送频率限制，已暂停 ${Math.round(RATE_LIMIT_BACKOFF_MS / 6e4)} 分钟并清空本轮候选。`);
    updateStatusText();
    return true;
  }
  function countUniqueUids(events) {
    const s2 = new Set();
    for (const e2 of events) if (e2.uid) s2.add(e2.uid);
    return s2.size;
  }
  function updateCandidateText() {
    autoBlendCandidateText.value = formatAutoBlendCandidate(
      Array.from(trendMap, ([text, entry]) => ({
        text,
        totalCount: entry.events.length,
        uniqueUsers: countUniqueUids(entry.events)
      }))
    );
  }
  function updateStatusText() {
    autoBlendStatusText.value = formatAutoBlendStatus({
      enabled: autoBlendEnabled.value,
      isSending,
      cooldownUntil,
      now: Date.now()
    });
  }
  function pruneExpired(now) {
    const windowMs = autoBlendWindowSec.value * 1e3;
    for (const [k2, entry] of trendMap) {
      entry.events = entry.events.filter((e2) => now - e2.ts <= windowMs);
      if (entry.events.length === 0) trendMap.delete(k2);
    }
    updateCandidateText();
  }
  function getAutoBlendRepeatGapMs() {
    return Math.max(autoBlendCooldownSec.value * 1e3, msgSendInterval.value * 1e3, 1010);
  }
  function getAutoBlendBurstGapMs() {
    return Math.max(msgSendInterval.value * 1e3, 1010);
  }
  function meetsThreshold(entry) {
    if (entry.events.length < autoBlendThreshold.value) return false;
    if (autoBlendRequireDistinctUsers.value) {
      const uniqueUids = countUniqueUids(entry.events);
      const effectiveUnique = uniqueUids > 0 ? uniqueUids : entry.events.length;
      if (effectiveUnique < autoBlendMinDistinctUsers.value) return false;
    }
    return true;
  }
  function pickBestTrendingText(preferredText) {
    let bestText = null;
    let bestCount = 0;
    for (const [text, entry] of trendMap) {
      if (!meetsThreshold(entry)) continue;
      if (preferredText === text) return text;
      if (entry.events.length > bestCount) {
        bestText = text;
        bestCount = entry.events.length;
      }
    }
    return bestText;
  }
  function scheduleBurstSend(text) {
    pendingBurstText ??= text;
    if (burstSettleTimer !== null) return;
    burstSettleTimer = setTimeout(() => {
      burstSettleTimer = null;
      const preferredText = pendingBurstText;
      pendingBurstText = null;
      if (!autoBlendEnabled.value || isSending || Date.now() < cooldownUntil) {
        updateStatusText();
        return;
      }
      pruneExpired(Date.now());
      const chosen = pickBestTrendingText(preferredText);
      if (chosen !== null) void triggerSend(chosen, "burst");
    }, BURST_SETTLE_MS);
  }
  function maybeScheduleBurstFromCurrentTrends() {
    if (!autoBlendEnabled.value || isSending || Date.now() < cooldownUntil || burstSettleTimer !== null) return;
    const chosen = pickBestTrendingText(pendingBurstText);
    if (chosen !== null) scheduleBurstSend(chosen);
  }
  function recordDanmaku(rawText, uid, isReply) {
    if (!autoBlendEnabled.value) return;
    const now = Date.now();
    updateStatusText();
    const text = rawText.trim();
    if (!text) return;
    if (isReply && !autoBlendIncludeReply.value) return;
    if (uid && myUid && uid === myUid) return;
    pruneExpired(now);
    let entry = trendMap.get(text);
    if (!entry) {
      entry = { events: [] };
      trendMap.set(text, entry);
    }
    entry.events.push({ ts: now, uid });
    updateCandidateText();
    if (now < cooldownUntil || isSending) return;
    if (meetsThreshold(entry)) scheduleBurstSend(text);
  }
  function scheduleNextRoutine() {
    routineTimeout = setTimeout(() => {
      routineTimerTick();
      if (routineActive) scheduleNextRoutine();
    }, autoBlendRoutineIntervalSec.value * 1e3);
  }
  function routineTimerTick() {
    if (!autoBlendEnabled.value) return;
    const now = Date.now();
    if (now < cooldownUntil) {
      updateStatusText();
      return;
    }
    updateStatusText();
    pruneExpired(now);
    const candidates = [];
    for (const [text, entry] of trendMap) {
      if (meetsThreshold(entry)) {
        candidates.push([text, entry.events.length]);
      }
    }
    if (candidates.length === 0) return;
    const totalWeight = candidates.reduce((s2, [, c2]) => s2 + c2, 0);
    let r2 = Math.random() * totalWeight;
    let chosen = candidates[candidates.length - 1][0];
    for (const [text, count] of candidates) {
      r2 -= count;
      if (r2 <= 0) {
        chosen = text;
        break;
      }
    }
    void triggerSend(chosen, "routine");
  }
  function collectBurst(triggeredText, reason) {
    if (reason !== "burst" || !autoBlendSendAllTrending.value) {
      const entry = trendMap.get(triggeredText);
      const uniqueUsers = entry ? countUniqueUids(entry.events) : 0;
      const totalCount = entry ? entry.events.length : 0;
      return [{ text: triggeredText, uniqueUsers, totalCount }];
    }
    const all = [];
    for (const [text, entry] of trendMap) {
      if (meetsThreshold(entry)) {
        all.push({ text, uniqueUsers: countUniqueUids(entry.events), totalCount: entry.events.length });
      }
    }
    all.sort((a2, b2) => {
      if (b2.totalCount !== a2.totalCount) return b2.totalCount - a2.totalCount;
      return a2.text === triggeredText ? -1 : 1;
    });
    return all.length > 0 ? all : [{ text: triggeredText, uniqueUsers: 0, totalCount: 0 }];
  }
  async function triggerSend(triggeredText, reason) {
    if (isSending) {
      if (reason === "routine") {
        const text = shortAutoBlendText(triggeredText);
        autoBlendLastActionText.value = `还在发，先跳过：${text}`;
        appendLog(`自动跟车：还在发，先跳过补跟：${text}`);
      }
      return;
    }
    isSending = true;
    updateStatusText();
    pruneExpired(Date.now());
    const targets = collectBurst(triggeredText, reason);
    cooldownUntil = Date.now() + autoBlendCooldownSec.value * 1e3;
    for (const { text } of targets) trendMap.delete(text);
    updateCandidateText();
    updateStatusText();
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        autoBlendLastActionText.value = "未登录，跳过";
        appendLog("自动跟车：没检测到登录态，先跳过");
        return;
      }
      const roomId = await ensureRoomId();
      const reasonLabel = reason === "burst" ? "刚刷起来" : "补跟";
      const isMulti = targets.length > 1;
      if (isMulti) {
        appendLog(`自动跟车：同一波有 ${targets.length} 句话达标，开始依次跟`);
      }
      let memeRecorded = false;
      for (let ti = 0; ti < targets.length; ti++) {
        const { text: originalText, uniqueUsers, totalCount } = targets[ti];
        const isEmote = isEmoticonUnique(originalText);
        const useReplacements = autoBlendUseReplacements.value && !isEmote;
        const replaced = useReplacements ? applyReplacements(originalText) : originalText;
        const wasReplaced = useReplacements && originalText !== replaced;
        if (isMulti) {
          appendLog(`  - ${shortAutoBlendText(originalText)}（${formatAutoBlendSenderInfo(uniqueUsers, totalCount)}）`);
        }
        const repeatCount = reason === "burst" && autoBlendSendAllTrending.value ? 1 : Math.max(1, autoBlendSendCount.value);
        for (let i2 = 0; i2 < repeatCount; i2++) {
          let toSend = replaced;
          if (!isEmote && randomChar.value) toSend = addRandomCharacter(toSend);
          if (!isEmote) toSend = trimText(toSend, maxLength.value)[0] ?? toSend;
          if (!isEmote && randomColor.value) {
            await setRandomDanmakuColor(roomId, csrfToken);
          }
          const result = await enqueueDanmaku(toSend, roomId, csrfToken, SendPriority.AUTO);
          const display = wasReplaced || toSend !== originalText ? `${originalText} → ${toSend}` : toSend;
          if (isMulti) {
            const label = repeatCount > 1 ? `自动跟车 [${i2 + 1}/${repeatCount}]` : "自动跟车";
            appendLog(result, label, display);
            if (result.success && !result.cancelled) {
              autoBlendLastActionText.value = `已跟车：${shortAutoBlendText(display)}`;
            } else if (result.cancelled) {
              autoBlendLastActionText.value = `被手动发送打断：${shortAutoBlendText(display)}`;
            } else {
              autoBlendLastActionText.value = `没发出去：${shortAutoBlendText(display)}`;
            }
          } else {
            const info = `${reasonLabel}，${formatAutoBlendSenderInfo(uniqueUsers, totalCount)}`;
            const repeatSuffix = repeatCount > 1 ? ` [${i2 + 1}/${repeatCount}]` : "";
            if (result.cancelled) {
              autoBlendLastActionText.value = `被手动发送打断：${shortAutoBlendText(display)}`;
              appendLog(`自动跟车${repeatSuffix}：被手动发送打断：${display}`);
            } else if (result.success) {
              autoBlendLastActionText.value = `已跟车：${shortAutoBlendText(display)}`;
              appendLog(`已跟车${repeatSuffix}（${info}）：${display}`);
            } else {
              const error = formatDanmakuError(result.error);
              autoBlendLastActionText.value = `没发出去：${shortAutoBlendText(display)}`;
              appendLog(`自动跟车没发出去${repeatSuffix}（${info}）：${display}，原因：${error}`);
            }
          }
          if (!result.success && !result.cancelled && handleSendFailure(result, roomId)) return;
          if (result.success && !result.cancelled && !isEmote && !memeRecorded) {
            memeRecorded = true;
            recordMemeCandidate(originalText);
          }
          cooldownUntil = Math.max(cooldownUntil, Date.now() + autoBlendCooldownSec.value * 1e3);
          updateStatusText();
          if (i2 < repeatCount - 1) {
            const interval = getAutoBlendRepeatGapMs();
            const offset = randomInterval.value ? Math.floor(Math.random() * 500) : 0;
            await new Promise((r2) => setTimeout(r2, interval + offset));
          }
        }
        if (isMulti && ti < targets.length - 1) {
          await new Promise((r2) => setTimeout(r2, getAutoBlendBurstGapMs()));
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      autoBlendLastActionText.value = `出错：${msg}`;
      appendLog(`自动跟车出错：${msg}`);
    } finally {
      isSending = false;
      updateStatusText();
    }
  }
  function startAutoBlend() {
    if (unsubscribe$1) return;
    myUid = getDedeUid() ?? null;
    rateLimitHitCount = 0;
    firstRateLimitHitAt = 0;
    moderationStopReason = null;
    autoBlendStatusText.value = "观察中";
    autoBlendCandidateText.value = "暂无";
    autoBlendLastActionText.value = "暂无";
    unsubscribe$1 = subscribeDanmaku({
      onMessage: (ev) => recordDanmaku(ev.text, ev.uid, ev.isReply)
    });
    if (cleanupTimer === null) {
      cleanupTimer = setInterval(() => {
        pruneExpired(Date.now());
        updateStatusText();
        maybeScheduleBurstFromCurrentTrends();
      }, 1e3);
    }
    routineActive = true;
    scheduleNextRoutine();
  }
  function stopAutoBlend() {
    if (cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
    routineActive = false;
    if (routineTimeout) {
      clearTimeout(routineTimeout);
      routineTimeout = null;
    }
    if (burstSettleTimer) {
      clearTimeout(burstSettleTimer);
      burstSettleTimer = null;
    }
    pendingBurstText = null;
    if (unsubscribe$1) {
      unsubscribe$1();
      unsubscribe$1 = null;
    }
    trendMap.clear();
    clearMemeSession();
    cooldownUntil = 0;
    autoBlendStatusText.value = "已关闭";
    autoBlendCandidateText.value = "暂无";
    autoBlendLastActionText.value = moderationStopReason ?? "暂无";
    moderationStopReason = null;
  }
  const pending = y$1(null);
  function showConfirm(opts) {
    return new Promise((resolve) => {
      pending.value = { ...opts, resolve };
    });
  }
  function AlertDialog() {
    const ref = A(null);
    const p2 = pending.value;
    y$2(() => {
      const dialog = ref.current;
      if (!dialog) return;
      if (p2) {
        dialog.showModal();
        if (p2.anchor) {
          const rect = dialog.getBoundingClientRect();
          const x2 = Math.max(0, Math.min(p2.anchor.x - rect.width / 2, window.innerWidth - rect.width));
          const y2 = Math.max(0, Math.min(p2.anchor.y - rect.height - 8, window.innerHeight - rect.height));
          dialog.style.margin = "0";
          dialog.style.position = "fixed";
          dialog.style.left = `${x2}px`;
          dialog.style.top = `${y2}px`;
        } else {
          dialog.style.margin = "";
          dialog.style.position = "";
          dialog.style.left = "";
          dialog.style.top = "";
        }
      } else {
        dialog.close();
      }
    }, [p2]);
    if (!p2) return null;
    const close = (confirmed) => {
      p2.resolve(confirmed);
      pending.value = null;
    };
    return u$2(
      "dialog",
      {
        ref,
        onCancel: (e2) => {
          e2.preventDefault();
          close(false);
        },
        onClick: (e2) => {
          if (p2.anchor && e2.target === ref.current) close(false);
        },
        onKeyDown: (e2) => {
          if (p2.anchor && e2.key === "Escape") close(false);
        },
        style: {
          border: "1px solid rgba(0, 0, 0, .08)",
          borderRadius: "8px",
          padding: "14px",
          maxWidth: "320px",
          fontSize: "12px",
          color: "#1d1d1f",
          background: "rgba(248, 248, 250, .92)",
          boxShadow: "0 22px 60px rgba(0,0,0,.24)",
          backdropFilter: "blur(26px) saturate(1.5)"
        },
        children: [
          p2.title && u$2("p", { style: { margin: "0 0 .75em", wordBreak: "break-all" }, children: p2.title }),
          p2.body && u$2("div", { style: { margin: "0 0 .75em", wordBreak: "break-all" }, children: p2.body }),
u$2("div", { style: { display: "flex", justifyContent: "flex-end", gap: ".5em" }, children: [
u$2(
              "button",
              {
                type: "button",
                onClick: () => close(false),
                style: {
                  border: "1px solid rgba(0,0,0,.08)",
                  borderRadius: "8px",
                  background: "#fff",
                  padding: "5px 10px"
                },
                children: p2.cancelText ?? "取消"
              }
            ),
u$2(
              "button",
              {
                type: "button",
                onClick: () => close(true),
                style: {
                  border: "1px solid #007aff",
                  borderRadius: "8px",
                  background: "#007aff",
                  color: "#fff",
                  padding: "5px 10px"
                },
                children: p2.confirmText ?? "确认"
              }
            )
          ] })
        ]
      }
    );
  }
  const MARKER = "lc-dm-direct";
  const STYLE_ID = "lc-dm-direct-style";
  const STYLE = `
.chat-item.danmaku-item {
  position: relative;
}
.${MARKER} {
  display: inline-flex;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  gap: 2px;
  opacity: 0;
  transition: opacity .15s, transform .15s;
  user-select: none;
  pointer-events: none;
  z-index: 2;
}
.chat-item.danmaku-item:hover .${MARKER},
.${MARKER}:hover {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(-50%) translateX(-2px);
}
.${MARKER}.lc-dm-direct-peek {
  opacity: 1;
  pointer-events: auto;
}
.${MARKER} button {
  all: unset;
  cursor: pointer;
  min-width: 20px;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: #fff;
  background: rgba(0, 0, 0, .62);
  font-size: 12px;
  transition: background .1s;
}
.${MARKER} button:hover {
  background: rgba(0, 0, 0, .82);
}
html.lc-dm-direct-always .${MARKER} {
  opacity: 1;
  pointer-events: auto;
}
`;
  function eventToSendableMessage(ev) {
    if (!ev.isReply) return ev.text;
    return ev.uname ? `@${ev.uname} ${ev.text}` : null;
  }
  function injectButtons(node, msg) {
    if (node.querySelector(`.${MARKER}`)) return;
    const anchor = node.querySelector(".danmaku-item-right");
    if (!anchor) return;
    const container = document.createElement("span");
    container.className = `${MARKER} lc-dm-direct-peek`;
    container.dataset.msg = msg;
    const stealBtn = document.createElement("button");
    stealBtn.type = "button";
    stealBtn.textContent = "偷";
    stealBtn.title = "偷弹幕到发送框";
    stealBtn.dataset.action = "steal";
    const repeatBtn = document.createElement("button");
    repeatBtn.type = "button";
    repeatBtn.textContent = "+1";
    repeatBtn.title = "+1 发送弹幕";
    repeatBtn.dataset.action = "repeat";
    container.appendChild(stealBtn);
    container.appendChild(repeatBtn);
    anchor.after(container);
    window.setTimeout(() => {
      container.classList.remove("lc-dm-direct-peek");
    }, 2400);
  }
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      return ok;
    }
  }
  async function handleSteal(msg) {
    const copied = await copyText(msg);
    fasongText.value = msg;
    activeTab.value = "fasong";
    dialogOpen.value = true;
    appendLog(copied ? `🥷 偷并复制: ${msg}` : `🥷 偷: ${msg}`);
  }
  async function handleRepeat(msg, anchor) {
    if (danmakuDirectConfirm.value) {
      const confirmed = await showConfirm({ title: "确认发送以下弹幕？", body: msg, confirmText: "发送", anchor });
      if (!confirmed) return;
    }
    try {
      const roomId = await ensureRoomId();
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        appendLog("❌ 未找到登录信息，请先登录 Bilibili");
        return;
      }
      const processed = applyReplacements(msg);
      const result = await enqueueDanmaku(processed, roomId, csrfToken, SendPriority.MANUAL);
      const display = msg !== processed ? `${msg} → ${processed}` : processed;
      appendLog(result, "+1", display);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      appendLog(`🔴 +1 出错：${message}`);
    }
  }
  function handleDelegatedClick(e2) {
    const target = e2.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest(`.${MARKER} button`);
    if (!btn) return;
    e2.stopPropagation();
    const container = btn.closest(`.${MARKER}`);
    const msg = container?.dataset.msg;
    if (!msg) return;
    const action = btn.dataset.action;
    if (action === "steal") void handleSteal(msg);
    else if (action === "repeat") {
      void handleRepeat(msg, { x: e2.clientX, y: e2.clientY });
    }
  }
  let unsubscribe = null;
  let styleEl = null;
  let attachedContainer = null;
  let alwaysShowDispose = null;
  let contextMenuHandler = null;
  function closeNativeContextMenu() {
    for (const li of document.querySelectorAll("li")) {
      if (li.textContent?.trim() === "关闭") {
        li.click();
        return;
      }
    }
  }
  function createContextMenuItem(source, label) {
    const item = document.createElement("li");
    item.className = source.className;
    item.dataset.lc = "";
    item.textContent = label;
    return item;
  }
  function tryInjectContextMenuItems(li) {
    if (li.textContent?.trim() !== "复制弹幕") return;
    const ul = li.parentElement;
    if (!ul || ul.querySelector("[data-lc]")) return;
    const repeatEl = createContextMenuItem(li, "弹幕 +1");
    repeatEl.onclick = (e2) => {
      const text = ul.parentElement?.querySelector("span")?.textContent?.trim() ?? null;
      if (text) {
        void handleRepeat(text, { x: e2.clientX, y: e2.clientY });
      }
      closeNativeContextMenu();
    };
    const stealEl = createContextMenuItem(li, "偷弹幕");
    stealEl.onclick = () => {
      const text = ul.parentElement?.querySelector("span")?.textContent?.trim() ?? null;
      if (text) {
        void handleSteal(text);
      }
      closeNativeContextMenu();
    };
    ul.insertBefore(stealEl, li.nextSibling);
    ul.insertBefore(repeatEl, li.nextSibling);
  }
  function initContextMenuHijack() {
    if (contextMenuHandler) return;
    contextMenuHandler = () => {
      requestAnimationFrame(() => {
        for (const li of document.querySelectorAll("li")) {
          tryInjectContextMenuItems(li);
        }
      });
    };
    document.addEventListener("contextmenu", contextMenuHandler);
  }
  function stopContextMenuHijack() {
    if (contextMenuHandler) {
      document.removeEventListener("contextmenu", contextMenuHandler);
      contextMenuHandler = null;
    }
  }
  function startDanmakuDirect() {
    if (unsubscribe) return;
    alwaysShowDispose = j(() => {
      document.documentElement.classList.toggle("lc-dm-direct-always", danmakuDirectAlwaysShow.value);
    });
    initContextMenuHijack();
    unsubscribe = subscribeDanmaku({
      onAttach: (container) => {
        styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
        styleEl.textContent = STYLE;
        document.head.appendChild(styleEl);
        attachedContainer = container;
        container.addEventListener("click", handleDelegatedClick, true);
      },
      onMessage: (ev) => {
        if (!danmakuDirectMode.value) return;
        const msg = eventToSendableMessage(ev);
        if (msg !== null) injectButtons(ev.node, msg);
      },
      emitExisting: true
    });
  }
  function stopDanmakuDirect() {
    stopContextMenuHijack();
    if (alwaysShowDispose) {
      alwaysShowDispose();
      alwaysShowDispose = null;
      document.documentElement.classList.remove("lc-dm-direct-always");
    }
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    if (attachedContainer) {
      attachedContainer.removeEventListener("click", handleDelegatedClick, true);
      attachedContainer = null;
    }
    if (styleEl) {
      styleEl.remove();
      styleEl = null;
    }
    for (const el of Array.from(document.querySelectorAll(`.${MARKER}`))) {
      el.remove();
    }
  }
  let currentAbort = null;
  function cancelLoop() {
    currentAbort?.abort();
    currentAbort = null;
    cancelPendingAuto();
  }
  function abortableSleep(ms, signal) {
    return new Promise((resolve) => {
      if (signal.aborted) {
        resolve(false);
        return;
      }
      const timer = setTimeout(() => resolve(true), ms);
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);
          resolve(false);
        },
        { once: true }
      );
    });
  }
  async function loop() {
    let count = 0;
    let initialized = false;
    while (true) {
      if (sendMsg.value) {
        let roomId;
        try {
          roomId = await ensureRoomId();
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          appendLog(`❌ 获取房间ID失败: ${message}`);
          await new Promise((r2) => setTimeout(r2, 5e3));
          continue;
        }
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 未找到登录信息，已自动停止运行，请先登录 Bilibili");
          void syncGuardRoomRiskEvent({
            kind: "login_missing",
            source: "auto-send",
            level: "observe",
            roomId,
            reason: "自动发送没有检测到 B 站登录态。",
            advice: "先登录 B 站，再重新开车。"
          });
          sendMsg.value = false;
          continue;
        }
        if (!initialized) {
          initialized = true;
          buildReplacementMap();
          await waitForWbiKeys();
          if (cachedWbiKeys) {
            try {
              const configQuery = encodeWbi(
                {
                  room_id: String(roomId),
                  web_location: getSpmPrefix()
                },
                cachedWbiKeys
              );
              const configUrl = `${BASE_URL.BILIBILI_GET_DM_CONFIG}?${configQuery}`;
              const configResp = await fetch(configUrl, {
                method: "GET",
                credentials: "include"
              }).then((r2) => r2.json());
              if (configResp?.data?.group) {
                const colors = [];
                for (const group of configResp.data.group) {
                  for (const color of group.color) {
                    if (color.status === 1) {
                      colors.push(`0x${color.color_hex}`);
                    }
                  }
                }
                if (colors.length > 0) {
                  availableDanmakuColors.value = colors;
                  console.log("[LAPLACE Chatterbox] Available colors:", colors);
                }
              }
            } catch {
            }
          }
          try {
            await fetchEmoticons(roomId);
          } catch {
          }
          if (forceScrollDanmaku.value) {
            const initCsrfToken = getCsrfToken();
            if (initCsrfToken) {
              await setDanmakuMode(roomId, initCsrfToken, "1");
            }
          }
        }
        currentAbort = new AbortController();
        const { signal } = currentAbort;
        const currentTemplate = msgTemplates.value[activeTemplateIndex.value] ?? "";
        if (!currentTemplate.trim()) {
          appendLog("⚠️ 当前模板为空，已自动停止运行");
          sendMsg.value = false;
          currentAbort = null;
          continue;
        }
        const interval = msgSendInterval.value;
        const enableRandomColor = randomColor.value;
        const enableRandomInterval = randomInterval.value;
        const enableRandomChar = randomChar.value;
        const Msg = [];
        for (const line of currentTemplate.split("\n").filter((l2) => l2?.trim())) {
          if (isEmoticonUnique(line.trim())) {
            Msg.push(line.trim());
          } else {
            Msg.push(...processMessages(line, maxLength.value, enableRandomChar));
          }
        }
        const total = Msg.length;
        let completed = true;
        for (let i2 = 0; i2 < total; i2++) {
          if (signal.aborted) {
            completed = false;
            break;
          }
          const message = Msg[i2];
          if (sendMsg.value) {
            const isEmote = isEmoticonUnique(message);
            const originalMessage = message;
            const processedMessage = isEmote ? message : applyReplacements(message);
            const wasReplaced = !isEmote && originalMessage !== processedMessage;
            if (enableRandomColor) {
              await setRandomDanmakuColor(roomId, csrfToken);
            }
            if (signal.aborted) {
              completed = false;
              break;
            }
            const result = await enqueueDanmaku(processedMessage, roomId, csrfToken, SendPriority.AUTO);
            const displayMsg = wasReplaced ? `${originalMessage} → ${processedMessage}` : processedMessage;
            const baseLabel = result.isEmoticon ? "自动表情" : "自动";
            const label = total > 1 ? `${baseLabel} [${i2 + 1}/${total}]` : baseLabel;
            appendLog(result, label, displayMsg);
            if (!result.success && !result.cancelled) {
              const risk = classifyRiskEvent(result.error, result.errorData);
              void syncGuardRoomRiskEvent({
                ...risk,
                source: "auto-send",
                roomId,
                errorCode: result.errorCode,
                reason: result.error
              });
            }
            const resolvedRandomInterval = enableRandomInterval ? Math.floor(Math.random() * 500) : 0;
            const ok = await abortableSleep(interval * 1e3 - resolvedRandomInterval, signal);
            if (!ok) {
              completed = false;
              break;
            }
          }
        }
        currentAbort = null;
        if (completed) {
          count += 1;
          appendLog(`🔵第 ${count} 轮发送完成`);
        }
      } else {
        count = 0;
        await new Promise((r2) => setTimeout(r2, 1e3));
      }
    }
  }
  const SECTION_STYLE = {
    margin: ".5em 0",
    paddingBottom: "1em",
    borderBottom: "1px solid var(--Ga2, #eee)"
  };
  const HEADING_STYLE = {
    fontWeight: "bold",
    marginBottom: ".5em"
  };
  const LINK_STYLE = {
    color: "#288bb8",
    textDecoration: "none"
  };
  const EXTERNAL_SERVICES = [
    {
      name: "Bilibili 直播接口",
      host: "api.live.bilibili.com",
      trigger: "发送弹幕、获取房间信息、读取粉丝牌、检查禁言状态时",
      description: "脚本会使用你的 B 站登录态访问直播间相关接口，用于发送弹幕、获取房间号、读取表情包和粉丝牌直播间，并在你手动触发巡检时检查禁言/封禁信号。"
    },
    {
      name: "AI 弹幕审核",
      host: "edge-workers.laplace.cn",
      trigger: "启用「AI 规避」功能时",
      description: "当弹幕发送失败且开启了 AI 规避功能后，脚本会将弹幕文本发送至此服务进行敏感词检测，并尝试自动替换敏感词后重新发送。"
    },
    {
      name: "云端替换规则",
      host: "workers.vrp.moe",
      url: "https://subspace.institute/docs/laplace-chatterbox/replacement",
      trigger: "打开设置页时自动同步",
      description: "从云端获取由社区维护的弹幕敏感词替换规则，每 10 分钟自动同步一次。"
    },
    {
      name: "烂梗列表",
      host: "workers.vrp.moe",
      url: "https://subspace.institute/docs/laplace-chatterbox/memes",
      trigger: "打开独轮车页面中的烂梗列表时",
      description: "从原项目沿用的社区服务获取烂梗列表。复制烂梗时会向服务报告使用次数。"
    },
    {
      name: "Soniox 语音识别",
      host: "api.soniox.com",
      url: "https://soniox.com",
      trigger: "使用同传功能时",
      description: "通过 WebSocket 连接 Soniox 语音识别云服务，将麦克风音频流实时转换为文字。需要提供 Soniox API Key。"
    },
    {
      name: "Soniox SDK",
      host: "unpkg.com",
      trigger: "脚本加载时",
      description: "从 unpkg CDN 加载 Soniox 语音识别 SDK (@soniox/speech-to-text-web)。"
    }
  ];
  function AboutTab() {
    return u$2(S$1, { children: [
u$2("div", { className: "cb-section cb-stack", style: SECTION_STYLE, children: [
u$2("div", { className: "cb-heading", style: HEADING_STYLE, children: "B站独轮车 + 自动跟车" }),
u$2("div", { className: "cb-note", style: { display: "flex", flexDirection: "column", gap: ".25em", color: "#666" }, children: [
u$2("span", { children: [
            "版本: ",
            VERSION
          ] }),
u$2("span", { children: [
            "作者:",
            " ",
u$2("a", { href: "https://github.com/aijc123", target: "_blank", rel: "noopener", style: LINK_STYLE, children: "Eric Ai" })
          ] }),
u$2("span", { children: "许可证: AGPL-3.0" }),
u$2("span", { children: [
            "源代码:",
            " ",
u$2(
              "a",
              {
                href: "https://github.com/aijc123/bilibili-live-wheel-auto-follow",
                target: "_blank",
                rel: "noopener",
                style: LINK_STYLE,
                children: "GitHub"
              }
            )
          ] }),
u$2("span", { children: [
            "原项目:",
            " ",
u$2("a", { href: "https://github.com/laplace-live/chatterbox", target: "_blank", rel: "noopener", style: LINK_STYLE, children: "LAPLACE Chatterbox" })
          ] })
        ] })
      ] }),
u$2("div", { className: "cb-section cb-stack", style: { ...SECTION_STYLE, borderBottom: "none" }, children: [
u$2("div", { className: "cb-heading", style: HEADING_STYLE, children: "隐私说明" }),
u$2("div", { className: "cb-note", style: { color: "#666", marginBottom: ".75em" }, children: "本脚本在运行时可能会与以下外部服务通信。不同功能触发的请求不同，请按需启用。" }),
u$2("div", { className: "cb-list", style: { display: "flex", flexDirection: "column", gap: ".75em" }, children: EXTERNAL_SERVICES.map((service) => u$2(
          "div",
          {
            className: "cb-list-item",
            style: {
              padding: ".5em",
              borderRadius: "4px",
              background: "var(--Ga1_s, rgba(0,0,0,.03))"
            },
            children: [
u$2("div", { style: { fontWeight: "bold", marginBottom: ".25em" }, children: service.url ? u$2("a", { href: service.url, target: "_blank", rel: "noopener", style: LINK_STYLE, children: service.name }) : service.name }),
u$2("div", { style: { fontSize: ".9em", color: "#666", fontFamily: "monospace", marginBottom: ".25em" }, children: service.host }),
u$2("div", { style: { fontSize: ".9em", marginBottom: ".25em" }, children: [
u$2("span", { style: { color: "#36a185" }, children: "触发条件:" }),
                " ",
                service.trigger
              ] }),
u$2("div", { style: { fontSize: ".9em", color: "#555" }, children: service.description })
            ]
          },
          service.name
        )) })
      ] })
    ] });
  }
  const AUTO_BLEND_PRESETS = {
    safe: {
      label: "稳一点",
      hint: "少跟，适合挂机",
      windowSec: 25,
      threshold: 5,
      cooldownSec: 45,
      routineIntervalSec: 75,
      minDistinctUsers: 3
    },
    normal: {
      label: "正常",
      hint: "推荐，比较克制",
      windowSec: 20,
      threshold: 4,
      cooldownSec: 35,
      routineIntervalSec: 60,
      minDistinctUsers: 3
    },
    hot: {
      label: "热闹",
      hint: "跟得更快，但会自动刹车",
      windowSec: 15,
      threshold: 3,
      cooldownSec: 20,
      routineIntervalSec: 40,
      minDistinctUsers: 2
    }
  };
  function getAutoBlendPresetValues(preset) {
    return {
      ...AUTO_BLEND_PRESETS[preset],
      includeReply: false,
      requireDistinctUsers: true,
      sendCount: 1,
      sendAllTrending: false,
      useReplacements: true
    };
  }
  function applyAutoBlendPreset(preset) {
    const p2 = getAutoBlendPresetValues(preset);
    autoBlendPreset.value = preset;
    autoBlendWindowSec.value = p2.windowSec;
    autoBlendThreshold.value = p2.threshold;
    autoBlendCooldownSec.value = p2.cooldownSec;
    autoBlendRoutineIntervalSec.value = p2.routineIntervalSec;
    autoBlendIncludeReply.value = p2.includeReply;
    autoBlendRequireDistinctUsers.value = p2.requireDistinctUsers;
    autoBlendMinDistinctUsers.value = p2.minDistinctUsers;
    autoBlendSendCount.value = p2.sendCount;
    autoBlendSendAllTrending.value = p2.sendAllTrending;
    autoBlendUseReplacements.value = p2.useReplacements;
  }
  function NumberInput({
    value,
    min,
    max,
    width = "40px",
    onChange
  }) {
    return u$2(
      "input",
      {
        type: "number",
        autocomplete: "off",
        min: String(min),
        max: max !== void 0 ? String(max) : void 0,
        style: { width },
        value,
        onInput: (e2) => {
          let v2 = parseInt(e2.currentTarget.value, 10);
          if (Number.isNaN(v2) || v2 < min) v2 = min;
          if (max !== void 0 && v2 > max) v2 = max;
          onChange(v2);
        }
      }
    );
  }
  function markCustom() {
    autoBlendPreset.value = "custom";
  }
  function modeButtonStyle(active) {
    return {
      fontWeight: active ? "bold" : void 0
    };
  }
  function AutoBlendControls() {
    const isOn = autoBlendEnabled.value;
    const currentPreset = autoBlendPreset.value;
    const presetHint = currentPreset === "safe" || currentPreset === "normal" || currentPreset === "hot" ? AUTO_BLEND_PRESETS[currentPreset].hint : "自定义参数";
    const statusColor = !isOn ? "#777" : autoBlendStatusText.value.includes("冷却") ? "#a15c00" : autoBlendStatusText.value.includes("跟车") ? "#1677ff" : "#0a7f55";
    const toggleEnabled = () => {
      autoBlendEnabled.value = !autoBlendEnabled.value;
    };
    return u$2(
      "details",
      {
        open: autoBlendPanelOpen.value,
        onToggle: (e2) => {
          autoBlendPanelOpen.value = e2.currentTarget.open;
        },
        children: [
u$2("summary", { style: { cursor: "pointer", userSelect: "none", fontWeight: "bold" }, children: [
u$2("span", { children: "自动跟车" }),
            isOn && u$2("span", { className: "cb-soft", children: "已开" })
          ] }),
u$2("div", { className: "cb-body cb-stack", children: [
u$2("div", { style: { display: "grid", gridTemplateColumns: "1fr auto", gap: ".5em", alignItems: "center" }, children: [
u$2("button", { type: "button", className: isOn ? "cb-danger" : "cb-primary", onClick: toggleEnabled, children: isOn ? "停止跟车" : "开始跟车" }),
u$2(
                "span",
                {
                  style: {
                    color: statusColor,
                    fontWeight: "bold",
                    whiteSpace: "nowrap"
                  },
                  children: [
u$2("span", { className: "cb-status-dot" }),
                    " ",
                    autoBlendStatusText.value
                  ]
                }
              )
            ] }),
u$2("div", { children: [
u$2("div", { className: "cb-segment", children: ["safe", "normal", "hot"].map((preset) => u$2(
                "button",
                {
                  type: "button",
                  "aria-pressed": currentPreset === preset,
                  onClick: () => applyAutoBlendPreset(preset),
                  style: modeButtonStyle(currentPreset === preset),
                  children: AUTO_BLEND_PRESETS[preset].label
                },
                preset
              )) }),
u$2("div", { className: "cb-note", style: { marginTop: ".25em" }, children: [
                "当前：",
                presetHint
              ] })
            ] }),
u$2(
              "div",
              {
                className: "cb-panel",
                style: {
                  color: isOn ? void 0 : "#999",
                  lineHeight: 1.6
                },
                children: [
u$2("div", { style: { display: "grid", gridTemplateColumns: "4.5em 1fr", gap: ".25em" }, children: [
u$2("strong", { children: "正在刷" }),
u$2("span", { style: { wordBreak: "break-all", overflowWrap: "anywhere" }, children: autoBlendCandidateText.value })
                  ] }),
u$2("div", { style: { display: "grid", gridTemplateColumns: "4.5em 1fr", gap: ".25em" }, children: [
u$2("strong", { children: "刚刚" }),
u$2("span", { style: { wordBreak: "break-all", overflowWrap: "anywhere" }, children: autoBlendLastActionText.value })
                  ] })
                ]
              }
            )
          ] }),
u$2(
            "details",
            {
              open: autoBlendAdvancedOpen.value,
              onToggle: (e2) => {
                autoBlendAdvancedOpen.value = e2.currentTarget.open;
              },
              style: { marginTop: ".5em" },
              children: [
u$2("summary", { style: { cursor: "pointer", userSelect: "none" }, children: "高级设置" }),
u$2(
                  "div",
                  {
                    style: {
                      margin: ".5em 0",
                      display: "grid",
                      gap: ".5em",
                      color: isOn ? void 0 : "#999"
                    },
                    children: [
u$2("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: ".25em" }, children: [
u$2("span", { children: "多少算跟：" }),
u$2(
                          NumberInput,
                          {
                            value: autoBlendWindowSec.value,
                            min: 3,
                            onChange: (v2) => {
                              markCustom();
                              autoBlendWindowSec.value = v2;
                            }
                          }
                        ),
u$2("span", { children: "秒内" }),
u$2(
                          NumberInput,
                          {
                            value: autoBlendThreshold.value,
                            min: 2,
                            onChange: (v2) => {
                              markCustom();
                              autoBlendThreshold.value = v2;
                            }
                          }
                        ),
u$2("span", { children: "条" })
                      ] }),
u$2("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: ".25em" }, children: [
u$2("span", { children: "节奏：" }),
u$2("span", { children: "冷却" }),
u$2(
                          NumberInput,
                          {
                            value: autoBlendCooldownSec.value,
                            min: 4,
                            width: "50px",
                            onChange: (v2) => {
                              markCustom();
                              autoBlendCooldownSec.value = v2;
                            }
                          }
                        ),
u$2("span", { children: "秒，补跟" }),
u$2(
                          NumberInput,
                          {
                            value: autoBlendRoutineIntervalSec.value,
                            min: 10,
                            width: "50px",
                            onChange: (v2) => {
                              markCustom();
                              autoBlendRoutineIntervalSec.value = v2;
                            }
                          }
                        ),
u$2("span", { children: "秒" })
                      ] }),
u$2("div", { style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: ".25em" }, children: [
u$2("span", { children: "每次发：" }),
u$2(
                          NumberInput,
                          {
                            value: autoBlendSendCount.value,
                            min: 1,
                            max: 20,
                            width: "40px",
                            onChange: (v2) => {
                              markCustom();
                              autoBlendSendCount.value = v2;
                            }
                          }
                        ),
u$2("span", { children: "遍" })
                      ] })
                    ]
                  }
                ),
u$2("div", { style: { margin: ".5em 0", display: "grid", gap: ".35em" }, children: [
u$2("span", { style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                      "input",
                      {
                        id: "autoBlendRequireDistinctUsers",
                        type: "checkbox",
                        checked: autoBlendRequireDistinctUsers.value,
                        onInput: (e2) => {
                          markCustom();
                          autoBlendRequireDistinctUsers.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { for: "autoBlendRequireDistinctUsers", children: "多人都在刷才跟" }),
                    autoBlendRequireDistinctUsers.value && u$2(S$1, { children: [
u$2("span", { children: "至少" }),
u$2(
                        NumberInput,
                        {
                          value: autoBlendMinDistinctUsers.value,
                          min: 2,
                          width: "40px",
                          onChange: (v2) => {
                            markCustom();
                            autoBlendMinDistinctUsers.value = v2;
                          }
                        }
                      ),
u$2("span", { children: "人" })
                    ] })
                  ] }),
u$2("span", { style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                      "input",
                      {
                        id: "autoBlendUseReplacements",
                        type: "checkbox",
                        checked: autoBlendUseReplacements.value,
                        onInput: (e2) => {
                          markCustom();
                          autoBlendUseReplacements.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { for: "autoBlendUseReplacements", children: "套用替换规则" })
                  ] }),
u$2("span", { style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                      "input",
                      {
                        id: "autoBlendIncludeReply",
                        type: "checkbox",
                        checked: autoBlendIncludeReply.value,
                        onInput: (e2) => {
                          markCustom();
                          autoBlendIncludeReply.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { for: "autoBlendIncludeReply", children: "也跟 @ 回复" })
                  ] }),
u$2("span", { style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                      "input",
                      {
                        id: "autoBlendSendAllTrending",
                        type: "checkbox",
                        checked: autoBlendSendAllTrending.value,
                        onInput: (e2) => {
                          markCustom();
                          autoBlendSendAllTrending.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { for: "autoBlendSendAllTrending", children: "一波刷屏全跟" }),
u$2("span", { style: { color: "#a15c00" }, children: "猛" })
                  ] })
                ] }),
                autoBlendSendAllTrending.value && u$2("div", { style: { color: "#a15c00", fontSize: "12px", lineHeight: 1.5, marginBottom: ".25em" }, children: "会把同一波里达标的几句话依次发出去。" }),
                autoBlendSendCount.value * msgSendInterval.value > autoBlendCooldownSec.value && u$2("div", { style: { color: "#a15c00", fontSize: "12px", lineHeight: 1.5, marginBottom: ".25em" }, children: [
                  "当前要发 ",
                  autoBlendSendCount.value * msgSendInterval.value,
                  "s，超过冷却 ",
                  autoBlendCooldownSec.value,
                  "s。"
                ] })
              ]
            }
          )
        ]
      }
    );
  }
  function getPreview(template) {
    const firstLine = (template.split("\n")[0] ?? "").trim();
    if (!firstLine) return "(空)";
    return getGraphemes(firstLine).length > 10 ? `${trimText(firstLine, 10)[0]}…` : firstLine;
  }
  function AutoSendControls() {
    const templates = msgTemplates.value;
    const idx = activeTemplateIndex.value;
    const currentTemplate = templates[idx] ?? "";
    const msgCount = processMessages(currentTemplate, maxLength.value).length;
    const toggleSend = () => {
      if (!sendMsg.value) {
        if (!currentTemplate.trim()) {
          appendLog("⚠️ 当前模板为空，请先输入内容");
          return;
        }
        sendMsg.value = true;
      } else {
        cancelLoop();
        sendMsg.value = false;
      }
    };
    const updateTemplate = (text) => {
      const next = [...templates];
      next[idx] = text;
      msgTemplates.value = next;
    };
    const addTemplate = () => {
      msgTemplates.value = [...templates, ""];
      activeTemplateIndex.value = msgTemplates.value.length - 1;
    };
    const removeTemplate = () => {
      if (templates.length <= 1) return;
      const next = [...templates];
      next.splice(idx, 1);
      msgTemplates.value = next;
      activeTemplateIndex.value = Math.max(0, idx - 1);
    };
    return u$2(
      "details",
      {
        open: autoSendPanelOpen.value,
        onToggle: (e2) => {
          autoSendPanelOpen.value = e2.currentTarget.open;
        },
        children: [
u$2("summary", { style: { cursor: "pointer", userSelect: "none", fontWeight: "bold" }, children: [
u$2("span", { children: "独轮车" }),
            sendMsg.value && u$2("span", { className: "cb-soft", children: "运行中" })
          ] }),
u$2("div", { className: "cb-body cb-stack", children: [
u$2("div", { className: "cb-row", children: [
u$2("button", { type: "button", className: sendMsg.value ? "cb-danger" : "cb-primary", onClick: toggleSend, children: sendMsg.value ? "停车" : "开车" }),
u$2(
                "select",
                {
                  style: { width: "16ch" },
                  value: String(idx),
                  onChange: (e2) => {
                    activeTemplateIndex.value = parseInt(e2.currentTarget.value, 10);
                  },
                  children: templates.map((t2, i2) => u$2("option", { value: String(i2), children: [
                    i2 + 1,
                    ": ",
                    getPreview(t2)
                  ] }, i2))
                }
              ),
u$2("button", { type: "button", onClick: addTemplate, children: "新增" }),
u$2("button", { type: "button", onClick: removeTemplate, children: "删除当前" })
            ] }),
u$2(
              "textarea",
              {
                value: currentTemplate,
                onInput: (e2) => updateTemplate(e2.currentTarget.value),
                placeholder: "在这输入弹幕，每行一句话，超过可发送字数的会自动进行分割",
                style: { boxSizing: "border-box", height: "80px", width: "100%", resize: "vertical" }
              }
            ),
u$2("div", { className: "cb-panel cb-stack", children: [
u$2("div", { className: "cb-row", children: [
u$2("span", { children: [
                  msgCount,
                  " 条，"
                ] }),
u$2("span", { children: "间隔" }),
u$2(
                  "input",
                  {
                    type: "number",
                    min: "0",
                    autocomplete: "off",
                    style: { width: "40px" },
                    value: msgSendInterval.value,
                    onInput: (e2) => {
                      const v2 = parseInt(e2.currentTarget.value, 10);
                      msgSendInterval.value = v2 >= 0 ? v2 : 0;
                    }
                  }
                ),
u$2("span", { children: "秒，" }),
u$2("span", { children: "超过" }),
u$2(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    autocomplete: "off",
                    style: { width: "30px" },
                    value: maxLength.value,
                    onInput: (e2) => {
                      const v2 = parseInt(e2.currentTarget.value, 10);
                      maxLength.value = v2 >= 1 ? v2 : 1;
                    }
                  }
                ),
u$2("span", { children: "字自动分段" })
              ] }),
u$2("span", { className: "cb-row", children: [
u$2(
                  "input",
                  {
                    id: "randomColor",
                    type: "checkbox",
                    checked: randomColor.value,
                    onInput: (e2) => {
                      randomColor.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { for: "randomColor", children: "随机颜色" })
              ] }),
u$2("span", { className: "cb-row", children: [
u$2(
                  "input",
                  {
                    id: "randomInterval",
                    type: "checkbox",
                    checked: randomInterval.value,
                    onInput: (e2) => {
                      randomInterval.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { for: "randomInterval", children: "间隔增加随机性" })
              ] }),
u$2("span", { className: "cb-row", children: [
u$2(
                  "input",
                  {
                    id: "randomChar",
                    type: "checkbox",
                    checked: randomChar.value,
                    onInput: (e2) => {
                      randomChar.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { for: "randomChar", children: "随机字符" })
              ] }),
u$2("span", { className: "cb-row", children: [
u$2(
                  "input",
                  {
                    id: "persistSendState",
                    type: "checkbox",
                    disabled: cachedRoomId.value === null,
                    checked: cachedRoomId.value !== null && !!persistSendState.value[String(cachedRoomId.value)],
                    onInput: (e2) => {
                      const roomId = cachedRoomId.value;
                      if (roomId === null) return;
                      persistSendState.value = { ...persistSendState.value, [String(roomId)]: e2.currentTarget.checked };
                    }
                  }
                ),
u$2("label", { for: "persistSendState", children: "保持当前直播间独轮车开关状态" })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  function LogPanel() {
    const ref = A(null);
    y$2(() => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [logLines.value]);
    return u$2(
      "details",
      {
        open: logPanelOpen.value,
        onToggle: (e2) => {
          logPanelOpen.value = e2.currentTarget.open;
        },
        style: { marginTop: ".25em" },
        children: [
u$2("summary", { style: { cursor: "pointer", userSelect: "none", fontWeight: "bold" }, children: "日志" }),
u$2("div", { className: "cb-body", children: u$2(
            "textarea",
            {
              ref,
              readOnly: true,
              value: logLines.value.join("\n"),
              placeholder: `此处将输出日志（最多保留 ${maxLogLines.value} 条）`,
              style: {
                boxSizing: "border-box",
                height: "60px",
                width: "100%",
                resize: "vertical",
                marginTop: ".5em"
              }
            }
          ) })
        ]
      }
    );
  }
  const MEME_SORT_OPTIONS = new Set(["lastCopiedAt", "copyCount", "createdAt"]);
  const isMemeSortBy = (v2) => MEME_SORT_OPTIONS.has(v2);
  const TAG_COLORS = {
    red: "#ef4444",
    yellow: "#eab308",
    fuchsia: "#d946ef",
    emerald: "#10b981",
    blue: "#3b82f6",
    orange: "#f97316",
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#06b6d4",
    green: "#22c55e"
  };
  function sortMemes(memes, sortBy) {
    memes.sort((a2, b2) => {
      if (sortBy === "lastCopiedAt") {
        if (a2.lastCopiedAt === null && b2.lastCopiedAt === null) return 0;
        if (a2.lastCopiedAt === null) return 1;
        if (b2.lastCopiedAt === null) return -1;
        return b2.lastCopiedAt.localeCompare(a2.lastCopiedAt);
      }
      if (sortBy === "copyCount") return b2.copyCount - a2.copyCount;
      return b2.createdAt.localeCompare(a2.createdAt);
    });
  }
  async function fetchMemes(roomId, sortBy) {
    const resp = await fetch(`${BASE_URL.LAPLACE_MEMES}?roomId=${roomId}&sortBy=${sortBy}&sort=desc`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const json = await resp.json();
    const data = json.data ?? [];
    sortMemes(data, sortBy);
    return data;
  }
  async function reportMemeCopy(memeId) {
    try {
      const resp = await fetch(`${BASE_URL.LAPLACE_MEME_COPY}/${memeId}`, { method: "POST" });
      if (!resp.ok) return null;
      const json = await resp.json();
      return json.copyCount;
    } catch {
      return null;
    }
  }
  function MemeItem({
    meme,
    onUpdateCount,
    onTagClick
  }) {
    const copyLabel = useSignal("复制");
    const handleSend = async () => {
      try {
        const roomId = await ensureRoomId();
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 未找到登录信息，请先登录 Bilibili");
          return;
        }
        const processed = applyReplacements(meme.content);
        const wasReplaced = meme.content !== processed;
        const segments = processMessages(processed, maxLength.value);
        const total = segments.length;
        for (let i2 = 0; i2 < total; i2++) {
          const segment = segments[i2];
          const result = await enqueueDanmaku(segment, roomId, csrfToken, SendPriority.MANUAL);
          const label = total > 1 ? `烂梗 [${i2 + 1}/${total}]` : "烂梗";
          const display = wasReplaced && total === 1 ? `${meme.content} → ${segment}` : segment;
          appendLog(result, label, display);
          if (i2 < total - 1) {
            await new Promise((r2) => setTimeout(r2, msgSendInterval.value * 1e3));
          }
        }
        const newCount = await reportMemeCopy(meme.id);
        if (newCount !== null) onUpdateCount(meme.id, newCount);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 发送出错：${msg}`);
      }
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(meme.content);
      } catch {
        alert(`复制失败，请手动复制：${meme.content}`);
        return;
      }
      copyLabel.value = "已复制";
      setTimeout(() => {
        copyLabel.value = "复制";
      }, 1500);
      const newCount = await reportMemeCopy(meme.id);
      if (newCount !== null) onUpdateCount(meme.id, newCount);
    };
    return u$2(
      "div",
      {
        "data-meme-id": meme.id,
        style: {
          padding: ".4em 0",
          borderBottom: "1px solid var(--Ga2, #eee)",
          display: "flex",
          gap: ".4em",
          alignItems: "flex-start"
        },
        children: [
u$2("div", { style: { flex: 1, minWidth: 0 }, children: [
            meme.tags.length > 0 && u$2("div", { style: { display: "flex", flexWrap: "wrap", gap: ".2em", marginBottom: ".2em" }, children: meme.tags.map((tag) => {
              const bgColor = (tag.color && TAG_COLORS[tag.color]) ?? "#888";
              return u$2(
                "button",
                {
                  type: "button",
                  className: "cb-tag",
                  onClick: () => onTagClick(tag.name),
                  title: `按「${tag.name}」筛选`,
                  style: {
                    appearance: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".15em",
                    padding: "0 .35em",
                    borderRadius: "2px",
                    fontSize: "10px",
                    lineHeight: 1.6,
                    color: "#fff",
                    "--cb-tag-bg": bgColor,
                    background: bgColor,
                    fontFamily: "inherit",
                    transition: "filter .15s"
                  },
                  onMouseEnter: (e2) => {
                    e2.currentTarget.style.filter = "brightness(1.1)";
                  },
                  onMouseLeave: (e2) => {
                    e2.currentTarget.style.filter = "";
                  },
                  children: [
                    tag.emoji ?? "",
                    tag.name
                  ]
                },
                tag.id
              );
            }) }),
u$2(
              "button",
              {
                type: "button",
                onClick: () => void handleSend(),
                title: "点击发送",
                style: {
                  appearance: "none",
                  outline: "none",
                  border: "none",
                  background: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  wordBreak: "break-all",
                  lineHeight: 1.4,
                  whiteSpace: "pre-wrap",
                  borderRadius: "2px",
                  transition: "background .15s"
                },
                onMouseEnter: (e2) => {
                  e2.currentTarget.style.background = "var(--bg2, #f0f0f0)";
                },
                onMouseLeave: (e2) => {
                  e2.currentTarget.style.background = "";
                },
                children: meme.content
              }
            )
          ] }),
u$2(
            "div",
            {
              style: {
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".15em"
              },
              children: [
u$2(
                  "button",
                  {
                    type: "button",
                    title: "复制到剪贴板",
                    onClick: () => void handleCopy(),
                    style: { fontSize: "11px !important", cursor: "pointer", padding: ".1em .4em" },
                    children: copyLabel.value
                  }
                ),
                meme.copyCount > 0 && u$2("span", { style: { fontSize: "10px !important", color: "#999", lineHeight: 1 }, children: [
                  meme.copyCount,
                  "次"
                ] })
              ]
            }
          )
        ]
      }
    );
  }
  const MEME_RELOAD_INTERVAL = 3e4;
  function MemesList() {
    const memes = useSignal([]);
    const sortBy = useSignal("lastCopiedAt");
    const filterText = useSignal("");
    const status = useSignal("");
    const statusColor = useSignal("#666");
    const loading = useSignal(false);
    const containerRef = A(null);
    const prevRectsRef = A( new Map());
    const capturePositions = () => {
      const el = containerRef.current;
      if (!el) return;
      const map = new Map();
      for (let i2 = 0; i2 < el.children.length; i2++) {
        const child = el.children[i2];
        if (!(child instanceof HTMLElement)) continue;
        const id = Number(child.dataset.memeId);
        if (!Number.isNaN(id)) map.set(id, child.getBoundingClientRect());
      }
      prevRectsRef.current = map;
    };
    const loadMemes = async ({ silent = false } = {}) => {
      if (!silent) loading.value = true;
      statusColor.value = "#666";
      try {
        const roomId = await ensureRoomId();
        const data = await fetchMemes(roomId, sortBy.peek());
        if (data.length === 0) {
          memes.value = [];
          status.value = "当前房间暂无烂梗";
          return;
        }
        if (memes.peek().length > 0) capturePositions();
        status.value = `${data.length} 条`;
        memes.value = data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        status.value = `加载失败: ${msg}`;
        statusColor.value = "#f44";
      } finally {
        if (!silent) loading.value = false;
      }
    };
    _$2(() => {
      const el = containerRef.current;
      const old = prevRectsRef.current;
      if (!el || old.size === 0) return;
      prevRectsRef.current = new Map();
      for (let i2 = 0; i2 < el.children.length; i2++) {
        const node = el.children[i2];
        if (!(node instanceof HTMLElement)) continue;
        const id = Number(node.dataset.memeId);
        const prev = old.get(id);
        if (!prev) continue;
        const curr = node.getBoundingClientRect();
        const dy = prev.top - curr.top;
        if (Math.abs(dy) < 1) continue;
        node.style.transform = `translateY(${dy}px)`;
        node.style.transition = "";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            node.style.transition = "transform .3s ease";
            node.style.transform = "";
          });
        });
      }
    }, [memes.value]);
    const updateCount = (id, count) => {
      capturePositions();
      const now = ( new Date()).toISOString();
      const updated = memes.value.map((m2) => m2.id === id ? { ...m2, copyCount: count, lastCopiedAt: now } : m2);
      sortMemes(updated, sortBy.peek());
      memes.value = updated;
    };
    const handleTagClick = (tagName) => {
      filterText.value = filterText.peek() === tagName ? "" : tagName;
    };
    y$2(() => {
      void loadMemes();
      const timer = setInterval(() => void loadMemes({ silent: true }), MEME_RELOAD_INTERVAL);
      return () => clearInterval(timer);
    }, [sortBy.value]);
    return u$2(S$1, { children: [
u$2(
        "details",
        {
          open: memesPanelOpen.value,
          onToggle: (e2) => {
            memesPanelOpen.value = e2.currentTarget.open;
          },
          children: u$2("summary", { style: { cursor: "pointer", userSelect: "none", fontWeight: "bold" }, children: "烂梗库" })
        }
      ),
      memesPanelOpen.value && u$2(S$1, { children: [
u$2("div", { style: { display: "flex", alignItems: "center", gap: ".5em", marginTop: ".5em", marginBottom: ".5em" }, children: [
u$2(
            "select",
            {
              style: { fontSize: "12px" },
              value: sortBy.value,
              onChange: (e2) => {
                const v2 = e2.currentTarget.value;
                if (isMemeSortBy(v2)) sortBy.value = v2;
              },
              children: [
u$2("option", { value: "lastCopiedAt", children: "最近使用" }),
u$2("option", { value: "copyCount", children: "最多复制" }),
u$2("option", { value: "createdAt", children: "最新添加" })
              ]
            }
          ),
u$2(
            "button",
            {
              type: "button",
              style: { fontSize: "12px" },
              disabled: loading.value,
              onClick: () => void loadMemes(),
              children: loading.value ? "加载中…" : "刷新"
            }
          ),
u$2("span", { style: { color: statusColor.value }, children: status.value }),
u$2(
            "a",
            {
              href: `https://laplace.live/memes${cachedStreamerUid.value ? `?contribute=${cachedStreamerUid.value}` : ""}`,
              target: "_blank",
              rel: "noopener",
              style: { color: "#288bb8", textDecoration: "none", fontSize: "12px" },
              children: "贡献烂梗"
            }
          )
        ] }),
u$2("div", { style: { display: "flex", alignItems: "center", gap: ".25em", marginBottom: ".5em" }, children: [
u$2(
            "input",
            {
              id: "enableMemeContribution",
              type: "checkbox",
              checked: enableMemeContribution.value,
              onInput: (e2) => {
                enableMemeContribution.value = e2.currentTarget.checked;
              }
            }
          ),
u$2("label", { for: "enableMemeContribution", style: { fontSize: "12px" }, children: "自动挖掘待贡献梗" })
        ] }),
        enableMemeContribution.value && memeContributorCandidates.value.length > 0 && u$2("div", { style: { marginBottom: ".5em" }, children: [
u$2("div", { style: { fontSize: "12px", color: "#666", marginBottom: ".25em" }, children: [
            "候选梗（",
            memeContributorCandidates.value.length,
            " 条）："
          ] }),
          memeContributorCandidates.value.map((text) => u$2(
            "div",
            {
              style: {
                display: "flex",
                gap: ".4em",
                alignItems: "center",
                padding: ".2em 0",
                borderBottom: "1px solid var(--Ga2, #eee)"
              },
              children: [
u$2("span", { style: { flex: 1, fontSize: "12px", wordBreak: "break-all" }, children: text }),
u$2(
                  "button",
                  {
                    type: "button",
                    style: { fontSize: "11px", cursor: "pointer", padding: ".1em .4em", flexShrink: 0 },
                    onClick: () => {
                      void navigator.clipboard.writeText(text);
                      const uid = cachedStreamerUid.value;
                      window.open(`https://laplace.live/memes${uid ? `?contribute=${uid}` : ""}`, "_blank", "noopener");
                      ignoreMemeCandidate(text);
                    },
                    children: "复制+贡献"
                  }
                ),
u$2(
                  "button",
                  {
                    type: "button",
                    style: { fontSize: "11px", cursor: "pointer", padding: ".1em .4em", flexShrink: 0 },
                    onClick: () => ignoreMemeCandidate(text),
                    children: "忽略"
                  }
                )
              ]
            },
            text
          ))
        ] }),
        memes.value.length > 0 && u$2(
          "input",
          {
            type: "text",
            placeholder: "筛选烂梗…",
            value: filterText.value,
            onInput: (e2) => {
              filterText.value = e2.currentTarget.value;
            },
            style: { boxSizing: "border-box", width: "100%", marginBottom: ".5em" }
          }
        ),
u$2(
          "div",
          {
            ref: containerRef,
            style: {
              overflowY: "auto",
              marginLeft: "-10px",
              marginRight: "-10px",
              paddingInline: "10px",
              maxHeight: optimizeLayout.value ? "180px" : "240px"
            },
            children: memes.value.filter((m2) => {
              const q2 = filterText.value.trim().toLowerCase();
              if (!q2) return true;
              if (m2.content.toLowerCase().includes(q2)) return true;
              return m2.tags.some((t2) => t2.name.toLowerCase().includes(q2));
            }).map((meme) => u$2(MemeItem, { meme, onUpdateCount: updateCount, onTagClick: handleTagClick }, meme.id))
          }
        )
      ] })
    ] });
  }
  async function detectSensitiveWords(text) {
    try {
      const resp = await fetch(BASE_URL.LAPLACE_CHAT_AUDIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completionMetadata: { input: text }
        })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      return data.completion ?? { hasSensitiveContent: false };
    } catch (err) {
      console.error("AI detection error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      appendLog(`⚠️ AI检测服务出错：${msg}`);
      return { hasSensitiveContent: false };
    }
  }
  function insertInvisibleChars(word) {
    const graphemes = getGraphemes(word);
    return graphemes.join("­");
  }
  function replaceSensitiveWords(text, sensitiveWords) {
    let result = text;
    for (const word of sensitiveWords) {
      result = result.split(word).join(insertInvisibleChars(word));
    }
    return result;
  }
  async function tryAiEvasion(message, roomId, csrfToken, logPrefix) {
    if (!aiEvasion.value) return { success: false };
    appendLog(`🤖 ${logPrefix}AI规避：正在检测敏感词…`);
    const detection = await detectSensitiveWords(message);
    if (detection.hasSensitiveContent && detection.sensitiveWords && detection.sensitiveWords.length > 0) {
      appendLog(`🤖 ${logPrefix}检测到敏感词：${detection.sensitiveWords.join(", ")}，正在尝试规避…`);
      const evadedMessage = replaceSensitiveWords(message, detection.sensitiveWords);
      const retryResult = await enqueueDanmaku(evadedMessage, roomId, csrfToken, SendPriority.MANUAL);
      if (retryResult.success) {
        appendLog(`✅ ${logPrefix}AI规避成功: ${evadedMessage}`);
        return { success: true, evadedMessage };
      }
      appendLog(`❌ ${logPrefix}AI规避失败: ${evadedMessage}，原因：${retryResult.error}`);
      return { success: false, evadedMessage, error: retryResult.error };
    }
    appendLog(`⚠️ ${logPrefix}无法检测到敏感词，请手动检查`);
    return { success: false };
  }
  function NormalSendTab() {
    const sendMessage = async () => {
      const originalMessage = fasongText.value.trim();
      if (!originalMessage) {
        appendLog("⚠️ 消息内容不能为空");
        return;
      }
      const isEmote = isEmoticonUnique(originalMessage);
      const processedMessage = isEmote ? originalMessage : applyReplacements(originalMessage);
      const wasReplaced = !isEmote && originalMessage !== processedMessage;
      fasongText.value = "";
      try {
        const roomId = await ensureRoomId();
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 未找到登录信息，请先登录 Bilibili");
          void syncGuardRoomRiskEvent({
            kind: "login_missing",
            source: "manual",
            level: "observe",
            roomId,
            reason: "未找到登录信息",
            advice: "先登录 Bilibili，再发送弹幕。"
          });
          return;
        }
        const segments = isEmote ? [processedMessage] : processMessages(processedMessage, maxLength.value);
        const total = segments.length;
        for (let i2 = 0; i2 < total; i2++) {
          const segment = segments[i2];
          const result = await enqueueDanmaku(segment, roomId, csrfToken, SendPriority.MANUAL);
          const baseLabel = result.isEmoticon ? "手动表情" : "手动";
          const label = total > 1 ? `${baseLabel} [${i2 + 1}/${total}]` : baseLabel;
          const displayMsg = wasReplaced && total === 1 ? `${originalMessage} → ${segment}` : segment;
          appendLog(result, label, displayMsg);
          if (!result.success) {
            const risk = classifyRiskEvent(result.error);
            void syncGuardRoomRiskEvent({
              ...risk,
              source: "manual",
              roomId,
              errorCode: result.errorCode,
              reason: result.error
            });
            await tryAiEvasion(segment, roomId, csrfToken, "");
          }
          if (i2 < total - 1) {
            await new Promise((r2) => setTimeout(r2, msgSendInterval.value * 1e3));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 发送出错：${msg}`);
      }
    };
    return u$2(
      "details",
      {
        open: normalSendPanelOpen.value,
        onToggle: (e2) => {
          normalSendPanelOpen.value = e2.currentTarget.open;
        },
        children: [
u$2("summary", { style: { cursor: "pointer", userSelect: "none", fontWeight: "bold" }, children: "常规发送" }),
u$2("div", { className: "cb-body cb-stack", children: [
u$2("div", { style: { position: "relative" }, children: [
u$2(
                "textarea",
                {
                  value: fasongText.value,
                  onInput: (e2) => {
                    fasongText.value = e2.currentTarget.value;
                  },
                  onKeyDown: (e2) => {
                    if (e2.key === "Enter" && !e2.shiftKey && !e2.isComposing) {
                      e2.preventDefault();
                      void sendMessage();
                    }
                  },
                  placeholder: "输入弹幕内容… (Enter 发送)",
                  style: {
                    boxSizing: "border-box",
                    height: "50px",
                    minHeight: "40px",
                    width: "100%",
                    resize: "vertical"
                  }
                }
              ),
u$2(
                "div",
                {
                  style: {
                    position: "absolute",
                    right: "8px",
                    bottom: "6px",
                    color: "#999",
                    pointerEvents: "none"
                  },
                  children: fasongText.value.length
                }
              )
            ] }),
u$2("div", { className: "cb-row", children: [
u$2("button", { type: "button", className: "cb-primary", onClick: () => void sendMessage(), children: "发送" }),
u$2("span", { className: "cb-row", children: [
u$2(
                  "input",
                  {
                    id: "aiEvasion",
                    type: "checkbox",
                    checked: aiEvasion.value,
                    onInput: (e2) => {
                      aiEvasion.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { for: "aiEvasion", children: "AI规避（发送失败时自动检测敏感词并重试）" })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  function EmoteIds() {
    const packages = cachedEmoticonPackages.value;
    const copiedId = useSignal(null);
    if (packages.length === 0) {
      return u$2("div", { className: "cb-empty", style: { color: "#999" }, children: "表情数据加载中…" });
    }
    const handleCopy = async (unique) => {
      try {
        await navigator.clipboard.writeText(unique);
      } catch {
        alert(`复制失败，请手动复制：${unique}`);
        return;
      }
      copiedId.value = unique;
      setTimeout(() => {
        if (copiedId.peek() === unique) copiedId.value = null;
      }, 1500);
    };
    return u$2(S$1, { children: packages.map((pkg) => u$2("div", { style: { marginBottom: ".75em" }, children: [
u$2(
        "div",
        {
          className: "cb-heading",
          style: {
            fontWeight: "bold",
            marginBottom: ".25em",
            color: "#666",
            fontSize: "11px"
          },
          children: [
            pkg.pkg_name,
u$2("span", { style: { fontWeight: "normal", marginLeft: ".5em" }, children: [
              "(",
              pkg.emoticons.length,
              ")"
            ] })
          ]
        }
      ),
u$2("div", { className: "cb-row", style: { display: "flex", flexWrap: "wrap", gap: "4px" }, children: pkg.emoticons.map((emo) => {
        const isCopied = copiedId.value === emo.emoticon_unique;
        return u$2(
          "button",
          {
            type: "button",
            className: "cb-emote",
            "data-copied": isCopied,
            title: `${emo.emoji}
点击复制: ${emo.emoticon_unique}`,
            onClick: () => void handleCopy(emo.emoticon_unique),
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              border: "1px solid var(--Ga2, #ddd)",
              borderRadius: "3px",
              background: isCopied ? "#36a185" : "var(--bg2, #f5f5f5)",
              color: isCopied ? "#fff" : "#555",
              cursor: "pointer",
              fontSize: "10px",
              lineHeight: 1.6,
              transition: "background .15s, color .15s"
            },
            children: [
u$2(
                "img",
                {
                  src: emo.url,
                  alt: emo.emoji,
                  style: { width: "48px", height: "48px", objectFit: "contain" },
                  loading: "lazy"
                }
              ),
              isCopied ? "已复制" : emo.emoji
            ]
          },
          emo.emoticon_id
        );
      }) })
    ] }, pkg.pkg_id)) });
  }
  const SYNC_INTERVAL = 10 * 60 * 1e3;
  const medalCheckStatus = gmSignal("medalCheckStatus", "未检查");
  const medalCheckResults = gmSignal("medalCheckResults", []);
  const medalCheckFilter = gmSignal(
    "medalCheckFilter",
    "issues"
  );
  function getMedalCheckCounts(results) {
    return {
      restricted: results.filter((result) => result.status === "restricted").length,
      deactivated: results.filter((result) => result.status === "deactivated").length,
      unknown: results.filter((result) => result.status === "unknown").length,
      ok: results.filter((result) => result.status === "ok").length
    };
  }
  function signalKindLabel(kind) {
    if (kind === "muted") return "房间禁言";
    if (kind === "blocked") return "房间屏蔽/拉黑";
    if (kind === "account") return "账号风控";
    if (kind === "rate-limit") return "频率限制";
    if (kind === "deactivated") return "主播已注销";
    return "未知信号";
  }
  function formatCheckTime(ts) {
    return new Date(ts).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  function sortMedalResults(results) {
    const rank = { restricted: 0, unknown: 1, deactivated: 2, ok: 3 };
    return [...results].sort((a2, b2) => rank[a2.status] - rank[b2.status] || a2.room.anchorName.localeCompare(b2.room.anchorName));
  }
  function medalStatusTitle(status) {
    if (status === "restricted") return "发现限制";
    if (status === "unknown") return "无法确认";
    if (status === "deactivated") return "主播已注销";
    return "未发现限制";
  }
  function medalStatusColor(status) {
    if (status === "restricted") return "#a15c00";
    if (status === "unknown") return "#666";
    if (status === "deactivated") return "#8e8e93";
    return "#0a7f55";
  }
  function getFilteredMedalResults(results, filter) {
    const sorted = sortMedalResults(results);
    if (filter === "all") return sorted;
    if (filter === "issues") return sorted.filter((result) => result.status !== "ok");
    return sorted.filter((result) => result.status === filter);
  }
  function formatMedalResultLine(result) {
    const room = `${result.room.anchorName} / ${result.room.medalName}`;
    const header = `${medalStatusTitle(result.status)}｜${room}｜房间号：${result.room.roomId}｜检查时间：${formatCheckTime(result.checkedAt)}`;
    if (result.signals.length === 0) return `${header}
${result.note ?? "接口未发现禁言/封禁信号"}`;
    const details = result.signals.map((signal) => `${signalKindLabel(signal.kind)}：${signal.message}；时长：${signal.duration}；来源：${signal.source}`).join("\n");
    return `${header}
${details}`;
  }
  function medalFilterLabel(filter) {
    if (filter === "issues") return "异常";
    if (filter === "restricted") return "限制";
    if (filter === "unknown") return "未知";
    if (filter === "deactivated") return "主播注销";
    if (filter === "ok") return "正常";
    return "全部";
  }
  function formatMedalCheckReport(results, status, filter) {
    const counts = getMedalCheckCounts(results);
    const shown = getFilteredMedalResults(results, filter);
    return [
      "粉丝牌禁言巡检",
      status,
      `统计：限制 ${counts.restricted}，未知 ${counts.unknown}，主播注销 ${counts.deactivated}，正常 ${counts.ok}`,
      `当前复制范围：${medalFilterLabel(filter)}（${shown.length} 条）`,
      "",
      ...shown.map(formatMedalResultLine)
    ].join("\n\n");
  }
  function normalizeGuardRoomEndpoint(endpoint) {
    return endpoint.trim().replace(/\/+$/, "");
  }
  function buildGuardRoomInspectionRun(results) {
    const checkedAtValues = results.map((result) => result.checkedAt);
    const startedAt = checkedAtValues.length > 0 ? Math.min(...checkedAtValues) : Date.now();
    const finishedAt = checkedAtValues.length > 0 ? Math.max(...checkedAtValues) : Date.now();
    return {
      runId: `chatterbox-${Date.now()}`,
      scriptVersion: VERSION,
      startedAt: new Date(startedAt).toISOString(),
      finishedAt: new Date(finishedAt).toISOString(),
      results: results.map((result) => ({
        roomId: result.room.roomId,
        anchorName: result.room.anchorName,
        anchorUid: result.room.anchorUid,
        medalName: result.room.medalName,
        status: result.status,
        signals: result.signals.map((signal) => ({
          kind: signal.kind,
          message: signal.message,
          duration: signal.duration,
          source: signal.source
        })),
        checkedAt: new Date(result.checkedAt).toISOString(),
        note: result.note
      }))
    };
  }
  async function fetchRemoteKeywords() {
    const response = await fetch(BASE_URL.REMOTE_KEYWORDS);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  }
  function SettingsTab() {
    const syncStatus = useSignal("未同步");
    const syncStatusColor = useSignal("#666");
    const syncing = useSignal(false);
    const testingRemote = useSignal(false);
    const testingLocal = useSignal(false);
    const checkingMedalRooms = useSignal(false);
    const medalCheckCopyStatus = useSignal("");
    const guardRoomSyncing = useSignal(false);
    const guardRoomSyncStatus = useSignal("");
    const globalReplaceFrom = useSignal("");
    const globalReplaceTo = useSignal("");
    const roomReplaceFrom = useSignal("");
    const roomReplaceTo = useSignal("");
    const editingRoomId = useSignal(cachedRoomId.value !== null ? String(cachedRoomId.value) : "");
    const newRoomId = useSignal("");
    const updateRemoteStatus = () => {
      const rk = remoteKeywords.value;
      const ls = remoteKeywordsLastSync.value;
      if (!rk || !ls) {
        syncStatus.value = "未同步";
        syncStatusColor.value = "#666";
        return;
      }
      const rid = cachedRoomId.value;
      const globalCount = Object.keys(rk.global?.keywords ?? {}).length;
      let roomCount = 0;
      if (rid !== null) {
        const roomData = rk.rooms?.find((r2) => String(r2.room) === String(rid));
        roomCount = Object.keys(roomData?.keywords ?? {}).length;
      }
      const timeStr = new Date(ls).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      syncStatus.value = `最后同步: ${timeStr}，当前房间共 ${globalCount + roomCount} 条规则（全局 ${globalCount} + 当前房间 ${roomCount}）`;
      syncStatusColor.value = "#36a185";
    };
    const syncRemote = async () => {
      syncing.value = true;
      syncStatus.value = "正在同步…";
      syncStatusColor.value = "#666";
      try {
        const data = await fetchRemoteKeywords();
        remoteKeywords.value = data;
        remoteKeywordsLastSync.value = Date.now();
        buildReplacementMap();
        updateRemoteStatus();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        syncStatus.value = `同步失败: ${msg}`;
        syncStatusColor.value = "#f44";
        appendLog(`❌ 云端替换规则同步失败: ${msg}`);
      } finally {
        syncing.value = false;
      }
    };
    const testKeywordPair = async (original, replaced, roomId, csrfToken) => {
      const originalResult = await sendDanmaku(original, roomId, csrfToken);
      let replacedResult = null;
      if (!originalResult.success) {
        await new Promise((r2) => setTimeout(r2, 2e3));
        replacedResult = await sendDanmaku(replaced, roomId, csrfToken);
      }
      return {
        originalBlocked: !originalResult.success,
        replacedBlocked: replacedResult ? !replacedResult.success : null,
        originalError: originalResult.error,
        replacedError: replacedResult?.error
      };
    };
    const logTestResult = (result, replacedKeyword) => {
      if (result.originalBlocked) {
        appendLog(`  ✅ 原词被屏蔽 (错误: ${result.originalError})，测试替换词: ${replacedKeyword}`);
        if (result.replacedBlocked) {
          appendLog(`  ❌ 替换词也被屏蔽 (错误: ${result.replacedError})`);
        } else {
          appendLog("  ✅ 替换词未被屏蔽");
        }
        return 1;
      }
      appendLog("  ⚠️ 原词未被屏蔽，请考虑提交贡献词条");
      return 0;
    };
    const testRemote = async () => {
      if (!confirm(
        "即将测试当前直播间的云端替换词，请避免在当前直播间正在直播时进行测试，否则可能会给主播造成困扰，是否继续？"
      ))
        return;
      testingRemote.value = true;
      try {
        const roomId = await ensureRoomId();
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 未找到登录信息，请先登录 Bilibili");
          return;
        }
        const rk = remoteKeywords.value;
        const globalKw = Object.entries(rk?.global?.keywords ?? {}).filter(([f2]) => f2).map(([from, to]) => ({ from, to }));
        const rid = cachedRoomId.value;
        const roomKw = rid !== null ? Object.entries(rk?.rooms?.find((r2) => String(r2.room) === String(rid))?.keywords ?? {}).filter(([f2]) => f2).map(([from, to]) => ({ from, to })) : [];
        const total = globalKw.length + roomKw.length;
        if (total === 0) {
          appendLog("⚠️ 没有云端替换词可供测试，请先同步云端规则");
          return;
        }
        appendLog(`🔵 开始测试云端替换词 ${total} 个（全局 ${globalKw.length} + 房间 ${roomKw.length}）`);
        let tested = 0;
        let totalBlocked = 0;
        if (globalKw.length > 0) {
          appendLog(`
📡 测试云端全局替换词 (${globalKw.length} 个)`);
          let blockedCount = 0;
          for (const { from, to } of globalKw) {
            tested++;
            appendLog(`[${tested}/${total}] 测试: ${from}`);
            const result = await testKeywordPair(from, to, roomId, csrfToken);
            const b2 = logTestResult(result, to);
            blockedCount += b2;
            totalBlocked += b2;
            if (tested < total) await new Promise((r2) => setTimeout(r2, 2e3));
          }
          appendLog(`📡 全局替换词测试完成：${blockedCount}/${globalKw.length} 个原词被屏蔽`);
        }
        if (roomKw.length > 0) {
          appendLog(`
🏠 测试云端房间专属替换词 (${roomKw.length} 个)`);
          let blockedCount = 0;
          for (const { from, to } of roomKw) {
            tested++;
            appendLog(`[${tested}/${total}] 测试: ${from}`);
            const result = await testKeywordPair(from, to, roomId, csrfToken);
            const b2 = logTestResult(result, to);
            blockedCount += b2;
            totalBlocked += b2;
            if (tested < total) await new Promise((r2) => setTimeout(r2, 2e3));
          }
          appendLog(`🏠 房间专属替换词测试完成：${blockedCount}/${roomKw.length} 个原词被屏蔽`);
        }
        appendLog(`
🔵 云端测试完成！共测试 ${total} 个词，其中 ${totalBlocked} 个原词被屏蔽`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 测试出错：${msg}`);
      } finally {
        testingRemote.value = false;
      }
    };
    const testLocal = async () => {
      if (!confirm("即将测试本地替换词，请避免在当前直播间正在直播时进行测试，否则可能会给主播造成困扰，是否继续？"))
        return;
      testingLocal.value = true;
      try {
        const roomId = await ensureRoomId();
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 未找到登录信息，请先登录 Bilibili");
          return;
        }
        const globalRules2 = localGlobalRules.value.filter((r2) => r2.from);
        const rid = cachedRoomId.value;
        const roomRules = rid !== null ? (localRoomRules.value[String(rid)] ?? []).filter((r2) => r2.from) : [];
        const total = globalRules2.length + roomRules.length;
        if (total === 0) {
          appendLog("⚠️ 没有本地替换词可供测试，请先添加本地替换规则");
          return;
        }
        appendLog(`🔵 开始测试本地替换词 ${total} 个（全局 ${globalRules2.length} + 当前房间 ${roomRules.length}）`);
        let tested = 0;
        let totalBlocked = 0;
        if (globalRules2.length > 0) {
          appendLog(`
📋 测试本地全局替换词 (${globalRules2.length} 个)`);
          let blockedCount = 0;
          for (const rule of globalRules2) {
            tested++;
            appendLog(`[${tested}/${total}] 测试: ${rule.from}`);
            const result = await testKeywordPair(rule.from ?? "", rule.to ?? "", roomId, csrfToken);
            const b2 = logTestResult(result, rule.to ?? "");
            blockedCount += b2;
            totalBlocked += b2;
            if (tested < total) await new Promise((r2) => setTimeout(r2, 2e3));
          }
          appendLog(`📋 本地全局替换词测试完成：${blockedCount}/${globalRules2.length} 个原词被屏蔽`);
        }
        if (roomRules.length > 0) {
          appendLog(`
🏠 测试本地房间替换词 (${roomRules.length} 个)`);
          let blockedCount = 0;
          for (const rule of roomRules) {
            tested++;
            appendLog(`[${tested}/${total}] 测试: ${rule.from}`);
            const result = await testKeywordPair(rule.from ?? "", rule.to ?? "", roomId, csrfToken);
            const b2 = logTestResult(result, rule.to ?? "");
            blockedCount += b2;
            totalBlocked += b2;
            if (tested < total) await new Promise((r2) => setTimeout(r2, 2e3));
          }
          appendLog(`🏠 本地房间替换词测试完成：${blockedCount}/${roomRules.length} 个原词被屏蔽`);
        }
        appendLog(`
🔵 本地测试完成！共测试 ${total} 个词，其中 ${totalBlocked} 个原词被屏蔽`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 测试出错：${msg}`);
      } finally {
        testingLocal.value = false;
      }
    };
    const checkMedalRooms = async () => {
      checkingMedalRooms.value = true;
      medalCheckResults.value = [];
      medalCheckStatus.value = "正在获取粉丝牌…";
      try {
        const rooms = await fetchMedalRooms();
        if (rooms.length === 0) {
          medalCheckStatus.value = "没有找到粉丝牌直播间";
          appendLog("禁言巡检：没有找到粉丝牌直播间");
          return;
        }
        appendLog(`禁言巡检：找到 ${rooms.length} 个粉丝牌直播间，开始检查`);
        const results = [];
        for (let i2 = 0; i2 < rooms.length; i2++) {
          const room = rooms[i2];
          medalCheckStatus.value = `检查中 ${i2 + 1}/${rooms.length}：${room.anchorName}（${room.medalName}）`;
          const result = await checkMedalRoomRestriction(room);
          results.push(result);
          medalCheckResults.value = [...results];
          const label = `${room.anchorName} / ${room.medalName} / ${room.roomId}`;
          if (result.status === "restricted") {
            const detail = result.signals.map((signal) => `${signalKindLabel(signal.kind)}：${signal.message}，时长：${signal.duration}`).join("；");
            appendLog(`禁言巡检：发现限制 - ${label}：${detail}`);
          } else if (result.status === "deactivated") {
            appendLog(`禁言巡检：主播已注销 - ${label}`);
          } else if (result.status === "unknown") {
            appendLog(`禁言巡检：无法确认 - ${label}：${result.note ?? "接口未返回明确结果"}`);
          } else {
            appendLog(`禁言巡检：正常 - ${label}`);
          }
          if (i2 < rooms.length - 1) await new Promise((r2) => setTimeout(r2, 500));
        }
        const counts = getMedalCheckCounts(results);
        medalCheckStatus.value = `完成：${rooms.length} 个房间，${counts.restricted} 个限制，${counts.deactivated} 个主播注销，${counts.unknown} 个无法确认`;
        appendLog(
          `禁言巡检完成：${rooms.length} 个房间，${counts.restricted} 个限制，${counts.deactivated} 个主播注销，${counts.unknown} 个无法确认`
        );
        if (guardRoomSyncKey.value.trim()) await syncGuardRoomInspection(results);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        medalCheckStatus.value = `检查失败：${msg}`;
        appendLog(`禁言巡检失败：${msg}`);
      } finally {
        checkingMedalRooms.value = false;
      }
    };
    const syncGuardRoomInspection = async (results = medalCheckResults.value) => {
      if (results.length === 0) {
        guardRoomSyncStatus.value = "还没有巡检结果";
        return;
      }
      const endpoint = normalizeGuardRoomEndpoint(guardRoomEndpoint.value);
      const syncKey = guardRoomSyncKey.value.trim();
      if (!endpoint || !syncKey) {
        guardRoomSyncStatus.value = "缺少保安室地址或同步密钥";
        return;
      }
      guardRoomSyncing.value = true;
      guardRoomSyncStatus.value = "同步中…";
      try {
        const response = await fetch(`${endpoint}/api/inspection-runs`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-sync-key": syncKey
          },
          body: JSON.stringify(buildGuardRoomInspectionRun(results))
        });
        const json = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(json.message ?? `HTTP ${response.status}`);
        guardRoomSyncStatus.value = "已同步到直播间保安室";
        appendLog("直播间保安室：巡检结果已同步");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        guardRoomSyncStatus.value = `同步失败：${msg}`;
        appendLog(`直播间保安室：同步失败：${msg}`);
      } finally {
        guardRoomSyncing.value = false;
      }
    };
    const copyMedalCheckResults = async () => {
      const results = medalCheckResults.value;
      if (results.length === 0) {
        medalCheckCopyStatus.value = "还没有巡检结果";
        return;
      }
      try {
        await navigator.clipboard.writeText(formatMedalCheckReport(results, medalCheckStatus.value, medalCheckFilter.value));
        medalCheckCopyStatus.value = `已复制${medalFilterLabel(medalCheckFilter.value)}结果`;
        setTimeout(() => {
          medalCheckCopyStatus.value = "";
        }, 1800);
      } catch {
        medalCheckCopyStatus.value = "复制失败，请检查浏览器剪贴板权限";
      }
    };
    const addGlobalRule = () => {
      if (!globalReplaceFrom.value) {
        appendLog("⚠️ 替换前的内容不能为空");
        return;
      }
      localGlobalRules.value = [...localGlobalRules.value, { from: globalReplaceFrom.value, to: globalReplaceTo.value }];
      buildReplacementMap();
      globalReplaceFrom.value = "";
      globalReplaceTo.value = "";
    };
    const removeGlobalRule = (index) => {
      const next = [...localGlobalRules.value];
      next.splice(index, 1);
      localGlobalRules.value = next;
      buildReplacementMap();
    };
    const addRoomRule = () => {
      const rid = editingRoomId.value;
      if (!rid) {
        appendLog("⚠️ 请先选择一个直播间");
        return;
      }
      if (!roomReplaceFrom.value) {
        appendLog("⚠️ 替换前的内容不能为空");
        return;
      }
      const all = { ...localRoomRules.value };
      const existing = all[rid] ?? [];
      all[rid] = [...existing, { from: roomReplaceFrom.value, to: roomReplaceTo.value }];
      localRoomRules.value = all;
      buildReplacementMap();
      roomReplaceFrom.value = "";
      roomReplaceTo.value = "";
    };
    const removeRoomRule = (index) => {
      const rid = editingRoomId.value;
      if (!rid) return;
      const all = { ...localRoomRules.value };
      const existing = [...all[rid] ?? []];
      existing.splice(index, 1);
      if (existing.length === 0) {
        delete all[rid];
      } else {
        all[rid] = existing;
      }
      localRoomRules.value = all;
      buildReplacementMap();
    };
    const addRoom = () => {
      const rid = newRoomId.value.trim();
      if (!rid) return;
      if (knownRoomIds.includes(rid)) {
        editingRoomId.value = rid;
        newRoomId.value = "";
        return;
      }
      const all = { ...localRoomRules.value };
      all[rid] = all[rid] ?? [];
      localRoomRules.value = all;
      editingRoomId.value = rid;
      newRoomId.value = "";
    };
    const deleteRoom = (rid) => {
      const all = { ...localRoomRules.value };
      delete all[rid];
      localRoomRules.value = all;
      if (editingRoomId.value === rid) {
        editingRoomId.value = cachedRoomId.value !== null ? String(cachedRoomId.value) : "";
      }
      buildReplacementMap();
    };
    const didInit = A(false);
    y$2(() => {
      if (didInit.current) return;
      didInit.current = true;
      const ls = remoteKeywordsLastSync.value;
      if (!ls || Date.now() - ls > SYNC_INTERVAL) {
        void syncRemote();
      } else {
        updateRemoteStatus();
      }
      const timer = setInterval(() => void syncRemote(), SYNC_INTERVAL);
      return () => clearInterval(timer);
    }, []);
    y$2(() => {
      if (editingRoomId.value) return;
      const rid = cachedRoomId.value;
      if (rid !== null) {
        editingRoomId.value = String(rid);
      }
    }, [editingRoomId.value, cachedRoomId.value]);
    const globalRules = localGlobalRules.value;
    const knownRoomIds = Object.keys(localRoomRules.value);
    const currentRoomStr = cachedRoomId.value !== null ? String(cachedRoomId.value) : null;
    if (currentRoomStr && !knownRoomIds.includes(currentRoomStr)) {
      knownRoomIds.unshift(currentRoomStr);
    }
    const editingRules = editingRoomId.value ? localRoomRules.value[editingRoomId.value] ?? [] : [];
    return u$2(S$1, { children: [
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: [
              "云端规则替换",
              " ",
u$2(
                "a",
                {
                  href: "https://github.com/laplace-live/public/blob/master/artifacts/livesrtream-keywords.json",
                  target: "_blank",
                  style: { color: "#288bb8", textDecoration: "none" },
                  rel: "noopener",
                  children: "我要贡献规则"
                }
              )
            ] }),
u$2("div", { className: "cb-note", style: { marginBlock: ".5em", color: "#666" }, children: "每10分钟会自动同步云端替换规则" }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2("button", { type: "button", disabled: syncing.value, onClick: () => void syncRemote(), children: syncing.value ? "同步中…" : "同步" }),
u$2("button", { type: "button", disabled: testingRemote.value, onClick: () => void testRemote(), children: testingRemote.value ? "测试中…" : "测试云端词库" }),
u$2("span", { style: { color: syncStatusColor.value }, children: syncStatus.value })
                ]
              }
            )
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold" }, children: "本地全局规则" }),
u$2("button", { type: "button", disabled: testingLocal.value, onClick: () => void testLocal(), children: testingLocal.value ? "测试中…" : "测试本地词库" })
                ]
              }
            ),
u$2("div", { className: "cb-note", style: { marginBlock: ".5em", color: "#666" }, children: "适用于所有直播间，优先级高于云端规则" }),
u$2("div", { style: { marginBottom: ".5em", maxHeight: "160px", overflowY: "auto" }, children: globalRules.length === 0 ? u$2("div", { className: "cb-empty", style: { color: "#999" }, children: "暂无全局替换规则，请在下方添加" }) : globalRules.map((rule, i2) => u$2(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: ".5em",
                  padding: ".2em",
                  borderBottom: "1px solid var(--Ga2, #eee)"
                },
                children: [
u$2("span", { style: { flex: 1, wordBreak: "break-all", fontFamily: "monospace" }, children: [
                    rule.from ?? "(空)",
                    " → ",
                    rule.to ?? "(空)"
                  ] }),
u$2(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeGlobalRule(i2),
                      style: {
                        cursor: "pointer",
                        background: "transparent",
                        color: "red",
                        border: "none",
                        borderRadius: "2px"
                      },
                      children: "删除"
                    }
                  )
                ]
              },
              i2
            )) }),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".25em", alignItems: "center", flexWrap: "wrap" }, children: [
u$2(
                "input",
                {
                  placeholder: "替换前",
                  style: { flex: 1, minWidth: "80px" },
                  value: globalReplaceFrom.value,
                  onInput: (e2) => {
                    globalReplaceFrom.value = e2.currentTarget.value;
                  },
                  onKeyDown: (e2) => {
                    if (e2.key === "Enter" && !e2.isComposing) {
                      e2.preventDefault();
                      addGlobalRule();
                    }
                  }
                }
              ),
u$2("span", { children: "→" }),
u$2(
                "input",
                {
                  placeholder: "替换后",
                  style: { flex: 1, minWidth: "80px" },
                  value: globalReplaceTo.value,
                  onInput: (e2) => {
                    globalReplaceTo.value = e2.currentTarget.value;
                  },
                  onKeyDown: (e2) => {
                    if (e2.key === "Enter" && !e2.isComposing) {
                      e2.preventDefault();
                      addGlobalRule();
                    }
                  }
                }
              ),
u$2("button", { type: "button", onClick: addGlobalRule, children: "添加" })
            ] })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "本地直播间规则" }),
u$2("div", { className: "cb-note", style: { marginBlock: ".5em", color: "#666" }, children: "仅在对应直播间生效；优先级高于全局规则" }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2(
                    "select",
                    {
                      value: editingRoomId.value,
                      onChange: (e2) => {
                        editingRoomId.value = e2.currentTarget.value;
                      },
                      style: { minWidth: "120px" },
                      children: [
u$2("option", { value: "", disabled: true, children: "选择直播间" }),
                        knownRoomIds.map((rid) => u$2("option", { value: rid, children: [
                          rid,
                          rid === currentRoomStr ? " (当前)" : ""
                        ] }, rid))
                      ]
                    }
                  ),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".25em", alignItems: "center" }, children: [
u$2(
                      "input",
                      {
                        placeholder: "房间号",
                        style: { width: "80px" },
                        value: newRoomId.value,
                        onInput: (e2) => {
                          newRoomId.value = e2.currentTarget.value.replace(/\D/g, "");
                        },
                        onKeyDown: (e2) => {
                          if (e2.key === "Enter" && !e2.isComposing) {
                            e2.preventDefault();
                            addRoom();
                          }
                        }
                      }
                    ),
u$2("button", { type: "button", onClick: addRoom, children: "添加房间" })
                  ] }),
                  editingRoomId.value && editingRoomId.value !== currentRoomStr && u$2("button", { type: "button", onClick: () => deleteRoom(editingRoomId.value), style: { color: "red" }, children: "删除此房间" })
                ]
              }
            ),
            editingRoomId.value ? u$2(S$1, { children: [
u$2("div", { style: { marginBottom: ".5em", maxHeight: "160px", overflowY: "auto" }, children: editingRules.length === 0 ? u$2("div", { className: "cb-empty", style: { color: "#999" }, children: "暂无此房间的替换规则，请在下方添加" }) : editingRules.map((rule, i2) => u$2(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    padding: ".2em",
                    borderBottom: "1px solid var(--Ga2, #eee)"
                  },
                  children: [
u$2("span", { style: { flex: 1, wordBreak: "break-all", fontFamily: "monospace" }, children: [
                      rule.from ?? "(空)",
                      " → ",
                      rule.to ?? "(空)"
                    ] }),
u$2(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeRoomRule(i2),
                        style: {
                          cursor: "pointer",
                          background: "transparent",
                          color: "red",
                          border: "none",
                          borderRadius: "2px"
                        },
                        children: "删除"
                      }
                    )
                  ]
                },
                i2
              )) }),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".25em", alignItems: "center", flexWrap: "wrap" }, children: [
u$2(
                  "input",
                  {
                    placeholder: "替换前",
                    style: { flex: 1, minWidth: "80px" },
                    value: roomReplaceFrom.value,
                    onInput: (e2) => {
                      roomReplaceFrom.value = e2.currentTarget.value;
                    },
                    onKeyDown: (e2) => {
                      if (e2.key === "Enter" && !e2.isComposing) {
                        e2.preventDefault();
                        addRoomRule();
                      }
                    }
                  }
                ),
u$2("span", { children: "→" }),
u$2(
                  "input",
                  {
                    placeholder: "替换后",
                    style: { flex: 1, minWidth: "80px" },
                    value: roomReplaceTo.value,
                    onInput: (e2) => {
                      roomReplaceTo.value = e2.currentTarget.value;
                    },
                    onKeyDown: (e2) => {
                      if (e2.key === "Enter" && !e2.isComposing) {
                        e2.preventDefault();
                        addRoomRule();
                      }
                    }
                  }
                ),
u$2("button", { type: "button", onClick: addRoomRule, children: "添加" })
              ] })
            ] }) : u$2("div", { className: "cb-empty", style: { color: "#999" }, children: "请选择或添加一个直播间" })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "表情（复制后可在独轮车或常规发送中直接发送）" }),
u$2("div", { style: { maxHeight: "200px", overflowY: "auto" }, children: u$2(EmoteIds, {}) })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "粉丝牌禁言巡检" }),
u$2("div", { className: "cb-note", style: { marginBlock: ".5em", color: "#666" }, children: "只读取 B 站接口，不发送弹幕。结果会按限制、无法确认、主播注销、正常排序；上次巡检会自动保留。" }),
u$2("div", { className: "cb-panel cb-stack", style: { marginBottom: ".5em" }, children: [
u$2("div", { className: "cb-heading", style: { marginBottom: 0 }, children: "直播间保安室同步" }),
u$2(
                "input",
                {
                  type: "text",
                  placeholder: "https://bilibili-guard-room.vercel.app",
                  value: guardRoomEndpoint.value,
                  onInput: (e2) => {
                    guardRoomEndpoint.value = e2.currentTarget.value;
                  }
                }
              ),
u$2(
                "input",
                {
                  type: "text",
                  placeholder: "spaceId@syncSecret",
                  value: guardRoomSyncKey.value,
                  onInput: (e2) => {
                    guardRoomSyncKey.value = e2.currentTarget.value;
                  }
                }
              ),
u$2("div", { className: "cb-row", children: [
u$2(
                  "button",
                  {
                    type: "button",
                    disabled: guardRoomSyncing.value || medalCheckResults.value.length === 0,
                    onClick: () => void syncGuardRoomInspection(),
                    children: guardRoomSyncing.value ? "同步中…" : "保存并同步"
                  }
                ),
                guardRoomSyncStatus.value && u$2("span", { className: "cb-note", children: guardRoomSyncStatus.value })
              ] })
            ] }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2("button", { type: "button", disabled: checkingMedalRooms.value, onClick: () => void checkMedalRooms(), children: checkingMedalRooms.value ? "检查中…" : "检查粉丝牌禁言" }),
u$2("button", { type: "button", disabled: medalCheckResults.value.length === 0, onClick: () => void copyMedalCheckResults(), children: "复制巡检结果" }),
u$2("span", { style: { color: medalCheckStatus.value.includes("发现限制") ? "#a15c00" : "#666" }, children: medalCheckStatus.value }),
                  medalCheckCopyStatus.value && u$2("span", { className: "cb-note", children: medalCheckCopyStatus.value })
                ]
              }
            ),
            medalCheckResults.value.length > 0 && u$2("div", { className: "cb-stack", children: [
              (() => {
                const counts = getMedalCheckCounts(medalCheckResults.value);
                const filter = medalCheckFilter.value;
                const shownCount = getFilteredMedalResults(medalCheckResults.value, filter).length;
                const filterButtonStyle = (active, color) => ({
                  minHeight: "24px",
                  padding: "2px 6px",
                  borderColor: active ? color : void 0,
                  background: active ? "rgba(0, 122, 255, .08)" : void 0,
                  color,
                  boxShadow: active ? "inset 0 0 0 1px currentColor" : void 0
                });
                return u$2("div", { className: "cb-panel", style: { display: "grid", gap: "6px" }, children: [
u$2("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }, children: [
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "issues",
                        onClick: () => {
                          medalCheckFilter.value = "issues";
                        },
                        style: filterButtonStyle(filter === "issues", "#a15c00"),
                        children: [
                          "异常 ",
                          counts.restricted + counts.unknown + counts.deactivated
                        ]
                      }
                    ),
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "all",
                        onClick: () => {
                          medalCheckFilter.value = "all";
                        },
                        style: filterButtonStyle(filter === "all"),
                        children: [
                          "全部 ",
                          medalCheckResults.value.length
                        ]
                      }
                    ),
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "restricted",
                        onClick: () => {
                          medalCheckFilter.value = "restricted";
                        },
                        style: filterButtonStyle(filter === "restricted", "#a15c00"),
                        children: [
                          "限制 ",
                          counts.restricted
                        ]
                      }
                    ),
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "unknown",
                        onClick: () => {
                          medalCheckFilter.value = "unknown";
                        },
                        style: filterButtonStyle(filter === "unknown", "#666"),
                        children: [
                          "未知 ",
                          counts.unknown
                        ]
                      }
                    ),
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "deactivated",
                        onClick: () => {
                          medalCheckFilter.value = "deactivated";
                        },
                        style: filterButtonStyle(filter === "deactivated", "#8e8e93"),
                        children: [
                          "注销 ",
                          counts.deactivated
                        ]
                      }
                    ),
u$2(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": filter === "ok",
                        onClick: () => {
                          medalCheckFilter.value = "ok";
                        },
                        style: filterButtonStyle(filter === "ok", "#0a7f55"),
                        children: [
                          "正常 ",
                          counts.ok
                        ]
                      }
                    )
                  ] }),
u$2("div", { className: "cb-note", children: [
                    "当前显示：",
                    medalFilterLabel(filter),
                    " ",
                    shownCount,
                    " / ",
                    medalCheckResults.value.length,
                    " 条"
                  ] })
                ] });
              })(),
u$2("div", { style: { maxHeight: "220px", overflowY: "auto", display: "grid", gap: ".35em" }, children: getFilteredMedalResults(medalCheckResults.value, medalCheckFilter.value).map((result) => {
                const color = medalStatusColor(result.status);
                const title = medalStatusTitle(result.status);
                return u$2(
                  "div",
                  {
                    className: "cb-panel",
                    style: { display: "grid", gap: ".25em", borderColor: result.status === "restricted" ? "#f0b35a" : void 0 },
                    children: [
u$2("div", { style: { display: "flex", justifyContent: "space-between", gap: ".5em" }, children: [
u$2("strong", { style: { wordBreak: "break-all" }, children: [
                          result.room.anchorName,
                          " / ",
                          result.room.medalName
                        ] }),
u$2("span", { style: { color, whiteSpace: "nowrap" }, children: title })
                      ] }),
u$2("div", { className: "cb-note", children: [
                        "房间号：",
                        result.room.roomId,
                        " · 检查时间：",
                        formatCheckTime(result.checkedAt)
                      ] }),
                      result.signals.length > 0 ? result.signals.map((signal, index) => u$2("div", { style: { color, wordBreak: "break-all", lineHeight: 1.5 }, children: [
                        signalKindLabel(signal.kind),
                        "：",
                        signal.message,
u$2("br", {}),
                        "时长：",
                        signal.duration,
                        " · 来源：",
                        signal.source
                      ] }, index)) : u$2("div", { className: "cb-note", children: result.note ?? "接口未发现禁言/封禁信号" })
                    ]
                  },
                  result.room.roomId
                );
              }) })
            ] })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: "1em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "其他设置" }),
u$2("div", { style: { display: "flex", flexDirection: "column", gap: ".5em" }, children: [
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "danmakuDirectMode",
                    type: "checkbox",
                    checked: danmakuDirectMode.value,
                    onInput: (e2) => {
                      danmakuDirectMode.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "danmakuDirectMode", children: "+1模式（在聊天消息旁显示偷弹幕和+1按钮）" })
              ] }),
u$2(
                "span",
                {
                  className: "cb-switch-row",
                  style: { display: "inline-flex", alignItems: "center", gap: ".25em", paddingLeft: "1.5em" },
                  children: [
u$2(
                      "input",
                      {
                        id: "danmakuDirectConfirm",
                        type: "checkbox",
                        checked: danmakuDirectConfirm.value,
                        disabled: !danmakuDirectMode.value,
                        onInput: (e2) => {
                          danmakuDirectConfirm.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { htmlFor: "danmakuDirectConfirm", style: { color: danmakuDirectMode.value ? void 0 : "#999" }, children: "+1弹幕发送前需确认（防误触）" })
                  ]
                }
              ),
u$2(
                "span",
                {
                  className: "cb-switch-row",
                  style: { display: "inline-flex", alignItems: "center", gap: ".25em", paddingLeft: "1.5em" },
                  children: [
u$2(
                      "input",
                      {
                        id: "danmakuDirectAlwaysShow",
                        type: "checkbox",
                        checked: danmakuDirectAlwaysShow.value,
                        disabled: !danmakuDirectMode.value,
                        onInput: (e2) => {
                          danmakuDirectAlwaysShow.value = e2.currentTarget.checked;
                        }
                      }
                    ),
u$2("label", { htmlFor: "danmakuDirectAlwaysShow", style: { color: danmakuDirectMode.value ? void 0 : "#999" }, children: "总是显示偷/+1按钮" })
                  ]
                }
              ),
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "forceScrollDanmaku",
                    type: "checkbox",
                    checked: forceScrollDanmaku.value,
                    onInput: (e2) => {
                      forceScrollDanmaku.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "forceScrollDanmaku", children: "脚本载入时强制配置弹幕位置为滚动方向" })
              ] }),
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "unlockForbidLive",
                    type: "checkbox",
                    checked: unlockForbidLive.value,
                    onInput: (e2) => {
                      unlockForbidLive.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "unlockForbidLive", children: "拉黑直播间解锁（刷新生效，仅布局解锁）" })
              ] }),
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "optimizeLayout",
                    type: "checkbox",
                    checked: optimizeLayout.value,
                    onInput: (e2) => {
                      optimizeLayout.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "optimizeLayout", children: "优化布局" })
              ] })
            ] })
          ]
        }
      ),
u$2("div", { className: "cb-section cb-stack", style: { margin: ".5em 0", paddingBottom: "1em" }, children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "日志设置" }),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap" }, children: [
u$2("label", { htmlFor: "maxLogLines", style: { color: "#666" }, children: "最大日志行数:" }),
u$2(
            "input",
            {
              id: "maxLogLines",
              type: "number",
              min: "1",
              max: "1000",
              style: { width: "80px" },
              value: maxLogLines.value,
              onChange: (e2) => {
                let v2 = parseInt(e2.currentTarget.value, 10);
                if (Number.isNaN(v2) || v2 < 1) v2 = 1;
                else if (v2 > 1e3) v2 = 1e3;
                maxLogLines.value = v2;
              }
            }
          ),
u$2("span", { style: { color: "#999", fontSize: "0.9em" }, children: "(1-1000)" })
        ] })
      ] })
    ] });
  }
  const SONIOX_FLUSH_DELAY_MS = 5e3;
  function SttTab() {
    const apiKeyVisible = useSignal(false);
    const state = useSignal("stopped");
    const statusText = useSignal("未启动");
    const statusColor = useSignal("#666");
    const finalText = useSignal("");
    const nonFinalText = useSignal("");
    const clientRef = A(null);
    const accFinal = A("");
    const accTranslated = A("");
    const sendBuffer = A("");
    const flushTimeout = A(null);
    const isFlushing = A(false);
    const resetState = () => {
      state.value = "stopped";
      sttRunning.value = false;
      statusText.value = "未启动";
      statusColor.value = "#666";
      clientRef.current = null;
      sendBuffer.current = "";
      isFlushing.current = false;
      accFinal.current = "";
      accTranslated.current = "";
      finalText.value = "";
      nonFinalText.value = "";
      if (flushTimeout.current) {
        clearTimeout(flushTimeout.current);
        flushTimeout.current = null;
      }
    };
    const sendSegment = async (segment) => {
      if (!segment.trim()) return;
      try {
        const roomId = await ensureRoomId();
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          appendLog("❌ 同传：未找到登录信息");
          return;
        }
        const result = await enqueueDanmaku(segment, roomId, csrfToken, SendPriority.STT);
        appendLog(result, "同传", segment);
        if (!result.success && !result.cancelled) {
          await tryAiEvasion(segment, roomId, csrfToken, "同传");
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 同传发送出错：${msg}`);
      }
    };
    const flushBuffer = async () => {
      if (isFlushing.current) return;
      isFlushing.current = true;
      try {
        if (flushTimeout.current) {
          clearTimeout(flushTimeout.current);
          flushTimeout.current = null;
        }
        if (!sendBuffer.current.trim()) return;
        const wrap = sonioxWrapBrackets.value;
        const maxLen = sonioxMaxLength.value || 40;
        const splitLen = wrap ? Math.max(1, maxLen - 2) : maxLen;
        const processedText = applyReplacements(sendBuffer.current.trim());
        sendBuffer.current = "";
        const segments = splitTextSmart(processedText, splitLen);
        for (const segment of segments) {
          const clean = stripTrailingPunctuation(segment);
          if (!clean) continue;
          await sendSegment(wrap ? `【${clean}】` : clean);
        }
      } finally {
        isFlushing.current = false;
      }
    };
    const addToBuffer = (text) => {
      if (!text) return;
      sendBuffer.current += text;
      if (flushTimeout.current) clearTimeout(flushTimeout.current);
      if (state.value === "running") {
        flushTimeout.current = setTimeout(() => void flushBuffer(), SONIOX_FLUSH_DELAY_MS);
      }
    };
    const toggle = async () => {
      if (state.value === "stopped") {
        const apiKey = sonioxApiKey.value.trim();
        if (!apiKey) {
          appendLog("⚠️ 请先输入 Soniox API Key");
          statusText.value = "请输入 API Key";
          statusColor.value = "#f44";
          return;
        }
        finalText.value = "";
        nonFinalText.value = "";
        accFinal.current = "";
        accTranslated.current = "";
        state.value = "starting";
        statusText.value = "正在连接…";
        statusColor.value = "#666";
        try {
          const client = new speechToTextWeb.SonioxClient({ apiKey });
          clientRef.current = client;
          const hints2 = sonioxLanguageHints.value;
          const translationEnabled = sonioxTranslationEnabled.value;
          const translationTarget = sonioxTranslationTarget.value;
          const startConfig = {
            model: "stt-rt-v3",
            languageHints: hints2,
            enableEndpointDetection: true,
            onStarted: () => {
              state.value = "running";
              sttRunning.value = true;
              if (translationEnabled) {
                const langNames = { en: "English", zh: "中文", ja: "日本語" };
                statusText.value = `正在识别并翻译为${langNames[translationTarget] ?? translationTarget}…`;
              } else {
                statusText.value = "正在识别…";
              }
              statusColor.value = "#36a185";
              appendLog(translationEnabled ? `🎤 同传已启动（翻译模式：${translationTarget}）` : "🎤 同传已启动");
            },
            onPartialResult: (result) => {
              let newFinal = "";
              let nonFinal = "";
              let newTransFinal = "";
              let transNonFinal = "";
              let endpointDetected = false;
              for (const token of result.tokens ?? []) {
                if (token.text === "<end>" && token.is_final) {
                  endpointDetected = true;
                  continue;
                }
                if (translationEnabled) {
                  if (token.translation_status === "translation") {
                    if (token.is_final) newTransFinal += token.text;
                    else transNonFinal += token.text;
                  }
                } else {
                  if (token.is_final) newFinal += token.text;
                  else nonFinal += token.text;
                }
              }
              if (translationEnabled) {
                if (newTransFinal && sonioxAutoSend.value) addToBuffer(newTransFinal);
                accTranslated.current += newTransFinal;
                let display = accTranslated.current;
                if (display.length > 500) display = `…${display.slice(-500)}`;
                finalText.value = display;
                nonFinalText.value = transNonFinal;
              } else {
                if (newFinal && sonioxAutoSend.value) addToBuffer(newFinal);
                accFinal.current += newFinal;
                let display = accFinal.current;
                if (display.length > 500) display = `…${display.slice(-500)}`;
                finalText.value = display;
                nonFinalText.value = nonFinal;
              }
              if (endpointDetected && sonioxAutoSend.value) {
                setTimeout(() => void flushBuffer(), translationEnabled ? 300 : 0);
              }
            },
            onFinished: async () => {
              let waitCount = 0;
              while (isFlushing.current && waitCount < 100) {
                await new Promise((r2) => setTimeout(r2, 100));
                waitCount++;
              }
              await flushBuffer();
              appendLog("🎤 同传已停止");
              resetState();
            },
            onError: (_status, message) => {
              console.error("Soniox error:", message);
              appendLog(`🔴 Soniox 错误：${message}`);
              statusText.value = `错误: ${message}`;
              statusColor.value = "#f44";
              if (state.value !== "stopping" && state.value !== "stopped") resetState();
            }
          };
          if (translationEnabled) {
            startConfig.translation = { type: "one_way", target_language: translationTarget };
          }
          client.start(startConfig);
        } catch (err) {
          console.error("Soniox startup error:", err);
          const message = err instanceof Error ? err.message : String(err);
          if (err instanceof Error && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
            appendLog("❌ 麦克风权限被拒绝，请在浏览器设置中允许使用麦克风");
            statusText.value = "麦克风权限被拒绝";
          } else if (err instanceof Error && err.name === "NotFoundError") {
            appendLog("❌ 未找到麦克风设备");
            statusText.value = "未找到麦克风";
          } else {
            appendLog(`🔴 启动同传失败：${message}`);
            statusText.value = `启动失败: ${message}`;
          }
          statusColor.value = "#f44";
          resetState();
        }
      } else if (state.value === "running") {
        state.value = "stopping";
        statusText.value = "正在停止…";
        if (clientRef.current) clientRef.current.stop();
      }
    };
    const updateLangHints = (lang, checked) => {
      let hints2 = [...sonioxLanguageHints.value];
      if (checked && !hints2.includes(lang)) hints2.push(lang);
      else if (!checked) hints2 = hints2.filter((h2) => h2 !== lang);
      if (hints2.length === 0) hints2 = ["zh"];
      sonioxLanguageHints.value = hints2;
    };
    const btnText = state.value === "starting" ? "启动中…" : state.value === "stopping" ? "停止中…" : state.value === "running" ? "停止同传" : "开始同传";
    const hints = sonioxLanguageHints.value;
    return u$2(S$1, { children: [
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: ".5em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "Soniox API 设置" }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2(
                    "input",
                    {
                      type: apiKeyVisible.value ? "text" : "password",
                      placeholder: "输入 Soniox API Key",
                      style: { flex: 1, minWidth: "150px" },
                      value: sonioxApiKey.value,
                      onInput: (e2) => {
                        sonioxApiKey.value = e2.currentTarget.value;
                      }
                    }
                  ),
u$2(
                    "button",
                    {
                      type: "button",
                      style: { cursor: "pointer" },
                      onClick: () => {
                        apiKeyVisible.value = !apiKeyVisible.value;
                      },
                      children: apiKeyVisible.value ? "隐藏" : "显示"
                    }
                  )
                ]
              }
            ),
u$2("div", { className: "cb-note", style: { marginBlock: ".5em", color: "#666", fontSize: "0.9em" }, children: [
              "前往",
              " ",
u$2("a", { href: "https://soniox.com/", target: "_blank", style: { color: "#288bb8" }, rel: "noopener", children: "Soniox" }),
              " ",
              "注册账号并获取 API Key"
            ] })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: ".5em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "语音识别设置" }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: [
u$2("span", { children: "语言提示：" }),
                  ["zh", "en", "ja", "ko"].map((lang) => {
                    const labels = { zh: "中文", en: "English", ja: "日本語", ko: "한국어" };
                    return u$2(
                      "span",
                      {
                        className: "cb-switch-row",
                        style: { display: "inline-flex", alignItems: "center", gap: ".25em" },
                        children: [
u$2(
                            "input",
                            {
                              type: "checkbox",
                              checked: hints.includes(lang),
                              onChange: (e2) => updateLangHints(lang, e2.currentTarget.checked)
                            }
                          ),
u$2("label", { htmlFor: lang, children: labels[lang] })
                        ]
                      },
                      lang
                    );
                  }),
u$2("label", { htmlFor: "sonioxMaxLength", children: "超过" }),
u$2(
                    "input",
                    {
                      id: "sonioxMaxLength",
                      type: "number",
                      min: "1",
                      style: { width: "40px" },
                      value: sonioxMaxLength.value,
                      onInput: (e2) => {
                        const v2 = parseInt(e2.currentTarget.value, 10) || 1;
                        sonioxMaxLength.value = Math.max(1, v2);
                      }
                    }
                  ),
u$2("span", { children: "字自动分段" })
                ]
              }
            ),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".75em", alignItems: "center", flexWrap: "wrap" }, children: [
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "sonioxAutoSend",
                    type: "checkbox",
                    checked: sonioxAutoSend.value,
                    onInput: (e2) => {
                      sonioxAutoSend.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "sonioxAutoSend", children: "识别完成后自动发送弹幕" })
              ] }),
u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                  "input",
                  {
                    id: "sonioxWrapBrackets",
                    type: "checkbox",
                    checked: sonioxWrapBrackets.value,
                    onInput: (e2) => {
                      sonioxWrapBrackets.value = e2.currentTarget.checked;
                    }
                  }
                ),
u$2("label", { htmlFor: "sonioxWrapBrackets", children: "使用【】包裹同传内容" })
              ] })
            ] })
          ]
        }
      ),
u$2(
        "div",
        {
          className: "cb-section cb-stack",
          style: { margin: ".5em 0", paddingBottom: ".5em", borderBottom: "1px solid var(--Ga2, #eee)" },
          children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".5em" }, children: "实时翻译设置" }),
u$2(
              "div",
              {
                className: "cb-row",
                style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
                children: u$2("span", { className: "cb-switch-row", style: { display: "inline-flex", alignItems: "center", gap: ".25em" }, children: [
u$2(
                    "input",
                    {
                      id: "sonioxTranslationEnabled",
                      type: "checkbox",
                      checked: sonioxTranslationEnabled.value,
                      onInput: (e2) => {
                        sonioxTranslationEnabled.value = e2.currentTarget.checked;
                      }
                    }
                  ),
u$2("label", { htmlFor: "sonioxTranslationEnabled", children: "启用实时翻译" })
                ] })
              }
            ),
u$2("div", { className: "cb-row", style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap" }, children: [
u$2("label", { htmlFor: "sonioxTranslationTarget", children: "翻译目标语言：" }),
u$2(
                "select",
                {
                  id: "sonioxTranslationTarget",
                  style: { minWidth: "80px" },
                  value: sonioxTranslationTarget.value,
                  onChange: (e2) => {
                    sonioxTranslationTarget.value = e2.currentTarget.value;
                  },
                  children: [
u$2("option", { value: "en", children: "English" }),
u$2("option", { value: "zh", children: "中文" }),
u$2("option", { value: "ja", children: "日本語" })
                  ]
                }
              )
            ] }),
u$2("div", { className: "cb-note", style: { marginTop: ".5em", color: "#666", fontSize: "0.9em" }, children: "启用后将发送翻译结果而非原始识别文字" })
          ]
        }
      ),
u$2("div", { className: "cb-section cb-stack", style: { margin: ".5em 0" }, children: [
u$2(
          "div",
          {
            className: "cb-row",
            style: { display: "flex", gap: ".5em", alignItems: "center", flexWrap: "wrap", marginBottom: ".5em" },
            children: [
u$2("button", { type: "button", onClick: () => void toggle(), children: btnText }),
u$2("span", { style: { color: statusColor.value }, children: statusText.value })
            ]
          }
        ),
u$2("div", { style: { marginBlock: ".5em" }, children: [
u$2("div", { className: "cb-heading", style: { fontWeight: "bold", marginBottom: ".25em" }, children: "实时识别结果：" }),
u$2(
            "div",
            {
              className: "cb-result",
              style: {
                padding: ".5em",
                background: "var(--bg2, #f5f5f5)",
                borderRadius: "4px",
                minHeight: "40px",
                maxHeight: "100px",
                overflowY: "auto",
                wordBreak: "break-all"
              },
              children: [
u$2("span", { children: finalText.value }),
u$2("span", { style: { color: "#999" }, children: nonFinalText.value })
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  const TABS = [
    { id: "fasong", label: "发送" },
    { id: "tongchuan", label: "同传" },
    { id: "settings", label: "设置" },
    { id: "about", label: "关于" }
  ];
  function Tabs() {
    const current = activeTab.value;
    return u$2("div", { className: "cb-tabs", children: TABS.map((tab) => u$2(
      "button",
      {
        type: "button",
        className: "cb-tab",
        "data-active": current === tab.id,
        onClick: () => {
          activeTab.value = tab.id;
        },
        children: [
          tab.label,
          tab.id === "fasong" && sendMsg.value ? " · 车" : "",
          tab.id === "fasong" && autoBlendEnabled.value ? " · 跟" : "",
          tab.id === "tongchuan" && sttRunning.value ? " · 开" : ""
        ]
      },
      tab.id
    )) });
  }
  function Configurator() {
    const tab = activeTab.value;
    const visible = dialogOpen.value;
    return u$2(
      "div",
      {
        id: "laplace-chatterbox-dialog",
        style: {
          position: "fixed",
          right: "8px",
          bottom: "46px",
          zIndex: 2147483647,
          display: visible ? "block" : "none",
          maxHeight: "50vh",
          overflowY: "auto",
          width: "320px"
        },
        children: [
u$2(Tabs, {}),
u$2(
            "div",
            {
              style: {
                display: tab === "fasong" ? "block" : "none"
              },
              className: "cb-scroll",
              children: [
u$2(AutoSendControls, {}),
u$2("div", { children: u$2(AutoBlendControls, {}) }),
u$2(
                  "div",
                  {
                    style: {
                      margin: ".25rem 0"
                    },
                    children: u$2(MemesList, {})
                  }
                ),
u$2(NormalSendTab, {})
              ]
            }
          ),
u$2(
            "div",
            {
              style: {
                display: tab === "tongchuan" ? "block" : "none"
              },
              className: "cb-scroll",
              children: u$2(SttTab, {})
            }
          ),
u$2(
            "div",
            {
              style: {
                display: tab === "settings" ? "block" : "none"
              },
              className: "cb-scroll",
              children: u$2(SettingsTab, {})
            }
          ),
u$2(
            "div",
            {
              style: {
                display: tab === "about" ? "block" : "none"
              },
              className: "cb-scroll",
              children: u$2(AboutTab, {})
            }
          ),
u$2("div", { style: { paddingInline: "10px", paddingBlockEnd: "10px" }, children: u$2(LogPanel, {}) })
        ]
      }
    );
  }
  function ToggleButton() {
    const bg = useComputed(() => sendMsg.value ? "rgb(0 186 143)" : "#777");
    const toggle = () => {
      dialogOpen.value = !dialogOpen.value;
    };
    return u$2(
      "button",
      {
        type: "button",
        id: "laplace-chatterbox-toggle",
        onClick: toggle,
        style: {
          appearance: "none",
          outline: "none",
          border: "none",
          position: "fixed",
          right: "8px",
          bottom: "8px",
          zIndex: 2147483647,
          cursor: "pointer",
          background: bg.value,
          color: "white",
          padding: "6px 8px",
          borderRadius: "4px",
          userSelect: "none"
        },
        children: "弹幕助手"
      }
    );
  }
  function App() {
    y$2(() => {
      const style = document.createElement("style");
      style.textContent = `
      #laplace-chatterbox-toggle,
      #laplace-chatterbox-dialog,
      #laplace-chatterbox-dialog * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
        font-size: 12px;
        letter-spacing: 0;
      }

      #laplace-chatterbox-toggle {
        appearance: none !important;
        border: 1px solid rgba(255, 255, 255, .42) !important;
        border-radius: 999px !important;
        min-height: 30px !important;
        padding: 0 12px !important;
        background: rgba(30, 30, 30, .78) !important;
        color: #fff !important;
        box-shadow: 0 10px 28px rgba(0, 0, 0, .22), inset 0 1px rgba(255, 255, 255, .22) !important;
        backdrop-filter: blur(18px) saturate(1.4);
        -webkit-backdrop-filter: blur(18px) saturate(1.4);
      }

      #laplace-chatterbox-dialog {
        color: #1d1d1f !important;
        background: rgba(248, 248, 250, .86) !important;
        border: 1px solid rgba(0, 0, 0, .08) !important;
        border-radius: 8px !important;
        box-shadow: 0 22px 60px rgba(0, 0, 0, .24), 0 1px 0 rgba(255,255,255,.72) inset !important;
        backdrop-filter: blur(26px) saturate(1.5);
        -webkit-backdrop-filter: blur(26px) saturate(1.5);
        scrollbar-width: thin;
      }

      #laplace-chatterbox-dialog .cb-scroll {
        padding: 8px !important;
      }

      #laplace-chatterbox-dialog details {
        margin: 0 0 6px !important;
        padding: 0 !important;
        border: 1px solid rgba(0, 0, 0, .07) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, .72) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .04) !important;
        overflow: hidden;
      }

      #laplace-chatterbox-dialog details[open] {
        background: rgba(255, 255, 255, .84) !important;
      }

      #laplace-chatterbox-dialog details > :not(summary):not(.cb-body) {
        margin-left: 10px;
        margin-right: 10px;
      }

      #laplace-chatterbox-dialog details > :last-child:not(summary) {
        margin-bottom: 10px;
      }

      #laplace-chatterbox-dialog summary {
        min-height: 32px;
        display: flex !important;
        align-items: center;
        gap: 6px;
        padding: 0 9px !important;
        color: #1d1d1f !important;
        list-style: none;
        font-weight: 650 !important;
        cursor: pointer;
        user-select: none;
      }

      #laplace-chatterbox-dialog summary::-webkit-details-marker {
        display: none;
      }

      #laplace-chatterbox-dialog summary::after {
        content: "⌄";
        margin-left: auto;
        color: #8e8e93;
        font-size: 13px;
        line-height: 1;
        transition: transform .18s ease;
      }

      #laplace-chatterbox-dialog details[open] > summary::after {
        transform: rotate(180deg);
      }

      #laplace-chatterbox-dialog button,
      #laplace-chatterbox-dialog select,
      #laplace-chatterbox-dialog input,
      #laplace-chatterbox-dialog textarea {
        outline: none !important;
        font: inherit;
      }

      #laplace-chatterbox-dialog button {
        appearance: none !important;
        min-height: 26px !important;
        border: 1px solid rgba(0, 0, 0, .08) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, .9) !important;
        color: #1d1d1f !important;
        padding: 3px 9px !important;
        cursor: pointer !important;
        font-weight: 560 !important;
        line-height: 1.3 !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .05) !important;
      }

      #laplace-chatterbox-dialog button:hover {
        background: #fff !important;
        border-color: rgba(0, 0, 0, .14) !important;
      }

      #laplace-chatterbox-dialog button:active {
        transform: translateY(1px);
      }

      #laplace-chatterbox-dialog button:disabled,
      #laplace-chatterbox-dialog input:disabled,
      #laplace-chatterbox-dialog select:disabled {
        opacity: .46;
        cursor: not-allowed !important;
      }

      #laplace-chatterbox-dialog input[type="text"],
      #laplace-chatterbox-dialog input[type="password"],
      #laplace-chatterbox-dialog input[type="number"],
      #laplace-chatterbox-dialog select,
      #laplace-chatterbox-dialog textarea {
        border: 1px solid rgba(0, 0, 0, .08) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, .86) !important;
        color: #1d1d1f !important;
        padding: 5px 8px !important;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .035) !important;
      }

      #laplace-chatterbox-dialog input[type="number"] {
        text-align: center;
        width: 64px !important;
        min-width: 64px !important;
      }

      #laplace-chatterbox-dialog textarea {
        line-height: 1.45 !important;
      }

      #laplace-chatterbox-dialog input:focus,
      #laplace-chatterbox-dialog select:focus,
      #laplace-chatterbox-dialog textarea:focus {
        border-color: #007aff !important;
        box-shadow: 0 0 0 3px rgba(0, 122, 255, .16), inset 0 1px 2px rgba(0, 0, 0, .03) !important;
      }

      #laplace-chatterbox-dialog input[type="checkbox"] {
        appearance: none !important;
        width: 30px !important;
        height: 18px !important;
        flex: 0 0 30px;
        border: none !important;
        border-radius: 999px !important;
        background: #d1d1d6 !important;
        padding: 0 !important;
        position: relative;
        cursor: pointer;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .04) !important;
        transition: background .18s ease;
      }

      #laplace-chatterbox-dialog input[type="checkbox"]::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.24);
        transition: transform .18s ease;
      }

      #laplace-chatterbox-dialog input[type="checkbox"]:checked {
        background: #34c759 !important;
      }

      #laplace-chatterbox-dialog input[type="checkbox"]:checked::after {
        transform: translateX(12px);
      }

      #laplace-chatterbox-dialog a {
        color: #007aff !important;
        text-decoration: none !important;
      }

      #laplace-chatterbox-dialog .cb-tabs {
        position: sticky;
        top: 0;
        z-index: 2;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        padding: 7px;
        background: rgba(248, 248, 250, .9);
        backdrop-filter: blur(18px) saturate(1.4);
        -webkit-backdrop-filter: blur(18px) saturate(1.4);
        border-bottom: 1px solid rgba(0, 0, 0, .06);
      }

      #laplace-chatterbox-dialog .cb-tab {
        min-height: 28px !important;
        padding: 4px 0 !important;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
        color: #6e6e73 !important;
      }

      #laplace-chatterbox-dialog .cb-tab[data-active="true"] {
        background: #fff !important;
        color: #1d1d1f !important;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .08) !important;
      }

      #laplace-chatterbox-dialog .cb-primary {
        background: #007aff !important;
        color: #fff !important;
        border-color: #007aff !important;
      }

      #laplace-chatterbox-dialog .cb-danger {
        background: #ff3b30 !important;
        color: #fff !important;
        border-color: #ff3b30 !important;
      }

      #laplace-chatterbox-dialog .cb-soft {
        color: #6e6e73 !important;
      }

      #laplace-chatterbox-dialog .cb-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }

      #laplace-chatterbox-dialog .cb-stack {
        display: grid;
        gap: 6px;
      }

      #laplace-chatterbox-dialog .cb-body {
        padding: 0 9px 8px;
      }

      #laplace-chatterbox-dialog .cb-note {
        color: #6e6e73;
        font-size: 11px !important;
        line-height: 1.45;
      }

      #laplace-chatterbox-dialog .cb-label {
        color: #6e6e73;
        font-size: 11px !important;
        font-weight: 560;
      }

      #laplace-chatterbox-dialog .cb-panel {
        border: 1px solid rgba(0,0,0,.06);
        border-radius: 8px;
        background: rgba(248, 248, 250, .8);
        padding: 7px;
      }

      #laplace-chatterbox-dialog .cb-section {
        margin: 0 0 6px !important;
        padding: 7px !important;
        border: 1px solid rgba(0, 0, 0, .06) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, .72) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .04) !important;
      }

      #laplace-chatterbox-dialog .cb-heading {
        margin: 0 0 6px !important;
        color: #1d1d1f !important;
        font-weight: 650 !important;
      }

      #laplace-chatterbox-dialog .cb-empty {
        color: #8e8e93 !important;
        background: rgba(118, 118, 128, .08);
        border-radius: 8px;
        padding: 7px;
      }

      #laplace-chatterbox-dialog .cb-result {
        border: 1px solid rgba(0, 0, 0, .06) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, .82) !important;
        padding: 7px !important;
      }

      #laplace-chatterbox-dialog .cb-switch-row {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        min-height: 24px;
      }

      #laplace-chatterbox-dialog .cb-segment {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 4px;
        padding: 3px;
        border-radius: 8px;
        background: rgba(118, 118, 128, .12);
      }

      #laplace-chatterbox-dialog .cb-segment button {
        box-shadow: none !important;
        border-color: transparent !important;
        background: transparent !important;
        min-width: 0;
      }

      #laplace-chatterbox-dialog .cb-segment button[aria-pressed="true"] {
        background: #fff !important;
        color: #1d1d1f !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12) !important;
      }

      #laplace-chatterbox-dialog .cb-status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
        background: currentColor;
      }

      #laplace-chatterbox-dialog .cb-list {
        display: grid;
        gap: 6px;
      }

      #laplace-chatterbox-dialog .cb-list-item {
        border-radius: 8px;
        background: rgba(255,255,255,.74);
        border: 1px solid rgba(0,0,0,.06);
        padding: 8px;
      }

      #laplace-chatterbox-dialog .cb-icon-button {
        width: 28px !important;
        min-width: 28px !important;
        padding: 0 !important;
      }

      #laplace-chatterbox-dialog .cb-tag {
        background: var(--cb-tag-bg, #8e8e93) !important;
        color: #fff !important;
        border: none !important;
        box-shadow: none !important;
        min-height: 20px !important;
        border-radius: 5px !important;
        padding: 0 6px !important;
      }

      #laplace-chatterbox-dialog .cb-emote[data-copied="true"] {
        background: #34c759 !important;
        color: #fff !important;
      }
    `;
      document.head.appendChild(style);
      void loop();
      return () => style.remove();
    }, []);
    y$2(() => {
      if (danmakuDirectMode.value) {
        startDanmakuDirect();
      } else {
        stopDanmakuDirect();
      }
      return () => stopDanmakuDirect();
    }, [danmakuDirectMode.value]);
    y$2(() => {
      if (autoBlendEnabled.value) {
        startAutoBlend();
      } else {
        stopAutoBlend();
      }
      return () => stopAutoBlend();
    }, [autoBlendEnabled.value]);
    y$2(() => {
      const el = document.querySelector(".app-body");
      if (!el) return;
      if (optimizeLayout.value) {
        el.style.marginLeft = "1rem";
      } else {
        el.style.marginLeft = "";
      }
    }, [optimizeLayout.value]);
    return u$2(S$1, { children: [
u$2(ToggleButton, {}),
u$2(Configurator, {}),
u$2(AlertDialog, {})
    ] });
  }
  function mount() {
    const app = document.createElement("div");
    document.body.append(app);
    R( u$2(App, {}), app);
  }
  if (document.body) {
    mount();
  } else {
    const observer2 = new MutationObserver(() => {
      if (document.body) {
        observer2.disconnect();
        mount();
      }
    });
    observer2.observe(document.documentElement, { childList: true });
  }

})(SonioxSpeechToTextWeb);