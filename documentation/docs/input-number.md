---
id: input-number
title: Input Number
---

A web component, which enhance the input wth formating feature based on the `locale` provided. or the browsers locale.

Formating is done based on [Internationalization standards](https://www.thefinancials.com/Default.aspx?SubSectionID=curformat)

### Installation

#### NPM module

```shell
npm install @i18n-components/input-number
```

#### CDN
```html
 <script src="https://unpkg.com/@i18n-components/input-number@latest/dist/index.js"></script> 
```

### Usage
```javascript
// Import IIFE
import '@i18n-components/input-number';
 
//Use in your HTML/React component/Angular Component/Vue Component
<input type="tel" is="i18n-input-number" locale='fr-FR' decimalDigits='4'/>
```

[See Section](#examples) for Detailed Examples


### API

This Supports all the attributes supported by standard `HTMLInputElement`.

There are few custom attributes also supported.

| Attriubutes    |      Type     |   Default                                  |
| -------------- | :-----------: | --------------------------------------:    |
| `locale`       |   `String`    | Browser's Locale `navigator.language`      |
| `decimalDigits`|   `String`    | 2                                          |



### Examples

#### Vanilla Javascript example

```html codesandbox=file:../../examples/vanilla-input-number?overrideEntry=false
<!-- This code will not be added to the sandbox -->
```

