const man = document.querySelector(".man"),
firstImg = man.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".com i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // shows and hides previous and next image according to "man" scroll left value
    let scrollWidth = man.scrollWidth - man.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = man.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = man.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the "man" scroll left else add to it
        man.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(man.scrollLeft - (man.scrollWidth - man.clientWidth) > -1 || man.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from "man" left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(man.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return man.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    man.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // scrolling images to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    man.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    man.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    man.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
man.addEventListener("mousedown", dragStart);
man.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
man.addEventListener("touchmove", dragging);
man.addEventListener("mouseup", dragStop);
man.addEventListener("touchend", dragStop);