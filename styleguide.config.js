const merge = require('lodash/merge');
const path = require('path');
const PATHS = {
    build: path.join(__dirname, 'docs'),
};

module.exports = {
    title: 'Components Core Documentation',
    defaultExample: true,
    exampleMode: 'expand',
    usageMode: 'expand',
    pagePerSection: true,
    sections: [
        {
            name: 'Styling',
            sections: [
                {
                    name: 'Styling For Components',
                    content: './styleguidist-docs/StylingComponents.md',
                },
                {
                    name: 'Styling For Layouts',
                    content: './styleguidist-docs/StylingLayouts.md',
                },
            ],
        },
        {
            name: 'Core Components',
            components: () => [
                './src/TextField.js',
            ],
            styles: {
                StyleGuide: {
                    '@global body': {
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    },
                },
            },
        },
    ],
    webpackConfig: merge(require('./config/webpack.config.dev.js'), {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
        },
        output: {
            filename: 'bundle.js',
            path: PATHS.build,
            publicPath: '/docs',
        },
    }),
};