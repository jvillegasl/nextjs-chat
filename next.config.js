/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push({
			"utf-8-validate": "commonjs utf-8-validate",
			bufferutil: "commonjs bufferutil",
		});

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui-avatars.com",
				port: "",
				pathname: "/api/**",
			},
		],
	},
	experimental: {
		serverActions: true,
		instrumentationHook: true,
	},
};

module.exports = nextConfig;
