/**
 * \brief Function used for initial setting of menu
 */
$(document).ready(function() {
  var version = $("#version_selector").val() || "1.8.0";

  //var root_url = "http://flow123d.github.io/";
  var root_url = "file:///home/jiri/Flow/flow123d.github.io/";

  $("#flow_version").html(version);

  /* Generate whole menu including set static part of menu */
  $("#il_inner").append('<ul id="constant_menu"></ul>');

  $("#il_inner #constant_menu").append('<li>\
    <a id="home_link" href="http://flow123d.github.io">Home</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="github_link" href="http://github.com/flow123d/flow123d">GitHub Page</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="license_link" href="'+ root_url + 'license.html">License</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="ack_link" href="'+ root_url + 'acknowledgment.html">Acknowledgments</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="contact_link" href="'+ root_url + 'contact.html">Contact</a></li>');

  $("#il_inner").append('<ul id="dynamic_menu"></ul>');

  $("#il_inner #dynamic_menu").append('\
              <li>\
                <script type="text/javascript">\
                </script>\
                <span class="version_switcher_placeholder">\
                  <select id="version_selector" onchange="changeItems()">\
                    <option value="1.8.0" selected="selected">Release - 1.8.0</option>\
                    <option value="1.7.0">Release - 1.7.0</option>\
                    <option value="1.6.0">Release - 1.6.0</option>\
                    <option value="night_builds">Night Builds</option>\
                  </select>\
                </span>\
              </li>');

  $("#il_inner #dynamic_menu").append('<li id="features">\
    <a id="features_link" href="'+ root_url + version + '/features">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download">\
    <a id="download_link" href="'+ root_url + version + '/download.html">Download</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="changes">\
    <a id="changes_link" href="'+ root_url + version + '/changes.html">Changes</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="ref_manual">\
    <a id="ref_manual_link" href="'+ root_url + version + '/user_manual.html">User Manual</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="source_doc">\
    <a id="source_doc_link" href="'+ root_url + version + '/source_doc.html">Source Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="readme">\
    <a id="readme_link" href="'+ root_url + version + '/readme.html">ReadMe</a></li>');

});

/**
 * \brief Function for changing items in menu
 */
function changeItems()
{
  var duration = 200;
  var version = $("#version_selector").val();

  //var root_url = "http://flow123d.github.io/";
  var root_url = "file:///home/jiri/Flow/flow123d.github.io/";

  /* TODO: Change content of current page too */

  $("#flow_version").fadeOut(duration, function() {
    $(this).html(version);
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #features").fadeOut(duration, function() {
    $(this).html('<a id="features_link" href="' + root_url + version + '/features">Features</a>');
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #download").fadeOut(duration, function() {
    $(this).html('<a id="download_link" href="' + root_url + version + '/download.html">Download</a>');
    $(this).fadeIn(duration+200);
  });

  $("#il_inner #dynamic_menu #changes").fadeOut(duration, function() {
    $(this).html('<a id="changes_link" href="' + root_url + version + '/changes.html">Changes</a>');
    $(this).fadeIn(duration+300);
  });

  $("#il_inner #dynamic_menu #ref_manual").fadeOut(duration, function() {
    $(this).html('<a id="ref_manual_link" href="' + root_url + version + '/user_manual.html">User Manual</a>');
    $(this).fadeIn(duration+400);
  });

  $("#il_inner #dynamic_menu #source_doc").fadeOut(duration, function() {
    $(this).html('<a id="source_doc_link" href="' + root_url + version + '/source_doc.html">Source Documentation</a>');
    $(this).fadeIn(duration+500);
  });

  $("#il_inner #dynamic_menu #readme").fadeOut(duration, function() {
    $(this).html('<a id="readme_link" href="' + root_url + version + '/readme.html">ReadMe</a>');
    $(this).fadeIn(duration+600);
  });
}
