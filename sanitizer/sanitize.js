export class Sanitizer {
  static sanitize(input) {
    const parser = new DOMParser(); //tells the browser, convert the text into a tree-like structure.
    const doc = parser.parseFromString(`<body>${input}</body>`, "text/html"); //returns a HTML page with the input inside the <body></body>
    const body = sanitize(doc.body);
    
    return body.innerHTML;
  }
}



function sanitize (node) {
              for (child_node of node.childNodes) { //"of" instead of "in"
                //console.log(child_node)
              sanitize(child_node);  //recursive function
              if (child_node.tagName != undefined && ALLOW_TAGS.includes(child_node.tagName)) {
                //check if the tagname is inside the allow list
                child_node.remove()
            } 
              else if(URI_SAFE_ATTRIBUTES.includes(child_node.tagName) && child_node.hasAttribute()){//sanitize the attribute:
                for (const attr of child_node.attributes){
                if (!URI_SAFE_ATTRIBUTES.includes(attr.name))
                  child_node.removeAttribute(attr.name); //only remove the attribute
                }
              }
            }
          return node;      
        }


//create a black list:
let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = ['annotation-xml',
    'audio',
    'colgroup',
    'desc',
    'foreignobject',
    'head',
    'iframe',
    'math',
    'mi',
    'mn',
    'mo',
    'ms',
    'mtext',
    'noembed',
    'noframes',
    'noscript',
    'plaintext',
    'script',
    'style',
    'svg',
    'template',
    'thead',
    'title',
    'video',
    'xmp']
  ;


  const ALLOW_TAGS = ["a","abbr","acronym","address","altglyph","altglyphdef",
    "altglyphitem","animatecolor","animatemotion","animatetransform","area","article",
    "aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas",
    "caption","center","circle","cite","clippath","code","col","colgroup","content","data","datalist",
    "dd","decorator","defs","del","desc","details","dfn","dialog","dir","div","dl","dt","element","ellipse","em",
    "feblend","fecolormatrix","fecomponenttransfer","fecomposite","feconvolvematrix","fediffuselighting",
    "fedisplacementmap","fedistantlight","fedropshadow","feflood","fefunca","fefuncb","fefuncg","fefuncr",
    "fegaussianblur","feimage","femerge","femergenode","femorphology","feoffset","fepointlight","fespecularlighting",
    "fespotlight","fetile","feturbulence","fieldset","figcaption","figure","filter","font","footer","form","g","glyph",
    "glyphref","h1","h2","h3","h4","h5","h6","head","header","hgroup","hkern","hr","html","i","image","img","input","ins",
    "kbd","label","legend","li","line","lineargradient","main","map","mark","marker","marquee","mask","math","menclose","menu",
    "menuitem","merror","metadata","meter","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded",
    "mpath","mphantom","mprescripts","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msubsup","msup","mtable","mtd","mtext",
    "mtr","munder","munderover","nav","nobr","ol","optgroup","option","output","p","path","pattern","picture","polygon","polyline",
    "pre","progress","q","radialgradient","rect","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer",
    "span","stop","strike","strong","style","sub","summary","sup","svg","switch","symbol","table","tbody","td","template",
    "text","textarea","textpath","tfoot","th","thead","time","title",
    "tr","track","tref","tspan","tt","u","ul","var","video","view","vkern","wbr"];






  /* Tags that are safe for data: URIs */  
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS =  [
    'audio',
    'video',
    'img',
    'source',
    'image',
    'track',
  ];

  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = [
    'alt',
    'class',
    'for',
    'id',
    'label',
    'name',
    'pattern',
    'placeholder',
    'role',
    'summary',
    'title',
    'value',
    'style',
    'xmlns',
  ]