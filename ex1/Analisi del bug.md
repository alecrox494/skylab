# Skylab EX1 - Analisi

Analisi del menu al link: https://bit.ly/3bdxzel
Per una analisi approfondita sarebbe necessario conoscere il desiderato in termini di funzionalità e grafica del menu in oggetto, stilo questo documento facendo delle considerazioni sui macro errori che si notano a prima occhiata.

##### Errori

- Nessuna responsività, nemmeno minima, del menu
- Diversa spaziatura degli elementi
- Uno dei bottoni del menu è a capo
- I Submenu che vengono visualizzati all'hover sono graficamente slegati dalla navigazione di primo livello, oltre ad essere poco leggibili a causa della sovrapposizione dei contenuti degli elementi al di sotto



##### Possibile approccio

Per rendere un **minimo responsivo** il menù è necessario aggiungere quantomeno questi parametri al div principale, in modo tale da rendere box e contenuto più reattivo:

```css
.container {
    display: flex;
    flex-wrap: wrap;
    ...
```

Il **logo** ha una dimensione fissata (con un attributo html) a 30px, mentre il file sorgente ha una dimensione di 1500x1500px, sarebbe opportuno ridimensionare l'immagine sorgente in maniera tale da **risparmiare risorse**.
Inoltre il contenitore dell'immagine ha la `width` fissata a 150px, immagino per la spaziatura.

Per **sistemare la visualizzazione degli elementi**, mettendoli tutti sulla stessa linea, si possono applicare i seguenti parametri alle classi CSS, eliminando quelli esistenti:

```css
.container > .logo-container {
    flex-basis: 30px;
    /*questi due parametri allineano al centro il logo rispetto all'altezza del div */
    display: flex;
    align-items: center; 
    
}

.container > .nav-container {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1; /* riempe tutto lo spazio disponibile */
    justify-content: center;
}

.container > .flyouts-container {
    flex-basis: 90px;
    display: flex;
    align-items: center;
    justify-content: right;
}
```

così facendo il logo sarà allineato a sx e cetrato in altezza, i pulsanti del menu al centro (con uguale spaziatura a sx e a dx) e le icone azione saranno allineate a dx e centrate in altezza.

Per fare in modo che **all'hover** la visualizzazione dei menu di secondo livello siano appaiati ai link di primo livello è necessario aggiungere il parametro `position:relative` ai `<li>` padre come segue:

```css
.container .nav-container > ul.nav > li {
    position: relative;
    ...
```

Inoltre aggiungerei anche un `background` e una `z-index` ai menu di secondo livello, così chè il contenuto sia  maggiormente visibile e in primo piano rispetto agli elementi sottostanti:

```css
.container .nav-container > ul.nav > li > ul.subnav {
    background: #fff;
    z-index: 1;
    ...
```

Come ultimo appunto le 3 icone sulla destra sono inserite attraverso tag `<img>` ma hanno gli attributi `alt` vuoti.
