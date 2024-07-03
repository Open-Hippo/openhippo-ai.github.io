#!/bin/bash

# Loop through all HTML files in the current directory
for file in *.html; do
    # Check if file exists (to handle the case where no .html files are found)
    [ -e "$file" ] || continue
    
    # Use sed to remove lines containing the specified strings
    sed -i '' '/fonts\.googleapis\.com/d; /fonts\.gstatic\.com/d; /ajax\.googleapis\.com/d; /WebFont\.load/d' "$file"
    
    echo "Processed $file"
done

echo "All HTML files have been processed."

# Add font-face rules to CSS file
css_file="css/openhippo-ai.webflow.css"  # Change this to your CSS file name if different

# CSS content to append
css_content='
/* luckiest-guy-regular - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Luckiest Guy'"'"';
  font-style: normal;
  font-weight: 400;
  src: url('"'"'../fonts/luckiest-guy-v22-latin-regular.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
/* roboto-300 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Roboto'"'"';
  font-style: normal;
  font-weight: 300;
  src: url('"'"'../fonts/roboto-v30-latin-300.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
/* roboto-regular - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Roboto'"'"';
  font-style: normal;
  font-weight: 400;
  src: url('"'"'../fonts/roboto-v30-latin-regular.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
/* roboto-500 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Roboto'"'"';
  font-style: normal;
  font-weight: 500;
  src: url('"'"'../fonts/roboto-v30-latin-500.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
/* roboto-700 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Roboto'"'"';
  font-style: normal;
  font-weight: 700;
  src: url('"'"'../fonts/roboto-v30-latin-700.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
/* roboto-900 - latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: '"'"'Roboto'"'"';
  font-style: normal;
  font-weight: 900;
  src: url('"'"'../fonts/roboto-v30-latin-900.woff2'"'"') format('"'"'woff2'"'"'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}
'

# Append CSS content to the CSS file
echo "$css_content" >> "$css_file"

echo "Added font-face rules to $css_file"

echo "All files have been processed."