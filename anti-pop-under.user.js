// ==UserScript==
// @name         Anti Pop-under
// @namespace    https://openuserjs.org/scripts/DaTechNinja/Anti_Pop-under
// @description  This user script attempts to disable pop-under scripts from working when clicking elements on a site
// @author       DaTechNinja
// @version      1.0.1
// @encoding     utf-8
// @license      https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/master/LICENSE
// @icon         https://raw.githubusercontent.com/DaTechNinja/anti-pop-under/master/logo.png
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

(function() {
    'use strict';

    $(document).ready(function() {
        var options = {
            'checkIndefinitely': false,      // Whether to check for pop-under script indefinitely or not, default: false
            'maxChecksBeforeStopping': 300,  // Maximum amount of times to check for pop-under script, default: 300
            'checkInterval': 1000            // Interval in milliseconds to check for pop-under script, default: 1000
        };

        var alreadyKilled = false;
        var checkCount = 0;

        function killPopUnder() {
            if (!options.checkIndefinitely) {
                if (++checkCount == options.maxChecksBeforeStopping) {
                    console.log('Anti Pop-under: Reached max check count of ' + options.maxChecksBeforeStopping + ', stopping...');
                    return;
                }
            }

            if (window._wm != 'undefined' && window._wm !== null) {
                window._wm = null;
                alreadyKilled = true;
                console.log('Anti Pop-under: Found and killed pop-under script!');
            }

            if (!alreadyKilled || options.checkIndefinitely) {
                setTimeout(killPopUnder, options.checkInterval);
            }
        }

        killPopUnder();
    });
})();
