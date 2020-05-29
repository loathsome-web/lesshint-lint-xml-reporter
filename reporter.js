/* global module */

'use strict';
module.exports = {
  name: 'lesshint-lint-xml-reporter',
  report: function report(results){
    var resultsByfiles = {};
    var output = '';

    console.log('<?xml version="1.0" encoding="utf-8"?>');
    console.log('<checkstyle version="4.3">');

    results.forEach(function(result){
      output = '\t<error';

      if(result.severity === 'error'){
        output += ' severity="error"';
      }
      else{
        output += ' severity="warning"';
      }

      if(result.linter){
        output += ' source="lesshint.rules.' + result.linter + '"';
      }

      if(result.line){
        output += ' line="' + result.line + '"';
      }

      if(result.column){
        output += ' column="' + result.column + '"';
      }

      output += ' message="' + result.message.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"';

      if(resultsByfiles[result.fullPath] === undefined){
        resultsByfiles[result.fullPath] = '';
      }
      resultsByfiles[result.fullPath] += output + ' />\n';
    });

    Object.keys(resultsByfiles).forEach(function(fullPath){
      console.log('<file name="' + fullPath + '">');
      console.log(resultsByfiles[fullPath]);
      console.log('</file>');
    });

    console.log('</checkstyle>');
  },
};
