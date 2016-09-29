module.exports = {
    entry: './src/index.js',
    
    output:{
        path: __dirname + '/app/js',
        filename: 'bundle.js'
    },
    
    module: {
        loaders:[
            {
                test: /\.js$/,
                include: /(src)/,
                //exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread", 'transform-decorators-legacy']
                }
            },{
                test: /\.css$/,
                loader: 'style!css'
            },{
                test: /\.scss$/,
                loader: 'style!css!sass'
            },{
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url'
            }
        ] //loaders
    } //module
}; //module.exports