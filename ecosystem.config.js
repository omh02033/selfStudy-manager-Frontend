module.exports = {
    apps : [{
        name: "SSM_frontend",
        watch: true,
        //script: "./node_modules/react-scripts/scripts/start.js",
	    script: "npm start",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}