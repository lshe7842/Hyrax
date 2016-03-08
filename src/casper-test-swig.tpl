casper.test.begin('{{testCaseName}}', {{numOfAsserts}}, function suite(test){
	casper.start('{{url}}');

	casper.then(function(){
		this.waitFor(function check(){
			return this.evaluate(function(){
				return document.querySelector('{{signalOk}}');
			});
		}, function then(){
			{% for expect in expects %}
				{% autoescape false %}test.{{expect}};{% endautoescape %}
			{% endfor %}
		}, function timeout(){
			this.echo('Loading home page timeout after 10s. Check if the app is down.').exit();
		}, 10000);
	});

	{% for action in actions %}
		casper.then(function(){
			{% if action._waitForPrevious %}
				this.wait({{action._waitForPrevious}}, function(){
			{% endif %}
			
				this.{{action.type}}('{{action.target}}' {% if action._selector %}, {% autoescape false %}{{action._selector}} {% endautoescape %}{% endif %});

				{% for expect in action.expects %}
					{% autoescape false %}test.{{expect}};{% endautoescape %}
				{% endfor %}

			{% if action._waitForPrevious %}
				});
			{% endif %}
		});

		{# casper.then(function(){
			this.waitFor(function check(){
				return this.evaluate(function(){
					return document.querySelector('{{action.signalOk}}');
				});
			}, function then(){
				{% for expect in action.expects %}
					{% autoescape false %}test.{{expect}};{% endautoescape %}
				{% endfor %}
			}, function timeout(){
				this.echo('{{action.timeoutMsg}}').exit();
			}, 60000);
		}); #}
	{% endfor %}

	casper.run(function(){
		test.done();
	});
});