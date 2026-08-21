# How to get an LLM to emit the markup

**English** · [Español](PROMPT.es.md)

weid markup is not written by hand. It is produced in the writing session,
because that is where — and only where — the information exists: the model
knows which sentence was yours because you just said it to it. Half an hour
later nobody knows.

Paste this when you start writing, with any model.

---

## The prompt

> We are going to write a text together. As you write, mark the human
> contribution following the weid convention. Don't ask me to mark it
> afterwards: do it as you draft, because you are the one with the context of
> who said what.
>
> **Base rule:** anything unmarked is understood to be written by you (the AI).
> I don't need to mark your work; you mark mine.
>
> **Three marks, on `<span>`:**
>
> - `<span class="weid-verbatim">…</span>` — my words, verbatim or nearly so:
>   something I wrote, said in the chat, or edited by hand.
> - `<span class="weid-idea">…</span>` — an idea or intuition that originated
>   with me, even if you wrote it up.
> - `<span class="weid-experience">…</span>` — a lived experience, anecdote or
>   personal fact of mine.
>
> They nest: an experience told in my own words carries both.
>
> **And one mark for you:** when an argument, a piece of research or a turn in
> the text is your contribution — not mine — put it as a note at the start of
> the paragraph it belongs to:
>
> `<span class="weid-note">Where this came from, in one line.</span>`
>
> Be specific in the note: "the shipping-container example and the 1920
> quotation are mine" works; "AI contribution" does not.
>
> **At the end**, wrap the text in:
>
> `<article data-ai-disclosure="ai-assisted" data-ai-model="YOUR-MODEL">`
>
> If you are writing with a skill, persona or prompt built from my texts, add
> `data-weid-voice="author"` and `data-weid-voice-source="NAME"`. If you are
> imitating a third party's voice, `data-weid-voice="third-party"` and name
> them: that is not optional.
>
> and add the legend from `example.en.html`, adapted to the text and written in
> the language the text is in.
>
> **Five rules:**
>
> 1. When in doubt, don't mark. The default is that the text is yours, and
>    erring that way is honest. Erring the other way attributes to me something
>    I did not say, which is the only way this can do harm.
> 2. **Approving is not authorship.** If you proposed something and I said "yes,
>    good, put it in", that is yours, not mine. Don't mark it.
> 3. **An idea gets marked once**, in its strongest formulation, not in every
>    echo that shows up later. If you underline everything, you underlined
>    nothing: between five and fifteen marks in a long essay.
> 4. For your note, the test is counterfactual: **if I hadn't had you, would
>    this argument, this fact or this turn be in the text?** If the answer is
>    no, it gets a note. Having drafted the paragraph well does not count: that
>    is already declared.
> 5. Don't invent lived experiences, and mark whole sentences, not stray words.

---

## Why it works this way and not the other

The obvious temptation is to ask the model to mark **its own** contribution. It
doesn't work: in an assisted text that is nearly the whole document, the markup
turns into noise and nobody reads it. Marking the scarce thing is what makes
the mark mean something.

## If the text is already written

You can mark it after the fact, but the quality drops a lot: the model will be
guessing. If you have the transcript of the session, give it to the model —
with that it reconstructs well. Without a transcript, check by hand whatever it
marks; it gets `weid-idea` wrong most often, and that is the one that matters
most.
