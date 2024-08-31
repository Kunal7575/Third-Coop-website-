document.addEventListener('DOMContentLoaded', () => {
    // Menu active state based on scroll position
    let menuLi = document.querySelectorAll('header ul li a');
    let section = document.querySelectorAll('section');

    function activeMenu() {
        let len = section.length;
        while (--len && window.scrollY + 97 < section[len].offsetTop) {}
        menuLi.forEach(sec => sec.classList.remove("active"));
        menuLi[len].classList.add("active");
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);

    // Sticky navbar
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        header.classList.toggle("sticky", this.window.scrollY > 50);
    });

    // Menu icon toggle
    let menuIcon = document.querySelector("#menu-icon");
    let navlist = document.querySelector(".navlist"); // Corrected selector for navlist

    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };

    window.onscroll = () => {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
    };

    // Clock animation
    const deg = 6;
    const hr = document.querySelector('#hr');
    const mn = document.querySelector('#mn');
    const sc = document.querySelector('#sc');

    setInterval(() => {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;

        hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`;
    }, 1000);

    // Text animation
    let words = document.querySelectorAll(".word");
    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);

    // Circle animation
    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        let dots = elem.getAttribute("data-dots");
        let marked = elem.getAttribute("data-percent");
        let percent = Math.floor(dots * marked / 100);
        let points = "";
        let rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }

        elem.innerHTML = points;
        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });
});



  const scriptURL = 'https://script.google.com/macros/s/AKfycbzOheDo2J5PV48wjSP9VwrH5zvSCljzMD3D_wuNhsAZYBAo2yITA8V3ad-XAEHV3GHj3w/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg= document.getElementById("msg")
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Message sent successfully"
        setTimeout(function(){
            msg.innerHTML=""
        },1000)  
        form.reset()
    })
      .catch(error => console.error('Error!', error.message))
  })


  