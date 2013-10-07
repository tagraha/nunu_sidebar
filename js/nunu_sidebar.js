/*
 *  Nunu Sidebar v1.0.1
 *  This plugin is the part of nugrata project (Nunu admin template)
 *  Made by Tirta Nugraha
 *  https://github.com/Nugrata/nunu_sidebar/
 *  Under MIT License
 */

var nu_options;
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined) {
	"use strict";
	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "nu_sidebar",
		defaults = {
			open: false,
			dim: true
		},
		nu_variables = {
			_self: null,
			sidebar_width: $("#nu_maincontainer").find(".nu_rightpanel").width(),
			leftpanel: $("#nu_maincontainer").find(".nu_leftpanel"),
			rightpanel: $("#nu_maincontainer").find(".nu_rightpanel"),
			dim: null
		};

	// The actual plugin constructor

	function Plugin(element, options) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		//creating overlay element
		nu_variables.leftpanel.prepend('<div id="nu_dim"></div>');
		nu_variables.dim = $("#nu_dim");

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			var _option = this.settings;

			if (this.settings.open === true) {
				this.opensidebar(_option);
			} else {
				this.closesidebar(_option);
			}

			nu_variables._self.on("click", function() {
				if (nu_variables.rightpanel.hasClass("sidebar_hide") === true) {
					Plugin.prototype.opensidebar(_option);
				} else {
					Plugin.prototype.closesidebar(_option);
				}
			});

			//overlay click function
			nu_variables.dim.on("click", function() {
				Plugin.prototype.closesidebar(_option);
			});
		},

		opensidebar: function(_option) {
			nu_variables.rightpanel
				.removeClass("sidebar_hide");

			if (_option.dim === true) {
				setTimeout(dimDisplaying, 600);
				nu_variables.dim.css("display", "block");
			} else {
				nu_variables.dim.css({
					"display": "block",
					"opacity": 0
				});
			}

			function dimDisplaying() {
				nu_variables.dim.css({
					"opacity": 1
				});
			}
		},

		closesidebar: function(_option) {
			nu_variables.rightpanel
				.addClass("sidebar_hide");

			nu_variables.dim.css("opacity", 0);

			setTimeout(hidingDim, 950);
			function hidingDim() {
				nu_variables.dim.css("display", "none");
			}
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		nu_variables._self = this;
		nu_options = options;
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
