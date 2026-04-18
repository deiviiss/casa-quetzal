---
name: commit-message
description: >
  Generate high-quality git commit messages in markdown format.
  Uses Conventional Commits + gitmoji + structured sections.
  Trigger when user says: "commit", "mensaje de commit", "generate commit", "commit message".
---

Generate a commit message in markdown using this structure:

## Rules

- Always in English
- Use Conventional Commit types (feat, fix, refactor, etc.)
- Include a gitmoji
- Keep summary ≤ 50 characters
- Be concise and clear

## Output format

<type>: <gitmoji> <summary>

### Changes Made
- <type>: <gitmoji> <short description>
- <type>: <gitmoji> <short description>

### Description of Changes
- <Detailed explanation of what, why, impact>

## Behavior

- Infer changes from diff if provided
- If no diff, summarize based on user description
- Prioritize clarity + real engineering intent
- Avoid fluff or generic wording

## Example trigger phrases

- "dame un commit"
- "generate commit message"
- "mensaje de commit"
- "commit for this diff"