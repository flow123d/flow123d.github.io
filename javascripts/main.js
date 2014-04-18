/**
 * \brief Function used for initial setting of menu
 */
$(document).ready(function() {
  var version = $("#version_selector").val();
  /* TODO: generate whole menu including set static part of menu */
  $("#flow_version").html(version);
  $("#il_inner #dynamic_menu").append('<li id="features"><a href="./' + version + '/features">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="documentation"><a href="./' + version + '/documentation.html">Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download"><a href="./' + version + '/download.html">Download</a></li>');
});

/**
 * \brief Function for changing items in menu
 */
function changeItems()
{
  var duration = 200;
  var version = $("#version_selector").val();

  $("#flow_version").fadeOut(duration, function() {
    $(this).html(version);
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #features").fadeOut(duration, function() {
    $(this).html('<a href="./' + version + '/features">Features</a>');
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #documentation").fadeOut(duration, function() {
    $(this).html('<a href="./' + version + '/documentation.html">Documentation</a>');
    $(this).fadeIn(duration);
  });

  $("#il_inner #dynamic_menu #download").fadeOut(duration, function() {
    $(this).html('<a href="./' + version + '/download.html">Download</a>');
    $(this).fadeIn(duration);
  });
}

/* TODO: add/change following links and make it more generic
  <li><a href="./1.8/changes.html">Changes</a></li>
  <li><a href="./1.8/ref_manual.html">Reference Manual</a></li>
  <li><a href="./1.8/source_doc.html">Source Documentation</a></li>
  <li><a href="./1.8/readme.html">Readme</a></li>
*/