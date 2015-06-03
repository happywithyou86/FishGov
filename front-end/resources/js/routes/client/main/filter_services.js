(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Filter_Services', Filter_Services);

    Filter_Services.$inject = ['$rootScope'];

    function Filter_Services($rootScope) {
      var vm = this;

      $rootScope.data = [{
        name: 'Research & Development',
        code: 'A'
      }, {
        name: 'Special studies and analysis',
        code: 'B'
      }, {
        name: 'Architect and engineering services',
        code: 'C'
      }, {
        name: 'Information technology services, including telecommunications services',
        code: 'D'
      }, {
        name: 'Purchase of structures & facilities',
        code: 'E'
      }, {
        name: 'Natural resources & conservation services',
        code: 'F'
      }, {
        name: 'Social services',
        code: 'G'
      }, {
        name: 'Quality control, testing & inspection services',
        code: 'H'
      }, {
        name: 'Maintenance, repair & rebuilding of equipments',
        code: 'J'
      }, {
        name: 'Modification of equipment',
        code: 'K'
      }, {
        name: 'Technical representative services',
        code: 'L'
      }, {
        name: 'Operation of Government-owned facilities',
        code: 'M'
      }, {
        name: 'Installation of equipment',
        code: 'N'
      }, {
        name: 'Salvage services',
        code: 'P'
      }, {
        name: 'Medical services',
        code: 'Q'
      }, {
        name: 'Professional, administrative, and management support services',
        code: 'R'
      }, {
        name: 'Utilities and housekeeping services',
        code: 'S'
      }, {
        name: 'Photographic, mapping, printing, & publication services',
        code: 'T'
      }, {
        name: 'Education & training services',
        code: 'U'
      }, {
        name: 'Transportation, travel, & relocation services',
        code: 'V'
      }, {
        name: 'Lease or Rental of equipment',
        code: 'W'
      }, {
        name: 'Lease or rental of facilities',
        code: 'X'
      }, {
        name: 'Construction of structures and facilities',
        code: 'Y'
      },  {
        name: 'Maintenance, repair, and alteration of real property',
        code: 'Z'
      }];
    }
}());
