var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
try {
    eval("var std = require('tstl');");
    eval("var http = require('http');");
    eval("var websocket = require('websocket');");
    eval("var net = require('net');");
}
catch (exception) { }
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var XML = (function (_super) {
            __extends(XML, _super);
            function XML(str) {
                if (str === void 0) { str = ""; }
                var _this = _super.call(this) || this;
                _this.property_map_ = new std.HashMap();
                _this.value_ = "";
                if (str.indexOf("<") == -1)
                    return _this;
                var start;
                var end;
                if ((start = str.indexOf("<?xml")) != -1) {
                    end = str.indexOf("?>", start);
                    if (end != -1)
                        str = str.substr(end + 2);
                }
                while ((start = str.indexOf("<!--")) != -1) {
                    end = str.indexOf("-->", start);
                    if (end != -1)
                        break;
                    str = str.substr(0, start) + str.substr(end + 3);
                }
                _this._Parse(str);
                return _this;
            }
            XML.prototype._Parse = function (str) {
                this._Parse_tag(str);
                this._Parse_properties(str);
                var res = this._Parse_value(str);
                if (res.second == true)
                    this._Parse_children(res.first);
            };
            XML.prototype._Parse_tag = function (str) {
                var start = str.indexOf("<") + 1;
                var end = this._Compute_min_index(str.indexOf(" ", start), str.indexOf("\r\n", start), str.indexOf("\n", start), str.indexOf("\t", start), str.indexOf(">", start), str.indexOf("/", start));
                if (start == 0 || end == -1)
                    return;
                this.tag_ = str.substring(start, end);
            };
            XML.prototype._Parse_properties = function (str) {
                var start = str.indexOf("<" + this.tag_) + this.tag_.length + 1;
                var end = this._Compute_min_index(str.lastIndexOf("/"), str.indexOf(">", start));
                if (start == -1 || end == -1 || start >= end)
                    return;
                var line = str.substring(start, end);
                if (line.indexOf("=") == -1)
                    return;
                var label;
                var value;
                var helpers = [];
                var inQuote = false;
                var quoteType;
                var equal;
                for (var i = 0; i < line.length; i++) {
                    if (inQuote == false && (line.charAt(i) == "'" || line.charAt(i) == "\"")) {
                        inQuote = true;
                        start = i;
                        if (line.charAt(i) == "'")
                            quoteType = 1;
                        else if (line.charAt(i) == "\"")
                            quoteType = 2;
                    }
                    else if (inQuote == true &&
                        ((quoteType == 1 && line.charAt(i) == "'") ||
                            (quoteType == 2 && line.charAt(i) == "\""))) {
                        helpers.push({ type: quoteType, start: start, end: i });
                        inQuote = false;
                    }
                }
                for (var i = 0; i < helpers.length; i++) {
                    var quote = helpers[i];
                    if (i == 0) {
                        equal = line.indexOf("=");
                        label = line.substring(0, equal).trim();
                    }
                    else {
                        equal = line.indexOf("=", helpers[i - 1].end + 1);
                        label = line.substring(helpers[i - 1].end + 1, equal).trim();
                    }
                    value = line.substring(helpers[i].start + 1, helpers[i].end);
                    this.setProperty(label, this._Decode_property(value));
                }
            };
            XML.prototype._Parse_value = function (str) {
                var end_slash = str.lastIndexOf("/");
                var end_block = str.indexOf(">");
                if (end_slash < end_block || end_slash + 1 == str.lastIndexOf("<")) {
                    this.value_ = "";
                    return new std.Pair(str, false);
                }
                var start = end_block + 1;
                var end = str.lastIndexOf("<");
                str = str.substring(start, end);
                if (str.indexOf("<") == -1)
                    this.value_ = this._Decode_value(str.trim());
                else
                    this.value_ = "";
                return new std.Pair(str, true);
            };
            XML.prototype._Parse_children = function (str) {
                if (str.indexOf("<") == -1)
                    return;
                var start = str.indexOf("<");
                var end = str.lastIndexOf(">") + 1;
                str = str.substring(start, end);
                var blockStart = 0;
                var blockEnd = 0;
                start = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str.charAt(i) == "<" && str.substr(i, 2) != "</")
                        blockStart++;
                    else if (str.substr(i, 2) == "/>" || str.substr(i, 2) == "</")
                        blockEnd++;
                    if (blockStart >= 1 && blockStart == blockEnd) {
                        end = str.indexOf(">", i);
                        var xmlList = void 0;
                        var xml = new XML();
                        xml._Parse(str.substring(start, end + 1));
                        if (this.has(xml.tag_) == true)
                            xmlList = this.get(xml.tag_);
                        else {
                            xmlList = new library.XMLList();
                            this.set(xml.tag_, xmlList);
                        }
                        xmlList.push(xml);
                        i = end;
                        start = end + 1;
                        blockStart = 0;
                        blockEnd = 0;
                    }
                }
            };
            XML.prototype.getTag = function () {
                return this.tag_;
            };
            XML.prototype.getValue = function () {
                return this.value_;
            };
            XML.prototype.findProperty = function (key) {
                return this.property_map_.find(key);
            };
            XML.prototype.hasProperty = function (key) {
                return this.property_map_.has(key);
            };
            XML.prototype.getProperty = function (key) {
                return this.property_map_.get(key);
            };
            XML.prototype.getPropertyMap = function () {
                return this.property_map_;
            };
            XML.prototype.setTag = function (val) {
                this.tag_ = val;
            };
            XML.prototype.setValue = function (val) {
                this.value_ = val;
            };
            XML.prototype.setProperty = function (key, value) {
                this.property_map_.set(key, value);
            };
            XML.prototype.eraseProperty = function (key) {
                var it = this.property_map_.find(key);
                if (it.equals(this.property_map_.end()) == true)
                    throw Error("out of range");
                this.property_map_.erase(it);
            };
            XML.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                for (var i = 0; i < items.length; i++) {
                    if (items[i] instanceof XML) {
                        var xml = items[i];
                        if (this.has(xml.tag_) == true)
                            this.get(xml.tag_).push(xml);
                        else {
                            var xmlList = new library.XMLList();
                            xmlList.push(xml);
                            this.set(xml.tag_, xmlList);
                        }
                    }
                    else if (items[i] instanceof library.XMLList) {
                        var xmlList = items[i];
                        if (xmlList.empty() == true)
                            continue;
                        if (this.has(xmlList.getTag()) == true) {
                            var myXMLList = this.get(xmlList.getTag());
                            myXMLList.insert(myXMLList.end(), xmlList.begin(), xmlList.end());
                        }
                        else
                            this.set(xmlList.getTag(), xmlList);
                    }
                    else
                        _super.prototype.push.call(this, items[i]);
                }
                return this.size();
            };
            XML.prototype.insertAllProperties = function (obj) {
                for (var it = obj.property_map_.begin(); it.equals(obj.property_map_.end()) == false; it = it.next())
                    this.setProperty(it.first, it.second);
            };
            XML.prototype.clearProperties = function () {
                this.property_map_.clear();
            };
            XML.prototype._Compute_min_index = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var min = args[0];
                for (var i = 1; i < args.length; i++) {
                    if (args[i] == -1)
                        continue;
                    if (min == -1 || args[i] < min)
                        min = args[i];
                }
                return min;
            };
            XML.prototype._Decode_value = function (str) {
                var pairs = [
                    new std.Pair("&amp;", "&"),
                    new std.Pair("&lt;", "<"),
                    new std.Pair("&gt;", ">")
                ];
                return library.StringUtil.replaceAll.apply(library.StringUtil, [str].concat(pairs));
            };
            XML.prototype._Encode_value = function (str) {
                var pairs = [
                    new std.Pair("&", "&amp;"),
                    new std.Pair("<", "&lt;"),
                    new std.Pair(">", "&gt;")
                ];
                return library.StringUtil.replaceAll.apply(library.StringUtil, [str].concat(pairs));
            };
            XML.prototype._Decode_property = function (str) {
                var pairs = [
                    new std.Pair("&amp;", "&"),
                    new std.Pair("&lt;", "<"),
                    new std.Pair("&gt;", ">"),
                    new std.Pair("&quot;", "\""),
                    new std.Pair("&apos;", "'"),
                    new std.Pair("&#x9;", "\t"),
                    new std.Pair("&#xA;", "\n"),
                    new std.Pair("&#xD;", "\r"),
                ];
                return library.StringUtil.replaceAll.apply(library.StringUtil, [str].concat(pairs));
            };
            XML.prototype._Encode_property = function (str) {
                var pairs = [
                    new std.Pair("&", "&amp;"),
                    new std.Pair("<", "&lt;"),
                    new std.Pair(">", "&gt;"),
                    new std.Pair("\"", "&quot;"),
                    new std.Pair("'", "&apos;"),
                    new std.Pair("\t", "&#x9;"),
                    new std.Pair("\n", "&#xA;"),
                    new std.Pair("\r", "&#xD;"),
                ];
                return library.StringUtil.replaceAll.apply(library.StringUtil, [str].concat(pairs));
            };
            XML.prototype.toString = function (tab) {
                if (tab === void 0) { tab = 0; }
                var str = library.StringUtil.repeat("\t", tab) + "<" + this.tag_;
                var children_str = "";
                for (var p_it = this.property_map_.begin(); p_it.equals(this.property_map_.end()) == false; p_it = p_it.next())
                    str += " " + p_it.first + "=\"" + this._Encode_property(p_it.second) + "\"";
                if (this.size() == 0) {
                    if (this.value_ != "")
                        str += ">" + this._Encode_value(this.value_) + "</" + this.tag_ + ">";
                    else
                        str += " />";
                }
                else {
                    str += ">\n";
                    for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
                        str += x_it.second.toString(tab + 1);
                    str += library.StringUtil.repeat("\t", tab) + "</" + this.tag_ + ">";
                }
                return str;
            };
            return XML;
        }(std.HashMap));
        library.XML = XML;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var library;
    (function (library) {
        var XMLList = (function (_super) {
            __extends(XMLList, _super);
            function XMLList() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            XMLList.prototype.getTag = function () {
                return this.front().getTag();
            };
            XMLList.prototype.toString = function (level) {
                if (level === void 0) { level = 0; }
                var str = "";
                for (var i = 0; i < this.size(); i++)
                    str += this.at(i).toString(level) + "\n";
                return str;
            };
            return XMLList;
        }(std.Deque));
        library.XMLList = XMLList;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var ArrayCollection = (function (_super) {
            __extends(ArrayCollection, _super);
            function ArrayCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            ArrayCollection.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                var ret = _super.prototype.push.apply(this, items);
                this._Notify_insert(this.end().advance(-items.length), this.end());
                return ret;
            };
            ArrayCollection.prototype.push_back = function (val) {
                _super.prototype.push_back.call(this, val);
                this._Notify_insert(this.end().prev(), this.end());
            };
            ArrayCollection.prototype._Insert_by_range = function (position, begin, end) {
                var n = this.size();
                var ret = _super.prototype._Insert_by_range.call(this, position, begin, end);
                n = this.size() - n;
                this._Notify_insert(ret, ret.advance(n));
                return ret;
            };
            ArrayCollection.prototype._Erase_by_range = function (first, last) {
                this._Notify_erase(first, last);
                return _super.prototype._Erase_by_range.call(this, first, last);
            };
            ArrayCollection.prototype._Notify_insert = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            ArrayCollection.prototype._Notify_erase = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            ArrayCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            ArrayCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            ArrayCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            ArrayCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            ArrayCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return ArrayCollection;
        }(std.Vector));
        collections.ArrayCollection = ArrayCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var IEntity;
        (function (IEntity) {
            function construct(entity, xml) {
                var prohibited_names = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    prohibited_names[_i - 2] = arguments[_i];
                }
                var property_map = xml.getPropertyMap();
                for (var it = property_map.begin(); !it.equals(property_map.end()); it = it.next()) {
                    if (entity[it.first] == undefined)
                        continue;
                    var prohibited = false;
                    for (var i = 0; i < prohibited_names.length; i++)
                        if (prohibited_names[i] == it.first) {
                            prohibited = true;
                            break;
                        }
                    if (prohibited == true)
                        continue;
                    if (typeof entity[it.first] == "string")
                        entity[it.first] = it.second;
                    else if (typeof entity[it.first] == "number")
                        entity[it.first] = Number(it.second);
                    else if (typeof entity[it.first] == "boolean")
                        entity[it.first] = (it.second != "0" && it.second != "false");
                }
            }
            IEntity.construct = construct;
            function toXML(entity) {
                var prohibited_names = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    prohibited_names[_i - 1] = arguments[_i];
                }
                var xml = new samchon.library.XML();
                xml.setTag(entity.TAG());
                for (var key in entity)
                    if (typeof key == "string"
                        && (typeof entity[key] == "string"
                            || typeof entity[key] == "number"
                            || typeof entity[key] == "boolean")
                        && entity.hasOwnProperty(key)) {
                        if (key == "" || key.charAt(0) == "_" || key.charAt(key.length - 1) == "_")
                            continue;
                        var prohibited = false;
                        for (var i = 0; i < prohibited_names.length; i++)
                            if (prohibited_names[i] == key) {
                                prohibited = true;
                                break;
                            }
                        if (prohibited == true)
                            continue;
                        xml.setProperty(key, String(entity[key]));
                    }
                return xml;
            }
            IEntity.toXML = toXML;
        })(IEntity = protocol.IEntity || (protocol.IEntity = {}));
        var Entity = (function () {
            function Entity() {
            }
            Entity.prototype.construct = function (xml) {
                IEntity.construct(this, xml);
            };
            Entity.prototype.key = function () { return ""; };
            Entity.prototype.toXML = function () {
                return IEntity.toXML(this);
            };
            return Entity;
        }());
        protocol.Entity = Entity;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var ListCollection = (function (_super) {
            __extends(ListCollection, _super);
            function ListCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            ListCollection.prototype._Insert_by_range = function (position, begin, end) {
                var n = this.size();
                var ret = _super.prototype._Insert_by_range.call(this, position, begin, end);
                n = this.size() - n;
                this._Notify_insert(ret, ret.advance(n));
                return ret;
            };
            ListCollection.prototype._Erase_by_range = function (first, last) {
                var ret = _super.prototype._Erase_by_range.call(this, first, last);
                this._Notify_erase(first, last);
                return ret;
            };
            ListCollection.prototype._Notify_insert = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            ListCollection.prototype._Notify_erase = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            ListCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            ListCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            ListCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            ListCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            ListCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return ListCollection;
        }(std.List));
        collections.ListCollection = ListCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var DequeCollection = (function (_super) {
            __extends(DequeCollection, _super);
            function DequeCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            DequeCollection.prototype.push_front = function (val) {
                _super.prototype.push_front.call(this, val);
                this._Notify_insert(this.begin(), this.begin().next());
            };
            DequeCollection.prototype.push_back = function (val) {
                _super.prototype.push.call(this, val);
                this._Notify_insert(this.end().prev(), this.end());
            };
            DequeCollection.prototype._Insert_by_range = function (position, begin, end) {
                var n = this.size();
                var ret = _super.prototype._Insert_by_range.call(this, position, begin, end);
                n = this.size() - n;
                this._Notify_insert(ret, ret.advance(n));
                return ret;
            };
            DequeCollection.prototype.pop_front = function () {
                this._Notify_erase(this.begin(), this.begin().next());
                _super.prototype.pop_front.call(this);
            };
            DequeCollection.prototype.pop_back = function () {
                this._Notify_erase(this.end().prev(), this.end());
                _super.prototype.pop_back.call(this);
            };
            DequeCollection.prototype._Erase_by_range = function (first, last) {
                this._Notify_erase(first, last);
                return _super.prototype._Erase_by_range.call(this, first, last);
            };
            DequeCollection.prototype._Notify_insert = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            DequeCollection.prototype._Notify_erase = function (first, last) {
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            DequeCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            DequeCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            DequeCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            DequeCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            DequeCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return DequeCollection;
        }(std.Deque));
        collections.DequeCollection = DequeCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityArrayCollection = (function (_super) {
            __extends(EntityArrayCollection, _super);
            function EntityArrayCollection() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityArrayCollection.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityArrayCollection.prototype.key = function () {
                return "";
            };
            EntityArrayCollection.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityArrayCollection.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityArrayCollection.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityArrayCollection.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this);
            };
            return EntityArrayCollection;
        }(samchon.collections.ArrayCollection));
        protocol.EntityArrayCollection = EntityArrayCollection;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityListCollection = (function (_super) {
            __extends(EntityListCollection, _super);
            function EntityListCollection() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityListCollection.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityListCollection.prototype.key = function () {
                return "";
            };
            EntityListCollection.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityListCollection.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityListCollection.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityListCollection.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this);
            };
            return EntityListCollection;
        }(samchon.collections.ListCollection));
        protocol.EntityListCollection = EntityListCollection;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityDequeCollection = (function (_super) {
            __extends(EntityDequeCollection, _super);
            function EntityDequeCollection() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityDequeCollection.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityDequeCollection.prototype.key = function () {
                return "";
            };
            EntityDequeCollection.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityDequeCollection.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityDequeCollection.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityDequeCollection.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this);
            };
            return EntityDequeCollection;
        }(samchon.collections.DequeCollection));
        protocol.EntityDequeCollection = EntityDequeCollection;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalSystemArray = (function (_super) {
                __extends(ExternalSystemArray, _super);
                function ExternalSystemArray() {
                    var _this = _super.call(this) || this;
                    _this.addEventListener("erase", _this._Handle_system_erase, _this);
                    return _this;
                }
                ExternalSystemArray.prototype._Handle_system_erase = function (event) {
                    for (var it = event.first; !it.equals(event.last); it = it.next())
                        it.value.destructor();
                };
                ExternalSystemArray.prototype.hasRole = function (name) {
                    for (var i = 0; i < this.size(); i++)
                        for (var j = 0; j < this.at(i).size(); j++)
                            if (this.at(i).at(j).key() == name)
                                return true;
                    return false;
                };
                ExternalSystemArray.prototype.getRole = function (name) {
                    for (var i = 0; i < this.size(); i++)
                        for (var j = 0; j < this.at(i).size(); j++)
                            if (this.at(i).at(j).key() == name)
                                return this.at(i).at(j);
                    throw new std.OutOfRange("No role with such name.");
                };
                ExternalSystemArray.prototype.sendData = function (invoke) {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).sendData(invoke);
                };
                ExternalSystemArray.prototype.TAG = function () {
                    return "systemArray";
                };
                ExternalSystemArray.prototype.CHILD_TAG = function () {
                    return "system";
                };
                return ExternalSystemArray;
            }(samchon.protocol.EntityDequeCollection));
            external.ExternalSystemArray = ExternalSystemArray;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelSystemArray = (function (_super) {
                __extends(ParallelSystemArray, _super);
                function ParallelSystemArray() {
                    var _this = _super.call(this) || this;
                    _this.history_sequence_ = 0;
                    return _this;
                }
                ParallelSystemArray.prototype.sendSegmentData = function (invoke, size) {
                    return this.sendPieceData(invoke, 0, size);
                };
                ParallelSystemArray.prototype.sendPieceData = function (invoke, first, last) {
                    if (invoke.has("_History_uid") == false)
                        invoke.push_back(new samchon.protocol.InvokeParameter("_History_uid", ++this.history_sequence_));
                    else {
                        var uid = invoke.get("_History_uid").getValue();
                        if (uid > this.history_sequence_)
                            this.history_sequence_ = uid;
                    }
                    var segment_size = last - first;
                    var candidate_systems = new std.Vector();
                    var participants_count = 0;
                    for (var i = 0; i < this.size(); i++)
                        if (this.at(i).exclude_ == false)
                            candidate_systems.push(this.at(i));
                    for (var i = 0; i < candidate_systems.size(); i++) {
                        var system = candidate_systems.at(i);
                        var piece_size = (i == candidate_systems.size() - 1)
                            ? segment_size - first
                            : Math.floor(segment_size / candidate_systems.size() * system.getPerformance());
                        if (piece_size == 0)
                            continue;
                        system._Send_piece_data(invoke, first, first + piece_size);
                        first += piece_size;
                        participants_count++;
                    }
                    return participants_count;
                };
                ParallelSystemArray.prototype._Complete_history = function (history) {
                    if ((history instanceof parallel.PRInvokeHistory) == false)
                        return false;
                    var uid = history.getUID();
                    for (var i = 0; i < this.size(); i++)
                        if (this.at(i).progress_list_.has(uid) == true)
                            return false;
                    var system_pairs = new std.Vector();
                    var performance_index_average = 0.0;
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.history_list_.has(uid) == false)
                            continue;
                        var my_history = system.history_list_.get(uid);
                        var performance_index = my_history.computeSize() / my_history.computeElapsedTime();
                        system_pairs.push_back(std.make_pair(system, performance_index));
                        performance_index_average += performance_index;
                    }
                    performance_index_average /= system_pairs.size();
                    for (var i = 0; i < system_pairs.size(); i++) {
                        var system = system_pairs.at(i).first;
                        if (system.enforced_ == true)
                            continue;
                        var new_performance = system_pairs.at(i).second / performance_index_average;
                        var ordinary_ratio = void 0;
                        if (system.history_list_.size() < 2)
                            ordinary_ratio = .3;
                        else
                            ordinary_ratio = Math.min(0.7, 1.0 / (system.history_list_.size() - 1.0));
                        system.setPerformance((system.getPerformance() * ordinary_ratio) + (new_performance * (1 - ordinary_ratio)));
                    }
                    this._Normalize_performance();
                    return true;
                };
                ParallelSystemArray.prototype._Normalize_performance = function () {
                    var average = 0.0;
                    var denominator = 0;
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.enforced_ == true)
                            continue;
                        average += system.getPerformance();
                        denominator++;
                    }
                    average /= denominator;
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.enforced_ == true)
                            continue;
                        system.setPerformance(system.getPerformance() / average);
                    }
                };
                return ParallelSystemArray;
            }(templates.external.ExternalSystemArray));
            parallel.ParallelSystemArray = ParallelSystemArray;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedSystemArray = (function (_super) {
                __extends(DistributedSystemArray, _super);
                function DistributedSystemArray() {
                    var _this = _super.call(this) || this;
                    _this.process_map_ = new std.HashMap();
                    return _this;
                }
                DistributedSystemArray.prototype.construct = function (xml) {
                    this.process_map_.clear();
                    if (xml.has("processes") == true && xml.get("processes").front().has("process") == true) {
                        var role_xml_list = xml.get("processes").front().get("process");
                        for (var i = 0; i < role_xml_list.size(); i++) {
                            var role_xml = role_xml_list.at(i);
                            var process_1 = this.createProcess(role_xml);
                            process_1.construct(role_xml);
                            this.process_map_.insert([process_1.getName(), process_1]);
                        }
                    }
                    _super.prototype.construct.call(this, xml);
                };
                DistributedSystemArray.prototype.getProcessMap = function () {
                    return this.process_map_;
                };
                DistributedSystemArray.prototype.hasProcess = function (name) {
                    return this.process_map_.has(name);
                };
                DistributedSystemArray.prototype.getProcess = function (name) {
                    return this.process_map_.get(name);
                };
                DistributedSystemArray.prototype.insertProcess = function (process) {
                    return this.process_map_.insert([process.getName(), process]).second;
                };
                DistributedSystemArray.prototype.eraseProcess = function (name) {
                    var prev_size = this.process_map_.size();
                    return (this.process_map_.erase(name) != prev_size);
                };
                DistributedSystemArray.prototype._Complete_history = function (history) {
                    if (history instanceof distributed.DSInvokeHistory) {
                        if (history.getProcess() == null)
                            return false;
                        this.estimate_system_performance(history);
                        this.estimate_process_resource(history);
                        this._Normalize_performance();
                        return true;
                    }
                    else {
                        return _super.prototype._Complete_history.call(this, history);
                    }
                };
                DistributedSystemArray.prototype.estimate_process_resource = function (history) {
                    var process = history.getProcess();
                    if (process.enforced_ == true)
                        return;
                    var average_elapsed_time_of_others = 0;
                    var denominator = 0;
                    for (var it = this.process_map_.begin(); !it.equals(this.process_map_.end()); it = it.next()) {
                        var my_process = it.second;
                        if (my_process == history.getProcess() || my_process.history_list_.empty() == true)
                            continue;
                        average_elapsed_time_of_others += my_process._Compute_average_elapsed_time() * my_process.getResource();
                        denominator++;
                    }
                    if (denominator != 0) {
                        average_elapsed_time_of_others /= denominator;
                        var elapsed_time = history.computeElapsedTime() / history.getWeight();
                        var new_resource = elapsed_time / average_elapsed_time_of_others;
                        var ordinary_ratio = void 0;
                        if (process.history_list_.size() < 2)
                            ordinary_ratio = .15;
                        else
                            ordinary_ratio = Math.min(.85, 1.0 / (process.history_list_.size() - 1.0));
                        process.setResource((process.getResource() * ordinary_ratio)
                            + (new_resource * (1 - ordinary_ratio)));
                    }
                };
                DistributedSystemArray.prototype.estimate_system_performance = function (history) {
                    var system = history.getSystem();
                    if (system.enforced_ == true)
                        return;
                    var average_elapsed_time_of_others = 0;
                    var denominator = 0;
                    for (var i = 0; i < this.size(); i++) {
                        var system_1 = this.at(i);
                        var avg = system_1._Compute_average_elapsed_time();
                        if (avg == -1)
                            continue;
                        average_elapsed_time_of_others += avg;
                        denominator++;
                    }
                    if (denominator != 0) {
                        average_elapsed_time_of_others /= denominator;
                        var elapsed_time = history.computeElapsedTime() / history.getWeight();
                        var new_performance = average_elapsed_time_of_others / elapsed_time;
                        var ordinary_ratio = void 0;
                        if (system.history_list_.size() < 2)
                            ordinary_ratio = .3;
                        else
                            ordinary_ratio = Math.min(0.7, 1.0 / (system.history_list_.size() - 1.0));
                        system.setPerformance((system.getPerformance() * ordinary_ratio)
                            + (new_performance * (1 - ordinary_ratio)));
                    }
                };
                DistributedSystemArray.prototype._Normalize_performance = function () {
                    _super.prototype._Normalize_performance.call(this);
                    var average = 0.0;
                    var denominator = 0;
                    for (var it = this.process_map_.begin(); !it.equals(this.process_map_.end()); it = it.next()) {
                        var process_2 = it.second;
                        if (process_2.enforced_ == true)
                            continue;
                        average += process_2.getResource();
                        denominator++;
                    }
                    average /= denominator;
                    for (var it = this.process_map_.begin(); !it.equals(this.process_map_.end()); it = it.next()) {
                        var process_3 = it.second;
                        if (process_3.enforced_ == true)
                            continue;
                        process_3.setResource(process_3.getResource() / average);
                    }
                };
                DistributedSystemArray.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    if (this.process_map_.empty() == true)
                        return xml;
                    var processes_xml = new samchon.library.XML();
                    {
                        processes_xml.setTag("processes");
                        for (var it = this.process_map_.begin(); !it.equals(this.process_map_.end()); it = it.next())
                            processes_xml.push(it.second.toXML());
                    }
                    xml.push(processes_xml);
                    return xml;
                };
                return DistributedSystemArray;
            }(templates.parallel.ParallelSystemArray));
            distributed.DistributedSystemArray = DistributedSystemArray;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedSystemArrayMediator = (function (_super) {
                __extends(DistributedSystemArrayMediator, _super);
                function DistributedSystemArrayMediator() {
                    var _this = _super.call(this) || this;
                    _this.mediator_ = null;
                    return _this;
                }
                DistributedSystemArrayMediator.prototype.startMediator = function () {
                    if (this.mediator_ != null)
                        return;
                    this.mediator_ = this.createMediator();
                    this.mediator_.start();
                };
                DistributedSystemArrayMediator.prototype.getMediator = function () {
                    return this.mediator_;
                };
                DistributedSystemArrayMediator.prototype._Complete_history = function (history) {
                    var ret = _super.prototype._Complete_history.call(this, history);
                    if (ret == true)
                        this.mediator_._Complete_history(history.getUID());
                    return ret;
                };
                return DistributedSystemArrayMediator;
            }(distributed.DistributedSystemArray));
            distributed.DistributedSystemArrayMediator = DistributedSystemArrayMediator;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
