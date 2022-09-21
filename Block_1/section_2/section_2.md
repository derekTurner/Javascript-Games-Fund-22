## CSS

Section 2

A cheatsheet is a useful compact format which shows a summary of the available css selectors.  A [cheetsheet example is powered by websitesetup](https://websitesetup.org/wp-content/uploads/2019/11/wsu-css-cheat-sheet-gdocs.pdf).

You need to master selectors which determine which elements are affected by styles and also the available styles which can be applied to HTML5 elements.

For example a file named stye.html is in the public folder,  This includes style inline within an HTML element.

```html
<h1 style="color:blue;margin-left:30px;">
```

This style is close to the header and wins if there is any contention with an inline or external stylesheet.

There is an inline stylesheet in the `<head>` between `<style>` tags.

```css
 div.insheet h1{ color:maroon; margin-left:40px;}
```
This line uses the descendants selector to find an `<h1>` element which is inside a `<div>` with class = "insheet".

An external css file **myStyle.css**

```css
body{  background-color:lightblue;}
h1{     color:navy; 
        margin-left:20px;
}
```

is linked within a `<link>' element.

```html
<link rel="stylesheet" type="text/css" href="CSS/myStyle.css">
```

In general an external stylesheet provides overall style to a full site.  An inline stylesheet provides a local override for a particular page within the site.

Inline style provides a small number of localised or unique style adjustments which override both the external and internal stylesheet.

The full listing of style,html is:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
        <link rel="stylesheet" type="text/css" href="CSS/myStyle.css">
    
        <style> 
            div.insheet{ background-color:linen;}
            div.insheet h1{ color:maroon; margin-left:40px;}
        </style>
    
    </head>
    <body>
        <h1>First Level Heading</h1>
        <p>Opening paragraph.</p>

        <div class ="insheet">
            <h1>Inline stylesheet</h1>
        <p>Inline Stylesheet added to head</p>
        </div>

        <h1 style="color:blue;margin-left:30px;">
            This is a heading with inline style
        </h1>
        
    </body>
</html>
```

Which produces:

<iframe 
    height="250" 
    width="100%" 
    scrolling="no" 
    title="Hello.html" 
    src="Block_1/section_2/public/style.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>