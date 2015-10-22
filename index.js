var self = require('sdk/self');

//// filewrite

//Components.utils.import("resource://gre/modules/osfile.jsm")

var { Cc, Ci, Cu, components
} = require("chrome");

const {	TextDecoder, TextEncoder, OS } = Cu.import("resource://gre/modules/osfile.jsm", {});



//var pth = OS.Path.join("tmpDir", 'text.txt');
function fwrite(Text, stat) {
//pth = "/tmp/text.txt"
if (stat == 1) {
	pth = "/tmp/youtube.txt" ;
	}
else {
	pth = "/tmp/booru.txt" ;
	}

OS.File.open(pth, {write: true, append: true}).then(valOpen => {
//    console.log('valOpen:', valOpen);
    var txtToAppend = Text + "\n" ;
    var txtEncoded = TextEncoder().encode(txtToAppend);
    valOpen.write(txtEncoded).then(valWrite => {
//        console.log('valWrite:', valWrite);
        valOpen.close().then(valClose => {
//            console.log('valClose:', valClose);
//            console.log('successfully appended');
        });
    });
});
}

//--------func
//function test(text) {console.log(text + "\tOK\n"); return text;}


//menuitem
var cm = require("sdk/context-menu");
var url = require("./lib/url");
var punycode = require("./lib/punycode");

function uparse(urlp) {
//console.log("\n\nuparse OK\n");
//console.log( url.parse(urlp, true).hostname + "\n\n");

	if (url.parse(urlp, true).hostname == "gelbooru.com") {
	 var exitcode = url.parse(urlp, true).query.tags;
//	 console.log("booru --- " + exitcode + "\n-----\n");
	 fwrite(exitcode, 0);
	}
	else if (url.parse(urlp, true).hostname == "www.youtube.com") {
	 var exitcode = url.parse(urlp, true).query.v;
//	 console.log("youtube-dl " + exitcode + "\n" );
//	 exitcode = "youtube-dl " + exitcode;
	 fwrite(exitcode, 1);
	}

return exitcode;
}

var menuItem = cm.Item({

  label: "Getlink",
  context: cm.SelectorContext("A"),
  contentScript: 'self.on("click", function (node, data) {' +
//                 '  console.log("Click! " + node.href);' +
//		 '  qstr = new QSTR(url.query); ' +
//		 '  result = qstr.p' +
//		 '  console.log("test: " + query );' +
		 '  self.postMessage(node.href); ' +
                 '  return true;' +
                 '});',

  onMessage: 	function (link) {
//		fwrite(link + "\n");
//		console.log(link + " onMessage DEBUG");
		uparse(link);
//		console.log( uparse(link) ) ;
		}
});

