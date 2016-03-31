"use strict";

angular.module('heroes', [])
  .service('heroService', HeroService)

  .component('heroes', {
    template: '<h2>Heroes</h2><ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'HeroList',   component: 'heroList', useAsDefault: true},
      {path: '/:id', name: 'HeroDetail', component: 'heroDetail'}
    ]
  })

  .component('heroList', {
    template:
      '<div ng-repeat="hero in $ctrl.heroes" ' +
      '     ng-class="{ selected: $ctrl.isSelected(hero) }">\n' +
        '<a ng-link="[\'HeroDetail\', {id: hero.id}]">{{hero.name}}</a>\n' +
      '</div>',
    controller: HeroListComponent
  })

  .component('heroDetail', {
    template:
      '<div ng-if="$ctrl.hero">\n' +
      '  <h3>"{{$ctrl.hero.name}}"</h3>\n' +
      '  <div>\n' +
      '    <label>Id: </label>{{$ctrl.hero.id}}</div>\n' +
      '  <div>\n' +
      '    <label>Name: </label>\n' +
      '    <input ng-model="$ctrl.hero.name" placeholder="name"/>\n' +
      '  </div>\n' +
      '  <button ng-click="$ctrl.gotoHeroes()">Back</button>\n' +
      '</div>\n',
    bindings: { $router: '<' },
    controller: HeroDetailComponent
  });


function HeroService($q) {
  var heroCount = 5;
  var heros = [];
  for (var i = 0; i < heroCount; i++){
    heros.push({id: i, name: 'Mr. '+ i})
  }
  var heroesPromise = $q.when(heros);

  this.getHeroes = function() {
    return heroesPromise;
  };

  this.getHero = function(id) {
    return heroesPromise.then(function(heroes) {
      for(var i=0; i<heroes.length; i++) {
        if ( heroes[i].id == id) return heroes[i];
      }
    });
  };
}

function HeroListComponent(heroService) {
  var selectedId = null;
  var $ctrl = this;

  this.$routerOnActivate = function(next, previous) {
    // Load up the heroes for this view
    return heroService.getHeroes().then(function(heroes) {
      $ctrl.heroes = heroes;
      selectedId = next.params.id;
    });
  };

  this.isSelected = function(hero) {
    return (hero.id == selectedId);
  };
}

function HeroDetailComponent(heroService) {
  var $ctrl = this;

  this.$routerOnActivate = function(next, previous) {
    // Get the hero identified by the route parameter
    var id = next.params.id;
    return heroService.getHero(id).then(function(hero) {
      $ctrl.hero = hero;
    });
  };

  this.gotoHeroes = function() {
    var heroId = this.hero && this.hero.id;
    this.$router.navigate(['HeroList', {id: heroId}]);
  };
}