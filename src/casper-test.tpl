casper.test.begin('<%=testCaseName%>', 1, function suite(test){
	casper.start('<%=url%>', function(){
		<%=assert%>;
	});

	casper.run(function(){
		test.done();
	});
});