interface ReleaseItem {
  version: string;
  display: string;
  links?:  string[];
  visible: any;
}


interface Window {
    flow123d: Flow123d;
    moment: any;
}


interface Flow123d {
    packageRoot: string;
    defaultVersion: string;
    version: string;

    subpage: string;

    releaseList: ReleaseItem[];
    current: ReleaseItem;
}


for (let item of window.flow123d.releaseList) {
    item.visible = {};
    for (let link of item.links) {
        item.visible[link] = true;
    }
}


const default_hash = window.location.hash;
const version_regex = /\/releases\/(.+)\/(.+)\//gm;
const matches = version_regex.exec(document.location.pathname);
if (matches) {
  window.flow123d.version = matches[1];
  window.flow123d.subpage = matches[2];
} else {
  window.flow123d.version = window.flow123d.defaultVersion;
  window.flow123d.subpage = null;
}

var updateScope = function($scope) {
  $scope.item = window.flow123d.releaseList.filter(o => {return o.version == $scope.version})[0];
  $scope.versionRoot = window.flow123d.packageRoot + '/' + $scope.item.name;
  $scope.tags =  $scope.item.tags ? $scope.item.tags.join(' ') : '';
  
  setTimeout(function(){
    if ($scope.item.visible.download) {
      $('.json-datetime').each((index, item) => {
        $.getJSON($(item).attr('data-url')).done((data) => {
          $(item).html(
            window.moment(data['build'], 'DD-MM-YYYY h:m:s').fromNow()
          )
        }).fail((error) => {
          $(item).html(
            'Uknown build date'
          )
        });
      });
    }
  }, 1);
  
  return $scope;
};


var app = angular.module('flow123d', []);
app.config(function($locationProvider,$interpolateProvider){
    $locationProvider.html5Mode({
        enabled:true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
 });
 app.filter('join', function () {
    return function join(array, separator, prop) {
        if (!Array.isArray(array)) {
          return array; // if not array return original - can also throw error
        }
        return (!!prop ? array.map(function (item) {
            return item[prop];
        }) : array).join(separator);
    };
});


app.controller('flow123dCtrl', function($scope) {
  if (default_hash) {
      $scope.version = default_hash.substring(1);
  } else {
    $scope.version = window.flow123d.version;
  }
  $scope.options = window.flow123d.releaseList;
  $scope.flow123d = window.flow123d;
  $scope = updateScope($scope);
  $scope.edited = false;

  $scope.versionChanged = function(e) {
    $scope = updateScope($scope);
    window.location.hash = $scope.version;
    
    $('.ng--change').css('transition', 'none').finish().hide().fadeIn('slow');
    
    // the block below basically loads subpage of a selected version if there is any
    // special case is 'download' which we first check that the version is 'legacy'
    if (window.flow123d.subpage) {
      if (window.flow123d.subpage == 'download'){
        if (!$scope.item.visible.legacyDownload) {
          window.location.pathname = '/releases/' + $scope.version + '/' + window.flow123d.subpage;
         } else {
          window.location.pathname = '/';
        }
      } else {
        window.location.pathname = '/releases/' + $scope.version + '/' + window.flow123d.subpage;
      }
    } else {
      $('.downloads .button').finish().hide().fadeIn('slow');
    }
  };
});


$(document).ready(function() {
  $('#version-select').focus().select();
  $('.dropdown-toggle').click(function() {
    $("[aria-labelledby='" + this.id + "']").toggleClass('show');
    $(this).toggleClass('active');
  });
  
  // $('[data-fancybox]' ).fancybox({
  //   caption : function( instance, item ) {
  //     return $(this).find('figcaption').html();
  //   }
  // });
  
  $('.gravatar').each(function(index, item) {
    var $this = $(this);
    if ($this.data('gravatar')) {
      $this.prepend((<any> $).gravatar($this.data('gravatar') + '@tul.cz'));
    }else{
      $this.prepend('<i class="fa fa-user-o img" aria-hidden="true"></i>');
    }
    $this.attr('data-gravatar', null);
  });
});
