---
name: commit-message
description: >
  Generate high-quality git commit messages in markdown format.
  Uses Conventional Commits + gitmoji + structured sections.
  Trigger when user says: "commit", "mensaje de commit", "generate commit", "commit message".
---

Generate a commit message.

## CRITICAL OUTPUT RULE

- ALWAYS return the response inside a markdown code block
- Use triple backticks with `markdown`
- Do NOT return plain text
- Do NOT add explanations outside the block

## Rules

- English only
- Use Conventional Commit types (feat, fix, refactor, etc.)
- Include a gitmoji
- Summary ≤ 50 characters
- Be concise and clear

## Output format (inside markdown block)

<type>: <gitmoji> <summary>

### Changes Made
- <type>: <gitmoji> <short description>
- <type>: <gitmoji> <short description>

### Description of Changes
- <Detailed explanation of what, why, impact>
Behavior
If diff present → infer changes
If no diff → summarize from prompt
Avoid fluff
Prioritize clarity
Trigger phrases
"dame un commit"
"generate commit message"
"mensaje de commit"
"commit for this diff"

---