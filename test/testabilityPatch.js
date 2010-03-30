jstd = jstestdriver;
dump = bind(jstd.console, jstd.console.log);

function nakedExpect(obj) {
  return expect(angular.fromJson(angular.toJson(obj)));
};

swfobject = {
  createSwf:function() {
    fail("must mock out swfobject.createSwf in test.");
  }
};

function html(content) {
  return jQuery("<div></div>").html(content);
}

function report(reportTest){
  $("#tests").children().each(function(i){
    var success = this.className == "pass";
    var strong = this.firstChild;
    var msg = strong.firstChild.nodeValue;
    var parts = msg.split(" module: ");
    var module = parts[0];
    var name = parts[1].replace(/ *$/, "");
    reportTest(success, module, name, this.nodeValue);
  });
}

MockLocation = function() {
  this.url = "http://server";
};
MockLocation.prototype.get = function(){
  return this.url;
};
MockLocation.prototype.set = function(url){
  this.url = url;
};

function childNode(element, index) {
  return jqLite(element[0].childNodes[index]);
}

function sortedHtml(element) {
  var html = "";
  (function toString(node) {
    if (node.nodeName == "#text") {
      html += escapeHtml(node.nodeValue);
    } else {
      html += '<' + node.nodeName.toLowerCase();
      var attributes = node.attributes || [];
      var attrs = [];
      for(var i=0; i<attributes.length; i++) {
        var attr = attributes[i];
        if(attr.name.match(/^ng-/) ||
            attr.value &&
            attr.value !='null' &&
            attr.value !='auto' &&
            attr.value !='false' &&
            attr.value !='inherit' &&
            attr.value !='0' &&
            attr.name !='loop' &&
            attr.name !='maxLength' &&
            attr.name !='size' &&
            attr.name !='start' &&
            attr.name !='tabIndex' &&
            attr.name.substr(0, 6) != 'jQuery') {
          // in IE we need to check for all of these.
          attrs.push(' ' + attr.name + '="' + attr.value + '"');
        }
      }
      attrs.sort();
      html += attrs.join('');
      html += '>';
      var children = node.childNodes;
      for(var j=0; j<children.length; j++) {
        toString(children[j]);
      }
      html += '</' + node.nodeName.toLowerCase() + '>';
    }
  })(element[0]);
  return html;
};

function isVisible(node) {
  var display = $(node).css('display');
  if (display == 'block') display = "";
  return display != 'none';
}

function assertHidden(node) {
  var display = node.css('display');
  assertFalse("Node should be hidden but vas visible: " + node.sortedHtml(), isVisible(node));
}

function assertVisible(node) {
  assertTrue("Node should be visible but vas hidden: " + node.sortedHtml(), isVisible(node));
}

function assertJsonEquals(expected, actual) {
  assertEquals(toJson(expected), toJson(actual));
}

function assertUndefined(value) {
  assertEquals('undefined', typeof value);
}

function assertDefined(value) {
  assertTrue(toJson(value), !!value);
}

function assertThrows(error, fn){
  var exception = null;
  try {
    fn();
  } catch(e) {
    exception = e;
  }
  if (!exception) {
    fail("Expecting exception, none thrown");
  }
  assertEquals(error, exception);
}

log = noop;
error = noop;
