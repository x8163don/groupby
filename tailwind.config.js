/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
    content: ["./src/**/*.{html,js,jsx,ts,tsx}",],
    theme: {
        extend: {
            aspectRatio:{
                '6/13': '6 / 9',
            }
        },
    },
    plugins: [],
})

