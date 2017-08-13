function Instance(options) {
	this.instances = [];
	this.options = $.extend({}, Instance.defaults, options);
}

Instance.prototype = {
	constructor: Instance,

	add: function(inst) {
		this.instances.push(inst);
		if (inst.$el[0]) $.data(inst.$el[0], this.options.bind, inst);
	},

	getByBinding: function($el) {
		return $.data($el[0], this.options.bind);
	},

	getByEl: function($el, all) {
		all = typeof all == 'undefined' ? false : all;
		var instances = this.instances.filter(function(inst) {
			return inst.$el.is($el) || inst.$el.find($el).length;
		});
		if (all) return instances;
		return instances[0];
	},

	getByOuterEl: function($el, all) {
		all = typeof all == 'undefined' ? false : all;
		var instances = this.instances.filter(function(inst) {
			return $el.find(inst.$el).length || $el.is(inst.$el);
		});
		if (all) return instances;
		return instances[0];
	},

	getFirst: function() {
		return this.instances[0];
	},

	getByName: function(name) {
		return this.instances.filter(function(inst) {
			return inst.options.instance == name;
		})[0];
	},
};

Instance.defaults = {
	
};

module.exports = Instance;