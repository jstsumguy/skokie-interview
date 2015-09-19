$(document).ready(function() {
  var user_id = $('#user_id').val();
  var book_id = $('#book_id').val();
  var _new_rating;
  var val_set = false;
  init();

  function init() {

    rating = $('#rating-val').val();

    white_star = document.getElementsByClassName('new-rating')[0];
    if(white_star) {
      createWhiteStarWidget(white_star);
    }

    if((!isNaN(rating)) && (rating > 0)) {
      rating_container = document.getElementsByClassName('rating')[0];
      for(i=1; i <= rating; i++) {
        star = document.createElement('span');
        star.innerHTML = '&#9733';
        star.setAttribute('id', 'star-' + i);
        rating_container.appendChild(star);
      }
    }
    ratings = document.getElementsByClassName('review');
    for(i=0; i < ratings.length; i++) {
      parent = ratings[i];
      rval = parent.getElementsByClassName('rating_value')[0].value;
      if((!isNaN(rval)) && (rval > 0)) {
          for(k=1; k <= rval; k++) {
            star = document.createElement('span');
            star.innerHTML = '&#9733';
            star.className = 'star';
            nodeBefore = parent.getElementsByClassName('review-title')[0];
            parent.insertBefore(star, nodeBefore);
        }
      } 
    }
  }

  function createWhiteStarWidget(parent) {
    console.log('creating...');
      for(i=1; i <= 5; i++) {
        star = document.createElement('span');
        star.innerHTML = '&#9734';
        star.setAttribute('id', i);
        star.setAttribute('value', i);
        star.className = 'white-star';
        parent.appendChild(star);
      }
    }

  $('.white-star').on('click', function() {
    _new_rating = setStarRating($(this));
    val_set = true;
    console.log('new rating ' + _new_rating);
    $(this).html('&#9733');
    $(this).attr('class', 'black-star');
    siblings = $(this).siblings();
    for(i=0; i < siblings.length; i++) {
      if(siblings[i].getAttribute('id') <= _new_rating) {
        siblings[i].innerHTML = '&#9733';
        siblings[i].className = 'black-star';
      }
      else {
        siblings[i].innerHTML = '&#9734';
        siblings[i].className = 'white-star';
      }
    }
  })

  $('.white-star').on('mouseover', function() {
    if(!val_set) {
      rating = $(this).attr('id');
      $(this).text('★');
      $(this).attr('class', 'black-star');
      siblings = $(this).prevAll();
      for(i=0; i < siblings.length; i++) {
        siblings[i].innerHTML = '&#9733';
        siblings[i].className = 'black-star';
      }
    }
  })

  $('.white-star').on('mouseout', function() {
    if(!val_set) {
      console.log('mouse out');
      rating = $(this).attr('id');
      $(this).html('&#9734');
      $(this).attr('class', 'white-star');
      siblings = $(this).prevAll();
      for(i=0; i < siblings.length; i++) {
        siblings[i].innerHTML = '&#9734';
        siblings[i].className = 'white-star';
      }
    }
  })

  function setStarRating(elm) {
    rval = elm.attr('id');
    elm.text('★');
    elm.attr('class', 'black-star');
    siblings = elm.prevAll();
    for(i=0; i < siblings.length; i++) {
      siblings[i].innerHTML = '&#9733';
      siblings[i].className = 'black-star';
    }
    return rval;
  }

  function createBlackStarWidget(parent, ratingVal) {
    for(i=1; i <= 5; i++) {
      star = document.createElement('span');
      if(i <= ratingVal) {
        star.innerHTML = '&#9733';
        star.className = 'star';
      }
      else {
        star.innerHTML = '&#9734';
        star.className = 'white-star';
      }
      parent.appendChild(star);
    }
  }

  $('#submit-edit-review').on('click', function(event) {
    event.preventDefault();
    data = {};
    data.title = $('#review-title').val();
    data.content = $('#review-content').val();
    data.review_id = $('#review_id').val();
    data['rating'] = _new_rating;
    console.log(JSON.stringify(data));
    $.ajax({
      url: '../../edit_review/',
      type: 'post',
      data: JSON.stringify(data),
      success: function(response) {
        if(response == 'success') {
          location.reload();
        }
      } 
    })
  })

  $('#submit-new-review').on('click', function(event) {
    event.preventDefault();
    console.log('clicked new review button');
    data = {};
    data['title'] = $('#review-title').val();
    data['content'] = $('#review-content').val();
    data['user_id'] = user_id;
    data['book_id'] = book_id;
    data['rating'] = _new_rating;
    console.log(JSON.stringify(data));

    if(data['user_id'] != null) {
      console.log('calling ajax');
      $.ajax({
        url: '../../new_review/',
        type: 'post',
        data: JSON.stringify(data),
        success: function(response) {
          if(response == 'success') {
            location.reload();
          }
        } 
      })
    }
  })

  $('#show-form').on('click', function() {
    $('.reviews-container').css('display', 'none');
    $('#show-form').css('display', 'none');
    $('#alert').css('display', 'none');
    $('div.new-review-container').fadeIn('slow');
  })

})