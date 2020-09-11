// HTML 支持的数学符号
function strNumDiscode(str){
    str = str.replace(/&forall;/g, '∀');
    str = str.replace(/&part;/g, '∂');
    str = str.replace(/&exists;/g, '∃');
    str = str.replace(/&empty;/g, '∅');
    str = str.replace(/&nabla;/g, '∇');
    str = str.replace(/&isin;/g, '∈');
    str = str.replace(/&notin;/g, '∉');
    str = str.replace(/&ni;/g, '∋');
    str = str.replace(/&prod;/g, '∏');
    str = str.replace(/&sum;/g, '∑');
    str = str.replace(/&minus;/g, '−');
    str = str.replace(/&lowast;/g, '∗');
    str = str.replace(/&radic;/g, '√');
    str = str.replace(/&prop;/g, '∝');
    str = str.replace(/&infin;/g, '∞');
    str = str.replace(/&ang;/g, '∠');
    str = str.replace(/&and;/g, '∧');
    str = str.replace(/&or;/g, '∨');
    str = str.replace(/&cap;/g, '∩');
    str = str.replace(/&cap;/g, '∪');
    str = str.replace(/&int;/g, '∫');
    str = str.replace(/&there4;/g, '∴');
    str = str.replace(/&sim;/g, '∼');
    str = str.replace(/&cong;/g, '≅');
    str = str.replace(/&asymp;/g, '≈');
    str = str.replace(/&ne;/g, '≠');
    str = str.replace(/&le;/g, '≤');
    str = str.replace(/&ge;/g, '≥');
    str = str.replace(/&sub;/g, '⊂');
    str = str.replace(/&sup;/g, '⊃');
    str = str.replace(/&nsub;/g, '⊄');
    str = str.replace(/&sube;/g, '⊆');
    str = str.replace(/&supe;/g, '⊇');
    str = str.replace(/&oplus;/g, '⊕');
    str = str.replace(/&otimes;/g, '⊗');
    str = str.replace(/&perp;/g, '⊥');
    str = str.replace(/&sdot;/g, '⋅');
    return str;
}

//HTML 支持的希腊字母
function strGreeceDiscode(str){
    str = str.replace(/&Alpha;/g, 'Α');
    str = str.replace(/&Beta;/g, 'Β');
    str = str.replace(/&Gamma;/g, 'Γ');
    str = str.replace(/&Delta;/g, 'Δ');
    str = str.replace(/&Epsilon;/g, 'Ε');
    str = str.replace(/&Zeta;/g, 'Ζ');
    str = str.replace(/&Eta;/g, 'Η');
    str = str.replace(/&Theta;/g, 'Θ');
    str = str.replace(/&Iota;/g, 'Ι');
    str = str.replace(/&Kappa;/g, 'Κ');
    str = str.replace(/&Lambda;/g, 'Λ');
    str = str.replace(/&Mu;/g, 'Μ');
    str = str.replace(/&Nu;/g, 'Ν');
    str = str.replace(/&Xi;/g, 'Ν');
    str = str.replace(/&Omicron;/g, 'Ο');
    str = str.replace(/&Pi;/g, 'Π');
    str = str.replace(/&Rho;/g, 'Ρ');
    str = str.replace(/&Sigma;/g, 'Σ');
    str = str.replace(/&Tau;/g, 'Τ');
    str = str.replace(/&Upsilon;/g, 'Υ');
    str = str.replace(/&Phi;/g, 'Φ');
    str = str.replace(/&Chi;/g, 'Χ');
    str = str.replace(/&Psi;/g, 'Ψ');
    str = str.replace(/&Omega;/g, 'Ω');

    str = str.replace(/&alpha;/g, 'α');
    str = str.replace(/&beta;/g, 'β');
    str = str.replace(/&gamma;/g, 'γ');
    str = str.replace(/&delta;/g, 'δ');
    str = str.replace(/&epsilon;/g, 'ε');
    str = str.replace(/&zeta;/g, 'ζ');
    str = str.replace(/&eta;/g, 'η');
    str = str.replace(/&theta;/g, 'θ');
    str = str.replace(/&iota;/g, 'ι');
    str = str.replace(/&kappa;/g, 'κ');
    str = str.replace(/&lambda;/g, 'λ');
    str = str.replace(/&mu;/g, 'μ');
    str = str.replace(/&nu;/g, 'ν');
    str = str.replace(/&xi;/g, 'ξ');
    str = str.replace(/&omicron;/g, 'ο');
    str = str.replace(/&pi;/g, 'π');
    str = str.replace(/&rho;/g, 'ρ');
    str = str.replace(/&sigmaf;/g, 'ς');
    str = str.replace(/&sigma;/g, 'σ');
    str = str.replace(/&tau;/g, 'τ');
    str = str.replace(/&upsilon;/g, 'υ');
    str = str.replace(/&phi;/g, 'φ');
    str = str.replace(/&chi;/g, 'χ');
    str = str.replace(/&psi;/g, 'ψ');
    str = str.replace(/&omega;/g, 'ω');
    str = str.replace(/&thetasym;/g, 'ϑ');
    str = str.replace(/&upsih;/g, 'ϒ');
    str = str.replace(/&piv;/g, 'ϖ');
    str = str.replace(/&middot;/g, '·');
    return str;
}

