function getAllComments(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        // $(curNode).parent('.hero').html('asdf');
        // comments.push(curNode.nodeValue);
        // curNode.nodeValue = "cat";
        // console.log(curNode.nextSibling);
        var myDiv = document.createElement("<div");
            myDiv.className = 
        curNode.parentNode.insertBefore(myDiv, curNode.nextSibling);
    }
    return comments;
}

// window.addEventListener("load", function() {
    console.log(getAllComments(document.body));
// });

// $("<div id='editorTool'><div>").insertAfter("body");

var myEditor = $("<div/>",{
    className : "myEditor"
}),
ulShops = $("<ul/>",{
    className : "shopName"
}),
shopStartRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART -->/, "g"),
shopStartReg = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+)\s\[[\w]+\]\sSTART -->/),
shopEndRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-]+\s\[[\w]+\])\sEND -->/, "g"),
bodyHTML = $('body').html(),
shopMatchs = bodyHTML.match(/<\!-- Shop:\d+_([\w-]+\s\[[\w]+\])\sSTART -->/gi);
shopLi = "";

shopLi = $.map(shopMatchs, function( val ){
     var shopNameMatch = val.match(shopStartReg),
     shopNames = $("<li/>", {
        text: shopNameMatch[1]
     }) ;
     shopNames.appendTo(ulShops);
});

ulShops.appendTo(myEditor);
myEditor.appendTo('body');

$("ul.shopName li").click(function(){
    
});
