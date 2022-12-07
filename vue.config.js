module.exports = {
  devServer: {
    overlay: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api/h1': {
        target: 'https://api.next-m.kr',
        changeOrigin: true,
      },
    },
  },

  transpileDependencies: ['vuetify'],
};
