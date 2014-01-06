generator-onepiece
==================

In a word: scaffold out your own real-time app with our accumulated best practice.

## Usage

1. Install onepiece generator:

  `npm install -g generator-onepiece`

2. Make a new directory for your project and `cd` into it:

  `mkdir myProject && cd $_`

   Note that the generator will use the new folder name to produce the namespace for all the codes of your project, so it's recommended to use Camel-Case to name all entities under generator-onepiece, like modes, views, and so on.

3. Construct the application base:

  `yo onepiece`
  
4. Flexibly use the grunt tasks under your developemt or deployment stages:

```
  grunt jshint # lints the codes of business logic
  grunt test # runs your test suite(including front-end and back-end tests)
  grunt build # packages your app for distribution
  grunt start # launches a webserver
```

## Generators

You can find any handy generators to construct the entire project:

onepiece (top generator)
 - onepiece:model
 - onepiece:view
 - onepiece:socketcrud


## Typical workflow

```
yo onepiece # generates your application base and build workflow
yo onepiece:model bookmark
yo onepiece:view bookmark
yo onepiece:socketcrud bookmark
grunt start
```

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

## Contribute




## License
[MIT License](http://opensource.org/licenses/MIT)
