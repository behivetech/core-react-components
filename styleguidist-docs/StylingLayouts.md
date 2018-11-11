A great way for styling layouts in a React environment

All components dealing with layouts should have their own className just like any other component. The main thing about building components that are dealing with layout is trying to keep the styling grouped in that component so you don't have to dig down into other components to see what the rest of the styling is. Another thing to keep in mind is when building components, there may be some common styling shared across the SPA. Think globally when you start building something that has to do with the styling of layouts. If you see something that may be shared across pages, check with the UX designer to see if that's the case and build a generic component to handle this. A good example of this would be the [`<Section />`](/#!/Section) and [`<SectionHeader />`](/#!/SectionHeader) components where there's a globally styled header for each section. The section could also potentially have some global styling for the padding or margins between each section depending on where they are in the layout and if that styling could be shared globally.

## Flexbox Example
Best example would be using something like the css flexbox. So let's say you had a parent component that had three components as its children that need to be part of the flex layout. Instead of having the parent having the styling for `display: flex` and each child's scss file having its own styling for something like `flex: 1 0 auto`, you would want to pass a className from the parent to the child and have all the styling in the parent.

### ParentFlex component

```html
<div className="parent-flex">
    <FirstChild className="parent-flex--first-child" /> // generally add something similar to the component name at the end
    <SecondChild className="parent-flex--second-child" />
    <SecondChild className="parent-flex--third-child" />
</div>
```

This way you can group all the styling related to the flexbox in one file instead of having to look at four different scss files to accomplish the styling, like so:

```scss
.parent-flex {
    align-content: stretch;
    display: flex;
    flex-direction: row;

    &--first-child {
        flex: 0 0 100px; // keeps this fixed width at 100px
    }

    &--second-child {
        flex: 2 0 auto; // allows to grow and take up more space than third-child
    }

    &--third-child {
        flex: 1 0 auto; // allows to grow and take up less space than second-child
    }
}
```

The components would look something like...

### FirstChild component

```jsx static
//...other necessary importing goes here
import classnames from 'classnames';

// you would only have a style sheet for this component if you had to do additional styling with it's layout.

export default class FirstChild extends Component {
    getClass() {
        return classnames('first-child', this.props.className)
    }

    render() {
        return <div className={this.getClass()}>first child</div>
    }
}

//...etc
```

You would repeat the same getClass type of functionality for the SecondChild and ThirdChild components.

## Position Absolute Example
The same type of pattern would also go for dealing with components that need `position: absolute` within a parent component. When using `position: absolute` be sure you set its parent to `position: relative`; otherwise, a good deal of goofiness can start happening when you're trying to style around that or change the viewport size of the window.

### ParentRelative component
```html
<div className="parent-relative">
    <FirstChild className="parent-relative--first-child" /> // generally add something similar to the component name at the end
    <SecondChild />
    <SecondChild />
</div>
```

```scss
.parent-relative {
    position: relative; // be sure to set the parent of absolute children to relative

    &--first-child {
        position: absolute;
        top: 20px;
        left: 20px;
    }
}
```

### FirstChild component
```jsx static
//...other necessary importing goes here
import classnames from 'classnames';

// you would only have a style sheet for this component if you had to do additional styling with it's layout.

export default class FirstChild extends Component {
    getClass() {
        return classnames('first-child', this.props.className)
    }

    render() {
        return <div className={this.getClass()}>first child</div>
    }
}

//...etc
```

The SecondChild and ThirdChild components would not need the getClass functionality since you're not passing any className props into them.

## Avoid Floats

At almost all costs avoid using `float: left` or `float: right`. Both of these pose potential problems and generally require extra styling or DOM elements which are not necessary. A couple of alternatives are making your elements `display: inline-block` or using `position: absolute`. Generally you won't need to use the absolute positioning unless it's something that needs to be at the right side, but even then the inline-block method can be used.

### Using Inline Blocks
The following would mimic floating elements to the left without using float.

```scss
.main {

    &--child {
        display: inline-block;
    }
}
```

```html
<div className="main">
    <div className="main--child">Child 1</div>
    <div className="main--child">Child 2</div>
    <div className="main--child">Child 3</div>
</div>
```

The following would mimic floating elements to the right without using float.

```scss
.main {
    text-align: right;

    &--child {
        display: inline-block;
    }
}
```

```html
<div className="main">
    <div className="main--child">Child 1</div>
    <div className="main--child">Child 2</div>
    <div className="main--child">Child 3</div>
</div>
```

### Using Absolute Positioning

Let's say you had an element on the left side and wanted to have elements on the right side on the same line.
```scss
.main {
    position: relative; // remember to make the parent relative for the child that's absolute

    &--right {
        position: absolute;
        right: 0;
        top: 0; // generally need to set a position for the top so everything aligns

        &-child {
            display: inline-block;
        }
    }
}
```

```html
<div class="main">
    <div class="main--left">I'm on the left</div>
    <div class="main--right">
        <div class="main--right-child">
            Child 1
        </div>
        <div class="main--right-child">
            Child 2
        </div>
        <div class="main--right-child">
            Child 3
        </div>
    </div>
</div>
```