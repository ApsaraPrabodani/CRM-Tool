var i18n = require('i18n');

i18n.configure({
    locales: ['en'],
    directory: __dirname,
    defaultLocale: 'en'
});
module.exports.locales = i18n;