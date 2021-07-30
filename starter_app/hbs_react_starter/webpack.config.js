const path = require("path");
module.exports = {
  entry: "/src/root.js",
  output: {
   path: path.resolve(__dirname, "public/js"),
   filename: "app.js"	
 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  mode: "development",
  watch:true,
};
