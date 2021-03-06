# ViewportAnimator

ViewportAnimator is an easy to use animation library, to add basic animations to your website.

## How to use

You need to include both, the **.js** and **.css** file in your project and you are ready to go.

To apply an animation, just use one of the available classes, representing the desired animation.

## Available Animations

Here is a list of the currently available animations. You can add your own to the **.css** file.

* vpa-from-right
* vpa-from-left
* vpa-from-bottom
* vpa-flip
* vpa-fade-in
* vpa-pulse

```html
<ul class="vpa-from-bottom">
    <li>Child 1</li>
    <li>Child 1</li>
</ul>
```

## Apply Children Animations

To apply animations to a list of children, just add **-children** as prefix to your animation class.

```html
<ul class="vpa-children-from-bottom">
    <li>Child 1</li>
    <li>Child 1</li>
</ul>
```

## Apply Animation Delay

You can delay animations by adding a class like **vpa-delay-1000** to your class list. 
You can set the delay in ms within the class name. The direct and child animations will be
delayed by the value.

```html
<ul class="vpa-from-bottom vpa-delay-1500">
    <li>Child 1</li>
    <li>Child 1</li>
</ul>
```