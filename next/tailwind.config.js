/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        white: "white",
        gold: "#FBB142",
        back: "rgba(0,0,0,.2)",
        up: "#00FF76",
        down: "#DF2040",
        normal: "#FFCE31",
        hover: "#482F00",
        main: "#1E1E1E",
        button: "#B58529",
        line: "#414141",
        auditno: "#DF2040",
        header: "#9B8355",
        signin: "#211B1B",
        signinshadow: "#C57D27",
        primaryblack: "#211B1B",
        primaryellow: "#9B8355",
        textyellow: "#B58529",
        textwhite: "#E7E7E7",
        notification: "rgba(255, 206, 49, 0.15)",
        darkbg: '#2F271C',
        bordernormal: '#654302',
        textlight: '#ACA9A4',
        borderlight: '#8D784D',
      },
      screens: {
        mobile: { max: "375px" },
        scroll: { max: "842px" },
        pc: { min: "421px" },
        formMiddle: { min: "1108px" },
        anFormMiddle: { max: "1108px" },
        formMobile: { max: "660px" },
        formFinal: { max: "286px" },
        descriptionfull: { max: "720px" },
        descriptionmobile: { max: "720px" },
        descriptionpc: { min: "720px" },
        headerPc: { min: "1500px" },
        headerMiddle: { max: "1500px" },
        tablePc: { min: "1500px" },
        // new view modes
        xtraLarge: { min: "1920px" },
        medium: { min: "1108px", max: "1919px" },
        small: { min: "376px" },
        Laptop: { min: "1600px" },
        navMedium: { max: "1350px" },
        navMobile: { max: "900px" },
        navPc: { min: "900px" },
        "2xl": "1537px",
      },
      width: {
        table: "842px",
      },
      minWidth: {
        table: "842px",
      },
      maxWidth: {
        table: "842px",
      },
      boxShadow: {
        buttonShadow: "0px 10px 0px #654302",
        innerShadow: "inset 0 0px 18px 4px #C57D27",
      },
      animation: {
        fade: "fadeOut 3s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
    },
    fontFamily: {
      hylia: ["Hylia Serif Beta", "sans-serif"],
      "open-sans": ["Open Sans", "sans-serif"],
      optimus: ["Optimus Princeps", "sans-serif"],
      tuska: ["Dejitaru Tsuka", "sans-serif"],
      RussoOne: ["RussoOne-Regular", "sans-serif"],
    },
  },
  purge: {
    content: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
    options: {
      safelist: [
        'text-[#FFCE31]', 
        'text-[#FFFFFF]', 
        'border-[#FFCE31]', 
        'bg-[#FFCE31]', 
        'bg-[#FFFFFF]', 
        'bg-white', 
        'text-white',
        'bg-[#DF2040]',
        'bg-[#181818]',
        'text-down',
        'text-up',
      ],
    },
  },
  plugins: [],
};
