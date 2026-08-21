# Cómo hacer que un LLM emita el marcado

[English](PROMPT.md) · **Español**

El marcado de weid no se escribe a mano. Se produce en la sesión de
escritura, porque ahí —y solo ahí— existe la información: el modelo sabe qué
frase fue tuya porque se la acabas de decir. Media hora después ya nadie lo
sabe.

Pega esto al empezar a escribir, con cualquier modelo.

---

## El prompt

> Vamos a escribir un texto juntos. Mientras escribes, marca el aporte humano
> siguiendo la convención weid. No me pidas que lo marque yo después: hazlo
> a medida que redactas, porque tú tienes el contexto de quién dijo qué.
>
> **Regla base:** lo que no lleve marca se entiende escrito por ti (la IA). Yo
> no necesito marcar tu trabajo; tú marcas el mío.
>
> **Tres marcas, sobre `<span>`:**
>
> - `<span class="weid-verbatim">…</span>` — mis palabras textuales o casi
>   textuales: algo que escribí, dije en el chat, o corregí a mano.
> - `<span class="weid-idea">…</span>` — una idea o intuición que nació de mí,
>   aunque la hayas redactado tú.
> - `<span class="weid-experience">…</span>` — una vivencia, anécdota o dato
>   personal mío.
>
> Se pueden anidar: una vivencia contada con mis palabras lleva las dos.
>
> **Y una marca para ti:** cuando un argumento, una investigación o un giro
> del texto sea aporte tuyo —no mío—, ponlo como nota al inicio del párrafo
> que corresponda:
>
> `<span class="weid-note">De dónde salió esto, en una línea.</span>`
>
> Sé específico en la nota: "el ejemplo del contenedor marítimo y la cita de
> 1920 son míos" sirve; "aporte de la IA" no sirve.
>
> **Al final**, envuelve el texto en:
>
> `<article data-ai-disclosure="ai-assisted" data-ai-model="TU-MODELO">`
>
> Si estás escribiendo con una skill, persona o prompt hecho con mis textos,
> agrega `data-weid-voice="author"` y `data-weid-voice-source="NOMBRE"`. Si
> estás imitando la voz de un tercero, `data-weid-voice="third-party"` y
> nómbralo: eso no es opcional.
>
> y agrega la leyenda de `example.html`, adaptada al texto y escrita en el
> idioma en que está el texto.
>
> **Cinco reglas:**
>
> 1. Ante la duda, no marques. El default es que el texto sea tuyo, y errar
>    hacia allá es honesto. Errar hacia el otro lado es atribuirme algo que no
>    dije, que es la única forma de que esto haga daño.
> 2. **Aprobar no es autoría.** Si tú propusiste algo y yo dije "sí, buena,
>    ponlo", eso es tuyo, no mío. No lo marques.
> 3. **La idea se marca una vez**, en la formulación más fuerte, no en cada eco
>    que aparezca después. Si subrayas todo, no subrayaste nada: entre cinco y
>    quince marcas en un ensayo largo.
> 4. Para tu nota, el test es contrafactual: **si yo no te hubiera tenido a ti,
>    ¿este argumento, este dato o este giro estarían en el texto?** Si la
>    respuesta es no, va nota. Haber redactado bien el párrafo no cuenta: eso ya
>    está declarado.
> 5. No inventes vivencias, y marca frases completas, no palabras sueltas.

---

## Por qué funciona así y no al revés

La tentación obvia es pedirle al modelo que marque **lo suyo**. No sirve: en
un texto asistido eso es casi todo el documento, el marcado se vuelve ruido y
nadie lo lee. Marcar lo escaso es lo que hace que la marca signifique algo.

## Si el texto ya está escrito

Se puede marcar a posteriori, pero la calidad cae mucho: el modelo va a
adivinar. Si tienes la transcripción de la sesión, pásasela — con eso
reconstruye bien. Sin transcripción, revisa a mano lo que marque; se equivoca
sobre todo en `weid-idea`, que es la que más importa.
