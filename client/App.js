'use strict';

const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&&prop=info&inprop=url&titles=';

$(document).ready(()=>{
  $('#randomBtn').click(()=>{
    
  });
});

var app = angular.module('wikiViewerApp',[]);

app.controller(
  'wikiController',
  ['$scope','$http',
   ($scope,$http)=>{     
     $scope.query = '';
     $scope.links = [];
     
     $scope.getWiki = ()=>{
       $http.get('/getWiki?q='+$scope.query,
        {headers:{'Api-User-Agent': 'Example/1.0'}})
         .then((response)=>{
          //console.log(response.data['canonicalurl']);
          $scope.links.push(
            {
              url : response.data['canonicalurl'],
              title : response.data['title']
          });
         },
         (error)=>{
           console.warn(error);
          });
      };     
     
   }]);