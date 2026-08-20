---
name: weid
description: Marca la autoría dentro de un texto escrito con IA — qué frases son del humano (textuales, ideas, vivencias) y qué contenido puso el modelo — con la convención weid (weid-verbatim / weid-idea / weid-experience / weid-note, más data-ai-disclosure y data-weid-voice). Usa esta skill siempre que estés escribiendo o co-escribiendo con el usuario un texto que se va a publicar —ensayo, post, columna, newsletter, guion de charla—, aunque no te lo pidan: el marcado solo se puede hacer bien durante la escritura, porque después nadie se acuerda de quién dijo qué. Úsala también cuando el usuario hable de disclosure de IA, transparencia de autoría, "marcar lo que escribí yo", o mencione weid.
---

# weid — marcar la autoría mientras se escribe

## Por qué esto existe

Un texto escrito contigo puede estar redactado casi entero por ti y ser, al
mismo tiempo, íntegramente original: la idea es del autor, la vivencia es del
autor, el giro nació en la conversación. Los estándares de disclosure que
existen no pueden decir eso. Marcan el documento completo —"esto tuvo IA"— y
ahí se acaban.

weid marca lo otro: **qué es humano, y de qué manera lo es.**

La regla base, y todo lo demás se deriva de ella:

> **En un documento declarado como asistido por IA, lo que no lleva marca lo
> escribiste tú.**

Las marcas señalan al humano. Al revés de lo que uno esperaría, y a propósito:
en un texto asistido lo humano es lo escaso, y marcar lo escaso es lo que hace
que la marca signifique algo. Si marcaras lo tuyo, marcarías el 90% del
documento y nadie leería nada.

## Marca mientras escribes, no después

Esto es lo único que esta skill realmente te pide, y es lo que la hace difícil
de reemplazar: **tú sabes qué frase fue del autor porque te la acaba de decir.**
Esa información existe solo mientras la conversación está viva. Media hora
después, o en otra sesión, ya no la tiene nadie — ni tú.

Así que marca en el momento en que redactas el párrafo. No dejes el marcado
para el final "cuando el texto esté listo": para entonces vas a estar
adivinando, y adivinar acá significa atribuirle al autor cosas que no dijo.

## Las tres marcas humanas

Van sobre `<span>`, en el texto, en línea. Los renderizadores de markdown
dejan pasar el HTML inline, así que sirven igual en `.md` que en `.html`.

**`weid-verbatim`** — sus palabras textuales o casi textuales. Algo que
escribió, que dijo en el chat, o que corrigió a mano sobre tu borrador.

```html
<span class="weid-verbatim">¿qué permite eso?</span>
```

**`weid-idea`** — una idea o intuición que nació de él, aunque la hayas
redactado tú. Es la marca más importante y la más difícil de juzgar bien.

```html
<span class="weid-idea">Que la diferenciación y el lujo corran en lo digital,
donde el costo material por unidad de status es órdenes de magnitud menor.</span>
```

**`weid-experience`** — una vivencia, anécdota o dato personal suyo.

```html
<span class="weid-experience">Hace muchos años tomo esomeprazol, y hoy me
ahorro casi 50 mil pesos comprando la molécula en vez del apellido.</span>
```

Se anidan cuando corresponde. Una vivencia contada con sus palabras lleva las
dos, y eso se lee exactamente como lo que es:

```html
<span class="weid-experience"><span class="weid-verbatim">Ayer vi un cartel de
una banda con tres fechas sold out.</span> Las fechas: marzo de 2027.</span>
```

### Los dos juicios que se equivocan siempre

**Aprobar no es autoría.** Si tú propusiste algo y el autor dijo "sí, buena,
ponlo", eso es tuyo, no de él. No lo marques. La decisión editorial de aceptar
una idea no la convierte en propia; si lo fuera, todo el texto sería del autor
y la convención no diría nada.

**La idea se marca una vez, donde está mejor dicha.** Una intuición del autor
suele reaparecer tres o cuatro veces en un ensayo. Marca la formulación más
fuerte, no todos los ecos. Marcar cada aparición convierte el subrayado en
ruido y el lector deja de mirarlo.

Y la regla que resuelve las dudas: **ante la duda, no marques.** El default es
que el texto sea tuyo. Errar hacia allá es humilde. Errar hacia el otro lado es
ponerle al autor palabras que no dijo, que es la única forma de que esta
convención haga daño.

## La marca del modelo

El reverso: cuando el **contenido** vino de ti —no solo la redacción— va una
nota al inicio del párrafo que corresponde.

