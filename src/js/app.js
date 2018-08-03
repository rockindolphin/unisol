(function($){
	$(document).ready(function() {

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

		//custom scrollbar
		$('.custom-scroll').each(function(){
			var self = this;
			var ps = new PerfectScrollbar(this, {wheelPropagation: true});
			$(this).data('ps', ps);
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

		//Vue
		var article = {
			id: '',
			title: '',
			excerpt: '',
			date: '',
			source: '',
			tags: [],
			categories: [],
			picture	: '',
		}

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

		var page = new Vue({
			el: '.page__body',
			data: {
				menuOpen: false,
				searchActive: false,
				languages: 'ru',
				front: {
					lead: article
				}
			},
			components: {
				'article--xl': articleXL,
			},		
			methods: {
				activateSearch: function(){
					this.searchActive = true;
				},
				deactivateSearch: function(){
					this.searchActive = false;
				},
				openMenu: function(){
					this.menuOpen = true;
				},
				closeMenu: function(){
					this.menuOpen = false;
				},
				toggleLanguage: function(lang, evt){
					this.language = lang;
					$('.header__language .list__item').addClass('list__item--hidden');
					$(evt.target).closest('.list__item').removeClass('list__item--hidden');
				},
				getArticle: function(id){
					var promise = new Promise(function(resolve, reject) {
						$.ajax({
							url: 'http://unisol/articles.php',
							method: 'POST',
							data: {'get_article': id},
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
					this.getArticle(1).then(result => {
						this.front.lead = result;
					}, error => {

					});			
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
				})
			}			
		});						

		//sliders
		var sliderPartners = new Swiper('.slider--partners', {
			direction: 'horizontal',
			spaceBetween: 0,
			slidesPerView: 'auto',			
		});



	});	

})(jQuery);