casper.test.begin('{{testCaseName}}', {{numOfAsserts}}, function suite(test){
	casper.start('{{url}}');

	casper.waitFor(function check(){
		return this.evaluate(function(){
			return document.querySelector('{{signalOk}}');
		});
	}, function then(){
		{% for expect in expects %}
			{% autoescape false %}test.{{expect}};{% endautoescape %}
		{% endfor %}
	});

	casper.run(function(){
		test.done();
	});
});