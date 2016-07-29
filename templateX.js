"use strict";
var templateX = {};
//pollyfills
(function () {
    if (!Array.isArray) {
        console.log('ok');
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
}());
(function (nspace, alias) {
    
    var data = null,
        tempData = null,
        
        //Public method render(html string, object with data )
        
        tX = nspace.render = function (template, dataObj) {
            data = dataObj;
            return  _render(template);
        },
        getdata = function (opt) {
            var tag = opt.substring,
                firstChar = tag.charAt(0);
            if (firstChar === '#') return _ifStatement(opt, true);
            if (firstChar === '^') return _ifStatement(opt, false);
            if (firstChar === '[') return _iterate(opt);
            return opt.strBegining + _renderTag(opt.substring) + opt.strEnding;
        };
    
        //Private utilities
        function _render(template) {
            var indexStart = template.indexOf('{{'),
                indexEnd = template.indexOf('}}'),
                opt,
                substring,
                toReplace = '';
                
            if (indexStart === -1 || indexEnd === -1) {
                return template.replace(/\%\{/gi, '{');
            }
        
            opt = {
                strBegining: template.slice(0, indexStart),
                strEnding: template.slice(indexEnd + 2),
                substring: template.slice(indexStart + 2, indexEnd)
            };
        
            return _render(getdata(opt));
        };
        function _iterate(opt) {
            var tag = opt.substring.slice(1),
                endTag = '{{/' + tag + '}}',
                indexEnd = opt.strEnding.indexOf(endTag),
                cont = '', templ, val;    
                
            if (indexEnd === -1) { console.error("Missing ending tag for {{" + opt.substring + "}}!!");}
                
                val = _renderTag(tag);
            
                if (!(Array.isArray(val))) { return _ifStatement(opt, true);}
                templ = opt.strEnding.slice(0, indexEnd);
                opt.strEnding = opt.strEnding.slice(indexEnd + endTag.length);
                tempData = data;
                for (var i = 0; i < val.length; i++) {
                    data = val[i];
                    cont += _render(templ);
                }
                data = tempData;
                tempData = null;
                return opt.strBegining + cont + opt.strEnding;
            
        };
        function _ifStatement(opt, bol) {
            var tag = opt.substring.slice(1),
                endTag = '{{/' + tag + '}}',
                indexEnd = opt.strEnding.indexOf(endTag),
                ifContent, ifVal;    

            
            if (indexEnd === -1) { console.error("Missing ending tag for {{" + opt.substring + "}}!!");} 
            
            ifContent = opt.strEnding.slice(0, indexEnd);
            opt.strEnding = opt.strEnding.slice(indexEnd + endTag.length);
            ifVal = _renderTag(tag) + '';
            
            if (bol) {
                if (ifVal) { 
                    return opt.strBegining + ifContent + opt.strEnding;
                } else { 
                    return opt.strBegining + opt.strEnding;
                }
                
            } else {
                
                if (!ifVal) {
                    return opt.strBegining + ifContent + opt.strEnding;   
                } else { 
                    return opt.strBegining + opt.strEnding;
                }
                
            }
            
        };
        function _renderTag(tagStr) {
            var dataObj = data,
                ns = tagStr.split('.'),
                i;
        
            if (ns.length === 1 && data[ns[0]]) {
                return data[ns[0]];
            } else if (!data[ns[0]]) {
                return '';
            };
            
            for (i = 0; i < ns.length; i++) {
                if (ns[i] === '') {
                    dataObj = data;
                    continue;
                };
                if (dataObj[ns[i]]) {
                    dataObj = dataObj[ns[i]];
                } else {
                    dataObj = '';
                    break;
                };
            };
            return dataObj;
        };
    
        //set short alias for templateX;
    if (nspace.tX === undefined && alias) { 
        nspace.tX = tX;
    };
}(templateX, true));
