$(document).ready(function() {

	var app = app || { };

	(function(){

		app.controller = {
			init: function(){
				app.switchScreen.init();
			}
		},

		app.vars = {

			currentScreen: "pointPodcatcher",
			teamNumber: 2,

		},

		app.switchScreen = {
			init:function(){
				$( "section#pointPodcatcher" ).click(function() {
					if (app.vars.teamNumber === 1) {
						app.vars.teamNumber = 2;
					} else if (app.vars.teamNumber === 2) {
						app.vars.teamNumber = 1;
					};
					app.vars.currentScreen = "pointPodcatcher";
					console.log(app.vars.teamNumber);
  					app.switchScreen.goToTeamNumberScreen();
				});
			},

			goToTeamNumberScreen: function(){
				$("section#pointPodcatcher").addClass('fadeOut');
				$("section#pointPodcatcher").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
					if (app.vars.currentScreen == "pointPodcatcher") {
						$("section#pointPodcatcher").addClass('hide'); 
						$("section#teamNumber").removeClass('hide');

						setTimeout(
							function(){ 
								$("section#teamNumber div.title").addClass('fadeIn');
								$("section#teamNumber div#team").addClass('fadeIn');

								app.vars.currentScreen = "teamNumber";
								$("section#teamNumber div#team").html("TEAM "+ app.vars.teamNumber);
						}, 50);

						setTimeout(function(){ 
									$("section#teamNumber #text").addClass('fadeIn');
						}, 1400);

						$("section#teamNumber #text").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
							setTimeout(function(){
								app.switchScreen.goToPointPodcatcherScreen();
							}, 4500);
						});
					};/*if statement*/
				});
			},

			goToPointPodcatcherScreen: function(){
				$("section#teamNumber div.title").removeClass('fadeIn');
				$("section#teamNumber div#team").removeClass('fadeIn');
				$("section#teamNumber #text").removeClass('fadeIn');

				$("section#teamNumber #text").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
					$("section#teamNumber").addClass('hide');
					$("section#pointPodcatcher").removeClass('hide');
					setTimeout(function(){
						$("section#pointPodcatcher").removeClass('fadeOut');
					}, 50);
				});
			}


		}

		app.controller.init();

	}());
});
