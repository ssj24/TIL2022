# [w3c css tutorials](https://www.w3schools.com/css/default.asp)

HTML was NEVER intended to contain tags for formatting a web page!

HTML was created to **describe** the content of a web page.

CSS removed the style formatting from the HTML page!



CSS selectors are used to "find" (or select) the HTML elements you want to style.

We can divide CSS selectors into five categories:

- Simple selectors (select elements based on name, id, class)
- [Combinator selectors](https://www.w3schools.com/css/css_combinators.asp) (select elements based on a specific relationship between them)
- [Pseudo-class selectors](https://www.w3schools.com/css/css_pseudo_classes.asp) (select elements based on a certain state)
- [Pseudo-elements selectors](https://www.w3schools.com/css/css_pseudo_elements.asp) (select and style a part of an element)
- [Attribute selectors](https://www.w3schools.com/css/css_attribute_selectors.asp) (select elements based on an attribute or attribute value)

An id or class name **cannot** start with a number!

You can also specify that only specific HTML elements should be affected by a class.
(p.today => select p tag with today class)

The universal selector (*) selects all HTML elements on the page.

The grouping selector selects all the HTML elements with the same style definitions.(if there are styles that common in several tags, just select them with comma. `h1, p, button {}`)



## insert css

- external css

  ```html
  <head>
  	<link rel="stylesheet" href="mystyle.css">
  </head>
  ```

- internal css

  ```html
  <head>
  <style>
  body {
    background-color: linen;
  }
  
  h1 {
    color: maroon;
    margin-left: 40px;
  }
  </style>
  </head>
  ```

- inline css

  An inline style may be used to apply a unique style for a single element.

  ```html
  <h1 style="color:blue;text-align:center;">This is a heading</h1>
  ```

  

If some properties have been defined for the same selector (element) in different style sheets, **the value from the last read** style sheet will be used. 

Assume that both **external style sheet** and an **internal style sheet** have the style for the <h1> element. If the internal style is defined **after** the link to the external style sheet, the <h1> element's style will follow internal style. However, if the internal style is defined **before** the link to the external style sheet like below, the <h1> element's style will follow external style sheet.

```html
<head>
<style>
h1 {
  color: orange;
}
</style>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```



### cascading order

All the styles in a page will "cascade" into a new "virtual" style sheet by the following rules, where number one has the highest priority:

1. Inline style (inside an HTML element)
2. External and internal style sheets (in the head section)
3. Browser default

So, an **inline style** has the highest priority, and will override external and internal styles and browser defaults.



## comments

Comments are ignored by browsers.

A CSS comment is placed inside the `<style>` element, and starts with `/*` and ends with `*/`.

Comments can also span multiple lines.

(comments of HTML source use the `<!--...-->` syntax.)



## colors

Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.

there are 140 pre-defined color name. [link](https://www.w3schools.com/colors/colors_names.asp) <span style="background-color: LavenderBlush;">lavenderblush</span>

- An RGB color value represents RED, GREEN, and BLUE light sources. 

  **rgb(*red,* *green*, *blue*)**

  Each parameter (red, green, and blue) defines the intensity of the color between 0 and 255.

  For example, rgb(255, 0, 0) is displayed as red, because red is set to its highest value (255) and the others are set to 0.

  To display black, set all color parameters to 0, like this: rgb(0, 0, 0).

  To display white, set all color parameters to 255, like this: rgb(255, 255, 255).

  

  **RGBA** color values are an extension of RGB color values with an alpha channel - which specifies the opacity for a color.

  An RGBA color value is specified with:

  rgba(*red,* *green*, *blue, alpha*)

  The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (not transparent at all):

- A hexadecimal color is specified with: #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color.

  **\#rrggbb**

  Where rr (red), gg (green) and bb (blue) are hexadecimal values between 00 and ff (same as decimal 0-255).

  For example, #ff0000 is displayed as red, because red is set to its highest value (ff) and the others are set to the lowest value (00).

  To display black, set all values to 00, like this: #000000.

  To display white, set all values to ff, like this: #ffffff.  

  

  The 3-digit hex code is a shorthand for some 6-digit hex codes.

  The 3-digit hex code has the following form:

  \#*rgb*

  Where r, g, and b represent the red, green, and blue components with values between 0 and f.

  The 3-digit hex code can only be used when both the values (RR, GG, and BB) are the same for each component. So, if we have #ff00cc, it can be written like this: #f0c.

- HSL stands for hue, saturation, and lightness.

  hsl(*hue*, *saturation*, *lightness*)

  Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue.

  Saturation is a percentage value. 0% means a shade of gray, and 100% is the full color.

  Lightness is also a percentage. 0% is black, 50% is neither light or dark, 100% is white.

  **Saturation** can be described as the intensity of a color.

  100% is pure color, no shades of gray.

  50% is 50% gray, but you can still see the color.

  0% is completely gray; you can no longer see the color.

  The **lightness** of a color can be described as how much light you want to give the color, where 0% means no light (black), 50% means 50% light (neither dark nor light) and 100% means full lightness (white).

  Shades of gray are often defined by setting the hue and saturation to 0, and adjust the lightness from 0% to 100% to get darker/lighter shades.

  

  **HSLA** color values are an extension of HSL color values with an alpha channel(opacity for a color).

  hsla(*hue,* *saturation*, *lightness, alpha*)

  The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (not transparent at all):

  

## backgrounds

- `background-color`

  opacity

  ```css
  div {
    background-color: green;
    opacity: 0.3;
  }
  ```

  When using the `opacity` property to add transparency to the background of an element, all of its child elements inherit the same transparency. This can make the text inside a fully transparent element hard to read. If you do not want to apply opacity to child elements, like in our example above, use **RGBA** color values. `background: rgba(0, 128, 0, 0.3) /* Green background with 30% opacity */`

- `background-image`

  By default, the image is repeated so it covers the entire element.

  `background-image: url("paper.gif");`

- `background-repeat`

  repeat-x, repeat-y, no-repeat

- `background-attachment`

  whether the background image should scroll or be fixed (will not scroll with the rest of the page)

  fixed, scroll

- `background-position`

  Sets the starting position of a background image

  `background-position: right top;`

- `background` (shorthand property)

  ```css
  body {
    background-color: #ffffff;
    background-image: url("img_tree.png");
    background-repeat: no-repeat;
    background-position: right top;
  }
  
  body {
    background: #ffffff url("img_tree.png") no-repeat right top;
  }
  ```

  When using the shorthand property the order of the property values is:

  - `background-color`
  - `background-image`
  - `background-repeat`
  - `background-attachment`
  - `background-position`

  **It does not matter if one of the property values is missing**, as long as the other ones are in this order. Note that we do not use the background-attachment property in the examples above, as it does not have a value.

| Property                                                     | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [background](https://www.w3schools.com/cssref/css3_pr_background.asp) | Sets all the background properties in one declaration        |
| [background-attachment](https://www.w3schools.com/cssref/pr_background-attachment.asp) | Sets whether a background image is fixed or scrolls with the rest of the page |
| [background-clip](https://www.w3schools.com/cssref/css3_pr_background-clip.asp) | Specifies the painting area of the background                |
| [background-color](https://www.w3schools.com/cssref/pr_background-color.asp) | Sets the background color of an element                      |
| [background-image](https://www.w3schools.com/cssref/pr_background-image.asp) | Sets the background image for an element                     |
| [background-origin](https://www.w3schools.com/cssref/css3_pr_background-origin.asp) | Specifies where the background image(s) is/are positioned    |
| [background-position](https://www.w3schools.com/cssref/pr_background-position.asp) | Sets the starting position of a background image             |
| [background-repeat](https://www.w3schools.com/cssref/pr_background-repeat.asp) | Sets how a background image will be repeated                 |
| [background-size](https://www.w3schools.com/cssref/css3_pr_background-size.asp) | Specifies the size of the background image(s)                |



## border

The `border-style` property specifies what kind of border to display.

https://www.w3schools.com/css/css_border.asp

- `dotted` - Defines a dotted border
- `dashed` - Defines a dashed border
- `solid` - Defines a solid border
- `double` - Defines a double border
- `groove` - Defines a 3D grooved border. The effect depends on the border-color value
- `ridge` - Defines a 3D ridged border. The effect depends on the border-color value
- `inset` - Defines a 3D inset border. The effect depends on the border-color value
- `outset` - Defines a 3D outset border. The effect depends on the border-color value
- `none` - Defines no border
- `hidden` - Defines a hidden border

The `border-style` property can have from one to four values (for the top border, right border, bottom border, and the left border).

`border-style: dotted dashed solid double;`

**None of the OTHER CSS border properties (which you will learn more about in the next chapters) will have ANY effect unless the `border-style` property is set!**



### border-width

The `border-width` property specifies the width of the four borders.

The width can be set as a specific size (in px, pt, cm, em, etc) or by using one of the three pre-defined values: thin, medium, or thick.

The `border-width` property can have from one to four values (for the top border, right border, bottom border, and the left border):

```css
p.one {
  border-style: solid;
  border-width: 5px; /* 5px on every four sides */
}
p.one {
  border-style: solid;
  border-width: 5px 20px; /* 5px top and bottom, 20px on the sides */
}

p.two {
  border-style: solid;
  border-width: 20px 5px; /* 20px top and bottom, 5px on the sides */
}

p.three {
  border-style: solid;
  border-width: 25px 10px 4px 35px; /* 25px top, 10px right, 4px bottom and 35px left */
```



### border-color

The `border-color` property is used to set the color of the four borders.

The color can be set by:

- name - specify a color name, like "red"
- HEX - specify a HEX value, like "#ff0000"
- RGB - specify a RGB value, like "rgb(255,0,0)"
- HSL - specify a HSL value, like "hsl(0, 100%, 50%)"
- transparent

If `border-color` is not set, it inherits the color of the element.

`border-color: red green blue yellow; /* red top, green right, blue bottom and yellow left */`



### border sides

there are also properties for specifying each of the borders (top, right, bottom, and left):

```css
p {
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
}
```

=== `border-style: dotted solid;`

If the `border-style` property has four values:

- border-style: dotted solid double dashed;
  - top border is dotted
  - right border is solid
  - bottom border is double
  - left border is dashed

If the `border-style` property has three values:

- border-style: dotted solid double;
  - top border is dotted
  - right and left borders are solid
  - bottom border is double

The `border-style` property can work with `border-width` and `border-color`.



### shorthand

The `border` property is a shorthand property for the following individual border properties:

- `border-width`
- `border-style` (required)
- `border-color`

`border: 5px solid red;`



### rounded border

The `border-radius` property is used to add rounded borders to an element:



## margins

CSS has properties for specifying the margin for each side of an element:

- `margin-top`
- `margin-right`
- `margin-bottom`
- `margin-left`

All the margin properties can have the following values:

- auto - the browser calculates the margin
- *length* - specifies a margin in px, pt, cm, etc.
- *%* - specifies a margin in % of the width of the containing element
- inherit - specifies that the margin should be inherited from the parent element

**Tip:** Negative values are **allowed**.

shorthand works too. `margin: 25px 50px 75px 100px;`

You can set the margin property to `auto` to **horizontally center** the element within its container.

The element will then take up **the specified width**, and the remaining space will be split equally between the left and right margins.



the left margin of the <p class="ex1"> element be inherited from the parent element (<div>):

```css
div {
  border: 1px solid red;
  margin-left: 100px;
}

div p.ex1 {
  margin-left: inherit;
}
```

both div and p have left margin 100px



### margin collapse

Top and bottom margins of elements are sometimes collapsed into a single margin that is equal to the largest of the two margins.

This does not happen on left and right margins! **Only top and bottom** margins!

```css
h1 {
  margin: 0 0 50px 0;
}

h2 {
  margin: 20px 0 0 0;
}
```

in this case only 50px of margin is left.



## padding

Padding is used to create space around an element's content, inside of any defined borders.

CSS has properties for specifying the padding for each side of an element:

- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`

All the padding properties can have the following values:

- *length* - specifies a padding in px, pt, cm, etc.
- *%* - specifies a padding in % of the width of the containing element
- inherit - specifies that the padding should be inherited from the parent element

**Note:** Negative values are **not** allowed.



The CSS `width` property specifies the width of the element's content area. The content area is the portion inside the padding, border, and margin of an element ([the box model](https://www.w3schools.com/css/css_boxmodel.asp)).

So, if an element has a specified width, the padding added to that element will be added to the total width of the element. This is often an undesirable result.

```css
div {
  width: 300px;
  padding: 25px;
}
```

the <div> element is given a width of 300px. However, the actual width of the <div> element will be 350px (300px + 25px of left padding + 25px of right padding)

To keep the width at 300px, no matter the amount of padding, you can use the `box-sizing` property. This causes the element to maintain its actual width; if you increase the padding, the available content space will decrease.

```css
div {
  width: 300px;
  padding: 25px;
  box-sizing: border-box;
}
```



## height, width

The `height` and `width` properties may have the following values:

- `auto` - This is default. The browser calculates the height and width
- `length` - Defines the height/width in px, cm, etc.
- `%` - Defines the height/width in percent of the containing block
- `initial` - Sets the height/width to its default value
- `inherit` - The height/width will be inherited from its parent value

Remember that the `height` and `width` properties do not include padding, borders, or margins! They set the height/width of the area inside the padding, border, and margin of the element!

The `max-width` can be specified in *length values*, like px, cm, etc., or in percent (%) of the containing block, or set to none (this is default. Means that there is no maximum width).

The problem with the `<div>` above occurs when the browser window is smaller than the width of the element (500px). The browser then adds a horizontal scrollbar to the page.

Using `max-width` instead, in this situation, will improve the browser's handling of small windows.

If you for some reason use both the `width` property and the `max-width` property on the same element, and the value of the `width` property is larger than the `max-width` property; the `max-width` property will be used (and the `width` property will be ignored).

`max/min-heght/width`



## Box Model

All HTML elements can be considered as boxes.

The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

The box model allows us to add a border around elements, and to define space between elements. 

When you set the width and height properties of an element with CSS, you just set the width and height of the **content area**. To calculate the full size of an element, you must also add padding, borders and margins.

```css
div {
  width: 320px;
  padding: 10px;
  border: 5px solid gray;
  margin: 0;
}
```

this div have a total width of 350px



## outline

An outline is a line drawn outside the element's border  to make the element "stand out".

CSS has the following outline properties:

- `outline-style`
- `outline-color`
- `outline-width`
- `outline-offset`
- `outline`

The `outline-style` property specifies the style of the outline, and can have one of the following values:

- `dotted` - Defines a dotted outline
- `dashed` - Defines a dashed outline
- `solid` - Defines a solid outline
- `double` - Defines a double outline
- `groove` - Defines a 3D grooved outline
- `ridge` - Defines a 3D ridged outline
- `inset` - Defines a 3D inset outline
- `outset` - Defines a 3D outset outline
- `none` - Defines no outline
- `hidden` - Defines a hidden outline

**None of the other outline properties (which you will learn more about in the next chapters) will have ANY effect unless the `outline-style` property is set!**

The `outline-width` property specifies the width of the outline, and can have one of the following values:

- thin (typically 1px)
- medium (typically 3px)
- thick (typically 5px)
- A specific size (in px, pt, cm, em, etc)

The `outline-color` property is used to set the color of the outline.

The color can be set by:

- name - specify a color name, like "red"
- HEX - specify a hex value, like "#ff0000"
- RGB - specify a RGB value, like "rgb(255,0,0)"
- HSL - specify a HSL value, like "hsl(0, 100%, 50%)"
- invert - performs a color inversion (which ensures that the outline is visible, regardless of color background)

The `outline` property is a shorthand property for setting the following individual outline properties:

- `outline-width`
- `outline-style` (required)
- `outline-color`

### outline-offset

The `outline-offset` property adds space between an outline and the edge/border of an element. The space between an element and its outline is transparent.

```css
p {
  margin: 30px;
  border: 1px solid black;
  outline: 1px solid red;
  outline-offset: 15px;
}
```

an outline 15px outside the border edge



## text

### Text Alignment and Text Direction

In this chapter you will learn about the following properties:

- `text-align`
- `text-align-last`
- `direction`
- `unicode-bidi`
- `vertical-align`

### text alignment

The `text-align` property is used to set the horizontal alignment of a text.

A text can be left or right aligned, centered, or justified.

left, right, center, justify

left alignment is default if text direction is left-to-right, and right alignment is default if text direction is right-to-left

When the `text-align` property is set to "justify", each line is stretched so that every line has equal width, and the left and right margins are straight (like in magazines and newspapers):

The `text-align-last` property specifies how to align the last line of a text.

The `direction` and `unicode-bidi` properties can be used to change the text direction of an element:

```css
p {
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

### vertical alignment

```css
img.a {
  vertical-align: baseline;
}

img.b {
  vertical-align: text-top;
}

img.c {
  vertical-align: text-bottom;
}

img.d {
  vertical-align: sub;
}

img.e {
  vertical-align: super;
}
```

### text decoration

- `text-decoration-line`
- `text-decoration-color`
- `text-decoration-style` : solid, double...
- `text-decoration-thickness`
- `text-decoration`

The `text-decoration-line` property is used to add a decoration line to text.

**Tip:** You can combine more than one value, like overline and underline to display lines both over and under a text.

It is not recommended to underline text that is not a link, as this often confuses the reader.

```css
h1 {
  text-decoration-line: overline;
}

h2 {
  text-decoration-line: line-through;
}

h3 {
  text-decoration-line: underline;
}

p {
  text-decoration-line: overline underline;
```



The `text-decoration` property is a shorthand property for:

- `text-decoration-line` (required)
- `text-decoration-color` (optional)
- `text-decoration-style` (optional)
- `text-decoration-thickness` (optional)

All links in HTML are underlined by default. Sometimes you see that links are styled with no underline. The `text-decoration: none;` is used to remove the underline from links



### text transform

The `text-transform` property is used to specify uppercase and lowercase letters in a text.

text-transform: uppercase;

 text-transform: lowercase;

text-transform: capitalize;

### text-spacing

- `text-indent`: The `text-indent` property is used to specify the indentation of the first line of a text.

- `letter-spacing`: used to specify the space between the characters in a text.

- `line-height`: specify the space between lines:

- `word-spacing`: specify the space between the words in a text.

- `white-space`: specifies how white-space inside an element is handled.

  | normal   | Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary. This is default |
  | -------- | ------------------------------------------------------------ |
  | nowrap   | Sequences of whitespace will collapse into a single whitespace. Text will never wrap to the next line. The text continues on the same line until a <br> tag is encountered |
  | pre      | Whitespace is preserved by the browser. Text will only wrap on line breaks. Acts like the <pre> tag in HTML |
  | pre-line | Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary, and on line breaks |
  | pre-wrap | Whitespace is preserved by the browser. Text will wrap when necessary, and on line breaks |
  | initial  | Sets this property to its default value. [Read about *initial*](https://www.w3schools.com/cssref/css_initial.php) |
  | inherit  | Inherits this property from its parent element. [Read about *inherit*](https://www.w3schools.com/cssref/css_inherit.php) |

```css
p {
  text-indent: 50px;
  letter-spacing: -2px;
  line-height: 1.8;
  word-spacing: 10px;
  white-space: nowrap;
}
```

### text-shadow

adds shadow to text.

```css
h1 {
  text-shadow: 2px 2px 5px red;
}
h2 {
  text-shadow: 2px 2px black;
}
```

first pixel: x, second pixel: y, third pixel is blur

```css
h1 {
  text-shadow: 0 0 3px #ff0000, 0 0 5px #0000ff;
}

h2 {
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}
```



## font

### Generic Font Families

In CSS there are five generic font families:

1. **Serif** fonts have a small stroke at the edges of each letter. They create a sense of formality and elegance.
2. **Sans-serif** fonts have clean lines (no small strokes attached). They create a modern and minimalistic look.
3. **Monospace** fonts - here all the letters have the same fixed width. They create a mechanical look. 
4. **Cursive** fonts imitate human handwriting.
5. **Fantasy** fonts are decorative/playful fonts.

All the different font names belong to one of the generic font families. 



### font-family

the `font-family` property to specify the font of a text.

If the font name is more than one word, it must be in quotation marks, like: "Times New Roman".

The `font-family` property should hold several font names as a "fallback" system, to ensure maximum compatibility between browsers/operating systems. Start with the font you want, and end with a generic family (to let the browser pick a similar font in the generic family, if no other fonts are available). The font names should be separated with comma.

### Web Safe Fonts

Web safe fonts are fonts that are universally installed across all browsers and devices.

However, there are no 100% completely web safe fonts. There is always a chance that a font is not found or is not installed properly.

Therefore, it is very important to always use fallback fonts.

#### Best Web Safe Fonts for HTML and CSS

The following list are the best web safe fonts for HTML and CSS:

- Arial (sans-serif)
- Verdana (sans-serif)
- Tahoma (sans-serif)
- Trebuchet MS (sans-serif)
- Times New Roman (serif)
- Georgia (serif)
- Garamond (serif)
- Courier New (monospace)
- Brush Script MT (cursive)

#### Commonly Used Font Fallbacks

Below are some commonly used font fallbacks, organized by the 5 generic font families:

- **Serif**
- **Sans-serif**
- **Monospace**
- **Cursive**
- **Fantasy**



### font style

The `font-style` property is mostly used to specify italic text.

This property has three values:

- normal - The text is shown normally
- italic - The text is shown in italics
- oblique - The text is "leaning" (oblique is very similar to italic, but less supported)

### font weight

The `font-weight` property specifies the weight of a font:

normal, light, bold, 100~900

### font variant

The `font-variant` property specifies whether or not a text should be displayed in a small-caps font.

In a small-caps font, all lowercase letters are converted to uppercase letters. However, the converted uppercase letters appears in a smaller font size than the original uppercase letters in the text.

normal, small-caps

### font size

you should not use font size adjustments to make paragraphs look like headings, or headings look like paragraphs.

Always use the proper HTML tags, like <h1> - <h6> for headings and <p> for paragraphs.

The font-size value can be an absolute, or relative size.

Absolute size:

- Sets the text to a specified size
- Does not allow a user to change the text size in all browsers (bad for accessibility reasons)
- Absolute size is useful when the physical size of the output is known

Relative size:

- Sets the size relative to surrounding elements
- Allows a user to change the text size in browsers

If you do not specify a font size, the default size for normal text, like paragraphs, is **16px** (16px=1em).

If you use **pixels**, you can still use the zoom tool to resize the entire page.

To allow users to resize the text (in the browser menu), many developers use **em** instead of pixels.

1em is equal to the current font size. The default text size in browsers is 16px. So, the default size of 1em is 16px.

The size can be calculated from pixels to em using this formula: *pixels*/16=*em*

`font-size: 2.5em; `/* 40px/16=2.5em */

with the em size, it is possible to adjust the text size in all browsers.

#### Use a Combination of Percent and Em

The solution that works in all browsers, is to set a default font-size in percent for the <body> element:

```css
body {
  font-size: 100%;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1.875em;
}

p {
  font-size: 0.875em;
}
```

#### responsive font size

The text size can be set with a `vw` unit, which means the "viewport width".

That way the text size will follow the size of the browser window

`<h1 style="font-size:10vw">Hello World</h1>`

1vw = 1% of viewport width.



#### google fonts

If you do not want to use any of the standard fonts in HTML, you can use Google Fonts.

Just add a special style sheet link in the <head> section and then refer to the font in the CSS.

```html
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
<style>
body {
  font-family: "Sofia", sans-serif;
}
</style>
</head>
```

to use multiple Google fonts, just separate the font names with a pipe character (`|`)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong">
```

Requesting multiple fonts may slow down your web pages! So be careful about that.

Google has also enabled different font effects that you can use.

First add `effect=effectname` to the Google API, then add a special class name to the element that is going to use the special effect. The class name always starts with `font-effect-` and ends with the `effectname`.

```html
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia&effect=fire">
<style>
body {
  font-family: "Sofia", sans-serif;
  font-size: 30px;
}
</style>
</head>
<body>

<h1 class="font-effect-fire">Sofia on Fire</h1>

</body>
```

```html
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia&effect=neon|outline|emboss|shadow-multiple">
<style>
body {
  font-family: "Sofia", sans-serif;
  font-size: 30px;
}
</style>
</head>
<body>

<h1 class="font-effect-neon">Neon Effect</h1>
<h1 class="font-effect-outline">Outline Effect</h1>
<h1 class="font-effect-emboss">Emboss Effect</h1>
<h1 class="font-effect-shadow-multiple">Multiple Shadow Effect</h1>

</body>
```



### font parings

#### 1. Complement

It is always safe to find font pairings that complement one another.

A great font combination should harmonize, without being too similar or too different.

#### 2. Use Font Superfamilies

A font superfamily is a set of fonts designed to work well together. So, using different fonts **within the same superfamily** is safe.

For example, the Lucida superfamily contains the following fonts: Lucida Sans, Lucida Serif, Lucida Typewriter Sans, Lucida Typewriter Serif and Lucida Math.

#### 3. Contrast is King

Two fonts that are too similar will often conflict. However, contrasts, done the right way, brings out the best in each font.

Example: Combining serif with sans serif is a well known combination.

A strong superfamily includes both serif and sans serif variations of the same font (e.g. Lucida and Lucida Sans).

#### 4. Choose Only One Boss

One font should be the boss. This establishes a hierarchy for the fonts on your page. This can be achieved by varying the size, weight and color.

#### popular parings

- Georgia and Verdana
- Helvetica and Garamond
- --google fonts--
- Merriweather and Open Sans
- Ubuntu and Lora
- Abril Fatface and Poppins
- Cinzel and Fauna One
- Fjalla One and Libre Baskerville
- Space Mono and Muli
- Spectral and Rubik
- Oswald and Noto Sans



### font property

The `font` property is a shorthand property for:

- `font-style`
- `font-variant`
- `font-weight`
- `font-size/line-height`
- `font-family`

**Note:** The `font-size` and `font-family` values are **required**. If one of the other values is missing, their default value are used.

```css
p.a {
  font: 20px Arial, sans-serif;
}

p.b {
  font: italic small-caps bold 12px/30px Georgia, serif;
}
```



## link

The four links states are:

- `a:link` - a normal, unvisited link
- `a:visited` - a link the user has visited
- `a:hover` - a link when the user mouses over it
- `a:active` - a link the moment it is clicked

When setting the style for several link states, there are some order rules:

- a:hover MUST come after a:link and a:visited
- a:active MUST come after a:hover

The `text-decoration` property is mostly used to remove underlines from links:

`text-decoration: none;`

### cursors

demonstrates the different types of cursors (can be useful for links):

```html
<span style="cursor: auto">auto</span><br>
<span style="cursor: crosshair">crosshair</span><br>
<span style="cursor: default">default</span><br>
<span style="cursor: e-resize">e-resize</span><br>
<span style="cursor: help">help</span><br>
<span style="cursor: move">move</span><br>
<span style="cursor: n-resize">n-resize</span><br>
<span style="cursor: ne-resize">ne-resize</span><br>
<span style="cursor: nw-resize">nw-resize</span><br>
<span style="cursor: pointer">pointer</span><br>
<span style="cursor: progress">progress</span><br>
<span style="cursor: s-resize">s-resize</span><br>
<span style="cursor: se-resize">se-resize</span><br>
<span style="cursor: sw-resize">sw-resize</span><br>
<span style="cursor: text">text</span><br>
<span style="cursor: w-resize">w-resize</span><br>
<span style="cursor: wait">wait</span>
```



## list

In HTML, there are two main types of lists:

- unordered lists (<ul>) - the list items are marked with bullets
- ordered lists (<ol>) - the list items are marked with numbers or letters

The CSS list properties allow you to:

- Set different list item markers for ordered lists
- Set different list item markers for unordered lists
- Set an image as the list item marker
- Add background colors to lists and list items



Anything added to the <ol> or <ul> tag, affects the entire list, while properties added to the <li> tag will affect the individual list items.

### List Item Markers

The `list-style-type` property specifies the type of list item marker.

```html
ul.a {
  list-style-type: circle;
}

ul.b {
  list-style-type: square;
}

ol.c {
  list-style-type: upper-roman;
}

ol.d {
  list-style-type: lower-alpha;
}
```

The `list-style-image` property specifies an image as the list item marker:

`ul {list-style-image: url('sqpurple.gif');}`

The `list-style-position` property specifies the position of the list-item markers (bullet points).

`list-style-position: outside;` means that the bullet points will be outside the list item. The start of each line of a list item will be aligned vertically. This is default.

`list-style-position: inside;` means that the bullet points will be inside the list item. As it is part of the list item, it will be part of the text and push the text at the start.



### remove default setting

The `list-style-type:none` property can also be used to remove the markers/bullets. Note that the list also has default margin and padding. To remove this, add `margin:0` and `padding:0` to <ul> or <ol>:



### List - Shorthand property

`list-style: square inside url("sqpurple.gif");`

When using the shorthand property, the order of the property values are:

- `list-style-type` (if a list-style-image is specified, the value of this property will be displayed if the image for some reason cannot be displayed)
- `list-style-position` (specifies whether the list-item markers should appear inside or outside the content flow)
- `list-style-image` (specifies an image as the list item marker)

If one of the property values above is missing, the default value for the missing property will be inserted, if any.



## tables

### border

To specify table borders in CSS, use the `border` property.

```css
table, th, td {
  border: 1px solid;
}
```

Notice that the table from the examples above have double borders. This is because both the table and the <th> and <td> elements have separate borders.

The `border-collapse` property sets whether the table borders should be collapsed into a single border:

```css
table {
  border-collapse: collapse;
}
```

If you only want a border around the table, only specify the `border` property for <table>

### Horizontal Alignment

The `text-align` property sets the horizontal alignment (like left, right, or center) of the content in <th> or <td>.

By default, the content of <th> elements are center-aligned and the content of <td> elements are left-aligned.

To center-align the content of <td> elements as well, use `text-align: center`:

### Vertical Alignment

The `vertical-align` property sets the vertical alignment (like top, bottom, or middle) of the content in <th> or <td>.

By default, the vertical alignment of the content in a table is middle (for both <th> and <td> elements).

### Striped Tables

For zebra-striped tables, use the `nth-child()` selector and add a `background-color` to all even (or odd) table rows

```css
tr:nth-child(even) {background-color: #f2f2f2;}
```

### Responsive Table

A responsive table will display a horizontal scroll bar if the screen is too small to display the full content:

Add a container element (like <div>) with `overflow-x:auto` around the <table> element to make it responsive

```html
<div style="overflow-x:auto;">

<table>
... table content ...
</table>

</div>
```

In OS X Lion (on Mac), scrollbars are hidden by default and only shown when being used (even though "overflow:scroll" is set).



### CSS Table Properties

| Property                                                     | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [border](https://www.w3schools.com/cssref/pr_border.asp)     | Sets all the border properties in one declaration            |
| [border-collapse](https://www.w3schools.com/cssref/pr_border-collapse.asp) | Specifies whether or not table borders should be collapsed   |
| [border-spacing](https://www.w3schools.com/cssref/pr_border-spacing.asp) | Specifies the distance between the borders of adjacent cells |
| [caption-side](https://www.w3schools.com/cssref/pr_tab_caption-side.asp) | Specifies the placement of a table caption                   |
| [empty-cells](https://www.w3schools.com/cssref/pr_tab_empty-cells.asp) | Specifies whether or not to display borders and background on empty cells in a table |
| [table-layout](https://www.w3schools.com/cssref/pr_tab_table-layout.asp) | Sets the layout algorithm to be used for a table             |

#### empty-cells

The `empty-cells` property sets whether or not to display borders on empty cells in a table.

**Note:** This property has no effect if [border-collapse](https://www.w3schools.com/cssref/pr_border-collapse.php) is "collapse".

show|hide|initial|inherit;

```css
table {
  empty-cells: hide;
}
```



## Layout - The display Property

The `display` property specifies if/how an element is displayed.

Every HTML element has a default display value depending on what type of element it is. The default display value for most elements is `block` or `inline`.

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

Examples of block-level elements:

- div
- h1-h6
- p
- form
- header
- footer
- section

An inline element does not start on a new line and only takes up as much width as necessary.

- span
- a
- img



`display: none;` is commonly used with JavaScript to hide and show elements without deleting and recreating them.

The `<script>` element uses `display: none;` as default. 

every element has a default display value. However, you can override this by setting on css.

`display: block;`

Setting the display property of an element only changes **how the element is displayed**, NOT what kind of element it is. So, an inline element with `display: block;` is not allowed to have other block elements inside it.



### Hide an Element - display:none or visibility:hidden?

with the `display: none;`, The element will be hidden, and the page will be displayed as if the element is not there:

`visibility:hidden;` also hides an element.

However, the element will still take up the same space as before. The element will be hidden, but still affect the layout:



## width and max-width

a block-level element always takes up the full width available (stretches out to the left and right as far as it can).

Setting the `width` of a block-level element will prevent it from stretching out to the edges of its container. Then, you can set the margins to auto, to horizontally center the element within its container. The element will take up the specified width, and the remaining space will be split equally between the two margins: