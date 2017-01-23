
var webpack = require('webpack');
var path = require('path');

var outputPath = path.resolve(__dirname, '..', 'dist', 'static');

module.exports = {
    entry: {
        clientlibs: [
            'react', 
            'react-dom', 
            'react-router',
            'redux',
            'react-redux',
            'redux-form',
            'material-ui'
        ]
    },

    output: { 
        filename: '[name].js',
        path: outputPath,
        library: '[name]', 
    },
  
    plugins: [ 
        new webpack.DllPlugin({ 
            name: '[name]', 
            path: path.join(outputPath, '[name].json') 
        })
    ]
}