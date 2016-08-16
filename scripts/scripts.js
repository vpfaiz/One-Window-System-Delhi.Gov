var owsApp = angular.module('owsApp', []);
owsApp.controller('serviceCtrl', function ($scope, $http){
  $http.get('services.json').success(function(data) {
    //console.log(data);
    $scope.services = groupServices(data.services);
  });
  $scope.sortField = 'name';

  $scope.clicked = false;
  $scope.getClass = function(){
    return (owsApp.clicked)?'group group-ac':'group';
  }
  $('#tbQuery').focus();
});

function groupServices(services) {
  var groups = [], groupsAr = [];
  for(var i=0; i<services.length; i++) {
    var s = services[i];
    for(var j=0; j<s.groups.length; j++) {
      var g = s.groups[j];
      if(!groups[g])
        groups[g] = {"name": g, "services": []};
      
      groups[g].services.push({"name": s.name, "department": s.department, "link": s.link, "embed": s.embed});
    }
  }
  
  for(var prop in groups)
    groupsAr.push(groups[prop]);
  //console.log(JSON.stringify(groupsAr));
  return groupsAr;
}

function clickService() {
  console.log(window.event.srcElement.href);
  var e = window.event;

  if($(window).width() > 995) { // large screen
    owsApp.clicked = true;

    // resize search pane
    $('.search').addClass('col-md-3');
    $('.bar').css('margin',0).children('label').hide();
    $('.bar .box').removeClass('col-md-6');
    $('.group').removeClass('col-md-3 col-sm-6').addClass('group-ac');

    // unhide browser
    e.srcElement.target = 'IfBrowser';
    $('.title label').text(e.srcElement.text);
    $('.title a').attr('href', e.srcElement.href);
    $('.browser').show().parent()[0].scrollIntoView();
    //window.event.preventDefault(); 
  }
  else { //open in new tab          
    e.srcElement.target = '_new';
  }
}