```html
<p><span class="weid-note">La corrección —la variedad como mecanismo y no como
exceso— es el argumento que opuse a la tesis original.</span>La variedad no es
el efecto colateral del sistema que funciona: es el mecanismo por el cual
funciona.</p>
```

El test: **si el autor no te hubiera tenido a ti, ¿este argumento, este dato o
este giro estarían en el texto?** Si la respuesta es no, va nota.

Tres casos que la ameritan: un argumento con el que le llevaste la contra y
ganaste; investigación o referencias que él no puso; un movimiento estructural
del texto que propusiste tú.

Y uno que no: haber redactado bien el párrafo. Eso es el default, ya está
declarado arriba, y ponerle nota a cada párrafo bien escrito vacía la nota de
significado.

Sé específico. "El ejemplo del contenedor marítimo y la cita de Mises 1920 son
míos" sirve. "Aporte de la IA" no le dice nada a nadie.

## Declarar el documento

Al terminar, envuelve el texto:

```html
<article data-ai-disclosure="ai-assisted" data-ai-model="claude-opus-5">
```

Valores de `data-ai-disclosure`: `none` · `ai-assisted` · `ai-generated` ·
`autonomous`.

### Y declarar la voz — esto importa

Si estás escribiendo con una skill, comando o persona construida con los
textos del propio autor (por ejemplo `tgdoppelganger`), no estás escribiendo
con tu voz por defecto: estás escribiendo con la suya, reconstruida. Eso se
declara, porque es información distinta:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

- `model` — tu voz por defecto. Es el default; se puede omitir.
- `author` — la voz del autor, desde los textos del autor.
- `third-party` — la voz de un tercero. Acá **nombrar la fuente no es
  opcional**: imitar a alguien sin decirlo es justamente lo que esta convención
  existe para exponer.

En la leyenda, esa declaración va como píldora arriba de todo, no enterrada en
la prosa — es lo primero que un lector quiere saber:

```html
<span class="weid-voice">Voz del autor<span class="weid-voice-src">tgdoppelganger</span></span>
```

Para `third-party` agrega `weid-voice--third-party`, que se pinta distinto a
propósito.

weid se compone con las skills de voz, no las reemplaza. Una decide cómo suena
el texto; la otra registra de quién es cada cosa. Si hay una skill de voz
activa en la sesión, dilo en el atributo sin que te lo pidan.

## La leyenda

Un texto con marcas y sin leyenda es decoración. Cierra siempre con una,
adaptada al texto —no la copies literal, escríbela en la voz del autor:

```html
<div class="weid-legend">
<span class="weid-voice">Voz del autor<span class="weid-voice-src">tgdoppelganger</span></span>
<strong>Cómo se escribió esto.</strong> [Con qué se escribió. Si hubo skill de
voz, la píldora la nombra y acá explicas en media línea qué significa.] Lo subrayado es mío; <strong>lo que no lleva marca lo
redactó el modelo</strong>.
<ul>
<li><span class="weid-verbatim">Subrayado continuo</span>: palabras textuales mías.</li>
<li><span class="weid-idea">Subrayado a trazos</span>: idea mía, redactada en conjunto.</li>
<li><span class="weid-experience">Subrayado punteado</span>: experiencia o dato personal mío.</li>
<li><span class="weid-note">Nota al margen</span>: argumento o dato que puso el modelo, no yo.</li>
</ul>
</div>
```

## Restricción

Tres cosas que arruinan el marcado, en orden de gravedad:

1. **Inventar vivencias.** Nunca escribas una anécdota que el autor no te
   contó, y muchísimo menos la marques como suya.
2. **Marcar de más.** Entre cinco y quince marcas humanas en un ensayo largo.
   Si subrayas todo, no subrayaste nada.
3. **Marcar palabras sueltas.** Marca frases completas. Esto se lee como
   subrayado de lector, no como keyword de SEO.

## Si el texto ya está escrito

Se puede marcar a posteriori, pero dilo: la calidad cae mucho porque vas a
estar adivinando. Si existe la transcripción de la sesión de escritura, pídela
—con eso se reconstruye bien—. Sin transcripción, marca solo lo que puedas
justificar y avisa que `weid-idea` es la que más probablemente esté mal, que es
justo la que más importa.

## Referencia

La convención completa está en `SPEC.md`, en la raíz del repo weid (si esta
skill está instalada por symlink, sigue el enlace hasta el repo). El CSS de
referencia es `weid.css`: 160 líneas, sin JavaScript. La etimología, que es
también la tesis: *weid-* es la raíz indoeuropea de **ver**, y de ella salen
**idea** y **evidencia**. Esto muestra; no prueba.
