// /**
//  * \brief global variable with array of functions
//  */

/* description:
 {
 "id":           <subdirectory on web and on bacula, these two should match>
 "package_dir":  <bacula location>
 "web_dir":      <web location>
 "version":      <version identifier used in package names>
 "name":         <displayable name for this version, such as 'release 1.8.2'>
 "show_links":   [<OPTIONAL, list items links, which will be visible, by default, all links are visible>]
 }
 */
var versions = [
    {
        "id":          "release-2.1.0",
        "package_dir": "2.1.0_release",
        "web_dir":     "2.1.0",
        "version":     "2.1.0",
        "name":        "release 2.1.0",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme']
    },
    {
        "id":          "release-1.8.3",
        "package_dir": "1.8.3_release",
        "web_dir":     "1.8.3",
        "version":     "1.8.3",
        "name":        "release 1.8.3",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme']
    },
    {
        "id":          "release-1.8.2",
        "package_dir": "1.8.2_release",
        "web_dir":     "1.8.2_release",
        "version":     "1.8.2",
        "name":        "release 1.8.2",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme']
    },
    {
        "id":          "release-1.8.1",
        "package_dir": "1.8.1",
        "web_dir":     "1.8.1",
        "version":     "1.8.1",
        "name":        "release 1.8.1",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme']
    },
    {
        "id":          "release-1.8.0",
        "package_dir": "1.8.0",
        "web_dir":     "1.8.0",
        "version":     "1.8.0",
        "name":        "release 1.8.0",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme']
    },
    {
        "id":          "release-1.7.0",
        "package_dir": "1.7.0",
        "web_dir":     "1.7.0",
        "version":     "1.7.0",
        "name":        "release 1.7.0",
        "show_links":  ['download', 'features', 'manual', 'readme']
    },
    {
        "id":          "release-1.6.x",
        "package_dir": "1.6.x",
        "web_dir":     "1.6.x",
        "version":     "1.6.x",
        "name":        "release 1.6.x",
        "show_links":  ['download', 'features', 'manual', 'readme']
    },
    {
        "id":          "dev-master",
        "package_dir": "0.0.master",
        "web_dir":     "0.0.master",
        "version":     "0.0.master",
        "name":        "dev master",
        "show_links":  ['download', 'features', 'changes', 'manual', 'source', 'readme', 'htmldoc']
    },
];

/** platforms when using placeholders */
var plarforms = {
    "linux_64":   "linux_x86_64",
    "linux_32":   "linux_x86_32",
    "windows_64": "windows_x86_64",
    "windows_32": "windows_x86_32",
    "bacula":     "http://flow.nti.tul.cz/packages",
    "_":          "{bacula}/{package_dir}/flow123d_{version}_",
    "__":         "{bacula}/{package_dir}/flow123d_{version}_"
};

var missing_map = {
    '_all':       ['download', 'features', 'changes', 'manual', 'source', 'readme', 'htmldoc'],
    'download':   '#download',
    'features':   '#features',
    'changes':    '#changes',
    'ref_manual': '#ref_manual',
    'manual':     '#ref_manual',
    'source_doc': '#source_doc',
    'source':     '#source_doc',
    'readme':     '#readme',
    'htmldoc':    '#htmldoc'
}

var buildTemplate = "<span class='build-info' title='{rel}'>builded {build} ({rel})</span>";
var errorTemplate = "<span class='build-info no-info'>build date unknown</span>";

/** function will return current object based on currentVersion value */
function getVersion (property, value) {
    var prop = property || 'id';
    return $.grep (versions, function (e) {
        var val = value || currentVersion;
        return e[prop] == val;
    })[0];
};

/** function will return selecter version based on url */
function getURLVersion () {
    var parts = window.location.pathname.split ('/');
    parts = parts.filter (function (n) {
        return n != ""
    });
    if (!parts.length)
        return null;

    return getVersion ('web_dir', parts[0]);
};

/** return true is location is homepage */
function isHomepage () {
    return window.location.pathname == '/'
}

/** function will replace placeholders with version currents object value */
function replacePlaceholders (str) {
    var objects = _.toArray (arguments).slice (1);
    if (objects.length == 0)
        objects.push (getVersion ());

    _.each (objects, function (element, index, list) {
        str = str.replace (/{(\w+)}/g, function (all, name) {
            return element[name] || all;
        });
    });
    return str;
}

