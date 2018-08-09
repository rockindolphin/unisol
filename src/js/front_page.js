(function($){
	$(document).ready(function() {

		var app = window.unisolidarity;

		function wp_ajax_call(action){
			var promise = new Promise(function(resolve, reject) {
				$.ajax({
					url: app.ajax_url,
					method: 'POST',
					data: {'action': action},
					success: function(resp){
						resolve( JSON.parse(resp) );
					},
					error: function(err){
						reject(err);
					}
				});
			});
			return promise;						
		}

		function getFrontLead(){
			wp_ajax_call('front_lead').then(result => {
				app.vue.front.lead = result;
			}, error => {});			
		}

		function getNews(){
			wp_ajax_call('front_news').then(result => {
				result.map((article)=>{
					page.front.news.push(article);						
				})
			}, error => {});			
		}

		function getInterview(){
			wp_ajax_call('front_interview').then(result => {
				result.map((article)=>{
					page.front.interview.push(article);						
				})
			}, error => {});			
		}

		function getActions(){
			wp_ajax_call('front_actions').then(result => {
				result.map((article)=>{
					page.front.actions.push(article);						
				})
			}, error => {});			
		}

		function getAround(){
			wp_ajax_call('front_around').then(result => {
				result.map((article)=>{
					page.front.around.push(article);						
				})
			}, error => {});			
		}

		//getFrontLead();
		//getNews();
		//getInterview();
		//getActions();
		//getAround();				

	});	

})(jQuery);		