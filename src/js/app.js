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

		
		var headerSearch = new Vue({
			el: '.header__search',
			data: {
				isActive: false,
			},
			methods: {
				onFocus: function(){
					this.isActive = true;
				},
				onBlur: function(){
					this.isActive = false;
				}
			}
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

		var sliderPartners = new Swiper('.slider--partners', {
			direction: 'horizontal',
			spaceBetween: 0,
			slidesPerView: 'auto'
		});					

	});	

})(jQuery);