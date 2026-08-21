# weid

**English** · [Español](README.es.md)

**A convention for marking human contribution inside AI-assisted text.**
Three CSS classes, one attribute, no JavaScript.

![A man looking at a poster for a band with three sold-out dates on a street in Santiago](cover.jpeg)

<sub>Cover of the [essay that serves as the real-world case](https://gauthier.cl/blog/la-estandarizacion-de-la-prosperidad) (in Spanish) — the first text published with this convention. Image generated with Nano Banana Pro, which is exactly what a caption should say.</sub>

> ***weid-*** — the Proto-Indo-European root meaning *to see*. From it come
> **vision**, **idea** and **evidence**: literally, *what is plainly seen*. The
> whole family of this project in a single word: making visible which ideas are
> human.

---

## Why

The debate about text and AI got stuck on a binary question: did a person write
this, or did a machine? For almost everything written today, that question no
longer has an answer, because it is not the question.

An essay can be drafted almost entirely by a model and be, at the same time,
wholly original: the idea is someone's, the lived experience is someone's, the
turn in the argument was born in a conversation between the two. The disclosure
standards that exist cannot say that. They mark the whole document — "this
involved AI" — and there they stop.

weid marks the other thing: **what is human, and in what way it is.**

The underlying bet: thinking is still a human activity. What changed is that it
is now augmented. An honest disclosure ought to be able to show that instead of
hiding it, and ought to be able to show it *sentence by sentence*.

## The base rule

> **In a document declared as AI-assisted, unmarked text was written by the
> AI.**

The marks point at the human. The opposite of what you would expect, and
deliberately so: in an assisted text the human part is the scarce thing, and
marking the scarce thing is cheaper — and more useful — than marking everything
else.

## How to use it

```html
<link rel="stylesheet" href="weid.css">

<article data-ai-disclosure="ai-assisted" data-ai-model="claude-opus-5">
  <p><span class="weid-experience">Yesterday I saw a poster for a band with
  three sold-out nights.</span> Which is to say, thousands of people have
  already paid to be together seven months from now.</p>
</article>
```

Three classes on `<span>`:

| Class | Marks | Rendered as |
|---|---|---|
| `weid-verbatim` | the person's own words | solid underline |
| `weid-idea` | their idea, written up jointly | dashed underline |
| `weid-experience` | their lived experience, anecdote or personal fact | dotted underline |

And a fourth piece for the other side, the model's contribution:

```html
<p><span class="weid-note">The counter-argument here was the model's.</span>
Variety is not the side effect of the system that works: it is the mechanism
by which it works.</p>
```

The note is ordinary text inside the paragraph. With CSS it moves to the
margin; without CSS it is still there. Disclosure that falls apart when the
stylesheet fails to load is not disclosure.

### Whose voice?

A model in its default voice and a model running a skill you built from your own
texts are not the same thing: there the voice is yours, reconstructed, even
though the words are its. An optional attribute says so:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

`model` (the default, omit it) · `author` (your voice, from your texts) ·
`third-party` (someone else's voice — and there, naming them is mandatory,
because imitating without saying so is precisely what has to be declared).

One more thing is missing, and it is mandatory: **the legend**. Without it the
marks are decoration. It is in `example.en.html`, ready to copy.

## Installing it on your blog

Two things, and neither is a plugin: **load the CSS once** and **make the markup
survive your editor**.

| Platform | How you load `weid.css` |
|---|---|
| Hand-written HTML | `<link rel="stylesheet" href="weid.css">` |
| WordPress | Appearance → Customize → **Additional CSS**, and paste the file. Or `wp_enqueue_style()` in the child theme. |
| Ghost | Settings → **Code injection** → Site header, inside a `<style>`. |
| Hugo / Jekyll / 11ty | Copy the file into `assets/` or `static/` and link it from the base layout. |
| Astro | `import "../styles/weid.css"` **from the `.astro` file**, not with `@import` inside another CSS file (see below). |
| Substack, Medium, LinkedIn | Not possible: they do not let you add CSS. The markup still survives as text, but it is invisible. |

### The Astro trap (and anything else with Vite)

If you put `@import "./weid.css"` inside your `global.css`, **Vite does not
watch the imported file**: it caches the processed CSS and keeps serving the old
version until you restart the server. It looks as if your new rules did not
exist. Import it from the `.astro` component and the problem goes away.

### The document-level attribute

`data-ai-disclosure` goes on the element that wraps the work, and that is
usually painted by the theme's template, not by the editor. If you can't or
don't want to touch the template, wrap the content inside the post itself:

```html
<div data-ai-disclosure="ai-assisted" data-weid-voice="author">
  … the text …
</div>
```

It works the same: the CSS does not depend on the attribute. The attribute is
for machines; the classes are for eyes.

### WordPress: do you need a plugin?

**No.** weid's markup survives WordPress's sanitizer as is:

- KSES allows `class` and `data-*` as global attributes on the elements it
  already accepts, and `<span>` is one of them. So the marks and the disclosure
  attributes get through even if the author lacks the `unfiltered_html`
  capability.
- This is exactly why the convention uses `<span class="…">` and not custom
  tags: `<t-sentence>` KSES does eat.

The only awkward part is writing the marks: in Gutenberg you have to use the
**code editor** (Options → Code editor) or a custom HTML block, because the
format bar has no button for this.

A plugin, then, would only save clicks: a format button in the toolbar and a way
to inject the attribute into the `<article>` without touching the theme. It is
not in v0 and it won't be until someone asks for it — the CSS already does the
work.

## What's here

| File | What it is |
|---|---|
| `SPEC.md` | The convention. It is the product. Spanish version in [`SPEC.es.md`](SPEC.es.md). |
| `weid.css` | Reference implementation, ~160 lines. |
| `example.en.html` | Open it with a double click. It is the demo and it is the test. Spanish version in `example.html`. |
| `PROMPT.md` | The portable prompt: works with any LLM, copy and paste. Spanish version in [`PROMPT.es.md`](PROMPT.es.md). |
| `skills/weid/` | The same instruction as a skill, for runtimes that support them. `SKILL.md` in English, `SKILL.es.md` in Spanish. |

No `package.json`, no build, no CI. You copy the CSS and it works: Astro,
WordPress, Ghost, Hugo, Jekyll, a hand-written `.html`.

## The markup is not written by hand

Nobody is going to tag 3,000 words by hand. The point is that the markup comes
**out of the writing session itself**: the model knows which sentence was yours
because you just said it. That information exists while the conversation is
alive and not after — the model cannot recover it either.

So the producer comes in two forms:

- **`PROMPT.md`** — portable. Copy and paste it into any LLM.
- **`skills/weid/`** — a skill, for runtimes that support them (Claude Code,
  among others). Install it with a symlink into the skills folder and it
  activates on its own when you are writing something that will be published.
  It is the strong form: a prompt is something you have to remember to paste.

The skill **composes with voice skills, it does not replace them**: if you are
writing with a persona built from your own texts, weid detects it and declares
it in `data-weid-voice`.

## Relationship to existing standards

weid **does not compete** with them, it complements them:

- [`ai-disclosure`](https://github.com/dweekly/ai-content-disclosure) (W3C
  Community Group, 2026) solves the document level. weid uses it as is, with a
  `data-` prefix so it validates today.
- [IPTC digital source types](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
  and C2PA cover images and cryptographic provenance.
- [Article 50 of the EU AI Act](https://artificialintelligenceact.eu/transparency-rules-article-50/)
  makes machine-readable marking an obligation.

None of them marks the sentence. That is the gap.

## What weid is not

- **Not a detector.** It records what the author declares. It does not verify
  it.
- **Not proof.** And the distinction is in the name: *weid* is evidence — what
  stays in plain sight — not proof. A mark shows; it does not demonstrate.
  Anyone who wants to lie with weid can, just as they can lie in a byline.
  Honest disclosure serves those who want to be honest; the rest is
  cryptography, and that is what C2PA is for.
- **Not a compliance certificate.** It helps; it does not discharge the
  obligation.
- **Not a percentage.** No "17% human". The unit is the claim, not the ratio: a
  single marked sentence can carry the whole idea.

## License

MIT. Use it, fork it, rename it.
