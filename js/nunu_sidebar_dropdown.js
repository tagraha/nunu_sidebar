/*!
 *  Project: Nunu sidebar dropdown v1.0
 *  Description: part of Nugrata project
 *  Author: Tirta Nugraha (2013)
 *  License: MIT
 */

/*global $:true, jQuery:true, window:true, document:true, console:true */
(function ($, window, document, undefine) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window is passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).
	"use strict";
	var pluginName = "sidebarDropdown",
		// the name of using in .data()
		dataPlugin = "nunu_" + pluginName,
		// default options
		defaults = {
			hover: "false"
		},
		mouseInside = false,
		base = null,
		//The actual plugin constructor
		Plugin = function (element) {
			/* Plugin instantiation */
			this.options = $.extend({}, defaults);
			base = element;
		};

	Plugin.prototype = {

		init: function (options) {

			// extend options ( http://api.jquery.com/jQuery.extend/ )
			$.extend(this.options, options);

			/* Initialization logic here */
			this.options.hover = base.attr("data-nunuhover") || this.options.hover;

			if (this.options.hover === "false") {
				this.clickInteraction();
			}

			$("body").click(function () {
				if (mouseInside === false) {
					Plugin.prototype.hideAll();
				}
			});
		},

		// hiding all opened dropdown
		hideAll: function () {
			var openDrop = base;
			openDrop.find(".open").removeClass("open").find(".drop-show").removeClass("drop-show");
		},

		clickInteraction: function () {
			var el = base,
				menuList = base.find(">li").has(">ul"),
				hide = function () {
					el.find(".open")
						.removeClass("open")
						.find(".drop-show")
						.removeClass("drop-show");
				};

			menuList.each(function () {
				var self = $(this);
				if (self.has("ul")) {
					self.addClass("has-drop");
					self.find(">ul").addClass("drop-child");
				}

				self.click(function (evt) {
					evt.preventDefault();
					hide(); //hide other opened dropdown
					self.addClass("open");
					self.find(">ul").toggleClass("drop-show");
				});
			});

			el.mouseenter(function () {
				mouseInside = true;
			}).mouseleave(function () {
				mouseInside = false;
			});
		}
	};

	/*
	 * Plugin wrapper, preventing against multiple instantiations and
	 * allowing any public function to be called via the jQuery plugin,
	 * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
	 */
	$.fn[pluginName] = function (arg) {

		var args, instance;

		// only allow the plugin to be instantiated once
		if (!(this.data(dataPlugin) instanceof Plugin)) {

			// if no instance, create one
			this.data(dataPlugin, new Plugin(this));
		}

		instance = this.data(dataPlugin);

		instance.element = this;

		// Is the first parameter an object (arg), or was omitted,
		// call Plugin.init( arg )
		if (typeof arg === 'undefined' || typeof arg === 'object') {

			if (typeof instance.init === 'function') {
				instance.init(arg);
			}

			// checks that the requested public method exists
		} else if (typeof arg === 'string' && typeof instance[arg] === 'function') {

			// copy arguments & remove function name
			args = Array.prototype.slice.call(arguments, 1);

			// call the method
			return instance[arg].apply(instance, args);

		} else {

			$.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);

		}
	};

}(jQuery, window, document));
