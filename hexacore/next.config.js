/** @type {import('next').NextConfig} */

const nextConfig = {
  //https://www.google.com/search?q=nextjs+data+loads+twice&oq=nextjs+data+loads+twice&aqs=chrome..69i57j33i10i160.9060j0j7&sourceid=chrome&ie=UTF-8
  //https://stackoverflow.com/questions/71847778/why-my-nextjs-component-is-rendering-twice

  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]',
      },
    })

    return config
},
  
}

module.exports = nextConfig