/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
/*function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);*/

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

// Toggles hidden divs on button click
$('.content-section button').click(function() {
    if (!($(this).hasClass('btn-selected'))) {
        $('.content-section button').removeClass('btn-selected');
        $(this).addClass('btn-selected');
        var oldHidden = $('.hidden');
        var oldShown = $('.shown');
        oldHidden.removeClass('hidden');
        oldHidden.addClass('shown');
        oldShown.removeClass('shown');
        oldShown.addClass('hidden');
    }
})

/* Software selector */

$("#softwareType").change(function() {
    if ($(this).data('options') == undefined) 
        $(this).data('options', $('#downloadType option').clone());
    var id = $(this).val();
    var options = $(this).data('options').filter('[value=' + id + ']');
    $('#downloadType').html(options);
});
$('#softwareType').change();

// Map containing key-value pairs of buildID-filename 
var fileNameBaseMap = new Map();
fileNameBaseMap.set("bt36", "pwiz-bin-windows-x86-vc120-release-XXX.tar.bz2");
fileNameBaseMap.set("bt36i", "pwiz-setup-XXX-x86.msi");
fileNameBaseMap.set("bt83", "pwiz-bin-windows-x86_64-vc120-release-XXX.tar.bz2");
fileNameBaseMap.set("bt83i", "pwiz-setup-XXX-x86_64.msi");
fileNameBaseMap.set("bt23", "pwiz-bin-darwin-x86_64-xgcc42-release-XXX.tar.bz2");
fileNameBaseMap.set("bt17", "pwiz-bin-linux-x86_64-gcc48-release-XXX.tar.bz2");
fileNameBaseMap.set("bt81", "pwiz-src-XXX.tar.bz2");
fileNameBaseMap.set("bt81n", "pwiz-src-without-v-XXX.tar.bz2");
fileNameBaseMap.set("bt211", "libpwiz_msvc_XXX.zip");
fileNameBaseMap.set("bt212", "libpwiz_msvc_XXX.zip");
fileNameBaseMap.set("Bumbershoot_Windows_X86_64_i", "IDPicker-XXX-x86_64.msi")
fileNameBaseMap.set("ProteoWizard_Bumbershoot_Windows_X86_i", "IDPicker-XXX-x86.msi")
fileNameBaseMap.set("Bumbershoot_Windows_X86_64", "bumbershoot-bin-windows-vc120-release-XXX.tar.bz2");
fileNameBaseMap.set("ProteoWizard_Bumbershoot_Windows_X86", "bumbershoot-bin-windows-vc120-release-XXX.tar.bz2");
fileNameBaseMap.set("ProteoWizard_Bumbershoot_Linux_X86_64", "bumbershoot-bin-linux-gcc48-release-XXX.tar.bz2");
fileNameBaseMap.set("ProteoWizard_Windows_X86_64_pwizBindingsCli_ExampleProject", "pwiz-CLI-example-project.tar.bz2");

// Downloads specified software 
function download() {

    if (!document.getElementById('license-agreements').checked) {
        alert("You must accept the license agreements before downloading.");
        return;
    }

    var winInstaller = 0;
    var selected = document.getElementById('downloadType');
    var selectedData = selected.options[selected.selectedIndex];
    var downloadType = selectedData.getAttribute('data-value');
    var downloadTypeString = downloadType;

    if ((downloadType == 'bt36i') || (downloadType == 'bt83i')) {
        winInstaller = 'i';
        downloadTypeString = downloadTypeString.replace("i", "").trim();
    }

    if (downloadType == 'bt81n') 
        downloadTypeString = 'bt81';

    if (downloadType == 'Bumbershoot_Windows_X86_64_i') {
        downloadTypeString = 'Bumbershoot_Windows_X86_64';
        winInstaller = '_i';
    }

    if (downloadType == 'ProteoWizard_Bumbershoot_Windows_X86_i') {
        downloadTypeString = 'ProteoWizard_Bumbershoot_Windows_X86';
        winInstaller = '_i';
    }

    var remoteURL = "http://teamcity.labkey.org/app/rest/buildTypes/id:" + downloadTypeString + "/builds?status=SUCCESS&count=1&guest=1";

    var teamCityInfoString = "";
    var request = createCORSRequest("GET", remoteURL);
    if (request) {
        request.onload = function(){
            teamCityInfoString = request.responseText;
        };
        request.send();
    }

    var matches = teamCityInfoString.match(/build id=\"(\d+)\"/);
    var buildId = matches[1];

    /*var versionURL = "";
    if (fileNameBaseMap[downloadType].match(/IDPicker/)) 
        versionURL = "http://teamcity.labkey.org/repository/download/" + downloadTypeString + "/" + buildId + ":id/IDPICKER_VERSION?guest=1";
    else 
        versionURL = "http://teamcity.labkey.org/repository/download/" + downloadTypeString + "/" + buildId + ":id/VERSION?guest=1";
*/
    var versionURL = "http://teamcity.labkey.org/repository/download/" + downloadTypeString + "/" + buildId + ":id/VERSION?guest=1";

    var versionString = "";
    request = createCORSRequest("GET", versionURL);
    if (request) {
        request.onload = function(){
            versionString = request.responseText;
            alert(versionString);
        };
        request.send();
    }

    if (!winInstaller)
        versionString = versionString.replace(/\./g, "_");
    var downloadURL = "http://teamcity.labkey.org/repository/download/" + downloadTypeString + "/" + buildId + ":id/" + fileNameBaseMap.get(downloadType);

    downloadURL = downloadURL.replace(/XXX/g, versionString);
    //var downloadFile = baseName(downloadURL);
    //alert(downloadFile);
    downloadURL = downloadURL + "?guest=1";

    window.location=downloadURL;
}

// Cross-domain AJAX request 
// http://jquery-howto.blogspot.fr/2013/09/jquery-cross-domain-ajax-request.html#cors 
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, false);
    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

// Javascript equivalent basename function in PHP 
// http://stackoverflow.com/questions/3820381/need-a-basename-function-in-javascript 
function baseName(str) {
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}