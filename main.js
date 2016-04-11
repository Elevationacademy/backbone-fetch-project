var CommitModel = Backbone.Model.extend({
  defaults: {
    id: null,
    login: '',
    avatar_url: ''
  },

  urlRoot: 'https://api.github.com/repos/angular/angular/commits',

  // only set the attrubutes we actually want
  parse: function (response) {
    this.set('login', response.author.login);
    this.set('avatar_url', response.author.avatar_url);
  }
});

var CommitView = Backbone.View.extend({
  el: $('.commit-display'),

  template: Handlebars.compile($('#commit-template').html()),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render)
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});

$('.submit').on('click', function () {
  var m = new CommitModel({ id: $('#sha').val() });
  var v = new CommitView({ model: m });

  m.fetch();
});