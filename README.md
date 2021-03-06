<h1 align="center">
  <a target="_blank" href="https://react-atomicus.netlify.com/">
    <img src="https://raw.githubusercontent.com/w0wka91/react-atomicus/master/resources/react-atomicus-logo-vertical.svg?sanitize=true" alt="react-atomicus" title="react-atomicus" width="300" />
  </a>
</h1>
<p align="center" style="font-size: 1.2rem;">Yet another library of reusable React components/hooks.</p>

[![Build Status](https://travis-ci.org/w0wka91/react-atomicus.svg?branch=master)](https://travis-ci.org/w0wka91/react-atomicus)
[![codecov](https://codecov.io/gh/w0wka91/react-atomicus/branch/master/graph/badge.svg)](https://codecov.io/gh/w0wka91/react-atomicus)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ab199962-7b9d-407d-8c4c-fec4fe2b48bd/deploy-status)](https://app.netlify.com/sites/react-atomicus/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installing

```sh
yarn add react-atomicus
```

## Basic usage

After installing the library, include the Normalize component in your application and you're ready to go:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Normalize, Button } from 'react-atomicus'

ReactDOM.render(
  <>
    <Normalize />
    <Button>Test</Button>
  </>,
  document.getElementById('root')
)
```

## [Docz](https://react-atomicus.netlify.com/)

Have a look at the documentation at [react-atomicus](https://react-atomicus.netlify.com/) for more information about using react-atomicus.

## License

MIT
