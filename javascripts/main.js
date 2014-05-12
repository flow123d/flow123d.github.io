/**
 * \brief Function used for initial setting of menu
 */
$(document).ready(function() {
  hash = document.location.hash

  if (hash != null) {
    hash = hash.substring(1, hash.length);
  };

  var version = hash || "1.8.0";

  var root_url = "http://flow123d.github.io/";
  //var root_url = "file:///home/jiri/Flow/flow123d.github.io/";

  $("#flow_version").html(version);

  /* Generate whole menu including set static part of menu */
  $("#il_inner").append('<ul id="constant_menu"></ul>');

  $("#il_inner #constant_menu").append('<li id="home">\
    <a id="home_link" href="' + root_url + '#' + version + '">Home</a></li>');
  $("#il_inner #constant_menu").append('<li>\
    <a id="github_link" href="http://github.com/flow123d/flow123d">GitHub Page</a></li>');
  $("#il_inner #constant_menu").append('<li id="license">\
    <a id="license_link" href="'+ root_url + 'license.html#' + version + '">License</a></li>');
  $("#il_inner #constant_menu").append('<li id="ack">\
    <a id="ack_link" href="'+ root_url + 'acknowledgment.html#' + version + '">Acknowledgments</a></li>');
  $("#il_inner #constant_menu").append('<li id="contact">\
    <a id="contact_link" href="'+ root_url + 'contact.html#' + version + '">Contact</a></li>');

  $("#il_inner").append('<ul id="dynamic_menu"></ul>');

  var opt_1_8_0 = '<option value="1.8.0">Release - 1.8.0</option>';
  var opt_1_7_0 = '<option value="1.7.0">Release - 1.7.0</option>';
  var opt_1_6_0 = '<option value="1.6.0">Release - 1.6.0</option>';
  var night_builds = '<option value="night_builds">Night Builds</option>';

  if (version == '1.8.0') { opt_1_8_0 = '<option value="1.8.0" selected="selected">Release - 1.8.0</option>'; };
  if (version == '1.7.0') { opt_1_7_0 = '<option value="1.7.0" selected="selected">Release - 1.7.0</option>'; };
  if (version == '1.6.0') { opt_1_6_0 = '<option value="1.6.0" selected="selected">Release - 1.6.0</option>'; };
  if (version == 'night_builds') { night_builds = '<option value="night_builds" selected="selected">Night Builds</option>'; };

  $("#il_inner #dynamic_menu").append('\
              <li>\
                <script type="text/javascript">\
                </script>\
                <span class="version_switcher_placeholder">\
                  <select id="version_selector" onchange="changeItems()">\
                    '+ opt_1_8_0 + opt_1_7_0 + opt_1_6_0 + night_builds + '\
                  </select>\
                </span>\
              </li>');

  $("#il_inner #dynamic_menu").append('<li id="features">\
    <a id="features_link" href="'+ root_url + version + '/features#' + version + '">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download">\
    <a id="download_link" href="'+ root_url + version + '/download.html#' + version + '">Download</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="changes">\
    <a id="changes_link" href="'+ root_url + version + '/changes.html#' + version + '">Changes</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="ref_manual">\
    <a id="ref_manual_link" href="http://bacula.nti.tul.cz/~jan.brezina/flow123d_packages/' + version + '/flow123d_' + version + '_doc.pdf">User Manual</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="source_doc">\
    <a id="source_doc_link" href="http://bacula.nti.tul.cz/~jan.brezina/flow123d_packages/' + version + '/doxygen/">Source Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="readme">\
    <a id="readme_link" href="'+ root_url + version + '/readme.html#' + version + '">ReadMe</a></li>');

});

/**
 * \brief Function for changing items in menu
 */
function changeItems()
{
  var duration = 200;
  var version = $("#version_selector").val();

  var root_url = "http://flow123d.github.io/";
  //var root_url = "file:///home/jiri/Flow/flow123d.github.io/";

  /* TODO: Change content of current page too */

  document.location.hash = version;

  $("#flow_version").fadeOut(duration, function() {
    $(this).html(version);
    $(this).fadeIn(duration);
  });

  /* Change 'constant' menu */
  $("#il_inner #constant_menu #home").html('<a id="home_link" href="' + root_url + '#' + version + '">Home</a>');
  $("#il_inner #constant_menu #license").html('<a id="license_link" href="'+ root_url + 'license.html#' + version + '">License</a></li>');
  $("#il_inner #constant_menu #ack").html('<a id="ack_link" href="'+ root_url + 'acknowledgment.html#' + version + '">Acknowledgments</a></li>');
  $("#il_inner #constant_menu #contact").html('<a id="contact_link" href="'+ root_url + 'contact.html#' + version + '">Contact</a></li>');

  /* Change 'dynamic' menu */
  $("#il_inner #dynamic_menu #features").fadeOut(duration, function() {
    $(this).html('<a id="features_link" href="' + root_url + version + '/features#' + version + '">Features</a>');
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #download").fadeOut(duration, function() {
    $(this).html('<a id="download_link" href="' + root_url + version + '/download.html#' + version + '">Download</a>');
    $(this).fadeIn(duration+200);
  });

  $("#il_inner #dynamic_menu #changes").fadeOut(duration, function() {
    $(this).html('<a id="changes_link" href="' + root_url + version + '/changes.html#' + version + '">Changes</a>');
    $(this).fadeIn(duration+300);
  });

  $("#il_inner #dynamic_menu #ref_manual").fadeOut(duration, function() {
    $(this).html('<a id="ref_manual_link" href="' + root_url + version + '/user_manual.html#' + version + '">User Manual</a>');
    $(this).fadeIn(duration+400);
  });

  $("#il_inner #dynamic_menu #source_doc").fadeOut(duration, function() {
    $(this).html('<a id="source_doc_link" href="' + root_url + version + '/source_doc.html#' + version + '">Source Documentation</a>');
    $(this).fadeIn(duration+500);
  });

  $("#il_inner #dynamic_menu #readme").fadeOut(duration, function() {
    $(this).html('<a id="readme_link" href="' + root_url + version + '/readme.html#' + version + '">ReadMe</a>');
    $(this).fadeIn(duration+600);
  });
}
