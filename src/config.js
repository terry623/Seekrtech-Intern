try {
  console.log('In Config');
  console.log(process.env.NODE_ENV);

  switch (process.env.NODE_ENV) {
    case 'development':
      process.env.SERVER_URL = 'http:localhost:8080';
      console.log(process.env.SERVER_URL);
      break;
    default:
      process.env.SERVER_URL = 'http:localhost:8080';
      console.log(process.env.SERVER_URL);
      break;
  }
} catch (err) {
  console.log(err);
}
