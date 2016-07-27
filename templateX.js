var templateX = {};

(function (nspace, alias) {
    "use strict";
    var getdata = function (substring, data) {
        var dataObj = data,
            tempData,
            ns = substring.split('.'),
            i;
        
        if (ns.length === 1 && data[ns[0]]) {
            return data[ns[0]];
        } else if (!data[ns[0]]) {
            return '';
        }
        
        for (i = 0; i < ns.length; i++) {
            if (ns[i] === '') {
                dataObj = data;
                continue;
            }
            if (dataObj[ns[i]]) {
                dataObj = dataObj[ns[i]];
            } else {
                dataObj = '';
                break;
            }
        }
        
        return dataObj;
    },
    
    
        tX = nspace.render = function (template, data) {
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
        
            return tX(opt.strBegining + getdata(opt.substring, data) + opt.strEnding, data);
        };
    
        //set short alias for templateX;
    if (nspace.tX === undefined && alias) { 
        nspace.tX = tX;
    }
}(templateX, true));
