import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist'),
};

export const webpackConfig = (isMode) => {
  return {
    entry: {
      main: path.join(paths.src, 'js/app.js'),
      index: path.join(paths.src, 'js/index.js'),
      signIn: path.join(paths.src, 'js/signIn.js'),
      signUp: path.join(paths.src, 'js/signUp.js'),
      recovery: path.join(paths.src, 'js/recovery.js'),
      permission: path.join(paths.src, 'js/wholesalePermission.js'),
      orderCheckout: path.join(paths.src, 'js/orderCheckout.js'),
      profileOrders: path.join(paths.src, 'js/profileOrders.js'),
      catalogue: path.join(paths.src, 'js/catalogue.js'),
    },

    mode: isMode ? 'development' : 'production',

    output: {
      path: path.join(paths.build, 'js'),
      filename: '[name].min.js', // Використовуйте [name] для генерації імені файла
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },

          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
};
