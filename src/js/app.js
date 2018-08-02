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

		//sliders
		var sliderPartners = new Swiper('.slider--partners', {
			direction: 'horizontal',
			spaceBetween: 0,
			slidesPerView: 'auto'
		});

		//Vue
		var page = new Vue({
			el: '.page__body',
			data: {
				menuOpen: false,
				searchActive: false
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
				}
			},
			computed: {
				noScroll: function () {
					return this.menuOpen;
				}				
			}
		});						

	});	

})(jQuery);