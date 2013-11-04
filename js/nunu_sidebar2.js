/*
 *  Nunu sidebar v2.0.0
 *  Made by Tirta Nugraha
 *  https://github.com/Nugrata/nunu_sidebar
 *  Under MIT license
 *  (November, 2013)
 */

/*global $:false, jQuery:false, window:false, document:false, console:false*/
(function ($, window, document, undefine) {
	"use strict";
	$.nunu_sidebar = function (el, nunu_param, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("nunu_sidebar", base);

		base.init = function () {
			if (typeof (nunu_param) === "undefined" || nunu_param === null) {
				nunu_param = $.nunu_sidebar.defaultOptions;
			}

			//user parameter
			base.nunu_param = nunu_param;

			//default option. no user parameter
			base.options = $.extend({}, $.nunu_sidebar.defaultOptions, options);

			// Put your initialization code here
			//console.log(base.options);
			//console.log(base.nunu_param);
			//console.log(base);
			//base.functionName("ok");
			base.nunu_var = {
				content: $("#" + base.options.contentId).find("." + nunu_param.pushedClass),
				sidebarId: $("#" + base.options.sidebarId),
				sidebarWidth: null /*defined at base.defSidebarWidth()*/
			};

			//define sidebar width
			base.defSidebarWidth();
			//define pushed content if parameter not exist
			base.defPushedContent();
		};

		//define sidebar width
		base.defSidebarWidth = function () {
			base.nunu_var.sidebarWidth = base.nunu_var.sidebarId.width();
		};

		base.defPushedContent = function () {
			if (base.nunu_param.pushedClass === undefined && base.nunu_param.slideType === "push") {
				//create default pushed content element
				base.nunu_var.content = $("#" + base.options.contentId).find(".nu-maincontainer");
			}
		};

		//toggle sidebar when base element clicked
		base.toggleSidebar = function () {
			//base.init();
			base.$el.click(function () {
				if (base.nunu_var.sidebarId.hasClass("hiding") === true) {
					base.openSidebar();
				} else {
					base.closeSidebar();
				}
			});
		};

		base.closeSidebar = function () {
			base.nunu_var.sidebarId
				.css("left", -base.nunu_var.sidebarWidth)
				.addClass("hiding");

			if (base.nunu_param.slideType !== undefined && base.nunu_param.slideType === "push") {
				base.pushContent("close");
			}
		};

		base.openSidebar = function () {
			base.nunu_var.sidebarId
				.css("left", 0)
				.removeClass("hiding");

			if (base.nunu_param.slideType !== undefined && base.nunu_param.slideType === "push") {
				base.pushContent("open");
			}
		};

		base.pushContent = function (action) {
			if (action === "open") {
				base.nunu_var.content.css("padding-left", base.nunu_var.sidebarWidth);
			} else if (action === "close") {
				base.nunu_var.content.css("padding-left", 0);
			}

			//console.log(base.nunu_param);
		};

		// Run initializer
		base.init();
		base.toggleSidebar();
	};

	$.nunu_sidebar.defaultOptions = {
		contentId: "nu-maincontent",
		sidebarId: "nu-sidebar",
		sidebar_open: true
	};

	$.nunu_sidebar.close = function () {
		//$.nunu_sidebar.closeSidebar();
		console.log("ganteng");
	};

	$.fn.nunu_sidebar = function (nunu_param, options) {
		return this.each(function () {
			($.nunu_sidebar(this, nunu_param, options));
		});
	};

}(jQuery, window, document));
