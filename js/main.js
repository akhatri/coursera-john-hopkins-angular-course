(function ($) {

  console.log('fired js');

  if (typeof window.jQuery) {
    console.log('jQuery loaded');
  } else {
    console.log('no jQuery loaded')
  }

  //===================
  // Mobile Navigation
  //===================

  // cache variables
  var $mobileMenu = $('.mobile-icon');
  var $navMobile = $('.navbar-mobile');
  var $navMobileClose = $('.close-btn');

  $mobileMenu.on('click', function (e) {
    $navMobile.addClass('is-open');
  });

  $navMobileClose.on('click', function (e) {
    $navMobile.removeClass('is-open');
  });

  //===============
  // Pricing Slider
  //===============

  // cache variables
  var $pricingSliderAmount = $('.price-slider-amount');
  var $largeAmount = $('.price-slider-large-amount');

  // fee types
  var $initialAmount = $('#initial-amount');
  var $fixedFee = $('#fixed-fee');
  var $expenseFee = $('#expense-fee');
  var $businessFee = $('#business-fee');
  var $etpFee = $('#etp-fee');
  var $totalFee = $('#total-fee');

  // click event variables
  var $feeOption = $('.fee-option');

  //===============
  // Click handlers
  //===============

  $feeOption.on('click', function (e) {
    var self = $(this);
    var selectedFee = self.data('fee');
    $feeOption.removeClass('is-active');
    self.addClass('is-active');
    $fixedFee.text(selectedFee);
    $('input[type="range"]').trigger('change');
  });

  $('input[type="range"]').rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

    // Callback function
    onInit: function () {
      console.log('initialised');
      var $initialValue = $('input[type="range"]').val();
      $initialAmount.text($initialValue);
    },

    // Callback function
    onSlide: function (position, value) {
      console.log('slide triggered');
      $initialAmount.text(value);

      var calculateExpenseFee = function () {
        var percentageRate = 0.200 / 100;
        var result = ((value * percentageRate) / 12);
        return result.toFixed(2);
      };

      var calculateBusinessFee = function () {
        var result = (+($fixedFee.text()) + +($expenseFee.text()));
        return result.toFixed(2);
      };

      var calculateETPFee = function () {
        var percentageRate = 0.250 / 100;
        var result = ((value * percentageRate) / 12);
        return result.toFixed(2);
      };

      var calculateTotalFee = function () {
        var result = (+($businessFee.text()) + +($etpFee.text()));
        return result.toFixed(2);
      };

      var calculateAnnualFee = function () {
        var result = (+($totalFee.text()) * 12) / value;
        return (result * 100).toFixed(2) + '%';
      };

      $expenseFee.text(calculateExpenseFee);
      $businessFee.text(calculateBusinessFee);
      $etpFee.text(calculateETPFee);
      $totalFee.text(calculateTotalFee);
      $('#total-fee-annual').text(calculateAnnualFee);
    },

    // Callback function
    onSlideEnd: function (position, value) {}
  });

  //============
  // Form Submit
  //============

  var $joinWaitlist = $('#join-waitlist');
  var $waitlistState = $('.waitlist-state');

  $joinWaitlist.submit(function (e) {
    e.preventDefault();
    var self = $(this);
    var $email = $('#email').val();
    var $errorMessage = $('.error-message');
    //var values = self.serialize();
    console.log('clicked submit do ajax stuff here');

    if (validateEmail($email)) {
      console.log("Email is correct format");
      $errorMessage.removeClass('is-active');
      $('#waitlist-button').addClass('disabled');

      var url = 'https://u17quk6to2.execute-api.ap-southeast-2.amazonaws.com/v1/waitlist';
      //http://localhost:4000/data/sample.json
      // if nothing specified, source and referral code to be empty string
      // process the email address to waitlist
      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: url,
          dataType: 'json',
          data: JSON.stringify({
            email: $email,
            source: 'z=ozbargain',
            referral_code: '7WamFWXsVj',
            referrer: document.referrer
          }) 
        })
        .done(function (data) {
          console.log(data, 'passed data is here');
          var user = data;
          // redirect the user to the thank you page
          console.log(user.position);
          console.log(user.email);
          console.log(user.referral_url);
          var position = user.position;
          var email = user.email;
          var referral_url = user.referral_url;

          // output to HTML view
          $('.position').text(position);
          $('.email').text(email);
          $('.referral_url').text(referral_url);

          $waitlistState.addClass('is-completed');
        })
        .fail(function () {
          console.log('error connecting to server');
          $errorMessage.text('Network Error').addClass('is-active');
          $waitlistState.removeClass('is-completed');
        })
        .always(function () {
          console.log('request complete');
        });

    } else {
      console.log("Email is not correct format return false.");
      $errorMessage.addClass('is-active');
      $waitlistState.removeClass('is-completed');
    }
    //console.log(values)
  });

  /**
   * Validate email function with regualr expression
   *
   * If email isn't valid then return false
   *
   * @param email
   * @return Boolean
   */
  function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if (!valid) {
      return false;
    } else {
      return true;
    }
  }

})(jQuery);