class ViewportAnimator {

    constructor() {
        this.animationClassPrefix = "vpa-";
        this.delayClassPrefix = "vpa-delay-";
        this.childrenClassPrefix = "vpa-children-";
        this.classRegex = new RegExp(this.animationClassPrefix);
        this.childDelay = 200; // ms

        this.bound = false;
    }

    bind() {
        if (!window.IntersectionObserver) {
            this.bound = true;
            this.initFallback();
            return;
        };

        if (this.bound) return;

        this.prepareDelay();
        this.prepareChildren();
        this.bindObserver();

        this.bound = true;
    }

    initFallback() {
        let vpaObjects = document.querySelectorAll(`[class*='${this.animationClassPrefix}'`);

        vpaObjects.forEach(function(object) {
            let classesToRemove = [];
            object.classList.forEach(function(objectClass) {
                if (objectClass.match(vpa.classRegex)) classesToRemove.push(objectClass);
            });

            classesToRemove.forEach(function(classToRemove) {
                object.classList.remove(classToRemove);
            });
        });
    }

    prepareDelay() {
        let delayedAnimations = document.querySelectorAll(`[class*='${this.delayClassPrefix}'`);
        let vpa = this;

        delayedAnimations.forEach(function(node) {
            node.classList.forEach(function(nodeClass) {
                if (nodeClass.match(vpa.delayClassPrefix)) {

                    let delay = parseInt(nodeClass.replace(/\D/g,''));
                    node.dataset.vpaDelay = delay;

                    node.classList.remove(nodeClass)

                }
            });
        });
    }

    prepareChildren() {
        let childrenWrappers = document.querySelectorAll(`[class*='${this.childrenClassPrefix}'`);
        let vpa = this;

        childrenWrappers.forEach(function(wrapper) {
            wrapper.classList.forEach(function(wrapperClass) {
                if (wrapperClass.match(vpa.childrenClassPrefix)) {

                    let newChildClass = wrapperClass.replace(vpa.childrenClassPrefix, vpa.animationClassPrefix);
                    let baseDelay = parseInt(wrapper.dataset.vpaDelay || 0);

                    let i = 0;
                    for (let child of wrapper.children) {
                        child.classList.add(newChildClass);
                        child.style.animationDelay = `${(i * vpa.childDelay) + baseDelay}ms`;
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

                    let baseDelay = object.dataset.vpaDelay;
                    if (baseDelay) object.style.animationDelay = `${baseDelay}ms`;

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