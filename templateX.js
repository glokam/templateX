"use strict";
var templateX = {};

(function (nspace, alias) {
    
    var data = null,
        
        //Public method render(html string, object with data )
        
        tX = nspace.render = function (template, dataObj) {
            data = dataObj;
            return _render(template);
        },
        getdata = function (opt) {
            return opt.strBegining + _renderTag(opt.substring) + opt.strEnding;
        };
    
        //Private utilities
    
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
    
        //set short alias for templateX;
    if (nspace.tX === undefined && alias) { 
        nspace.tX = tX;
    };
}(templateX, true));
