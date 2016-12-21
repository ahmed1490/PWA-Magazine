(function () {
  'use strict';

  var bodyElement = document.querySelector('body');
  var headerElement = document.querySelector('header');
  var metaTagTheme = document.querySelector('meta[name=theme-color]');

  //After DOM Loaded
  document.addEventListener('DOMContentLoaded', function(event) {
    //On initial load to check connectivity
    if (!navigator.onLine) {
      updateNetworkStatus();
    }

    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
  });

  //To update network status
  function updateNetworkStatus() {
    if (navigator.onLine) {
      metaTagTheme.setAttribute('content', '#0288d1');
      bodyElement.classList.remove('app__offline');
    }
    else {
      toast('App is offline');
      metaTagTheme.setAttribute('content', '#6b6b6b');
      bodyElement.classList.add('app__offline');
    }
  }
})();