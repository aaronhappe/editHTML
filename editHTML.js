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
                    parseHTML(myDiv);
        curNode.parentNode.insertBefore(myDiv, curNode.nextSibling);
    }
    return comments;
}

// window.addEventListener("load", function() {
    console.log(getAllComments(document.body));
// });
