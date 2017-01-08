// ==UserScript==
// @name         Anti Pop-under
// @namespace    https://openuserjs.org/scripts/DaTechNinja/Anti_Pop-under
// @description  This user script attempts to disable pop-under scripts from working when clicking elements on a site
// @author       DaTechNinja
// @version      1.0.5
// @encoding     utf-8
// @license      https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/master/LICENSE
// @icon         https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/master/favicon.ico
// @homepage     https://github.com/DaTechNinja/anti-pop-under
// @supportURL   https://github.com/DaTechNinja/anti-pop-under/issues
// @updateURL    https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/anti-pop-under.user.js
// @downloadURL  https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/anti-pop-under.user.js
// @match        http*://*/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

/*
   DISCLAIMER: The author of this code is not responsible for any potential damages caused by its use.
*/

(function ($, undefined) {
  $(function () {
     'use strict';

    $(document).ready(function() {
        var antiPopUnderOptions = {
            'checkIndefinitely': false,      // Whether to check for pop-under script indefinitely or not, default: false
            'maxChecksBeforeStopping': 10,   // Maximum amount of times to check for pop-under script, default: 10
            'checkInterval': 1500            // Interval in milliseconds to check for pop-under script, default: 1500
        };

        var popUnderAlreadyKilled = false;
        var checkCountForPopUnder = 0;

        function killPopUnder() {
            if (!antiPopUnderOptions.checkIndefinitely) {
                if (++checkCountForPopUnder == antiPopUnderOptions.maxChecksBeforeStopping) {
                    console.log('Anti Pop-under: Reached max check count of ' + antiPopUnderOptions.maxChecksBeforeStopping + ', stopping...');
                    return;
                }
            }

            if (typeof window._wm !== 'undefined' && typeof window._wm === 'object') {
                if (typeof window._wm.format.popunder !== 'undefined' && typeof window._wm.format.popunder === 'object') {
                    window._wm = 'undefined';
                    popUnderAlreadyKilled = true;
                    console.log('Anti Pop-under: Found and killed pop-under script!');
                }
            }

            if (!popUnderAlreadyKilled || antiPopUnderOptions.checkIndefinitely) {
                setTimeout(killPopUnder, antiPopUnderOptions.checkInterval);
            }
        }

        killPopUnder();
    });
  });
})(window.jQuery.noConflict(true));
