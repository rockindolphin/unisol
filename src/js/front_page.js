(function($){
	$(document).ready(function() {

		var app = window.unisolidarity;
		//first page is also loaded via wordpress
		app.vue.front.news.page = 1;
		app.vue.front.interview.page = 1;
		app.vue.front.video.page = 1;

		function wp_ajax_call(action, block, link){
			var promise = new Promise(function(resolve, reject) {
				freezeShowMore(link);
				$.ajax({
					url: app.ajax_url,
					method: 'POST',
					data: {'action': action, 'page': block.page+1},
					success: function(resp){
						unfreezeShowMore(link);
						resolve( JSON.parse(resp) );
					},
					error: function(err){
						unfreezeShowMore(link);
						reject(err);
					}
				});
			});
			return promise;						
		}

		function getFrontLead(link){
			wp_ajax_call('front_lead', app.vue.front.lead, link).then(result => {
				app.vue.front.lead = result;
			}, error => {});			
		}

		function getNews(link){
			wp_ajax_call('front_news', app.vue.front.news, link).then(result => {
				result.map((article)=>{
					app.vue.front.news.items.push(article);						
				})
				app.vue.front.news.page++;						
			}, error => {});			
		}

		function getInterview(link){
			wp_ajax_call('front_interview', app.vue.front.interview, link).then(result => {
				result.map((article)=>{
					app.vue.front.interview.items.push(article);						
				})
				app.vue.front.interview.page++;						
			}, error => {});			
		}

		function getActions(link){
			wp_ajax_call('front_actions', app.vue.front.actions, link).then(result => {
				result.map((article)=>{
					app.vue.front.actions.items.push(article);						
				})
				app.vue.front.actions.page++;						
			}, error => {});			
		}

		function getAround(link){
			wp_ajax_call('front_around', app.vue.front.around, link).then(result => {
				result.map((article)=>{
					app.vue.front.around.items.push(article);						
				})
				app.vue.front.around.page++;						
			}, error => {});			
		}	

		function getVideo(link){
			wp_ajax_call('front_video', app.vue.front.video, link).then(result => {
				result.map((article)=>{
					app.vue.front.video.items.push(article);						
				})
				app.vue.front.video.page++;						
			}, error => {});			
		}

		function freezeShowMore(link){
			$(link).addClass('link--active');
		}	

		function unfreezeShowMore(link){
			$(link).removeClass('link--active');
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