describe("ScenarioSpec: Compilation", function(){
  it("should compile dom node and return scope", function(){
    var node = jqLite('<div ng-init="a=1">{{b=a+1}}</div>')[0];
    var scope = angular.compile(node);
    scope.$init();
    expect(scope.a).toEqual(1);
    expect(scope.b).toEqual(2);
  });

  it("should compile jQuery node and return scope", function(){
    var scope = angular.compile(jqLite('<div>{{a=123}}</div>')).$init();
    expect(jqLite(scope.$element).text()).toEqual('123');
  });

  it("should compile text node and return scope", function(){
    var scope = angular.compile('<div>{{a=123}}</div>').$init();
    expect(jqLite(scope.$element).text()).toEqual('123');
  });
});

describe("ScenarioSpec: Scope", function(){
  xit("should have set, get, eval, $init, updateView methods", function(){
    var scope = angular.compile('<div>{{a}}</div>').$init();
    scope.$eval("$invalidWidgets.push({})");
    expect(scope.$set("a", 2)).toEqual(2);
    expect(scope.$get("a")).toEqual(2);
    expect(scope.$eval("a=3")).toEqual(3);
    scope.$eval();
    expect(scope.$eval("$invalidWidgets")).toEqual([]);
    expect(jqLite(scope.$element).text()).toEqual('3');
  });

  xit("should have $ objects", function(){
    var scope = angular.compile('<div></div>', {a:"b"});
    expect(scope.$get('$anchor')).toBeDefined();
    expect(scope.$get('$eval')).toBeDefined();
    expect(scope.$get('$config')).toBeDefined();
    expect(scope.$get('$config.a')).toEqual("b");
    expect(scope.$get('$datastore')).toBeDefined();
  });
});

xdescribe("ScenarioSpec: configuration", function(){
  it("should take location object", function(){
    var url = "http://server/#book=moby";
    var onUrlChange;
    var location = {
        listen:function(fn){onUrlChange=fn;},
        set:function(u){url = u;},
        get:function(){return url;}
    };
    var scope = angular.compile("<div>{{$anchor}}</div>", {location:location});
    var $anchor = scope.$get('$anchor');
    expect($anchor.book).toBeUndefined();
    expect(onUrlChange).toBeUndefined();
    scope.$init();
    expect($anchor.book).toEqual('moby');
    expect(onUrlChange).toBeDefined();

    url = "http://server/#book=none";
    onUrlChange();
    expect($anchor.book).toEqual('none');
  });
});
