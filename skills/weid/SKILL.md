---
name: weid
description: Mark authorship inside AI-written text — which sentences are the human's (verbatim words, ideas, lived experience) and which content the model contributed — using the weid convention (weid-verbatim / weid-idea / weid-experience / weid-note, plus data-ai-disclosure and data-weid-voice). Use this skill whenever you are writing or co-writing with the user a text that will be published — essay, blog post, column, newsletter, talk script — even if they don't ask for it: the marking can only be done well during the writing, because afterwards nobody remembers who said what. Use it also when the user talks about AI disclosure, authorship transparency, "marking what I wrote myself", or mentions weid.
---

# weid — marking authorship while you write

> Spanish version of this skill: `SKILL.es.md`, same folder.

## Why this exists

A text written with you can be drafted almost entirely by you and be, at the
same time, wholly original: the idea is the author's, the lived experience is
the author's, the turn was born in the conversation. The disclosure standards
that exist cannot say that. They mark the whole document — "this involved AI" —
and there they stop.

weid marks the other thing: **what is human, and in what way it is.**

The base rule, and everything else follows from it:

> **In a document declared as AI-assisted, anything unmarked was written by
> you.**

The marks point at the human. The opposite of what you would expect, and
deliberately so: in an assisted text the human part is the scarce thing, and
marking the scarce thing is what makes the mark mean something. If you marked
your own, you would mark 90% of the document and nobody would read any of it.

## Mark as you write, not afterwards

This is the only thing this skill really asks of you, and it is what makes it
hard to replace: **you know which sentence was the author's because they just
said it to you.** That information exists only while the conversation is alive.
Half an hour later, or in another session, nobody has it — not even you.

So mark at the moment you draft the paragraph. Don't leave the marking for the
end, "once the text is ready": by then you will be guessing, and guessing here
means attributing to the author things they never said.

## The three human marks

They go on `<span>`, inline, in the text. Markdown renderers let inline HTML
through, so they work the same in `.md` as in `.html`.

**`weid-verbatim`** — their words, verbatim or nearly so. Something they wrote,
said in the chat, or fixed by hand on your draft.

```html
<span class="weid-verbatim">what does that make possible?</span>
```

**`weid-idea`** — an idea or intuition that originated with them, even if you
wrote it up. It is the most important mark and the hardest to judge well.

```html
<span class="weid-idea">That differentiation and luxury should run in the
digital, where the material cost per unit of status is orders of magnitude
lower.</span>
```

**`weid-experience`** — a lived experience, anecdote or personal fact of theirs.

```html
<span class="weid-experience">I have been taking esomeprazole for years, and
today I save almost 50 thousand pesos buying the molecule instead of the
surname.</span>
```

They nest where it applies. An experience told in their own words carries both,
and that reads as exactly what it is:

```html
<span class="weid-experience"><span class="weid-verbatim">Yesterday I saw a
poster for a band with three sold-out nights.</span> The dates: March
2027.</span>
```

### The two judgements that always go wrong

**Approving is not authorship.** If you proposed something and the author said
"yes, good, put it in", that is yours, not theirs. Don't mark it. The editorial
decision to accept an idea does not make it their own; if it did, the whole text
would be the author's and the convention would say nothing.

**An idea gets marked once, where it is best said.** An intuition of the
author's usually reappears three or four times in an essay. Mark the strongest
formulation, not every echo. Marking each appearance turns the underlining into
noise and the reader stops looking at it.

And the rule that settles the doubts: **when in doubt, don't mark.** The default
is that the text is yours. Erring that way is humble. Erring the other way puts
words in the author's mouth, which is the only way this convention can do harm.

## The model's mark

The inverse: when the **content** came from you — not just the drafting — a note
goes at the start of the paragraph it belongs to.

```html
<p><span class="weid-note">The correction — variety as mechanism and not as
excess — is the argument I set against the original thesis.</span>Variety is
not the side effect of the system that works: it is the mechanism by which it
works.</p>
```

