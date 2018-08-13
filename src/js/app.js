(function($){
	$(document).ready(function() {

		//Vue
		var icon = Vue.component('icon',{
			props: [
				'name',
			],
			computed: {
				icon_class: function () {
					return `icon icon--active icon--${this.name}`
				},
				xlink: function () {
					return `#${this.name}`
				}
			},						
			template: `
				<svg :class="icon_class"">
					<use :xlink:href="xlink"></use>
				</svg>
			`
		});

		var articleXL = Vue.component('article--xl',{
			props: [
				'title',
				'excerpt',
				'date',
				'source',
				'tags',
				'categories',
				'picture',
				'link'
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
								<a href="category.link" class="categories__item" v-for="category in categories">{{ category.name }}</a>
							</div>
							<a href="news.html" class="article__title">{{ title }}</a>
						</div>
					</div>
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
						<div class="article__tags">
							<a :href="tag.link" class="tags__item" v-for="tag in tags">{{ tag.name }}</a>
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
				'youtube',
				'link'
			],
			computed: {
				pic_bg: function () {
					return this.youtube ? '' : `background-image: url(${this.picture});`;
				},
				youtube_url: function () {
					return this.youtube ? `https://www.youtube.com/embed/${this.youtube}` : '#';
				}
			},			
			template: `
				<article class="article article--lg">
					<div class="article__pic" :style="pic_bg">
						<div class="article__video" v-if="youtube">
							<iframe :src="youtube_url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="true" :title="title"></iframe>
						</div>
						<div class="article__pic-wrapper" v-else>
							<div class="article__categories">
								<a href="category.link" class="categories__item" v-for="category in categories">{{ category.name }}</a>
							</div>
						</div>
					</div>
					<div class="article__info">
						<div class="article__date">{{ date }}</div>
						<div class="article__tags">
							<a :href="tag.link" class="tags__item" v-for="tag in tags">{{ tag.name }}</a>
						</div>
					</div>
					<a :href="link" class="article__title">{{ title }}</a> 
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
				'link'
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
					<a :href="link" class="article__title">{{ title }}</a>
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
				'link'
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
							<a :href="tag.link" class="tags__item" v-for="tag in tags">{{ tag.name }}</a>
						</div>
					</div>
					<a :href="link" class="article__title">{{ title }}</a> 
					<div class="article__info">
						<a class="article__source" :href="source.link" target="_blank" rel="nofollow" v-if="source">{{ source.name }}</a>
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
				'link'
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
					<a :href="link" class="article__title">{{ title }}</a> 
					<div class="article__info">
						<a class="article__source" :href="source.link" target="_blank" rel="nofollow" v-if="source">{{ source.name }}</a>
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
					news: {
						items: [],
						page: 0,
					},
					interview: {
						items: [],
						page: 0,
					},
					actions: {
						items: [],
						page: 0,
					},
					around: {
						items: [],
						page: 0,
					},
					video: {
						items: [],
						page: 0,
					},
				}
			},
			components: {
				'article--xl': 	articleXL,
				'article--lg': 	articleLG,
				'article--md': 	articleMD,
				'article--sm': 	articleSM,
				'article--xs': 	articleXS,
				'icon': 		icon,
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
			},
			computed: {
				noScroll: function () {
					return this.menuOpen;
				}				
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


		var theme_path,
			ajax_url;
		try {
			theme_path = WP_variables.theme_path + '/';
			ajax_url = WP_variables.ajax_url;
		} catch (err) {
			console.log(err);
		}
		window.unisolidarity = {
			vue: page,
			theme_path: theme_path,
			ajax_url: ajax_url,
		}


	});	

})(jQuery);