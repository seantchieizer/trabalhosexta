/*js da home */
const data = [
    {
        place: '',
        title: 'AVANÇANDO SEU',
        title2: 'CONHECIMENTO',
        description: 'DICAS DE SITES E CANAIS PARA AMPLIAR SEU CONHECIMENTO.',
        image: 'https://4kwallpapers.com/images/wallpapers/hello-world-pixel-1920x1080-15168.png'
    },
    {
        place: '',
        title: 'HISTÓRIA DA ',
        title2: 'INTERNET',
        description: 'DA ARPANET AOS DIAS ATUAIS, ESTE MATERIAL EXPLORA A EVOLUÇÃO DA INTERNET, REVELANDO COMO ELA TRANSFORMOU A COMUNICAÇÃO, A INFORMAÇÃO E A SOCIEDADE.',
        image: 'https://wallpapercrafter.com/th8001/500964-blue-world-social-network-line-technology-graphics.jpg'
    },
    {
        place: '',
        title: 'CURSOS',
        title2: '& MATERIAIS',
        description: 'APRENDENDO SOBRE LINGUAGENS DE PROGRAMAÇÃO & APLICAÇÕES DA INTERNET.',
        image: 'https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        place: '',
        title: 'COMUNIDADE',
        title2: '& VAGAS',
        description: 'FAÇA AMIGOS E COMPARTILHE OPORTUNIDADES.',
        image: 'https://img.freepik.com/fotos-gratis/postura-plana-da-estacao-de-trabalho-com-espaco-de-copia-e-laptop_23-2148430879.jpg'
    },
    {
        place: '',
        title: 'QUIZ',
        description: 'TREINANDO & AMPLIANDO SEU CONHECIMENTO.',
        image: 'https://img.freepik.com/fotos-premium/cool-lofi-girl-estudando-em-sua-mesa-chuvosa-ou-nublada-do-lado-de-fora-lindo-papel-de-parede-frio-e-atmosferico-4k-streaming-de-fundo-estilo-lofi-hiphop-estilo-anime-manga-generative-ai_117038-5583.jpg'
    },
    {
        place: '',
        title: 'CONHECENDO O',
        title2: 'TIME',
        description: 'CONHECENDO O TIME & SUAS FUNÇÕES DENTRO DO PROJETO.',
        image: 'https://www.apple.com/tv-pr/shows-and-films/s/severance/images/season-02/unit-photos/episode-07/photo-020713/Severance_Photo_020713.jpg.photo_modal_show_home_large.jpg'
    },
    
  ];
  
  const _ = (id) => document.getElementById(id);
  const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');
  const cardContents = data.map((i, index) => `
    <div class="card-content" id="card-content-${index}">
        <div class="content-start"></div>
        <div class="content-place">${i.place}</div>
        <div class="content-title-1">${i.title}</div>
        <div class="content-title-2">${i.title2}</div>
    </div>`).join('');
  const slideNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}">${index + 1}</div>`).join('');
  
  _('demo').innerHTML = cards + cardContents;
  _('slide-numbers').innerHTML = slideNumbers;
  
  // Controla se uma animação está em andamento
  let isAnimating = false;
  
  document.querySelector('.arrow-left').addEventListener('click', handlePagination);
  document.querySelector('.arrow-right').addEventListener('click', handlePagination);
  
  function handlePagination(event) {
    if (isAnimating) return;
    isAnimating = true;
    step().then(() => {
        isAnimating = false;
    });
  }
  
  const range = (n) => Array(n).fill(0).map((_, i) => i);
  const set = gsap.set;
  
  function getCard(index) {
    return `#card${index}`;
  }
  function getCardContent(index) {
    return `#card-content-${index}`;
  }
  function getSliderItem(index) {
    return `#slide-item-${index}`;
  }
  
  function animate(target, duration, properties) {
    return new Promise((resolve) => {
        gsap.to(target, { ...properties, duration, onComplete: resolve });
    });
  }
  
  let order = [0, 1, 2, 3, 4, 5];
  let detailsEven = true;
  
  let offsetTop = 200;
  let offsetLeft = 700;
  let cardWidth = 200;
  let cardHeight = 300;
  let gap = 40;
  let numberSize = 50;
  const ease = "sine.inOut";
  
  function init() {
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    const { innerHeight: height, innerWidth: width } = window;
    offsetTop = height - 430;
    offsetLeft = width - 830;
  
    gsap.set("#pagination", {
        top: offsetTop + 330,
        left: offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
    });
  
    gsap.set("nav", { y: -200, opacity: 0 });
  
    gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    });
  
    gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  
    gsap.set(`${detailsInactive} .text`, { y: 100 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });
    gsap.set(`${detailsInactive} .cta`, { y: 60 });
  
    gsap.set(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1),
    });
  
    rest.forEach((i, index) => {
        gsap.set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
        });
        gsap.set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            zIndex: 40,
            y: offsetTop + cardHeight - 100,
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });
  
    gsap.set(".indicator", { x: -window.innerWidth });
  
    const startDelay = 0.6;
  
    gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease,
        onComplete: () => {
            setTimeout(() => {
                loop();
            }, 500);
        },
    });
  
    rest.forEach((i, index) => {
        gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 30,
            delay: startDelay + 0.05 * index,
            ease,
        });
        gsap.to(getCardContent(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 40,
            delay: startDelay + 0.05 * index,
            ease,
        });
    });
  
    gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
  }
  
  function step() {
    return new Promise((resolve) => {
        order.push(order.shift());
        detailsEven = !detailsEven;
  
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  
        const activeData = data[order[0]];
        document.querySelector(`${detailsActive} .place-box .text`).textContent = activeData.place;
        document.querySelector(`${detailsActive} .title-1`).textContent = activeData.title;
        document.querySelector(`${detailsActive} .title-2`).textContent = activeData.title2;
        document.querySelector(`${detailsActive} .desc`).textContent = activeData.description;
  
        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`${detailsActive} .cta`, {
            y: 0,
            delay: 0.35,
            duration: 0.4,
            ease,
            onComplete: resolve
        });
  
        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];
  
        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
  
        gsap.to(getCard(prv), { scale: 1.5, ease });
  
        gsap.to(getCardContent(active), {
            y: offsetTop + cardHeight - 10,
            opacity: 0,
            duration: 0.3,
            ease,
        });
  
        gsap.to(getSliderItem(active), { x: 0, ease });
        gsap.to(getSliderItem(prv), { x: -numberSize, ease });
  
        gsap.to(".progress-sub-foreground", {
            width: 500 * (1 / order.length) * (active + 1),
            ease,
        });
  
        gsap.to(getCard(active), {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            ease,
            onComplete: () => {
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                gsap.set(getCard(prv), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                    scale: 1,
                });
                gsap.set(getCardContent(prv), {
                    x: xNew,
                    y: offsetTop + cardHeight - 100,
                    opacity: 1,
                    zIndex: 40,
                });
                gsap.set(getSliderItem(prv), { x: rest.length * numberSize });
  
                gsap.set(detailsInactive, { opacity: 0 });
                gsap.set(`${detailsInactive} .text`, { y: 100 });
                gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                gsap.set(`${detailsInactive} .desc`, { y: 50 });
                gsap.set(`${detailsInactive} .cta`, { y: 60 });
                resolve();
            },
        });
  
        rest.forEach((i, index) => {
            if (i !== prv) {
                const xNew = offsetLeft + index * (cardWidth + gap);
                gsap.set(getCard(i), { zIndex: 30 });
                gsap.to(getCard(i), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    delay: 0.1 * (index + 1),
                    ease,
                });
                gsap.to(getCardContent(i), {
                    x: xNew,
                    y: offsetTop + cardHeight - 100,
                    opacity: 1,
                    zIndex: 40,
                    delay: 0.1 * (index + 1),
                    ease,
                });
                gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
            }
        });
    });
  }
  
  async function loop() {
    await animate(".indicator", 2, { x: 0 });
    await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
    set(".indicator", { x: -window.innerWidth });
    await step();
    // loop(); // Removido o auto-loop
  }
  
  async function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
  }
  
  async function loadImages() {
    const promises = data.map(({ image }) => loadImage(image));
    return Promise.all(promises);
  }
  
  async function start() {
    try {
        await loadImages();
        init();
    } catch (error) {
        console.error("One or more images failed to load", error);
    }
  }
  
  start();
  