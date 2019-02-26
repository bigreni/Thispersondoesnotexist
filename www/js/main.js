    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            notFirstUse();
        }
    }

  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-1683858134373419/7790106682', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9249695405712287/7860890916'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-1683858134373419/7790106682', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9249695405712287/6711460771'
    };
  }

    function initApp() {
        if (!AdMob) { alert('admob plugin not ready'); return; }
        initAd();
        //display interstitial at startup
        loadInterstitial();
    }
    function initAd() {
        var defaultOptions = {
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black', // color name, or '#RRGGBB'
            isTesting: false // set to true, to receiving test ad for testing purpose
        };
        AdMob.setOptions(defaultOptions);
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function (data) {
            document.getElementById('screen').style.display = 'none';     
        });
        document.addEventListener('onAdLoaded', function (data) { });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { });
        document.addEventListener('onAdDismiss', function (data) { 
            document.getElementById('screen').style.display = 'none';     
        });
    }

    function createSelectedBanner() {
          AdMob.createBanner({adId:admobid.banner});
    }

    function loadInterstitial() {
        if ((/(android|windows phone)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: true });
        } else if ((/(ipad|iphone|ipod)/i.test(navigator.userAgent))) {
            //AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: true });
            document.getElementById("screen").style.display = 'none';     
        } else
        {
            document.getElementById("screen").style.display = 'none';     
        }
    }

   function checkFirstUse()
    {
        window.ga.startTrackerWithId('UA-88579601-21', 1, function(msg) {
            window.ga.trackView('Home');
        });
        initApp();
        d = new Date();
        var img = document.getElementById("imgPerson");
        img.src = "https://www.thispersondoesnotexist.com/image?" + d.getTime();

        //askRating();
        //document.getElementById('screen').style.display = 'none';     
    }

   function notFirstUse()
    {
        document.getElementById('screen').style.display = 'none';     
        d = new Date();
        var img = document.getElementById("imgPerson");
        img.src = "https://www.thispersondoesnotexist.com/image?" + d.getTime();
    }

function askRating()
{
  AppRate.preferences = {
  openStoreInApp: true,
  useLanguage:  'en',
  usesUntilPrompt: 10,
  promptAgainForEachNewVersion: true,
  storeAppURL: {
                ios: '1296111737',
                android: 'market://details?id=com.persondoesnotexist.free'
               }
};
 
AppRate.promptForRating(false);
}

function reload()
{
    document.getElementById('screen').style.display = 'block';     
    initApp();
    d = new Date();
    var img = document.getElementById("imgPerson");
    img.src = "https://www.thispersondoesnotexist.com/image?" + d.getTime();
}

function appShare(){
                 window.plugins.socialsharing.share('https://itunes.apple.com/app/id1453309507 ' + 'https://play.google.com/store/apps/details?id=com.persondoesnotexist.free', null, null, null);
};

function capturePhoto() {
     var imageLink;
     navigator.screenshot.save(function (error, res) {
         if (error) {
             console.error(error);
         } else {
             //For android
             imageLink = res.filePath;

             if ((/(android|windows phone)/i.test(navigator.userAgent))) {
                 window.plugins.socialsharing.share(null, null, 'file://' + imageLink, null);
             } else if ((/(ipad|iphone|ipod)/i.test(navigator.userAgent))) {
                 window.plugins.socialsharing.share(null, null, imageLink, null)
             } else {
               return;
             }

             //For iOS
         }
     }, 'jpg', 50, 'myScreenShot');
    };