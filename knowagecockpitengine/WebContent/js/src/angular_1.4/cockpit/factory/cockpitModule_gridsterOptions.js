angular.module('cockpitModule').factory('cockpitModule_gridsterOptions',function($timeout,cockpitModule_widgetServices,cockpitModule_properties,$rootScope){
	return{
		columns : 50,
		margins: [0, 0],
		pushing : false,
		floating : false,
		swapping : false,
		colWidth: 30,
		rowHeight: 30,
		width : 'auto',
		mobileBreakPoint : 600,
		mobileModeEnabled : true,
		resizable : {
			enabled : cockpitModule_properties.EDIT_MODE,
			handles : [ 'ne', 'se', 'sw', 'nw' ],
			start : function(event, $element, widget) {
				$element.find("md-card-content").addClass('fadeOut');
				$element.find("md-card-content").removeClass('fadeIn');
			}, // optional callback fired when resize is started,
			resize : function(event, $element, widget) {
			}, // optional callback fired when item is resized,
			stop : function(event, $element, widget) {
   			 $rootScope.$broadcast('WIDGET_EVENT'+widget.id,'RESIZE');

				$timeout(function() {
					//cockpitModule_widgetServices.refreshWidget(angular.element($element.find("md-card-content")[0].firstElementChild),widget,'resize');
					$element.find("md-card-content").addClass('fadeIn');
					$element.find("md-card-content").removeClass('fadeOut');
				}, 400);
			} // optional callback fired when item is finished resizing
		},
		draggable : {
			enabled : cockpitModule_properties.EDIT_MODE, // whether dragging items is supported
			handle : '.draggableToolbar', // optional selector for resize handle
			start : function(event, $element, widget) {
				$element.find("md-card-content").addClass('fadeOut');
				$element.find("md-card-content").removeClass('fadeIn');
			},  
			drag : function(event, $element, widget) {
			}, // optional callback fired when item is moved,
			stop : function(event, $element, widget) {
				$element.find("md-card-content").addClass('fadeIn');
				$element.find("md-card-content").removeClass('fadeOut');
			}  
		}
	};
});