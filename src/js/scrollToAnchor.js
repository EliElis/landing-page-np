const scrollToAnchor = () => {
    let anchors = [].slice.call(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (ev) => {
            ev.preventDefault();
            let hash = ev.currentTarget.getAttribute('href');
            if (document.querySelector(hash)) {
                document.querySelector(hash).scrollIntoView({block: "start", behavior: "smooth"})
            }

        })
    })
};
export default scrollToAnchor;