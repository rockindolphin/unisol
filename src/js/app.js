(function($){
	$(document).ready(function() {

		//Vue
		var articleXL = Vue.component('article--xl',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
			],
			computed: {
				pic_bg: function () {
					return `background-image: url(${this.picture});`
				}
			},			
			template: `
				<article class="article article--xl">
					<div class="article__pic" :style="pic_bg">
						<div class="article__pic-wrapper">
							<div class="article__categories">
								<a href="tag.html" class="categories__item" v-for="category in categories">{{ category }}</a>
							</div>
							<a href="news.html" class="article__title">{{ title }}</a>
						</div>
					</div>
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
						<div class="article__tags">
							<a href="#" class="tags__item" v-for="tag in tags">{{ tag }}</a>
						</div>
					</div>
					<div class="article__excerpt">{{ excerpt }}</div>
				</article>			
			`
		});

		var articleLG = Vue.component('article--lg',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
			],
			computed: {
				pic_bg: function () {
					return `background-image: url(${this.picture});`
				}
			},			
			template: `
				<article class="article article--lg">
					<div class="article__pic" :style="pic_bg">
						<div class="article__pic-wrapper">
							<div class="article__categories">
								<a href="tag.html" class="categories__item" v-for="category in categories">{{ category }}</a>
							</div>
						</div>
					</div>
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
						<div class="article__tags">
							<a href="#" class="tags__item" v-for="tag in tags">{{ tag }}</a>
						</div>
					</div>
					<a href="news.html" class="article__title">{{ title }}</a> 
					<div class="article__excerpt">{{ excerpt }}</div>
				</article>		
			`
		});

		var articleMD = Vue.component('article--md',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
			],
			computed: {
				pic_bg: function () {
					return `background-image: url(${this.picture});`
				}
			},			
			template: `
				<article class="article article--md">
					<div class="article__pic" :style="pic_bg"></div>
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
					</div>
					<a href="news.html" class="article__title">{{ title }}</a>
				</article>	
			`
		});

		var articleSM = Vue.component('article--sm',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
			],
			computed: {
				pic_bg: function () {
					return `background-image: url(${this.picture});`
				}
			},			
			template: `
				<article class="article article--sm">
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
						<div class="article__tags">
							<a href="#" class="tags__item" v-for="tag in tags">{{ tag }}</a>
						</div>
					</div>
					<a href="news.html" class="article__title">{{ title }}</a> 
					<div class="article__info">
						<div class="article__source">{{ source }}</div>
					</div>
				</article>
			`
		});

		var articleXS = Vue.component('article--xs',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
			],
			computed: {
				pic_bg: function () {
					return `background-image: url(${this.picture});`
				}
			},			
			template: `
				<article class="article article--xs">
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
					</div>
					<a href="news.html" class="article__title">{{ title }}</a> 
					<div class="article__info">
						<div class="article__source">{{ source }}</div>
					</div>
				</article>
			`
		});			

		var page = new Vue({
			el: '.page__body',
			data: {
				menuOpen: false,
				searchActive: false,
				languages: 'ru',
				front: {
					lead: false,
					news: [],
					interview: [],
					actions: [],
					around: [],
				}
			},
			components: {
				'article--xl': articleXL,
				'article--lg': articleLG,
				'article--md': articleMD,
				'article--sm': articleSM,
				'article--xs': articleXS,
			},		
			methods: {
				activateSearch: function(){
					this.searchActive = true;
				},
				deactivateSearch: function(){
					this.searchActive = false;
				},
				toggleMenu: function(){
					this.menuOpen = !this.menuOpen;
				},
				toggleLanguage: function(lang, evt){
					this.language = lang;
					$('.header__language .list__item').addClass('list__item--hidden');
					$(evt.target).closest('.list__item').removeClass('list__item--hidden');
				},
				getArticles: function(ids){
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
				},
				getFrontLead: function(){
					this.getArticles([1]).then(result => {
						this.front.lead = result;
					}, error => {});			
				},
				getNews: function(){
					this.getArticles([2, 5, 6, 7]).then(result => {
						result.map((article)=>{
							this.front.news.push(article);						
						})
					}, error => {});			
				},
				getInterview: function(){
					this.getArticles([11,12,13,14]).then(result => {
						result.map((article)=>{
							this.front.interview.push(article);						
						})
					}, error => {});			
				},
				getActions: function(){
					this.getArticles([3,8,9,10]).then(result => {
						result.map((article)=>{
							this.front.actions.push(article);						
						})
					}, error => {});			
				},
				getAround: function(){
					this.getArticles([4,19,20,21,22,2,5,6]).then(result => {
						result.map((article)=>{
							this.front.around.push(article);						
						})
					}, error => {});			
				}												
			},
			computed: {
				noScroll: function () {
					return this.menuOpen;
				}				
			},
			mounted: function () {
				this.$nextTick(function () {
					this.getFrontLead();
					this.getNews();
					this.getInterview();
					this.getActions();
					this.getAround();
				})
			}			
		});

		//ширина скроллбара
		var scrollMeasure = $('<div>').addClass('scroll__measure').get(0);
		$('body').append(scrollMeasure);
		var scrollbarWidth = scrollMeasure.offsetWidth - scrollMeasure.clientWidth;
		$(':root').css('--scrollbar-width', scrollbarWidth+'px');
		if( scrollbarWidth > 0 ){
			$('.scroll--cutt').css({
				marginRight: -scrollbarWidth
			});		
		}
		
		//bg
		$('img[data-bg=true]').each(function(){
			var src = $(this).attr('src');
			var parent = $(this).parent();
			if( $(parent).is('picture') ){
				src = $(parent).find('img').get(0).currentSrc || $(parent).find('img').get(0).src;
				parent =  $(parent).parent();
			}
			$(parent).css({
				'background-image': `url(${src})`
			});
			$(this).hide();
		});

		//socials
		jsSocials.shares.odnoklassniki = {
			label: "Odnoklassniki",
			logo: "fa fa-odnoklassniki",
			shareUrl: "https://connect.ok.ru/offer?url={url}&title={text}",
			countUrl: '',
			getCount: function(data) {
				return '';
			}			
		}

		$("#share").jsSocials({
			shares: [			
				'facebook', 
				'vkontakte',
				'odnoklassniki',				 
				'telegram'
			],
			//url: 'http://url.to.share',
			//text: 'text to share',
			showLabel: false,
			showCount: false,
			shareIn: 'popup',
		});							

		//sliders
		var sliderPartners = new Swiper('.slider--partners', {
			direction: 'horizontal',
			spaceBetween: 0,
			slidesPerView: 'auto',			
		});

		//menu
		$('.header__menu .btn-link').click(function(){
			$(this).closest('.list__item').toggleClass('list__item--active');
		});

		//custom scrollbar
		$('.custom-scroll').each(function(){
			var self = this;
			var ps = new PerfectScrollbar(this, {wheelPropagation: true});
			$(this).data('ps', ps);
		});		

	});	

})(jQuery);