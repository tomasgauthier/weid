# weid — una convención para marcar el aporte humano en un texto asistido por IA

[English](SPEC.md) · **Español**

**Versión 0.1 · Borrador · MIT**

> ***weid-***, la raíz protoindoeuropea que significa *ver*, es el ancestro
> tanto de **idea** como de **evidencia** — aquello que se ve con claridad. El
> nombre declara el alcance: esta convención hace visible qué ideas son
> humanas. Muestra; no prueba.

## 1. El hueco que llena

Dos cosas pueden ser ciertas del mismo ensayo: que una IA escribió casi todas
las frases, y que todas las ideas son humanas. Los estándares de disclosure que
existen no pueden expresar eso. Operan sobre el documento o sobre el bloque, y
responden una sola pregunta: *¿hubo IA?*

El atributo HTML propuesto
[`ai-disclosure`](https://github.com/dweekly/ai-content-disclosure) (W3C
Community Group, 2026) resuelve bien esa afirmación gruesa, y se alinea con los
[digital source types de IPTC](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
y con C2PA. El Artículo 50 de la EU AI Act convierte el marcado legible por
máquina en una obligación. Ninguno de ellos marca *qué frases aportó realmente
el humano, y de qué manera*.

Eso es weid entero. Es un complemento de `ai-disclosure`, no un competidor: usa
los dos.

## 2. La regla base

> **En un documento declarado como asistido por IA, lo que no lleva marca lo
> escribió la IA.**

Las marcas identifican lo humano. Esta inversión es deliberada y es la razón de
que la convención salga lo bastante barata como para usarla de verdad: en un
texto asistido el aporte humano es lo escaso, así que es lo que vale la pena
marcar — y lo que el lector, si no, no tendría cómo encontrar.

Un documento que lleva marcas weid pero no lleva atributo de disclosure (§3)
está mal formado. Sin la línea base, las marcas no afirman nada.

## 3. Nivel documento

Declara la línea base en el elemento raíz de la obra — el `<article>`, o
`<body>` si la página entera es la obra:

```html
<article data-ai-disclosure="ai-assisted"
         data-ai-model="claude-opus-5"
         data-ai-provider="Anthropic">
```

`data-ai-disclosure` toma los cuatro valores de la propuesta `ai-disclosure`:

| Valor | Significado |
|---|---|
| `none` | sin participación de IA |
| `ai-assisted` | escrito por un humano, editado o pulido por IA |
| `ai-generated` | generado por IA con prompting y revisión humana |
| `autonomous` | generado por IA sin supervisión humana |

`data-ai-model` y `data-ai-provider` son opcionales.

El prefijo `data-` es intencional. Es HTML válido hoy, sobrevive a los
validadores, y calca el atributo propuesto uno a uno — así, un documento marcado
ahora sigue siendo correcto si algún día se adopta el atributo sin prefijo. Las
implementaciones DEBERÍAN aceptar ambas formas:

```css
[data-ai-disclosure], [ai-disclosure] { … }
```

## 4. ¿En la voz de quién escribe la IA?

Un modelo escribiendo en su registro por defecto y un modelo corriendo una
persona que el autor construyó con su propia obra publicada no son el mismo
acto, y ningún estándar existente puede distinguirlos. Un atributo opcional sí:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

| Valor | Significado |
|---|---|
| `model` | la voz por defecto del modelo. Es el default; omite el atributo |
| `author` | el modelo escribe en la voz del autor, reconstruida desde los textos del propio autor |
| `third-party` | el modelo escribe en la voz de otra persona |

`data-weid-voice-source` nombra el artefacto — una skill, un system prompt, un
fine-tune, una guía de estilo. Es opcional para `model` y `author`, y
**OBLIGATORIO para `third-party`**: la imitación sin nombre de un escritor vivo
es justamente el caso que este atributo existe para exponer.

Los renderizadores DEBERÍAN mostrar esto como una píldora arriba de la leyenda
en vez de enterrarlo en la prosa: de quién es esta voz es lo primero que un
lector quiere saber.

```html
<span class="weid-voice">Voz del autor<span class="weid-voice-src">tgdoppelganger</span></span>
```

Para `third-party`, agrega `weid-voice--third-party`, que se pinta de otro
color. La distinción es deliberada: una IA escribiendo en la voz de un tercero
con nombre y apellido es el caso que este atributo existe para exponer, y no
debería verse como una entrada más de una lista.

`author` no es una afirmación menor que la escritura humana, ni mayor. Dice algo
específico: el estilo de la prosa desciende del corpus del humano, así que la
voz es suya incluso donde las frases no lo son. El lector puede sopesar eso por
su cuenta — que es el punto entero del disclosure.

## 5. Nivel frase: las marcas humanas

Tres clases sobre `<span>`. No se requiere nada más, y no debería agregarse nada
más sin evidencia de que tres no alcanzan.

| Clase | Marca | Se ve como |
|---|---|---|
| `weid-verbatim` | las palabras del humano, textuales o casi | subrayado continuo |
| `weid-idea` | una idea o intuición originada en el humano, redactada en conjunto | subrayado a trazos |
| `weid-experience` | la vivencia, anécdota o dato personal del humano | subrayado punteado |

```html
<p><span class="weid-experience">Vi un cartel con tres fechas sold
out.</span> Las fechas eran a siete meses.</p>
```

Las marcas se anidan.
`<span class="weid-experience"><span class="weid-verbatim">…</span></span>` está
bien formado y significa lo que parece: una vivencia, contada con las palabras
del humano.

**Por qué `<span class="…">` y no un elemento propio.** Las etiquetas
personalizadas se las come el sanitizador KSES de WordPress, la mayoría de los
clientes de correo y varios lectores de feeds. `class` sobre un `<span>`
sobrevive a todos los sanitizadores de uso común. Ese es el piso que hace
portable a la convención; no lo subas.

## 6. El lado de la IA

La afirmación inversa — *este argumento vino del modelo* — la carga una nota
puesta dentro del párrafo que anota:

```html
<p><span class="weid-note">El contraargumento acá lo puso el modelo.</span>
La variedad no es el efecto colateral del sistema que funciona: es el mecanismo
por el cual funciona.</p>
```

Una nota es texto normal en el flujo del documento. Quítale la hoja de estilos y
sigue ahí, sigue legible, sigue siendo cierta. Un disclosure que depende de que
cargue el CSS no es un disclosure.

Los renderizadores PUEDEN mover las notas al margen donde el layout lo permita.

## 7. La leyenda es obligatoria

Un documento que usa weid DEBE llevar una leyenda visible que declare la regla
base y qué significa cada marca. Marcas sin leyenda son decoración.

```html
<div class="weid-legend">
  <strong>Cómo se escribió esto.</strong> Escrito conversando con una IA.
  Lo subrayado es mío; lo que no lleva marca lo redactó el modelo.
  <ul>
    <li><span class="weid-verbatim">Continuo</span>: palabras textuales mías.</li>
    <li><span class="weid-idea">A trazos</span>: idea mía, redactada en conjunto.</li>
    <li><span class="weid-experience">Punteado</span>: algo que viví.</li>
  </ul>
</div>
```

## 8. Renderizado (no normativo)

`weid.css`, en este repositorio, es la implementación de referencia: ~160
líneas, sin JavaScript, sin build. Trae dos ganchos de tema
(`prefers-color-scheme` y una clase `.dark` / `[data-theme="dark"]`) y cinco
custom properties para recolorear.

Las tres marcas se distinguen por **estilo de línea, no por color**, así que
sobreviven a la impresión monocroma y son legibles para quien no distingue
colores.

## 9. Accesibilidad — techo conocido

Las marcas son visuales. Quien usa lector de pantalla escucha la leyenda y las
notas (las dos son texto real) pero no recibe ninguna señal en los pasajes
marcados mismos. Quien necesite eso hoy debería agregar texto oculto
visualmente dentro del span. Una versión futura puede especificarlo; la v0.1 no
lo hace, antes que especificarlo mal.

## 10. Lo que weid no es

- **No es un detector.** Registra lo que el autor declara. No puede verificarlo,
  y una convención que dijera lo contrario estaría mintiendo.
- **No es una prueba.** Evidencia y prueba son cosas distintas, y el nombre elige
  la más débil, la honesta. Una marca muestra; no demuestra. Quien esté
  dispuesto a mentir en una marca weid ya estaba dispuesto a mentir en la firma.
  La procedencia criptográfica es otro problema, y C2PA está en eso.
- **No es un certificado de cumplimiento.** Puede ayudar a satisfacer deberes de
  transparencia; no los descarga.
- **No es un porcentaje.** Ni conteo de palabras ni "17% humano". La unidad es la
  afirmación, no la proporción — una sola frase marcada puede cargar la idea
  entera de un ensayo.