// 

function strcharacterDiscode(str){
    // 加入常用解析
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&quot;/g, "'");
    str = str.replace(/&amp;/g, '&');
    // str = str.replace(/&lt;/g, '‹');
    // str = str.replace(/&gt;/g, '›');

    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');

    return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str){
    str = str.replace(/&OElig;/g, 'Œ');
    str = str.replace(/&oelig;/g, 'œ');
    str = str.replace(/&Scaron;/g, 'Š');
    str = str.replace(/&scaron;/g, 'š');
    str = str.replace(/&Yuml;/g, 'Ÿ');
    str = str.replace(/&fnof;/g, 'ƒ');
    str = str.replace(/&circ;/g, 'ˆ');
    str = str.replace(/&tilde;/g, '˜');
    str = str.replace(/&ensp;/g, '');
    str = str.replace(/&emsp;/g, '');
    str = str.replace(/&thinsp;/g, '');
    str = str.replace(/&zwnj;/g, '');
    str = str.replace(/&zwj;/g, '');
    str = str.replace(/&lrm;/g, '');
    str = str.replace(/&rlm;/g, '');
    str = str.replace(/&ndash;/g, '–');
    str = str.replace(/&mdash;/g, '—');
    str = str.replace(/&lsquo;/g, '‘');
    str = str.replace(/&rsquo;/g, '’');
    str = str.replace(/&sbquo;/g, '‚');
    str = str.replace(/&ldquo;/g, '“');
    str = str.replace(/&rdquo;/g, '”');
    str = str.replace(/&bdquo;/g, '„');
    str = str.replace(/&dagger;/g, '†');
    str = str.replace(/&Dagger;/g, '‡');
    str = str.replace(/&bull;/g, '•');
    str = str.replace(/&hellip;/g, '…');
    str = str.replace(/&permil;/g, '‰');
    str = str.replace(/&prime;/g, '′');
    str = str.replace(/&Prime;/g, '″');
    str = str.replace(/&lsaquo;/g, '‹');
    str = str.replace(/&rsaquo;/g, '›');
    str = str.replace(/&oline;/g, '‾');
    str = str.replace(/&euro;/g, '€');
    str = str.replace(/&trade;/g, '™');

    str = str.replace(/&larr;/g, '←');
    str = str.replace(/&uarr;/g, '↑');
    str = str.replace(/&rarr;/g, '→');
    str = str.replace(/&darr;/g, '↓');
    str = str.replace(/&harr;/g, '↔');
    str = str.replace(/&crarr;/g, '↵');
    str = str.replace(/&lceil;/g, '⌈');
    str = str.replace(/&rceil;/g, '⌉');

    str = str.replace(/&lfloor;/g, '⌊');
    str = str.replace(/&rfloor;/g, '⌋');
    str = str.replace(/&loz;/g, '◊');
    str = str.replace(/&spades;/g, '♠');
    str = str.replace(/&clubs;/g, '♣');
    str = str.replace(/&hearts;/g, '♥');

    str = str.replace(/&diams;/g, '♦');
    str = str.replace(/&#39;/g, '\'');
    
    str = str.replace(/&iexcl;/g, '?')
    str = str.replace(/&Aacute;/g, 'Á')
    str = str.replace(/&aacute;/g, 'á')
    str = str.replace(/&cent;/g, '￠')
    str = str.replace(/&circ;/g, 'Â')
    str = str.replace(/&acirc;/g, 'â')
    str = str.replace(/&pound;/g, '￡')
    str = str.replace(/&Atilde;/g, 'Ã')
    str = str.replace(/&atilde;/g, 'ã')
    str = str.replace(/&curren;/g, '¤')
    str = str.replace(/&Auml/g, 'Ä')
    str = str.replace(/&auml;/g, 'ä')
    str = str.replace(/&yen;/g, '￥')
    str = str.replace(/&ring;/g, 'Å')
    str = str.replace(/&aring;/g, 'å')
    str = str.replace(/&brvbar;/g, '|')
    str = str.replace(/&AElig;/g, 'Æ')
    str = str.replace(/&aelig;/g, 'æ')
    str = str.replace(/&sect;/g, '§')
    str = str.replace(/&Ccedil;/g, 'Ç')
    str = str.replace(/&ccedil;/g, 'ç')
    str = str.replace(/&uml;/g, '¨')
    str = str.replace(/&Egrave;/g, 'È')
    str = str.replace(/&egrave;/g, 'è')
    str = str.replace(/&copy;/g, '©')
    str = str.replace(/&Eacute;/g, 'É')
    str = str.replace(/&eacute;/g, 'é')
    str = str.replace(/&ordf;/g, 'a')
    str = str.replace(/&Ecirc;/g, 'Ê')
    str = str.replace(/&ecirc;/g, 'ê')
    str = str.replace(/&laquo;/g, '?')
    str = str.replace(/&Euml;/g, 'Ë')
    str = str.replace(/&euml;/g, 'ë')
    str = str.replace(/&not;/g, '?')
    str = str.replace(/&Igrave;/g, 'Ì')
    str = str.replace(/&igrave;/g, 'ì')
    str = str.replace(/&shy;/g, '/x7f')
    str = str.replace(/&Iacute;/g, 'Í')
    str = str.replace(/&iacute;/g, 'í')
    str = str.replace(/&reg;/g, '®')
    str = str.replace(/&Icirc;/g, 'Î')
    str = str.replace(/&icirc;/g, 'î')
    str = str.replace(/&macr;/g, 'ˉ')
    str = str.replace(/&Iuml;/g, 'Ï')
    str = str.replace(/&iuml;/g, 'ï')
    str = str.replace(/&deg;/g, '°')
    str = str.replace(/&ETH;/g, 'Ð')
    str = str.replace(/&ieth;/g, 'ð')
    str = str.replace(/&plusmn;/g, '±')
    str = str.replace(/&Ntilde;/g, 'Ñ')
    str = str.replace(/&ntilde;/g, 'ñ')
    str = str.replace(/&sup2;/g, '2')
    str = str.replace(/&Ograve;/g, 'Ò')
    str = str.replace(/&ograve;/g, 'ò')
    str = str.replace(/&sup3;/g, '3')
    str = str.replace(/&Oacute;/g, 'Ó')
    str = str.replace(/&oacute;/g, 'ó')
    str = str.replace(/&acute;/g, '′')
    str = str.replace(/&Ocirc;/g, 'Ô')
    str = str.replace(/&ocirc;/g, 'ô')
    str = str.replace(/&micro;/g, 'μ')
    str = str.replace(/&Otilde;/g, 'Õ')
    str = str.replace(/&otilde;/g, 'õ')
    str = str.replace(/&para;/g, '?')
    str = str.replace(/&Ouml;/g, 'Ö')
    str = str.replace(/&ouml;/g, 'ö')
    str = str.replace(/&middot;/g, '·')
    str = str.replace(/&times;/g, '&times;')
    str = str.replace(/&divide;/g, '÷')
    str = str.replace(/&cedil;/g, '?')
    str = str.replace(/&Oslash;/g, 'Ø')
    str = str.replace(/&oslash;/g, 'ø')
    str = str.replace(/&sup1;/g, '1')
    str = str.replace(/&Ugrave;/g, 'Ù')
    str = str.replace(/&ugrave;/g, 'ù')
    str = str.replace(/&ordm;/g, 'o')
    str = str.replace(/&Uacute;/g, 'Ú')
    str = str.replace(/&uacute;/g, 'ú')
    str = str.replace(/&raquo;/g, '?')
    str = str.replace(/&Ucirc;/g, 'Û')
    str = str.replace(/&ucirc;/g, 'û')
    str = str.replace(/&frac14;/g, '?')
    str = str.replace(/&Uuml;/g, 'Ü')
    str = str.replace(/&uuml;/g, 'ü')
    str = str.replace(/&frac12;/g, '?')
    str = str.replace(/&Yacute;/g, 'Ý')
    str = str.replace(/&yacute;/g, 'ý')
    str = str.replace(/&frac34;/g, '?')
    str = str.replace(/&THORN;/g, 'Þ')
    str = str.replace(/&thorn;/g, 'þ')
    str = str.replace(/&iquest;/g, '?')
    str = str.replace(/&szlig;/g, 'ß')
    str = str.replace(/&yuml;/g, 'ÿ')
    str = str.replace(/&Agrave;/g, 'À')
    str = str.replace(/&agrave;/g, 'à')

    return str;
}

function strMoreDiscode(str){
    str = str.replace(/\r\n/g,"");  
    str = str.replace(/\n/g,"");

    str = str.replace(/code/g,"wxxxcode-style");
    return str;
}

function strDiscode(str){
    str = strNumDiscode(str);
    str = strGreeceDiscode(str);
    str = strcharacterDiscode(str);
    str = strOtherDiscode(str);
    str = strMoreDiscode(str);
    return str;
}
function urlToHttpUrl(url,rep){
    
    var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if(result){
        url = rep+":"+url;
    }
    return  url;
}

module.exports = {
    strDiscode:strDiscode,
    urlToHttpUrl:urlToHttpUrl
}