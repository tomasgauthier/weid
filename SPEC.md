# weid — a convention for marking human contribution in AI-assisted text

**English** · [Español](SPEC.es.md)

**Version 0.1 · Draft · MIT**

> ***weid-***, the Proto-Indo-European root meaning *to see*, is the ancestor of
> both **idea** and **evidence** — that which is plainly seen. The name states
> the scope: this convention makes visible which ideas are human. It shows; it
> does not prove.

## 1. The gap this fills

Two things can be true of the same essay: an AI wrote most of the sentences,
and every idea in it is human. Existing disclosure standards cannot express
that. They operate on the document or the block, and they answer one question:
*was AI involved?*

The proposed [`ai-disclosure`](https://github.com/w3c-cg/ai-content-disclosure)
HTML attribute (W3C AI Content Disclosure Community Group) handles that coarse
claim well, and aligns with [IPTC's digital source types](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
and C2PA. The EU AI Act, Article 50, makes machine-readable marking an
obligation. None of them mark *which sentences the human actually contributed,
and in what way*.

The gap widened when that group merged its "assisted" and "generated" values
into a single `ai-assisted`, which now spans everything from light AI editing of
human prose to AI-drafted text a human reviewed. That merge is the right call at
the document level — the boundary is genuinely impractical to police — but it
leaves one value carrying the entire range of human-plus-AI collaboration. weid
is a way to say, inside that range, which sentences are which.

That is the whole of weid. It is a complement to `ai-disclosure`, not a
competitor: use both.

## 2. The base rule

> **In a document declared as AI-assisted, unmarked text was written by the AI.**

Marks identify the human. This inversion is deliberate and it is the reason the
convention is cheap enough to actually use: in an assisted text, the human
contribution is the scarce thing, so it is the thing worth marking — and the
thing a reader would otherwise have no way to find.

A document that carries weid marks but no disclosure attribute (§3) is
malformed. Without the baseline, the marks make no claim.

## 3. Document level

Declare the baseline on the root element of the work — the `<article>`, or
`<body>` if the whole page is the work:

```html
<article data-ai-disclosure="ai-assisted"
         data-ai-model="claude-opus-5"
         data-ai-provider="Anthropic">
```

`data-ai-disclosure` takes the values of the `ai-disclosure` proposal. This
table tracks the Community Group draft as of August 2026:

| Value | Meaning |
|---|---|
| `human-only` | a positive assertion that no AI was involved |
| `ai-assisted` | AI was involved, with human authorship and/or human review — from light AI editing of human prose to AI-drafted text a human refined |
| `ai-autonomous` | published without human involvement or review |

The absence of the attribute means *unknown*, not `human-only`: no assertion has
been made. `human-only` is the positive claim, and it is the one value weid has
nothing to add to.

weid applies to `ai-assisted` documents. That is the value the marks subdivide,
and the reason they exist.

`data-ai-model` and `data-ai-provider` are optional, as is `data-ai-prompt-url`.
weid does not use `ai-assisted-percent` — see §10.

The `data-` prefix is intentional. It is valid HTML today, it survives
validators, and it mirrors the proposed attribute one-to-one — so a document
marked now stays correct if the bare attribute is ever adopted. Implementations
SHOULD match both forms:

```css
[data-ai-disclosure], [ai-disclosure] { … }
```

## 4. Whose voice is the AI writing in?

A model writing in its own default register and a model running a persona the
author built from their own published work are not the same act, and no
existing standard can tell them apart. One optional attribute does:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

| Value | Meaning |
|---|---|
| `model` | the model's own default voice. This is the default; omit the attribute |
| `author` | the model writes in the author's voice, reconstructed from the author's own texts |
| `third-party` | the model writes in someone else's voice |

`data-weid-voice-source` names the artifact — a skill, a system prompt, a
fine-tune, a style guide. It is optional for `model` and `author`, and
**REQUIRED for `third-party`**: an unnamed imitation of a living writer is the
case this attribute exists to expose.

Renderers SHOULD surface this as a pill above the legend rather than bury it in
prose: whose voice this is, is the first thing a reader wants to know.

```html
<span class="weid-voice">Author's voice<span class="weid-voice-src">tgdoppelganger</span></span>
```

For `third-party`, add `weid-voice--third-party`, which renders in a different
colour. The distinction is deliberate: an AI writing in a named third party's
voice is the case this attribute exists to expose, and it should not look like
one more entry in a list.

`author` is not a lesser claim than human writing, and not a greater one. It
says something specific: the prose style descends from the human's corpus, so
the voice is theirs even where the sentences are not. Readers can weigh that
themselves — which is the entire point of disclosure.

## 5. Sentence level: the human marks

Three classes on `<span>`. Nothing else is required, and nothing else should be
added without evidence that three is not enough.

| Class | Marks | Rendered as |
|---|---|---|
| `weid-verbatim` | the human's own words, verbatim or nearly so | solid underline |
| `weid-idea` | an idea or intuition originated by the human, written up jointly | dashed underline |
| `weid-experience` | the human's lived experience, anecdote, or personal fact | dotted underline |

```html
<p><span class="weid-experience">I saw a poster for three sold-out
nights.</span> The dates were seven months out.</p>
```

Marks nest. `<span class="weid-experience"><span class="weid-verbatim">…</span></span>`
is well-formed and means what it looks like: a lived experience, told in the
human's own words.

**Why `<span class="…">` and not a custom element.** Custom tags are stripped by
WordPress's KSES sanitizer, by most email clients, and by several feed readers.
`class` on a `<span>` survives every sanitizer in common use. This is the floor
that makes the convention portable; do not raise it.

## 6. The AI's side

The inverse claim — *this argument came from the model* — is carried by a note
placed inside the paragraph it annotates:

```html
<p><span class="weid-note">The counter-argument here was the model's.</span>
Variety is not the side effect of the system that works: it is the mechanism
by which it works.</p>
```

A note is ordinary text in the document flow. Strip the stylesheet and it is
still there, still legible, still true. Disclosure that depends on CSS loading
is not disclosure.

Renderers MAY move notes into the margin where the layout allows.

## 7. The legend is mandatory

A document using weid MUST carry a visible legend that states the base rule
and what each mark means. Marks without a legend are decoration.

```html
<div class="weid-legend">
  <strong>How this was written.</strong> Written in conversation with an AI.
  The underlined passages are mine; anything unmarked is the model's writing.
  <ul>
    <li><span class="weid-verbatim">Solid</span>: my own words.</li>
    <li><span class="weid-idea">Dashed</span>: my idea, written up together.</li>
    <li><span class="weid-experience">Dotted</span>: something I lived.</li>
  </ul>
</div>
```

## 8. Rendering (non-normative)

`weid.css` in this repository is the reference implementation: ~160 lines, no
JavaScript, no build step. It ships two theme hooks (`prefers-color-scheme` and
a `.dark` / `[data-theme="dark"]` class) and five custom properties for
recolouring.

The three marks are distinguished by **line style, not colour**, so they survive
monochrome printing and are legible to readers who do not distinguish colours.

## 9. Accessibility — known ceiling

The marks are visual. A screen-reader user hears the legend and the notes (both
are real text) but gets no signal at the marked passages themselves. Authors who
need that today should add visually-hidden text inside the span. A future
version may specify it; v0.1 does not, rather than specify it wrong.

## 10. What weid is not

- **Not a detector.** It records what the author declares. It cannot verify it,
  and a convention that claimed to would be lying.
- **Not proof.** Evidence and proof are different things, and the name picks the
  weaker, honest one. A mark shows; it does not demonstrate. Anyone willing to
  lie in a weid mark was already willing to lie in a byline. Cryptographic
  provenance is a different problem, and C2PA is working on it.
- **Not a compliance certificate.** It may help satisfy transparency duties; it
  does not discharge them.
- **Not a percentage.** No word counts, no "17% human". The unit is the claim,
  not the ratio — a single marked sentence can carry the whole idea of an essay.
  This is why weid does not emit the draft's optional `ai-assisted-percent`, and
  is the substantive disagreement it has with that attribute: a percentage has no
  well-defined numerator, and the reader's real question — *which* parts are
  human — is not a quantity.
