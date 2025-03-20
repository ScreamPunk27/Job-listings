const items = document.querySelectorAll('.featured');
const nombres = ['gennaro','isabella']

items.forEach(i => {
    i.parentElement.parentElement.parentElement.style.backgroundColor='red'
})

