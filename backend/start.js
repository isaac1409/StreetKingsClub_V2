const app = require('./server/index');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    process.exit();
});
