$(document).ready( function(){
  $('[data-social-icon~=facebook]').mouseover( function(){
    $('.follow').addClass('facebook');
  });
  $('[data-social-icon~=facebook]').mouseout( function(){
    $('.follow').removeClass('facebook');
  });
  $('[data-social-icon~=twitter]').mouseover( function(){
    $('.follow').addClass('twitter');
  });
  $('[data-social-icon~=twitter]').mouseout( function(){
    $('.follow').removeClass('twitter');
  });
  $('[data-social-icon~=gplus]').mouseover( function(){
    $('.follow').addClass('gplus');
  });
  $('[data-social-icon~=gplus]').mouseout( function(){
    $('.follow').removeClass('gplus');
  });
  $('[data-social-icon~=linkedin]').mouseover( function(){
    $('.follow').addClass('linkedin');
  });
  $('[data-social-icon~=linkedin]').mouseout( function(){
    $('.follow').removeClass('linkedin');
  });
  $('[data-social-icon~=youtube]').mouseover( function(){
    $('.follow').addClass('youtube');
  });
  $('[data-social-icon~=youtube]').mouseout( function(){
    $('.follow').removeClass('youtube');
  });
})