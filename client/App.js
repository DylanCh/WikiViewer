'use strict';

const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&&prop=info&inprop=url&titles=';

var app = angular.module('wikiViewerApp',[]);

app.controller(
  'wikiController',
  ['$scope','$http',
   ($scope,$http)=>{     
     $scope.query = '';
     $scope.links = [];

     $scope.randomize = ()=>{
       console.log('Generating random article');
     };
     
     $scope.getWiki = ()=>{
       $http.get('/getWiki?q='+$scope.query,
        {headers:{'Api-User-Agent': 'Example/1.0'}})
         .then((response)=>{
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