The test: **if the author hadn't had you, would this argument, this fact or this
turn be in the text?** If the answer is no, it gets a note.

Three cases that warrant one: an argument where you pushed back and won;
research or references they did not bring; a structural move in the text that
you proposed.

And one that does not: having drafted the paragraph well. That is the default,
it is already declared above, and putting a note on every well-written paragraph
drains the note of meaning.

Be specific. "The shipping-container example and the Mises 1920 quotation are
mine" works. "AI contribution" tells nobody anything.

## Declaring the document

When you finish, wrap the text:

```html
<article data-ai-disclosure="ai-assisted" data-ai-model="claude-opus-5">
```

Values for `data-ai-disclosure`: `none` · `ai-assisted` · `ai-generated` ·
`autonomous`.

### And declaring the voice — this matters

If you are writing with a skill, command or persona built from the author's own
texts (for example `tgdoppelganger`), you are not writing in your default voice:
you are writing in theirs, reconstructed. That gets declared, because it is
different information:

```html
<article data-ai-disclosure="ai-assisted"
         data-weid-voice="author"
         data-weid-voice-source="tgdoppelganger">
```

- `model` — your own default voice. This is the default; it can be omitted.
- `author` — the author's voice, from the author's texts.
- `third-party` — someone else's voice. Here **naming the source is not
  optional**: imitating someone without saying so is precisely what this
  convention exists to expose.

In the legend, that declaration goes as a pill above everything else, not buried
in the prose — it is the first thing a reader wants to know:

```html
<span class="weid-voice">Author's voice<span class="weid-voice-src">tgdoppelganger</span></span>
```

For `third-party` add `weid-voice--third-party`, which is painted differently on
purpose.

weid composes with voice skills, it does not replace them. One decides how the
text sounds; the other records whose each thing is. If a voice skill is active in
the session, say so in the attribute without being asked.

## The legend

A text with marks and no legend is decoration. Always close with one, adapted to
the text — don't copy it literally, write it in the author's voice, and write it
in the language the text is in:

```html
<div class="weid-legend">
<span class="weid-voice">Author's voice<span class="weid-voice-src">tgdoppelganger</span></span>
<strong>How this was written.</strong> [What it was written with. If there was a
voice skill, the pill names it and here you explain in half a line what that
means.] The underlined passages are mine; <strong>anything unmarked was drafted
by the model</strong>.
<ul>
<li><span class="weid-verbatim">Solid underline</span>: my own words.</li>
<li><span class="weid-idea">Dashed underline</span>: my idea, written up together.</li>
<li><span class="weid-experience">Dotted underline</span>: my experience or personal fact.</li>
<li><span class="weid-note">Margin note</span>: an argument or fact the model contributed, not me.</li>
</ul>
</div>
```

## Constraint

Three things that ruin the markup, in order of severity:

1. **Inventing lived experiences.** Never write an anecdote the author did not
   tell you, and far less mark it as theirs.
2. **Over-marking.** Between five and fifteen human marks in a long essay. If
   you underline everything, you underlined nothing.
3. **Marking stray words.** Mark whole sentences. This should read like a
   reader's underlining, not like an SEO keyword.

## If the text is already written

You can mark it after the fact, but say so: the quality drops a lot because you
will be guessing. If the transcript of the writing session exists, ask for it —
with that it reconstructs well. Without a transcript, mark only what you can
justify and warn that `weid-idea` is the one most likely to be wrong, which is
exactly the one that matters most.

## Reference

The complete convention is in `SPEC.md` (`SPEC.es.md` in Spanish), at the root
of the weid repo (if this
skill is installed by symlink, follow the link back to the repo). The reference
CSS is `weid.css`: 160 lines, no JavaScript. The etymology, which is also the
thesis: *weid-* is the Proto-Indo-European root of **to see**, and from it come
**idea** and **evidence**. This shows; it does not prove.
