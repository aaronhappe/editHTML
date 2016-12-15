// create elements
var myEditor = $("<div/>",{
    class : "myEditor"
}),
ulShops = $("<ul/>",{
    class : "shopName"
}),
shopRecordWrap = $("<div/>", {
    class : "shopRecordWrap"
}),
shopRecordWrap2 = $("<div/>", {
    class : "shopRecordEnd"
}),

// regular expressions
shopStartRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART -->/, "g"),
shopStartReg = new RegExp(/<\!-- (Shop:\d+_[\w-_/d]+\s\[[\w]+\]\sSTART) -->/),
shopStartNameReg = new RegExp(/Shop:\d+_([\w-_/d]+)\s\[[\w]+\]\sSTART/),
shopGeneralReg = new RegExp(/Shop:\d+_([\w-]+\s\[[\w]+\])\s/),

//perform operation to get value
bodyHTML = $('body').html(),
shopMatchs = bodyHTML.match(shopStartRegGlobal),

//declare vars
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
        var selectedShopData = $(this).data('sR');
        var shopClassName = $(this).text();
        var generalShop = selectedShopData.match(shopGeneralReg);
        var endShop = generalShop[0] += "END";
        funcs.getAllComments(document.body, selectedShopData, endShop, shopClassName);
    });
}

funcs.findFullShopName = function(){
    $.map(shopMatchs, function( val ){
         var shopNameMatch = val.match(shopStartReg);
         funcs.createUserShopList(shopNameMatch);
    });
}

funcs.createUserShopList = function (shopNameMatch) {
        shopNameMatch = shopNameMatch[1];
        var shopName = shopNameMatch.match(shopStartNameReg);
        var shopNames = $("<li/>", {
        text: shopName[1],
        data: {'sR' : shopNameMatch},
        });
        shopNames.appendTo(ulShops);
}

funcs.insertShopContainer = function(curNode, comment, selectedShopData, endShop, shopClassName) {
    if (comment == selectedShopData){
        shopRecordWrap.insertAfter($(curNode));
        shopRecordWrap.addClass(shopClassName);
        // $('.shopRecordWrap').addClass(shopClassName);
    } 
    if (comment == endShop) {
        shopRecordWrap2.insertAfter($(curNode));
        shopRecordWrap2.addClass(shopClassName);
        var shopContent = $(".shopRecordWrap." + shopClassName).nextUntil(".shopRecordEnd." + shopClassName);
        $(".shopRecordWrap").html(shopContent);
        $(".shopRecordEnd").remove();
    }
}

funcs.filterNone = function() {
    return NodeFilter.FILTER_ACCEPT;
}

funcs.getAllComments = function(rootElem, selectedShopData, endShop, shopClassName) {
    console.log(shopClassName);
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, funcs.filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        var comment = curNode.nodeValue;
        comment = comment.trim();
        funcs.insertShopContainer(curNode, comment, selectedShopData, endShop, shopClassName);
    }
}



// window.addEventListener("load", function() {
    funcs.init();
// });
