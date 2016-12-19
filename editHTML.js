// create elements
var myEditor = $("<div/>", {
        class: "myEditor"
    }),
    ulShops = $("<ul/>", {
        class: "shopName"
    }),
    shopRecordWrap = $("<div/>", {
        class: "shopRecordWrap"
    }),
    shopRecordWrap2 = $("<div/>", {
        class: "shopRecordEnd"
    }),
    userForm = $("<form name='userForm' action='' method='get'/>", {
        class: 'userForm',
    }),
    userTextField = $("<textarea rows='10' cols='100'/>", {
        class: "userText",
    }),
    submitText = $("<button/>", {
        class: "editorButton",
        text: "submit"
    }),

    // regular expressions
    shopStartRegGlobal = new RegExp(/<\!-- Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART -->/, "g"),
    shopStartReg = new RegExp(/<\!-- (Shop:\d+_[\w-_/d]+\s\[[\w]+\]\sSTART) -->/),
    shopStartNameReg = new RegExp(/Shop:\d+_([\w-_/d]+\s\[[\w]+\])\sSTART/),
    shopGeneralReg = new RegExp(/Shop:\d+_([\w-]+\s\[[\w]+\])\s/),

    //perform operation to get value
    bodyHTML = $('body').html(),
    shopMatchs = bodyHTML.match(shopStartRegGlobal),

    //declare vars
    setUpFunc = {};
    editorFunc = {};

setUpFunc.init = function() {

    setUpFunc.findFullShopName();

    setUpFunc.createUI();

    setUpFunc.clickHandlers();
}

setUpFunc.createUI = function() {
    ulShops.appendTo(myEditor);
    myEditor.appendTo('body');

    $("ul.shopName li").css({
        'cursor': 'pointer',
        'paddingTop': '1em'
    });
}

setUpFunc.clickHandlers = function() {
    $("ul.shopName li").click(function() {
        var selectedShopData = $(this).data('sR');
        var shopClassName = $(this).text();
        shopClassName = shopClassName.replace(/(\s\[)/i, '');
        shopClassName = shopClassName.replace(/\]/i, '');
        var generalShop = selectedShopData.match(shopGeneralReg);
        var endShop = generalShop[0] += "END";
        setUpFunc.getAllComments(document.body, selectedShopData, endShop, shopClassName);
    });

    $( "p" ).click(function( event ) {
          event.stopPropagation();
          // Do something
    });
}

setUpFunc.findFullShopName = function() {
    $.map(shopMatchs, function(val) {
        var shopNameMatch = val.match(shopStartReg);
        setUpFunc.createUserShopList(shopNameMatch);
    });
}

setUpFunc.createUserShopList = function(shopNameMatch) {
    shopNameMatch = shopNameMatch[1];
    var shopName = shopNameMatch.match(shopStartNameReg);
    var shopNames = $("<li/>", {
        text: shopName[1],
        data: {
            'sR': shopNameMatch
        },
    });
    shopNames.appendTo(ulShops);
}

setUpFunc.insertShopContainer = function(curNode, comment, selectedShopData, endShop, shopClassName) {
    if (comment == selectedShopData) {
        shopRecordWrap.insertAfter($(curNode));
        shopRecordWrap.addClass(shopClassName);
    }
    if (comment == endShop) {
        shopRecordWrap2.insertAfter($(curNode));
        shopRecordWrap2.addClass(shopClassName);
        var shopContent = $(".shopRecordWrap." + shopClassName).nextUntil(".shopRecordEnd." + shopClassName);
        $(".shopRecordWrap").html(shopContent);
        $(".shopRecordEnd").remove();
        editorFunc.init(shopClassName);
    }
}

setUpFunc.filterNone = function() {
    return NodeFilter.FILTER_ACCEPT;
}

setUpFunc.getAllComments = function(rootElem, selectedShopData, endShop, shopClassName) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, setUpFunc.filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        var comment = curNode.nodeValue;
        comment = comment.trim();
        setUpFunc.insertShopContainer(curNode, comment, selectedShopData, endShop, shopClassName);
    }
}

editorFunc.init = function(shopClassName) {
    $('ul.shopName').hide();
    userTextField.appendTo('.myEditor');
    submitText.appendTo('.myEditor');

    var clickedP = $('.shopRecordWrap.' + shopClassName + ' p');
    clickedP.css('cursor', 'pointer')
    clickedP.click(function(e) {
        var target = e.target;
        $(target).addClass('editing');
        var userHTML = $(this).html();
        $('.myEditor textarea').val(userHTML);
        $('.editorButton').click(function() {
            changedUserTxt = $('.myEditor textarea').val();
            $('.editing').html(changedUserTxt);
        });
    });
}

// window.addEventListener("load", function() {
setUpFunc.init();
// });