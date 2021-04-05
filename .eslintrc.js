module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react-hooks/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "no-use-before-define": "off",
        "react/jsx-filename-extension": "off",
        "react/prop-types": "off",
        "comma-dangle": "off",
        "padded-blocks": "off",
        "arrow-body-style": "off",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-one-expression-per-line": "off",
        "object-curly-newline": "off"
    }
};
