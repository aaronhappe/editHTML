// create elements
var myEditor = $("<div/>",{
    class : "myEditor"
}),
ulShops = $("<ul/>",{
    class : "shopName"
}),

// regular expressions
shopStartRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART -->/, "g"),
shopStartReg = new RegExp(/<\!-- (Shop:\d+_[\w-_/d]+\s\[[\w]+\]\sSTART) -->/),
shopEndRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-]+\s\[[\w]+\])\sEND -->/, "g"),

//perform operation to get value
bodyHTML = $('body').html(),
shopMatchs = bodyHTML.match(shopStartRegGlobal),

//declare vars
shopLi = "",
$selectedShop = "",
shopNameMatchArr = [],
funcs = {};

funcs.init = function(){

    funcs.findFullShopName();

    funcs.createUI();

    funcs.clickHandlers();
}

funcs.createUI = function(){
    ulShops.appendTo(myEditor);
    myEditor.appendTo('body');


    $("ul.shopName li").css({
        'cursor' : 'pointer',
        'paddingTop' : '1em'
    });
}

funcs.clickHandlers = function() {
    $("ul.shopName li").click(function(){
        $selectedShop = $(this).text();
        funcs.getAllComments(document.body, $selectedShop);
    });
}

funcs.findFullShopName = function(){
    $.map(shopMatchs, function( val ){
         var shopNameMatch = val.match(shopStartReg);
         funcs.createShopLi(shopNameMatch);
    });
}

funcs.createShopLi = function (shopNameMatch) {
     var shopNames = $("<li/>", {
        text: shopNameMatch[1],
     });
     shopNames.appendTo(ulShops);
}

funcs.filterNone = function() {
    return NodeFilter.FILTER_ACCEPT;
}

funcs.getAllComments = function(rootElem, selectedShop) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, funcs.filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {

        var comment = curNode.nodeValue;
        comment = comment.trim();
        if (comment == selectedShop){
            console.log(selectedShop);
        }
    }
}

// window.addEventListener("load", function() {
    funcs.init();
// });
