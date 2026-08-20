# weid

**Una convención para marcar el aporte humano dentro de un texto escrito con IA.**
Tres clases de CSS, un atributo, ningún JavaScript.

> ***weid-*** — raíz indoeuropea que significa *ver*. De ella vienen **ver**,
> **vidente**, **idea** y **evidencia**: literalmente, *lo que se ve con
> claridad*. Es la familia entera de este proyecto en una sola palabra: hacer
> visible qué ideas son humanas.

---

## Por qué

El debate sobre textos y IA se quedó pegado en una pregunta binaria: ¿lo
escribió una persona o lo escribió una máquina? Para casi todo lo que se
escribe hoy, esa pregunta ya no tiene respuesta, porque no es la pregunta.

Un ensayo puede estar redactado casi entero por un modelo y ser, al mismo
tiempo, íntegramente original: la idea es de alguien, la vivencia es de
alguien, el giro del argumento nació en una conversación entre los dos. Los
estándares de disclosure que existen no pueden decir eso. Marcan el documento
completo —"esto tuvo IA"— y ahí se acaban.

weid marca lo otro: **qué es humano, y de qué manera lo es.**

La apuesta de fondo: pensar sigue siendo una actividad humana. Lo que cambió
es que ahora está aumentada. Un disclosure honesto debiera poder mostrar eso
en vez de esconderlo, y debiera poder mostrarlo *frase por frase*.

## La regla base

> **En un documento declarado como asistido por IA, lo que no lleva marca lo
> escribió la IA.**

Las marcas señalan lo humano. Al revés de lo que uno esperaría, y a propósito:
en un texto asistido lo humano es lo escaso, y marcar lo escaso es más barato
—y más útil— que marcar todo lo demás.

## Cómo se usa

```html
<link rel="stylesheet" href="weid.css">

<article data-ai-disclosure="ai-assisted" data-ai-model="claude-opus-5">
  <p><span class="weid-experience">Ayer vi un cartel de una banda con tres
  fechas sold out.</span> Es decir, miles de personas ya pagaron por estar
  juntas dentro de siete meses.</p>
</article>
```

Tres clases sobre `<span>`:

| Clase | Marca | Se ve como |
|---|---|---|
| `weid-verbatim` | palabras textuales de la persona | subrayado continuo |
| `weid-idea` | idea suya, redactada en conjunto | subrayado a trazos |
| `weid-experience` | vivencia, anécdota o dato personal suyo | subrayado punteado |

Y una cuarta pieza para el lado contrario, el aporte del modelo:

```html
<p><span class="weid-note">El contraargumento acá lo puso el modelo.</span>
La variedad no es el efecto colateral del sistema que funciona: es el
mecanismo por el cual funciona.</p>
```

La nota es texto normal dentro del párrafo. Con CSS se va al margen; sin CSS
sigue ahí. Un disclosure que se cae cuando no carga la hoja de estilos no es
un disclosure.

### ¿La voz de quién?

No es lo mismo el modelo con su voz por defecto que el modelo corriendo una
skill que construiste con tus propios textos: ahí la voz es tuya reconstruida,
aunque las palabras sean suyas. Un atributo opcional lo dice:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

`model` (el default, se omite) · `author` (tu voz, desde tus textos) ·
`third-party` (la voz de un tercero — y ahí nombrarlo es obligatorio, porque
imitar sin decirlo es justo lo que hay que declarar).

Falta una sola cosa más, y es obligatoria: **la leyenda**. Sin ella las marcas
son decoración. Está en `example.html`, lista para copiar.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `SPEC.md` | La convención, en inglés. Es el producto. |
| `weid.css` | Implementación de referencia, ~160 líneas. |
| `example.html` | Ábrelo con doble click. Es la demo y es el test. |
| `PROMPT.md` | Cómo hacer que un LLM emita el marcado mientras escribes. |

Sin `package.json`, sin build, sin CI. Copias el CSS y funciona: Astro,
WordPress, Ghost, Hugo, Jekyll, un `.html` a mano.

## El marcado no se escribe a mano

Nadie va a etiquetar 3.000 palabras con la mano. La gracia es que el marcado
salga **de la sesión de escritura misma**: el modelo sabe qué frase fue tuya
porque la acabas de decir. `PROMPT.md` tiene las instrucciones para que
cualquier LLM lo emita mientras trabajan juntos.

## Relación con los estándares que ya existen

weid **no compite** con ellos, los complementa:

- [`ai-disclosure`](https://github.com/dweekly/ai-content-disclosure) (W3C
  Community Group, 2026) resuelve el nivel documento. weid lo usa tal cual,
  con prefijo `data-` para que valide hoy.
- [IPTC digital source types](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
  y C2PA cubren imagen y procedencia criptográfica.
- El [Artículo 50 de la EU AI Act](https://artificialintelligenceact.eu/transparency-rules-article-50/)
  obliga al marcado legible por máquina.

Ninguno marca la frase. Ese es el hueco.

## Lo que weid no es

- **No es un detector.** Registra lo que el autor declara. No lo verifica.
- **No es una prueba.** Y la distinción está en el nombre: *weid* es evidencia
  —lo que queda a la vista—, no prueba. Una marca muestra; no demuestra. Quien
  quiera mentir con weid puede, igual que puede mentir en la firma de un
  artículo. El disclosure honesto sirve a quien quiere ser honesto; el resto es
  criptografía, y para eso está C2PA.
- **No es un certificado de cumplimiento.** Ayuda; no descarga la obligación.
- **No es un porcentaje.** Nada de "17% humano". La unidad es la afirmación,
  no la proporción: una sola frase marcada puede cargar la idea entera.

## Licencia

MIT. Úsalo, fórkalo, cámbiale el nombre.
