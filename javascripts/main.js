console.log('This would be the main JS file.');

$(document).ready(function() {
  var version = $("#version_selector").val();
  $("#flow_version").html(version);
  $("#il_inner #dynamic_menu").append('<li id="features"><a href="./' + version + '/features">Features</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="documentation"><a href="./' + version + '/documentation.html">Documentation</a></li>');
  $("#il_inner #dynamic_menu").append('<li id="download"><a href="./' + version + '/download.html">Download</a></li>');
});

function changeItems()
{
  var version = $("#version_selector").val();

  $("#flow_version").fadeOut(500, function() {
    $(this).html(version);
    $(this).fadeIn(500);
  });

  $("#il_inner #dynamic_menu #features").fadeOut(10, function() {
    $(this).html('<a href="./' + version + '/features">Features</a>');
    $(this).fadeIn(500);
  });

  $("#il_inner #dynamic_menu #documentation").fadeOut(10, function() {
    $(this).html('<a href="./' + version + '/documentation.html">Documentation</a>');
    $(this).fadeIn(500);
  });

  $("#il_inner #dynamic_menu #download").fadeOut(10, function() {
    $(this).html('<a href="./' + version + '/download.html">Download</a>');
    $(this).fadeIn(500);
  });
}
/* TODO: add/change following links
  <li><a href="./1.8/changes.html">Changes</a></li>
  <li><a href="./1.8/ref_manual.html">Reference Manual</a></li>
  <li><a href="./1.8/source_doc.html">Source Documentation</a></li>
  <li><a href="./1.8/readme.html">Readme</a></li>
*/