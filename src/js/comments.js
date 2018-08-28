document.addEventListener('DOMContentLoaded', function(){
	
	if( document.querySelector('#disqus_thread') ){
		var d = document, s = d.createElement('script');

		s.src = '//unisolidarity-1.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	}
	
});