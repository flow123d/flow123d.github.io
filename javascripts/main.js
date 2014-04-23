/**
 * \brief Function used for initial setting of menu
 */
$(document).ready(function() {
  var version = $("#version_selector").val() || "1.8.0";

  var root_url = "http://flow123d.github.io/";
  //var root_url = "file:///home/jiri/Flow/flow123d.github.io/";

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
                  </select>\
                </span>\
              </li>');

  $("#il_inner #dynamic_menu").append('<li id="features">\
    <a id="features_link" href="'+ root_url + version + '/features">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="documentation">\
    <a id="doc_link" href="'+ root_url + version + '/documentation.html">Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download">\
    <a id="download_link" href="'+ root_url + version + '/download.html">Download</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="changes">\
    <a id="changes_link" href="'+ root_url + version + '/changes.html">Changes</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="ref_manual">\
    <a id="ref_manual_link" href="'+ root_url + version + '/ref_manual.html">Reference Manual</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="source_doc">\
    <a id="source_doc_link" href="'+ root_url + version + '/source_doc.html">Source Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="readme">\
    <a id="readme_link" href="'+ root_url + version + '/readme.html">ReadMe</a></li>');

  /* Callback function called, when user moves back or forward in history */
/* It doesn't work corectly and it doesn't work in old browsers
  window.onpopstate = function(event) {
    if(event.state) {
      var str = root_url + event.state.url + "#main_content > *";
      $("#main_content").load(str);
    }
  }
*/

  /* Load main page using AJAX */
  $('#home_link').click(function() {
    $("#main_content").load(root_url + "index.html #main_content > *");
    /*
    if(window.history && window.history.pushState) {
      var stateObj = { url: "index.html" };
      window.history.pushState(stateObj, "Flow123d", root_url + "index.html");
    }
    */
    return false;
  });

  /* Load license page using AJAX */
  $('#license_link').click(function() {
    $("#main_content").load(root_url + "license.html #main_content > *");
    /*
    if(window.history && window.history.pushState) {
      var stateObj = { url: "license.html" };
      window.history.pushState(stateObj, "Flow123d - License", root_url + "license.html");
    }
    */
    return false;
  });

  /* Load acknowledgement page using AJAX */
  $('#ack_link').click(function() {
    $("#main_content").load(root_url + "acknowledgment.html #main_content > *");
    /*
    if(window.history && window.history.pushState) {
      var stateObj = { url: "acknowledgment.html" };
      window.history.pushState(stateObj, "Flow123d - Acknowledgments", root_url + "acknowledgment.html");
    }
    */
    return false;
  });

  /* Load contact page using AJAX */
  $('#contact_link').click(function() {
    $("#main_content").load("contact.html #main_content > *");
    /*
    if(window.history && window.history.pushState) {
      var stateObj = { url: "contact.html" };
      window.history.pushState(stateObj, "Flow123d - Contact", root_url + "contact.html");
    }
    */
    return false;
  });
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

  $("#flow_version").fadeOut(duration, function() {
    $(this).html(version);
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #features").fadeOut(duration, function() {
    $(this).html('<a id="features_link" href="' + root_url + version + '/features">Features</a>');
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #documentation").fadeOut(duration, function() {
    $(this).html('<a id="doc_link" href="' + root_url + version + '/documentation.html">Documentation</a>');
    $(this).fadeIn(duration+100);
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
    $(this).html('<a id="ref_manual_link" href="' + root_url + version + '/ref_manual.html">Reference Manual</a>');
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
