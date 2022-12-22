module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', 'css'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@mainViews': path.resolve(__dirname, 'src/views/main'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@functions': path.resolve(__dirname, 'src/functions')
    }
  }
}
