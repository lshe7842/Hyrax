casper.test.begin('{{testCaseName}}', {{numOfAsserts}}, function suite(test){
	casper.start('{{url}}', function(){
		{% for expect in expects %}
			{% autoescape false %}test.{{expect}};{% endautoescape %}
		{% endfor %}
	});

	casper.run(function(){
		test.done();
	});
});