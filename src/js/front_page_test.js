(function($){
	$(document).ready(function() {

		var page = window.unisolidarity.vue;

		function getArticles(ids){
			var dataUrl = document.location.host === 'localhost:8000' ? 'http://unisol/articles.php' : 'articles.php';
			var promise = new Promise(function(resolve, reject) {
				$.ajax({
					url: dataUrl,
					method: 'POST',
					data: {'get_article': ids.join(',')},
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
			getArticles([1]).then(result => {
				page.front.lead = result;
			}, error => {});			
		}

		function getNews(){
			getArticles([2, 5, 6, 7]).then(result => {
				result.map((article)=>{
					page.front.news.items.push(article);						
				})
			}, error => {});			
		}

		function getInterview(){
			getArticles([11,12,13,14]).then(result => {
				result.map((article)=>{
					page.front.interview.items.push(article);						
				})
			}, error => {});			
		}

		function getActions(){
			getArticles([3,8,9,10]).then(result => {
				result.map((article)=>{
					page.front.actions.items.push(article);						
				})
			}, error => {});			
		}

		function getAround(){
			getArticles([4,19,20,21,22,2,5,6]).then(result => {
				result.map((article)=>{
					page.front.around.items.push(article);						
				})
			}, error => {});			
		}

		function getVideo(){
			getArticles([15,16]).then(result => {
				result.map((article)=>{
					page.front.video.items.push(article);						
				})
			}, error => {});			
		}

		getFrontLead();
		getNews();
		getInterview();
		getActions();
		getAround();
		getVideo();	

		$('#mobileShowMore').click(function(evt){
			evt.preventDefault();
			$(this).addClass('d-none');
			$('.block--mobile-hidden').removeClass('block--mobile-hidden');
		});		

	});	

})(jQuery);		