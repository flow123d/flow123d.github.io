
/**
 * \brief Global variable with array of functions
 */
var versions = [
  {
    "id": "1.8.1",
    "name": "Release - 1.8.1",
    "short_name": "1.8.1"
  },
  {
    "id": "1.8.0",
    "name": "Release - 1.8.0",
    "short_name": "1.8.0"
  },
  {
    "id": "1.7.0",
    "name": "Release - 1.7.0",
    "short_name": "1.7.0"
  },
  {
    "id": "1.6.x",
    "name": "Release - 1.6.x",
    "short_name": "1.6.x"
  },
  {
    "id": "night_builds",
    "name": "Night Builds",
    "short_name": "Night Builds"
  },
];

/* This script is evalueted in all pages in all directories, e.g.: 1.8.0, 1.8.0/featueres
 * Thus it is simplier to use absolute paths. */
//var root_url = "http://flow123d.github.io/";
//var root_url = "file:///home/jiri/Flow/flow123d.github.io/";
var root_url = "http://localhost:4000/";

/**
 * \brief Function used for initial setting of menu
 */
$(document).ready(function() {
  /* Google Analytics */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-52302083-4', 'auto');
  ga('send', 'pageview');

  hash = document.location.hash

  if (hash != "") {
    hash = hash.substring(1, hash.length);
  } else {
    var url = window.location.href;
    var path = url.replace(root_url, "/");
    var reg = /\/[^\/]*\//;

    var values = path.match(reg);


    if(values != null) {
      console.log(values, values.length, values[0]);
      var simple_reg = /\//g;
      var ver = values[0].replace(simple_reg, "");
    }
  }

  var version = hash || ver || "1.8.0";

  $("#flow_version").html(version);

  /* Generate whole menu including set static part of menu */
  $("#il_inner").append('<ul id="constant_menu"></ul>');

  $("#il_inner #constant_menu").append('<li id="home">\
    <a id="home_link" href="' + root_url + '#' + version + '">Home</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="github_link" href="http://github.com/flow123d/flow123d">GitHub Page</a></li>');
  $("#il_inner #constant_menu").append('<li id="license">\
    <a id="license_link" href="'+ root_url + 'license/#' + version + '">License</a></li>');
  $("#il_inner #constant_menu").append('<li id="ack">\
    <a id="ack_link" href="'+ root_url + 'acknowledgment/#' + version + '">Acknowledgments</a></li>');
  $("#il_inner #constant_menu").append('<li id="contact">\
    <a id="contact_link" href="'+ root_url + 'contact/#' + version + '">Contact</a></li>');

  $("#il_inner").append('<ul id="dynamic_menu"></ul>');

  var options = "";
  for (var i = 0; i < versions.length; i++) {
    if(version == versions[i].id) {
      options += '<option value="' + versions[i].id + '" selected="selected">' + versions[i].name + '</option>';
    } else {
      options += '<option value="' + versions[i].id + '">' + versions[i].name + '</option>';
    }
  };

  $("#il_inner #dynamic_menu").append('\
              <li>\
                <script type="text/javascript">\
                </script>\
                <span class="version_switcher_placeholder">\
                  <select id="version_selector" onchange="changeItems()">\
                    '+ options + '\
                  </select>\
                </span>\
              </li>');

  $("#il_inner #dynamic_menu").append('<li id="features">\
    <a id="features_link" href="'+ root_url + version + '/features/">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download">\
    <a id="download_link" href="'+ root_url + version + '/download/">Download</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="changes">\
    <a id="changes_link" href="'+ root_url + version + '/changes/">Changes</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="ref_manual">\
    <a id="ref_manual_link" href="http://bacula.nti.tul.cz/~jan.brezina/flow123d_packages/' + version + '/flow123d_' + version + '_doc.pdf">User Manual</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="source_doc">\
    <a id="source_doc_link" href="http://bacula.nti.tul.cz/~jan.brezina/flow123d_packages/' + version + '/doxygen/">Source Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="readme">\
    <a id="readme_link" href="'+ root_url + version + '/readme/">ReadMe</a></li>');

});

/**
 * \brief Function for changing items in menu
 */
function changeItems()
{
  var duration = 200;
  var version = $("#version_selector").val();

  // Change content of current page too, when page is version specific
  var url = window.location.href;
  var path = url.replace(root_url, "/");
  var reg = /\/[^\/]*\//;

  var res = path.search(reg);
  
  var bacula_root_url="http://bacula.nti.tul.cz/~jan.brezina/flow123d_packages/" + version;     
  

  if(res != -1) {
    var new_path = path.replace(reg, version + "/");
    var new_url = root_url + new_path;

    if (new_url != url) {
      window.location.href = new_url;
    }
  } else {
    // When page is not version specific, then do fade-in fade-out of version
    document.location.hash = version;

    $("#flow_version").fadeOut(duration, function() {
      var version_short_name = "";
      for (var i = 0; i < versions.length; i++) {
        if(version == versions[i].id) {
          version_short_name = versions[i].short_name;
          break;
        }
      }
      $(this).html(version_short_name);
      $(this).fadeIn(duration);
    });

    /* Change 'constant' menu */
    $("#il_inner #constant_menu #home").html('<a id="home_link" href="' + root_url + '#' + version + '">Home</a>');
    $("#il_inner #constant_menu #license").html('<a id="license_link" href="'+ root_url + 'license.html#' + version + '">License</a></li>');
    $("#il_inner #constant_menu #ack").html('<a id="ack_link" href="'+ root_url + 'acknowledgment.html#' + version + '">Acknowledgments</a></li>');
    $("#il_inner #constant_menu #contact").html('<a id="contact_link" href="'+ root_url + 'contact.html#' + version + '">Contact</a></li>');

    /* Change 'dynamic' menu */
    $("#il_inner #dynamic_menu #features").fadeOut(duration, function() {
      $(this).html('<a id="features_link" href="' + root_url + version + '/features/">Features</a>');
      $(this).fadeIn(duration);
    });

    $("#il_inner #dynamic_menu #download").fadeOut(duration, function() {
      $(this).html('<a id="download_link" href="' + root_url + version + '/download/">Download</a>');
      $(this).fadeIn(duration+200);
    });

    $("#il_inner #dynamic_menu #changes").fadeOut(duration, function() {
      $(this).html('<a id="changes_link" href="' + root_url + version + '/changes/">Changes</a>');
      $(this).fadeIn(duration+300);
    });

    $("#il_inner #dynamic_menu #ref_manual").fadeOut(duration, function() {
    $(this).html('<a id="ref_manual_link" href="' + bacula_root_url + '/flow123d_' + version + '_doc.pdf">User Manual</a>');
      $(this).fadeIn(duration+400);
    });

    $("#il_inner #dynamic_menu #source_doc").fadeOut(duration, function() {
    $(this).html('<a id="source_doc_link" href="' + bacula_root_url + '/doxygen/">Source Documentation</a>');
      $(this).fadeIn(duration+500);
    });

    $("#il_inner #dynamic_menu #readme").fadeOut(duration, function() {
      $(this).html('<a id="readme_link" href="' + root_url + version + '/readme/">ReadMe</a>');
      $(this).fadeIn(duration+600);
    });
  }
}
