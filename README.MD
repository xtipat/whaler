# **Whaler** - CS374 Design Project

## **Update**
* **19/04/28** Initial setup & add README

## **Index**
1. [Description](#description)
2. [To-do List](#to-do-list)
3. [Assets](#assets)

## **Description**
For now, We are Using HTML/SCSS with pure JavaScript. Framework integration are to be discussed

## **To-do List**
- [ ] Discuss about design choices:
  - [ ] Primary Color
  - [ ] Fonts
- [ ] Discuss Roles & Responsibilities
- [ ] Discuss about JavaScript Framework
- [ ] Test SCSS->CSS Compilation

## **Assets**
### Spectre
[Link to Documentation](https://picturepan2.github.io/spectre/index.html)
<br>Use mainly for [grid](https://picturepan2.github.io/spectre/layout/grid.html). The design (except for primary colors and stuff) is probably kinda similar to ours too so maybe we can use its default design

**Note:**
* If you don't understand what grid is, or what we are using this for, ask in slack.
* At the moment css version is included instead of.min.css just in case we need to edit the style there. But hopefully not. In the end if they are not edited then we'll change to .min.scss instead

### Fontawesome
[Link to Documentation](https://fontawesome.com)
<br> Still tentative, but we probably gonna use this for icons

### iziModal
[Link to Documentation](http://izimodal.marcelodolza.com/)
<br> Use for modals (Popup, Overlay modal, etc.)

**Note:** /me (Fon) added this because it's the only modal presets I know that look nice. We can change if you need

### SASS/SCSS
[Link to Documentation](https://sass-lang.com)
SCSS is a kind of stylesheet that can be compiled to css. This is added just so that we could use variables for colors instead of using the color code explicitly. It'll also be easier to change the primary color

sass/scss have to be compiled to css before including in HTMl, see [this post](https://www.quora.com/How-do-I-insert-an-SCSS-file-into-HTML) for references on watcher. But we didn't test it yet.
