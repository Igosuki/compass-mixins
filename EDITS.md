List of things that have changed, diverted or were added from the ruby compass library :

- Paths are relative
- Testing is done with libsass, node-sass and jasmine-node
- No other code is used outside of the sass sheets
- The not operator is changed in favor of the sass function
- Hidden interpolations such as image urls are done in place with the url() function
- The following compass ruby functions have been re-implemented in sass
    + -compass-nth
    + -compass-list-size
    + -compass-slice
    + reject
    + opposite-position
    + elements-of-type
    + prefix
    + -svg
    + -owg
    + -webkit
    + -moz
    + -o
    + -pie
    + first-value-of
    + -compass-space-list
    + color-stops
    + adjust-lightness
    + scale-lightness
    + adjust-saturation
    + scale-saturation
    + shade
    + tint