try {
    module.exports = samchon;
}
catch (exception) { }
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var BasicEvent = (function () {
            function BasicEvent(type, bubbles, cancelable) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                this.type_ = type.toLowerCase();
                this.target_ = null;
                this.currentTarget_ = null;
                this.trusted_ = false;
                this.bubbles_ = bubbles;
                this.cancelable_ = cancelable;
                this.defaultPrevented_ = false;
                this.cancelBubble_ = false;
                this.timeStamp_ = new Date();
            }
            BasicEvent.prototype.initEvent = function (type, bubbles, cancelable) {
                this.type_ = type.toLowerCase();
                this.bubbles_ = bubbles;
                this.cancelable_ = cancelable;
            };
            BasicEvent.prototype.stopImmediatePropagation = function () {
            };
            BasicEvent.prototype.stopPropagation = function () {
            };
            Object.defineProperty(BasicEvent.prototype, "type", {
                get: function () {
                    return this.type_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "target", {
                get: function () {
                    return this.target_;
                },
                set: function (obj) {
                    this.target_ = obj;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "currentTarget", {
                get: function () {
                    return this.currentTarget_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "bubbles", {
                get: function () {
                    return this.bubbles_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "cancelable", {
                get: function () {
                    return this.cancelable_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "eventPhase", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "defaultPrevented", {
                get: function () {
                    return this.defaultPrevented_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "srcElement", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "cancelBubble", {
                get: function () {
                    return this.cancelBubble_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "timeStamp", {
                get: function () {
                    return this.timeStamp_.getTime();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BasicEvent.prototype, "returnValue", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            return BasicEvent;
        }());
        library.BasicEvent = BasicEvent;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
;
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var CollectionEvent = (function (_super) {
            __extends(CollectionEvent, _super);
            function CollectionEvent(type, first, last) {
                var _this = _super.call(this, type, false, (type == "insert" || type == "erase")) || this;
                if (type == "erase" && (first instanceof std.VectorIterator || first instanceof std.DequeIterator)) {
                    _this.temporary_container_ = new std.Vector(first, last);
                    _this.origin_first_ = first;
                    _this.first_ = _this.temporary_container_.begin();
                    _this.last_ = _this.temporary_container_.end();
                }
                else {
                    _this.temporary_container_ = null;
                    _this.origin_first_ = null;
                    _this.first_ = first;
                    _this.last_ = last;
                }
                return _this;
            }
            Object.defineProperty(CollectionEvent.prototype, "target", {
                get: function () {
                    return this.target_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionEvent.prototype, "first", {
                get: function () {
                    return this.first_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionEvent.prototype, "last", {
                get: function () {
                    return this.last_;
                },
                enumerable: true,
                configurable: true
            });
            CollectionEvent.prototype.preventDefault = function () {
                if (this.cancelable == false)
                    return;
                this.defaultPrevented_ = true;
                if (this.type == "insert") {
                    this.target.erase(this.first_, this.last_);
                }
                else if (this.type == "erase") {
                    var container = this.target;
                    var it = void 0;
                    if (this.temporary_container_ == null)
                        it = this.first_.prev().next();
                    else
                        it = this.origin_first_.prev().next();
                    container.insert(it, this.first_, this.last_);
                }
                this.defaultPrevented_ = false;
            };
            return CollectionEvent;
        }(samchon.library.BasicEvent));
        collections.CollectionEvent = CollectionEvent;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var collections;
    (function (collections) {
        var CollectionEvent;
        (function (CollectionEvent) {
            CollectionEvent.INSERT = "insert";
            CollectionEvent.ERASE = "erase";
            CollectionEvent.REFRESH = "refresh";
        })(CollectionEvent = collections.CollectionEvent || (collections.CollectionEvent = {}));
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var HashMapCollection = (function (_super) {
            __extends(HashMapCollection, _super);
            function HashMapCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            HashMapCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "insert", first, last);
            };
            HashMapCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "erase", first, last);
            };
            HashMapCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            HashMapCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            HashMapCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_MapCollectionEvent(this, "refresh", first, last);
            };
            HashMapCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            HashMapCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return HashMapCollection;
        }(std.HashMap));
        collections.HashMapCollection = HashMapCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var HashMultiMapCollection = (function (_super) {
            __extends(HashMultiMapCollection, _super);
            function HashMultiMapCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            HashMultiMapCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "insert", first, last);
            };
            HashMultiMapCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "erase", first, last);
            };
            HashMultiMapCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            HashMultiMapCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            HashMultiMapCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_MapCollectionEvent(this, "refresh", first, last);
            };
            HashMultiMapCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            HashMultiMapCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return HashMultiMapCollection;
        }(std.HashMultiMap));
        collections.HashMultiMapCollection = HashMultiMapCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var HashMultiSetCollection = (function (_super) {
            __extends(HashMultiSetCollection, _super);
            function HashMultiSetCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            HashMultiSetCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            HashMultiSetCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            HashMultiSetCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            HashMultiSetCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            HashMultiSetCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            HashMultiSetCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            HashMultiSetCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return HashMultiSetCollection;
        }(std.HashMultiSet));
        collections.HashMultiSetCollection = HashMultiSetCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var HashSetCollection = (function (_super) {
            __extends(HashSetCollection, _super);
            function HashSetCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            HashSetCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            HashSetCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            HashSetCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            HashSetCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            HashSetCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            HashSetCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            HashSetCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return HashSetCollection;
        }(std.HashSet));
        collections.HashSetCollection = HashSetCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var ICollection;
        (function (ICollection) {
            function _Dispatch_CollectionEvent(collection, type, first, last) {
                if (collection.hasEventListener(type) == false)
                    return;
                var event = new collections.CollectionEvent(type, first, last);
                setTimeout(function () {
                    collection.dispatchEvent(event);
                });
            }
            ICollection._Dispatch_CollectionEvent = _Dispatch_CollectionEvent;
            function _Dispatch_MapCollectionEvent(collection, type, first, last) {
                if (collection.hasEventListener(type) == false)
                    return;
                var event = new collections.MapCollectionEvent(type, first, last);
                setTimeout(function () {
                    collection.dispatchEvent(event);
                });
            }
            ICollection._Dispatch_MapCollectionEvent = _Dispatch_MapCollectionEvent;
        })(ICollection = collections.ICollection || (collections.ICollection = {}));
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var MapCollectionEvent = (function (_super) {
            __extends(MapCollectionEvent, _super);
            function MapCollectionEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(MapCollectionEvent.prototype, "first", {
                get: function () {
                    return this.first_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapCollectionEvent.prototype, "last", {
                get: function () {
                    return this.last_;
                },
                enumerable: true,
                configurable: true
            });
            return MapCollectionEvent;
        }(collections.CollectionEvent));
        collections.MapCollectionEvent = MapCollectionEvent;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var TreeMapCollection = (function (_super) {
            __extends(TreeMapCollection, _super);
            function TreeMapCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            TreeMapCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "insert", first, last);
            };
            TreeMapCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "erase", first, last);
            };
            TreeMapCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            TreeMapCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            TreeMapCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_MapCollectionEvent(this, "refresh", first, last);
            };
            TreeMapCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            TreeMapCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return TreeMapCollection;
        }(std.TreeMap));
        collections.TreeMapCollection = TreeMapCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var TreeMultiMapCollection = (function (_super) {
            __extends(TreeMultiMapCollection, _super);
            function TreeMultiMapCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            TreeMultiMapCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "insert", first, last);
            };
            TreeMultiMapCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_MapCollectionEvent(this, "erase", first, last);
            };
            TreeMultiMapCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            TreeMultiMapCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            TreeMultiMapCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_MapCollectionEvent(this, "refresh", first, last);
            };
            TreeMultiMapCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            TreeMultiMapCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return TreeMultiMapCollection;
        }(std.TreeMultiMap));
        collections.TreeMultiMapCollection = TreeMultiMapCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var TreeMultiSetCollection = (function (_super) {
            __extends(TreeMultiSetCollection, _super);
            function TreeMultiSetCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            TreeMultiSetCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            TreeMultiSetCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            TreeMultiSetCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            TreeMultiSetCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            TreeMultiSetCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            TreeMultiSetCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            TreeMultiSetCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return TreeMultiSetCollection;
        }(std.TreeMultiSet));
        collections.TreeMultiSetCollection = TreeMultiSetCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var collections;
    (function (collections) {
        var TreeSetCollection = (function (_super) {
            __extends(TreeSetCollection, _super);
            function TreeSetCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.event_dispatcher_ = new samchon.library.EventDispatcher(_this);
                return _this;
            }
            TreeSetCollection.prototype._Handle_insert = function (first, last) {
                _super.prototype._Handle_insert.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "insert", first, last);
            };
            TreeSetCollection.prototype._Handle_erase = function (first, last) {
                _super.prototype._Handle_erase.call(this, first, last);
                collections.ICollection._Dispatch_CollectionEvent(this, "erase", first, last);
            };
            TreeSetCollection.prototype.hasEventListener = function (type) {
                return this.event_dispatcher_.hasEventListener(type);
            };
            TreeSetCollection.prototype.dispatchEvent = function (event) {
                return this.event_dispatcher_.dispatchEvent(event);
            };
            TreeSetCollection.prototype.refresh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var first;
                var last;
                if (args.length == 0) {
                    first = this.begin();
                    last = this.end();
                }
                else if (args.length == 1) {
                    first = args[0];
                    last = first.next();
                }
                else {
                    first = args[0];
                    last = args[1];
                }
                collections.ICollection._Dispatch_CollectionEvent(this, "refresh", first, last);
            };
            TreeSetCollection.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.addEventListener(type, listener, thisArg);
            };
            TreeSetCollection.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                this.event_dispatcher_.removeEventListener(type, listener, thisArg);
            };
            return TreeSetCollection;
        }(std.TreeSet));
        collections.TreeSetCollection = TreeSetCollection;
    })(collections = samchon.collections || (samchon.collections = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var CartesianProduct = (function () {
            function CartesianProduct() {
                var digits = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    digits[_i] = arguments[_i];
                }
                this.digits_ = digits;
                this.dividers_ = new Array(digits.length);
                this.size_ = 1;
                for (var i = digits.length - 1; i >= 0; i--) {
                    this.dividers_[i] = this.size_;
                    this.size_ *= digits[i];
                }
            }
            CartesianProduct.prototype.size = function () {
                return this.size_;
            };
            CartesianProduct.prototype.digits = function () {
                return this.digits_;
            };
            CartesianProduct.prototype.at = function (index) {
                var row = [];
                for (var i = 0; i < this.digits_.length; i++) {
                    var val = Math.floor(index / this.dividers_[i]);
                    val = val % this.digits_[i];
                    row.push(val);
                }
                return row;
            };
            return CartesianProduct;
        }());
        library.CartesianProduct = CartesianProduct;
        var RepeatedPermutation = (function () {
            function RepeatedPermutation(n, r) {
                this.n_ = n;
                this.r_ = r;
                this.size_ = Math.pow(n, r);
                this.divider_array = new Array();
                for (var i = 0; i < r; i++) {
                    var x = r - (i + 1);
                    var val = Math.pow(n, x);
                    this.divider_array.push(val);
                }
            }
            RepeatedPermutation.prototype.size = function () {
                return this.size_;
            };
            RepeatedPermutation.prototype.n = function () {
                return this.n_;
            };
            RepeatedPermutation.prototype.r = function () {
                return this.r_;
            };
            RepeatedPermutation.prototype.at = function (index) {
                var row = [];
                for (var i = 0; i < this.r_; i++) {
                    var val = Math.floor(index / this.divider_array[i]) % this.n_;
                    row.push(val);
                }
                return row;
            };
            return RepeatedPermutation;
        }());
        library.RepeatedPermutation = RepeatedPermutation;
        var Permutation = (function () {
            function Permutation(n, r) {
                this.n_ = n;
                this.r_ = r;
                this.size_ = n;
                for (var i = n - 1; i > n - r; i--)
                    this.size_ *= i;
            }
            Permutation.prototype.size = function () {
                return this.size_;
            };
            Permutation.prototype.n = function () {
                return this.n_;
            };
            Permutation.prototype.r = function () {
                return this.r_;
            };
            Permutation.prototype.at = function (index) {
                var atoms = [];
                for (var i = 0; i < this.n_; i++)
                    atoms.push(i);
                var row = [];
                for (var i = 0; i < this.r_; i++) {
                    var item = index % atoms.length;
                    index = Math.floor(index / atoms.length);
                    row.push(atoms[item]);
                    atoms.splice(item, 1);
                }
                return row;
            };
            return Permutation;
        }());
        library.Permutation = Permutation;
        var Factorial = (function (_super) {
            __extends(Factorial, _super);
            function Factorial(n) {
                return _super.call(this, n, n) || this;
            }
            return Factorial;
        }(Permutation));
        library.Factorial = Factorial;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var EventDispatcher = (function () {
            function EventDispatcher(dispatcher) {
                if (dispatcher === void 0) { dispatcher = null; }
                if (dispatcher == null)
                    this.event_dispatcher_ = this;
                else
                    this.event_dispatcher_ = dispatcher;
                this.event_listeners_ = new std.HashMap();
            }
            EventDispatcher.prototype.hasEventListener = function (type) {
                type = type.toLowerCase();
                return this.event_listeners_.has(type);
            };
            EventDispatcher.prototype.dispatchEvent = function (event) {
                event.target = this.event_dispatcher_;
                if (this.event_listeners_.has(event.type) == false)
                    return false;
                var listenerSet = this.event_listeners_.get(event.type);
                for (var it = listenerSet.begin(); it.equals(listenerSet.end()) == false; it = it.next()) {
                    if (event.defaultPrevented == true)
                        continue;
                    it.value.first.apply(it.value.second, [event]);
                }
                return true;
            };
            EventDispatcher.prototype.addEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                type = type.toLowerCase();
                var listenerSet;
                if (this.event_listeners_.has(type) == false) {
                    listenerSet = new std.HashSet();
                    this.event_listeners_.set(type, listenerSet);
                }
                else
                    listenerSet = this.event_listeners_.get(type);
                listenerSet.insert(new std.Pair(listener, thisArg));
            };
            EventDispatcher.prototype.removeEventListener = function (type, listener, thisArg) {
                if (thisArg === void 0) { thisArg = null; }
                type = type.toLowerCase();
                if (this.event_listeners_.has(type) == false)
                    return;
                var listenerSet = this.event_listeners_.get(type);
                var bind = new std.Pair(listener, thisArg);
                if (listenerSet.has(bind) == false)
                    return;
                listenerSet.erase(bind);
                if (listenerSet.empty() == true)
                    this.event_listeners_.erase(type);
            };
            return EventDispatcher;
        }());
        library.EventDispatcher = EventDispatcher;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var FileReference = (function (_super) {
            __extends(FileReference, _super);
            function FileReference() {
                var _this = _super.call(this) || this;
                _this.file_ = null;
                _this.data_ = null;
                return _this;
            }
            Object.defineProperty(FileReference.prototype, "data", {
                get: function () {
                    return this.data_;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "name", {
                get: function () {
                    var index = this.file_.name.lastIndexOf(".");
                    if (index == -1)
                        return this.file_.name;
                    else
                        return this.file_.name.substr(0, index);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "extension", {
                get: function () {
                    var index = this.file_.name.lastIndexOf(".");
                    if (index == -1)
                        return null;
                    else
                        return this.file_.name.substr(index + 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "type", {
                get: function () {
                    return this.file_.type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "size", {
                get: function () {
                    return this.file_.size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileReference.prototype, "modificationDate", {
                get: function () {
                    return this.file_.lastModifiedDate;
                },
                enumerable: true,
                configurable: true
            });
            FileReference.prototype.browse = function () {
                var typeFilter = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    typeFilter[_i] = arguments[_i];
                }
                var this_ = this;
                var input = document.createElement("input");
                input.type = "file";
                if (typeFilter.length > 0)
                    input.accept = typeFilter.toString();
                input.onchange = function (event) {
                    this_.file_ = input.files[0];
                    this_.dispatchEvent(new library.BasicEvent("select"));
                };
                input.onclick = function (event) {
                    document.body.removeChild(event.target);
                };
                input.style.display = "none";
                document.body.appendChild(input);
                input.click();
            };
            FileReference.prototype.load = function () {
                var this_ = this;
                var reader = new FileReader();
                reader.onload = function (event) {
                    this_.data_ = reader.result;
                    this_.dispatchEvent(new library.BasicEvent("complete"));
                };
                reader.readAsText(this.file_);
            };
            FileReference.prototype.save = function (data, fileName) {
                FileReference.save(data, fileName);
            };
            FileReference.save = function (data, fileName) {
                var blob = new Blob([data], { type: "text/plain" });
                if (window.navigator.msSaveBlob != undefined) {
                    window.navigator.msSaveBlob(blob, fileName);
                }
                else {
                    var anchor = document.createElement("a");
                    anchor.download = fileName;
                    anchor.innerHTML = "";
                    anchor.href = window.URL.createObjectURL(blob);
                    anchor.onclick = function (event) {
                        document.body.removeChild(event.target);
                    };
                    anchor.style.display = "none";
                    document.body.appendChild(anchor);
                    anchor.click();
                }
            };
            return FileReference;
        }(library.EventDispatcher));
        library.FileReference = FileReference;
        var FileReferenceList = (function (_super) {
            __extends(FileReferenceList, _super);
            function FileReferenceList() {
                var _this = _super.call(this) || this;
                _this.file_list = new std.Vector();
                return _this;
            }
            Object.defineProperty(FileReferenceList.prototype, "fileList", {
                get: function () {
                    return this.file_list;
                },
                enumerable: true,
                configurable: true
            });
            FileReferenceList.prototype.browse = function () {
                var typeFilter = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    typeFilter[_i] = arguments[_i];
                }
                var this_ = this;
                var input = document.createElement("input");
                input.type = "file";
                if (typeFilter.length > 0)
                    input.accept = typeFilter.toString();
                input.onchange = function (event) {
                    var fileList = input.files;
                    this_.file_list.clear();
                    for (var i = 0; i < fileList.length; i++) {
                        var reference = new FileReference();
                        reference.file_ = fileList[i];
                        this_.file_list.push(reference);
                    }
                    this_.dispatchEvent(new library.BasicEvent("select"));
                };
                input.onclick = function (event) {
                    document.body.removeChild(event.target);
                };
                input.style.display = "none";
                document.body.appendChild(input);
                input.click();
            };
            return FileReferenceList;
        }(library.EventDispatcher));
        library.FileReferenceList = FileReferenceList;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var GeneticAlgorithm = (function () {
            function GeneticAlgorithm(unique, mutation_rate, tournament) {
                if (unique === void 0) { unique = true; }
                if (mutation_rate === void 0) { mutation_rate = .015; }
                if (tournament === void 0) { tournament = 10; }
                this.unique_ = unique;
                this.mutation_rate_ = mutation_rate;
                this.tournament_ = tournament;
            }
            GeneticAlgorithm.prototype.evolveGeneArray = function (individual, population, generation, compare) {
                if (compare === void 0) { compare = std.greater; }
                var ga_population = new GAPopulation(individual, population);
                for (var i = 0; i < generation; i++)
                    ga_population = this.evolvePopulation(ga_population);
                return ga_population.fitTest();
            };
            GeneticAlgorithm.prototype.evolvePopulation = function (population, compare) {
                if (compare === void 0) { compare = std.greater; }
                var size = population.children().size();
                var evolved = new GAPopulation(size);
                evolved.children().set(0, population.fitTest());
                for (var i = 1; i < size; i++) {
                    var gene1 = this.selection(population);
                    var gene2 = this.selection(population);
                    var child = this.crossover(gene1, gene2);
                    this.mutate(child);
                    evolved.children().set(i, child);
                }
                return evolved;
            };
            GeneticAlgorithm.prototype.selection = function (population) {
                var size = population.children().size();
                var tournament = new GAPopulation(size);
                for (var i = 0; i < size; i++) {
                    var random_index = Math.floor(Math.random() * size);
                    if (random_index == size)
                        random_index--;
                    tournament.children().set(i, population.children().at(random_index));
                }
                return tournament.fitTest();
            };
            GeneticAlgorithm.prototype.crossover = function (parent1, parent2) {
                var individual = parent1.constructor(parent1);
                var size = parent1.size();
                if (this.unique_ == false) {
                    for (var i = 0; i < size; i++)
                        if (Math.random() > .5)
                            individual.set(i, parent1.at(i));
                }
                else {
                    var ptr_set = new std.HashSet();
                    var index_set = new std.HashSet();
                    var first = Math.random() * size;
                    var last = Math.random() * size;
                    if (first > last)
                        _a = [last, first], first = _a[0], last = _a[1];
                    for (var i = 0; i < size; i++)
                        if (first <= i && i < last)
                            ptr_set.insert(parent1.at(i));
                        else
                            index_set.insert(i);
                    for (var i = 0; i < size; i++) {
                        var ptr = parent2.at(i);
                        if (ptr_set.find(ptr).equals(ptr_set.end()) == false)
                            continue;
                        individual.set(index_set.begin().value, ptr);
                        index_set.erase(index_set.begin());
                    }
                }
                return individual;
                var _a;
            };
            GeneticAlgorithm.prototype.mutate = function (individual) {
                for (var it = individual.begin(); !it.equals(individual.end()); it = it.next()) {
                    if (Math.random() > this.mutation_rate_)
                        continue;
                    var j = Math.floor(Math.random() * individual.size());
                    it.swap(individual.begin().advance(j));
                }
            };
            return GeneticAlgorithm;
        }());
        library.GeneticAlgorithm = GeneticAlgorithm;
        var GAPopulation = (function () {
            function GAPopulation() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (args.length == 1) {
                    this.children_ = new std.Vector();
                }
                else {
                    var geneArray = args[0];
                    var size = args[1];
                    var compare = (args.length == 2) ? std.greater : args[2];
                    this.children_ = new std.Vector();
                    this.compare_ = compare;
                    for (var i = 0; i < size; i++) {
                        var child = this.clone(geneArray);
                        if (i > 0)
                            std.random_shuffle(child.begin(), child.end());
                        this.children_.push_back(child);
                    }
                }
            }
            GAPopulation.prototype.children = function () {
                return this.children_;
            };
            GAPopulation.prototype.fitTest = function () {
                var best = this.children_.front();
                for (var i = 1; i < this.children_.size(); i++)
                    if (this.compare_(this.children_.at(i), best) == true)
                        best = this.children_.at(i);
                return best;
            };
            GAPopulation.prototype.clone = function (obj) {
                var ret = eval("new obj.constructor()");
                for (var key in obj)
                    if (obj.hasOwnProperty(key) == true)
                        ret[key] = obj[key];
                return ret;
            };
            return GAPopulation;
        }());
        library.GAPopulation = GAPopulation;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var StringUtil = (function () {
            function StringUtil() {
            }
            StringUtil.between = function (str, start, end) {
                if (start === void 0) { start = ""; }
                if (end === void 0) { end = ""; }
                if (start == "" && end == "")
                    return str;
                else if (start == "")
                    return str.substr(0, str.indexOf(end));
                else if (end == "")
                    return str.substr(str.indexOf(start) + start.length);
                else {
                    var startIndex = str.indexOf(start);
                    if (startIndex == -1)
                        return "";
                    return str.substring(startIndex + start.length, str.indexOf(end, startIndex + start.length));
                }
            };
            StringUtil.betweens = function (str, start, end) {
                if (start === void 0) { start = ""; }
                if (end === void 0) { end = ""; }
                var substrings = [];
                if (start == "" && end == "") {
                    return [str];
                }
                else if (start == end) {
                    var prevIndex = -1;
                    var endIndex = void 0;
                    var n = 0;
                    while ((endIndex = str.indexOf(start, prevIndex + 1)) != -1) {
                        if (++n % 2 == 0) {
                            substrings.push(str.substring(prevIndex, endIndex));
                        }
                        endIndex = prevIndex;
                    }
                }
                else {
                    substrings = str.split(start).splice(1);
                    if (end != "")
                        for (var i = substrings.length - 1; i >= 0; i--)
                            if (substrings[i].indexOf(end) == -1)
                                substrings.splice(i, 1);
                            else
                                substrings[i] = StringUtil.between(substrings[i], "", end);
                }
                return substrings;
            };
            StringUtil.trim = function (str) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length == 0)
                    args = StringUtil.SPACE_ARRAY;
                return StringUtil.ltrim.apply(StringUtil, [StringUtil.rtrim.apply(StringUtil, [str].concat(args))].concat(args));
            };
            StringUtil.ltrim = function (str) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length == 0)
                    args = StringUtil.SPACE_ARRAY;
                var index = 0;
                while (index < str.length) {
                    var maxIndex = index;
                    for (var i = 0; i < args.length; i++) {
                        var myIndex = str.indexOf(args[i], maxIndex)
                            + args[i].length;
                        maxIndex = Math.max(maxIndex, myIndex);
                    }
                    if (maxIndex <= index)
                        break;
                    else
                        index = maxIndex;
                }
                if (index == str.length)
                    return "";
                else
                    return str.substr(index);
            };
            StringUtil.rtrim = function (str) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length == 0)
                    args = StringUtil.SPACE_ARRAY;
                var index = str.length;
                while (index != 0) {
                    var minIndex = index;
                    for (var i = 0; i < args.length; i++) {
                        var myIndex = str.lastIndexOf(args[i], minIndex - 1);
                        if (myIndex == -1)
                            continue;
                        minIndex = Math.min(minIndex, myIndex);
                    }
                    if (minIndex == -1 || minIndex >= index)
                        break;
                    else
                        index = minIndex;
                }
                return str.substr(0, index);
            };
            StringUtil.substitute = function (format) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                while (true) {
                    if (args.length == 0)
                        break;
                    var min_index = StringUtil._Fetch_substitute_index(format);
                    if (min_index == Number.MAX_VALUE)
                        break;
                    format = StringUtil.replaceAll(format, "{" + min_index + "}", String(args[0]));
                    args.shift();
                }
                return format;
            };
            StringUtil.substituteSQL = function (format) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                while (true) {
                    if (args.length == 0)
                        break;
                    var min_index = StringUtil._Fetch_substitute_index(format);
                    if (min_index == Number.MAX_VALUE)
                        break;
                    var symbol = "{" + min_index + "}";
                    if (args[0] == null)
                        format = StringUtil.replaceAll(format, symbol, "NULL");
                    else if (typeof args[0] == "number")
                        format = StringUtil.replaceAll(format, symbol, String(args[0]));
                    else if (typeof args[0] == "string")
                        format = StringUtil.replaceAll(format, symbol, "'" + args[0] + "'");
                    else {
                        if (args[0].toXML != undefined) {
                            var xml = args[0].toXML();
                            if (xml instanceof library.XML)
                                args[0] = xml;
                        }
                        format = StringUtil.replaceAll(format, symbol, "'" + args[0].toString() + "'");
                    }
                    args.shift();
                }
                return format;
            };
            StringUtil._Fetch_substitute_index = function (format) {
                var parenthesis_array = StringUtil.betweens(format, "{", "}");
                var min_index = Number.MAX_VALUE;
                for (var i = 0; i < parenthesis_array.length; i++) {
                    var index = Number(parenthesis_array[i]);
                    if (isNaN(index) == true)
                        continue;
                    min_index = Math.min(min_index, index);
                }
                return min_index;
            };
            StringUtil.replaceAll = function (str) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length == 2 && typeof args[0] == "string") {
                    var before = args[0];
                    var after = args[1];
                    return str.split(before).join(after);
                }
                else {
                    if (args.length == 0)
                        return str;
                    for (var i = 0; i < args.length; i++) {
                        var pair = args[i];
                        str = str.split(pair.first).join(pair.second);
                    }
                    return str;
                }
            };
            StringUtil.removeHTMLSpaces = function (str) {
                return StringUtil.replaceAll(str, new std.Pair("&nbsp;", " "), new std.Pair("\t", " "), new std.Pair("  ", " "));
            };
            StringUtil.repeat = function (str, n) {
                var ret = "";
                for (var i = 0; i < n; i++)
                    ret += str;
                return ret;
            };
            StringUtil.numberFormat = function (val, precision) {
                if (precision === void 0) { precision = 2; }
                var str = "";
                val = Math.round(val * Math.pow(10, precision));
                val = val / Math.pow(10, precision);
                var is_negative = (val < 0);
                var natural = Math.floor(Math.abs(val));
                var fraction = Math.abs(val) - Math.floor(Math.abs(val));
                if (natural == 0)
                    str = "0";
                else {
                    var cipher_count = Math.floor(Math.log(natural) / Math.log(10)) + 1;
                    for (var i = 0; i <= cipher_count; i++) {
                        var cipher = Math.floor(natural % Math.pow(10, i + 1));
                        cipher = Math.floor(cipher / Math.pow(10, i));
                        if (i == cipher_count && cipher == 0)
                            continue;
                        if (i > 0 && i % 3 == 0)
                            str = "," + str;
                        str = cipher + str;
                    }
                }
                if (is_negative == true)
                    str = "-" + str;
                if (precision > 0 && fraction != 0) {
                    fraction = Math.round(fraction * Math.pow(10, precision));
                    var zeros = precision - Math.floor(Math.log(fraction) / Math.log(10)) - 1;
                    str += "." + StringUtil.repeat("0", zeros) + fraction;
                }
                return str;
            };
            StringUtil.percentFormat = function (val, precision) {
                if (precision === void 0) { precision = 2; }
                return StringUtil.numberFormat(val * 100, precision) + " %";
            };
            return StringUtil;
        }());
        StringUtil.SPACE_ARRAY = [" ", "\t", "\r", "\n"];
        library.StringUtil = StringUtil;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var library;
    (function (library) {
        var URLVariables = (function (_super) {
            __extends(URLVariables, _super);
            function URLVariables(str) {
                if (str === void 0) { str = ""; }
                var _this = _super.call(this) || this;
                if (str != "")
                    _this.decode(str);
                return _this;
            }
            URLVariables.prototype.decode = function (str) {
                this.clear();
                if (str.trim() == "")
                    return;
                if (str.indexOf("?") != -1)
                    str = str.substr(str.indexOf("?") + 1);
                var var_pairs = str.split("&");
                for (var i = 0; i < var_pairs.length; i++) {
                    var equal_index = var_pairs[i].indexOf("=");
                    var key = void 0;
                    var value = void 0;
                    if (equal_index == -1) {
                        key = var_pairs[i];
                        value = "";
                    }
                    else {
                        key = var_pairs[i].substr(0, equal_index);
                        value = decodeURIComponent(var_pairs[i].substr(equal_index + 1));
                    }
                    this.insert([key, value]);
                }
            };
            URLVariables.prototype.toString = function () {
                var str = "";
                for (var it = this.begin(); !it.equals(this.end()); it = it.next()) {
                    if (!it.equals(this.begin()))
                        str += "&";
                    str += it.first + "=" + encodeURIComponent(it.second);
                }
                return str;
            };
            return URLVariables;
        }(std.HashMap));
        library.URLVariables = URLVariables;
    })(library = samchon.library || (samchon.library = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var _CommunicatorBase = (function () {
            function _CommunicatorBase(listener) {
                if (listener === void 0) { listener = null; }
                this.listener_ = listener;
                this.onClose = null;
                this.binary_invoke_ = null;
                this.binary_parameters_ = new std.Queue();
                this.unhandled_invokes_ = new std.Deque();
            }
            _CommunicatorBase.prototype.isConnected = function () {
                return this.connected_;
            };
            _CommunicatorBase.prototype._Is_binary_invoke = function () {
                return (this.binary_invoke_ != null);
            };
            _CommunicatorBase.prototype.replyData = function (invoke) {
                if (this.listener_ == null)
                    this.unhandled_invokes_.push_back(invoke);
                else {
                    if (this.listener_._Reply_data instanceof Function)
                        this.listener_._Reply_data(invoke);
                    else
                        this.listener_.replyData(invoke);
                }
            };
            _CommunicatorBase.prototype._Handle_string = function (str) {
                var invoke = new protocol.Invoke();
                invoke.construct(new samchon.library.XML(str));
                for (var i = 0; i < invoke.size(); i++) {
                    var parameter = invoke.at(i);
                    if (parameter.getType() != "ByteArray")
                        continue;
                    if (this.binary_invoke_ == null)
                        this.binary_invoke_ = invoke;
                    this.binary_parameters_.push(parameter);
                }
                if (this.binary_invoke_ == null)
                    this.replyData(invoke);
            };
            _CommunicatorBase.prototype._Handle_binary = function (binary) {
                var parameter = this.binary_parameters_.front();
                {
                    parameter.setValue(binary);
                }
                this.binary_parameters_.pop();
                if (this.binary_parameters_.empty() == true) {
                    var invoke = this.binary_invoke_;
                    this.binary_invoke_ = null;
                    this.replyData(invoke);
                }
            };
            return _CommunicatorBase;
        }());
        protocol._CommunicatorBase = _CommunicatorBase;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var Communicator = (function (_super) {
            __extends(Communicator, _super);
            function Communicator() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.socket_ = null;
                _this.header_bytes_ = null;
                _this.data_ = null;
                _this.data_index_ = -1;
                _this.listening_ = false;
                return _this;
            }
            Communicator.prototype.close = function () {
                this.socket_.end();
            };
            Communicator.prototype._Start_listen = function () {
                if (this.listening_ == true)
                    return;
                this.listening_ = true;
                this.socket_.on("data", this._Listen_piece.bind(this));
                this.socket_.on("error", this._Handle_error.bind(this));
                this.socket_.on("end", this._Handle_close.bind(this));
                this.socket_.on("close", this._Handle_close.bind(this));
            };
            Communicator.prototype._Handle_error = function () {
            };
            Communicator.prototype._Handle_close = function () {
                this.connected_ = false;
                if (this.onClose != null)
                    this.onClose();
            };
            Communicator.prototype.sendData = function (invoke) {
                var str_header = new Buffer(8);
                var str = invoke.toXML().toString();
                str_header.writeUInt32BE(0, 0);
                str_header.writeUInt32BE(Buffer.byteLength(str, "utf8"), 4);
                this.socket_.write(str_header);
                this.socket_.write(str, "utf8");
                for (var i = 0; i < invoke.size(); i++) {
                    var parameter = invoke.at(i);
                    if (parameter.getType() != "ByteArray")
                        continue;
                    var binary_header = new Buffer(8);
                    var binary = parameter.getValue();
                    binary_header.writeUInt32BE(0, 0);
                    binary_header.writeUInt32BE(binary.byteLength, 4);
                    this.socket_.write(binary_header);
                    this.socket_.write(binary);
                }
            };
            Communicator.prototype._Listen_piece = function (piece) {
                if (this.data_ == null)
                    this._Listen_header(piece, 0);
                else
                    this._Listen_data(piece, 0);
            };
            Communicator.prototype._Listen_header = function (piece, piece_index) {
                if (this.header_bytes_ != null) {
                    this.header_bytes_.copy(piece, piece_index, 0, this.header_bytes_.byteLength);
                    this.header_bytes_ = null;
                }
                if (piece_index > piece.byteLength - 8) {
                    this.header_bytes_ = new Buffer(8);
                    piece.copy(this.header_bytes_, 0, piece_index, piece.byteLength - piece_index);
                    return;
                }
                var content_size = piece.readUInt32BE(piece_index + 4);
                piece_index += 8;
                if (content_size != 0) {
                    this.data_ = new Buffer(content_size);
                    this.data_index_ = 0;
                }
                if (piece_index < piece.byteLength)
                    if (content_size != 0)
                        this._Listen_data(piece, piece_index);
                    else
                        this._Listen_header(piece, piece_index);
            };
            Communicator.prototype._Listen_data = function (piece, piece_index) {
                var inserted_bytes = Math.min(this.data_.byteLength - this.data_index_, piece.byteLength - piece_index);
                piece.copy(this.data_, this.data_index_, piece_index, piece_index + inserted_bytes);
                this.data_index_ += inserted_bytes;
                piece_index += inserted_bytes;
                if (this.data_index_ == this.data_.byteLength) {
                    if (this._Is_binary_invoke() == false)
                        this._Handle_string(this.data_.toString());
                    else
                        this._Handle_binary(this.data_);
                    this.data_ = null;
                    this.data_index_ = -1;
                }
                if (piece_index < piece.byteLength)
                    this._Listen_header(piece, piece_index);
            };
            return Communicator;
        }(protocol._CommunicatorBase));
        protocol.Communicator = Communicator;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ClientDriver = (function (_super) {
            __extends(ClientDriver, _super);
            function ClientDriver(socket) {
                var _this = _super.call(this) || this;
                _this.socket_ = socket;
                _this.connected_ = true;
                return _this;
            }
            ClientDriver.prototype.listen = function (listener) {
                this.listener_ = listener;
                this._Start_listen();
            };
            return ClientDriver;
        }(protocol.Communicator));
        protocol.ClientDriver = ClientDriver;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var DedicatedWorkerCommunicator = (function (_super) {
            __extends(DedicatedWorkerCommunicator, _super);
            function DedicatedWorkerCommunicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DedicatedWorkerCommunicator.prototype._Handle_message = function (event) {
                if (this._Is_binary_invoke() == false)
                    this._Handle_string(event.data);
                else
                    this._Handle_binary(event.data);
            };
            return DedicatedWorkerCommunicator;
        }(protocol._CommunicatorBase));
        protocol.DedicatedWorkerCommunicator = DedicatedWorkerCommunicator;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var DedicatedWorkerClientDriver = (function (_super) {
            __extends(DedicatedWorkerClientDriver, _super);
            function DedicatedWorkerClientDriver() {
                var _this = _super.call(this) || this;
                onmessage = _this._Handle_message.bind(_this);
                _this.connected_ = true;
                return _this;
            }
            DedicatedWorkerClientDriver.prototype.listen = function (listener) {
                this.listener_ = listener;
            };
            DedicatedWorkerClientDriver.prototype.close = function () {
                close();
            };
            DedicatedWorkerClientDriver.prototype.sendData = function (invoke) {
                postMessage(invoke.toXML().toString(), "");
                for (var i = 0; i < invoke.size(); i++)
                    if (invoke.at(i).getType() == "ByteArray")
                        postMessage(invoke.at(i).getValue(), "");
            };
            return DedicatedWorkerClientDriver;
        }(protocol.DedicatedWorkerCommunicator));
        protocol.DedicatedWorkerClientDriver = DedicatedWorkerClientDriver;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var SharedWorkerCommunicator = (function (_super) {
            __extends(SharedWorkerCommunicator, _super);
            function SharedWorkerCommunicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SharedWorkerCommunicator.prototype.close = function () {
                this.connected_ = false;
                this.port_.close();
                if (this.onClose != null)
                    this.onClose();
            };
            SharedWorkerCommunicator.prototype.sendData = function (invoke) {
                this.port_.postMessage(invoke.toXML().toString());
                for (var i = 0; i < invoke.size(); i++)
                    if (invoke.at(i).getType() == "ByteaArray")
                        this.port_.postMessage(invoke.at(i).getValue());
            };
            SharedWorkerCommunicator.prototype._Handle_message = function (event) {
                if (this._Is_binary_invoke() == false)
                    this._Handle_string(event.data);
                else
                    this._Handle_binary(event.data);
            };
            return SharedWorkerCommunicator;
        }(protocol._CommunicatorBase));
        protocol.SharedWorkerCommunicator = SharedWorkerCommunicator;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var SharedWorkerClientDriver = (function (_super) {
            __extends(SharedWorkerClientDriver, _super);
            function SharedWorkerClientDriver(port) {
                var _this = _super.call(this) || this;
                _this.port_ = port;
                _this.connected_ = true;
                _this.listening_ = false;
                return _this;
            }
            SharedWorkerClientDriver.prototype.listen = function (listener) {
                this.listener_ = listener;
                if (this.listening_ == true)
                    return;
                this.listening_ = true;
                this.port_.onmessage = this._Handle_message.bind(this);
            };
            return SharedWorkerClientDriver;
        }(protocol.SharedWorkerCommunicator));
        protocol.SharedWorkerClientDriver = SharedWorkerClientDriver;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var WebCommunicator = (function (_super) {
            __extends(WebCommunicator, _super);
            function WebCommunicator() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.connection_ = null;
                return _this;
            }
            WebCommunicator.prototype.close = function () {
                this.connection_.close();
            };
            WebCommunicator.prototype.sendData = function (invoke) {
                this.connection_.sendUTF(invoke.toXML().toString());
                for (var i = 0; i < invoke.size(); i++)
                    if (invoke.at(i).getType() == "ByteArray")
                        this.connection_.sendBytes(invoke.at(i).getValue());
            };
            WebCommunicator.prototype._Handle_message = function (message) {
                if (message.type == "utf8")
                    this._Handle_string(message.utf8Data);
                else
                    this._Handle_binary(message.binaryData);
            };
            WebCommunicator.prototype._Handle_close = function () {
                this.connected_ = false;
                if (this.onClose != null)
                    this.onClose();
            };
            return WebCommunicator;
        }(protocol._CommunicatorBase));
        protocol.WebCommunicator = WebCommunicator;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var WebClientDriver = (function (_super) {
            __extends(WebClientDriver, _super);
            function WebClientDriver(connection, path, session_id) {
                var _this = _super.call(this) || this;
                _this.connection_ = connection;
                _this.path_ = path;
                _this.session_id_ = session_id;
                _this.listening_ = false;
                return _this;
            }
            WebClientDriver.prototype.listen = function (listener) {
                this.listener_ = listener;
                if (this.listening_ == true)
                    return;
                this.listening_ = true;
                this.connection_.on("message", this._Handle_message.bind(this));
                this.connection_.on("close", this._Handle_close.bind(this));
                this.connection_.on("error", this._Handle_close.bind(this));
            };
            WebClientDriver.prototype.getPath = function () {
                return this.path_;
            };
            WebClientDriver.prototype.getSessionID = function () {
                return this.session_id_;
            };
            return WebClientDriver;
        }(protocol.WebCommunicator));
        protocol.WebClientDriver = WebClientDriver;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var DedicatedWorkerServerConnector = (function (_super) {
            __extends(DedicatedWorkerServerConnector, _super);
            function DedicatedWorkerServerConnector(listener) {
                var _this = _super.call(this, listener) || this;
                _this.worker_ = null;
                return _this;
            }
            DedicatedWorkerServerConnector.prototype.connect = function (jsFile) {
                this.worker_ = new Worker(jsFile);
                this.worker_.onmessage = this._Handle_message.bind(this);
                this.connected_ = true;
                if (this.onConnect != null)
                    this.onConnect();
            };
            DedicatedWorkerServerConnector.prototype.close = function () {
                this.worker_.terminate();
                if (this.onClose != null)
                    this.onClose();
            };
            DedicatedWorkerServerConnector.prototype.sendData = function (invoke) {
                this.worker_.postMessage(invoke.toXML().toString());
                for (var i = 0; i < invoke.size(); i++)
                    if (invoke.at(i).getType() == "ByteArray")
                        this.worker_.postMessage(invoke.at(i).getValue());
            };
            return DedicatedWorkerServerConnector;
        }(protocol.DedicatedWorkerCommunicator));
        protocol.DedicatedWorkerServerConnector = DedicatedWorkerServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ServerConnector = (function (_super) {
            __extends(ServerConnector, _super);
            function ServerConnector(listener) {
                var _this = _super.call(this, listener) || this;
                _this.connected_ = false;
                return _this;
            }
            ServerConnector.prototype.connect = function (ip, port) {
                this.socket_ = net.connect({ host: ip, port: port }, this._Handle_connect.bind(this));
            };
            ServerConnector.prototype._Handle_connect = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.connected_ = true;
                this._Start_listen();
                this._Send_dummy_packet_repeatedly();
                if (this.onConnect != null)
                    this.onConnect();
            };
            ServerConnector.prototype._Send_dummy_packet_repeatedly = function () {
                setInterval(function () {
                    var packet = new Buffer(8);
                    packet.writeUInt32BE(0, 0);
                    packet.writeUInt32BE(0, 4);
                    try {
                        this.socket_.write(packet);
                    }
                    catch (exception) {
                        return;
                    }
                }.bind(this), 5000);
            };
            return ServerConnector;
        }(protocol.Communicator));
        protocol.ServerConnector = ServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var SharedWorkerServerConnector = (function (_super) {
            __extends(SharedWorkerServerConnector, _super);
            function SharedWorkerServerConnector(listener) {
                var _this = _super.call(this, listener) || this;
                _this.connected_ = false;
                _this.onConnect = null;
                return _this;
            }
            SharedWorkerServerConnector.prototype.connect = function (jsFile) {
                var worker = new SharedWorker(jsFile);
                this.port_ = worker.port;
                this.port_.onmessage = this._Handle_message.bind(this);
                this.connected_ = true;
                if (this.onConnect != null)
                    this.onConnect();
            };
            return SharedWorkerServerConnector;
        }(protocol.SharedWorkerCommunicator));
        protocol.SharedWorkerServerConnector = SharedWorkerServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var WebServerConnector = (function (_super) {
            __extends(WebServerConnector, _super);
            function WebServerConnector(listener) {
                var _this = _super.call(this, listener) || this;
                _this.browser_socket_ = null;
                _this.node_client_ = null;
                _this.connected_ = false;
                _this.onConnect = null;
                return _this;
            }
            WebServerConnector.prototype.connect = function (ip, port, path) {
                if (path === void 0) { path = "/"; }
                var address;
                if (ip.indexOf("ws://") == -1)
                    if (ip.indexOf("://") != -1)
                        throw "only websocket is possible";
                    else
                        ip = "ws://" + ip;
                if (path.length != 0 && path.charAt(0) != "/")
                    path = "/" + path;
                address = ip + ":" + port + path;
                if (std.is_node() == true) {
                    this.node_client_ = new websocket.client();
                    this.node_client_.on("connect", this._Handle_node_connect.bind(this));
                    this.node_client_.connect(address);
                }
                else {
                    this.browser_socket_ = new WebSocket(address);
                    this.browser_socket_.onopen = this._Handle_browser_connect.bind(this);
                    this.browser_socket_.onerror = this._Handle_close.bind(this);
                    this.browser_socket_.onclose = this._Handle_close.bind(this);
                    this.browser_socket_.onmessage = this._Handle_browser_message.bind(this);
                }
            };
            WebServerConnector.prototype.close = function () {
                if (std.is_node() == true)
                    _super.prototype.close.call(this);
                else
                    this.browser_socket_.close();
            };
            WebServerConnector.prototype.sendData = function (invoke) {
                if (this.browser_socket_ != null) {
                    this.browser_socket_.send(invoke.toXML().toString());
                    for (var i = 0; i < invoke.size(); i++)
                        if (invoke.at(i).getType() == "ByteArray")
                            this.browser_socket_.send(invoke.at(i).getValue());
                }
                else {
                    _super.prototype.sendData.call(this, invoke);
                }
            };
            WebServerConnector.prototype._Handle_browser_connect = function (event) {
                this.connected_ = true;
                if (this.onConnect != null)
                    this.onConnect();
            };
            WebServerConnector.prototype._Handle_browser_message = function (event) {
                if (this._Is_binary_invoke() == false)
                    this._Handle_string(event.data);
                else
                    this._Handle_binary(event.data);
            };
            WebServerConnector.prototype._Handle_node_connect = function (connection) {
                this.connected_ = true;
                this.connection_ = connection;
                this.connection_.on("message", this._Handle_message.bind(this));
                this.connection_.on("close", this._Handle_close.bind(this));
                this.connection_.on("error", this._Handle_close.bind(this));
                if (this.onConnect != null)
                    this.onConnect();
            };
            return WebServerConnector;
        }(protocol.WebCommunicator));
        protocol.WebServerConnector = WebServerConnector;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var IEntityGroup;
        (function (IEntityGroup) {
            function construct(entityGroup, xml) {
                var prohibited_names = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    prohibited_names[_i - 2] = arguments[_i];
                }
                entityGroup.clear();
                protocol.IEntity.construct.apply(protocol.IEntity, [entityGroup, xml].concat(prohibited_names));
                if (xml.has(entityGroup.CHILD_TAG()) == false)
                    return;
                var children = new std.Vector();
                var xml_list = xml.get(entityGroup.CHILD_TAG());
                for (var i = 0; i < xml_list.size(); i++) {
                    var child = entityGroup.createChild(xml_list.at(i));
                    if (child == null)
                        continue;
                    child.construct(xml_list.at(i));
                    children.push(child);
                }
                entityGroup.assign(children.begin(), children.end());
            }
            IEntityGroup.construct = construct;
            function toXML(group) {
                var prohibited_names = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    prohibited_names[_i - 1] = arguments[_i];
                }
                var xml = protocol.IEntity.toXML.apply(protocol.IEntity, [group].concat(prohibited_names));
                for (var it = group.begin(); !it.equals(group.end()); it = it.next())
                    xml.push(it.value.toXML());
                return xml;
            }
            IEntityGroup.toXML = toXML;
            function has(entityGroup, key) {
                return std.any_of(entityGroup.begin(), entityGroup.end(), function (entity) {
                    return std.equal_to(entity.key(), key);
                });
            }
            IEntityGroup.has = has;
            function count(entityGroup, key) {
                return std.count_if(entityGroup.begin(), entityGroup.end(), function (entity) {
                    return std.equal_to(entity.key(), key);
                });
            }
            IEntityGroup.count = count;
            function get(entityGroup, key) {
                for (var it = entityGroup.begin(); !it.equals(entityGroup.end()); it = it.next())
                    if (std.equal_to(it.value.key(), key) == true)
                        return it.value;
                throw new std.OutOfRange("out of range");
            }
            IEntityGroup.get = get;
        })(IEntityGroup = protocol.IEntityGroup || (protocol.IEntityGroup = {}));
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityArray = (function (_super) {
            __extends(EntityArray, _super);
            function EntityArray() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityArray.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityArray.prototype.key = function () {
                return "";
            };
            EntityArray.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityArray.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityArray.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityArray.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this, "length");
            };
            return EntityArray;
        }(std.Vector));
        protocol.EntityArray = EntityArray;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityList = (function (_super) {
            __extends(EntityList, _super);
            function EntityList() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityList.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityList.prototype.key = function () {
                return "";
            };
            EntityList.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityList.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityList.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityList.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this);
            };
            return EntityList;
        }(std.List));
        protocol.EntityList = EntityList;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
