/*
 * @Author
 * Mike Biscante
 * @Organization
 * CodeGeeks
 **/

$(document).ready(function(){
	$('.carousel').carousel({
		interval: 5000,
		cycle: true,
		pause: "false"
	});

	$('[data-toggle="tooltip"]').hover(function(){
		$(this).tooltip('toggle');
	});

	$('#main > .main-panel:first-child').addClass('current');
	$('#main > .mian-panel:first-child').addClass('first');
	$('#main > .main-panel:last-child').addClass('last');


	$('#next').click(function() {
	    $('.current').removeClass('current').hide()
	        .next().fadeIn().addClass('current');
	    if ($('.current').hasClass('last')) {
	        $('#next').attr('disabled', true);
	        $('.vote').attr('disabled', null);
	    }
	    $('#prev').attr('disabled', null);
		if($('.no-one').hasClass('current')){
				$('.pagination > button').removeClass('active');
				$('.pagination #one').addClass('active');
				$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-two').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #two').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-three').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #three').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-four').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #four').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-five').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #five').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-six').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #six').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-seven').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #seven').addClass('active');
			$('#prev').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-eight').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #eight').addClass('active');
			$('#next').attr('disabled', true);
			$('h1.heading').text('Television Stations').fadeIn();
		}
	});

	$('#prev').click(function() {
	    $('.current').removeClass('current').hide()
	        .prev().fadeIn().addClass('current');
	    if ($('.current').hasClass('first')) {
	        $('#prev').attr('disabled', true);
	    }
	    $('#next').attr('disabled', null);
	    if($('.no-one').hasClass('current')){
				$('.pagination > button').removeClass('active');
				$('.pagination #one').addClass('active');
				$('#prev').attr('disabled', true);
				$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-two').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #two').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-three').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #three').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-four').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #four').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('Entertainment Programs').fadeIn();
		}
		else if($('.no-five').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #five').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-six').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #six').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-seven').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #seven').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('News Programs').fadeIn();
		}
		else if($('.no-eight').hasClass('current')){
			$('.pagination > button').removeClass('active');
			$('.pagination #eight').addClass('active');
			$('#next').attr('disabled', null);
			$('h1.heading').text('Television Stations').fadeIn();
		}
	});

	$('#one').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-one').addClass('current').fadeIn();
	});
	$('#two').on('click',function(){
		console.log('')
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-two').addClass('current').fadeIn();
	});
	$('#three').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-three').addClass('current').fadeIn();
	});
	$('#four').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-four').addClass('current').fadeIn();
	});
	$('#five').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-five').addClass('current').fadeIn();
	});
	$('#six').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-six').addClass('current').fadeIn();
	});
	$('#seven').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-seven').addClass('current').fadeIn();
	});
	$('#eight').on('click',function(){
		$('.pagination > button').removeClass('active');
		$(this).addClass('active');
		$('.current').removeClass('current').hide();
		$('.no-eight').addClass('current').fadeIn();
	});
});

jQuery(document).ready(function() {
    var duration = 50;
    jQuery('.pagination button').click(function(event) {
        event.preventDefault();
        jQuery( '#main' )
        .css('opacity', '0.5')
        .animate({
        	scrollTop: 0,
        	opacity: 1,
        	borderSpacing: -360
        }, {
        	step: function(now,fx) {
		      $(this).css('-webkit-transform','rotate('+now+'deg)');
		      $(this).css('-moz-transform','rotate('+now+'deg)');
		      $(this).css('transform','rotate('+now+'deg)');
    		}, duration: 1000,
        }, 1000)

        jQuery( 'body' )
        	.animate({scrollTop: 300}, 1000)
        return false;
    })
});
