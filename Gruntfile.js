module.exports = function(grunt){
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  jshint: {
    options: {
      node: true, 
      jasmine: true
    },
    all: [
    'Gruntfile.js', 
    './src/**/*.js',
    './spec/**/*.js'
    ]
  },
  jasmine_node: {
    options: {
      forceExit: true, 
    }, 
    all: ['test/unitTests/']
  },
  mochaTest: {
    test: {
      options: {
        reporter: 'nyan',
        quiet: false
      },
    src: ['test/acceptanceTests/*.js']
    }
  },
  express: {
    options:{},
    dev: {
      options: {
        script: './server.js'
      }
    }
  },
  watch: {
    files: [ 
    './src/**/*.js',
    './test/**/*.js',
    './public/**/*.js',
    './views/*.ejs'
    ], 
    tasks: ['jasmine_node', 'jshint', 'express', 'mochaTest']
  }
});

grunt.loadNpmTasks('grunt-mocha-cli');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-jasmine-node');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-mocha-test');

grunt.registerTask('default',['express','mochacli']);
grunt.registerTask('jasmine', ['jasmine_node']);
grunt.registerTask('mocha', 'mochaTest');

};