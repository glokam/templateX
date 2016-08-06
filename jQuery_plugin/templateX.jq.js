(function(){
    var data = null,
        tempData = null,
        ltReg = /</g,
        gtReg = />/g;
    
    $.fn.templateX = function (dataObj, selector, string) {
        var template, 
            str = (!string && typeof string !== 'string')? this.html() : string;
            
            data = dataObj;
            template = _render(str);
            if (selector) {
                return $(selector).html(template);
            } else {
                return template;
            }
        };
    
        function getdata(opt) {
            var tag = opt.substring,
                firstChar = tag.charAt(0);
            if (firstChar === '%') return _ifStatement(opt, true);
            if (firstChar === '^') return _ifStatement(opt, false);
            if (firstChar === '#') return _iterate(opt);
            if (firstChar === '&') return opt.strBegining + _renderTag(opt.substring.slice(1), true) + opt.strEnding;
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
                
                if (indexEnd === -1) { new Error("Missing tag for {{" + opt.substring + "}}!");}
                
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
        function _renderTag(tagStr, confide) {
            var dataObj = data,
                ns = tagStr.split('.'),
                i;            
            
            for (i = 0; i < ns.length; i++) {
                if (ns[i] === '') {
                    dataObj = (tempData)? tempData : data;
                    continue;
                };
                if (dataObj[ns[i]]) {
                    dataObj = dataObj[ns[i]];
                } else {
                    dataObj = '';
                    break;
                };
            };
            
            if (typeof dataObj === 'string' && !confide) {
                dataObj = dataObj.replace(ltReg, '&lt;').replace('>', '&gt;');
            }
            
            return dataObj;
        };
    
}(jQuery))