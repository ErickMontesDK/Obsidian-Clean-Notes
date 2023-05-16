---
banner: "![[react-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Render Props 

```ad-flashcards
title: ## Die Flashcards
collapse:
text
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Las render props son una técnica para <mark class="hltr-truecyan">compartir código entre componentes</mark> en React <mark class="hltr-truecyan">usando una propiedad cuyo valor es una función que devuelve un elemento</mark> de React.

Un componente con una render prop toma una función y la llama en lugar de implementar su propia lógica de renderizado. Esto significa que el componente <mark class="hltr-truecyan">delega la responsabilidad de decidir qué y cómo renderizar al componente que le pasa la función como propiedad</mark>. Por ejemplo:
```jsx
<DataProvider render={data => (
  <h1>Hola {data.target}</h1>
)}/>
```
< DataProvider> no tiene que saber cómo renderizar el elemento < h1>, pudiendo enviar cualquier otro componente
````

## 1-  ¿Cómo implementar render props?

Hay varias formas de implementar render props, pero la más común es usar la prop `render` o la prop `children`.

### 1.1-  Using render
-   La prop `render` es una función que recibe los datos que queremos pasar y devuelve un elemento de React. Por ejemplo:


<hr class="finale">

![[bat-logo-black.png|150]]



