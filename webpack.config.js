const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    fallback: {"path":
      require.resolve("path-browserify")
    }
  },
  entry: {
    main: path.resolve(__dirname,'./client/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader'],
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/build', //the default port is 8080, the default webpack dev server, load static files
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        secure: false,
      }

      //connects to the proxy server, in server.js. how we connect to node. points to the /api/leaders route in server.js
      //this is how to route to the server. fetch /api
      //changed it to 4000 to see how it would work. make sure to change the server.js app.listen(3000) arg to (4000) or what's specced above
    }
  }
}