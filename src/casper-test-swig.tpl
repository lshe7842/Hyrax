casper.test.begin('{{testCaseName}}', {{numOfAsserts}}, function suite(test){
	casper.start('{{url}}', function(){
		{% for assert in asserts %}
			{% autoescape false %}{{assert}};{% endautoescape %}
		{% endfor %}
	});

	casper.run(function(){
		test.done();
	});
});