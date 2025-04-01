export class Sanitizer {
  static sanitize(input) {
    const parser = new DOMParser(); //tells the browser, convert the text into a tree-like structure.
    let doc = parser.parseFromString(`<body>${input}</body>`, "text/html"); //returns a HTML page with the input inside the <body></body>
    let next = parser.parseFromString(doc.documentElement.innerHTML, "text/html");
    while(doc.documentElement.innerHTML != next.documentElement.innerHTML){
      doc = next;
      next = parser.parseFromString(doc.documentElement.innerHTML, "text/html");
    } 
    const body = sanitize(doc.body);

    return body.innerHTML;
  }
}



function sanitize(node) {
  console.log(node);
  const Node_clone = [...node.childNodes]; //clone the list
  
  for (const child_node of Node_clone) { //"of" instead of "in"
    //console.log(child_node)
    if (child_node == undefined) continue;
    sanitize(child_node);  //recursive function
    if (child_node.tagName != undefined && !ALLOW_TAGS.includes(child_node.tagName.toLowerCase())) {
      //check if the tagname is inside the allow list
      child_node.remove()
    }
    else if (child_node.nodeType == 1) //
      {//sanitize the attribute:
      const Node_Attributes = [...child_node.attributes];
      for (const attr of Node_Attributes) {
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


const ALLOW_TAGS = ["a", "abbr", "acronym", "address", "altglyph", "altglyphdef",
  "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "area", "article",
  "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas",
  "caption", "center", "circle", "cite", "clippath", "code", "col", "colgroup", "content", "data", "datalist",
  "dd", "decorator", "defs", "del", "desc", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "ellipse", "em",
  "feblend", "fecolormatrix", "fecomponenttransfer", "fecomposite", "feconvolvematrix", "fediffuselighting",
  "fedisplacementmap", "fedistantlight", "fedropshadow", "feflood", "fefunca", "fefuncb", "fefuncg", "fefuncr",
  "fegaussianblur", "feimage", "femerge", "femergenode", "femorphology", "feoffset", "fepointlight", "fespecularlighting",
  "fespotlight", "fetile", "feturbulence", "fieldset", "figcaption", "figure", "filter", "font", "footer", "form", "g", "glyph",
  "glyphref", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hkern", "hr", "html", "i", "image", "img", "input", "ins",
  "kbd", "label", "legend", "li", "line", "lineargradient", "main", "map", "mark", "marker", "marquee", "mask", "math", "menclose", "menu",
  "menuitem", "merror", "metadata", "meter", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded",
  "mpath", "mphantom", "mprescripts", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msubsup", "msup", "mtable", "mtd", "mtext",
  "mtr", "munder", "munderover", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "path", "pattern", "picture", "polygon", "polyline",
  "pre", "progress", "q", "radialgradient", "rect", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer",
  "span", "stop", "strike", "strong", "style", "sub", "summary", "sup", "svg", "switch", "symbol", "table", "tbody", "td", "template",
  "text", "textarea", "textpath", "tfoot", "th", "thead", "time", "title",
  "tr", "track", "tref", "tspan", "tt", "u", "ul", "var", "video", "view", "vkern", "wbr"];






/* Tags that are safe for data: URIs */
let DATA_URI_TAGS = null;
const DEFAULT_DATA_URI_TAGS = [
  'audio',
  'video',
  'img',
  'source',
  'image',
  'track',
];

/* Attributes safe for values like "javascript:" */
let URI_SAFE_ATTRIBUTES = ["accent", "accent-height", "accentunder", "accept", "accumulate", "action", "additive", "align", "alignment-baseline", "alt", "amplitude", "ascent", "attributename", "attributetype", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "azimuth", "background", "basefrequency", "baseline-shift", "begin", "bevelled", "bgcolor", "bias", "border", "by", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "clip", "clip-path", "clip-rule", "clippathunits", "close", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cols", "colspan", "columnlines", "columnsalign", "columnspan", "controls", "controlslist", "coords", "crossorigin", "cx", "cy", "d", "datetime", "decoding", "default", "denomalign", "depth", "diffuseconstant", "dir", "direction", "disabled", "disablepictureinpicture", "disableremoteplayback", "display", "displaystyle", "divisor", "download", "draggable", "dur", "dx", "dy", "edgemode", "elevation", "encoding", "enctype", "end", "enterkeyhint", "exponent", "face", "fence", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "for", "frame", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradienttransform", "gradientunits", "headers", "height", "hidden", "high", "href", "hreflang", "id", "image-rendering", "in", "in2", "inputmode", "integrity", "intercept", "ismap", "k", "k1", "k2", "k3", "k4", "kernelmatrix", "kernelunitlength", "kerning", "keypoints", "keysplines", "keytimes", "kind", "label", "lang", "largeop", "length", "lengthadjust", "letter-spacing", "lighting-color", "linethickness", "list", "loading", "local", "loop", "low", "lquote", "lspace", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "mask", "maskcontentunits", "maskunits", "mathbackground", "mathcolor", "mathsize", "mathvariant", "max", "maxlength", "maxsize", "media", "method", "min", "minlength", "minsize", "mode", "movablelimits", "multiple", "muted", "name", "nonce", "noshade", "notation", "novalidate", "nowrap", "numalign", "numoctaves", "offset", "opacity", "open", "operator", "optimum", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "pattern", "patterncontentunits", "patterntransform", "patternunits", "placeholder", "playsinline", "points", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "preservealpha", "preserveaspectratio", "primitiveunits", "pubdate", "r", "radiogroup", "radius", "readonly", "refx", "refy", "rel", "repeatcount", "repeatdur", "required", "restart", "result", "rev", "reversed", "role", "rotate", "rowalign", "rowlines", "rows", "rowspacing", "rowspan", "rquote", "rspace", "rx", "ry", "scale", "scope", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "seed", "selected", "selection", "separator", "separators", "shape", "shape-rendering", "size", "sizes", "slope", "slot", "span", "specularconstant", "specularexponent", "spellcheck", "spreadmethod", "src", "srclang", "srcset", "start", "startoffset", "stddeviation", "step", "stitchtiles", "stop-color", "stop-opacity", "stretchy", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "subscriptshift", "summary", "supscriptshift", "surfacescale", "symmetric", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "text-anchor", "text-decoration", "text-rendering", "textlength", "title", "transform", "transform-origin", "translate", "type", "u1", "u2", "unicode", "usemap", "valign", "value", "values", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "viewbox", "visibility", "voffset", "width", "word-spacing", "wrap", "writing-mode", "x", "x1", "x2", "xchannelselector", "xlink:href", "xlink:title", "xml:id", "xml:space", "xmlns", "xmlns:xlink", "y", "y1", "y2", "ychannelselector", "z", "zoomandpan"];
