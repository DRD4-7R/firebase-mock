'use strict'

import test from 'tape'
import * as url from '../src/url'

test('url', (t) => {
  t.test('parse', (t) => {
    const parsed = url.parse('mock://host/path')
    t.deepEqual(parsed, {
      endpoint: 'mock://host',
      path: '/path',
      isRoot: false,
      url: 'mock://host/path'
    }, 'parses to endpoint and path')
    t.equal(url.parse('mock://foo').path, '', 'no path')
    t.equal(url.parse('mock://foo/').path, '', 'strips trailing slash')
    t.equal(url.parse('mock:///').path, '')
    t.ok(url.parse('mock://foo/').isRoot)
    t.notOk(url.parse('mock://foo/bar').isRoot)
    t.end()
  })
  t.test('format', (t) => {
    t.equal(url.format({
      endpoint: 'mock://',
      path: '/foo'
    }), 'mock:///foo')
    t.equal(url.format({
      endpoint: 'mock://',
      path: '/foo/'
    }), 'mock:///foo')
    t.equal(url.format({
      endpoint: 'mock://',
      path: 'foo'
    }), 'mock:///foo')
    t.end()
  })
  t.end()
})
