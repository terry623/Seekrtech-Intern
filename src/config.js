const getServerURL = () => {
  console.log(process.env.NODE_ENV);

  try {
    switch (process.env.NODE_ENV) {
      case 'development':
        return 'http://localhost:8080';
      default:
        return 'https://seekrtech-intern-backend.now.sh';
    }
  } catch (err) {
    console.log(err);
  }
};

export { getServerURL };
