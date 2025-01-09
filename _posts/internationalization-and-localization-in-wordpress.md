---
title: "Internationalization and Localization in Wordpress"
date: "2018-12-02"
excerpt: ""
tags:
- wordpress
---

When developing a WordPress theme from scratch it’s a good practice to internationalize your theme so it’s available for translation. It will allow people from all over the world to use it in whatever language they need.

<!-- more -->

### What is Internationalization (i18n) and Localization (l10n)?

**I18n** is a process of making your theme translatable. This is the job of the theme developer to get it ready. It’s often abbreviated as i18n because there are 18 letters between the *i* and the *n.*

**L10n** refers to the process of actually translating your theme to another language. This can be done by the theme’s users. In order to localize the theme it has to be internationalized first. Localization is abbreviated as l10n because there are 10 letters between the *l* and the *n.*

### Gettext libraries

WordPress uses gettext libraries to load the translations. It has three types of files:

*POT (Portable Object Template):* The first step in the translation process. This file is responsible for generating strings that need to be translated. However it doesn’t contain any translations by itself.

*PO (Portable Object):* These files on the other hand contain the translations and the original strings.

*MO (Machine Object):* These files are used by functions to load the translations. It’s not human-readable, but they are the most important.

---

### Preparing the Theme

Preparing your theme for internationalization is not as complicated as it might seem. WordPress already provides a set of handy functions for that. First of all we need to include a function in `functions.php` which will load the translations:

```php
function my_theme_load_theme_textdomain() {
    load_theme_textdomain( 'my-theme', get_template_directory() . '/languages' );
}

add_action( ‘after_setup_theme','my_theme_load_theme_textdomain' )
```

The next step is editing text strings. In order to make strings translatable they should not be hardcoded. Wrap the original strings in one of the **WordPress localization functions.** The most commonly used functions:

```php
__()          /* returns the translation of its argument */

_e()          /* echos the string to the browser */

esc_html__()  /* escapes and returns the translation of its argument */

esc_html_e()  /* escapes and echos the translation of its argument */
```

Examples:

```php
<h1>
  <?php __( 'Translatable text goes here', 'theme-domain' ); ?>
</h1>
```

```php
<h1>
  <?php esc_html__( 'Translatable text goes here', 'theme-domain' ); ?>
</h1>
```

Sometimes you need to output variables, date or plurals in your strings. WordPress provides localization functions for all these cases. Check the full list [here](https://developer.wordpress.org/themes/functionality/internationalization/).

When your theme files are ready, the next step is to generate POT file. There are a couple of ways to generate POT file that are described [here](https://developer.wordpress.org/themes/functionality/localization/). I usually use Gulp task runner while developing WordPress themes, so I also create POT file using Gulp (see [gulp-wp-pot](https://www.npmjs.com/package/gulp-wp-pot) package).

```powershell
npm install gulp-wp-pot --save-dev
```

```js
var gulp = require('gulp');
var wpPot = require('gulp-wp-pot');
 
gulp.task('default', function () {
    return gulp.src('src/*.php')
        .pipe(wpPot( {
            domain: 'domain',
            package: 'Example project'
        } ))
        .pipe(gulp.dest('file.pot'));
});
```

The plugin looks for strings enclosed in localization functions and creates POT files with these strings. POT file should be delivered along with the theme so users can translate files using Poedit.

{% asset_img poedit.png %}

[Poedit](https://poedit.net/download) is an open source application and it’s the most popular tool for translating WordPress themes. It takes POT file and generates PO and MO files for the appropriate language.

---

### Now your theme is translation ready!

Internationalization is not something developers can avoid, it’s a must-have today. Besides that if you plan to submit your themes to WordPress.org it’s a requirement.