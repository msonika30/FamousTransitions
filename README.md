#Famous Transitions
> A project that creates smooth 2D and 3D browser animations using the Famous transition library.

Check out the Famous transition library at --> http://famous.org/

Design inspired by Flux Slider created by Joe Lambart --> https://github.com/joelambert/Flux-Slider

Check out the article on how the animations are done at --> http://www.sonikblasts.com/tech-blog.html

Sample demo at --> http://www.sonikblasts.com/famoustransitions/main.html

---

###Installation

```bash
git clone https://github.com/msonika30/FamousTransitions
cd FamousTransitions
npm install
```

---

###Development
Run the dev server with ```npm run dev```

Now the dev server with a demo of transitions should be running on localhost:1618

---

###Usage

```bash
var Animator = new AnimatorClass();
var transition = 'Blocks';
var options = {
	width: 500,
	height: 500,
	options.scaleTo = 0.8;
    options.scaleDuration = 200;
    options.fadeOutDuration = 200;
    options.randomSelection = true; //options for other animations can be seen in public/index.html file
}
Animator.animate(transition, options);
```

See src/Animator.js to understand how the actual transitions are called

---

###Known Issues
1) 3D animations have a flickr at the end of animation

2) The child elements added to simulate the animation cause slight decrease in the size of the image

3) 3D animations do not work on iOS mobile browsers (other mobile platforms haven't been tested yet)

---

###Need help?

You can learn about famous library at --> http://famous.org/learn

There are api docs at --> http://famous.org/docs

Contact me at --> https://m.sonika30@gmail.com

---

###LICENSE

MIT