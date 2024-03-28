const apiRoutesInfo = {
    message: 'Benvenuto! Questa è la pagina di aiuto dell API.',
    routes: {
        sendVerificationEmail: 'POST /api/sendVerificationEmail',
        getUsers: 'GET /api/users',
        getUserByEmail: 'GET /api/users/:email',
        createUser: 'POST /api/users',
        updateUser: 'PUT /api/users/:email',
        deleteUser: 'DELETE /api/users/:email',
        registerUser: 'POST /api/register',
        loginUser: 'POST /api/login',
        test: 'GET /api/test',
        getLogsForUser: 'GET /api/logs/user/:email',
        testWithTiming: 'GET /api/testTime'
    }
};

function generateHTMLPage(routeInfo) {
    let html = `
        <html>
        <head>
            <title>API Info</title>
        </head>
        <body>
            <h1>${routeInfo.message}</h1>
            <ul>`;
    
    for (const route in routeInfo.routes) {
        html += `<li>${route}: ${routeInfo.routes[route]}</li>`;
    }
    
    html += `
            </ul>
        </body>
        </html>`;
    
    return html;
}

function handleHelpRequest(req, res) {
    const userAgent = req.headers['user-agent'];
    if (userAgent.includes('curl')) {
        res.json(apiRoutesInfo);
    } else {
        const htmlPage = generateHTMLPage(apiRoutesInfo);
        res.send(htmlPage);
    }
}

module.exports = { apiRoutesInfo, handleHelpRequest };
