module.exports = {
    "env": {
		"node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "parserOptions": {
        "sourceType": "module",
		"ecmaVersion": 2018,
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
		],
		
		"indent": "off",
		
        "vue/order-in-components": "off",
        "vue/mustache-interpolation-spacing": "off",
        "vue/attributes-order": "off",
		"vue/max-attributes-per-line": "off",
		
        "vue/script-indent": [
            "error",
            "tab",
            {"baseIndent": 1}
		],
		
        "vue/html-indent": [
            "error",
            "tab",
		],

		"no-console": 0,
    }
};