(function (samchon) {
    var protocol;
    (function (protocol) {
        var EntityDeque = (function (_super) {
            __extends(EntityDeque, _super);
            function EntityDeque() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityDeque.prototype.construct = function (xml) {
                protocol.IEntityGroup.construct(this, xml);
            };
            EntityDeque.prototype.key = function () {
                return "";
            };
            EntityDeque.prototype.has = function (key) {
                return protocol.IEntityGroup.has(this, key);
            };
            EntityDeque.prototype.count = function (key) {
                return protocol.IEntityGroup.count(this, key);
            };
            EntityDeque.prototype.get = function (key) {
                return protocol.IEntityGroup.get(this, key);
            };
            EntityDeque.prototype.toXML = function () {
                return protocol.IEntityGroup.toXML(this);
            };
            return EntityDeque;
        }(std.Deque));
        protocol.EntityDeque = EntityDeque;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var Invoke = (function (_super) {
            __extends(Invoke, _super);
            function Invoke() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                _this.listener = "";
                if (args.length == 0) {
                    _this.listener = "";
                }
                else {
                    _this.listener = args[0];
                    for (var i = 1; i < args.length; i++)
                        _this.push_back(new protocol.InvokeParameter(args[i]));
                }
                return _this;
            }
            Invoke.prototype.createChild = function (xml) {
                return new protocol.InvokeParameter();
            };
            Invoke.prototype.getListener = function () {
                return this.listener;
            };
            Invoke.prototype.getArguments = function () {
                var args = [];
                for (var i = 0; i < this.size(); i++)
                    if (this.at(i).getName() == "_History_uid")
                        continue;
                    else
                        args.push(this.at(i).getValue());
                return args;
            };
            Invoke.prototype.apply = function (thisArg, func) {
                if (func === void 0) { func = null; }
                var argArray = this.getArguments();
                if (func == null) {
                    if (!(this.listener in thisArg && thisArg[this.listener] instanceof Function))
                        return false;
                    func = thisArg[this.listener];
                }
                func.apply(thisArg, argArray);
                return true;
            };
            Invoke.prototype.TAG = function () {
                return "invoke";
            };
            Invoke.prototype.CHILD_TAG = function () {
                return "parameter";
            };
            return Invoke;
        }(protocol.EntityArray));
        protocol.Invoke = Invoke;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var InvokeParameter = (function (_super) {
            __extends(InvokeParameter, _super);
            function InvokeParameter() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                _this.name = "";
                _this.type = "";
                _this.value = null;
                if (args.length == 0)
                    return _this;
                if (args.length == 1) {
                    _this.name = "";
                    _this.setValue(args[0]);
                }
                else {
                    _this.name = args[0];
                    _this.setValue(args[1]);
                }
                return _this;
            }
            InvokeParameter.prototype.construct = function (xml) {
                this.name = (xml.hasProperty("name")) ? xml.getProperty("name") : "";
                this.type = xml.getProperty("type");
                if (this.type == "XML")
                    this.value = xml.begin().second.front();
                else if (this.type == "boolean") {
                    var value = xml.getValue();
                    this.value = (value != "0" && value != "false");
                }
                else if (this.type == "number")
                    this.value = Number(xml.getValue());
                else if (this.type == "string")
                    this.value = xml.getValue();
            };
            InvokeParameter.prototype.setValue = function (value) {
                this.value = value;
                if (value instanceof samchon.library.XML)
                    this.type = "XML";
                else if (value instanceof Uint8Array)
                    this.type = "ByteArray";
                else
                    this.type = typeof value;
            };
            InvokeParameter.prototype.key = function () {
                return this.name;
            };
            InvokeParameter.prototype.getName = function () {
                return this.name;
            };
            InvokeParameter.prototype.getType = function () {
                return this.type;
            };
            InvokeParameter.prototype.getValue = function () {
                return this.value;
            };
            InvokeParameter.prototype.TAG = function () {
                return "parameter";
            };
            InvokeParameter.prototype.toXML = function () {
                var xml = new samchon.library.XML();
                xml.setTag(this.TAG());
                if (this.name != "")
                    xml.setProperty("name", this.name);
                xml.setProperty("type", this.type);
                if (this.type == "XML")
                    xml.push(this.value);
                else if (this.type != "ByteArray")
                    xml.setValue(this.value + "");
                return xml;
            };
            return InvokeParameter;
        }(protocol.Entity));
        protocol.InvokeParameter = InvokeParameter;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var DedicatedWorkerServer = (function () {
            function DedicatedWorkerServer() {
            }
            DedicatedWorkerServer.prototype.open = function () {
                this.addClient(new protocol.DedicatedWorkerClientDriver());
            };
            DedicatedWorkerServer.prototype.close = function () {
                close();
            };
            return DedicatedWorkerServer;
        }());
        protocol.DedicatedWorkerServer = DedicatedWorkerServer;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var Server = (function () {
            function Server() {
                this.net_driver_ = null;
            }
            Server.prototype.open = function (port) {
                this.net_driver_ = net.createServer(this._Handle_connect.bind(this));
                this.net_driver_.listen(port);
            };
            Server.prototype.close = function () {
                this.net_driver_.close();
                this.net_driver_ = null;
            };
            Server.prototype._Handle_connect = function (socket) {
                var clientDriver = new protocol.ClientDriver(socket);
                this.addClient(clientDriver);
            };
            return Server;
        }());
        protocol.Server = Server;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var SharedWorkerServer = (function () {
            function SharedWorkerServer() {
            }
            SharedWorkerServer.prototype.open = function () {
                self.addEventListener("connect", this._Handle_connect.bind(this));
            };
            SharedWorkerServer.prototype.close = function () {
                close();
            };
            SharedWorkerServer.prototype._Handle_connect = function (event) {
                var port = event.ports[event.ports.length - 1];
                var driver = new protocol.SharedWorkerClientDriver(port);
                this.addClient(driver);
            };
            return SharedWorkerServer;
        }());
        protocol.SharedWorkerServer = SharedWorkerServer;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var WebServer = (function () {
            function WebServer() {
                this.sequence_ = 0;
            }
            WebServer.prototype.open = function (port) {
                this.my_port_ = port;
                this.http_server_ = http.createServer();
                this.http_server_.listen(port);
                var ws_server = new websocket.server({ httpServer: this.http_server_ });
                ws_server.on("request", this._Handle_request.bind(this));
            };
            WebServer.prototype.close = function () {
                this.http_server_.close();
            };
            WebServer.prototype._Handle_request = function (request) {
                var path = request.resource;
                var session_id = this._Fetch_session_id(request.cookies);
                var connection = request.accept("", request.origin, [{ name: "SESSION_ID", value: session_id }]);
                var driver = new protocol.WebClientDriver(connection, path, session_id);
                this.addClient(driver);
            };
            WebServer.prototype._Fetch_session_id = function (cookies) {
                for (var i = 0; i < cookies.length; i++)
                    if (cookies[i].name == "SESSION_ID")
                        return cookies[i].value;
                return this._Issue_session_id();
            };
            WebServer.prototype._Issue_session_id = function () {
                var port = this.my_port_;
                var uid = ++this.sequence_;
                var linux_time = new Date().getTime();
                var rand = Math.floor(Math.random() * 0xffffffff);
                return port.toString(16) + uid.toString(16) + linux_time.toString(16) + rand.toString(16);
            };
            return WebServer;
        }());
        protocol.WebServer = WebServer;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var DedicatedWorkerServerBase = (function (_super) {
            __extends(DedicatedWorkerServerBase, _super);
            function DedicatedWorkerServerBase(hooker) {
                var _this = _super.call(this) || this;
                _this.hooker_ = hooker;
                return _this;
            }
            DedicatedWorkerServerBase.prototype.addClient = function (driver) {
                this.hooker_.addClient(driver);
            };
            return DedicatedWorkerServerBase;
        }(protocol.DedicatedWorkerServer));
        protocol.DedicatedWorkerServerBase = DedicatedWorkerServerBase;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var ServerBase = (function (_super) {
            __extends(ServerBase, _super);
            function ServerBase(hooker) {
                var _this = _super.call(this) || this;
                _this.hooker_ = hooker;
                return _this;
            }
            ServerBase.prototype.addClient = function (driver) {
                this.hooker_.addClient(driver);
            };
            return ServerBase;
        }(protocol.Server));
        protocol.ServerBase = ServerBase;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var SharedWorkerServerBase = (function (_super) {
            __extends(SharedWorkerServerBase, _super);
            function SharedWorkerServerBase(hooker) {
                var _this = _super.call(this) || this;
                _this.hooker_ = hooker;
                return _this;
            }
            SharedWorkerServerBase.prototype.addClient = function (driver) {
                this.hooker_.addClient(driver);
            };
            return SharedWorkerServerBase;
        }(protocol.SharedWorkerServer));
        protocol.SharedWorkerServerBase = SharedWorkerServerBase;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var protocol;
    (function (protocol) {
        var WebServerBase = (function (_super) {
            __extends(WebServerBase, _super);
            function WebServerBase(hooker) {
                var _this = _super.call(this) || this;
                _this.hooker_ = hooker;
                return _this;
            }
            WebServerBase.prototype.addClient = function (driver) {
                this.hooker_.addClient(driver);
            };
            return WebServerBase;
        }(protocol.WebServer));
        protocol.WebServerBase = WebServerBase;
    })(protocol = samchon.protocol || (samchon.protocol = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedProcess = (function (_super) {
                __extends(DistributedProcess, _super);
                function DistributedProcess(systemArray) {
                    var _this = _super.call(this) || this;
                    _this.system_array_ = systemArray;
                    _this.name = "";
                    _this.resource = 1.0;
                    _this.progress_list_ = new std.HashMap();
                    _this.history_list_ = new std.HashMap();
                    return _this;
                }
                DistributedProcess.prototype.key = function () {
                    return this.name;
                };
                DistributedProcess.prototype.getSystemArray = function () {
                    return this.system_array_;
                };
                DistributedProcess.prototype.getName = function () {
                    return this.name;
                };
                DistributedProcess.prototype.getResource = function () {
                    return this.resource;
                };
                DistributedProcess.prototype.setResource = function (val) {
                    this.resource = val;
                    this.enforced_ = false;
                };
                DistributedProcess.prototype.enforceResource = function (val) {
                    this.resource = val;
                    this.enforced_ = true;
                };
                DistributedProcess.prototype._Compute_average_elapsed_time = function () {
                    var sum = 0;
                    for (var it = this.history_list_.begin(); !it.equals(this.history_list_.end()); it = it.next()) {
                        var history_1 = it.second;
                        var elapsed_time = history_1.computeElapsedTime() / history_1.getWeight();
                        sum += elapsed_time * history_1.getSystem().getPerformance();
                    }
                    return sum / this.history_list_.size();
                };
                DistributedProcess.prototype.sendData = function (invoke, weight) {
                    if (weight === void 0) { weight = 1.0; }
                    if (this.system_array_.empty() == true)
                        return null;
                    var uid;
                    if (invoke.has("_History_uid") == false) {
                        uid = ++this.system_array_.history_sequence_;
                        invoke.push_back(new samchon.protocol.InvokeParameter("_History_uid", uid));
                    }
                    else {
                        uid = invoke.get("_History_uid").getValue();
                        this.system_array_.history_sequence_ = uid;
                        this.progress_list_.erase(uid);
                    }
                    if (invoke.has("_Process_name") == false)
                        invoke.push_back(new samchon.protocol.InvokeParameter("_Process_name", this.name));
                    if (invoke.has("_Process_weight") == false)
                        invoke.push_back(new samchon.protocol.InvokeParameter("_Process_weight", weight));
                    else
                        weight = invoke.get("_Process_name").getValue();
                    var idle_system = null;
                    for (var i = 0; i < this.system_array_.size(); i++) {
                        var system = this.system_array_.at(i);
                        if (system.exclude_ == true)
                            continue;
                        if (idle_system == null ||
                            (system.progress_list_.empty() && system.history_list_.empty()) ||
                            system.progress_list_.size() < idle_system.progress_list_.size() ||
                            (system.progress_list_.size() == idle_system.progress_list_.size() &&
                                system.getPerformance() > idle_system.getPerformance()) ||
                            (system.progress_list_.size() == idle_system.progress_list_.size() &&
                                system.getPerformance() == idle_system.getPerformance() &&
                                system.history_list_.size() < idle_system.history_list_.size()))
                            idle_system = system;
                    }
                    if (idle_system == null)
                        throw new std.OutOfRange("No remote system to send data exists.");
                    var history = new distributed.DSInvokeHistory(idle_system, this, invoke, weight);
                    this.progress_list_.insert([uid, history]);
                    idle_system.progress_list_.insert([uid, std.make_pair(invoke, history)]);
                    idle_system.sendData(invoke);
                    return idle_system;
                };
                DistributedProcess.prototype._Complete_history = function (history) {
                    this.progress_list_.erase(history.getUID());
                    this.history_list_.insert([history.getUID(), history]);
                };
                DistributedProcess.prototype.TAG = function () {
                    return "process";
                };
                return DistributedProcess;
            }(samchon.protocol.Entity));
            distributed.DistributedProcess = DistributedProcess;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalSystem = (function (_super) {
                __extends(ExternalSystem, _super);
                function ExternalSystem(systemArray, communicator) {
                    if (communicator === void 0) { communicator = null; }
                    var _this = _super.call(this) || this;
                    _this.system_array_ = systemArray;
                    _this.communicator = communicator;
                    if (communicator != null)
                        communicator.listen(_this);
                    _this.name = "";
                    return _this;
                }
                ExternalSystem.prototype.destructor = function () {
                    if (this.communicator != null && this.communicator.isConnected() == true) {
                        this.communicator.onClose = null;
                        this.communicator.close();
                    }
                };
                ExternalSystem.prototype._Handle_close = function () {
                    if (this.system_array_ == null)
                        return;
                    else
                        std.remove(this.system_array_.begin(), this.system_array_.end(), this);
                };
                ExternalSystem.prototype.getSystemArray = function () {
                    return this.system_array_;
                };
                ExternalSystem.prototype.key = function () {
                    return this.name;
                };
                ExternalSystem.prototype.getName = function () {
                    return this.name;
                };
                Object.defineProperty(ExternalSystem.prototype, "communicator", {
                    get: function () {
                        return this.communicator_;
                    },
                    set: function (val) {
                        this.communicator_ = val;
                        if (this.communicator_ != null)
                            this.communicator.onClose = this._Handle_close.bind(this);
                    },
                    enumerable: true,
                    configurable: true
                });
                ExternalSystem.prototype.close = function () {
                    this.communicator.close();
                };
                ExternalSystem.prototype.sendData = function (invoke) {
                    this.communicator.sendData(invoke);
                };
                ExternalSystem.prototype.replyData = function (invoke) {
                    this.system_array_.replyData(invoke);
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).replyData(invoke);
                };
                ExternalSystem.prototype.TAG = function () {
                    return "system";
                };
                ExternalSystem.prototype.CHILD_TAG = function () {
                    return "role";
                };
                return ExternalSystem;
            }(samchon.protocol.EntityDequeCollection));
            external.ExternalSystem = ExternalSystem;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelSystem = (function (_super) {
                __extends(ParallelSystem, _super);
                function ParallelSystem(systemArray, communicator) {
                    if (communicator === void 0) { communicator = null; }
                    var _this = _super.call(this, systemArray, communicator) || this;
                    _this.progress_list_ = new std.HashMap();
                    _this.history_list_ = new std.HashMap();
                    _this.enforced_ = false;
                    _this.exclude_ = false;
                    _this.performance = 1.0;
                    return _this;
                }
                ParallelSystem.prototype.destructor = function () {
                    this.exclude_ = true;
                    for (var it = this.progress_list_.begin(); !it.equals(this.progress_list_.end()); it = it.next()) {
                        var invoke = it.second.first;
                        var history_2 = it.second.second;
                        this._Send_back_history(invoke, history_2);
                    }
                    _super.prototype.destructor.call(this);
                };
                ParallelSystem.prototype.getSystemArray = function () {
                    return this.system_array_;
                };
                ParallelSystem.prototype.getPerformance = function () {
                    return this.performance;
                };
                ParallelSystem.prototype.setPerformance = function (val) {
                    this.performance = val;
                    this.enforced_ = false;
                };
                ParallelSystem.prototype.enforcePerformance = function (val) {
                    this.performance = val;
                    this.enforced_ = true;
                };
                ParallelSystem.prototype._Send_piece_data = function (invoke, first, last) {
                    var my_invoke = new samchon.protocol.Invoke(invoke.getListener());
                    {
                        my_invoke.assign(invoke.begin(), invoke.end());
                        my_invoke.push_back(new samchon.protocol.InvokeParameter("_Piece_first", first));
                        my_invoke.push_back(new samchon.protocol.InvokeParameter("_Piece_last", last));
                    }
                    var history = new parallel.PRInvokeHistory(my_invoke);
                    this.progress_list_.insert([
                        history.getUID(),
                        std.make_pair(my_invoke, history)
                    ]);
                    this.sendData(my_invoke);
                };
                ParallelSystem.prototype._Reply_data = function (invoke) {
                    if (invoke.getListener() == "_Report_history") {
                        this._Report_history(invoke.front().getValue());
                    }
                    else if (invoke.getListener() == "_Send_back_history") {
                        var uid = invoke.front().getValue();
                        var it = this.progress_list_.find(uid);
                        if (it.equals(this.progress_list_.end()) == true)
                            return;
                        this._Send_back_history(it.second.first, it.second.second);
                    }
                    else
                        this.replyData(invoke);
                };
                ParallelSystem.prototype._Report_history = function (xml) {
                    var history = new parallel.PRInvokeHistory();
                    history.construct(xml);
                    var progress_it = this.progress_list_.find(history.getUID());
                    if (progress_it.equals(this.progress_list_.end()) == true)
                        return;
                    history.first = progress_it.second.second.getFirst();
                    history.last = progress_it.second.second.computeSize();
                    this.progress_list_.erase(progress_it);
                    this.history_list_.insert([history.getUID(), history]);
                    this.getSystemArray()._Complete_history(history);
                };
                ParallelSystem.prototype._Send_back_history = function (invoke, history) {
                    if (history instanceof parallel.PRInvokeHistory) {
                        std.remove_if(invoke.begin(), invoke.end(), function (param) {
                            return param.getName() == "_History_uid"
                                || param.getName() == "_Piece_first"
                                || param.getName() == "_Piece_last";
                        });
                        this.getSystemArray().sendPieceData(invoke, history.getFirst(), history.getLast());
                    }
                    this.progress_list_.erase(history.getUID());
                };
                return ParallelSystem;
            }(templates.external.ExternalSystem));
            parallel.ParallelSystem = ParallelSystem;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedSystem = (function (_super) {
                __extends(DistributedSystem, _super);
                function DistributedSystem(systemArray, communicator) {
                    if (communicator === void 0) { communicator = null; }
                    return _super.call(this, systemArray, communicator) || this;
                }
                DistributedSystem.prototype.createChild = function (xml) {
                    return null;
                };
                DistributedSystem.prototype.getSystemArray = function () {
                    return this.system_array_;
                };
                DistributedSystem.prototype._Compute_average_elapsed_time = function () {
                    var sum = 0;
                    var denominator = 0;
                    for (var it = this.history_list_.begin(); !it.equals(this.history_list_.end()); it = it.next()) {
                        var history_3 = it.second;
                        if (history_3 instanceof distributed.DSInvokeHistory == false)
                            continue;
                        var elapsed_time = history_3.computeElapsedTime() / history_3.getWeight();
                        sum += elapsed_time / history_3.getProcess().getResource();
                        denominator++;
                    }
                    if (denominator == 0)
                        return -1;
                    else
                        return sum / denominator;
                };
                DistributedSystem.prototype.replyData = function (invoke) {
                    var role_map = this.getSystemArray().getProcessMap();
                    for (var it = role_map.begin(); !it.equals(role_map.end()); it = it.next())
                        it.second.replyData(invoke);
                    _super.prototype.replyData.call(this, invoke);
                };
                DistributedSystem.prototype._Report_history = function (xml) {
                    if (xml.hasProperty("_Piece_first") == true)
                        return _super.prototype._Report_history.call(this, xml);
                    var history = new distributed.DSInvokeHistory(this);
                    history.construct(xml);
                    var progress_it = this.progress_list_.find(history.getUID());
                    if (progress_it.equals(this.progress_list_.end()) == true)
                        return;
                    history.process_ = progress_it.second.second.getProcess();
                    history.weight_ = progress_it.second.second.getWeight();
                    this.progress_list_.erase(progress_it);
                    this.history_list_.insert([history.getUID(), history]);
                    if (history.getProcess() != null)
                        history.getProcess()._Complete_history(history);
                    this.getSystemArray()._Complete_history(history);
                };
                DistributedSystem.prototype._Send_back_history = function (invoke, history) {
                    if (history instanceof distributed.DSInvokeHistory) {
                        history.getProcess().sendData(invoke, history.getWeight());
                    }
                    _super.prototype._Send_back_history.call(this, invoke, history);
                };
                return DistributedSystem;
            }(templates.parallel.ParallelSystem));
            distributed.DistributedSystem = DistributedSystem;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var slave;
        (function (slave) {
            var InvokeHistory = (function (_super) {
                __extends(InvokeHistory, _super);
                function InvokeHistory(invoke) {
                    if (invoke === void 0) { invoke = null; }
                    var _this = _super.call(this) || this;
                    if (invoke == null) {
                        _this.uid = 0;
                        _this.listener = "";
                    }
                    else {
                        _this.uid = invoke.get("_History_uid").getValue();
                        _this.listener = invoke.getListener();
                        _this.start_time_ = new Date();
                    }
                    return _this;
                }
                InvokeHistory.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    this.start_time_ = new Date(parseInt(xml.getProperty("startTime")));
                    this.end_time_ = new Date(parseInt(xml.getProperty("endTime")));
                };
                InvokeHistory.prototype.complete = function () {
                    this.end_time_ = new Date();
                };
                InvokeHistory.prototype.key = function () {
                    return this.uid;
                };
                InvokeHistory.prototype.getUID = function () {
                    return this.uid;
                };
                InvokeHistory.prototype.getListener = function () {
                    return this.listener;
                };
                InvokeHistory.prototype.getStartTime = function () {
                    return this.start_time_;
                };
                InvokeHistory.prototype.getEndTime = function () {
                    return this.end_time_;
                };
                InvokeHistory.prototype.computeElapsedTime = function () {
                    return Math.max(this.end_time_.getTime() - this.start_time_.getTime(), 1);
                };
                InvokeHistory.prototype.TAG = function () {
                    return "history";
                };
                InvokeHistory.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    xml.setProperty("startTime", this.start_time_.getTime() + "");
                    xml.setProperty("endTime", this.end_time_.getTime() + "");
                    return xml;
                };
                InvokeHistory.prototype.toInvoke = function () {
                    return new samchon.protocol.Invoke("_Report_history", this.toXML());
                };
                return InvokeHistory;
            }(samchon.protocol.Entity));
            slave.InvokeHistory = InvokeHistory;
        })(slave = templates.slave || (templates.slave = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DSInvokeHistory = (function (_super) {
                __extends(DSInvokeHistory, _super);
                function DSInvokeHistory(system, process, invoke, weight) {
                    if (process === void 0) { process = null; }
                    if (invoke === void 0) { invoke = null; }
                    if (weight === void 0) { weight = 1; }
                    var _this = _super.call(this, invoke) || this;
                    _this.system_ = system;
                    _this.process_ = process;
                    _this.weight_ = weight;
                    return _this;
                }
                DSInvokeHistory.prototype.construct = function (xml) {
                    _super.prototype.construct.call(this, xml);
                    if (xml.hasProperty("process") == false) {
                        this.process_ = null;
                        return;
                    }
                    var system_array = this.system_.getSystemArray();
                    var process_name = xml.getProperty("process");
                    if (system_array.hasProcess(process_name) == true)
                        this.process_ = system_array.getProcess(process_name);
                    else
                        this.process_ = null;
                };
                DSInvokeHistory.prototype.getSystem = function () {
                    return this.system_;
                };
                DSInvokeHistory.prototype.getProcess = function () {
                    return this.process_;
                };
                DSInvokeHistory.prototype.getWeight = function () {
                    return this.weight_;
                };
                DSInvokeHistory.prototype.toXML = function () {
                    var xml = _super.prototype.toXML.call(this);
                    if (this.process_ != null)
                        xml.setProperty("process", this.process_.getName());
                    return xml;
                };
                return DSInvokeHistory;
            }(templates.slave.InvokeHistory));
            distributed.DSInvokeHistory = DSInvokeHistory;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedClientArray = (function (_super) {
                __extends(DistributedClientArray, _super);
                function DistributedClientArray() {
                    return _super.call(this) || this;
                }
                DistributedClientArray.prototype.addClient = function (driver) {
                    var system = this.createExternalClient(driver);
                    if (system == null)
                        return;
                    this.push_back(system);
                };
                DistributedClientArray.prototype.createChild = function (xml) { return null; };
                DistributedClientArray.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                DistributedClientArray.prototype.close = function () {
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.close();
                    this.clear();
                };
                return DistributedClientArray;
            }(distributed.DistributedSystemArray));
            distributed.DistributedClientArray = DistributedClientArray;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedClientArrayMediator = (function (_super) {
                __extends(DistributedClientArrayMediator, _super);
                function DistributedClientArrayMediator() {
                    return _super.call(this) || this;
                }
                DistributedClientArrayMediator.prototype.addClient = function (driver) {
                    var system = this.createExternalClient(driver);
                    if (system == null)
                        return;
                    this.push_back(system);
                };
                DistributedClientArrayMediator.prototype.createChild = function (xml) { return null; };
                DistributedClientArrayMediator.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                DistributedClientArrayMediator.prototype.close = function () {
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.close();
                    this.clear();
                };
                return DistributedClientArrayMediator;
            }(distributed.DistributedSystemArrayMediator));
            distributed.DistributedClientArrayMediator = DistributedClientArrayMediator;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedServer = (function (_super) {
                __extends(DistributedServer, _super);
                function DistributedServer(systemArray) {
                    var _this = _super.call(this, systemArray) || this;
                    _this.ip = "";
                    _this.port = 0;
                    return _this;
                }
                DistributedServer.prototype.connect = function () {
                    if (this.communicator != null)
                        return;
                    this.communicator = this.createServerConnector();
                    this.communicator.connect(this.ip, this.port);
                };
                return DistributedServer;
            }(distributed.DistributedSystem));
            distributed.DistributedServer = DistributedServer;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedServerArray = (function (_super) {
                __extends(DistributedServerArray, _super);
                function DistributedServerArray() {
                    return _super.call(this) || this;
                }
                DistributedServerArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).connect();
                };
                return DistributedServerArray;
            }(distributed.DistributedSystemArray));
            distributed.DistributedServerArray = DistributedServerArray;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedServerArrayMediator = (function (_super) {
                __extends(DistributedServerArrayMediator, _super);
                function DistributedServerArrayMediator() {
                    return _super.call(this) || this;
                }
                DistributedServerArrayMediator.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).connect();
                };
                return DistributedServerArrayMediator;
            }(distributed.DistributedSystemArrayMediator));
            distributed.DistributedServerArrayMediator = DistributedServerArrayMediator;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedServerClientArray = (function (_super) {
                __extends(DistributedServerClientArray, _super);
                function DistributedServerClientArray() {
                    return _super.call(this) || this;
                }
                DistributedServerClientArray.prototype.createChild = function (xml) {
                    return this.createExternalServer(xml);
                };
                DistributedServerClientArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.connect == undefined)
                            continue;
                        system.connect();
                    }
                };
                return DistributedServerClientArray;
            }(distributed.DistributedClientArray));
            distributed.DistributedServerClientArray = DistributedServerClientArray;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var distributed;
        (function (distributed) {
            var DistributedServerClientArrayMediator = (function (_super) {
                __extends(DistributedServerClientArrayMediator, _super);
                function DistributedServerClientArrayMediator() {
                    return _super.call(this) || this;
                }
                DistributedServerClientArrayMediator.prototype.createChild = function (xml) {
                    return this.createExternalServer(xml);
                };
                DistributedServerClientArrayMediator.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.connect == undefined)
                            continue;
                        system.connect();
                    }
                };
                return DistributedServerClientArrayMediator;
            }(distributed.DistributedClientArrayMediator));
            distributed.DistributedServerClientArrayMediator = DistributedServerClientArrayMediator;
        })(distributed = templates.distributed || (templates.distributed = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalSystemRole = (function (_super) {
                __extends(ExternalSystemRole, _super);
                function ExternalSystemRole(system) {
                    var _this = _super.call(this) || this;
                    _this.system = system;
                    return _this;
                }
                ExternalSystemRole.prototype.key = function () {
                    return this.name;
                };
                ExternalSystemRole.prototype.getSystemArray = function () {
                    return this.system.getSystemArray();
                };
                ExternalSystemRole.prototype.getSystem = function () {
                    return this.system;
                };
                ExternalSystemRole.prototype.getName = function () {
                    return this.name;
                };
                ExternalSystemRole.prototype.sendData = function (invoke) {
                    this.system.sendData(invoke);
                };
                ExternalSystemRole.prototype.TAG = function () {
                    return "role";
                };
                return ExternalSystemRole;
            }(samchon.protocol.Entity));
            external.ExternalSystemRole = ExternalSystemRole;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalClientArray = (function (_super) {
                __extends(ExternalClientArray, _super);
                function ExternalClientArray() {
                    var _this = _super.call(this) || this;
                    _this.server_base_ = null;
                    return _this;
                }
                ExternalClientArray.prototype.addClient = function (driver) {
                    var system = this.createExternalClient(driver);
                    if (system == null)
                        return;
                    this.push_back(system);
                };
                ExternalClientArray.prototype.createChild = function (xml) { return null; };
                ExternalClientArray.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                ExternalClientArray.prototype.close = function () {
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.close();
                };
                return ExternalClientArray;
            }(external.ExternalSystemArray));
            external.ExternalClientArray = ExternalClientArray;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalServer = (function (_super) {
                __extends(ExternalServer, _super);
                function ExternalServer(systemArray) {
                    var _this = _super.call(this, systemArray) || this;
                    _this.ip = "";
                    _this.port = 0;
                    return _this;
                }
                ExternalServer.prototype.connect = function () {
                    this.communicator = this.createServerConnector();
                    this.communicator.connect(this.ip, this.port);
                };
                return ExternalServer;
            }(external.ExternalSystem));
            external.ExternalServer = ExternalServer;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalServerArray = (function (_super) {
                __extends(ExternalServerArray, _super);
                function ExternalServerArray() {
                    return _super.call(this) || this;
                }
                ExternalServerArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).connect();
                };
                return ExternalServerArray;
            }(external.ExternalSystemArray));
            external.ExternalServerArray = ExternalServerArray;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var external;
        (function (external) {
            var ExternalServerClientArray = (function (_super) {
                __extends(ExternalServerClientArray, _super);
                function ExternalServerClientArray() {
                    return _super.call(this) || this;
                }
                ExternalServerClientArray.prototype.createChild = function (xml) {
                    return this.createExternalServer(xml);
                };
                ExternalServerClientArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.connect == undefined)
                            continue;
                        system.connect();
                    }
                };
                return ExternalServerClientArray;
            }(external.ExternalClientArray));
            external.ExternalServerClientArray = ExternalServerClientArray;
        })(external = templates.external || (templates.external = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var slave;
        (function (slave) {
            var SlaveSystem = (function () {
                function SlaveSystem() {
                    this.communicator_ = null;
                }
                SlaveSystem.prototype.sendData = function (invoke) {
                    this.communicator_.sendData(invoke);
                };
                SlaveSystem.prototype._Reply_data = function (invoke) {
                    if (invoke.has("_History_uid")) {
                        var history_4 = new slave.InvokeHistory(invoke);
                        std.remove_if(invoke.begin(), invoke.end(), function (parameter) {
                            return parameter.getName() == "_History_uid"
                                || parameter.getName() == "_Process_name"
                                || parameter.getName() == "_Process_weight";
                        });
                        var pInvoke = new slave.PInvoke(invoke, history_4, this);
                        this.replyData(pInvoke);
                        if (pInvoke.isHold() == false)
                            pInvoke.complete();
                    }
                    else
                        this.replyData(invoke);
                };
                return SlaveSystem;
            }());
            slave.SlaveSystem = SlaveSystem;
        })(slave = templates.slave || (templates.slave = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var MediatorSystem = (function (_super) {
                __extends(MediatorSystem, _super);
                function MediatorSystem(systemArray) {
                    var _this = _super.call(this) || this;
                    _this.system_array_ = systemArray;
                    _this.progress_list_ = new std.HashMap();
                    return _this;
                }
                MediatorSystem.prototype.getSystemArray = function () {
                    return this.system_array_;
                };
                MediatorSystem.prototype._Complete_history = function (uid) {
                    if (this.progress_list_.has(uid) == false)
                        return;
                    var history = this.progress_list_.get(uid);
                    var start_time = null;
                    var end_time = null;
                    for (var i = 0; i < this.system_array_.size(); i++) {
                        var system = this.system_array_.at(i);
                        var it = system.history_list_.find(uid);
                        if (it.equals(system.history_list_.end()) == true)
                            continue;
                        var my_history = it.second;
                        if (start_time == null || my_history.getStartTime() < start_time)
                            start_time = my_history.getStartTime();
                        if (end_time == null || my_history.getEndTime() > end_time)
                            end_time = my_history.getEndTime();
                    }
                    history.start_time_ = start_time;
                    history.end_time_ = end_time;
                    this.progress_list_.erase(uid);
                    this.sendData(history.toInvoke());
                };
                MediatorSystem.prototype._Reply_data = function (invoke) {
                    if (invoke.has("_History_uid") == true) {
                        var history_5 = new templates.slave.InvokeHistory(invoke);
                        if (this.system_array_.empty() == true) {
                            this.sendData(new samchon.protocol.Invoke("_Send_back_history", history_5.getUID()));
                            return;
                        }
                        this.progress_list_.insert([history_5.getUID(), history_5]);
                        if (invoke.has("_Piece_first") == true) {
                            var first = invoke.get("_Piece_first").getValue();
                            var last = invoke.get("_Piece_last").getValue();
                            invoke.erase(invoke.end().advance(-2), invoke.end());
                            this.system_array_.sendPieceData(invoke, first, last);
                        }
                        else if (this.system_array_ instanceof templates.distributed.DistributedSystemArrayMediator
                            && invoke.has("_Process_name") == true) {
                            var process_name = invoke.get("_Process_name").getValue();
                            if (this.system_array_.hasProcess(process_name) == false)
                                return;
                            var process_4 = this.system_array_.getProcess(process_name);
                            process_4.sendData(invoke);
                        }
                    }
                    else
                        this.replyData(invoke);
                };
                MediatorSystem.prototype.replyData = function (invoke) {
                    this.system_array_.sendData(invoke);
                };
                return MediatorSystem;
            }(templates.slave.SlaveSystem));
            parallel.MediatorSystem = MediatorSystem;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelSystemArrayMediator = (function (_super) {
                __extends(ParallelSystemArrayMediator, _super);
                function ParallelSystemArrayMediator() {
                    var _this = _super.call(this) || this;
                    _this.mediator_ = null;
                    return _this;
                }
                ParallelSystemArrayMediator.prototype.startMediator = function () {
                    if (this.mediator_ != null)
                        return;
                    this.mediator_ = this.createMediator();
                    this.mediator_.start();
                };
                ParallelSystemArrayMediator.prototype.getMediator = function () {
                    return this.mediator_;
                };
                ParallelSystemArrayMediator.prototype._Complete_history = function (history) {
                    var ret = _super.prototype._Complete_history.call(this, history);
                    if (ret == true)
                        this.mediator_._Complete_history(history.getUID());
                    return ret;
                };
                return ParallelSystemArrayMediator;
            }(parallel.ParallelSystemArray));
            parallel.ParallelSystemArrayMediator = ParallelSystemArrayMediator;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var PRInvokeHistory = (function (_super) {
                __extends(PRInvokeHistory, _super);
                function PRInvokeHistory(invoke) {
                    if (invoke === void 0) { invoke = null; }
                    var _this = _super.call(this, invoke) || this;
                    if (invoke == null) {
                        _this.first = 0;
                        _this.last = 0;
                    }
                    else {
                        _this.first = invoke.get("_Piece_first").getValue();
                        _this.last = invoke.get("_Piece_last").getValue();
                    }
                    return _this;
                }
                PRInvokeHistory.prototype.getFirst = function () {
                    return this.first;
                };
                PRInvokeHistory.prototype.getLast = function () {
                    return this.last;
                };
                PRInvokeHistory.prototype.computeSize = function () {
                    return this.last - this.first;
                };
                return PRInvokeHistory;
            }(templates.slave.InvokeHistory));
            parallel.PRInvokeHistory = PRInvokeHistory;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var MediatorClient = (function (_super) {
                __extends(MediatorClient, _super);
                function MediatorClient(systemArray, ip, port) {
                    var _this = _super.call(this, systemArray) || this;
                    _this.ip = ip;
                    _this.port = port;
                    return _this;
                }
                MediatorClient.prototype.createServerConnector = function () {
                    return new samchon.protocol.ServerConnector(this);
                };
                MediatorClient.prototype.start = function () {
                    this.connect();
                };
                MediatorClient.prototype.connect = function () {
                    if (this.communicator_ != null)
                        return;
                    this.communicator_ = this.createServerConnector();
                    this.communicator_.connect(this.ip, this.port);
                };
                return MediatorClient;
            }(parallel.MediatorSystem));
            parallel.MediatorClient = MediatorClient;
            var MediatorWebClient = (function (_super) {
                __extends(MediatorWebClient, _super);
                function MediatorWebClient() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MediatorWebClient.prototype.createServerConnector = function () {
                    return new samchon.protocol.WebServerConnector(this);
                };
                return MediatorWebClient;
            }(MediatorClient));
            parallel.MediatorWebClient = MediatorWebClient;
            var MediatorSharedWorkerClient = (function (_super) {
                __extends(MediatorSharedWorkerClient, _super);
                function MediatorSharedWorkerClient() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MediatorSharedWorkerClient.prototype.createServerConnector = function () {
                    return new samchon.protocol.SharedWorkerServerConnector(this);
                };
                return MediatorSharedWorkerClient;
            }(MediatorClient));
            parallel.MediatorSharedWorkerClient = MediatorSharedWorkerClient;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var MediatorServer = (function (_super) {
                __extends(MediatorServer, _super);
                function MediatorServer(systemArray, port) {
                    var _this = _super.call(this, systemArray) || this;
                    _this.port = port;
                    return _this;
                }
                MediatorServer.prototype.createServerBase = function () {
                    return new samchon.protocol.ServerBase(this);
                };
                MediatorServer.prototype.addClient = function (driver) {
                    this.communicator_ = driver;
                    driver.listen(this);
                };
                MediatorServer.prototype.start = function () {
                    this.open(this.port);
                };
                MediatorServer.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                MediatorServer.prototype.close = function () {
                    if (this.server_base_ != null)
                        this.server_base_.close();
                };
                return MediatorServer;
            }(parallel.MediatorSystem));
            parallel.MediatorServer = MediatorServer;
            var MediatorWebServer = (function (_super) {
                __extends(MediatorWebServer, _super);
                function MediatorWebServer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MediatorWebServer.prototype.createServerBase = function () {
                    return new samchon.protocol.WebServerBase(this);
                };
                return MediatorWebServer;
            }(MediatorServer));
            parallel.MediatorWebServer = MediatorWebServer;
            var MediatorDedicatedWorkerServer = (function (_super) {
                __extends(MediatorDedicatedWorkerServer, _super);
                function MediatorDedicatedWorkerServer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MediatorDedicatedWorkerServer.prototype.createServerBase = function () {
                    return new samchon.protocol.DedicatedWorkerServerBase(this);
                };
                return MediatorDedicatedWorkerServer;
            }(MediatorServer));
            parallel.MediatorDedicatedWorkerServer = MediatorDedicatedWorkerServer;
            var MediatorSharedWorkerServer = (function (_super) {
                __extends(MediatorSharedWorkerServer, _super);
                function MediatorSharedWorkerServer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MediatorSharedWorkerServer.prototype.createServerBase = function () {
                    return new samchon.protocol.SharedWorkerServerBase(this);
                };
                return MediatorSharedWorkerServer;
            }(MediatorServer));
            parallel.MediatorSharedWorkerServer = MediatorSharedWorkerServer;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelClientArray = (function (_super) {
                __extends(ParallelClientArray, _super);
                function ParallelClientArray() {
                    return _super.call(this) || this;
                }
                ParallelClientArray.prototype.addClient = function (driver) {
                    var system = this.createExternalClient(driver);
                    if (system == null)
                        return;
                    this.push_back(system);
                };
                ParallelClientArray.prototype.createChild = function (xml) { return null; };
                ParallelClientArray.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                ParallelClientArray.prototype.close = function () {
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.close();
                };
                return ParallelClientArray;
            }(parallel.ParallelSystemArray));
            parallel.ParallelClientArray = ParallelClientArray;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelClientArrayMediator = (function (_super) {
                __extends(ParallelClientArrayMediator, _super);
                function ParallelClientArrayMediator() {
                    return _super.call(this) || this;
                }
                ParallelClientArrayMediator.prototype.addClient = function (driver) {
                    var system = this.createExternalClient(driver);
                    if (system == null)
                        return;
                    this.push_back(system);
                };
                ParallelClientArrayMediator.prototype.createChild = function (xml) { return null; };
                ParallelClientArrayMediator.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                    this.startMediator();
                };
                ParallelClientArrayMediator.prototype.close = function () {
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.close();
                    this.clear();
                };
                return ParallelClientArrayMediator;
            }(parallel.ParallelSystemArrayMediator));
            parallel.ParallelClientArrayMediator = ParallelClientArrayMediator;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelServer = (function (_super) {
                __extends(ParallelServer, _super);
                function ParallelServer(systemArray) {
                    var _this = _super.call(this, systemArray) || this;
                    _this.ip = "";
                    _this.port = 0;
                    return _this;
                }
                ParallelServer.prototype.connect = function () {
                    if (this.communicator != null)
                        return;
                    this.communicator = this.createServerConnector();
                    this.communicator.connect(this.ip, this.port);
                };
                return ParallelServer;
            }(parallel.ParallelSystem));
            parallel.ParallelServer = ParallelServer;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelServerArray = (function (_super) {
                __extends(ParallelServerArray, _super);
                function ParallelServerArray() {
                    return _super.call(this) || this;
                }
                ParallelServerArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).connect();
                };
                return ParallelServerArray;
            }(parallel.ParallelSystemArray));
            parallel.ParallelServerArray = ParallelServerArray;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelServerArrayMediator = (function (_super) {
                __extends(ParallelServerArrayMediator, _super);
                function ParallelServerArrayMediator() {
                    return _super.call(this) || this;
                }
                ParallelServerArrayMediator.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        this.at(i).connect();
                    }
                };
                return ParallelServerArrayMediator;
            }(parallel.ParallelSystemArrayMediator));
            parallel.ParallelServerArrayMediator = ParallelServerArrayMediator;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelServerClientArray = (function (_super) {
                __extends(ParallelServerClientArray, _super);
                function ParallelServerClientArray() {
                    return _super.call(this) || this;
                }
                ParallelServerClientArray.prototype.createChild = function (xml) {
                    return this.createExternalServer(xml);
                };
                ParallelServerClientArray.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.connect == undefined)
                            continue;
                        system.connect();
                    }
                };
                return ParallelServerClientArray;
            }(parallel.ParallelClientArray));
            parallel.ParallelServerClientArray = ParallelServerClientArray;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var parallel;
        (function (parallel) {
            var ParallelServerClientArrayMediator = (function (_super) {
                __extends(ParallelServerClientArrayMediator, _super);
                function ParallelServerClientArrayMediator() {
                    return _super.call(this) || this;
                }
                ParallelServerClientArrayMediator.prototype.createChild = function (xml) {
                    return this.createExternalServer(xml);
                };
                ParallelServerClientArrayMediator.prototype.connect = function () {
                    for (var i = 0; i < this.size(); i++) {
                        var system = this.at(i);
                        if (system.connect == undefined)
                            continue;
                        system.connect();
                    }
                };
                return ParallelServerClientArrayMediator;
            }(parallel.ParallelClientArrayMediator));
            parallel.ParallelServerClientArrayMediator = ParallelServerClientArrayMediator;
        })(parallel = templates.parallel || (templates.parallel = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var service;
        (function (service_1) {
            var Client = (function () {
                function Client(user, driver) {
                    this.user_ = user;
                    this.no_ = ++user.sequence_;
                    this.communicator_ = driver;
                    this.communicator_.listen(this);
                    this.service_ = this.createService(driver.getPath());
                }
                Client.prototype.destructor = function () {
                    if (this.service_ != null)
                        this.service_.destructor();
                };
                Client.prototype.close = function () {
                    this.user_.erase(this.no_);
                };
                Client.prototype.getUser = function () {
                    return this.user_;
                };
                Client.prototype.getService = function () {
                    return this.service_;
                };
                Client.prototype.getNo = function () {
                    return this.no_;
                };
                Client.prototype.changeService = function (arg) {
                    if (this.service_ != null)
                        this.service_.destructor();
                    if (arg instanceof service_1.Service)
                        this.service_ = arg;
                    else
                        this.service_ = this.createService(arg);
                };
                Client.prototype.sendData = function (invoke) {
                    this.communicator_.sendData(invoke);
                };
                Client.prototype.replyData = function (invoke) {
                    this.user_.replyData(invoke);
                    if (this.service_ != null)
                        this.service_.replyData(invoke);
                };
                return Client;
            }());
            service_1.Client = Client;
        })(service = templates.service || (templates.service = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var service;
        (function (service) {
            var Server = (function (_super) {
                __extends(Server, _super);
                function Server() {
                    var _this = _super.call(this) || this;
                    _this.session_map_ = new std.HashMap();
                    _this.account_map_ = new std.HashMap();
                    return _this;
                }
                Server.prototype.has = function (accountID) {
                    return this.account_map_.has(accountID);
                };
                Server.prototype.get = function (accountID) {
                    return this.account_map_.get(accountID);
                };
                Server.prototype.sendData = function (invoke) {
                    for (var it = this.session_map_.begin(); !it.equals(this.session_map_.end()); it = it.next())
                        it.second.sendData(invoke);
                };
                Server.prototype.addClient = function (driver) {
                    var user;
                    if (this.session_map_.has(driver.getSessionID()) == true)
                        user = this.session_map_.get(driver.getSessionID());
                    else {
                        user = this.createUser();
                        user.session_id_ = (driver.getSessionID());
                        this.session_map_.insert(std.make_pair(driver.getSessionID(), user));
                    }
                    var client = user.createClient(driver);
                    user.insert(std.make_pair(client.getNo(), client));
                    driver.onClose = function () {
                        user.erase(client.getNo());
                        if (client.getService() != null)
                            client.getService().destructor();
                        client.destructor();
                    };
                };
                Server.prototype._Erase_user = function (user) {
                    setTimeout(function () {
                        var server = this;
                        if (user.empty() == false)
                            return;
                        server.session_map_.erase(user.session_id_);
                        if (user.getAccountID() != "")
                            server.account_map_.erase(user.getAccountID());
                        user.destructor();
                    }.bind(this), 30000);
                };
                return Server;
            }(samchon.protocol.WebServer));
            service.Server = Server;
        })(service = templates.service || (templates.service = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var service;
        (function (service) {
            var Service = (function () {
                function Service(client, path) {
                    this.client_ = client;
                    this.path_ = path;
                }
                Service.prototype.destructor = function () {
                };
                Service.prototype.getClient = function () {
                    return this.client_;
                };
                Service.prototype.getPath = function () {
                    return this.path_;
                };
                Service.prototype.sendData = function (invoke) {
                    return this.client_.sendData(invoke);
                };
                return Service;
            }());
            service.Service = Service;
        })(service = templates.service || (templates.service = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var service;
        (function (service) {
            var User = (function (_super) {
                __extends(User, _super);
                function User(server) {
                    var _this = _super.call(this) || this;
                    _this.server_ = server;
                    _this.account_id_ = "guest";
                    _this.authority_ = 0;
                    _this.session_id_ = "";
                    _this.sequence_ = 0;
                    _this.addEventListener("erase", _this._Handle_erase_client, _this);
                    return _this;
                }
                User.prototype.destructor = function () {
                };
                User.prototype._Handle_erase_client = function (event) {
                    for (var it = event.first; !it.equals(event.last); it = it.next())
                        it.second.close();
                    if (this.empty() == true)
                        this.server_._Erase_user(this);
                };
                User.prototype.getServer = function () {
                    return this.server_;
                };
                User.prototype.getAccountID = function () {
                    return this.account_id_;
                };
                User.prototype.getAuthority = function () {
                    return this.authority_;
                };
                User.prototype.setAccount = function (id, authority) {
                    if (this.account_id_ == id)
                        return;
                    else if (this.account_id_ != "")
                        this.server_.account_map_.erase(this.account_id_);
                    this.account_id_ = id;
                    this.authority_ = authority;
                    if (id != "")
                        this.server_.account_map_.set(id, this);
                };
                User.prototype.logout = function () {
                    if (this.account_id_ != "")
                        this.server_.account_map_.erase(this.account_id_);
                    this.setAccount("", 0);
                };
                User.prototype.sendData = function (invoke) {
                    for (var it = this.begin(); !it.equals(this.end()); it = it.next())
                        it.second.sendData(invoke);
                };
                User.prototype.replyData = function (invoke) {
                    this.server_.replyData(invoke);
                };
                return User;
            }(samchon.collections.HashMapCollection));
            service.User = User;
        })(service = templates.service || (templates.service = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var slave;
        (function (slave) {
            var PInvoke = (function (_super) {
                __extends(PInvoke, _super);
                function PInvoke(invoke, history, slaveSystem) {
                    var _this = _super.call(this, invoke.getListener()) || this;
                    _this.assign(invoke.begin(), invoke.end());
                    _this.history_ = history;
                    _this.slave_system_ = slaveSystem;
                    _this.hold_ = false;
                    return _this;
                }
                PInvoke.prototype.getHistory = function () {
                    return this.history_;
                };
                PInvoke.prototype.isHold = function () {
                    return this.hold_;
                };
                PInvoke.prototype.hold = function () {
                    this.hold_ = true;
                };
                PInvoke.prototype.complete = function () {
                    this.history_.complete();
                    this.slave_system_.sendData(this.history_.toInvoke());
                };
                return PInvoke;
            }(samchon.protocol.Invoke));
            slave.PInvoke = PInvoke;
        })(slave = templates.slave || (templates.slave = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var slave;
        (function (slave) {
            var SlaveClient = (function (_super) {
                __extends(SlaveClient, _super);
                function SlaveClient() {
                    return _super.call(this) || this;
                }
                SlaveClient.prototype.connect = function (ip, port) {
                    if (this.communicator_ != null)
                        return;
                    this.communicator_ = this.createServerConnector();
                    this.communicator_.connect(ip, port);
                };
                return SlaveClient;
            }(slave.SlaveSystem));
            slave.SlaveClient = SlaveClient;
        })(slave = templates.slave || (templates.slave = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
var samchon;
(function (samchon) {
    var templates;
    (function (templates) {
        var slave;
        (function (slave) {
            var SlaveServer = (function (_super) {
                __extends(SlaveServer, _super);
                function SlaveServer() {
                    var _this = _super.call(this) || this;
                    _this.server_base_ = null;
                    return _this;
                }
                SlaveServer.prototype.open = function (port) {
                    this.server_base_ = this.createServerBase();
                    if (this.server_base_ == null)
                        return;
                    this.server_base_.open(port);
                };
                SlaveServer.prototype.close = function () {
                    if (this.server_base_ != null)
                        this.server_base_.close();
                };
                SlaveServer.prototype.addClient = function (driver) {
                    this.communicator_ = driver;
                    driver.listen(this);
                };
                return SlaveServer;
            }(slave.SlaveSystem));
            slave.SlaveServer = SlaveServer;
        })(slave = templates.slave || (templates.slave = {}));
    })(templates = samchon.templates || (samchon.templates = {}));
})(samchon || (samchon = {}));
