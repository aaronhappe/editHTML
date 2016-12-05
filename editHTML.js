var myEditor = $("<div/>",{
    class : "myEditor"
}),
ulShops = $("<ul/>",{
    class : "shopName"
}),
shopStartRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART -->/, "g"),
shopStartReg = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+)\s\[[\w]+\]\sSTART -->/),
shopEndRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-]+\s\[[\w]+\])\sEND -->/, "g"),
bodyHTML = $('body').html(),
shopMatchs = bodyHTML.match(shopStartRegGlobal),
shopLi = "",
$shopLi = $("ul.shopName li"),
$selectedShop = "";

shopLi = $.map(shopMatchs, function( val ){
     var shopNameMatch = val.match(shopStartReg),
     shopNames = $("<li/>", {
        text: shopNameMatch[1]
     }) ;
     shopNames.appendTo(ulShops);
});

ulShops.appendTo(myEditor);
myEditor.appendTo('body');

function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}

function getAllComments(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {

        var comment = curNode.nodeValue;
        comment = comment.trim();
        if ("End BlueKai Tag" == comment) {
            console.log("bingo!");
        }
    }
    return comments;
}

$shopLi.click(function(){
    $selectedShop = $(this).text();
});

// window.addEventListener("load", function() {
    getAllComments(document.body);
// });
