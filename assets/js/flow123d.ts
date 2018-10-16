interface ReleaseItem {
  version: string;
  display: string;
  links?:  string[];
  visible: any;
  hasPage(page:string);
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
    item.hasPage = function(page:string) {
      if(page == 'download')
        page = 'legacyDownload';
        
      return this.visible[page];
    }
}


const default_hash = window.location.hash;
const version_regex = /\/releases\/(.+)\/([^\/#]+)/gm;
const matches = version_regex.exec(document.location.pathname);

if (matches) {
  window.flow123d.version = matches[1];
  window.flow123d.subpage = matches[2];
  let item = window.flow123d.releaseList.filter(o => {return o.version == window.flow123d.version})[0];
  if (!item) {
    window.flow123d.version = window.flow123d.defaultVersion;
  }
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
    $('.ng--change').css('transition', 'none').finish().hide().fadeIn('slow');
    
    window.location.hash = '';
    if (window.flow123d.subpage) {
      console.log('change page ' + $scope.version + ', ' + window.flow123d.subpage);
      if ($scope.item.hasPage(window.flow123d.subpage)) {
        window.location.pathname = '/releases/' + $scope.version + '/' + window.flow123d.subpage;
      } else {
        window.location.hash = $scope.version;
        window.location.pathname = '/';
      }
    }
  };
});


$(document).ready(function() {
  $('#version-select').focus().select();
  
  $().fancybox({
    selector: '.gallery a',
    caption : function( instance, item ) {
      console.log($(this).find('figcaption').html());
      return $(this).find('figcaption').html();
    }
  });
  
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
