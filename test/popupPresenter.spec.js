'use strict';

require('chai').should()

var rewire = require('rewire')
var popupPresenter = rewire('../lib/popupPresenter')

popupPresenter.__set__('assetManager', {
  assets: {
    templates: {
      'myTemplate.html': '<h1>{{title}}</h1>'
    },
    css: {
      'myCss.css': 'h1 { display: none; }'
    }
  }
})

var injected
popupPresenter.__set__('cssInjector', (css) => {
  injected = css
})

var config = {
  'css': 'myCss.css',
  'template': 'myTemplate.html'
}

describe('PopupPresenter', () => {

// Given some layer config
// And template/css files
// And some feature properties
// Then generate popup content

  var presenter = popupPresenter(config)

  it('should inject css into the dom', () => {
    injected.should.contain('display')
  })

  it('should return an object', () => {
    presenter.should.be.an('object')
  })

  describe('presenter object', () => {
    var template = presenter.present({ title: 'hello world' })
    var template2 = presenter.present({ title: 'hello mars' })

    it('should present a template', () => {
      template.should.be.a('string')
    })

    describe('returned template', () => {
      it('should contain given property values', () => {
        template.should.contain('hello world')
        template2.should.contain('hello mars')
      })
    })
  })

})
