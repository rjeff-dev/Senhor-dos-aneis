// Seleciona o container principal do carrossel
const carousel = document.getElementById("carousel");

// Seleciona o container onde os dots (spans) vão aparecer
const dots = document.getElementById("carouselDots");

// Pega todos os cards dentro do carrossel
const itens = carousel.querySelectorAll(".chars__carousel__item");

// Corrige o nome da variável (era "intens" com erro de digitação)
const totalItens = itens.length;

// 🔹 Criar os dots dinamicamente
itens.forEach((item, index) => {
  const dot = document.createElement("span"); // Cria o span
  dot.classList.add("chars__dot"); // Adiciona classe base
  dot.dataset.index = index; // Guarda o índice de cada card no próprio dot
  if (index === 0) dot.classList.add("active"); // O primeiro dot começa ativo
  dots.appendChild(dot); // Adiciona o dot ao container
});

// 🔹 Função para navegar entre slides
function goToSlide(index) {
    const cardWidth = itens[0].offsetWidth + 16; // Largura do card + gap (ajuste se o espaçamento for outro)

    // Faz o scroll suave até o card correspondente
    carousel.scrollTo({
        left: cardWidth * index,
        behavior: "smooth"
    });

  // Atualiza o dot ativo
    dots.querySelectorAll(".chars__dot").forEach(dot => dot.classList.remove("active"));
    dots.querySelector(`.chars__dot[data-index="${index}"]`).classList.add("active");
}

// 🔹 Evento de clique nos dots
dots.querySelectorAll(".chars__dot").forEach(dot => {
    dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index); // Pega o índice do dot clicado
        goToSlide(index); // Move o carrossel
    });
});

// 🔹 Auto scroll (muda automaticamente a cada 4s)
setInterval(() => {
    const currentDot = dots.querySelector(".chars__dot.active");
    const currentIndex = parseInt(currentDot.dataset.index);
    const nextIndex = (currentIndex + 1) % totalItens; // Volta pro início no fim
    goToSlide(nextIndex);
}, 4000);
