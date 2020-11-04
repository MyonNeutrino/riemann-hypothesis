import Reveal from './reveal'
import './css'

const theme = "beige"
const pdfTheme = "white"

window.Reveal = Reveal
window.addEventListener('DOMContentLoaded', _ => {
    // More info about config & dependencies:
    // - https://github.com/hakimel/reveal.js#configuration
    // - https://github.com/hakimel/reveal.js#dependencies
    Reveal.initialize({
        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/notes/notes.js', async: true },
            { src: 'plugin/highlight/highlight.js', async: true },
            { src: 'plugin/search/search.js', async: true },
            { src: 'plugin/math/math.js', async: true },
            { src: 'plugin/menu/menu.js', async: true },
            { src: 'plugin/toolbar/toolbar.js', async: true },
            { src: 'plugin/reveal-sampler/sampler.js', async: true },
            { src: 'plugin/time-bar/elapsed-time-bar.js', async: true }
        ],
        menu: {
            numbers: "c/t",
        },
        toolbar: {
            fullscreen: true,
            overview: true,
            notes: true,
            captureMenu: true,
            pause: true
        },
        allottedTime: 3*60*1000, // 3 min
        progressBarHeight: 3,
        barColor: 'rgb(200,0,0)',
        keyboard: {
            13: () => {
                ElapsedTimeBar.isPaused ? ElapsedTimeBar.resume() : ElapsedTimeBar.pause();
            },
            82: () => {
                ElapsedTimeBar.reset();
            }
        }

    });
    Reveal.configure({
        slideNumber: 'c/t',
        controls: false,
        hash: true,
        history: true,
        navigationMode: 'linear',
        fragmentInURL: true,
        mouseWheel: true,
        transition: 'none',
        transitionSpeed: 'fast',
        pdfSeparateFragments: false,
        pdfMaxPagesPerSlide: 1
    })

    let isPrint = window.location.search.match(/print-pdf/gi)

    if (isPrint) {
        require(`./css/reveal/theme/source/${pdfTheme}.scss`)
        document.querySelectorAll('[data-hide-me-on-print]')
            .forEach(elem => {
                let currentElem = elem.parentElement
                let i = 0
                while (currentElem.tagName !== 'SECTION') {
                    currentElem = currentElem.parentElement
                    if (i++ > 10 || currentElem == null ||
                            currentElem.classList == null) {
                        console.warn("could not find slide, stopped searching up the tree")
                        currentElem = null
                        break
                    }
                }
                if (currentElem) currentElem.parentElement
                    .removeChild(currentElem)
            })
        document.querySelectorAll('.slides section:not([data-center])').forEach(elem => {
            let func
            func = () => {
                if (!elem.getAttribute("style") ||
                        elem.style.top === 0) {
                    setTimeout(func, 200)
                } else {
                    console.log("Page position reset successful")
                    elem.style.top = '16px'
                    elem.style.left = '16px'
                }
            }
            func()
        })
    } else {
        require(`./css/reveal/theme/source/${theme}.scss`)
    }

    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href =  isPrint ? 'css/print/pdf.css' : 'css/print/paper.css';
    link.id = 'theme';
    document.getElementsByTagName('head')[0].appendChild(link);

    Reveal.addEventListener('slidechanged', event => {
        Reveal.configure(
            {
                center: typeof event.currentSlide.dataset.center === 'string'
            }
        )
    })

    document.querySelectorAll('.slide-container:not([data-no-fragment]) li, ' +
                                '.slide-container:not([data-no-fragment]) pre')
        .forEach(elem => {
            let currentElem = elem.parentElement
            while (currentElem) {
                if (currentElem.classList.contains("notes")) {
                    console.log("This li is inside speaker notes, skipping.")
                    return
                }
                currentElem = currentElem.parentElement
            }
            elem.classList.add("fragment")
        })

    document.querySelector('body').style.display = ""
})
