---
banner: "![[default-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Provider Pattern 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
<mark class="hltr-truecyan">El patrón de proveedor en React es una forma de compartir datos entre muchos componentes sin tener que pasarlos manualmente a través de las props.</mark> Este patrón evita el problema del prop drilling, que es cuando pasamos props a través de varios niveles de componentes que no necesitan usarlos. 
El prop drilling dificulta el mantenimiento y la refactorización del código, y hace que sea difícil saber de dónde vienen los datos.

Sin embargo, <mark class="hltr-red">hay que tener cuidado con no abusar del patrón de proveedor, ya que puede causar problemas de rendimiento si los datos se actualizan con mucha frecuencia y provocan re-renderizados innecesarios de los componentes que consumen el contexto</mark>. Para evitar esto, se recomienda crear varios proveedores para cada caso de uso separado y usar memoización o useCallback para optimizar las funciones que pasamos al contexto.
````
## 1-  Funcionamiento
Para usar el patrón de proveedor, necesitamos crear un objeto de contexto con el método [[Context API#1 1- Crear un contexto| createContext]] que React nos proporciona. Este objeto tiene dos componentes importantes: el `Provider` y el `Consumer`. 

- El `Provider` es un componente de orden superior que envuelve a los componentes que necesitan acceder a los datos compartidos. El `Provider` recibe una prop `value` que contiene los datos que queremos pasar. 
- El `Consumer` es un componente que puede leer y escribir los datos del contexto usando el hook [[Context API#1 3 2- useContext | useContext]]. El hook `useContext` recibe el objeto de contexto como argumento y devuelve el valor actual del contexto.

Un ejemplo sencillo de cómo usar el patrón de proveedor para compartir un dato entre tres componentes: `ListItem`, `Header` y `Text`. Estos componentes están dentro de un componente `App` que tiene el dato que queremos compartir.

```jsx file:"👾Ejemplo de Provider" hl:2,11-15,22,30,38error:
// Creamos el objeto de contexto
const DataContext = React.createContext();

// El componente App tiene el dato que queremos compartir
function App() {
  const [data, setData] = React.useState("Some data");

  return (
    // Envolvemos los componentes que necesitan el dato con el Provider
    // Pasamos el dato como value al Provider
    <DataContext.Provider value={data}>
      <ListItem />
      <Header />
      <Text />
    </DataContext.Provider>
  );
}

// El componente ListItem necesita acceder al dato
function ListItem() {
  // Usamos el hook useContext para leer el valor del contexto
  const data = React.useContext(DataContext);

  return <li>{data}</li>;
}

// El componente Header necesita acceder al dato
function Header() {
  // Usamos el hook useContext para leer el valor del contexto
  const data = React.useContext(DataContext);

  return <h1>{data}</h1>;
}

// El componente Text necesita acceder al dato
function Text() {
  // Usamos el hook useContext para leer el valor del contexto
  const data = React.useContext(DataContext);

  return <p>{data}</p>;
}
```
Como podemos ver, no tenemos que pasar el dato como prop a cada componente. Cada componente puede acceder al dato directamente usando el contexto. Si queremos cambiar el valor del dato, podemos usar una función para actualizarlo y pasársela también al Provider.

```ad-warning
title: Die Flashcards
#### ¿Qué es el patrón de proveedor en React?

Es una forma de compartir datos entre muchos componentes sin tener que pasarlos manualmente a través de las props.

#### ¿Qué problema evita el patrón de proveedor?

Evita el problema del prop drilling, que es cuando pasamos props a través de varios niveles de componentes que no necesitan usarlos.

#### ¿Qué componentes se necesitan para usar el patrón de proveedor?

Se necesita crear un objeto de contexto con el método `createContext`, que tiene dos componentes: el `Provider` y el `Consumer`.

#### ¿Qué hace el componente Provider?

Es un componente de orden superior que envuelve a los componentes que necesitan acceder a los datos compartidos. Recibe una prop `value` que contiene los datos que queremos pasar.

#### ¿Qué hace el componente Consumer?

Es un componente que puede leer y escribir los datos del contexto usando el hook `useContext`. El hook `useContext` recibe el objeto de contexto como argumento y devuelve el valor actual del contexto.

#### ¿Para qué casos de uso es útil el patrón de proveedor?

Es útil para compartir datos globales, como un tema UI, un idioma, un usuario autenticado, etc.

#### ¿Qué precauciones hay que tener al usar el patrón de proveedor?

Hay que tener cuidado con no abusar del patrón de proveedor, ya que puede causar problemas de rendimiento si los datos se actualizan con mucha frecuencia y provocan re-renderizados innecesarios de los componentes que consumen el contexto. Para evitar esto, se recomienda crear varios proveedores para cada caso de uso separado y usar memoización o useCallback para optimizar las funciones que pasamos al contexto.
```
<hr>



