casper.test.begin('{{testCaseName}}', {{numOfAsserts}}, function suite(test){
	casper.start('{{url}}'{% if clearCookies %}, function(){
		phantom.clearCookies();
	}{% endif %});

	casper.then(function(){
		this.waitFor(function check(){
			return this.evaluate(function(){
				{% autoescape false %}return document.querySelector("{{signalOk}}"){% endautoescape %};
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
			
				{% if action.script %}
					{% autoescape false %}this.evaluate(function(){ {{action.script}} });{% endautoescape %}
				{% endif %}

				{% if action.print %}
					{% autoescape false %}this.echo("{{action.print}}");{% endautoescape %}
				{% endif %}

				{% if action._selector %}
					{% autoescape false %}this.{{action._selector}}{% endautoescape %};
				{% endif %}

				{% for expect in action.expects %}
					{% autoescape false %}test.{{expect}};{% endautoescape %}
				{% endfor %}

			{% if action._waitForPrevious %}
				});
			{% endif %}
		});

		{% if action.after %}
			{% if action.after.signalOk %}
				{# casper.then(function(){ #}
					{% if action.after.waitFor %}

						{% autoescape false %}casper.waitForSelector("{{action.after.signalOk}}"{% if action.after.print %}{% autoescape false %}, function(){
						this.echo("{{action.after.print}}");
						}{% endautoescape %}{% elseif action.after._prints %}{% autoescape false %}, function(){
							{% for print in action.after._prints %}
								{% autoescape false %}this.echo({{print}});{% endautoescape %}
							{% endfor %}
						}{% endautoescape %}{% endif %}{% if action.after.timeoutMsg %}, function timeout(){
							this.echo('{{action.after.timeoutMsg}}').exit();
						}{% endif %}{% if action.after._timeout %}, {{action.after._timeout}}{% endif %}){% endautoescape %};
					
					{% else %}

						casper.waitFor(function check(){
							return this.evaluate(function(){
								{% autoescape false %}return document.querySelector("{{action.after.signalOk}}"){% if action.after._signalOkWith %}{{action.after._signalOkWith}}{% endif %}{% endautoescape %};
							});
						}, function then(){
							{% for expect in action.after.expects %}
								{% autoescape false %}test.{{expect}};{% endautoescape %}
							{% endfor %}

							{% if action.after.print %}
								{% autoescape false %}this.echo("{{action.after.print}}");{% endautoescape %}
							{%  endif %}

							{% if action.after._prints %}
								{% for print in action.after._prints %}
									{% autoescape false %}this.echo({{print}});{% endautoescape %}
								{% endfor %}
							{%  endif %}							

							{% if action.after.script %}
								{% autoescape false %}this.evaluate(function(){ {{action.after.script}} });{% endautoescape %}
							{% endif %}
						}{% if action.after.timeoutMsg %}, function timeout(){
							this.echo('{{action.after.timeoutMsg}}').exit();
						}{% endif %}{% if action.after._timeout %}, {{action.after._timeout}}{% endif %});

					{% endif %}

				{# }); #}
			{% endif %}
		{% endif %}
	{% endfor %}

	casper.run(function(){
		test.done();
	});
});