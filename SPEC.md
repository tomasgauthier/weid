# iHuman — a convention for marking human contribution in AI-assisted text

**Version 0.1 · Draft · MIT**

## 1. The gap this fills

Two things can be true of the same essay: an AI wrote most of the sentences,
and every idea in it is human. Existing disclosure standards cannot express
that. They operate on the document or the block, and they answer one question:
*was AI involved?*

The proposed [`ai-disclosure`](https://github.com/dweekly/ai-content-disclosure)
HTML attribute (W3C Community Group, 2026) handles that coarse claim well, and
aligns with [IPTC's digital source types](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
and C2PA. The EU AI Act, Article 50, makes machine-readable marking an
obligation. None of them mark *which sentences the human actually contributed,
and in what way*.

That is the whole of iHuman. It is a complement to `ai-disclosure`, not a
competitor: use both.

## 2. The base rule

> **In a document declared as AI-assisted, unmarked text was written by the AI.**

Marks identify the human. This inversion is deliberate and it is the reason the
convention is cheap enough to actually use: in an assisted text, the human
contribution is the scarce thing, so it is the thing worth marking — and the
thing a reader would otherwise have no way to find.

A document that carries iHuman marks but no disclosure attribute (§3) is
malformed. Without the baseline, the marks make no claim.

## 3. Document level

Declare the baseline on the root element of the work — the `<article>`, or
`<body>` if the whole page is the work:

```html
<article data-ai-disclosure="ai-assisted"
         data-ai-model="claude-opus-5"
         data-ai-provider="Anthropic">
```

`data-ai-disclosure` takes the four values of the `ai-disclosure` proposal:

| Value | Meaning |
|---|---|
| `none` | no AI involvement |
| `ai-assisted` | human-authored, AI edited or refined |
| `ai-generated` | AI-generated with human prompting and review |
| `autonomous` | AI-generated without human oversight |

`data-ai-model` and `data-ai-provider` are optional.

The `data-` prefix is intentional. It is valid HTML today, it survives
validators, and it mirrors the proposed attribute one-to-one — so a document
marked now stays correct if the bare attribute is ever adopted. Implementations
SHOULD match both forms:

```css
[data-ai-disclosure], [ai-disclosure] { … }
```

## 4. Sentence level: the human marks

Three classes on `<span>`. Nothing else is required, and nothing else should be
added without evidence that three is not enough.

| Class | Marks | Rendered as |
|---|---|---|
| `ih-verbatim` | the human's own words, verbatim or nearly so | solid underline |
| `ih-idea` | an idea or intuition originated by the human, written up jointly | dashed underline |
| `ih-experience` | the human's lived experience, anecdote, or personal fact | dotted underline |

```html
<p><span class="ih-experience">I saw a poster for three sold-out
nights.</span> The dates were seven months out.</p>
```

Marks nest. `<span class="ih-experience"><span class="ih-verbatim">…</span></span>`
is well-formed and means what it looks like: a lived experience, told in the
human's own words.

**Why `<span class="…">` and not a custom element.** Custom tags are stripped by
WordPress's KSES sanitizer, by most email clients, and by several feed readers.
`class` on a `<span>` survives every sanitizer in common use. This is the floor
that makes the convention portable; do not raise it.

## 5. The AI's side

The inverse claim — *this argument came from the model* — is carried by a note
placed inside the paragraph it annotates:

```html
<p><span class="ih-note">The counter-argument here was the model's.</span>
Variety is not the side effect of the system that works: it is the mechanism
by which it works.</p>
```

A note is ordinary text in the document flow. Strip the stylesheet and it is
still there, still legible, still true. Disclosure that depends on CSS loading
is not disclosure.

Renderers MAY move notes into the margin where the layout allows.

## 6. The legend is mandatory

A document using iHuman MUST carry a visible legend that states the base rule
and what each mark means. Marks without a legend are decoration.

```html
<div class="ih-legend">
  <strong>How this was written.</strong> Written in conversation with an AI.
  The underlined passages are mine; anything unmarked is the model's writing.
  <ul>
    <li><span class="ih-verbatim">Solid</span>: my own words.</li>
    <li><span class="ih-idea">Dashed</span>: my idea, written up together.</li>
    <li><span class="ih-experience">Dotted</span>: something I lived.</li>
  </ul>
</div>
```

## 7. Rendering (non-normative)

`ihuman.css` in this repository is the reference implementation: ~160 lines, no
JavaScript, no build step. It ships two theme hooks (`prefers-color-scheme` and
a `.dark` / `[data-theme="dark"]` class) and five custom properties for
recolouring.

The three marks are distinguished by **line style, not colour**, so they survive
monochrome printing and are legible to readers who do not distinguish colours.

## 8. Accessibility — known ceiling

The marks are visual. A screen-reader user hears the legend and the notes (both
are real text) but gets no signal at the marked passages themselves. Authors who
need that today should add visually-hidden text inside the span. A future
version may specify it; v0.1 does not, rather than specify it wrong.

## 9. What iHuman is not

- **Not a detector.** It records what the author declares. It cannot verify it,
  and a convention that claimed to would be lying.
- **Not a compliance certificate.** It may help satisfy transparency duties; it
  does not discharge them.
- **Not a percentage.** No word counts, no "17% human". The unit is the claim,
  not the ratio — a single marked sentence can carry the whole idea of an essay.
