for (var _i = 0, _a = window.flow123d.releaseList; _i < _a.length; _i++) {
    var item = _a[_i];
    item.visible = {};
    for (var _b = 0, _c = item.links; _b < _c.length; _b++) {
        var link = _c[_b];
        item.visible[link] = true;
    }
    item.hasPage = function (page) {
        if (page == 'download')
            page = 'legacyDownload';
        return this.visible[page];
    };
}
var default_hash = window.location.hash;
var version_regex = new RegExp('\\/releases' +
    '\\/([\\d\\.]+)' +
    '\\/([a-zA-Z0-9-_]+)' +
    '(\\/.+)?', 'gm');
var matches = version_regex.exec(document.location.pathname);
if (matches) {
    window.flow123d.version = matches[1];
    window.flow123d.subpage = matches[2];
    var item = window.flow123d.releaseList.filter(function (o) { return o.version == window.flow123d.version; })[0];
    if (!item) {
        window.flow123d.version = window.flow123d.defaultVersion;
    }
}
else {
    window.flow123d.version = window.flow123d.defaultVersion;
    window.flow123d.subpage = window.flow123d.defaultSubpage;
}
var updateScope = function ($scope) {
    $scope.item = window.flow123d.releaseList.filter(function (o) { return o.version == $scope.version; })[0];
    $scope.versionRoot = window.flow123d.packageRoot + '/' + $scope.item.name;
    $scope.tags = $scope.item.tags ? $scope.item.tags.join(' ') : '';
    $scope.windows = $scope.item.tags && $scope.item.tags.includes('exe-installer') ? 'exe' : 'zip';
    if ($scope.item.docker_image) {        
        $scope.docker_image = $scope.item.docker_image
    } else {
        $scope.docker_image = $scope.item.version
    }
    setTimeout(function () {
        if ($scope.item.visible.download) {
            $('.json-datetime').each(function (index, item) {
                $.getJSON($(item).attr('data-url')).done(function (data) {
                    $(item).html(window.moment(data['build'], 'DD-MM-YYYY h:m:s').fromNow());
                }).fail(function (error) {
                    $(item).html('Uknown build date');
                });
            });
        }
    }, 1);
    return $scope;
};
var selectText = function (node) {
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    }
    else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
};
var app = angular.module('flow123d', []);
app.config(function ($locationProvider, $interpolateProvider) {
    $locationProvider.html5Mode({
        enabled: true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
app.filter('join', function () {
    return function join(array, separator, prop) {
        if (!Array.isArray(array)) {
            return array;
        }
        return (!!prop ? array.map(function (item) {
            return item[prop];
        }) : array).join(separator);
    };
});
app.controller('flow123dCtrl', function ($scope) {
    if (default_hash) {
        $scope.version = default_hash.substring(1);
        var item = window.flow123d.releaseList.filter(function (o) { return o.version == $scope.version; })[0];
        if (!item) {
            $scope.version = window.flow123d.version;
        }
    }
    else {
        $scope.version = window.flow123d.version;
    }
    $scope.options = window.flow123d.releaseList;
    $scope.flow123d = window.flow123d;
    $scope = updateScope($scope);
    $scope.edited = false;
    $scope.versionChanged = function (e) {
        $scope = updateScope($scope);
        $('.ng--change').css('transition', 'none').finish().hide().fadeIn('slow');
        window.location.hash = '';
        if (window.flow123d.subpage) {
            console.log('change page ' + $scope.version + ', ' + window.flow123d.subpage);
            if ($scope.item.hasPage(window.flow123d.subpage)) {
                window.location.pathname = '/releases/' + $scope.version + '/' + window.flow123d.subpage;
            }
            else {
                window.location.hash = $scope.version;
                window.location.pathname = '/';
            }
        }
    };
});
$(document).ready(function () {
    $('#version-select').focus().select();
    $('.content pre').click(function () {
        selectText(this);
    });
    $().fancybox({
        selector: '.gallery a',
        caption: function (instance, item) {
            console.log($(this).find('figcaption').html());
            return $(this).find('figcaption').html();
        }
    });
    $('.gravatar').each(function (index, item) {
        var $this = $(this);
        if ($this.data('gravatar')) {
            $this.prepend($.gravatar($this.data('gravatar') + '@tul.cz'));
        }
        else {
            $this.prepend('<i class="fa fa-user-o img" aria-hidden="true"></i>');
        }
        $this.attr('data-gravatar', null);
    });
});
