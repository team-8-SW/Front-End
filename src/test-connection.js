// Test script to verify communication between frontend and backend
async function testConnection() {
    console.log('Starting connection tests...');
    try {
        // Test frontend health check
        console.log('1. Testing frontend health...');
        const frontendHealth = await fetch('/health');
        const frontendResult = frontendHealth.ok ? '✅ OK' : '❌ Failed';
        console.log(`Frontend health check: ${frontendResult}`);

        // Test backend health check through Nginx proxy
        console.log('\n2. Testing backend health through Nginx...');
        const backendHealth = await fetch('/api/health');
        const backendData = await backendHealth.json();
        const backendResult = backendHealth.ok ? '✅ OK' : '❌ Failed';
        console.log(`Backend health check: ${backendResult}`);
        console.log('Backend response:', backendData);

        // Test API endpoint
        console.log('\n3. Testing API endpoint...');
        const apiTest = await fetch('/api/users');
        const apiData = await apiTest.json();
        const apiResult = apiTest.ok ? '✅ OK' : '❌ Failed';
        console.log(`API test: ${apiResult}`);
        console.log('API response:', apiData);

        return {
            frontend: frontendHealth.ok,
            backend: backendHealth.ok,
            api: apiTest.ok,
            backendData,
            apiData
        };
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        return {
            frontend: false,
            backend: false,
            api: false,
            error: error.message
        };
    }
}

// Run the test
console.log('=== Connection Test Results ===');
testConnection().then(results => {
    console.log('\nFinal Results:', results);
    console.log('=== Test Complete ===');
}); 