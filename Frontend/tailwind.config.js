import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {fontFamily: {
      'display': ['DisplayOTF', 'sans-serif']}
  }},
  plugins: [
    require('flowbite/plugin')
  ],
});