/** function will set proper href link on all dynamic_menu items */
function updateLinks () {
    var delay = 0;
    $ ('#dynamic_menu a').each (function (index, item) {
        var newHref = replacePlaceholders ($ (item).data ().url, getVersion(), plarforms);
        newHref = replacePlaceholders ($ (item).data ().url, getVersion(), plarforms);
        if ($ (item).attr ('href') != newHref) {
            $ (item).attr ('href', newHref);
        } else {
            //ignore change
        }
    });
}
/** populate select component by json specification */
function populateDropDown () {
    $ ('#version_selector option').remove ();
    versions.forEach (function (item, index) {
        $ ('#version_selector').append ($ ('<option>', {
            value: item.id,
            text:  item.name.capitalizeFirstLetter ()
        }));
    });
}

/** updates all links */
function updateAll () {
    updateLinks ();
    // $('#flow_version').html(getVersion().name.toUpperCase());
    $ ('#version_selector').val (currentVersion);

    // hide some links
    var show = getVersion ().show_links || missing_map._all;
    var hide = _.difference (missing_map._all, show);
    var showSelector = _.map (show, function (item) {
        return missing_map[item];
    }).join ();
    var hideSelector = _.map (hide, function (item) {
        return missing_map[item];
    }).join ();


    // hide elements
    var duration = 0.2;
    TweenMax.killAll ();
    TweenMax.to (hideSelector, duration, {'alpha': 0, display: 'none'});
    TweenMax.to (showSelector, duration, {'alpha': 0, display: 'none'});

    TweenMax.staggerTo (showSelector, duration, {'alpha': 1, display: 'list-item', 'delay': duration}, duration / 4);

    // change version
    var newVersion = (getURLVersion() || getVersion()).name;
    if ($ ('#flow_version').html() != newVersion) {
        TweenMax.to ($ ('#flow_version'), 0.2, {'opacity': 1, 'delay': 0.2});
        TweenMax.to ($ ('#flow_version'), 0.2, {
            'opacity': 0, 'onCompleteParams': [newVersion], 'onComplete': function (version) {
                $ ('#flow_version').html (version);
            }
        });
    }
}

/** returns true wheter given section contains given section */
function hasSection (version, section) {
    return !version.show_links ? true : version.show_links.indexOf (section) != -1;
}

/** handler when item in dropdown is changed */
function changeItems () {
    if (isHomepage()) {
        currentVersion = $ ('#version_selector').val ();
        document.location.hash = '#' + currentVersion;
    } else {
        var newVersion =  $ ('#version_selector').val ();
        var version = getVersion ('id', newVersion);
        var paths = window.location.pathname.split ('/');
        paths = paths.filter (function(n){ return n != "" });
        var section = paths[1];

        // move user to selected version
        if  (hasSection(version, section)) {
            window.location = '/' + version.web_dir + '/' + section + '/';
        }else {
            window.location = '/#' + version.id;
        }
    }
}

/** switches current version to one in url's hash part */
function updateVersionByHash () {
    var hash = document.location.hash;
    var version = getVersion ('id', hash.slice (1));
    if (version != undefined && hash.length > 1) {
        currentVersion = version.id;
        updateAll ();
        return true;
    }
    return false;
}

/** prototype for capitalizing first letter in string */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt (0).toUpperCase () + this.slice (1);
};

/** default selected version id, preffered version by url */
var currentVersion = "release-2.1.0";
currentVersion = getURLVersion() ? getURLVersion().id : getVersion().id;

/** on document ready do fade-in effect, populate dropdown and replace placeholders */
$ (document).ready (function () {
    populateDropDown ();

    if (getURLVersion () != null) {
        currentVersion = getURLVersion ().id;
        updateAll ();
    } else if (!updateVersionByHash ())
        updateAll ();

    $ (window).bind ('hashchange', function (e) {
        updateVersionByHash ();
    });

    $ ('.download-section a').each (function (index, item) {
        var $item = $ (item);
        var ulData = $item.parent().parent().data();

        var href = $item.attr ('href');
        href = replacePlaceholders (href, ulData, getURLVersion (), plarforms);
        href = replacePlaceholders ( href, ulData, getURLVersion (), plarforms);
        $item.attr ('href', href);

        var version = $item.data ('version') || '';
        version = replacePlaceholders (version, ulData, getURLVersion (), plarforms);
        version = replacePlaceholders (version, ulData, getURLVersion (), plarforms);

        if (version.length) {
            $item.attr ('data-version', version);
            $.getJSON (version, function (data) {
                data['rel'] = moment(data['build'], 'DD-MM-YYYY h:m:s').fromNow();
                $item.parent ().append (replacePlaceholders(buildTemplate, data));
            }).error (function () {
                $item.parent ().append (errorTemplate);
            });
        }
    });

    // focus select element on start-up
    setTimeout (document.getElementById('version_selector').focus(), 1000);
});
