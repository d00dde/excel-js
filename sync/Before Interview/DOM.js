

const node = document.querySelector('#id')  // Получение ссылки на элемент(ы)
|| document.getElementById('#id')
|| document.getElementById()
|| document.getElementsByClassName()
|| document.getElementsByName()
|| document.getElementsByTagName()

$iframe.contentDocument // ссылка на Document iframe

ParentNode.append (el) // работает как appendChild, но может добавить нексколько элементов.


Element.textContent = 'TEXT' // замена innerText если нужно работать с текстом.
Element.insertAdjacentHTML('afterbegin', el) // замена innerHTML, не затирает имеющийся HTMLб позволяет указать позицию вставки
Element.insertAdjacentText('beforeend', el) // то же самое для текста
