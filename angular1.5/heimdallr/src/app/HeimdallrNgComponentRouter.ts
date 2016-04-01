import {HeimdallrErrors} from "./HeimdallrErrors";
import {ComponentRouteEvent} from "./RouteEvent";

export class HeimdallrNgComponentRouter {
  routeEventArray:Array<ComponentRouteEvent> = [];
  sendEvent:Function;
  errorMsg:HeimdallrErrors;
  $rootScope:ng.IRootScopeService;

  bindRoutingEvents() {
    try {
      if (typeof angular.module('ngComponentRouter') !== 'undefined') {
        this.$rootScope.$watch(
          "$routerOnActivate",
          function routeChange( next, prev ) {
            debugger
          }
        );
        // this.$rootScope.$on('$routerOnActivate', (next, prev) => {
        //   let now = new Date(Date.now()).getTime().toString();
        //   debugger
        //   this.routeEventArray.push({
        //     'event': now,
        //     'next': null,
        //     'prev': null
        //   });
        //   performance.mark(now);
        // });
        // this.$rootScope.$on('$viewContentLoaded', ()=> {
        //   let now = new Date(Date.now()).getTime().toString();
        //   performance.mark(now);
        //   if (this.routeEventArray.length > 1) {
        //     var toName = this.routeEventArray[this.routeEventArray.length - 1].toState.name;
        //     var fromName = this.routeEventArray[this.routeEventArray.length - 1].fromState.name;
        //     var eventStamp = this.routeEventArray[this.routeEventArray.length - 1].event;
        //     try {
        //       performance.measure("Successful change from: " + fromName + " to: " + toName, eventStamp, now);
        //     } catch (error) {
        //       console.log(this.errorMsg.measureMissing + error)
        //     }
        //     performance.clearMarks(eventStamp)
        //   }
        //   this.sendEvent("currentView", toName)
        // })
      }
    } catch (error) {
      console.log(error)
    }
  }

  constructor(routeEventArray:Array<ComponentRouteEvent>, sendEvent:Function, messages:HeimdallrErrors, $rootScope:ng.IRootScopeService) {
    this.errorMsg = messages;
    this.routeEventArray = routeEventArray;
    this.sendEvent = sendEvent;
    this.$rootScope = $rootScope;
    this.bindRoutingEvents();
  }
}