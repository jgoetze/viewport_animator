class ViewportAnimator {

    constructor() {
        this.animationClassPrefix = "vpa-";
        this.childrenClassPrefix = "vpa-children-";
        this.classRegex = new RegExp(this.animationClassPrefix);
        this.childDelay = 200; // ms

        this.bound = false;
    }

    bind() {
        if (!window.IntersectionObserver) return;
        if (this.bound) return;

        this.prepareChildren();
        this.bindObserver();
    }

    prepareChildren() {
        let childrenWrappers = document.querySelectorAll(`[class*='${this.childrenClassPrefix}'`);
        let vpa = this;

        childrenWrappers.forEach(function(wrapper) {
            wrapper.classList.forEach(function(wrapperClass) {
                if (wrapperClass.match(vpa.childrenClassPrefix)) {

                    let newChildClass = wrapperClass.replace(vpa.childrenClassPrefix, vpa.animationClassPrefix);

                    let i = 0;
                    for (let child of wrapper.children) {
                        child.classList.add(newChildClass);
                        child.style.animationDelay = `${i * vpa.childDelay}ms`;
                        i++;
                    }

                    wrapper.classList.remove(wrapperClass)

                }
            });
        });
    }

    bindObserver() {
        let objectsToWatch = document.querySelectorAll(`[class*='${this.animationClassPrefix}'`);
        let observer = new IntersectionObserver(this.intersectionCallback);
        let vpa = this;

        objectsToWatch.forEach(function(object) {
            object.classList.forEach(function(objectClass) {
                if (objectClass.match(vpa.classRegex)) {
                    object.dataset.vpaAnimation = objectClass;
                }
            });

            observer.observe(object);
        });
    }

    intersectionCallback(entries) {
        entries.forEach(function (observation) {
            if (observation.isIntersecting) {
                observation.target.style.animationName = observation.target.dataset.vpaAnimation;
            }
        });
    }

}

window.vpa = new ViewportAnimator();
window.vpa.bind();