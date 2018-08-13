(function($){
	$(document).ready(function() {

		var app = window.unisolidarity;

		function wp_ajax_call(action, block){
			var promise = new Promise(function(resolve, reject) {
				$.ajax({
					url: app.ajax_url,
					method: 'POST',
					data: {'action': action, 'page': block.page+1},
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

		function getFrontLead(btn){
			wp_ajax_call('front_lead').then(result => {
				app.vue.front.lead = result;
			}, error => {});			
		}

		function getNews(btn){
			wp_ajax_call('front_news', app.vue.front.news).then(result => {
				result.map((article)=>{
					app.vue.front.news.items.push(article);						
				})
				app.vue.front.news.page++;						
			}, error => {});			
		}

		function getInterview(btn){
			wp_ajax_call('front_interview', app.vue.front.interview).then(result => {
				result.map((article)=>{
					app.vue.front.interview.items.push(article);						
				})
				app.vue.front.interview.page++;						
			}, error => {});			
		}

		function getActions(btn){
			wp_ajax_call('front_actions', app.vue.front.actions).then(result => {
				result.map((article)=>{
					app.vue.front.actions.items.push(article);						
				})
				app.vue.front.actions.page++;						
			}, error => {});			
		}

		function getAround(btn){
			wp_ajax_call('front_around', app.vue.front.around).then(result => {
				result.map((article)=>{
					app.vue.front.around.items.push(article);						
				})
				app.vue.front.around.page++;						
			}, error => {});			
		}	

		function getVideo(btn){
			wp_ajax_call('front_video', app.vue.front.video).then(result => {
				result.map((article)=>{
					app.vue.front.video.items.push(article);						
				})
				app.vue.front.video.page++;						
			}, error => {});			
		}	

		$('.link--show-more').click(function(evt){
			evt.preventDefault();
			switch( $(this).data('action') ){
				case 'front_lead':
					getFrontLead(this);
				break;
				case 'front_news':
					getNews(this);
				break;
				case 'front_interview':
					getInterview(this);
				break;
				case 'front_actions':
					getActions(this);
				break;
				case 'front_around':
					getAround(this);
				break;
				case 'front_video':
					getVideo(this);
				break;
				default:
					console.error('Unknown action');
				break;
			}
		});		

	});	

})(jQuery);		